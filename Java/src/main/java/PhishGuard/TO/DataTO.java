package PhishGuard.TO;

import org.springframework.stereotype.Component;

@Component
//Transfer Object for data
public class DataTO {
    private String username;
    private String email;
    private bool result;
    private String timestamp;

    
    public DataTO(String username, String email, bool result, String timestamp) {
      this.username = username;
      this.email = email;
      this.result = result;
      this.timestamp = timestamp;
    }

    public DataTO() {
        username = "N/A";
        email = "N/A";
        result = true;
        timestamp = "N/A";
    }

    //getters and setters for all values in the data log

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

    public bool getResult() {
      return result;
    }
    
    public void setResult(bool result) {
      this.result = result;
    }

    public String getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(String timestamp) {
        this.timestamp = timestamp;
    }

