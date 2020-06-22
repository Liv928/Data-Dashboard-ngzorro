package com.mikedavis.CS4490.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.util.Date;

@Document
@Getter
@Setter
public class MongoData implements Serializable {
    @Id
    private String _id;
    private int temp;
    private int d;
    private String dt;
    private int i;
    private int l;
    private String rev;
    private String t;
    private Date ts_utc;
}
