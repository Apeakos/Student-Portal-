package cz.studentportal.studentportalbackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;

@SpringBootApplication
public class StudentPortalBackendApplication {

    public static void main(String[] args) {
        ConfigurableApplicationContext ctx = SpringApplication.run(StudentPortalBackendApplication.class, args);

        System.out.println("\n========= DEBUG ENV =========");
        System.out.println("SPRING_DATASOURCE_URL (ENV): " + System.getenv("SPRING_DATASOURCE_URL"));
        System.out.println("spring.datasource.url (Property): " + ctx.getEnvironment().getProperty("spring.datasource.url"));
        System.out.println("=============================\n");
    }
}