package com.sadesign.trelloclone.repository;

import com.sadesign.trelloclone.entity.Card;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CardRepository extends JpaRepository<Card, Long> {
}
