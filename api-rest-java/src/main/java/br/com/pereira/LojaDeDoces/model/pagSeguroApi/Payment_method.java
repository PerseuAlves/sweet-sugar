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
public class Payment_method {

	@NotBlank
	private String type;
	@NotNull
    private int installments;
	@NotNull
    private boolean capture;
	@NotBlank
    private String soft_descriptor;
	@NotNull
    private Card card;
}
