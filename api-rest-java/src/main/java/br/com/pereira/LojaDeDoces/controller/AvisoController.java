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

import br.com.pereira.LojaDeDoces.model.Aviso;
import br.com.pereira.LojaDeDoces.services.AvisoService;
import br.com.pereira.LojaDeDoces.services.exception.ResourceNotFoundException;

@RestController
@RequestMapping("/api")
public class AvisoController {

	@Autowired
	AvisoService avisoService;
	
	@GetMapping("/aviso/{idAviso}")
    public ResponseEntity<Aviso> getAviso(@PathVariable(value = "idAviso") Integer idAviso) {
		
		Aviso aviso = avisoService.findById(idAviso);
        return ResponseEntity.ok().body(aviso);
    }
	
	@GetMapping("/aviso")
    public ResponseEntity<List<Aviso>> getAllAviso() {
		
		List<Aviso> listaAviso = avisoService.findAll();
        return ResponseEntity.ok().body(listaAviso);
    }
	
	@PostMapping("/aviso")
    public ResponseEntity<String> postAviso(@Valid @RequestBody Aviso a) {
		
		try {
			@SuppressWarnings("unused")
			Aviso aviso = avisoService.findById(a.getId());
			return ResponseEntity.status(HttpStatus.CONFLICT).body("{\"timestamp\":\"" + Instant.now() + "\",\"message\":\"Aviso já cadastrado\"}");
		} catch (ResourceNotFoundException e) {
			avisoService.save(a);
			return ResponseEntity.status(HttpStatus.OK).body("{\"timestamp\":\"" + Instant.now() + "\",\"message\":\"Aviso inserido com sucesso\"}");
		}
    }
	
	@PutMapping("/aviso")
	public ResponseEntity<String> putAviso(@Valid @RequestBody Aviso a) {
		
		avisoService.save(a);
		return ResponseEntity.status(HttpStatus.OK).body("{\"timestamp\":\"" + Instant.now() + "\",\"message\":\"Aviso atualizado com sucesso\"}");
    }
	
	@DeleteMapping("/aviso")
	public ResponseEntity<String> deleteAviso(@Valid @RequestBody Aviso a) {
		
		avisoService.delete(a);
		return ResponseEntity.status(HttpStatus.OK).body("{\"timestamp\":\"" + Instant.now() + "\",\"message\":\"Aviso deletado com sucesso\"}");
    }
}
