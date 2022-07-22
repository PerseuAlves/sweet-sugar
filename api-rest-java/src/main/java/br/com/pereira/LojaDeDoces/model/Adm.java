package br.com.pereira.LojaDeDoces.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Entity
@Table(name = "Adm")
public class Adm {

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
	@Column
	@NotBlank
	private String telefone;
	@Column
	@NotNull
	private int cep;
	@Column
	@NotBlank
	private String logradouro;
	@Column
	@NotNull
	private int numero;
	@Column
	@NotBlank
	private String bairro;
	@Column
	@NotBlank
	private String cidade;
	@Column
	private String complemento;
	
	public Adm(int id, String nome, String sobrenome, String email, 
			String senha, String telefone, int cep, String logradouro, 
			int numero, String bairro, String cidade, String complemento) {
		overloadAdm(id, nome, sobrenome, email, senha, telefone, cep, 
				logradouro, numero, bairro, cidade, complemento);
	}
	
	public Adm(int id, String nome, String sobrenome, String email, 
			String senha, String telefone, int cep, String logradouro, 
			int numero, String bairro, String cidade) {
		overloadAdm(id, nome, sobrenome, email, senha, telefone, cep, 
				logradouro, numero, bairro, cidade, null);
	}

	private void overloadAdm(int id, String nome, String sobrenome, 
			String email, String senha, String telefone, int cep, 
			String logradouro, int numero, String bairro, String cidade, 
			String complemento) {
		this.id = id;
		this.nome = nome;
		this.sobrenome = sobrenome;
		this.email = email;
		this.senha = senha;
		this.telefone = telefone;
		this.cep = cep;
		this.logradouro = logradouro;
		this.numero = numero;
		this.bairro = bairro;
		this.cidade = cidade;
		this.complemento = complemento;
	}
}
