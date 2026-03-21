package com.school.inventory.config;

import com.school.inventory.model.Student;
import com.school.inventory.repository.StudentRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataSeeder {

    @Bean
    CommandLineRunner initDatabase(StudentRepository repository) {
        return args -> {
            if (repository.count() == 0) {
                System.out.println("Sázím testovací data do databáze...");

                Student s1 = new Student();
                s1.setName("Karel Novák");
                s1.setEmail("karel@skola.cz");
                s1.setClassName("4.B");

                Student s2 = new Student();
                s2.setName("Marie Černá");
                s2.setEmail("marie@skola.cz");
                s2.setClassName("2.A");

                repository.save(s1);
                repository.save(s2);

                System.out.println("Hotovo! Studenti uloženi.");
            }
        };
    }
}
