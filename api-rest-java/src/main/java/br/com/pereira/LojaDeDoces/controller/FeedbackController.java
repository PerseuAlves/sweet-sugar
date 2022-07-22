package br.com.pereira.LojaDeDoces.controller;

import java.time.Instant;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.pereira.LojaDeDoces.model.Feedback;
import br.com.pereira.LojaDeDoces.services.FeedbackService;
import br.com.pereira.LojaDeDoces.services.exception.ResourceNotFoundException;

@RestController
@RequestMapping("/api")
public class FeedbackController {

	@Autowired
	FeedbackService feedbackService;
	
	@GetMapping("/feedback")
    public ResponseEntity<List<Feedback>> getAllfeedback() {
		
		List<Feedback> listaFeedback = feedbackService.findAll();
        return ResponseEntity.ok().body(listaFeedback);
    }
	
	@GetMapping("/feedback/{idFeedback}")
    public ResponseEntity<Feedback> getFeedback(@PathVariable(value = "idFeedback") Integer idFeedback) {
		
		Feedback feedback = feedbackService.findById(idFeedback);
        return ResponseEntity.ok().body(feedback);
    }
	
	@PostMapping("/feedback")
    public ResponseEntity<String> postFeedback(@Valid @RequestBody Feedback f) {
		
		try {
			@SuppressWarnings("unused")
			Feedback feedback = feedbackService.findById(f.getId());
			return ResponseEntity.status(HttpStatus.CONFLICT).body("{\"timestamp\":\"" + Instant.now() + "\",\"message\":\"Feedback já cadastrado\"}");
		} catch (ResourceNotFoundException e) {
			feedbackService.save(f);
			return ResponseEntity.status(HttpStatus.OK).body("{\"timestamp\":\"" + Instant.now() + "\",\"message\":\"Feedback inserido com sucesso\"}");
		}
    }
	
	@DeleteMapping("/feedback")
	public ResponseEntity<String> deleteFeedback(@Valid @RequestBody Feedback f) {
		
		feedbackService.delete(f);
		return ResponseEntity.status(HttpStatus.OK).body("{\"timestamp\":\"" + Instant.now() + "\",\"message\":\"Feedback deletado com sucesso\"}");
    }
}
