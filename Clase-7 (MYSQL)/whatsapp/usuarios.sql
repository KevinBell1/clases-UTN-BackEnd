/* este archivo servira para tener un guardado de lo hecho en sql, en un tipo de archivo que no afecta en nada, pero marca las propiedades */

CREATE TABLE usuarios(
	usuario_id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(30) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    activo BOOLEAN DEFAULT TRUE,
    creado_en DATE DEFAULT CURRENT_DATE
)

INSERT INTO usuarios(`username`,`email`,`password_hash`) VALUES('pepe', 'pepe@gmail.com','pepesito1234'), () /* si quisieramos insertar 2 usuarios de una */


ALTER TABLE `usuarios` CHANGE `activo` `activo` TINYINT(1) NOT NULL DEFAULT '1'; /* ejemplo de alteracion, si ponemos estructura y cambiar */

SELECT * FROM `usuarios`; WHERE usuario_id = 1

SELECT username, email FROM `usuarios`; WHERE usuario_id = 1 AND email = pepe@gmail.com /* tambien puede ser or */

UPDATE usuarios SET password_hash = 'hola' /* cambia todos los valores de password_hash por hola */
UPDATE usuarios SET password_hash = 'hola' WHERE usuario_id = 1

DELETE FROM usuarios WHERE usuario_id = 3