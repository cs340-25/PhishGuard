package PhishGuard.Controller;

import PhishGuard.SO.UserSO;
import PhishGuard.TO.UserTO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
//sets path to /user
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserSO userSO;
    
    //sets path to /user/deleteSelf and removes the currently logged in user from the database
    @DeleteMapping("/deleteSelf")
    public ResponseEntity<String> deleteSelf() {
        // Get the username of the currently authenticated user
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName(); // username of the logged-in user

        //return error if the user isn't in the database
        if (username == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not authenticated");
        }

        //attempts to delete the user and returns error if something goes wrong
        try {
            userSO.deleteUserByUsername(username);
            return ResponseEntity.ok("User with Username " + username + " deleted.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to delete user");
        }
    }

    //sets path to /user/getUser and return information about the currently logged in user
    @GetMapping("/getUser")
    public UserTO getUserByUsername() {
        //gets the current user's username
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        
        //makes sure the user exists
        if (username == null) {
            return null;
        }

        //tries to retieve the user information
        try {
            return userSO.getUserByUsername(username);
        } catch (Exception e) {
            return null;
        }
    }

    //sets path to /user/verify and the username and password are values in the path after /verify
    @GetMapping("verify/{username}/{password}")
    //uses path variables to return true or false if the user with that username and password is in the database
    public boolean verifyUser(@PathVariable String username, @PathVariable String password) {
        return userSO.verifyUser(username, password);
    }
}
