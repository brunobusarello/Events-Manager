package com.events.demo.projections;

import java.sql.Date;

public interface EventAvailableProjection {
    Long getId();
    Date getDataEvento();
    String getLocal();
    String getNome();
}
