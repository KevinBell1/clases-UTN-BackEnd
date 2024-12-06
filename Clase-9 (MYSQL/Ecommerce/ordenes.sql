CREATE TABLE ordenes(
	id INT PRIMARY KEY AUTO_INCREMENT,
    usuario_id INT NOT NULL,
    total DECIMAL(10,2),
    fecha_creacion DATE DEFAULT CURRENT_DATE,
    estado ENUM("pendiente","procesando","completado","cancelado"),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(usuario_id)
)