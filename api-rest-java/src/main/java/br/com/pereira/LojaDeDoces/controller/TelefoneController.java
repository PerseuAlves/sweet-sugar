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

import br.com.pereira.LojaDeDoces.model.Telefone;
import br.com.pereira.LojaDeDoces.services.TelefoneService;
import br.com.pereira.LojaDeDoces.services.exception.ResourceNotFoundException;

@RestController
@RequestMapping("/api")
public class TelefoneController {

	@Autowired
	private TelefoneService telefoneService;
	
	@GetMapping("/telefone/{idTelefone}")
    public ResponseEntity<Telefone> getTelefone(@PathVariable(value = "idTelefone") String idTelefone) {
	
		Telefone telefone = telefoneService.findById(idTelefone);
        return ResponseEntity.ok().body(telefone);
    }
	
	@GetMapping("/telefone")
    public ResponseEntity<List<Telefone>> getAllTelefone() {
	
		List<Telefone> listaTelefone = telefoneService.findAll();
        return ResponseEntity.ok().body(listaTelefone);
    }
	
	@PostMapping("/telefone")
    public ResponseEntity<String> postTelefone(@Valid @RequestBody Telefone t) {
		
		try {
			@SuppressWarnings("unused")
			Telefone telefone = telefoneService.findById(t.getNumero());
			return ResponseEntity.status(HttpStatus.CONFLICT).body("{\"timestamp\":\"" + Instant.now() + "\",\"message\":\"Telefone já cadastrado\"}");
		} catch (ResourceNotFoundException e) {
			telefoneService.save(t);
			return ResponseEntity.status(HttpStatus.OK).body("{\"timestamp\":\"" + Instant.now() + "\",\"message\":\"Telefone inserido com sucesso\"}");
		}
    }
	
	@PutMapping("/telefone")
	public ResponseEntity<String> putTelefone(@Valid @RequestBody Telefone[] t) {
		
		String retorno = telefoneService.putNewTelefone(t);
		
		if(retorno.contains("sucesso")) {
			return ResponseEntity.status(HttpStatus.OK).body("{\"timestamp\":\"" + Instant.now() + "\",\"message\":\"Telefone atualizado com sucesso\"}");
		} else {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{\"timestamp\":\"" + Instant.now() + "\",\"message\":\"Erro ao atualizar Telefone\"}");
		}
    }
	
	@DeleteMapping("/telefone")
	public ResponseEntity<String> deleteTelefone(@Valid @RequestBody Telefone t) {
		
		telefoneService.delete(t);
		return ResponseEntity.status(HttpStatus.OK).body("{\"timestamp\":\"" + Instant.now() + "\",\"message\":\"Telefone deletado com sucesso\"}");
    }
}
