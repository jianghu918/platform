package com.le07.framework.util;

import com.alibaba.fastjson.JSON;
import com.le07.api.type.AnyException;
import com.le07.api.type.StackTrace;
import com.le07.framework.TypeConstants;
import com.le07.framework.ex.ErrorCode;
import com.le07.framework.global.type.Status;
import com.le07.framework.global.type.UserType;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.util.CollectionUtils;
import org.springframework.util.ReflectionUtils;

import java.lang.reflect.Field;
import java.util.*;


public class ThriftUtils {
	private static final Log LOG = LogFactory.getLog(ThriftUtils.class);

	private ThriftUtils() {
	}

	public static Boolean toBoolean(short s) {
		if (s < TypeConstants.NULL_BOOLEAN) {
			return false;
		} else if (s > TypeConstants.NULL_BOOLEAN) {
			return true;
		} else {
			return null;
		}
	}

	public static Short toShort(short s) {
		return s == TypeConstants.NULL_SHORT ? null : s;
	}

	public static Integer toInteger(int s) {
		return s == TypeConstants.NULL_INT ? null : s;
	}

	public static Long toLong(long s) {
		return s == TypeConstants.NULL_LONG ? null : s;
	}

	public static Double toDouble(double s) {
		return s == TypeConstants.NULL_DOUBLE ? null : s;
	}

	public static Date toDate(long ts) {
		return ts == TypeConstants.NULL_DATE ? null : new Date(ts);
	}

	public static short toBooleanValue(Boolean s) {
		if (s == null) {
			return TypeConstants.NULL_BOOLEAN;
		} else if (s) {
			return TypeConstants.TRUE_BOOLEAN;
		} else {
			return TypeConstants.FALSE_BOOLEAN;
		}
	}

	public static short toShortValue(Short s) {
		return s == null ? TypeConstants.NULL_SHORT : s;
	}

	public static int toIntegerValue(Integer s) {
		return s == null ? TypeConstants.NULL_INT : s;
	}

	public static long toLongValue(Long s) {
		return s == null ? TypeConstants.NULL_LONG : s;
	}

	public static double toDoubleValue(Double s) {
		return s == null ? TypeConstants.NULL_DOUBLE : s;
	}

	public static long toDateValue(Date date) {
		return date == null ? TypeConstants.NULL_DATE : date.getTime();
	}

	@SuppressWarnings("unchecked")
	public static Map<String, Object> toMap(Map<String, String> data) {
		return data == null ? null
				: (data.containsKey(TypeConstants.JSON) ? JSON.parseObject(data
						.get(TypeConstants.JSON)) : (Map) data);
	}

	public static Map<String, String> toStringMap(Map<String, Object> data) {
		if (data == null) {
			return null;
		}
		Map<String, String> map = new HashMap<String, String>(data.size());
		for (Map.Entry<String, Object> entry : data.entrySet()) {
			Object value = entry.getValue();
			map.put(entry.getKey(), value == null ? "" : value.toString());
		}
		return map;
	}



	public static AnyException toThriftAnyException(
			com.le07.framework.ex.AnyException ex) {
		return wrapEx(ex);
	}

	public static AnyException wrapEx(Throwable ex) {
		AnyException ae = new AnyException();
		int code = ErrorCode.SERVER_ERROR;
		if (ex instanceof com.le07.framework.ex.AnyException) {
			code = ((com.le07.framework.ex.AnyException) ex).getCode();
		} else {
			try {
				Field codeField = ReflectionUtils.findField(ex.getClass(),
						"code");
				ReflectionUtils.makeAccessible(codeField);
				code = codeField.getInt(ex);
			} catch (Exception ignored) {
			}
		}
		ae.setCode(code);
		if (LOG.isWarnEnabled()) {
			if (ex instanceof com.le07.framework.ex.AnyException) {
				if (((com.le07.framework.ex.AnyException) ex)
						.isLogStackTrace()) {
					LOG.warn("Thrift service error,code:" + code, ex);
				} else {
					LOG.warn("Thrift service error,code:" + code + ", msg:"
							+ ex.getMessage());
				}
			} else {
				LOG.warn("Thrift service error,code:" + code, ex);
			}

		}
		ae.setMsg(ex.getMessage());
		Set<Throwable> visitedExceptions = new HashSet<Throwable>();
		Throwable tmpEx = ex;
		List<StackTrace> list = new ArrayList<StackTrace>();
		while (tmpEx != null && !visitedExceptions.contains(tmpEx)) {
			for (StackTraceElement st : tmpEx.getStackTrace()) {
				StackTrace s = new StackTrace();
				s.setClassName(st.getClassName());
				s.setMethodName(st.getMethodName());
				s.setFileName(st.getFileName());
				s.setLineNumber(st.getLineNumber());
				list.add(s);
			}
			visitedExceptions.add(tmpEx);
			tmpEx = tmpEx.getCause();
		}
		ae.setStackTraces(list);
		return ae;
	}



	public static List<Long> stringToLongList(List<String> ids) {
		if (CollectionUtils.isEmpty(ids))
			return Collections.emptyList();

		List<Long> lids = new ArrayList<Long>();
		for (String id : ids) {
			try {
				lids.add(Long.parseLong(id));
			} catch (Exception ex) {
				LOG.warn(ex.getMessage());
			}
		}

		return lids;
	}










    //--公共Type.thrift里枚举转换--------------------------------------------------------------------------------------------------//
    public static Status toStatus(com.le07.api.type.Status status)
    {
        return null == status ? null : Status.values()[status.ordinal()];
    }

    public static List<Status> toStatus(List<com.le07.api.type.Status> status)
    {
        if(CollectionUtils.isEmpty(status))
            return null;
        List<Status> list = new ArrayList<Status>(status.size());
        for (com.le07.api.type.Status s : status) {
            list.add(toStatus(s));
        }
        return list;
    }

    public static Set<Status> toStatus(Set<com.le07.api.type.Status> status)
    {
        if(CollectionUtils.isEmpty(status))
            return null;
        Set<Status> set = new HashSet<Status>(status.size());
        for (com.le07.api.type.Status s : status) {
            set.add(toStatus(s));
        }
        return set;
    }

    public static com.le07.api.type.Status toApiStatus(Status status)
    {
        return null == status ? null : com.le07.api.type.Status.values()[status.ordinal()];
    }

    public static List<com.le07.api.type.Status> toApiStatus(List<Status> status)
    {
        if(CollectionUtils.isEmpty(status))
            return null;
        List<com.le07.api.type.Status> list = new ArrayList<com.le07.api.type.Status>(status.size());
        for (Status s : status) {
            list.add(toApiStatus(s));
        }
        return list;
    }

    public static Set<com.le07.api.type.Status> toApiStatus(Set<Status> status)
    {
        if(CollectionUtils.isEmpty(status))
            return null;
        Set<com.le07.api.type.Status> set = new HashSet<com.le07.api.type.Status>(status.size());
        for (Status s : status) {
            set.add(toApiStatus(s));
        }
        return set;
    }


    public static com.le07.api.type.UserType toApiUserType(UserType userType)
    {
        return null == userType ? null : com.le07.api.type.UserType.findByValue(userType.getValue());
    }

    public static UserType toUserType(com.le07.api.type.UserType userType)
    {
        return null == userType ? null : UserType.findByValue(userType.getValue());
    }

}
