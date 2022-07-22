package br.com.pereira.LojaDeDoces.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.pereira.LojaDeDoces.model.Compra;
import br.com.pereira.LojaDeDoces.repository.CompraRepository;
import br.com.pereira.LojaDeDoces.services.exception.IllegalArgumentException;
import br.com.pereira.LojaDeDoces.services.exception.ResourceNotFoundException;

@Service
public class CompraService {

	@Autowired
	private CompraRepository cRep;
	
	public List<Compra> findAll() {
		return cRep.findAll();
	}
	
	public Compra findById(Integer id) {
		return cRep.findById(id).orElseThrow(
                () -> new ResourceNotFoundException()
        );
	}
	
	public void save(Compra c) throws IllegalArgumentException {
		cRep.save(c);
	}
	
	public void delete(Compra c) throws IllegalArgumentException {
		cRep.delete(c);
	}
}
