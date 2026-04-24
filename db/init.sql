CREATE TABLE IF NOT EXISTS student (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255)
    );

INSERT INTO student (first_name, last_name, email, password) VALUES ('Jan', 'Novák', 'jan@example.com', 'dummyHeslo1');
INSERT INTO student (first_name, last_name, email, password) VALUES ('Petr', 'Svoboda', 'petr@example.com', 'dummyHeslo2');