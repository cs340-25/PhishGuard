package PhishGuard.Controller;

import PhishGuard.SO.UserSO;
import PhishGuard.SO.DataSO;
import PhishGuard.TO.DataTO;
import PhishGuard.TO.UserTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
//sets the path to /admin
@RequestMapping("/admin")
@CrossOrigin(origins = "http://localhost:3000")
public class AdminController {
    @Autowired
    private UserSO userSO;
    @Autowired
    private DataSO dataSO;

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

    //sets the path to /datas/viewLogs and retrieves the normal logs for all users
    @GetMapping("/viewLogs")
    public List<DataTO> getData() {
        return dataSO.getData();
    }
}
