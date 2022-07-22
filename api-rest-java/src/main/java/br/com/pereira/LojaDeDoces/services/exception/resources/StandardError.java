package br.com.pereira.LojaDeDoces.services.exception.resources;

import java.time.Instant;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class StandardError {

	private Instant timestamp;
	private Integer status;
	private String error;
	private String message;
	private String path;
	
}
