package br.com.pereira.LojaDeDoces.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.pereira.LojaDeDoces.model.Feedback;

public interface FeedbackRepository extends JpaRepository<Feedback, Integer>{

}
