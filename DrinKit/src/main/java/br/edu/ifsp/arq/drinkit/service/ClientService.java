package br.edu.ifsp.arq.drinkit.service;

import java.util.UUID;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import br.edu.ifsp.arq.drinkit.domain.model.Client;
import br.edu.ifsp.arq.drinkit.repository.ClientRepository;

@Service
public class ClientService {
	
	@Autowired
	private ClientRepository clientRepository;
	
	public Client update(Long id, Client client) {
		Client clientSaved = clientRepository.findById(id).orElseThrow(() -> new EmptyResultDataAccessException(1));
		BeanUtils.copyProperties(client, clientSaved, "id");
		return clientRepository.save(clientSaved);
	}

	public void updateActiveProperty(Long id, Boolean active) {
		Client clientSaved = findClientById(id);
		clientSaved.setActive(active);
		clientRepository.save(clientSaved);
	}
	
	public Client findClientById(Long id) {
		Client clientSaved = clientRepository.findById(id).orElseThrow(() -> new EmptyResultDataAccessException(1));
		return clientSaved;
	}
	
    public void generateAndSetRecoveryUuid(Client client) {
        String uuid = UUID.randomUUID().toString();
        client.setRecoveryUuid(uuid);
        clientRepository.save(client);
    }

}
