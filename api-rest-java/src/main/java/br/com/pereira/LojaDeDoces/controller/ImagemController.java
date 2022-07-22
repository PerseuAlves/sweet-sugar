package br.com.pereira.LojaDeDoces.controller;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.Instant;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import br.com.pereira.LojaDeDoces.model.resource.Imagem;
import br.com.pereira.LojaDeDoces.services.ImagemService;
import br.com.pereira.LojaDeDoces.services.exception.ResourceNotFoundException;

@RestController
@RequestMapping("/api")
public class ImagemController {

	@Autowired
	private ImagemService imagemService;
	
	@GetMapping("/imagem/{ImagemId}")
	public ResponseEntity<String> getImagem(
			@PathVariable(value = "ImagemId") String imagemId) {
		
		Imagem imagem = imagemService.findImagem(imagemId);
		Path diretorioAtual = Paths.get("").toAbsolutePath();
		
		try {
			String arquivoPath = diretorioAtual.normalize().toString() + File.separator + "Documents" + File.separator + "jee-2021-06" + File.separator + "Projetos" + File.separator + "LojaDeDoces" + File.separator + "arquivos" + File.separator + imagem.getId();
			Path path = Paths.get(arquivoPath);
			
		    BufferedReader reader = Files.newBufferedReader(path);
		    String line = reader.readLine();
    	    
    	    return ResponseEntity.status(HttpStatus.OK).body("{\"timestamp\":\"" + Instant.now() + "\",\"message\":\"" + line + "\"}");
		} catch (IOException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("{\"timestamp\":\"" + Instant.now() + "\",\"message\":\"Erro ao ler arquivo da imagem no servidor\"}");
		}
	}
	
	@RequestMapping(value = "/imagem/{ImagemId}", method = RequestMethod.POST, consumes = MediaType.TEXT_PLAIN_VALUE)
    public ResponseEntity<String> postImagem(
    		@PathVariable(value = "ImagemId") String nomeDoArquivo, @RequestBody String arquivoEmString) {
		
		try {
			@SuppressWarnings("unused")
			Imagem imagem = imagemService.findImagem(new Imagem(nomeDoArquivo).getId());
			
			return ResponseEntity.status(HttpStatus.CONFLICT).body("{\"timestamp\":\"" + Instant.now() + "\",\"message\":\"Imagem já cadastrada\"}");
		} catch (ResourceNotFoundException ex) {
			Path diretorioAtual = Paths.get("").toAbsolutePath();
			
			try {
				String path = diretorioAtual.normalize().toString() + File.separator + "Documents" + File.separator + "jee-2021-06" + File.separator + "Projetos" + File.separator + "LojaDeDoces" + File.separator + "arquivos";
				File novoArquivo = new File(path + File.separator + nomeDoArquivo);
			
				if(novoArquivo.createNewFile()) {
					FileWriter writer = new FileWriter(path + File.separator + nomeDoArquivo);
					
					writer.write(arquivoEmString);
					writer.close();
				}
			} catch (IOException e) {
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("{\"timestamp\":\"" + Instant.now() + "\",\"message\":\"Erro ao criar arquivo da imagem no servidor\"}");
			}
			
			imagemService.save(new Imagem(nomeDoArquivo));
			return ResponseEntity.status(HttpStatus.OK).body("{\"timestamp\":\"" + Instant.now() + "\",\"message\":\"Imagem inserida com sucesso\"}");
		}
    }
	
	@RequestMapping(value = "/imagem/{ImagemId}", method = RequestMethod.PUT, consumes = MediaType.TEXT_PLAIN_VALUE)
    public ResponseEntity<String> putImagem(@PathVariable(value = "ImagemId") String nomeDoArquivo, @RequestBody String arquivoEmString) {
		
		Path diretorioAtual = Paths.get("").toAbsolutePath();
		
		try {
			String path = diretorioAtual.normalize().toString() + File.separator + "Documents" + File.separator + "jee-2021-06" + File.separator + "Projetos" + File.separator + "LojaDeDoces" + File.separator + "arquivos";
			File novoArquivo = new File(path + File.separator + nomeDoArquivo);
		
			if(novoArquivo.exists()) {
				FileWriter writer = new FileWriter(path + File.separator + nomeDoArquivo, false);
				
				writer.write(arquivoEmString);
				writer.close();
			}
		} catch (IOException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("{\"timestamp\":\"" + Instant.now() + "\",\"message\":\"Erro ao criar arquivo da imagem no servidor\"}");
		}
		
		imagemService.save(new Imagem(nomeDoArquivo));
		return ResponseEntity.status(HttpStatus.OK).body("{\"timestamp\":\"" + Instant.now() + "\",\"message\":\"Imagem atualizada com sucesso\"}");
    }
	
	@DeleteMapping("/imagem")
	public ResponseEntity<String> deleteImagem(@Valid @RequestBody Imagem i) {
		
		Path diretorioAtual = Paths.get("").toAbsolutePath();
		
		String path = diretorioAtual.normalize().toString() + File.separator + "Documents" + File.separator + "jee-2021-06" + File.separator + "Projetos" + File.separator + "LojaDeDoces" + File.separator + "arquivos";
		File novoArquivo = new File(path + File.separator + i.getId());
		
		if(novoArquivo.exists()) {
			novoArquivo.delete();
			imagemService.delete(i);
			
			return ResponseEntity.status(HttpStatus.OK).body("{\"timestamp\":\"" + Instant.now() + "\",\"message\":\"Imagem deletada com sucesso\"}");
		} else {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("{\"timestamp\":\"" + Instant.now() + "\",\"message\":\"Erro ao deletar arquivo da imagem no servidor\"}");
		}
    }
}
