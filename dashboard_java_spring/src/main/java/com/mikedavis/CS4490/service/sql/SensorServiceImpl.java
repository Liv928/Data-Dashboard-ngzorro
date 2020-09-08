package com.mikedavis.CS4490.service.sql;

import com.mikedavis.CS4490.mapper.BuildingMapper;
import com.mikedavis.CS4490.mapper.MetaMapper;
import com.mikedavis.CS4490.mapper.SensorMapper;
import com.mikedavis.CS4490.model.AdditionalMetadata;
import com.mikedavis.CS4490.model.Building;
import com.mikedavis.CS4490.model.Sensor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SensorServiceImpl implements SensorService{
    @Autowired
    private SensorMapper sensorMapper;

    @Autowired
    private MetaMapper metaMapper;

    @Override
    public Sensor getSensor(String id){
        Sensor test = sensorMapper.getSensor(id);
        return sensorMapper.getSensor(id);
    }

    @Override
    public List<Sensor> getSensorsByBuilding(String buildingId){
        return sensorMapper.getSensorsByBuilding(buildingId);
    }

    //get metadata from sql server
    @Override
    public List<AdditionalMetadata> getAdditionalMetadata(String sensorId){
        return metaMapper.getAdditionalMetadata(sensorId);
    }

    //user adds metadata (store in sql server)
    @Override
    public void insertAdditionalMetadata(AdditionalMetadata additionalMetadata){
        metaMapper.insertAdditionalMetadata(additionalMetadata);
    }

    //user delete metadata
    @Override
    public void deleteAdditionalMetadata(int id){
        metaMapper.deleteMeta(id);
    }

    //user edit metadata
    @Override
    public void updateAdditionalMetadata(AdditionalMetadata additionalMetadata) {
        System.out.println("update id "+additionalMetadata.getSensorId());
        metaMapper.updateMeta(additionalMetadata);
    }
}
