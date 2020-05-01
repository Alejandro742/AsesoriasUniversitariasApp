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
CREATE TRIGGER suma_cant_centro AFTER INSERT ON estudiantes
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
CREATE TRIGGER resta_cant_centro AFTER DELETE ON estudiantes
FOR EACH ROW
BEGIN
UPDATE centros set cantidad = cantidad - 1 WHERE id = centro_id;
END
//
DELIMITER ;


ALTER TABLE citas DROP FOREIGN KEY fk_asesor;
ALTER TABLE citas DROP asesor_id;
DROP TABLE asesores;

ALTER TABLE citas ADD asesor_id INT UNSIGNED;

ALTER TABLE citas
ADD CONSTRAINT fk_asesor 
FOREIGN KEY (asesor_id)
REFERENCES estudiantes(id);

/* PROCEDIMIENTO PARA VER LAS ASESORÍAS DISPONIBLES EN EL HOME */
DELIMITER //
CREATE PROCEDURE lista_asesorias_home(IN user_id INT)
BEGIN
    SELECT * FROM citas WHERE estudiante_id IS NULL AND asesor_id != user_id;
END
//
DELIMITER ;

/* PROCEMINETO PARA VER LA LAS ASESORIAS QUE UN USER HA TOMADO */
DELIMITER //
CREATE PROCEDURE asesoria_lado_asesorado(IN user_id INT)
BEGIN
    SELECT 
    citas.materia, citas.lugar, citas.descripcion,citas.dia,citas.hora,
    estudiantes.nombre, estudiantes.email
    FROM citas
    INNER JOIN estudiantes ON citas.asesor_id = estudiantes.id
    WHERE estudiante_id = user_id;
END//
DELIMITER ;

/* PROCEDIMIENTO PARA VER ASESORIAS CREADAS PERO NO TOMADAS AUN */

CREATE PROCEDURE asesorias_no_tomadas(IN user_id INT)
BEGIN
    SELECT * FROM citas WHERE asesor_id = user_id AND estudiante_id IS NULL;
END//
    
/* PROCEDIMIENTO PARA VER LAS ASESORÍAS CREADAS Y TOMADAS POR ALGUIEN */

CREATE PROCEDURE mis_asesorias_tomadas(IN user_id INT)
BEGIN
    SELECT 
    citas.materia, citas.lugar, citas.descripcion,citas.dia,citas.hora,
    estudiantes.nombre, estudiantes.email
    FROM citas
    INNER JOIN estudiantes ON citas.estudiante_id = estudiantes.id
    WHERE asesor_id = user_id AND estudiante_id IS NOT NULL;
END//


