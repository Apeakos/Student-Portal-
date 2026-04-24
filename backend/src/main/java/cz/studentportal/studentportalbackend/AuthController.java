package cz.studentportal.studentportalbackend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<String> login(@RequestBody LoginRequest request) {
        Optional<Student> studentOpt = studentRepository.findByEmail(request.email);

        if (studentOpt.isPresent()) {
            Student student = studentOpt.get();
            //Porovnání hesla
            if (passwordEncoder.matches(request.password, student.getPassword())) {
                return ResponseEntity.ok("Přihlášení úspěšné!"); // Sem později přidáme předměty/data
            }
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Špatný email nebo heslo");
    }
}