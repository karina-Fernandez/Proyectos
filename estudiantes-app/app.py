from flask import Flask, render_template, request, redirect, session, flash
from conexion import obtener_conexion

app = Flask(__name__)
app.secret_key = 'mi_clave_secreta_super_segura_2024'

@app.route('/')
def index():
    if 'usuario_logueado' in session:
        return redirect('/dashboard')
    return redirect('/login')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        nombre = request.form['nombre'].strip()
        password = request.form['password']
        
        if not nombre or not password:
            flash('Por favor complete todos los campos', 'error')
            return render_template('login.html')
        
        conexion = obtener_conexion()
        try:
            with conexion.cursor() as cursor:
                cursor.execute("SELECT * FROM estudiantes WHERE nomEstudiante = %s", (nombre,))
                usuario = cursor.fetchone()
                
                if usuario and usuario['password'] == password:
                    session['usuario_logueado'] = usuario['nomEstudiante']
                    session['usuario_id'] = usuario['id']
                    flash(f'¡Bienvenido {usuario["nomEstudiante"]}!', 'success')
                    return redirect('/dashboard')
                else:
                    flash('Usuario o contraseña incorrectos', 'error')
                    print(f"Login fallido - Usuario: {nombre}, Password ingresado: {password}")
                    if usuario:
                        print(f"Password en BD: {usuario['password']}")
        except Exception as e:
            flash('Error en el sistema. Intente nuevamente.', 'error')
            print(f"Error en login: {e}")
        finally:
            conexion.close()
    
    return render_template('login.html')

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        nombre = request.form['nombre'].strip()
        direccion = request.form['direccion'].strip()
        ciudad = request.form['ciudad'].strip()
        password = request.form['password']
        confirm_password = request.form['confirm_password']
        
        # Validaciones
        if not all([nombre, direccion, ciudad, password, confirm_password]):
            flash('Todos los campos son obligatorios', 'error')
            return render_template('register.html')
        
        if password != confirm_password:
            flash('Las contraseñas no coinciden', 'error')
            return render_template('register.html')
        
        if len(password) < 6:
            flash('La contraseña debe tener al menos 6 caracteres', 'error')
            return render_template('register.html')
        
        conexion = obtener_conexion()
        try:
            with conexion.cursor() as cursor:
                # Verificar si el usuario ya existe
                cursor.execute("SELECT id FROM estudiantes WHERE nomEstudiante = %s", (nombre,))
                if cursor.fetchone():
                    flash('Ya existe un usuario con ese nombre', 'error')
                    return render_template('register.html')
                
                cursor.execute("""
                    INSERT INTO estudiantes (nomEstudiante, dirEstudiante, ciuEstudiante, password) 
                    VALUES (%s, %s, %s, %s)
                """, (nombre, direccion, ciudad, password))
                
                conexion.commit()
                flash(f'Usuario {nombre} registrado exitosamente. Ya puedes iniciar sesión.', 'success')
                print(f"Usuario registrado - Nombre: {nombre}, Password: {password}")
                return redirect('/login')
                
        except Exception as e:
            flash('Error al registrar usuario. Intente nuevamente.', 'error')
            print(f"Error en registro: {e}")
            conexion.rollback()
        finally:
            conexion.close()
    
    return render_template('register.html')

@app.route('/dashboard')
def dashboard():
    if 'usuario_logueado' not in session:
        flash('Debe iniciar sesión para acceder', 'error')
        return redirect('/login')
    
    conexion = obtener_conexion()
    try:
        with conexion.cursor() as cursor:
            cursor.execute("SELECT id, nomEstudiante, dirEstudiante, ciuEstudiante, created_at FROM estudiantes ORDER BY created_at DESC")
            estudiantes = cursor.fetchall()
    except Exception as e:
        flash('Error al cargar datos', 'error')
        estudiantes = []
        print(f"Error en dashboard: {e}")
    finally:
        conexion.close()
    
    return render_template('dashboard.html', estudiantes=estudiantes, usuario=session['usuario_logueado'])

@app.route('/logout')
def logout():
    usuario = session.get('usuario_logueado', 'Usuario')
    session.clear()
    flash(f'Hasta luego {usuario}', 'info')
    return redirect('/login')

if __name__ == '__main__':
    app.run(debug=True)
