package com.sadesign.trelloclone.repository;

import com.sadesign.trelloclone.entity.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
}
