package cz.studentportal.studentportalbackend;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class StudentPortalBackendApplication {

    public static void main(String[] args) {
        ConfigurableApplicationContext ctx = SpringApplication.run(StudentPortalBackendApplication.class, args);

        System.out.println("\n========= DEBUG ENV =========");
        System.out.println("SPRING_DATASOURCE_URL (ENV): " + System.getenv("SPRING_DATASOURCE_URL"));
        System.out.println("spring.datasource.url (Property): " + ctx.getEnvironment().getProperty("spring.datasource.url"));
        System.out.println("=============================\n");
    }
    @Bean
    public CommandLineRunner initTestUser(StudentRepository repo, PasswordEncoder encoder) {
        return args -> {
            //Kontrola jestli tam je uživatel
            if (repo.findByEmail("test@portal.cz").isEmpty()) {
                Student student = new Student();
                student.setFirstName("Test");
                student.setLastName("Uživatel");
                student.setEmail("test@portal.cz");
                //Zašifrování hesla
                student.setPassword(encoder.encode("heslo123"));
                repo.save(student);
                System.out.println("--- Vytvořen testovací uživatel: test@portal.cz / heslo123 ---");
            }
        };
    }
}