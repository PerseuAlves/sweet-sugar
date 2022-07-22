package br.com.pereira.LojaDeDoces.consumer;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.Objects;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;

import br.com.pereira.LojaDeDoces.model.pagSeguroApi.PagseguroApiJSONCredito;
import br.com.pereira.LojaDeDoces.services.EmailService;

@RestController
@RequestMapping("/api")
public class PagseguroApiConsumer {
	
	public final String HTTP_URL = "https://sandbox.api.pagseguro.com/charges";
	
	@Autowired
	private EmailService emailService;
	
	@PostMapping("/pagseguro/{usuarioEmail}")
	public String cobrancaPagseguroApi(@Valid @RequestBody PagseguroApiJSONCredito p, @PathVariable(value = "usuarioEmail") String usuarioEmail) {
		try {
			URL url = new URL(HTTP_URL);
			HttpURLConnection conn = openConnection(url, 
					"POST", "7AD1DF9691BF4F5FAD52005460D344B4", 
					null, "application/json");
	        
			outputStreamMethod(conn, p);
	        
	        StringBuffer bufferResponse = inputStreamMethod(conn);
	        
	        String emailStatus = emailService.sendEmailPagamento(bufferResponse, usuarioEmail);
	        
	        return "{\"message\":\"" + emailStatus + "\"}";
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return "{\"message\":\"Error ao requisitar o pagamento\"}";
		}
    }
	
	@GetMapping("/pagseguro/consultar/{idCobranca}")
	public JsonNode consultarPagseguroApi(@PathVariable(value = "idCobranca") String idCobranca) {
		try {
			URL url = new URL(HTTP_URL + "/" + idCobranca);
			HttpURLConnection conn = openConnection(url, 
					"GET", "7AD1DF9691BF4F5FAD52005460D344B4", 
					null, null);
	        
			StringBuffer bufferResponse = inputStreamMethod(conn);
	        
	        ObjectMapper mapper = new ObjectMapper();
	        JsonNode node = mapper.readTree(bufferResponse.toString());
			
			return node;
		} catch (Exception e) {
			ObjectMapper mapper = new ObjectMapper();
			JsonNode node;
			try {
				node = mapper.readTree("{\"message\":\"Error ao consultar o pagamento\"}");
				return node;
			} catch (JsonProcessingException e1) {
				return null;
			}
		}
	}
	
	@GetMapping("/pagseguro/captura/{idCaptura}")
	public JsonNode capturaPagseguroApi(@PathVariable(value = "idCaptura") String idCaptura) {
		try {
			URL url = new URL(HTTP_URL + "/" + idCaptura + "/capture");
			HttpURLConnection conn = openConnection(url, 
					"POST", "7AD1DF9691BF4F5FAD52005460D344B4", 
					"application/json", "application/json");
	        
			outputStreamMethod(conn, null);
	        
	        StringBuffer bufferResponse = inputStreamMethod(conn);
	        
	        ObjectMapper mapper = new ObjectMapper();
	        JsonNode node = mapper.readTree(bufferResponse.toString());
			
			return node;
		} catch (Exception e) {
			ObjectMapper mapper = new ObjectMapper();
			JsonNode node;
			try {
				node = mapper.readTree("{\"message\":\"Error ao capturar o pagamento\"}");
				return node;
			} catch (JsonProcessingException e1) {
				return null;
			}
		}
	}
	
	private HttpURLConnection openConnection(URL url, 
			String tipo, String authorizationToken, 
			String accept, String contentType) throws IOException {
		
		HttpURLConnection conn = (HttpURLConnection) url.openConnection();
		
		conn.setConnectTimeout(20000);
        conn.setReadTimeout(20000);
        conn.setDoOutput(true);
        conn.setUseCaches(true);
        conn.setRequestMethod(tipo);
        conn.setRequestProperty("Authorization", authorizationToken);
        if(accept != null) {
        	conn.setRequestProperty("Accept", accept);
        }
        if(contentType != null) {
        	conn.setRequestProperty("Content-Type", contentType);
        }
        
        return conn;
	}
	
	private void outputStreamMethod(HttpURLConnection conn, PagseguroApiJSONCredito p) throws IOException {
		OutputStream outputStream = conn.getOutputStream();
		String JSON;
		if(Objects.isNull(p)) {
			JSON = "{}";
		} else {
			JSON = convertToJSON(p);
		}
        byte[] bytes = JSON.getBytes(StandardCharsets.UTF_8);

        outputStream.write(bytes);
        outputStream.flush();
        outputStream.close();
	}
	
	private StringBuffer inputStreamMethod(HttpURLConnection conn) throws IOException {
		InputStream inputStream = conn.getInputStream();
        byte[] bytesResponse = new byte[2048];
        StringBuffer bufferResponse = new StringBuffer();
        int i = 0;

        while ((i = inputStream.read(bytesResponse)) != -1) {
            bufferResponse.append(new String(bytesResponse, 0, i));
        }

        inputStream.close();
        
		return bufferResponse;
	}
	
	private String convertToJSON(PagseguroApiJSONCredito p) {
		Gson gson = new Gson();
        String json = gson.toJson(p);

        return json;
    }
}
