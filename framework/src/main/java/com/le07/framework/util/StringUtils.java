
package com.le07.framework.util;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


public class StringUtils {

	private static final Logger LOG = LoggerFactory
			.getLogger(StringUtils.class);
	private static final long ZERO = 0;

	/**
	 * @param query
	 * @see 将字符串中所有"%"和"_"转义成"\%"和"\_"
	 * @return
	 */
	public static String toTransferredString(String inputStr) {

		boolean isSpecial = inputStr.matches("[%_]+");
		Long check = 0L;
		int count = inputStr.length();
		
		if(!isSpecial){
			if(inputStr.startsWith("%")||inputStr.endsWith("%")){
				
				if(inputStr.startsWith("%")&&!inputStr.endsWith("%")){
					inputStr = inputStr.substring(1, count);
					check = 1L;
				}else if(!inputStr.startsWith("%")&&inputStr.endsWith("%")){
					inputStr = inputStr.substring(0, count-1);
					check = 2L;
				}else{
					inputStr = inputStr.substring(1, count-1);
					check = 3L;
				}
			}
		}
		String outputStr = org.apache.commons.lang.StringUtils.replaceChars(
				inputStr, "_", "\\_");
		outputStr = org.apache.commons.lang.StringUtils.replaceChars(
				outputStr, "%", "\\%");
		
		if(check == 1L){
			outputStr = "%" + outputStr;
		}else if(check == 2L){
			outputStr = outputStr + "%";
		}else if(check == 3L){
			outputStr = "%" + outputStr + "%";
		}
		
		return outputStr;

	}
}
