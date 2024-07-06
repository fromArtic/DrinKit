package br.edu.ifsp.arq.drinkit.service;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import br.edu.ifsp.arq.drinkit.domain.model.Kit;
import br.edu.ifsp.arq.drinkit.repository.KitRepository;

@Service
public class KitService {
	
	@Autowired
	private KitRepository kitRepository;
	
	public Kit update(Long id, Kit kit) {
		Kit kitSaved = kitRepository.findById(id).orElseThrow(() -> new EmptyResultDataAccessException(1));
		BeanUtils.copyProperties(kit, kitSaved, "id");
		return kitRepository.save(kitSaved);
	}

}
