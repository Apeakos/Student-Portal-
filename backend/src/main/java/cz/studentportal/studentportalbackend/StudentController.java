package cz.studentportal.studentportalbackend;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/students")
public class StudentController {

    @GetMapping
    public List<Map<String, Object>> getAllStudents() {
        return List.of(
                Map.of("id", 1, "firstName", "Jan", "lastName", "Novák", "email", "jan.novak@example.com"),
                Map.of("id", 2, "firstName", "Petr", "lastName", "Svoboda", "email", "petr.svoboda@example.com")
        );
    }
}