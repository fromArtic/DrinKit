package br.edu.ifsp.arq.drinkit.domain.model;

public enum State {
	
	SP("São Paulo"),
	RJ("Rio de Janeiro"),
	MG("Minas Gerais"),
	ES("Espírito Santo");
	
	private String description;
	
	private State(String description) {
		this.description = description;
	}
	
	public String getDescription() {
		return description;
	}
	
}
