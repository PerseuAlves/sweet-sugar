package br.com.pereira.LojaDeDoces.model.compositeID;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@EqualsAndHashCode
@Embeddable
public class EnderecoId implements Serializable {
	private static final long serialVersionUID = 1L;
	
	@Column
	@NotNull
	private int cep;
	@Column
	@NotEmpty
	private String logradouro;
	@Column
	@NotNull
	private int numero;
	@Column
	@NotEmpty
	private String bairro;
	@Column
	@NotEmpty
	private String cidade;
	
}
