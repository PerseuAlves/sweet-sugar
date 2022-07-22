package br.com.pereira.LojaDeDoces.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.pereira.LojaDeDoces.model.Adm;

public interface AdmRepository extends JpaRepository<Adm, Integer> {
	
	public Optional<Adm> findByEmail(String email);
}
