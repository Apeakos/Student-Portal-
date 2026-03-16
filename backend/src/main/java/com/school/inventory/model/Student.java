package com.school.inventory.model;

import jakarta.persistence.*;

@Entity
@Table(name = "students")
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;

    @Column(name = "class_name")
    private String className;

    public Student() {}

    // Teď zde klikni pravým -> Generate... -> Getter and Setter -> Vyber všechny a potvrď
}