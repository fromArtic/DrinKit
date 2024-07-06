package br.edu.ifsp.arq.drinkit.domain.model;

public enum Status {
	
	EM_PROCESSAMENTO("Pedido em processamento"),
	EM_PREPARACAO("Pedido em preparação"),
	EM_TRANSPORTE("Pedido em transporte"),
	ENTREGUE("Pedido entregue"),
	CANCELADO("Pedido cancelado");
	
	private String description;
	
	private Status(String description) {
		this.description = description;
	}
	
	public String getDescription() {
		return description;
	}
	
}
