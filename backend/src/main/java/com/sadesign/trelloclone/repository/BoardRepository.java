package com.sadesign.trelloclone.repository;

import com.sadesign.trelloclone.entity.Board;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BoardRepository extends JpaRepository<Board, Long> {
}
