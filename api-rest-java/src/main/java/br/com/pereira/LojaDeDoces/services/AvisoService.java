package br.com.pereira.LojaDeDoces.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.pereira.LojaDeDoces.model.Aviso;
import br.com.pereira.LojaDeDoces.repository.AvisoRepository;
import br.com.pereira.LojaDeDoces.services.exception.IllegalArgumentException;
import br.com.pereira.LojaDeDoces.services.exception.ResourceNotFoundException;

@Service
public class AvisoService {

	@Autowired
    private AvisoRepository aRep;
	
	public List<Aviso> findAll() {
		return aRep.findAll();
	}
	
	public Aviso findById(Integer idAviso) {
		return aRep.findById(idAviso).orElseThrow(
                () -> new ResourceNotFoundException()
        );
	}
	
	public void save(Aviso a) throws IllegalArgumentException {
		aRep.save(a);
	}
	
	public void delete(Aviso a) throws IllegalArgumentException {
		aRep.delete(a);
	}
}
