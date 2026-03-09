package com.sadesign.trelloclone.repository;

import com.sadesign.trelloclone.entity.Invitation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InvitationRepository extends JpaRepository<Invitation, Long> {
}
