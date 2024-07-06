package br.edu.ifsp.arq.drinkit.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.edu.ifsp.arq.drinkit.domain.model.Supplier;

public interface SupplierRepository extends JpaRepository<Supplier, Long>{

}
