package br.com.pereira.LojaDeDoces.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;

import br.com.pereira.LojaDeDoces.model.Telefone;

public interface TelefoneRepository extends JpaRepository<Telefone, String> {

	@Procedure(name = "Telefone.putNewTelefone")
    String putNewTelefone(@Param("numAntigo") String numAntigo, @Param("numNovo") String numNovo);
}
