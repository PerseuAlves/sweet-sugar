package br.com.pereira.LojaDeDoces.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.pereira.LojaDeDoces.model.Produto;
import br.com.pereira.LojaDeDoces.model.resource.CategoriaFromProduto;
import br.com.pereira.LojaDeDoces.repository.ProdutoRepository;
import br.com.pereira.LojaDeDoces.services.exception.IllegalArgumentException;
import br.com.pereira.LojaDeDoces.services.exception.ResourceNotFoundException;

@Service
public class ProdutoService {

	@Autowired
    private ProdutoRepository pRep;
	
	public List<Produto> findAll() {
		return pRep.findAll();
	}
	
	public List<Produto> findAllByCategoria(String categoriaProduto) {
		return pRep.findByCategoria1OrCategoria2OrCategoria3(categoriaProduto, 
				categoriaProduto, categoriaProduto).orElseThrow(
                () -> new ResourceNotFoundException()
        );
	}
	
	public List<Produto> findAllByHighPrice() {
		return pRep.findAllByHighPrice().orElseThrow(
                () -> new ResourceNotFoundException()
        );
	}
	
	public List<Produto> findAllByLowerPrice() {
		return pRep.findAllByLowerPrice().orElseThrow(
                () -> new ResourceNotFoundException()
        );
	}
	
	public List<CategoriaFromProduto> findAllDistinctCategoria() {
		return pRep.findAllDistinctCategoria().orElseThrow(
                () -> new ResourceNotFoundException()
        );
	}
	
	public Produto findById(Integer idProduto) {
		return pRep.findById(idProduto).orElseThrow(
                () -> new ResourceNotFoundException()
        );
	}
	
	public Produto findByTitulo(String tituloProduto) {
		return pRep.findByTitulo(tituloProduto).orElseThrow(
                () -> new ResourceNotFoundException()
        );
	}
	
	public void save(Produto p) throws IllegalArgumentException {
		pRep.save(p);
	}
	
	public void delete(Produto p) throws IllegalArgumentException {
		pRep.delete(p);
	}
}
