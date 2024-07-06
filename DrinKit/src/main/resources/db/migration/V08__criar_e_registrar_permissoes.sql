/*-------------permission----------*/
CREATE TABLE permission (
	id BIGINT(20) PRIMARY KEY,
	description VARCHAR(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*-------------client_permission----------*/
CREATE TABLE client_permission (
	id_client BIGINT(20) NOT NULL,
	id_permission BIGINT(20) NOT NULL,
	PRIMARY KEY (id_client, id_permission),
	FOREIGN KEY (id_client) REFERENCES client(id),
	FOREIGN KEY (id_permission) REFERENCES permission(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/* admin */

INSERT INTO client (id, name, email, password, birthdate, cpf, active) 
VALUES (5, 'Administrador', 'admin@ifsp.edu.br', '$2a$10$X607ZPhQ4EgGNaYKt3n4SONjIv9zc.VMWdEuhCuba7oLAL5IvcL5.', '2002-07-17', '44466699900', '1');

/* client */

INSERT INTO permission (id, description) 
VALUES (1, 'ROLE_REGISTER_CLIENT');
INSERT INTO permission (id, description) 
VALUES (2, 'ROLE_REMOVE_CLIENT');
INSERT INTO permission (id, description) 
VALUES (3, 'ROLE_SEARCH_CLIENT');

/* sale e outras classes */

INSERT INTO permission (id, description) 
VALUES (4, 'ROLE_REGISTER_DRINKIT');
INSERT INTO permission (id, description) 
VALUES (5, 'ROLE_REMOVE_DRINKIT');
INSERT INTO permission (id, description) 
VALUES (6, 'ROLE_SEARCH_DRINKIT');

/* admin */

INSERT INTO client_permission (id_client, id_permission) 
VALUES (5, 1);
INSERT INTO client_permission (id_client, id_permission) 
VALUES (5, 2);
INSERT INTO client_permission (id_client, id_permission) 
VALUES (5, 3);
INSERT INTO client_permission (id_client, id_permission) 
VALUES (5, 4);
INSERT INTO client_permission (id_client, id_permission) 
VALUES (5, 5);
INSERT INTO client_permission (id_client, id_permission) 
VALUES (5, 6);

/* TAIGUIN */

INSERT INTO client_permission (id_client, id_permission) 
VALUES (1, 1);
INSERT INTO client_permission (id_client, id_permission) 
VALUES (1, 3);
INSERT INTO client_permission (id_client, id_permission) 
VALUES (1, 4);
INSERT INTO client_permission (id_client, id_permission) 
VALUES (1, 5);
INSERT INTO client_permission (id_client, id_permission) 
VALUES (1, 6);

/* VICTOR L. */

INSERT INTO client_permission (id_client, id_permission) 
VALUES (2, 1);
INSERT INTO client_permission (id_client, id_permission) 
VALUES (2, 3);
INSERT INTO client_permission (id_client, id_permission) 
VALUES (2, 4);
INSERT INTO client_permission (id_client, id_permission) 
VALUES (2, 5);
INSERT INTO client_permission (id_client, id_permission) 
VALUES (2, 6);
