package br.com.pereira.LojaDeDoces.jwtutils.models;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class JwtRequestModel implements Serializable {

	private static final long serialVersionUID = 2636936156391265891L;

	private String username;
	private String password;

}
