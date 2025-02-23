package PhishGuard.Controller;

import PhishGuard.SO.UserSO;
import PhishGuard.TO.UserTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
//sets the path to /admin
@RequestMapping("/admin")
public class AdminController {
    @Autowired
    private UserSO userSO;

    //sets the path to /admin/getAllUsers and returns all user information
    @GetMapping("/getAllUsers")
    public List<UserTO> displayUsers() {
        return userSO.getUsers();
    }

    //sets the path to /admin/getUserByUsername/ and revieves a specific user by the given username
    @GetMapping("/getUserByUsername/{username}")
    public UserTO getUserByUsername(@PathVariable String username) {
        return userSO.getUserByUsername(username);
    }

    //sets the path to /admin/deleteUserByUsername and deletes a specific user
    @GetMapping("/deleteUserByUsername/{username}")
    public String deleteUserByUsername(@PathVariable String username) {
        userSO.deleteUserByUsername(username);
        return "User with username " + username + " deleted.";
    }
}
