package com.sadesign.trelloclone.repository;

import com.sadesign.trelloclone.entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
}
