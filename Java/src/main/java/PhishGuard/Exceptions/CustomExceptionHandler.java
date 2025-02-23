package PhishGuard.Exceptions;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.http.ResponseEntity;

@RestControllerAdvice
//handles to custom database exception and the custom duplicate exception
public class CustomExceptionHandler {

    @ExceptionHandler(CustomDuplicateException.class)
    public ResponseEntity<String> handleDuplicateUserException(CustomDuplicateException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.CONFLICT);
    }

    @ExceptionHandler(CustomDatabaseException.class)
    public ResponseEntity<String> handleDatabaseException(CustomDatabaseException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
