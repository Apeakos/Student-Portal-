CREATE TABLE IF NOT EXISTS student (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255)
    );

INSERT INTO student (first_name, last_name, email, password) VALUES ('Jan', 'Novák', 'jan@example.com', 'dummyHeslo1');
INSERT INTO student (first_name, last_name, email, password) VALUES ('Petr', 'Svoboda', 'petr@example.com', 'dummyHeslo2');

CREATE TABLE IF NOT EXISTS subject (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    grade INT,
    student_id BIGINT,
    FOREIGN KEY (student_id) REFERENCES student(id)
);

INSERT INTO subject (name, grade, student_id) VALUES ('Matematika', 1, 1);
INSERT INTO subject (name, grade, student_id) VALUES ('Programování', 2, 1);