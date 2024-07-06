/*-------------product----------*/
CREATE TABLE product (
    id BIGINT(20) PRIMARY KEY AUTO_INCREMENT,
    price FLOAT NOT NULL,
    name VARCHAR(255) NOT NULL,
    quantity INT,
    quantity_ml INT,
    type VARCHAR(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/* Bebidas alcoólicas */

INSERT INTO product (id, price, name, quantity, quantity_ml, type)
VALUES (1, 42.99, 'Vodka Smirnoff No. 21', 1, 1000, 'bebida');

INSERT INTO product (id, price, name, quantity, quantity_ml, type)
VALUES (2, 79.99, 'Vodka Grey Goose', 1, 1000, 'bebida');

INSERT INTO product (id, price, name, quantity, quantity_ml, type)
VALUES (3, 89.99, 'Vodka Belvedere', 1, 1000, 'bebida');

INSERT INTO product (id, price, name, quantity, quantity_ml, type)
VALUES (4, 119.99, 'Whisky Johnnie Walker Blonde', 1, 1000, 'bebida');

INSERT INTO product (id, price, name, quantity, quantity_ml, type)
VALUES (5, 44.99, 'Gin Rocks Seco', 1, 1000, 'bebida');

INSERT INTO product (id, price, name, quantity, quantity_ml, type)
VALUES (6, 48.99, 'Gin Bombay Sapphire Seco', 1, 1000, 'bebida');

INSERT INTO product (id, price, name, quantity, quantity_ml, type)
VALUES (7, 55.99, 'Rum Bacardí Carta Blanca', 1, 1000, 'bebida');

INSERT INTO product (id, price, name, quantity, quantity_ml, type)
VALUES (8, 49.99, 'Rum Diplomático Añejo', 1, 1000, 'bebida');

INSERT INTO product (id, price, name, quantity, quantity_ml, type)
VALUES (9, 39.99, 'Rum Captain Morgan White', 1, 1000, 'bebida');

INSERT INTO product (id, price, name, quantity, quantity_ml, type)
VALUES (10, 126.99, 'Tequila Jose Cuervo Gold', 1, 1000, 'bebida');

INSERT INTO product (id, price, name, quantity, quantity_ml, type)
VALUES (11, 124.99, 'Cachaça 1922 Envelhecida', 1, 1000, 'bebida');

INSERT INTO product (id, price, name, quantity, quantity_ml, type)
VALUES (12, 20.00, 'Cachaça Tradicional 51', 1, 1000, 'bebida');

INSERT INTO product (id, price, name, quantity, quantity_ml, type)
VALUES (13, 34.99, 'Cachaça Leblon', 1, 1000, 'bebida');

INSERT INTO product (id, price, name, quantity, quantity_ml, type)
VALUES (14, 29.99, 'Cachaça Yaguara Branca', 1, 1000, 'bebida');

INSERT INTO product (id, price, name, quantity, quantity_ml, type)
VALUES (15, 30.99, 'Saquê Seco Azuma', 1, 1000, 'bebida');

/* Frutas */

INSERT INTO product (id, price, name, quantity, quantity_ml, type)
VALUES (101, 0.36, 'Limão', 1, 0, 'frutas');

INSERT INTO product (id, price, name, quantity, quantity_ml, type)
VALUES (102, 0.49, 'Limão siciliano', 1, 0, 'frutas');

INSERT INTO product (id, price, name, quantity, quantity_ml, type)
VALUES (103, 0.80, 'Morango', 1, 0, 'frutas');

INSERT INTO product (id, price, name, quantity, quantity_ml, type)
VALUES (104, 0.90, 'Laranja', 1, 0, 'frutas');

INSERT INTO product (id, price, name, quantity, quantity_ml, type)
VALUES (105, 0.70, 'Maracujá', 1, 0, 'frutas');

INSERT INTO product (id, price, name, quantity, quantity_ml, type)
VALUES (106, 3.00, 'Coco ralado', 1, 0, 'frutas');

INSERT INTO product (id, price, name, quantity, quantity_ml, type)
VALUES (107, 20.00, 'Cerejas em conserva', 1, 0, 'frutas');

INSERT INTO product (id, price, name, quantity, quantity_ml, type)
VALUES (108, 0.10, 'Azeitona', 1, 0, 'frutas');

INSERT INTO product (id, price, name, quantity, quantity_ml, type)
VALUES (109, 1.00, 'Abacaxi', 1, 0, 'frutas');

/* Aromatizantes */

INSERT INTO product (id, price, name, quantity, quantity_ml, type)
VALUES (201, 10.00, 'Hortelã', 1, 0, 'aromatizante');

INSERT INTO product (id, price, name, quantity, quantity_ml, type)
VALUES (202, 5.00, 'Manjericão', 1, 0, 'aromatizante');

INSERT INTO product (id, price, name, quantity, quantity_ml, type)
VALUES (203, 10.00, 'Alecrim', 1, 0, 'aromatizante');

INSERT INTO product (id, price, name, quantity, quantity_ml, type)
VALUES (204, 12.00, 'Canela em pau', 1, 0, 'aromatizante');

INSERT INTO product (id, price, name, quantity, quantity_ml, type)
VALUES (205, 7.00, 'Pimenta dedo-de-moça', 1, 0, 'aromatizante');

/* Adoçantes */

INSERT INTO product (id, price, name, quantity, quantity_ml, type)
VALUES (301, 7.00, 'Açúcar Refinado União', 1, 1000, 'adocante');

INSERT INTO product (id, price, name, quantity, quantity_ml, type)
VALUES (302, 15.00, 'Açúcar Demerara Naturale União', 1, 1000, 'adocante');

INSERT INTO product (id, price, name, quantity, quantity_ml, type)
VALUES (303, 25.00, 'Açúcar Mascavo União', 1, 1000, 'adocante');

INSERT INTO product (id, price, name, quantity, quantity_ml, type)
VALUES (304, 25.00, 'Mel de Multiflores Prodapys', 1, 1000, 'adocante');

/* Diversos (inclui bebidas alcoólicas complementares) */

INSERT INTO product (id, price, name, quantity, quantity_ml, type)
VALUES (401, 15.00, 'Gelo triturado', 1, 1000, 'diverso');

INSERT INTO product (id, price, name, quantity, quantity_ml, type)
VALUES (402, 4.00, 'Sal Cisne', 1, 1000, 'diverso');

INSERT INTO product (id, price, name, quantity, quantity_ml, type)
VALUES (403, 26.45, 'Creme de Leite Nestlé', 1, 1000, 'diverso');

INSERT INTO product (id, price, name, quantity, quantity_ml, type)
VALUES (404, 33.95, 'Leite de Coco Sococo', 1, 1000, 'diverso');

INSERT INTO product (id, price, name, quantity, quantity_ml, type)
VALUES (405, 32.00, 'Molho Inglês Worcestershire Lea & Perrins', 1, 1000, 'diverso');

INSERT INTO product (id, price, name, quantity, quantity_ml, type)
VALUES (406, 45.90, 'Vermute Extra Dry Cinzano Rosso', 1, 1000, 'diverso');

INSERT INTO product (id, price, name, quantity, quantity_ml, type)
VALUES (407, 159.99, 'Licor Kahlúa de Café', 1, 1000, 'diverso');

INSERT INTO product (id, price, name, quantity, quantity_ml, type)
VALUES (408, 69.99, 'Licor Stock de Pêssego', 1, 1000, 'diverso');

INSERT INTO product (id, price, name, quantity, quantity_ml, type)
VALUES (409, 64.99, 'Licor Bols de Pêssego', 1, 1000, 'diverso');

/* Diversos (bebidas não alcoólicas) */

INSERT INTO product (id, price, name, quantity, quantity_ml, type)
VALUES (410, 6.99, 'Água com Gás Prata', 1, 1000, 'diverso');

INSERT INTO product (id, price, name, quantity, quantity_ml, type)
VALUES (411, 8.00, 'Água Tônica Antarctica', 1, 1000, 'diverso');

INSERT INTO product (id, price, name, quantity, quantity_ml, type)
VALUES (412, 17.00, 'Suco de Limão Del Valle Fresh', 1, 1000, 'diverso');

INSERT INTO product (id, price, name, quantity, quantity_ml, type)
VALUES (413, 6.15, 'Suco de Laranja Orgânico Native', 1, 1000, 'diverso');

INSERT INTO product (id, price, name, quantity, quantity_ml, type)
VALUES (414, 25.00, 'Suco de Cranberry com Morango Juxx', 1, 1000, 'diverso');

INSERT INTO product (id, price, name, quantity, quantity_ml, type)
VALUES (415, 12.00, 'Suco de Tomate La Cuna', 1, 1000, 'diverso');

INSERT INTO product (id, price, name, quantity, quantity_ml, type)
VALUES (416, 9.00, 'Schweppes Citrus', 1, 1000, 'diverso');

INSERT INTO product (id, price, name, quantity, quantity_ml, type)
VALUES (417, 14.00, 'Ginger Ale Canada Dry', 1, 1000, 'diverso');

INSERT INTO product (id, price, name, quantity, quantity_ml, type)
VALUES (418, 92.86, 'Xarope Monin Grenadine', 1, 1000, 'diverso');
