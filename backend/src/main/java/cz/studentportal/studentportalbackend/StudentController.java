package cz.studentportal.studentportalbackend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/students")
@CrossOrigin(origins = "*")
public class StudentController {

    private final StudentRepository studentRepository;

    @Autowired
    public StudentController(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    @GetMapping
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    @PostMapping
    public Student addStudent(@RequestBody Student student) {
        return studentRepository.save(student);
    }
    @Autowired
    private SubjectRepository subjectRepository;

    @GetMapping("/{id}/subjects")
    public ResponseEntity<?> getStudentSubjects(@PathVariable Long id) {
        //všechny předměty z DB tomuhle studentovi
        List<Subject> subjects = subjectRepository.findByStudentId(id);

        if (subjects.isEmpty()) {
            return ResponseEntity.ok("Student zatím nemá žádné předměty");
        }

        return ResponseEntity.ok(subjects);
    }

}