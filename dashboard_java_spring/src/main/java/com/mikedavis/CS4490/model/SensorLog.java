package com.mikedavis.CS4490.model;

import lombok.Getter;
import lombok.Setter;

import java.util.Map;

@Getter
@Setter
public class SensorLog {
    String id;
    String date;
    Map<String, String> data;
}
