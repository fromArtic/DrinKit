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

import br.edu.ifsp.arq.drinkit.domain.model.Kit;
import br.edu.ifsp.arq.drinkit.repository.KitRepository;
import br.edu.ifsp.arq.drinkit.service.KitService;

@RestController
@RequestMapping("/kits")
public class KitResource {
	
	@Autowired
	private KitRepository kitRepository;
	
	@Autowired
	private KitService kitService;
	
	@GetMapping
	@PreAuthorize("hasAuthority('ROLE_SEARCH_DRINKIT') and #oauth2.hasScope('read')")
	public List<Kit> list() {
		return kitRepository.findAll();
	}

	// testar Postman
	// http://localhost:8080/kits
	
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	@PreAuthorize("hasAuthority('ROLE_REGISTER_DRINKIT') and #oauth2.hasScope('write')")
	public Kit create(@RequestBody Kit kit, HttpServletResponse response) {
		return kitRepository.save(kit);
	}

	// testar Postman
	// POST - http://localhost:8080/kits
	
	@GetMapping("/{id}")
	@PreAuthorize("hasAuthority('ROLE_SEARCH_DRINKIT') and #oauth2.hasScope('read')")
	public ResponseEntity<Kit> findById(@PathVariable Long id) {
		Optional<Kit> kit = kitRepository.findById(id);
		if(kit.isPresent()) {
			return ResponseEntity.ok(kit.get());
		}
		return ResponseEntity.notFound().build();
	}

	// testar Postman
	// GET - http://localhost:8080/kits/1
	
	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	@PreAuthorize("hasAuthority('ROLE_REMOVE_DRINKIT') and #oauth2.hasScope('write')")
	public void remove(@PathVariable Long id) {
		kitRepository.deleteById(id);
	}
	
	//	Testar no Postman:
	//	DELETE - http://localhost:8080/kits/6
	
	@PutMapping("/{id}")
	@PreAuthorize("hasAuthority('ROLE_REGISTER_DRINKIT') and #oauth2.hasScope('write')")
	public ResponseEntity<Kit> update(@PathVariable Long id, @Valid @RequestBody Kit kit) {
		Kit kitSaved = kitService.update(id, kit);
		return ResponseEntity.ok(kitSaved);
	}

}
