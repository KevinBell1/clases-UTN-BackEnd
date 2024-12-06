CREATE TABLE chats(
	chat_id INT PRIMARY KEY AUTO_INCREMENT,
    emisor_id INT NOT NULL,
    receptor_id INT NOT NULL,
    mensaje_texto TEXT NOT NULL,
    activo BOOLEAN DEFAULT TRUE,
    creado_en DATE DEFAULT CURRENT_DATE,
    estado INT DEFAULT 1 CHECK(estado IN(1,2,3),
    FOREIGN KEY (emisor_id) REFERENCES contactos(usuario_id) ON DELETE CASCADE,
    FOREIGN KEY (receptor_id) REFERENCES contactos(usuario_contacto_id) ON DELETE CASCADE
)