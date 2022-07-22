package br.com.pereira.LojaDeDoces.services;

import java.util.List;
import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.pereira.LojaDeDoces.model.Usuario;
import br.com.pereira.LojaDeDoces.repository.UsuarioRepository;
import br.com.pereira.LojaDeDoces.services.exception.IllegalArgumentException;
import br.com.pereira.LojaDeDoces.services.exception.ResourceNotFoundException;

@Service
public class UsuarioService {

	@Autowired
    private UsuarioRepository uRep;
	
	public List<Usuario> findAll() {
		return uRep.findAll();
	}
	
	public Usuario findById(Integer idUsuario) {
		return uRep.findById(idUsuario).orElseThrow(
                () -> new ResourceNotFoundException()
        );
	}
	
	public Usuario findByEmail(String emailUsuario) {
		return uRep.findByEmail(emailUsuario).orElseThrow(
                () -> new ResourceNotFoundException()
        );
	}
	
	public void save(Usuario u) throws IllegalArgumentException {
		validaUsuario(u);
		uRep.save(u);
	}

	public void delete(Usuario u) throws IllegalArgumentException {
		uRep.delete(u);
	}
	
	private void validaUsuario(Usuario u) throws IllegalArgumentException {
		if(!Pattern.compile("^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@" 
		        + "[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$")
			      .matcher(u.getEmail())
			      .matches()) {
			System.out.println("Entrou");
			throw new IllegalArgumentException();
		}
	}
}
