package br.com.pereira.LojaDeDoces.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.pereira.LojaDeDoces.model.Telefone;
import br.com.pereira.LojaDeDoces.repository.TelefoneRepository;
import br.com.pereira.LojaDeDoces.services.exception.IllegalArgumentException;
import br.com.pereira.LojaDeDoces.services.exception.ResourceNotFoundException;

@Service
public class TelefoneService {

	@Autowired
    private TelefoneRepository tRep;
	
	public List<Telefone> findAll() {
		return tRep.findAll();
	}
	
	public Telefone findById(String idTelefone) {
		return tRep.findById(idTelefone).orElseThrow(
                () -> new ResourceNotFoundException()
        );
	}
	
	public void save(Telefone t) throws IllegalArgumentException {
		validaTelefone(t);
		tRep.save(t);
	}

	public void delete(Telefone t) throws IllegalArgumentException {
		tRep.delete(t);
	}

	public String putNewTelefone(Telefone[] t) {
		validaTelefones(t);
		return tRep.putNewTelefone(t[0].getNumero(), t[1].getNumero());
	}

	private void validaTelefone(Telefone t) {
		try {
			Long.parseLong(t.getNumero());
		} catch (NumberFormatException e) {
			throw new IllegalArgumentException();
		}		
	}
	
	private void validaTelefones(Telefone[] t) {
		try {
			Long.parseLong(t[0].getNumero());
			Long.parseLong(t[1].getNumero());
			
			if(t[0].getNumero().isBlank() || t[1].getNumero().isBlank()) {
				throw new IllegalArgumentException();
			}
		} catch (NumberFormatException e) {
			throw new IllegalArgumentException();
		}	
	}
}
