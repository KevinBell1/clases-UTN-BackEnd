CREATE TABLE usuarios(
	usuario_id INT PRIMARY KEY AUTO_INCREMENT,
	nombre VARCHAR(30) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    direccion VARCHAR (100)NOT NULL,
    telefono VARCHAR(20)NOT NULL,
    rol ENUM("user","admin","support") NOT NULL,
    activo BOOLEAN DEFAULT TRUE,
    fecha_de_registro DATE DEFAULT CURRENT_DATE
)