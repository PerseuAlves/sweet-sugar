package br.com.pereira.LojaDeDoces.model.pagSeguroApi;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@EqualsAndHashCode
@ToString
public class PagseguroApiJSONCredito {

	@NotBlank
	private String reference_id;
	@NotBlank
	private String description;
	@NotNull
	private Amount amount;
	@NotNull
	private Payment_method payment_method;
	@NotNull
	private String[] notification_urls;
}
