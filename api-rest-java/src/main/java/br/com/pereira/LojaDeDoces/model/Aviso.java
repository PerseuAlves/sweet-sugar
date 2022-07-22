package br.com.pereira.LojaDeDoces.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Entity
@Table(name = "Aviso")
public class Aviso {

	@EqualsAndHashCode.Include
	@Id
    @Column
    @NotNull
	private int id;
	@Column
	@NotBlank
	private String descricao;
	@OneToOne(targetEntity = Adm.class)
	@JoinColumn(name = "adm_id")
	@NotNull
	private Adm adm;
	
}
