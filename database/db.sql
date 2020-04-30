CREATE TABLE estudiantes(
    id INTEGER UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(50) NOT NULL,
    centro_id INTEGER UNSIGNED
);

CREATE TABLE asesores(
    id INTEGER UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(50) NOT NULL,
    centro_id INTEGER UNSIGNED,
    clave INTEGER UNSIGNED
);

CREATE TABLE citas(
        id INTEGER UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        asesor_id INTEGER UNSIGNED,
        estudiante_id INTEGER UNSIGNED,
        materia VARCHAR(100) NOT NULL,
        lugar VARCHAR(100),
        fecha TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE centros(
    id INTEGER UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(120) NOT NULL UNIQUE
);

ALTER TABLE estudiantes
ADD CONSTRAINT fk_centro 
FOREIGN KEY (centro_id)
REFERENCES centros(id);

ALTER TABLE citas
ADD CONSTRAINT fk_asesor 
FOREIGN KEY (asesor_id)
REFERENCES asesores(id);

ALTER TABLE citas
ADD CONSTRAINT fk_estudiante 
FOREIGN KEY (estudiante_id)
REFERENCES estudiantes(id);

ALTER TABLE citas
ADD descripcion TEXT NOT NULL;

ALTER TABLE citas
DROP fecha;

ALTER TABLE citas
ADD dia VARCHAR(15) NOT NULL;

ALTER TABLE citas
ADD hora VARCHAR(15) NOT NULL;

ALTER TABLE estudiantes 
MODIFY password VARCHAR(100);

ALTER TABLE centros ADD cantidad INTEGER UNSIGNED;

DELIMITER //
CREATE TRIGGER cantidades AFTER INSERT ON estudiantes
FOR EACH ROW
BEGIN
UPDATE centros set cantidad = cantidad + 1 WHERE id = new.centro_id;
END
//
DELIMITER ;

DELETE FROM centros;

INSERT INTO centros(nombre)
VALUE("CUCEI"),("CUCSH"),("CUCEA"),("CUCS"),("CUCBA"),("CUAAD");

ALTER TABLE centros ALTER cantidad SET DEFAULT 0;

DELIMITER //
CREATE TRIGGER cantidades AFTER DELETE ON estudiantes
FOR EACH ROW
BEGIN
UPDATE centros set cantidad = cantidad - 1 WHERE id = centro_id;
END
//
DELIMITER ;


ALTER TABLE citas DROP FOREIGN KEY fk_asesor;
ALTER TABLE citas DROP asesor_id;
DROP TABLE asesores;

