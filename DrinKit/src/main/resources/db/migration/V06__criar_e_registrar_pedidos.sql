/*-------------sale----------*/
CREATE TABLE sale (
    id BIGINT(20) PRIMARY KEY AUTO_INCREMENT,
    status VARCHAR(255) NOT NULL,
    address_id BIGINT(20) NOT NULL,
    client_id BIGINT(20) NOT NULL,
    final_price FLOAT NOT NULL,
    FOREIGN KEY (address_id) REFERENCES address(id),
    FOREIGN KEY (client_id) REFERENCES client(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*-------------sale_kit----------*/
CREATE TABLE sale_kit (
    sale_id BIGINT(20) NOT NULL,
    kit_id BIGINT(20) NOT NULL,
    FOREIGN KEY (sale_id) REFERENCES sale(id),
    FOREIGN KEY (kit_id) REFERENCES kit(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/* Pedido 1 */

INSERT INTO sale (status, address_id, client_id, final_price)
VALUES ('EM_PROCESSAMENTO', 1, 1, 50.00);

INSERT INTO sale_kit (sale_id, kit_id)
VALUES (1, 1);

/* Pedido 2 */

INSERT INTO sale (status, address_id, client_id, final_price)
VALUES ('EM_TRANSPORTE', 2, 2, 75.00);

INSERT INTO sale_kit (sale_id, kit_id)
VALUES (2, 1);

/* Pedido 3 */

INSERT INTO sale (status, address_id, client_id, final_price)
VALUES ('ENTREGUE', 2, 3, 60.00);

INSERT INTO sale_kit (sale_id, kit_id)
VALUES (3, 1);
