package com.sadesign.trelloclone.repository;

import com.sadesign.trelloclone.entity.ChecklistItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChecklistItemRepository extends JpaRepository<ChecklistItem, Long> {
}
