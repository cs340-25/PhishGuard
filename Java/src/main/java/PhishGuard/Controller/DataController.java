package PhishGuard.Controller;

import PhishGuard.SO.DataSO;
import PhishGuard.TO.DataTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
//sets the path to /data
@RequestMapping("/data")
@CrossOrigin(origins = "http://localhost:3000")
public class DataController {
    @Autowired
    private DataSO dataSO;

    //sets the path to /datas/userLogs and retrieves the normal logs for the signed in user
    @GetMapping("/userLogs")
    @CrossOrigin(origins = "http://localhost:3000")
    public List<DataTO> getUserData() {
        //grabs authentication information for current user   
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return dataSO.getUserData(authentication.getName());
    }

}
