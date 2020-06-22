package com.mikedavis.CS4490.service.sql;

import com.mikedavis.CS4490.model.AdditionalMetadata;
import com.mikedavis.CS4490.model.Building;
import com.mikedavis.CS4490.model.Sensor;

import java.util.List;

public interface SensorService {

    public Sensor getSensor(String id);

    public List<Sensor> getSensorsByBuilding(String buildingId);

    public List<AdditionalMetadata> getAdditionalMetadata(String id);

    public void insertAdditionalMetadata(AdditionalMetadata additionalMetadata);

    public void deleteAdditionalMetadata(String metaTitle);

    public void updateAdditionalMetadata(AdditionalMetadata additionalMetadata);
}
