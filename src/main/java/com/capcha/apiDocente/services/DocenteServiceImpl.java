package com.capcha.apiDocente.services;

import com.capcha.apiDocente.models.Docente;
import com.capcha.apiDocente.repositories.DocenteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;
import java.time.Period;
import java.util.List;

@Service
public class DocenteServiceImpl implements DocenteService {

    @Autowired
    private DocenteRepository repo;

    @Override
    public List<Docente> getAll() {
        return repo.findAll();
    }

    @Override
    public Page<Docente> getAllPaginado(Pageable pageable) {
        return repo.findAll(pageable);
    }

    @Override
    public Docente getById(Long id) {
        return repo.findById(id).orElseThrow(() -> new RuntimeException("Docente no encontrado"));
    }

    @Override
    public Docente create(Docente docente) {
        return repo.save(docente);
    }

    @Override
    public Docente update(Long id, Docente docente) {
        Docente existing = getById(id);
        docente.setIdDocente(id);
        return repo.save(docente);
    }

    @Override
    public void delete(Long id) {
        repo.deleteById(id);
    }

    @Override
    public List<Docente> getByCiudad(String ciudad) {
        return repo.findByCiuDocente(ciudad);
    }

    @Override
    public List<Docente> getByExperiencia(int anios) {
        return repo.findByTiempoServicioGreaterThanEqual(anios);
    }

    @Override
    public Double getEdadPromedio() {
        List<Docente> docentes = repo.findAll();
        return docentes.stream()
                .mapToInt(d -> Period.between(d.getFecNacimiento(), LocalDate.now()).getYears())
                .average().orElse(0.0);
    }
}
