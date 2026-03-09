package com.sadesign.trelloclone.repository;

import com.sadesign.trelloclone.entity.WorkspaceMember;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WorkspaceMemberRepository extends JpaRepository<WorkspaceMember, Long> {
}
