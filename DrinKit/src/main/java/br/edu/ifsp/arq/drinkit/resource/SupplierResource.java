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

import br.edu.ifsp.arq.drinkit.domain.model.Supplier;
import br.edu.ifsp.arq.drinkit.repository.SupplierRepository;
import br.edu.ifsp.arq.drinkit.service.SupplierService;

@RestController
@RequestMapping("/suppliers")
public class SupplierResource {
	
	@Autowired
	private SupplierRepository supplierRepository;
	
	@Autowired
	private SupplierService supplierService;
	
	@GetMapping
	@PreAuthorize("hasAuthority('ROLE_SEARCH_DRINKIT') and #oauth2.hasScope('read')")
	public List<Supplier> list() {
		return supplierRepository.findAll();
	}

	// testar Postman
	// http://localhost:8080/suppliers
	
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	@PreAuthorize("hasAuthority('ROLE_REGISTER_DRINKIT') and #oauth2.hasScope('write')")
	public Supplier create(@RequestBody Supplier supplier, HttpServletResponse response) {
		return supplierRepository.save(supplier);
	}

	// testar Postman
	// POST - http://localhost:8080/suppliers
	
	@GetMapping("/{id}")
	@PreAuthorize("hasAuthority('ROLE_SEARCH_DRINKIT') and #oauth2.hasScope('read')")
	public ResponseEntity<Supplier> findById(@PathVariable Long id) {
		Optional<Supplier> supplier = supplierRepository.findById(id);
		if(supplier.isPresent()) {
			return ResponseEntity.ok(supplier.get());
		}
		return ResponseEntity.notFound().build();
	}

	// testar Postman
	// GET - http://localhost:8080/clients/1
	
	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	@PreAuthorize("hasAuthority('ROLE_REMOVE_DRINKIT') and #oauth2.hasScope('write')")
	public void remove(@PathVariable Long id) {
		supplierRepository.deleteById(id);
	}
	
	//	Testar no Postman:
	//	DELETE - http://localhost:8080/suppliers/6
	
	@PutMapping("/{id}")
	@PreAuthorize("hasAuthority('ROLE_REGISTER_DRINKIT') and #oauth2.hasScope('write')")
	public ResponseEntity<Supplier> update(@PathVariable Long id, @Valid @RequestBody Supplier supplier) {
		Supplier supplierSaved = supplierService.update(id, supplier);
		return ResponseEntity.ok(supplierSaved);
	}

}
