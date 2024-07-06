/*-------------supplier----------*/
CREATE TABLE supplier (
	id BIGINT(20) PRIMARY KEY AUTO_INCREMENT,
	email VARCHAR(100) NOT NULL,
	password VARCHAR(150) NOT NULL,
	cnpj VARCHAR(15) NOT NULL,
	trading_name VARCHAR(100) NOT NULL,
	company_name VARCHAR(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO supplier (email, password, cnpj, trading_name, company_name)
VALUES ('tanqueray@tanqueray.com', '123', '1234567891012', 'Tanqueray', 'Diageo plc');

INSERT INTO supplier (email, password, cnpj, trading_name, company_name)
VALUES ('glenmorangie@glenmorangie.com', '123', '1210987654321', 'Glenmorangie', 'The Glenmorangie Company Ltd');
