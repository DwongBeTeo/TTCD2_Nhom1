package com.TTCD2.Project4.config;

import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import com.TTCD2.Project4.dto.CustomUserDetails;
import com.TTCD2.Project4.entity.Users;
import com.TTCD2.Project4.repository.UsersRepository;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private UsersRepository usersRepository;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(auth -> auth
            	.requestMatchers("/","/cart/items","/add-to-cart/{gameId}/{accountId}","/cart","/valorantDetail-{id}","valorant-accounts/detail/{id}","/listValorantAccount","/test", "/products", "/lienquan", "/valorant", "/pubg", "/login", "/register", "test/css/**","test/fonts/**","test/images/**","test/js/**", "homePage/css/**","homePage/fonts/**","homePage/images/**","homePage/js/**").permitAll()

//            	.requestMatchers("/buy/**").authenticated()
            	
//              Các EndPoint khác cần yêu cầu xác thực
                .anyRequest().authenticated()
            )
            .formLogin(form -> form
                    .loginPage("/login")
                    .successHandler((request, response, authentication) -> {
                        if (authentication.getAuthorities().contains(new SimpleGrantedAuthority("ROLE_admin"))) {
                            response.sendRedirect("/admin");
                        } else {
                            response.sendRedirect("/test");
                        }
                    })
                    .permitAll()
                )
            .logout(logout -> logout
            		.logoutSuccessUrl("/test")
                    .invalidateHttpSession(true)
                    .deleteCookies("JSESSIONID")
                    .permitAll()
            )
            .csrf(csrf -> csrf.disable());
        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return NoOpPasswordEncoder.getInstance(); // Sử dụng NoOpPasswordEncoder để so sánh mật khẩu plain text
    }
    
    @Bean
    public UserDetailsService userDetailsService() {
        return username -> {
            Users users = usersRepository.findByUsername(username)
                    .orElseThrow();
            return new CustomUserDetails(
                users.getUserId(),
                users.getUsername(),
                users.getPasswordHash(),
                Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + users.getRole()))
            );
        };
    }

//    @Bean
//    public UserDetailsService userDetailsService() {
//        return username -> {
//            Users users = usersRepository.findByUsername(username)
//                    .orElseThrow();
//            return org.springframework.security.core.userdetails.User
//                    .withUsername(users.getUsername())
//                    .password(users.getPasswordHash())
//                    .roles(users.getRole().name())
//                    .build();
//        };
//    }
}
