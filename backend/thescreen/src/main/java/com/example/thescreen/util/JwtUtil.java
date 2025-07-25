package com.example.thescreen.util;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;
import java.util.Date;
import javax.crypto.SecretKey;

@Component
public class JwtUtil {
    private final SecretKey SECRET_KEY = Keys.secretKeyFor(SignatureAlgorithm.HS256);
    private final long EXPIRATION = 30 * 60 * 1000; // 30분

    public String generateToken(String userid) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + EXPIRATION);
        
        String token = Jwts.builder()
                .setSubject(userid)
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(SECRET_KEY)
                .compact();
                
        System.out.println("[관리자 JWT 토큰 발급] " + token);
        return token;
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(SECRET_KEY).build().parseClaimsJws(token);
            return true;
        } catch (Exception e) {
            System.out.println("[JWT 토큰 검증 실패] " + e.getMessage());
            return false;
        }
    }

    public String getUseridFromToken(String token) {
        Claims claims = Jwts.parserBuilder().setSigningKey(SECRET_KEY)
                .build().parseClaimsJws(token).getBody();
        return claims.getSubject();
    }
}
