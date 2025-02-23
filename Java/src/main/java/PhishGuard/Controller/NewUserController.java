package PhishGuard.Controller;

import PhishGuard.SO.UserSO;
import PhishGuard.TO.UserTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
//sets the path to /newUser 
@RequestMapping("/newUser")
public class NewUserController {
    @Autowired
    private UserSO userSO;

    //sets the path to /newUser/create and adds a new user to the database
    @PostMapping("/create")
    public String newUser(@RequestBody UserTO newUser) {
        userSO.addUser(newUser);

        return "User Successfully Added!";
    }
}
