package com.sadesign.trelloclone.repository;

import com.sadesign.trelloclone.entity.Workspace;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WorkspaceRepository extends JpaRepository<Workspace, Long> {
}
