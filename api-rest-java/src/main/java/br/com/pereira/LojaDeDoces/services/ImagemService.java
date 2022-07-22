package br.com.pereira.LojaDeDoces.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.pereira.LojaDeDoces.model.resource.Imagem;
import br.com.pereira.LojaDeDoces.repository.ImagemRepository;
import br.com.pereira.LojaDeDoces.services.exception.IllegalArgumentException;
import br.com.pereira.LojaDeDoces.services.exception.ResourceNotFoundException;

@Service
public class ImagemService {
	
	@Autowired
	private ImagemRepository iRep;
	
	public Imagem findImagem(String id) {
		return iRep.findById(id).orElseThrow(
                () -> new ResourceNotFoundException()
        );
	}
	
	public void save(Imagem i) throws IllegalArgumentException {
		iRep.save(i);
	}
	
	public void delete(Imagem i) throws IllegalArgumentException {
		iRep.delete(i);
	}
}
