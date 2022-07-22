package br.com.pereira.LojaDeDoces.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import org.hibernate.annotations.NamedNativeQuery;

import br.com.pereira.LojaDeDoces.model.resource.CategoriaFromProduto;
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
@Table(name = "Produto")
@NamedNativeQuery(
        name = "Produto.findAllByHighPrice",
        query = "SELECT id, titulo, descricao, preco, categoria1, categoria2, categoria3"
        		+ " FROM produto"
        		+ " ORDER BY preco DESC",
        resultClass = Produto.class
)
@NamedNativeQuery(
        name = "Produto.findAllByLowerPrice",
        query = "SELECT id, titulo, descricao, preco, categoria1, categoria2, categoria3"
        		+ " FROM produto"
        		+ " ORDER BY preco",
        resultClass = Produto.class
)
@NamedNativeQuery(
        name = "Produto.findAllCategoria",
        query = "SELECT id, titulo, descricao, preco"
        		+ " FROM produto"
        		+ " ORDER BY preco",
        resultClass = Produto.class
)
@NamedNativeQuery(
		name = "Produto.findAllDistinctCategoria",
		query = "SELECT * FROM fn_selectAllCategoria()",
		resultClass = CategoriaFromProduto.class
)
public class Produto {

	@EqualsAndHashCode.Include
	@Id
    @Column
    @NotNull
	private int id;
	@Column
	@NotBlank
	private String titulo;
	@Column
	@NotBlank
	private String descricao;
	@Column
	@NotNull
	private double preco;
	@Column
	@NotNull
	private String categoria1;
	@Column
	private String categoria2;
	@Column
	private String categoria3;
	
}
