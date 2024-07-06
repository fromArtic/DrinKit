package br.edu.ifsp.arq.drinkit.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import br.edu.ifsp.arq.drinkit.domain.model.Client;

public interface ClientRepository extends JpaRepository<Client, Long>{
	
	public Optional<Client> findByEmail(String email);
	
}
