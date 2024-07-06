package br.edu.ifsp.arq.drinkit.service;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import br.edu.ifsp.arq.drinkit.domain.model.Supplier;
import br.edu.ifsp.arq.drinkit.repository.SupplierRepository;

@Service
public class SupplierService {
	
	@Autowired
	private SupplierRepository supplierRepository;
	
	public Supplier update(Long id, Supplier supplier) {
		Supplier supplierSaved = supplierRepository.findById(id).orElseThrow(() -> new EmptyResultDataAccessException(1));
		BeanUtils.copyProperties(supplier, supplierSaved, "id");
		return supplierRepository.save(supplierSaved);
	}

}
