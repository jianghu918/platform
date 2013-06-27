package com.le07.framework.util;

import com.le07.framework.global.type.Status;


public interface Statusable {

    Status getStatus();

    void setStatus(Status status);
}
