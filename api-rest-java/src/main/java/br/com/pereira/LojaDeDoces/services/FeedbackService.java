package br.com.pereira.LojaDeDoces.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.pereira.LojaDeDoces.model.Feedback;
import br.com.pereira.LojaDeDoces.repository.FeedbackRepository;
import br.com.pereira.LojaDeDoces.services.exception.IllegalArgumentException;
import br.com.pereira.LojaDeDoces.services.exception.ResourceNotFoundException;

@Service
public class FeedbackService {

	@Autowired
	private FeedbackRepository fRep;
	
	public List<Feedback> findAll() {
		return fRep.findAll();
	}
	
	public Feedback findById(Integer idFeedback) {
		return fRep.findById(idFeedback).orElseThrow(
                () -> new ResourceNotFoundException()
        );
	}
	
	public void save(Feedback f) throws IllegalArgumentException {
		fRep.save(f);
	}
	
	public void delete(Feedback f) throws IllegalArgumentException {
		fRep.delete(f);
	}
}
