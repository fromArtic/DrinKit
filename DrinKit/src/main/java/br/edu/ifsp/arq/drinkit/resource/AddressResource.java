package br.edu.ifsp.arq.drinkit.resource;

import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import br.edu.ifsp.arq.drinkit.domain.model.Address;
import br.edu.ifsp.arq.drinkit.repository.AddressRepository;
import br.edu.ifsp.arq.drinkit.service.AddressService;

@RestController
@RequestMapping("/addresses")
public class AddressResource {
	
	@Autowired
	private AddressRepository addressRepository;
	
	@Autowired
	private AddressService addressService;
	
	@GetMapping
	@PreAuthorize("hasAuthority('ROLE_SEARCH_DRINKIT') and #oauth2.hasScope('read')")
	public List<Address> list(){
		return addressRepository.findAll();
	}

	// testar Postman
	// http://localhost:8080/addresses
	
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	@PreAuthorize("hasAuthority('ROLE_REGISTER_DRINKIT') and #oauth2.hasScope('write')")
	public Address create(@RequestBody Address address, HttpServletResponse response) {
		return addressRepository.save(address);
	}

	// testar Postman
	// POST - http://localhost:8080/addresses
	
	@GetMapping("/{id}")
	@PreAuthorize("hasAuthority('ROLE_SEARCH_DRINKIT') and #oauth2.hasScope('read')")
	public ResponseEntity<Address> findById(@PathVariable Long id){
		Optional<Address> address = addressRepository.findById(id);
		if(address.isPresent()) {
			return ResponseEntity.ok(address.get());
		}
		return ResponseEntity.notFound().build();
	}

	// testar Postman
	// GET - http://localhost:8080/addreses/1
	
	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	@PreAuthorize("hasAuthority('ROLE_REMOVE_DRINKIT') and #oauth2.hasScope('write')")
	public void remove(@PathVariable Long id) {
		addressRepository.deleteById(id);
	}
	
	//	Testar no Postman:
	//	DELETE - http://localhost:8080/addresss/6
	
	@PutMapping("/{id}")
	@PreAuthorize("hasAuthority('ROLE_REGISTER_DRINKIT') and #oauth2.hasScope('write')")
	public ResponseEntity<Address> update(@PathVariable Long id, @Valid @RequestBody Address address) {
		Address addressSaved = addressService.update(id, address);
		return ResponseEntity.ok(addressSaved);
	}

}
