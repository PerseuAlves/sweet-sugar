package br.com.pereira.LojaDeDoces.controller;

import java.time.Instant;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.pereira.LojaDeDoces.model.Usuario;
import br.com.pereira.LojaDeDoces.services.EmailService;
import br.com.pereira.LojaDeDoces.services.UsuarioService;
import br.com.pereira.LojaDeDoces.services.exception.ResourceNotFoundException;

@RestController
@RequestMapping("/api")
public class UsuarioController {
	
	@Autowired
	private UsuarioService usuarioService;
	
	@Autowired
	private EmailService emailService;
	
	@Autowired
	private PasswordEncoder encoder;
	
	@GetMapping("/usuario/{idUsuario}")
    public ResponseEntity<Usuario> getUsuario(@PathVariable(value = "idUsuario") Integer idUsuario) {
		
		Usuario usuario = usuarioService.findById(idUsuario);
        return ResponseEntity.ok().body(usuario);
    }
	
	@GetMapping("/usuario/email/{emailUsuario}")
    public ResponseEntity<Usuario> getUsuarioByEmail(@PathVariable(value = "emailUsuario") String emailUsuario) {
		
		Usuario usuario = usuarioService.findByEmail(emailUsuario);
        return ResponseEntity.ok().body(usuario);
    }
	
	@GetMapping("/usuario")
    public ResponseEntity<List<Usuario>> getAllUsuario() {
		
		List<Usuario> listaUsuario = usuarioService.findAll();
        return ResponseEntity.ok().body(listaUsuario);
    }
	
	@PostMapping("/usuario")
    public ResponseEntity<String> postUsuario(@Valid @RequestBody Usuario u) {
		
		try {
			@SuppressWarnings("unused")
			Usuario usuario = usuarioService.findById(u.getId());
			return ResponseEntity.status(HttpStatus.CONFLICT).body("{\"timestamp\":\"" + Instant.now() + "\",\"message\":\"Usuario já cadastrado\"}");
		} catch (ResourceNotFoundException e) {
			u.setSenha(encoder.encode(u.getSenha()));
			usuarioService.save(u);
			String emailStatus = emailService.sendEmailConfirmation(u);
			return ResponseEntity.status(HttpStatus.OK).body("{\"timestamp\":\"" + Instant.now() + "\",\"message\":\"Usuario inserido com sucesso. " + emailStatus + "\"}");
	    }
    }

	@PutMapping("/usuario")
	public ResponseEntity<String> putUsuario(@Valid @RequestBody Usuario u) {
		
		u.setSenha(encoder.encode(u.getSenha()));
		usuarioService.save(u);
		String emailStatus = emailService.sendEmailConfirmation(u);
		return ResponseEntity.status(HttpStatus.OK).body("{\"timestamp\":\"" + Instant.now() + "\",\"message\":\"Usuario atualizado com sucesso. " + emailStatus + "\"}");
    }
	
	@DeleteMapping("/usuario")
	public ResponseEntity<String> deleteUsuario(@Valid @RequestBody Usuario u) {
		
		usuarioService.delete(u);
		return ResponseEntity.status(HttpStatus.OK).body("{\"timestamp\":\"" + Instant.now() + "\",\"message\":\"Usuario deletado com sucesso\"}");
    }
}
