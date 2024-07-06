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

import br.edu.ifsp.arq.drinkit.domain.model.Product;
import br.edu.ifsp.arq.drinkit.repository.ProductRepository;
import br.edu.ifsp.arq.drinkit.service.ProductService;

@RestController
@RequestMapping("/products")
public class ProductResource {
	
	@Autowired
	private ProductRepository productRepository;
	
	@Autowired
	private ProductService productService;
	
	@GetMapping
	@PreAuthorize("hasAuthority('ROLE_SEARCH_DRINKIT') and #oauth2.hasScope('read')")
	public List<Product> list() {
		return productRepository.findAll();
	}

	// testar Postman
	// http://localhost:8080/products
	
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	@PreAuthorize("hasAuthority('ROLE_REGISTER_DRINKIT') and #oauth2.hasScope('write')")
	public Product create(@RequestBody Product product, HttpServletResponse response) {
		return productRepository.save(product);
	}

	// testar Postman
	// POST - http://localhost:8080/products
	
	@GetMapping("/{id}")
	@PreAuthorize("hasAuthority('ROLE_SEARCH_DRINKIT') and #oauth2.hasScope('read')")
	public ResponseEntity<Product> findById(@PathVariable Long id) {
		Optional<Product> product = productRepository.findById(id);
		if(product.isPresent()) {
			return ResponseEntity.ok(product.get());
		}
		return ResponseEntity.notFound().build();
	}

	// testar Postman
	// GET - http://localhost:8080/products/1
	
	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	@PreAuthorize("hasAuthority('ROLE_REMOVE_DRINKIT') and #oauth2.hasScope('write')")
	public void remove(@PathVariable Long id) {
		productRepository.deleteById(id);
	}
	
	//	Testar no Postman:
	//	DELETE - http://localhost:8080/products/6
	
	@PutMapping("/{id}")
	@PreAuthorize("hasAuthority('ROLE_REGISTER_DRINKIT') and #oauth2.hasScope('write')")
	public ResponseEntity<Product> update(@PathVariable Long id, @Valid @RequestBody Product product) {
		Product productSaved = productService.update(id, product);
		return ResponseEntity.ok(productSaved);
	}

}
