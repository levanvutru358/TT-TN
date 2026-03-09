package com.sadesign.trelloclone.repository;

import com.sadesign.trelloclone.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Long> {
}
