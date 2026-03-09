package com.sadesign.trelloclone.repository;

import com.sadesign.trelloclone.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
