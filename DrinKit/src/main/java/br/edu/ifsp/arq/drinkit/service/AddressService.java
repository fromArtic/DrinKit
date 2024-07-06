package br.edu.ifsp.arq.drinkit.service;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import br.edu.ifsp.arq.drinkit.domain.model.Address;
import br.edu.ifsp.arq.drinkit.repository.AddressRepository;

@Service
public class AddressService {
	
	@Autowired
	private AddressRepository addressRepository;
	
	public Address update(Long id, Address address) {
		Address addressSaved = addressRepository.findById(id).orElseThrow(() -> new EmptyResultDataAccessException(1));
		BeanUtils.copyProperties(address, addressSaved, "id");
		return addressRepository.save(addressSaved);
	}

}
