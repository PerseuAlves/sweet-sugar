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
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.pereira.LojaDeDoces.model.Produto;
import br.com.pereira.LojaDeDoces.model.resource.CategoriaFromProduto;
import br.com.pereira.LojaDeDoces.services.ProdutoService;
import br.com.pereira.LojaDeDoces.services.exception.ResourceNotFoundException;

@RestController
@RequestMapping("/api")
public class ProdutoController {

	@Autowired
	private ProdutoService produtoService;
	
	@GetMapping("/produto")
    public ResponseEntity<List<Produto>> getAllProduto() {
		
		List<Produto> listaProduto = produtoService.findAll();
        return ResponseEntity.ok().body(listaProduto);
    }
	
	@GetMapping("/produto/{idProduto}")
    public ResponseEntity<Produto> getProduto(@PathVariable(value = "idProduto") Integer idProduto) {
		
		Produto produto = produtoService.findById(idProduto);
        return ResponseEntity.ok().body(produto);
    }
	
	@GetMapping("/produto/titulo/{tituloProduto}")
    public ResponseEntity<Produto> getProdutoByTitulo(@PathVariable(value = "tituloProduto") String tituloProduto) {
		
		Produto produto = produtoService.findByTitulo(tituloProduto);
        return ResponseEntity.ok().body(produto);
    }
	
	@GetMapping("/produto/categoria/{categoriaProduto}")
    public ResponseEntity<List<Produto>> getProdutoByCategoria(@PathVariable(value = "categoriaProduto") String categoriaProduto) {
		
		List<Produto> produto = produtoService.findAllByCategoria(categoriaProduto);
        return ResponseEntity.ok().body(produto);
    }
	
	@GetMapping("/produto/byHighPrice")
    public ResponseEntity<List<Produto>> getAllProdutoByHighPrice() {
		
		List<Produto> listaProduto = produtoService.findAllByHighPrice();
        return ResponseEntity.ok().body(listaProduto);
    }
	
	@GetMapping("/produto/byLowerPrice")
    public ResponseEntity<List<Produto>> getAllProdutoByLowerPrice() {
		
		List<Produto> listaProduto = produtoService.findAllByLowerPrice();
        return ResponseEntity.ok().body(listaProduto);
    }
	
	@GetMapping("/produto/allCategory")
    public ResponseEntity<List<CategoriaFromProduto>> getAllDistinctCategoria() {
		
		List<CategoriaFromProduto> listaCategoria = produtoService.findAllDistinctCategoria();
        return ResponseEntity.ok().body(listaCategoria);
	}
	
	@PostMapping("/produto")
    public ResponseEntity<String> postProduto(@Valid @RequestBody Produto p) {
		
		try {
			@SuppressWarnings("unused")
			Produto produto = produtoService.findById(p.getId());
			return ResponseEntity.status(HttpStatus.CONFLICT).body("{\"timestamp\":\"" + Instant.now() + "\",\"message\":\"Produto já cadastrado\"}");
		} catch (ResourceNotFoundException e) {
			produtoService.save(p);
			return ResponseEntity.status(HttpStatus.OK).body("{\"timestamp\":\"" + Instant.now() + "\",\"message\":\"Produto inserido com sucesso\"}");
		}
    }
	
	@PutMapping("/produto")
	public ResponseEntity<String> putProduto(@Valid @RequestBody Produto p) {
		
		produtoService.save(p);
		return ResponseEntity.status(HttpStatus.OK).body("{\"timestamp\":\"" + Instant.now() + "\",\"message\":\"Produto atualizado com sucesso\"}");
    }
	
	@DeleteMapping("/produto")
	public ResponseEntity<String> deleteProduto(@Valid @RequestBody Produto p) {
		
		produtoService.delete(p);
		return ResponseEntity.status(HttpStatus.OK).body("{\"timestamp\":\"" + Instant.now() + "\",\"message\":\"Produto deletado com sucesso\"}");
    }
}
