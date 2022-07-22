package br.com.pereira.LojaDeDoces.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedStoredProcedureQuery;
import javax.persistence.ParameterMode;
import javax.persistence.StoredProcedureParameter;
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
@Table(name = "Telefone")
@NamedStoredProcedureQuery(
        name = "Telefone.putNewTelefone",
        procedureName = "sp_putNewTelefone",
        parameters = {
                @StoredProcedureParameter(mode = ParameterMode.IN, name = "numAntigo", type = String.class),
                @StoredProcedureParameter(mode = ParameterMode.IN, name = "numNovo", type = String.class),
                @StoredProcedureParameter(mode = ParameterMode.OUT, name = "saida", type = String.class)
        }
)
public class Telefone {

	@EqualsAndHashCode.Include
	@Id
    @Column
    @NotBlank
	private String numero;
	@ManyToOne(targetEntity = Usuario.class)
	@JoinColumn(name = "usuario_id")
	@NotNull
	private Usuario usuario;
	
}
