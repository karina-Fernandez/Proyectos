package com.capcha.apiDocente.repositories;

import com.capcha.apiDocente.models.Docente;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DocenteRepository extends JpaRepository<Docente, Long> {
    List<Docente> findByCiuDocente(String ciudad);
    List<Docente> findByTiempoServicioGreaterThanEqual(int experiencia);
}

