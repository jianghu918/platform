
package com.le07.framework.util;

import org.apache.commons.lang.time.FastDateFormat;

import java.text.Format;
import java.util.Calendar;
import java.util.Date;


public class DateUtils extends org.apache.commons.lang.time.DateUtils {
    public static final Format DATE_FORMAT = FastDateFormat.getInstance("yyyy-MM-dd");
    public static final Format DATETIME_FORMAT = FastDateFormat.getInstance("yyyy-MM-dd HH:mm:ss");
    public static final long START_SECOND = 1349800000;

    public static long toShortSecond(long timestamp) {
        return timestamp / MILLIS_PER_SECOND - START_SECOND;
    }

    public static long toNormalSecond(long shortSecond) {
        return START_SECOND + shortSecond;
    }

    public static long getCurrentShortSecond() {
        return toShortSecond(System.currentTimeMillis());
    }
    
    /**
     * 将时间改为当天的23:59:59
     * @param date
     * @return
     */
    public static Date getMaxTimeDate(Date date) {
    	if (date == null) {
            throw new IllegalArgumentException("The date must not be null");
        }
        Calendar c = Calendar.getInstance();
        c.setLenient(false);
        c.setTime(date);
        c.set(Calendar.HOUR_OF_DAY, 23);
        c.set(Calendar.MINUTE, 59);
        c.set(Calendar.SECOND, 59);
        return c.getTime();
    }
    
    /**
     * 将时间改为当天的0:0:0
     * @param date
     * @return
     */
    public static Date getMinTimeDate(Date date) {
    	if (date == null) {
            throw new IllegalArgumentException("The date must not be null");
        }
        Calendar c = Calendar.getInstance();
        c.setLenient(false);
        c.setTime(date);
        c.set(Calendar.HOUR_OF_DAY, 0);
        c.set(Calendar.MINUTE, 0);
        c.set(Calendar.SECOND, 0);
        return c.getTime();
    }
    
}
