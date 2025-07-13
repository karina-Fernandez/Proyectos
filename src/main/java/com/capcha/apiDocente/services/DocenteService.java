package com.capcha.apiDocente.services;

import com.capcha.apiDocente.models.Docente;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;


public interface DocenteService {
    List<Docente> getAll();
    Docente getById(Long id);
    Docente create(Docente docente);
    Docente update(Long id, Docente docente);
    void delete(Long id);
    List<Docente> getByCiudad(String ciudad);
    List<Docente> getByExperiencia(int anios);
    Double getEdadPromedio();

    Page<Docente> getAllPaginado(Pageable pageable);
}


