package PhishGuard.DAO;

import PhishGuard.Exceptions.CustomDatabaseException;
import PhishGuard.Exceptions.CustomDuplicateException;
import PhishGuard.TO.UserTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Repository
public class UserDAO {

    //used to hash the password provided by the new user
    @Autowired
    private PasswordEncoder passwordEncoder;

    //used to connect to the database
    private JdbcTemplate template;

    public JdbcTemplate getTemplate() {
        return template;
    }

    @Autowired
    public void setTemplate(JdbcTemplate template) {
        this.template = template;
    }

    public void addUser(UserTO user) {
        //sql to add a new user into the database
        String sql = "insert into users (username, email, password, role) values (?,?,?,?)";
        
        //hashing the password using BCryptPasswordEncoder
        String hashedPassword = passwordEncoder.encode(user.getPassword());

        //trying to add the user to the database while making sure there are no duplicate usernames or emails
        try {
            template.update(sql, user.getUsername(), user.getEmail(), hashedPassword, user.getRole());
        } catch (DuplicateKeyException e) {
            throw new CustomDuplicateException("Username or Email already exists.");
        } catch (DataIntegrityViolationException e) {
            // This can catch more specific cases if needed.
            throw new CustomDatabaseException("There was a database error.");
        }
    }

    public void deleteUserByUsername(String username) {
        //sql to delete user with the given username
        String sql = "delete from users where username=?";
        //username is combined with sql here so prevent sql injections
        template.update(sql, username);
    }

    public UserTO getUserByUsername(String username) {
        //sql to find user information of the given username
        String sql = "SELECT * FROM users WHERE username = ?";

        //grabs the data from the user
        RowMapper<UserTO> mapper = new RowMapper<UserTO>() {
            @Override
            public UserTO mapRow(ResultSet rs, int rowNum) throws SQLException {
                UserTO user = new UserTO();
                user.setUsername(rs.getString("username"));
                user.setEmail(rs.getString("email"));
                user.setPassword(rs.getString("password"));
                user.setRole(rs.getString("role"));
                return user;
            }
        };

        //combining sql and username here to prevent sql injections
        List<UserTO> users = template.query(sql, mapper, username);
        
        //catches if there isn't a user with that username
        if (users.isEmpty()) {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }

        //Since usernames are unique the first and only value in the list is the user we are looking for
        return users.get(0);
    }
    public List<UserTO> getAllUsers() {
        //sql to get all users
        String sql = "select * from users";

        RowMapper<UserTO> mapper = new RowMapper<UserTO>() {
            @Override
            public UserTO mapRow(ResultSet rs, int rowNum) throws SQLException {
                //grabs the values of each user
                UserTO user = new UserTO();
                user.setUsername(rs.getString("username"));
                user.setEmail(rs.getString("email"));
                user.setPassword(rs.getString("password"));
                user.setRole(rs.getString("role"));

                return user;
            }
        };

        return template.query(sql, mapper);
    }

    //checks if a user with the given username and password exist
    public boolean verifyUser(String username, String password) {
        //sql to find a user with a given username
        String sql = "SELECT * FROM users WHERE username = ?";
    
        RowMapper<UserTO> mapper = new RowMapper<UserTO>() {
            @Override
            public UserTO mapRow(ResultSet rs, int rowNum) throws SQLException {
                //grabs all the information on the user
                UserTO user = new UserTO();
                user.setUsername(rs.getString("username"));
                user.setEmail(rs.getString("email"));
                user.setPassword(rs.getString("password"));
                user.setRole(rs.getString("role"));
                return user;
            }
        };
        
        //combining the sql and username here to prevent sql injection
        List<UserTO> users = template.query(sql, mapper, username);

        //invalid credentials if there is no user with that username or if the passwords don't match
        if (users.isEmpty() || !passwordEncoder.matches(password, users.get(0).getPassword())) {
            return false;
        }
        
        //if the username and password match the user is validated
        return true;
    }
}

