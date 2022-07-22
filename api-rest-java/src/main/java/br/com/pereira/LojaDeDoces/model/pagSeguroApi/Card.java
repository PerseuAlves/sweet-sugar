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
public class Card {

	@NotBlank
	private String number;
	@NotBlank
    private String exp_month;
	@NotBlank
    private String exp_year;
	@NotBlank
    private String security_code;
	@NotNull
	private Holder holder;
}
