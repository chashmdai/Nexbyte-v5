package com.nexbyte.nexbyteapi.config;

import com.nexbyte.nexbyteapi.services.JwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Arrays;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.filter.OncePerRequestFilter;

public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private static final String BEARER_PREFIX = "Bearer ";
    private static final AntPathMatcher PATH_MATCHER = new AntPathMatcher();

    // Endpoints realmente públicos SIN considerar método (solo GETs "de lectura" se manejan en SecurityConfig)
    private static final String[] PUBLIC_ENDPOINTS = new String[] {
        "/swagger-ui.html", "/swagger-ui/**",
        "/v3/api-docs/**", "/v3/api-docs.yaml",
        "/swagger-resources/**", "/webjars/**",
        "/api/auth/**",
        "/api/contactos",
        "/api/contacto"
        // IMPORTANTE: NO incluir /api/soporte aquí (solo su POST será público más abajo)
        // IMPORTANTE: NO incluir productos/categorías aquí; se controlan en SecurityConfig
    };

    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;

    public JwtAuthenticationFilter(JwtService jwtService, UserDetailsService userDetailsService) {
        this.jwtService = jwtService;
        this.userDetailsService = userDetailsService;
    }

    private static boolean matchesAny(String path, String[] patterns) {
        return Arrays.stream(patterns).anyMatch(p -> PATH_MATCHER.match(p, path));
    }

    private boolean isPublic(HttpServletRequest request) {
        // 1) Deja pasar todos los preflight
        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) return true;

        final String servletPath = request.getServletPath();
        final String requestUri  = request.getRequestURI();

        // 2) Endpoints públicos "planos"
        if (matchesAny(servletPath, PUBLIC_ENDPOINTS) || matchesAny(requestUri, PUBLIC_ENDPOINTS)) {
            return true;
        }

        // 3) Solo el POST a /api/soporte es público (enviar ticket)
        if ("POST".equalsIgnoreCase(request.getMethod())
                && (PATH_MATCHER.match("/api/soporte", servletPath)
                    || PATH_MATCHER.match("/api/soporte/", servletPath))) {
            return true;
        }

        // 4) Todo lo demás requiere autenticación (SecurityConfig decidirá rol)
        return false;
    }

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain) throws ServletException, IOException {

        // Endpoints públicos o preflight
        if (isPublic(request)) {
            filterChain.doFilter(request, response);
            return;
        }

        // Si no trae Authorization Bearer, continúa anónimo (y Security decidirá)
        String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith(BEARER_PREFIX)) {
            filterChain.doFilter(request, response);
            return;
        }

        // Extrae usuario desde el JWT y autentica el contexto
        String jwt = authHeader.substring(BEARER_PREFIX.length());
        String username;
        try {
            username = jwtService.extractUsername(jwt);
        } catch (Exception ignored) {
            filterChain.doFilter(request, response);
            return;
        }

        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            try {
                UserDetails userDetails = userDetailsService.loadUserByUsername(username);
                if (jwtService.isTokenValid(jwt, userDetails)) {
                    UsernamePasswordAuthenticationToken authToken =
                            new UsernamePasswordAuthenticationToken(
                                    userDetails, null, userDetails.getAuthorities());
                    authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                }
            } catch (Exception ignored) {}
        }

        filterChain.doFilter(request, response);
    }
}
