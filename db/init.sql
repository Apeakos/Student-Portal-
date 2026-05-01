CREATE TABLE student (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'STUDENT'
);

INSERT INTO student (first_name, last_name, email, password, role) VALUES ('Jan', 'Novák', 'jan@example.com', 'dummyHeslo1','STUDENT');
INSERT INTO student (first_name, last_name, email, password, role) VALUES ('Petr', 'Svoboda', 'petr@example.com', 'dummyHeslo2', 'STUDENT');

CREATE TABLE IF NOT EXISTS subject (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    grade INT,
    student_id BIGINT,
    FOREIGN KEY (student_id) REFERENCES student(id)
);

INSERT INTO subject (name, grade, student_id) VALUES ('Matematika', 1, 1);
INSERT INTO subject (name, grade, student_id) VALUES ('Programování', 2, 1);

INSERT INTO student (email, first_name, last_name, password)
VALUES ('test@portal.cz', 'Test', 'Uživatel', '$2a$12$StDJsfSCrQkZouX0de/H4OqYO7Nghx0zjTKiKG1DagVW9ho9SU/Ki');

INSERT INTO subject (name, grade, student_id) VALUES ('Matematika', 1, 1);
INSERT INTO student (email, first_name, last_name, password, role)
VALUES ('ucitel@portal.cz', 'Jan', 'Ámos', '$2a$12$StDJsfSCrQkZouX0de/H4OqYO7Nghx0zjTKiKG1DagVW9ho9SU/Ki', 'TEACHER');

INSERT INTO subject (name, grade, student_id) VALUES ('Tělocvik', 1, 4);
INSERT INTO subject (name, grade, student_id) VALUES ('Programování v Javě', 2, 4);
INSERT INTO subject (name, grade, student_id) VALUES ('React', 1, 4);