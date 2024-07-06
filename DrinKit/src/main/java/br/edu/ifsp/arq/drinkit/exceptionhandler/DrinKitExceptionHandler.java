package br.edu.ifsp.arq.drinkit.exceptionhandler;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.apache.commons.lang3.exception.ExceptionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import br.edu.ifsp.arq.drinkit.service.exception.NonExistentOrInactiveClientException;

@ControllerAdvice
public class DrinKitExceptionHandler extends ResponseEntityExceptionHandler {
	
	@Autowired
	private MessageSource messageSource;
	
	@Override
	protected ResponseEntity<Object> handleHttpMessageNotReadable
		(HttpMessageNotReadableException ex,
		HttpHeaders headers, HttpStatus status, 
		WebRequest request) {
		
		String userMessage = 
				messageSource.getMessage("invalid.message", null,
						LocaleContextHolder.getLocale());
		String developerMessage = 
				Optional.ofNullable(ex.getCause()).orElse(ex).toString();
		return handleExceptionInternal(ex, new Error(userMessage,
				developerMessage), 
				headers, HttpStatus.BAD_REQUEST, request);
	}
	
	@ExceptionHandler({EmptyResultDataAccessException.class})
	protected ResponseEntity<Object> handleEmptyResultDataAccessException(EmptyResultDataAccessException ex,
		WebRequest request) {

		String userMessage = messageSource.getMessage("resource.not-found", null, 
			LocaleContextHolder.getLocale());
		String developerMessage = ex.toString();
		
		List<Error> errors = Arrays.asList(new Error(userMessage, developerMessage));
		return handleExceptionInternal(ex, errors, new HttpHeaders(), HttpStatus.BAD_REQUEST, request);
	}
	
	@ExceptionHandler({ DataIntegrityViolationException.class } )
	public ResponseEntity<Object> handleDataIntegrityViolationException(DataIntegrityViolationException ex, 		
		WebRequest request) {
			
		String userMessage = messageSource.getMessage("resource.operation-not-allowed", null, 			
			LocaleContextHolder.getLocale());
		// aqui!
		String developerMessage = ExceptionUtils.getRootCauseMessage(ex);
		List<Error> errors = Arrays.asList(new Error(userMessage, developerMessage));
		return handleExceptionInternal(ex, errors, new HttpHeaders(), HttpStatus.BAD_REQUEST, request);
	}
	
	@ExceptionHandler({ NonExistentOrInactiveClientException.class } )
	public ResponseEntity<Object> handleNonExistentOrInactiveUserException(NonExistentOrInactiveClientException ex) {
		String userMessage = messageSource.getMessage("user.non-existent-or-inactive", null, LocaleContextHolder.getLocale());
		String developerMessage = ExceptionUtils.getRootCauseMessage(ex);
		List<Error> errors = Arrays.asList(new Error(userMessage, developerMessage));
		return ResponseEntity.badRequest().body(errors);
	}
	
	public static class Error{
		private String userMessage;
		private String developerMessage;
		
		public Error(String userMessage, String developerMessage) {
			this.userMessage = userMessage;
			this.developerMessage = developerMessage;
		}
		
		public String getUserMessage() {
			return userMessage;
		}
		
		public String getDeveloperMessage() {
			return developerMessage;
		}
	}

}