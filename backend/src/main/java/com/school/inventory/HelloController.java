package com.school.inventory;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {

    @GetMapping("/")
    public String home() {
        return "<h1>VICTORY! 🏆</h1> <p>Java Backend + Nginx běží!</p>";
    }
}
