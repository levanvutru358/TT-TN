package com.sadesign.trelloclone.repository;

import com.sadesign.trelloclone.entity.Attachment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AttachmentRepository extends JpaRepository<Attachment, Long> {
}
