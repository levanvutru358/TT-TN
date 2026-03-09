package com.sadesign.trelloclone.security.jwt;

import org.springframework.stereotype.Component;

@Component
public class JwtTokenProvider {

    public String generateToken(String subject) {
        return subject;
    }
}
