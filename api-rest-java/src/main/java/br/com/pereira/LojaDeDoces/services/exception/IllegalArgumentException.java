package br.com.pereira.LojaDeDoces.services.exception;

public class IllegalArgumentException extends RuntimeException {
	private static final long serialVersionUID = 1L;

	public IllegalArgumentException() {
		super("Valores inválidos");
	}
}
