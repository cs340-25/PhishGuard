package PhishGuard.SO;

import PhishGuard.DAO.UserDAO;
import PhishGuard.TO.UserTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserSO {

    @Autowired
    private UserDAO userDao;

    //calling the dao to get user information for all the users
    public List<UserTO> getUsers() {
        return userDao.getAllUsers();
    }

    //calling the dao to get all user information on a given username
    public UserTO getUserByUsername(String username) {
        return userDao.getUserByUsername(username);
    }

    //calling dao to add a new user to the database
    public void addUser(UserTO user) {
        userDao.addUser(user);
    }

    //calling dao to delete a user with the given username
    public void deleteUserByUsername(String username) {
        userDao.deleteUserByUsername(username);
    }

    //calling the dao to check if a user with the given username and password exist
    public boolean verifyUser(String username, String password) {
        return userDao.verifyUser(username, password);
    }
}
