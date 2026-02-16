# Školní Inventář - Backend

Tento projekt obsahuje Spring Boot aplikaci a MariaDB databázi běžící v Dockeru.

## Jak spustit projekt:
1. **Klonování repozitáře:** `git clone https://github.com/Apeakos/Student-Portal-.git`
2. **Spuštění databáze:** V kořenové složce spusť `docker-compose up -d`
3. **Import dat:** Spusť `docker exec -i school_db mariadb -u root -proot school_inventory < schema.sql`
4. **Spuštění aplikace:** Přejdi do složky `backend` a spusť `./mvnw spring-boot:run`

Aplikace běží na: `http://localhost:8081`
