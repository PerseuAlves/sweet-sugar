package br.com.pereira.LojaDeDoces.model.pagSeguroApi;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Amount {

	@NotNull
	private Integer value;
	@NotBlank
    private String currency;
}
