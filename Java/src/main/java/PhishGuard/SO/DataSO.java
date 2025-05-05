package PhishGuard.SO;

import PhishGuard.DAO.DataDAO;
import PhishGuard.TO.DataTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DataSO {

    @Autowired
    private DataDAO dataDAO;

    //calling the dao to get all the normal Data
    public List<DataTO> getData() {
        return dataDAO.getData();
    }

    //calling the dao to get all the normal Data for a specific user
    public List<DataTO> getUserData(String username) {
        return dataDAO.getUserData(username);
    }

    public void addDataLog(DataTO data) {
        dataDAO.insertData(data);
    }

}
