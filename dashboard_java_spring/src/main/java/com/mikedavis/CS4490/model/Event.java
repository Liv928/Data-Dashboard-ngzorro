package com.mikedavis.CS4490.model;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class Event {
    private int id;
    private String title;
    private String description;
    private Date startDate;
    private Date endDate;
    private String buildingId;
    private String clusterId;
}
