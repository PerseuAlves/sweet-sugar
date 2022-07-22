package br.com.pereira.LojaDeDoces.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
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
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Entity
@Table(name = "Usuario")
public class Usuario {

	@EqualsAndHashCode.Include
	@Id
    @Column
    @NotNull
	private int id;
	@Column
	@NotBlank
	private String nome;
	@Column
	@NotBlank
	private String sobrenome;
	@Column
	@NotBlank
	private String email;
	@Column
	@NotBlank
	private String senha;
	
}
