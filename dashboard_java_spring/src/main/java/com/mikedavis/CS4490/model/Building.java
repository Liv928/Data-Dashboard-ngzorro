package com.mikedavis.CS4490.model;

import lombok.Data;
import lombok.experimental.Accessors;

import java.io.Serializable;

@Accessors(chain = true)
@Data
public class Building implements Serializable {
    private String id;
    private String name;
    private String trendDataId;
}
