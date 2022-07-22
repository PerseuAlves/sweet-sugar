package br.com.pereira.LojaDeDoces.model;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedStoredProcedureQuery;
import javax.persistence.ParameterMode;
import javax.persistence.StoredProcedureParameter;
import javax.persistence.Table;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import br.com.pereira.LojaDeDoces.model.compositeID.EnderecoId;
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
@Table(name = "Endereco")
@NamedStoredProcedureQuery(
        name = "Endereco.spPutNewEndereco",
        procedureName = "sp_putnewendereco",
        parameters = {
        		@StoredProcedureParameter(mode = ParameterMode.IN, name = "cepAntigo", type = int.class),
                @StoredProcedureParameter(mode = ParameterMode.IN, name = "logradouroAntigo", type = String.class),
                @StoredProcedureParameter(mode = ParameterMode.IN, name = "numeroAntigo", type = int.class),
                @StoredProcedureParameter(mode = ParameterMode.IN, name = "bairroAntigo", type = String.class),
                @StoredProcedureParameter(mode = ParameterMode.IN, name = "cidadeAntigo", type = String.class),
                @StoredProcedureParameter(mode = ParameterMode.IN, name = "cepNovo", type = int.class),
                @StoredProcedureParameter(mode = ParameterMode.IN, name = "logradouroNovo", type = String.class),
                @StoredProcedureParameter(mode = ParameterMode.IN, name = "numeroNovo", type = int.class),
                @StoredProcedureParameter(mode = ParameterMode.IN, name = "bairroNovo", type = String.class),
                @StoredProcedureParameter(mode = ParameterMode.IN, name = "cidadeNovo", type = String.class),
                @StoredProcedureParameter(mode = ParameterMode.IN, name = "complementoNovo", type = String.class),
                @StoredProcedureParameter(mode = ParameterMode.OUT, name = "saida", type = String.class)
        }
)
public class Endereco {
	
	@EqualsAndHashCode.Include
	@EmbeddedId
	@NotNull
	@Valid
	private EnderecoId enderecoId;
	@Column
	private String complemento;
	@ManyToOne(targetEntity = Usuario.class)
	@JoinColumn(name = "usuario_id")
	@NotNull
	private Usuario usuario;
	
}
