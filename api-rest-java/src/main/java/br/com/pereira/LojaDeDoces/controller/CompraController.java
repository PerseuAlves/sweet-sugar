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

import br.com.pereira.LojaDeDoces.model.Compra;
import br.com.pereira.LojaDeDoces.services.CompraService;
import br.com.pereira.LojaDeDoces.services.exception.ResourceNotFoundException;

@RestController
@RequestMapping("/api")
public class CompraController {

	@Autowired
    private CompraService CompraService;
	
	@GetMapping("/compra")
    public ResponseEntity<List<Compra>> getAllCompra() {
		
		List<Compra> listaCompra = CompraService.findAll();
        return ResponseEntity.ok().body(listaCompra);
    }
	
	@GetMapping("/compra/{idCompra}")
    public ResponseEntity<Compra> getCompra(@PathVariable(value = "idCompra") Integer idCompra) {
		
		Compra compra = CompraService.findById(idCompra);
		return ResponseEntity.ok().body(compra);
    }
	
	@PostMapping("/compra")
    public ResponseEntity<String> postCompra(@Valid @RequestBody Compra c) {
		
		try {
			@SuppressWarnings("unused")
			Compra compra = CompraService.findById(c.getId());
			return ResponseEntity.status(HttpStatus.CONFLICT).body("{\"timestamp\":\"" + Instant.now() + "\",\"message\":\"Compra já cadastrada\"}");
		} catch (ResourceNotFoundException e) {
			CompraService.save(c);
			return ResponseEntity.status(HttpStatus.OK).body("{\"timestamp\":\"" + Instant.now() + "\",\"message\":\"Compra inserida com sucesso\"}");
		}
    }
	
	@PutMapping("/compra")
	public ResponseEntity<String> putCompra(@Valid @RequestBody Compra c) {
		
		CompraService.save(c);
		return ResponseEntity.status(HttpStatus.OK).body("{\"timestamp\":\"" + Instant.now() + "\",\"message\":\"Compra atualizada com sucesso\"}");
    }
	
	@DeleteMapping("/compra")
	public ResponseEntity<String> deleteCompra(@Valid @RequestBody Compra c) {
		
		CompraService.delete(c);
		return ResponseEntity.status(HttpStatus.OK).body("{\"timestamp\":\"" + Instant.now() + "\",\"message\":\"Compra deletada com sucesso\"}");
    }
}
