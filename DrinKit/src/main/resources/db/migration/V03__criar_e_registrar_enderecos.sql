/*-------------address----------*/
CREATE TABLE address (
	id BIGINT(20) PRIMARY KEY AUTO_INCREMENT,
	public_place VARCHAR(100) NOT NULL,
	cep VARCHAR(9) NOT NULL,
	number BIGINT(20) NOT NULL,
	address_supplement VARCHAR(80) NOT NULL,
	city VARCHAR(50) NOT NULL,
	state VARCHAR(20) NOT NULL,
	client_id BIGINT(20) NOT NULL,
	FOREIGN KEY (client_id) REFERENCES client(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO address (public_place, cep, number, address_supplement, city, state, client_id)
VALUES ('Avenida Blumenau', '01310-100', 1234, 'Apto. 501', 'Blumenau', 'SP', 1);

INSERT INTO address (public_place, cep, number, address_supplement, city, state, client_id)
VALUES ('Rua da Frustração', '20030-021', 999, 'Casa', 'Santarém', 'SP', 2);

INSERT INTO address (public_place, cep, number, address_supplement, city, state, client_id)
VALUES ('Avenida Desapontamento', '29000-001', 333, 'Sala 302', 'Gramado', 'SP', 2);

INSERT INTO address (public_place, cep, number, address_supplement, city, state, client_id)
VALUES ('Rua do Guaxinim', '01310-100', 4567, 'Ao lado do bosque', 'Petrópolis', 'RJ', 3);

INSERT INTO address (public_place, cep, number, address_supplement, city, state, client_id)
VALUES ('Rua 7', '01310-100', 777, 'Casa sem placa com número', 'Niterói', 'RJ', 4);
