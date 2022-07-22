package br.com.pereira.LojaDeDoces.model.pagSeguroApi;

import javax.validation.constraints.NotBlank;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Holder {

	@NotBlank
	private String name;
}
