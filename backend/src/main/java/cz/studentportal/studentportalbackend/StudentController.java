package cz.studentportal.studentportalbackend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/students")
@CrossOrigin(origins = "*")
public class StudentController {

    private final StudentRepository studentRepository;

    @Autowired
    public StudentController(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
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
    @GetMapping
    public ResponseEntity<List<Student>> getAllStudents() {
        return ResponseEntity.ok(studentRepository.findAll());
    }
    @PostMapping("/{id}/subjects")
    public ResponseEntity<?> addSubjectToStudent(@PathVariable Long id, @RequestBody Subject newSubject) {
        Optional<Student> studentOpt = studentRepository.findById(id);
        if (studentOpt.isPresent()) {
            Student student = studentOpt.get();
            newSubject.setStudent(student);
            return ResponseEntity.ok(subjectRepository.save(newSubject));
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Student nenalezen");
    }

}