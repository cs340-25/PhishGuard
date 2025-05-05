package PhishGuard.Exceptions;

//custom exception for duplicate users
public class CustomDuplicateException extends RuntimeException {
    public CustomDuplicateException(String message) {
        super(message);
    }
}
