package br.edu.ifsp.arq.drinkit.resource;

import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import br.edu.ifsp.arq.drinkit.domain.model.Client;
import br.edu.ifsp.arq.drinkit.repository.ClientRepository;
import br.edu.ifsp.arq.drinkit.service.ClientService;

@RestController
@RequestMapping("/clients")
public class ClientResource {
	
	@Autowired
	private ClientRepository clientRepository;
	
	@Autowired
	private ClientService clientService;
	
	@GetMapping
	@PreAuthorize("hasAuthority('ROLE_SEARCH_CLIENT') and #oauth2.hasScope('read')")
	public List<Client> list() {
		return clientRepository.findAll();
	}

	// testar Postman
	// http://localhost:8080/clients
	
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	@PreAuthorize("hasAuthority('ROLE_REGISTER_CLIENT') and #oauth2.hasScope('write')")
	public Client create(@RequestBody Client client, HttpServletResponse response) {
		return clientRepository.save(client);
	}

	// testar Postman
	// POST - http://localhost:8080/clients
	
	@GetMapping("/{id}")
	@PreAuthorize("hasAuthority('ROLE_SEARCH_CLIENT') and #oauth2.hasScope('read')")
	public ResponseEntity<Client> findById(@PathVariable Long id) {
		Optional<Client> client = clientRepository.findById(id);
		if(client.isPresent()) {
			return ResponseEntity.ok(client.get());
		}
		return ResponseEntity.notFound().build();
	}

	// testar Postman
	// GET - http://localhost:8080/clients/1
	
	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	@PreAuthorize("hasAuthority('ROLE_REMOVE_CLIENT') and #oauth2.hasScope('write')")
	public void remove(@PathVariable Long id) {
		clientRepository.deleteById(id);
	}
	
	//	Testar no Postman:
	//	DELETE - http://localhost:8080/clients/6
	
	@PutMapping("/{id}")
	@PreAuthorize("hasAuthority('ROLE_REGISTER_CLIENT') and #oauth2.hasScope('write')")
	public ResponseEntity<Client> update(@PathVariable Long id, @Valid @RequestBody Client client) {
		Client clientSaved = clientService.update(id, client);
		return ResponseEntity.ok(clientSaved);
	}
	
	@PutMapping("/{id}/active")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	@PreAuthorize("hasAuthority('ROLE_REGISTER_CLIENT') and #oauth2.hasScope('write')")
	public void updateActiveProperty(@PathVariable Long id, @RequestBody Boolean active) {
		clientService.updateActiveProperty(id, active);
	}

}
