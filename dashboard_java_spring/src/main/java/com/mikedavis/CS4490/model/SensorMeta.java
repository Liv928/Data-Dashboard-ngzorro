package com.mikedavis.CS4490.model;

import com.fasterxml.jackson.annotation.JsonGetter;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.util.Date;

@Document
@Getter
@Setter
public class SensorMeta implements Serializable {
    @Id
    private String _id;
    private String units;
    private int log_interval;
    private String name;
    private String units_name;
    private String source;
    private String first;
    private String last;
    private Date ts_utc;
}
