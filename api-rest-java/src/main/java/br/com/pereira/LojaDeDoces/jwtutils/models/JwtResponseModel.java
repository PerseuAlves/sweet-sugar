package br.com.pereira.LojaDeDoces.jwtutils.models;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class JwtResponseModel implements Serializable {

	private static final long serialVersionUID = 1L;

	private final String token;

}
