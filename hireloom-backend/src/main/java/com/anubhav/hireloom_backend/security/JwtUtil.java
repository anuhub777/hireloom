package com.anubhav.hireloom_backend.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;

@Component
public class JwtUtil {

    private static final String SECRET = "mySuperSecretKeyForHireLoomJwtSigning123456";

    private static final SecretKey KEY = Keys.hmacShaKeyFor(SECRET.getBytes());

    public String generateToken(String email) {

        return Jwts.builder()
                .subject(email)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + 1000*60*60*24)) //24 hrs valid
                .signWith(KEY)
                .compact();
    }

    public String extractEmail(String token) {

        Jws<Claims> claims = Jwts.parser()
                .verifyWith(KEY)
                .build()
                .parseSignedClaims(token);

        return claims.getPayload().getSubject();
    }

    public boolean validateToken(String token) {
        try{
            Jwts.parser()
                    .verifyWith(KEY)
                    .build()
                    .parseSignedClaims(token);
            return true;
        }
        catch(Exception e) {
            return false;
        }
    }
}
