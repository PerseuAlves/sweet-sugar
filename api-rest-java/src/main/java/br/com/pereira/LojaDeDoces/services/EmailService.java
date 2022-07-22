package br.com.pereira.LojaDeDoces.services;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import br.com.pereira.LojaDeDoces.model.Usuario;

@Service
public class EmailService {
	
	@Value("${spring.mail.username}")
	private String sender;
	
	@Autowired
	private JavaMailSender emailSender;
	
	public String sendEmailConfirmation(Usuario usuario) {
		try {
			SimpleMailMessage sm = prepareSimpleMailMessageFromUsuario(usuario);
			emailSender.send(sm);
			return "Email enviado com sucesso";
		} catch (Exception e) {
			return "Email não enviado";
		}
	}
	
	public String sendEmailPagamento(StringBuffer jsonEmFormatoStringBuffer, String usuarioEmail) {
		SimpleMailMessage sm = null;
		try {
			sm = prepareSimpleMailMessageFromJSON(jsonEmFormatoStringBuffer, usuarioEmail);
			emailSender.send(sm);
			return "Email enviado com sucesso" + " - " + sm.getText().replace("\"", "");
		} catch (Exception e) {
			return "Email não enviado" + " - " + sm.getText().replace("\"", "");
		}
	}
	
	private SimpleMailMessage prepareSimpleMailMessageFromUsuario(Usuario usuario) {
		SimpleMailMessage sm = new SimpleMailMessage();
		
		sm.setTo(usuario.getEmail());
		sm.setFrom(sender);
		sm.setSubject("SweetSugar");
		sm.setSentDate(new Date(System.currentTimeMillis()));
		sm.setText("Cadastro realizado!\nLogin cadastrado: " + usuario.getEmail() + "\nSenha cadastrada: " + usuario.getSenha());
		
		return sm;
	}
	
	private SimpleMailMessage prepareSimpleMailMessageFromJSON(StringBuffer jsonEmFormatoStringBuffer, String usuarioEmail) {
		String jsonRetorno = jsonEmFormatoStringBuffer.toString();
		String[] campos = jsonRetorno.split(",");
		String[] campoIdDividido = null;
		String[] campoStatusDividido = null;
		String id = "";
		String status = "";
		
		for(Integer i=0; i<campos.length; i++) {
			if(campos[i].contains("\"id\"")) {
				campoIdDividido = campos[i].split(":");
			} else if(campos[i].contains("status")) {
				campoStatusDividido = campos[i].split(":");
			}
		}
		
		if(campoStatusDividido[1].contains("AUTHORIZED")) {
			id = " - Código da compra: " + campoIdDividido[1];
			status = "Autorizado";
		} else {
			status = "Não realizada";
		}
		
		SimpleMailMessage sm = new SimpleMailMessage();
		
		sm.setTo(usuarioEmail);
		sm.setFrom(sender);
		sm.setSubject("SweetSugar");
		sm.setSentDate(new Date(System.currentTimeMillis()));
		sm.setText("Status da compra: " + status + id);
		
		return sm;
	}
}
