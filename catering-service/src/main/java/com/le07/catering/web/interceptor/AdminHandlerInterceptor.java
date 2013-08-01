package com.le07.catering.web.interceptor;

import com.le07.catering.web.Constants;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * 自定义HandlerInterceptor
 * 用于后台权限管理
 * Created with IDEA.
 * User: hu
 * Date: 13-7-31
 * Time: 下午5:18
 */
public class AdminHandlerInterceptor  extends HandlerInterceptorAdapter{


    @Override
    public boolean preHandle(HttpServletRequest request,
                             HttpServletResponse response, Object handler) throws Exception {
        String url = request.getRequestURI();
        if(url.contains("/admin"))
        {
            if(null == request.getSession() || null == request.getSession().getAttribute(Constants.USER_INFO_SESSION))
            {
                response.sendRedirect(request.getContextPath() + "/login");
            }
        }

        return super.preHandle(request, response, handler);
    }
}
