package br.com.pereira.LojaDeDoces.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Range;

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
@Table(name = "Compra")
public class Compra {

	@EqualsAndHashCode.Include
	@Id
    @Column
    @NotNull
	private int id;
	@Column
	@NotNull
	private int qtd_produto;
	@Column
	@NotNull
	private int valor_total;
	@ManyToOne(targetEntity = Usuario.class)
	@JoinColumn(name = "usuario_id")
	@NotNull
	private Usuario usuario;
	@ManyToOne(targetEntity = Produto.class)
	@JoinColumn(name = "produto_id")
	@NotNull
	private Produto produto;
	@Column
	@NotNull
	@Range(min=0, max=1)
	private int compra_finalizada;
	
}
