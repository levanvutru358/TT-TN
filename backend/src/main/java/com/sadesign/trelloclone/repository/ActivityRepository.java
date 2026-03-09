package com.sadesign.trelloclone.repository;

import com.sadesign.trelloclone.entity.Activity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ActivityRepository extends JpaRepository<Activity, Long> {
}
