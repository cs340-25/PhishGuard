package PhishGuard.DAO;

import PhishGuard.TO.DataTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Repository
public class DataDAO {

    //used to connect to the database
    private JdbcTemplate template;

    public JdbcTemplate getTemplate() {
        return template;
    }

    @Autowired
    public void setTemplate(JdbcTemplate template) {
        this.template = template;
    }

    public List<DataTO> getData() {
        //sql to get all the data logs
        String sql = "select * from data_logs";

        RowMapper<DataTO> mapper = new RowMapper<DataTO>() {
            @Override
            public DataTO mapRow(ResultSet rs, int rowNum) throws SQLException {
                //sets the values of the data based on the values in each column in the database
                DataTO data = new DataTO();
                data.setEmail(rs.getString("email"));
                data.setResult(rs.getBoolean("result"));
                data.setTimestamp(rs.getString("timestamp"));
                data.setUsername(rs.getString("username"));

                return data;
            }
        };
        return template.query(sql, mapper);
    }


    public List<DataTO> getUserData(String username) {
        //sql to get all datas from the signed in user
        String sql = "select * from data_logs WHERE username = ?";

        RowMapper<DataTO> mapper = new RowMapper<DataTO>() {
            @Override
            public DataTO mapRow(ResultSet rs, int rowNum) throws SQLException {
                //sets the values of the data based on the values in each column in the database
                DataTO data = new DataTO();
                data.setEmail(rs.getString("email"));
                data.setResult(rs.getBoolean("result"));
                data.setTimestamp(rs.getString("timestamp"));
                data.setUsername(rs.getString("username"));

                return data;
            }
        };
        //the username and sql are combined here rather than just in the sql string to prevent sql injections
        return template.query(sql, mapper, username);
    }

}
