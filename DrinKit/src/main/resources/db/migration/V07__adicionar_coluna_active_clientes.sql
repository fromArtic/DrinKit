ALTER TABLE client ADD COLUMN active BOOLEAN NOT NULL;

UPDATE client SET `active` = '1' WHERE (`id` = '1');
UPDATE client SET `active` = '1' WHERE (`id` = '2');
