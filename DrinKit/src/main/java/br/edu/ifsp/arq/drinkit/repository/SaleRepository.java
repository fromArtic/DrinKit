package br.edu.ifsp.arq.drinkit.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.edu.ifsp.arq.drinkit.domain.model.Sale;

public interface SaleRepository extends JpaRepository<Sale, Long>{

}
