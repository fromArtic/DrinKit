/* Pedido 4 */

INSERT INTO sale (status, address_id, client_id, final_price)
VALUES ('EM_PROCESSAMENTO', 1, 5, 50.00);

INSERT INTO sale_kit (sale_id, kit_id)
VALUES (4, 1);

/* Pedido 5 */

INSERT INTO sale (status, address_id, client_id, final_price)
VALUES ('EM_PREPARACAO', 2, 5, 75.00);

INSERT INTO sale_kit (sale_id, kit_id)
VALUES (5, 2);

/* Pedido 6 */

INSERT INTO sale (status, address_id, client_id, final_price)
VALUES ('EM_TRANSPORTE', 3, 5, 60.00);

INSERT INTO sale_kit (sale_id, kit_id)
VALUES (6, 3);

/* Pedido 7 */

INSERT INTO sale (status, address_id, client_id, final_price)
VALUES ('ENTREGUE', 4, 5, 300.00);

INSERT INTO sale_kit (sale_id, kit_id)
VALUES (7, 4);

/* Pedido 8 */

INSERT INTO sale (status, address_id, client_id, final_price)
VALUES ('CANCELADO', 5, 5, 90.00);

INSERT INTO sale_kit (sale_id, kit_id)
VALUES (8, 5);
