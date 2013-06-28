package com.le07.framework.ex;


import com.le07.framework.message.NLS;
import org.hibernate.validator.constraints.NotEmpty;
import org.hibernate.validator.internal.metadata.descriptor.ConstraintDescriptorImpl;
import org.hibernate.validator.method.MethodConstraintViolation;
import org.hibernate.validator.method.MethodConstraintViolationException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.LocalVariableTableParameterNameDiscoverer;

import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;
import javax.validation.Path;
import javax.validation.Path.Node;
import javax.validation.ValidationException;
import javax.validation.constraints.*;
import javax.validation.metadata.ConstraintDescriptor;
import java.lang.annotation.Annotation;
import java.lang.annotation.ElementType;
import java.lang.reflect.Method;
import java.util.Iterator;
import java.util.Set;


public class ValidateExceptionAdvice {
	private static final Logger LOGGER = LoggerFactory.getLogger(ValidateExceptionAdvice.class);
	private LocalVariableTableParameterNameDiscoverer discoverer = new LocalVariableTableParameterNameDiscoverer();
	
	
	public void afterThrowingValidationException(ValidationException e) throws AnyException {
		if(e instanceof MethodConstraintViolationException) { // 方法参数验证
			Set<MethodConstraintViolation<?>> mcvs = ((MethodConstraintViolationException)e)
					.getConstraintViolations();
			for (MethodConstraintViolation<?> mcv : mcvs) {
				ConstraintDescriptor<?> constraintDescriptor = mcv.getConstraintDescriptor();
				Annotation annotation = constraintDescriptor.getAnnotation();
				LOGGER.info("method param {}", mcv.toString());
				throw new AnyException(getErrorCodeByAnnotation(annotation),rebuildMessage(mcv));
			}
		} else if(e instanceof ConstraintViolationException) { // bean 属性验证
			Set<ConstraintViolation<?>> cvs = ((ConstraintViolationException)e)
					.getConstraintViolations();
			for(ConstraintViolation<?> cv : cvs) {
				ConstraintDescriptor<?> constraintDescriptor = cv.getConstraintDescriptor();
				Annotation annotation = constraintDescriptor.getAnnotation();
				LOGGER.info("field validate {}", cv.getPropertyPath());
				throw new AnyException(getErrorCodeByAnnotation(annotation), buildFieldMessage(cv));
			}
		}
	}
	
	private int getErrorCodeByAnnotation(Annotation annotation){
		Class<? extends Annotation> annotationType = annotation.annotationType();
		if(NotNull.class.equals(annotationType)||NotEmpty.class.equals(annotationType)){
			return ErrorCode.MISS_PARAM;
		}else if (Min.class.equals(annotationType)||(Max.class.equals(annotationType)||Size.class.equals(annotationType))){
			return ErrorCode.RANGE_ERROR;
		}else if (Pattern.class.equals(annotationType)){
			return ErrorCode.PATTERN_NOT_MATCH;
		} else
			return ErrorCode.VALIDATE_ERROR;
	}
	
	private String buildFieldMessage(ConstraintViolation<?> cv) {
		StringBuffer finalMessage = new StringBuffer();
		String field = cv.getPropertyPath().toString();
		finalMessage.append(NLS.getMessage("Field.message", new Object[]{field}));
		finalMessage.append(" ").append(cv.getMessage());
		return finalMessage.toString();
	}
	
	private String rebuildMessage(MethodConstraintViolation<?> mcv){
		StringBuffer finalMessage = new StringBuffer();
		ConstraintDescriptorImpl cd = (ConstraintDescriptorImpl)mcv.getConstraintDescriptor();
		finalMessage.append(getParamName(mcv));
		if(cd.getElementType()==ElementType.FIELD) {
			// 属性验证异常
			Path path = mcv.getPropertyPath();
			Iterator<Node> nodeIterator = path.iterator();
			//忽略第一
			nodeIterator.next();
			while(nodeIterator.hasNext()){
				finalMessage.append("->");
				Node node = nodeIterator.next();
				finalMessage.append(node.toString());
			}
		} 
		
		finalMessage.append(" ").append(mcv.getMessage());
		return finalMessage.toString();
	}
	
	private String getParamName(MethodConstraintViolation<?> mcv) {
		int pindex = mcv.getParameterIndex();
		Method cm = mcv.getMethod();
		String[] paramNames = discoverer.getParameterNames(cm);
		return paramNames == null? String.valueOf(pindex) : paramNames[pindex];
	}
}
