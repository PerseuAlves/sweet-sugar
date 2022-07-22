package br.com.pereira.LojaDeDoces.controller;

import java.time.Instant;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.pereira.LojaDeDoces.model.Adm;
import br.com.pereira.LojaDeDoces.services.AdmService;

@RestController
@RequestMapping("/api")
public class AdmController {

	@Autowired
    private AdmService admService;
	
	@Autowired
	private PasswordEncoder encoder;
	
	@GetMapping("/adm/{idAdm}")
    public ResponseEntity<Adm> getAdm(@PathVariable(value = "idAdm") Integer idAdm) {

		Adm adm = admService.findById(idAdm);
        return ResponseEntity.ok().body(adm);
    }
	
	@GetMapping("/adm/email/{emailAdm}")
    public ResponseEntity<Adm> getAdm(@PathVariable(value = "emailAdm") String emailAdm) {

		Adm adm = admService.findByEmail(emailAdm);
        return ResponseEntity.ok().body(adm);
    }
	
	@PutMapping("/adm")
	public ResponseEntity<String> putAdm(@Valid @RequestBody Adm a) {
		
		a.setSenha(encoder.encode(a.getSenha()));
		admService.save(a);
		return ResponseEntity.status(HttpStatus.OK).body("{\"timestamp\":\"" + Instant.now() + "\",\"message\":\"Adm atualizado com sucesso\"}");
    }
}
