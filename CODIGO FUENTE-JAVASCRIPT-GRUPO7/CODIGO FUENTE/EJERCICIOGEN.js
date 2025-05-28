// Datos del producto
let stockActual = 8;
let stockMinimo = 10;
let precioUnitario = 5.5;
let clienteFrecuente = true;

// Verificamos si es necesario hacer un pedido
if (stockActual < stockMinimo) {
  console.log("⚠️ ¡Atención! El stock es bajo. Se recomienda hacer un nuevo pedido.");

  // Cálculo del pedido sugerido
  let cantidadPedido = stockMinimo - stockActual + 5;
  let costoTotal = cantidadPedido * precioUnitario;

  // Aplicamos descuento si el cliente es frecuente y el monto es mayor a 50
  if (clienteFrecuente && costoTotal > 50) {
    costoTotal *= 0.9; // 10% de descuento
    console.log("🎉 Cliente frecuente: se aplicó un 10% de descuento.");
  }

  console.log("📦 Cantidad sugerida a pedir:", cantidadPedido);
  console.log("💰 Costo total estimado del pedido:", costoTotal.toFixed(2));
} else {
  console.log("✅ El stock actual es suficiente. No se requiere hacer pedidos.");
}

// Evaluar el tipo de cliente
let tipoCliente = "VIP";

switch (tipoCliente) {
  case "Nuevo":
    console.log("🧾 Bienvenido, nuevo cliente. Gracias por confiar en nosotros.");
    break;
  case "Frecuente":
    console.log("📈 Cliente frecuente: beneficios activos.");
    break;
  case "VIP":
    console.log("👑 Cliente VIP: acceso a ofertas especiales.");
    break;
  default:
    console.log("🤔 Tipo de cliente no identificado.");
}
