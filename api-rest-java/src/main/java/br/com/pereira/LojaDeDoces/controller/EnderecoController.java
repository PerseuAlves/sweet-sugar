package br.com.pereira.LojaDeDoces.controller;

import java.time.Instant;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.pereira.LojaDeDoces.model.Endereco;
import br.com.pereira.LojaDeDoces.services.EnderecoService;
import br.com.pereira.LojaDeDoces.services.exception.ResourceNotFoundException;

@RestController
@RequestMapping("/api")
public class EnderecoController {
	
	@Autowired
    private EnderecoService enderecoService;
	
	@GetMapping("/endereco/{CepId}")
    public ResponseEntity<List<Endereco>> getEndereco(
    		@PathVariable(value = "CepId") Integer cepId) {
		
			List<Endereco> enderecos = enderecoService.findByCep(cepId);
	        return ResponseEntity.ok().body(enderecos);
    }
	
	@GetMapping("/endereco/{CepId}/{LogradouroId}/{NumeroId}")
    public ResponseEntity<Endereco> getEndereco(
    		@PathVariable(value = "CepId") Integer cepId,
    		@PathVariable(value = "LogradouroId") String logradouroId,
    		@PathVariable(value = "NumeroId") Integer numeroId) {
		
			Endereco endereco = enderecoService.findByCepLogradouroNumero(
	        		cepId, logradouroId, numeroId);
	        return ResponseEntity.ok().body(endereco);
    }
	
	@GetMapping("/endereco/{CepId}/{LogradouroId}/{NumeroId}/{BairroId}/{CidadeId}")
    public ResponseEntity<Endereco> getEndereco(
    		@PathVariable(value = "CepId") Integer cepId,
    		@PathVariable(value = "LogradouroId") String logradouroId,
    		@PathVariable(value = "NumeroId") Integer numeroId,
    		@PathVariable(value = "BairroId") String bairroId,
    		@PathVariable(value = "CidadeId") String cidadeId) {
		
			Endereco endereco = enderecoService.findByCepLogradouroNumeroBairroCidade(
	        		cepId, logradouroId, numeroId, bairroId, cidadeId);
	        return ResponseEntity.ok().body(endereco);
    }
	
	@GetMapping("/endereco/byUsuario/{UsuarioId}")
    public ResponseEntity<List<Endereco>> getEnderecoByUsuario(
    		@PathVariable(value = "UsuarioId") Integer UsuarioId) {
		
			List<Endereco> enderecos = enderecoService.findByUsuarioId(UsuarioId);
	        return ResponseEntity.ok().body(enderecos);
    }
	
	@GetMapping("/endereco")
    public ResponseEntity<List<Endereco>> getAllEndereco() {
		
			List<Endereco> listaEndereco = enderecoService.findAll();
	        return ResponseEntity.ok().body(listaEndereco);
    }
	
	@PostMapping("/endereco")
    public ResponseEntity<String> postEndereco(@Valid @RequestBody Endereco e) {
		
		try {
			@SuppressWarnings("unused")
			Endereco endereco = enderecoService.findByCepLogradouroNumeroBairroCidadePost(e);
			return ResponseEntity.status(HttpStatus.CONFLICT).body("{\"timestamp\":\"" + Instant.now() + "\",\"message\":\"Endereco já cadastrado\"}");
		} catch (ResourceNotFoundException ex) {
			enderecoService.save(e);
			return ResponseEntity.status(HttpStatus.OK).body("{\"timestamp\":\"" + Instant.now() + "\",\"message\":\"Endereco inserido com sucesso\"}");
		}
    }
	
	@PutMapping("/endereco")
	public ResponseEntity<String> putEndereco(@Valid @RequestBody Endereco[] e) {
		
		String retorno = enderecoService.spPutNewEndereco(e);
		
		if(retorno.contains("sucesso")) {
			return ResponseEntity.status(HttpStatus.OK).body("{\"timestamp\":\"" + Instant.now() + "\",\"message\":\"Endereco atualizado com sucesso\"}");
		} else {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{\"timestamp\":\"" + Instant.now() + "\",\"message\":\"Erro ao atualizar Endereco\"}");
		}
    }
	
	@DeleteMapping("/endereco")
	public ResponseEntity<String> deleteEndereco(@RequestBody Endereco e) {
		
		enderecoService.delete(e);
		return ResponseEntity.status(HttpStatus.OK).body("{\"timestamp\":\"" + Instant.now() + "\",\"message\":\"Endereco deletado com sucesso\"}");
    }
}
