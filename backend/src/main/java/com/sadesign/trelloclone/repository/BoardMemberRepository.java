package com.sadesign.trelloclone.repository;

import com.sadesign.trelloclone.entity.BoardMember;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BoardMemberRepository extends JpaRepository<BoardMember, Long> {
}
