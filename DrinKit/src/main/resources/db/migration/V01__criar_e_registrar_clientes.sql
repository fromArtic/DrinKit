/*-------------clean----------
DROP TABLE drinkit.supplier CASCADE;
DROP TABLE drinkit.sale_kit CASCADE;
DROP TABLE drinkit.sale CASCADE;
DROP TABLE drinkit.kit_product CASCADE;
DROP TABLE drinkit.kit CASCADE;
DROP TABLE drinkit.client_permission CASCADE;
DROP TABLE drinkit.address CASCADE;
DROP TABLE drinkit.client CASCADE;
DROP TABLE drinkit.permission CASCADE;
DROP TABLE drinkit.product CASCADE;
*/

/*-------------client----------*/
CREATE TABLE client (
	id BIGINT(20) PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(50) NOT NULL,
	email VARCHAR(100) NOT NULL,
	password VARCHAR(150) NOT NULL,
	birthdate DATE NOT NULL,
	cpf VARCHAR(12) NOT NULL,
	recovery_uuid VARCHAR(128) NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO client (name, email, password, birthdate, cpf)
VALUES ('Taiguin Vieira', 'taiguin@aluno.ifsp.edu.br', '$2y$04$jSRSdjrdedvEYKiUGt1nyOYOvk7B.p0RcTmojoY1F/CjYzk1JRJYW', '2002-07-17', '44466699900');

INSERT INTO client (name, email, password, birthdate, cpf)
VALUES ('Victor Loretti', 'artic@hot.com', '$2y$04$jSRSdjrdedvEYKiUGt1nyOYOvk7B.p0RcTmojoY1F/CjYzk1JRJYW', '2000-07-21', '11122233344');

INSERT INTO client (name, email, password, birthdate, cpf)
VALUES ('Raul The Kubo', 'raul@g.com', '$2y$04$jSRSdjrdedvEYKiUGt1nyOYOvk7B.p0RcTmojoY1F/CjYzk1JRJYW', '1964-09-22', '99966633300');

INSERT INTO client (name, email, password, birthdate, cpf)
VALUES ('Diogo de Paul Walker', 'diogo.paula@aluno.ifsp.edu.br', '$2y$04$jSRSdjrdedvEYKiUGt1nyOYOvk7B.p0RcTmojoY1F/CjYzk1JRJYW', '2005-03-19', '00022211133');

-- SENHA PADRÃO: 123
