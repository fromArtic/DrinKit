package br.edu.ifsp.arq.drinkit.resource;

import br.edu.ifsp.arq.drinkit.service.EmailService;
import br.edu.ifsp.arq.drinkit.domain.model.Client;
import br.edu.ifsp.arq.drinkit.service.ClientService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RecoveryResource {

    private final ClientResource clientResource;
    private final EmailService emailService;
    private final ClientService clientService;

    @Autowired
    public RecoveryResource(ClientResource clientResource, EmailService emailService, ClientService clientService) {
        this.clientResource = clientResource;
        this.emailService = emailService;
        this.clientService = clientService;

    }

    @GetMapping("/recovery_request")
    public boolean sendEmail(@RequestParam String email) {
        // Check if the email exists in the client table
    	List<Client> clients = this.clientResource.list();
    	
    	Client client = clients.stream()
    	        .filter(c -> c.getEmail().equals(email))
    	        .findFirst()
    	        .orElse(null);
    	
        if (client != null) {        	
        	clientService.generateAndSetRecoveryUuid(client);
            // Send email using the EmailService
            String subject = "Recuperação de senha";
            String body = "Segue o link para recuperação de senha: localhost:4200/recovery_uuid/uuid="+client.getRecoveryUuid();
            emailService.sendEmail(email, subject, body);
            return true;
        } else {
            return false;
        }
    }
    
    @PostMapping("/recovery_uuid")
    public boolean changePassword(@RequestParam String uuid, @RequestParam String password) {
        // Check if the email exists in the client table
        List<Client> clients = this.clientResource.list();

        Client client = clients.stream()
                .filter(c -> {
                    String recoveryUuid = c.getRecoveryUuid();
                    return recoveryUuid != null && recoveryUuid.equals(uuid);
                })
                .findFirst()
                .orElse(null);

        if (client != null) {
            // Use BCryptPasswordEncoder to encode the new password
            BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
            String encodedPassword = passwordEncoder.encode(password);

            if (client.getRecoveryUuid() != null) {
                client.cleanRecoveryUuid();
            }
            // Set the encoded password to the client
            client.setPassword(encodedPassword);
            this.clientService.update(client.getId(), client);

            // Send email using the EmailService
            String subject = "Alerta de segurança!";
            String body = "Sua senha foi alterada!";
            emailService.sendEmail(client.getEmail(), subject, body);

            return true;
        } else {
            return false;
        }
    }

}
