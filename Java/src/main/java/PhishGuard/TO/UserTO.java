package PhishGuard.TO;

import org.springframework.stereotype.Component;

@Component
//Transfer Object for a user
public class UserTO {
    private String username;
    private String email;
    private String password;
    private String role;

    public UserTO(String username, String email, String password, String role) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.role = role;
    }

    public UserTO() {
        username = "invalid";
        email = "invalid@gmail.com";
        password = "invalidPassword";
        role = "noRole";
    }

    //getters and setter for all values in a user
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    //to string to be able to print out a user
    @Override
    public String toString() {
        return "UserTO{" +
                ", username='" + username + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", role='" + role + '\'' +
                '}';
    }
}
