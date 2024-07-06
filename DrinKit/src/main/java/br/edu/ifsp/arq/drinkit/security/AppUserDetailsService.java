package br.edu.ifsp.arq.drinkit.security;

import java.util.Collection;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import br.edu.ifsp.arq.drinkit.domain.model.Client;
import br.edu.ifsp.arq.drinkit.repository.ClientRepository;

@Service
public class AppUserDetailsService implements UserDetailsService {

	@Autowired
	private ClientRepository clientRepository;
	
	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		Optional<Client> clientOptional = clientRepository.findByEmail(email);
		Client client = clientOptional.orElseThrow(() -> new UsernameNotFoundException("Usuário e/ou senha incorretos"));
		return new SystemUser(client, getPermissions(client));
	}

	private Collection<? extends GrantedAuthority> getPermissions(Client client) {
		Set<SimpleGrantedAuthority> authorities = new HashSet<>();
		client.getPermissions().forEach(p -> 
		authorities.add(
				new SimpleGrantedAuthority(p.getDescription().toUpperCase())));
		return authorities;
	}

}
