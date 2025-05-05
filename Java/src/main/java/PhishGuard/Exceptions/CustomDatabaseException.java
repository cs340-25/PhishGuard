package PhishGuard.Exceptions;

//custom exception to use with the database
public class CustomDatabaseException extends RuntimeException{
    public CustomDatabaseException(String message) {
        super(message);
    }
}
