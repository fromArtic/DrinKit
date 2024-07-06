package br.edu.ifsp.arq.drinkit.service;

import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import br.edu.ifsp.arq.drinkit.domain.model.Client;
import br.edu.ifsp.arq.drinkit.domain.model.Sale;
import br.edu.ifsp.arq.drinkit.repository.ClientRepository;
import br.edu.ifsp.arq.drinkit.repository.SaleRepository;
import br.edu.ifsp.arq.drinkit.service.exception.NonExistentOrInactiveClientException;

@Service
public class SaleService {
	
	@Autowired
	private SaleRepository saleRepository;
	
	@Autowired
	private ClientRepository clientRepository;
	
	// Regra para não salvar a venda se o cliente está inativo
	public Sale save(Sale sale) {
		Optional<Client> client = clientRepository.findById(sale.getClient().getId());
		if(!client.isPresent() || !client.get().isActive()) {
			throw new NonExistentOrInactiveClientException();
		}
		return saleRepository.save(sale);
	}

	public Sale update(Long id, Sale sale) {
		Sale saleSaved = saleRepository.findById(id).orElseThrow(() -> new EmptyResultDataAccessException(1));
		BeanUtils.copyProperties(sale, saleSaved, "id");
		return saleRepository.save(saleSaved);
	}

}
