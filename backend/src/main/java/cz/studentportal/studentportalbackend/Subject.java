package cz.studentportal.studentportalbackend;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
public class Subject {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private int grade;

    @ManyToOne
    @JoinColumn(name = "student_id")
    @JsonIgnore //aby se JSON zacyklil
    private Student student;

    public Subject() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public int getGrade() { return grade; }
    public void setGrade(int grade) { this.grade = grade; }
    public Student getStudent() { return student; }
    public void setStudent(Student student) { this.student = student; }
}