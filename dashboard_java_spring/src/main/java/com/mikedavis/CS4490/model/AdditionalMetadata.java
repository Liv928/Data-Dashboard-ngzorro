package com.mikedavis.CS4490.model;

import lombok.Getter;
import lombok.Setter;

import java.util.Map;

@Getter
@Setter
public class AdditionalMetadata {
    private int id;
    private String title;
    private String description;
    private String sensorId;
}
