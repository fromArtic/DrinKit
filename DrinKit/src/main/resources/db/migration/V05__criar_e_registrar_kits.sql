/*-------------kit----------*/
CREATE TABLE kit (
    id BIGINT(20) PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    price FLOAT
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*-------------kit_product----------*/
CREATE TABLE kit_product (
    kit_id BIGINT(20),
    product_id BIGINT(20),
    PRIMARY KEY (kit_id, product_id),
    FOREIGN KEY (kit_id) REFERENCES kit(id),
    FOREIGN KEY (product_id) REFERENCES product(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/* Kit Mojito */

INSERT INTO kit (name, price)
VALUES ('Kit Mojito', 209.14); -- O valor total varia de acordo com o preço de cada produto

INSERT INTO kit_product (kit_id, product_id)
VALUES
	(1, 1),    -- Vodka Smirnoff No. 21
    (1, 2),    -- Vodka Grey Goose
    (1, 3),    -- Vodka Belvedere
    (1, 5),    -- Gin Rocks Seco
    (1, 6),    -- Gin Bombay Sapphire Seco
    (1, 7),    -- Rum Bacardí Carta Blanca
    (1, 8),    -- Rum Diplomático Añejo
    (1, 9),    -- Rum Captain Morgan White
    (1, 10),   -- Tequila Jose Cuervo Gold
    (1, 101),  -- Limão
    (1, 102),  -- Limão siciliano
    (1, 103),  -- Morango
    (1, 105),  -- Maracujá
    (1, 201),  -- Hortelã
    (1, 202),  -- Manjericão
    (1, 301),  -- Açúcar Refinado União
    (1, 302),  -- Açúcar Demerara Naturale União
    (1, 303),  -- Açúcar Mascavo União
    (1, 304),  -- Mel de Multiflores Prodapys
    (1, 401),  -- Gelo triturado
    (1, 410),  -- Água com Gás Prata
    (1, 411),  -- Água Tônica Antarctica
    (1, 412),  -- Suco de Limão Del Valle Fresh
    (1, 416),  -- Schweppes Citrus
    (1, 417);  -- Ginger Ale Canada Dry

/* Kit Caipirinha */

INSERT INTO kit (name, price)
VALUES ('Kit Caipirinha', 52.59);

INSERT INTO kit_product (kit_id, product_id)
VALUES 
    (2, 1),    -- Vodka Smirnoff No. 21
    (2, 2),    -- Vodka Grey Goose
    (2, 3),    -- Vodka Belvedere
    (2, 7),    -- Rum Bacardí Carta Blanca
    (2, 8),    -- Rum Diplomático Añejo
    (2, 9),    -- Rum Captain Morgan White
    (2, 11),   -- Cachaça 1922 Envelhecida
    (2, 12),   -- Cachaça Tradicional 51
    (2, 13),   -- Cachaça Leblon
    (2, 14),   -- Cachaça Yaguara Branca
    (2, 15),   -- Saquê Seco Azuma
    (2, 101),  -- Limão
    (2, 102),  -- Limão siciliano
    (2, 103),  -- Morango
    (2, 104),  -- Laranja
    (2, 105),  -- Maracujá
    (2, 106),  -- Coco ralado
    (2, 202),  -- Manjericão
    (2, 205),  -- Pimenta dedo-de-moça
    (2, 301),  -- Açúcar Refinado União
    (2, 302),  -- Açúcar Demerara Naturale União
    (2, 303),  -- Açúcar Mascavo União
    (2, 304),  -- Mel de Multiflores Prodapys
    (2, 401),  -- Gelo triturado
    (2, 412),  -- Suco de Limão Del Valle Fresh
    (2, 413),  -- Suco de Laranja Orgânico Native
    (2, 414);  -- Suco de Cranberry com Morango Juxx

/* Kit Martini */
        
INSERT INTO kit (name, price)
VALUES ('Kit Martini', 209.14);

INSERT INTO kit_product (kit_id, product_id)
VALUES
	(3, 1),    -- Vodka Smirnoff No. 21
	(3, 2),    -- Vodka Grey Goose
	(3, 3),    -- Vodka Belvedere
	(3, 4),    -- Whisky Johnnie Walker Blonde
	(3, 5),    -- Gin Rocks Seco
	(3, 6),    -- Gin Bombay Sapphire Seco
	(3, 108),  -- Azeitona
	(3, 401),  -- Gelo triturado
	(3, 406),  -- Vermute Extra Dry Cinzano Rosso
	(3, 407),  -- Licor Kahlúa de Café
	(3, 408),  -- Licor Stock de Pêssego
	(3, 409);  -- Licor Bols de Pêssego

/* Kit Shirley Temple */
        
INSERT INTO kit (name, price)
VALUES ('Kit Shirley Temple', 60.14);

INSERT INTO kit_product (kit_id, product_id)
VALUES
	(4, 103),  -- Morango
	(4, 104),  -- Laranja
	(4, 106),  -- Coco ralado
	(4, 107),  -- Cerejas em conserva
	(4, 201),  -- Hortelã
	(4, 301),  -- Açúcar Refinado União
	(4, 302),  -- Açúcar Demerara Naturale União
	(4, 303),  -- Açúcar Mascavo União
	(4, 304),  -- Mel de Multiflores Prodapys
	(4, 401),  -- Gelo triturado
	(4, 410),  -- Água com Gás Prata
	(4, 413),  -- Suco de Laranja Orgânico Native
	(4, 414),  -- Suco de Cranberry com Morango Juxx
	(4, 417),  -- Ginger Ale Canada Dry
	(4, 418);  -- Xarope Monin Grenadine

/* Kit Bloody Mary */
        
INSERT INTO kit (name, price)
VALUES ('Kit Bloody Mary', 80.14);

INSERT INTO kit_product (kit_id, product_id)
VALUES 	
	(5, 1),    -- Vodka Smirnoff No. 21
	(5, 2),    -- Vodka Grey Goose
	(5, 3),    -- Vodka Belvedere
	(5, 10),   -- Tequila Jose Cuervo Gold
	(5, 15),   -- Saquê Seco Azuma
	(5, 101),  -- Limão
	(5, 102),  -- Limão siciliano
	(5, 108),  -- Azeitona
	(5, 201),  -- Hortelã
	(5, 202),  -- Manjericão
	(5, 203),  -- Alecrim
	(5, 204),  -- Canela em pau
	(5, 205),  -- Pimenta dedo-de-moça
	(5, 301),  -- Açúcar Refinado União
	(5, 302),  -- Açúcar Demerara Naturale União
	(5, 303),  -- Açúcar Mascavo União
	(5, 304),  -- Mel de Multiflores Prodapys
	(5, 401),  -- Gelo triturado
	(5, 402),  -- Sal Cisne
	(5, 405),  -- Molho Inglês Worcestershire Lea & Perrins
	(5, 408),  -- Licor Stock de Pêssego
	(5, 409),  -- Licor Bols de Pêssego
	(5, 410),  -- Água com Gás Prata
	(5, 411),  -- Água Tônica Antarctica
	(5, 412),  -- Suco de Limão Del Valle Fresh
	(5, 413),  -- Suco de Laranja Orgânico Native
	(5, 415),  -- Suco de Tomate La Cuna
	(5, 416),  -- Schweppes Citrus
	(5, 417);  -- Ginger Ale Canada Dry

/* Kit Piña Colada */

INSERT INTO kit (name, price)
VALUES ('Kit Piña Colada', 65.99);

INSERT INTO kit_product (kit_id, product_id)
VALUES
    (6, 5),    -- Gin Rocks Seco
	(6, 6),    -- Gin Bombay Sapphire Seco
    (6, 7),    -- Rum Bacardí Carta Blanca
    (6, 8),    -- Rum Diplomático Añejo
    (6, 9),    -- Rum Captain Morgan White
	(6, 103),  -- Morango
	(6, 104),  -- Laranja
    (6, 106),  -- Coco ralado
	(6, 109),  -- Abacaxi
	(6, 205),  -- Pimenta dedo-de-moça
	(6, 301),  -- Açúcar Refinado União
	(6, 302),  -- Açúcar Demerara Naturale União
	(6, 303),  -- Açúcar Mascavo União
    (6, 304),  -- Mel de Multiflores Prodapys
    (6, 401),  -- Gelo triturado
	(6, 403),  -- Creme de Leite Nestlé
	(6, 404),  -- Leite de Coco Sococo
    (6, 412),  -- Suco de Limão Del Valle Fresh
    (6, 414);  -- Suco de Cranberry com Morango Juxx
