CREATE USER IF NOT EXISTS "student"@"%" IDENTIFIED BY "password";
GRANT ALL PRIVILEGES ON school_inventory.* TO "student"@"%";
FLUSH PRIVILEGES;

-- 1. Vytvoření databáze (pokud ji Docker nevytvořil)
CREATE DATABASE IF NOT EXISTS school_inventory;
USE school_inventory;

-- 2. Tabulka Uživatelů
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL, -- Zde bude hash hesla, ne čistý text!
    full_name VARCHAR(100) NOT NULL,
    role ENUM('STUDENT', 'TEACHER', 'ADMIN') NOT NULL DEFAULT 'STUDENT',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Tabulka Kategorií (Notebooky, Projektory...)
CREATE TABLE categories (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT
);

-- 4. Tabulka Vybavení (Konkrétní kusy)
CREATE TABLE items (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(200) NOT NULL, -- Např. "MacBook Pro M1 #04"
    status ENUM('AVAILABLE', 'BROKEN', 'LOST', 'MAINTENANCE') NOT NULL DEFAULT 'AVAILABLE',
    category_id BIGINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);

-- 5. Tabulka Rezervací (Jádro systému)
CREATE TABLE bookings (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    item_id BIGINT NOT NULL,
    start_time DATETIME NOT NULL,
    end_time DATETIME NOT NULL,
    status ENUM('PENDING', 'APPROVED', 'REJECTED', 'RETURNED') NOT NULL DEFAULT 'PENDING',
    note TEXT, -- Poznámka, např. "Potřebuji na prezentaci"
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (item_id) REFERENCES items(id) ON DELETE CASCADE
);

-- BONUS: Vložení pár testovacích dat, abyste měli co zobrazit v Reactu
INSERT INTO categories (name, description) VALUES 
('Notebooky', 'Školní laptopy pro studenty'),
('Kamery', 'Vybavení pro mediální kroužek');

INSERT INTO items (name, category_id, status) VALUES 
('Dell XPS 15 - Inv. č. 101', 1, 'AVAILABLE'),
('Lenovo ThinkPad - Inv. č. 102', 1, 'AVAILABLE'),
('Canon EOS R5 - Inv. č. 201', 2, 'AVAILABLE');
