package PhishGuard.Config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import static org.springframework.security.config.Customizer.withDefaults;


@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) //make sure to remove later
                //makes sure all endpoints can only be hit if the user has the correct role
                .authorizeHttpRequests((requests) -> requests
                        .requestMatchers("/admin/**").hasRole("ADMIN")
                        .requestMatchers("/user/verify/**").permitAll()
                        .requestMatchers("/user/**").hasAnyRole("USER", "ADMIN")
                        .requestMatchers("/newUser/**").permitAll()
                        .requestMatchers("/actuator/health").permitAll()
                        .requestMatchers("/actuator/**").hasRole("ADMIN")
                        .requestMatchers("/packets/**").hasAnyRole("USER", "ADMIN")
                        .requestMatchers("/detectionLogs/**").hasAnyRole("USER", "ADMIN")
                        .anyRequest().authenticated()  // All other endpoints require authentication
                )
                .httpBasic(withDefaults());

        return http.build();
    }


}