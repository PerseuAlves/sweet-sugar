package br.com.pereira.LojaDeDoces.services;

import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.pereira.LojaDeDoces.model.Adm;
import br.com.pereira.LojaDeDoces.repository.AdmRepository;
import br.com.pereira.LojaDeDoces.services.exception.IllegalArgumentException;
import br.com.pereira.LojaDeDoces.services.exception.ResourceNotFoundException;

@Service
public class AdmService {

	@Autowired
    private AdmRepository aRep;
	
	public Adm findById(Integer idAdm) {
		return aRep.findById(idAdm).orElseThrow(
                () -> new ResourceNotFoundException()
        );
	}
	
	public Adm findByEmail(String emailAdm) {
		return aRep.findByEmail(emailAdm).orElseThrow(
                () -> new ResourceNotFoundException()
        );
	}
	
	public void save(Adm a) throws IllegalArgumentException {
		validaAdm(a);
		aRep.save(a);
	}

	private void validaAdm(Adm a) throws IllegalArgumentException {
		try {
			Long.parseLong(a.getTelefone());
			
			if(!Pattern.compile("^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@" 
			        + "[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$")
				      .matcher(a.getEmail())
				      .matches()) {
				throw new IllegalArgumentException();
			}
		} catch (NumberFormatException e) {
			throw new IllegalArgumentException();
		}
	}
}
