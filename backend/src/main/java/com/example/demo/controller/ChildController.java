package com.example.demo.controller;

import com.example.demo.model.Child;
import com.example.demo.repository.ChildRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/children")
@CrossOrigin(origins = "*")
public class ChildController {

    private final ChildRepository repo;

    public ChildController(ChildRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<Child> list() {
        return repo.findAll();
    }

    @GetMapping("/{id}")
    public Optional<Child> getById(@PathVariable Long id) {
        return repo.findById(id);
    }

    @PostMapping
    public Child create(@RequestBody Child child) {
        return repo.save(child);
    }

    @PutMapping("/{id}")
    public Child update(@PathVariable Long id, @RequestBody Child updatedChild) {
        return repo.findById(id).map(child -> {
            child.setName(updatedChild.getName());
            child.setAge(updatedChild.getAge());
            return repo.save(child);
        }).orElseGet(() -> {
            updatedChild.setId(id);
            return repo.save(updatedChild);
        });
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        repo.deleteById(id);
    }
}
