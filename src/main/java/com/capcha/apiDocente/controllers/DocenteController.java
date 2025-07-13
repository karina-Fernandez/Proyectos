package com.capcha.apiDocente.controllers;

import com.capcha.apiDocente.models.Docente;
import com.capcha.apiDocente.services.DocenteService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/docentes")
public class DocenteController {

    @Autowired
    private DocenteService service;

    @GetMapping
    public List<Docente> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public Docente getById(@PathVariable Long id) {
        return service.getById(id);
    }

    @PostMapping
    public Docente create(@Valid @RequestBody Docente docente) {
        return service.create(docente);
    }

    @PutMapping("/{id}")
    public Docente update(@PathVariable Long id, @Valid @RequestBody Docente docente) {
        return service.update(id, docente);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }

    @GetMapping("/ciudad/{ciudad}")
    public List<Docente> getByCiudad(@PathVariable String ciudad) {
        return service.getByCiudad(ciudad);
    }

    @GetMapping("/experiencia/{anios}")
    public List<Docente> getByExperiencia(@PathVariable int anios) {
        if (anios < 0) {
            throw new IllegalArgumentException("El número de años de experiencia no puede ser negativo.");
        }
        return service.getByExperiencia(anios);
    }
    @GetMapping("/edad-promedio")
    public Double obtenerEdadPromedio() {
        List<Docente> docentes = service.getAll();

        return docentes.stream()
                .filter(d -> d.getFecNacimiento() != null)
                .mapToDouble(d -> java.time.Period.between(d.getFecNacimiento(), java.time.LocalDate.now()).getYears())
                .average()
                .orElse(0.0);
    }


    @GetMapping("/paginado")
    public Page<Docente> getDocentesPaginado(@PageableDefault(size = 10) Pageable pageable) {
        return service.getAllPaginado(pageable);
    }
}

