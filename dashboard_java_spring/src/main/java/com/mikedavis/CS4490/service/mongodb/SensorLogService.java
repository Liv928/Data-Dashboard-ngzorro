package com.mikedavis.CS4490.service.mongodb;

import com.mikedavis.CS4490.model.SensorData;
import com.mikedavis.CS4490.model.SensorMeta;
import org.json.JSONArray;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

public interface SensorLogService {

    JSONArray getSensorJSONDataByID(String id, String date);

    SensorData getSensorDataByID(String id, String date);

    SensorMeta getSensorMetaDataByID(String id);

    SensorData getSensorDataByDateRange(String id, String startDate, String endDate);

    SensorData getAllSensorDataByID(String id);

    List<SensorMeta> findSensorMetasById(@PathVariable String id);
}
