package br.edu.ifsp.arq.drinkit.resource;

import java.util.List;
import java.util.Optional;

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

import br.edu.ifsp.arq.drinkit.domain.model.Sale;
import br.edu.ifsp.arq.drinkit.repository.SaleRepository;
import br.edu.ifsp.arq.drinkit.service.SaleService;

@RestController
@RequestMapping("/sales")
public class SaleResource {
	
	@Autowired
	private SaleRepository saleRepository;
	
	@Autowired
	private SaleService saleService;
	
	@GetMapping
	@PreAuthorize("hasAuthority('ROLE_SEARCH_DRINKIT') and #oauth2.hasScope('read')")
	public List<Sale> list() {
		return saleRepository.findAll();
	}

	// testar Postman
	// http://localhost:8080/sales
	
	@GetMapping("/{id}")
	@PreAuthorize("hasAuthority('ROLE_SEARCH_DRINKIT') and #oauth2.hasScope('read')")
	public ResponseEntity<Sale> findById(@PathVariable Long id) {
		Optional<Sale> sale = saleRepository.findById(id);
		if(sale.isPresent()) {
			return ResponseEntity.ok(sale.get());
		}
		return ResponseEntity.notFound().build();
	}

	// testar Postman
	// GET - http://localhost:8080/sales/1
	
	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	@PreAuthorize("hasAuthority('ROLE_REMOVE_DRINKIT') and #oauth2.hasScope('write')")
	public void remove(@PathVariable Long id) {
		saleRepository.deleteById(id);
	}
	
	// testar Postman
	// POST - http://localhost:8080/sales
	
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	@PreAuthorize("hasAuthority('ROLE_REGISTER_DRINKIT') and #oauth2.hasScope('write')")
	public Sale create(@Valid @RequestBody Sale sale) {
		return saleService.save(sale);
	}
	
	@PutMapping("/{id}")
	@PreAuthorize("hasAuthority('ROLE_REGISTER_DRINKIT') and #oauth2.hasScope('write')")
	public ResponseEntity<Sale> update(@PathVariable Long id, @Valid @RequestBody Sale sale) {
		Sale saleSaved = saleService.update(id, sale);
		return ResponseEntity.ok(saleSaved);
	}
	
}
