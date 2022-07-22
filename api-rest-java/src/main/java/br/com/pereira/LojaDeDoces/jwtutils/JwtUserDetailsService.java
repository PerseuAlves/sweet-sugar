package br.com.pereira.LojaDeDoces.jwtutils;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import br.com.pereira.LojaDeDoces.model.Adm;
import br.com.pereira.LojaDeDoces.model.Usuario;
import br.com.pereira.LojaDeDoces.services.AdmService;
import br.com.pereira.LojaDeDoces.services.UsuarioService;
import br.com.pereira.LojaDeDoces.services.exception.ResourceNotFoundException;

@Service
public class JwtUserDetailsService implements UserDetailsService {
	
	@Autowired
	UsuarioService usuarioService;
	
	@Autowired
	AdmService admService;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		try {
			Usuario usuario = usuarioService.findByEmail(username);
			return new User(usuario.getEmail(), usuario.getSenha(), 
					new ArrayList<>());
		} catch (ResourceNotFoundException e) {
			try {
				Adm adm = admService.findByEmail(username);
				return new User(adm.getEmail(), adm.getSenha(), 
						new ArrayList<>());
			} catch (ResourceNotFoundException ex) {
				throw new UsernameNotFoundException("User not found with username: " + username);
			}
		}
	}
}
