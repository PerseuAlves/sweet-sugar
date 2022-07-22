package br.com.pereira.LojaDeDoces.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;

import br.com.pereira.LojaDeDoces.model.Endereco;
import br.com.pereira.LojaDeDoces.model.compositeID.EnderecoId;

public interface EnderecoRepository extends JpaRepository<Endereco, EnderecoId> {

	@Procedure(name = "Endereco.spPutNewEndereco")
    String spPutNewEndereco(
    		@Param("cepAntigo") Integer cepAntigo, 
    		@Param("logradouroAntigo") String logradouroAntigo, 
    		@Param("numeroAntigo") Integer numeroAntigo, 
    		@Param("bairroAntigo") String bairroAntigo, 
    		@Param("cidadeAntigo") String cidadeAntigo, 
    		@Param("cepNovo") Integer cepNovo, 
    		@Param("logradouroNovo") String logradouroNovo, 
    		@Param("numeroNovo") Integer numeroNovo, 
    		@Param("bairroNovo") String bairroNovo, 
    		@Param("cidadeNovo") String cidadeNovo,
			@Param("complementoNovo") String complementoNovo);
	Optional<List<Endereco>> findByEnderecoIdCep(Integer cep);
	Optional<Endereco> findByEnderecoIdCepAndEnderecoIdLogradouroAndEnderecoIdNumero(Integer cep, String logradouro, Integer numero);
	Optional<Endereco> findByEnderecoIdCepAndEnderecoIdLogradouroAndEnderecoIdNumeroAndEnderecoIdBairroAndEnderecoIdCidade(Integer cep, String logradouro, Integer numero, String bairro, String cidade);
	Optional<List<Endereco>> findByUsuarioId(Integer id);
}
