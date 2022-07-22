package br.com.pereira.LojaDeDoces.services.exception;

public class ResourceNotFoundException extends RuntimeException {
	private static final long serialVersionUID = 1L;

	public ResourceNotFoundException() {
		super("Não encontrado");
	}
}
