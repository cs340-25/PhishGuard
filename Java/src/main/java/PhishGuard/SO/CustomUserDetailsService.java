package PhishGuard.SO;

import PhishGuard.DAO.UserDAO;
import PhishGuard.TO.UserTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    @Autowired
    UserDAO userDAO;

    @Override
    //finding a user by the username
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserTO userTO = userDAO.getUserByUsername(username);
        //returning error if the username isn't found
        if (userTO == null) {
            throw new UsernameNotFoundException("User not found");
        }
        //setting the user's role
        return new org.springframework.security.core.userdetails.User(userTO.getUsername(), userTO.getPassword(),
                Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + userTO.getRole())));
    }
}
