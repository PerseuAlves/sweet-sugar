package br.com.pereira.LojaDeDoces.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.pereira.LojaDeDoces.model.Endereco;
import br.com.pereira.LojaDeDoces.repository.EnderecoRepository;
import br.com.pereira.LojaDeDoces.services.exception.IllegalArgumentException;
import br.com.pereira.LojaDeDoces.services.exception.ResourceNotFoundException;

@Service
public class EnderecoService {

	@Autowired
    private EnderecoRepository eRep;
	
	public List<Endereco> findAll() {
		return eRep.findAll();
	}
	
	public List<Endereco> findByCep(Integer cepId) {
		return eRep.findByEnderecoIdCep(cepId).orElseThrow(
                () -> new ResourceNotFoundException()
        );
	}
	
	public Endereco findByCepLogradouroNumero(
			Integer cepId, String logradouroId, Integer numeroId) {
		return eRep.findByEnderecoIdCepAndEnderecoIdLogradouroAndEnderecoIdNumero(
				cepId, logradouroId, numeroId).orElseThrow(
		                () -> new ResourceNotFoundException()
		);
	}
	
	public Endereco findByCepLogradouroNumeroBairroCidade(
			Integer cepId, String logradouroId, Integer numeroId, String bairroId, 
			String cidadeId) {
		return eRep.findByEnderecoIdCepAndEnderecoIdLogradouroAndEnderecoIdNumeroAndEnderecoIdBairroAndEnderecoIdCidade(
				cepId, logradouroId, numeroId, bairroId, cidadeId).orElseThrow(
		                () -> new ResourceNotFoundException()
		);
	}
	
	public Endereco findByCepLogradouroNumeroBairroCidadePost(Endereco e) {
		return eRep.findByEnderecoIdCepAndEnderecoIdLogradouroAndEnderecoIdNumeroAndEnderecoIdBairroAndEnderecoIdCidade(
				e.getEnderecoId().getCep(), e.getEnderecoId().getLogradouro(), 
				e.getEnderecoId().getNumero(), e.getEnderecoId().getBairro(), 
				e.getEnderecoId().getCidade()).orElseThrow(
		                () -> new ResourceNotFoundException()
		);
	}
	
	public List<Endereco> findByUsuarioId(Integer usuarioId) {
		return eRep.findByUsuarioId(usuarioId).orElseThrow(
                () -> new ResourceNotFoundException()
        );
	}
	
	public void save(Endereco e) throws IllegalArgumentException {
		eRep.save(e);
	}
	
	public void delete(Endereco e) throws IllegalArgumentException {
		eRep.delete(e);
	}
	
	public String spPutNewEndereco(Endereco[] e) {
		if(validaEndereco(e)) {
			throw new IllegalArgumentException();
		} else {
			return eRep.spPutNewEndereco(e[0].getEnderecoId().getCep(), 
	        		e[0].getEnderecoId().getLogradouro(), 
	        		e[0].getEnderecoId().getNumero(), 
	        		e[0].getEnderecoId().getBairro(), 
	        		e[0].getEnderecoId().getCidade(), 
	        		e[1].getEnderecoId().getCep(), 
	        		e[1].getEnderecoId().getLogradouro(), 
	        		e[1].getEnderecoId().getNumero(), 
	        		e[1].getEnderecoId().getBairro(), 
	        		e[1].getEnderecoId().getCidade(),
	        		e[1].getComplemento());
		}
	}
	
	private boolean validaEndereco(Endereco[] e) {
		
		if(e[0].getEnderecoId().getCep() == 0 || 
		   e[0].getEnderecoId().getLogradouro().isBlank() || 
		   e[0].getEnderecoId().getNumero() == 0 || 
		   e[0].getEnderecoId().getBairro().isBlank() || 
		   e[0].getEnderecoId().getCidade().isBlank() || 
		   e[1].getEnderecoId().getCep() == 0 || 
		   e[1].getEnderecoId().getLogradouro().isBlank() || 
		   e[1].getEnderecoId().getNumero() == 0 || 
		   e[1].getEnderecoId().getBairro().isBlank() || 
		   e[1].getEnderecoId().getCidade().isBlank()) 
		{
			return true;
		} else {
			return false;
		}
	}
}
