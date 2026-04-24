package cz.studentportal.studentportalbackend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*") //React přístup
public class AuthController {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    //Class-příjem z Reactu
    public static class LoginRequest {
        public String email;
        public String password;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        Optional<Student> studentOpt = studentRepository.findByEmail(request.email);

        if (studentOpt.isPresent()) {
            Student student = studentOpt.get();

            if (passwordEncoder.matches(request.password, student.getPassword())) {
                Map<String, Object> userData = new HashMap<>();
                userData.put("id", student.getId());
                userData.put("firstName", student.getFirstName());
                userData.put("lastName", student.getLastName());
                userData.put("email", student.getEmail());

                return ResponseEntity.ok(userData);
            }
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Špatný email nebo heslo");
    }
}