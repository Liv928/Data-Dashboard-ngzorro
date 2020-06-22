package com.mikedavis.CS4490.model;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Getter
@Setter
public class SensorData implements Serializable {

    private Sensor sensor;
    private String data; //raw data from MongoDB
    private SensorMeta sensorMeta;//meta data form MongoDB
    private List<AdditionalMetadata> additionalMetadata;
    private List<Event> events;


}
