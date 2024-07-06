package br.edu.ifsp.arq.drinkit.security;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;

import br.edu.ifsp.arq.drinkit.domain.model.Client;

public class SystemUser extends org.springframework.security.core.userdetails.User {

	private static final long serialVersionUID = 1L;
	
	private Client user;

	public SystemUser(Client user, Collection<? extends GrantedAuthority> authorities) {
		super(user.getEmail(), user.getPassword(), authorities);
		this.user = user;
	}
	
	public Client getUser() {
		return user;
	}

}
