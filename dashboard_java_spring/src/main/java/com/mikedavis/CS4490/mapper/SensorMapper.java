package com.mikedavis.CS4490.mapper;

import com.mikedavis.CS4490.model.Sensor;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface SensorMapper {

    @Select("SELECT id, name, description, building_id as buildingId FROM Sensors WHERE id = #{id}")
    Sensor getSensor(String id);

    @Select("SELECT id, name, description, building_id as buildingId FROM Sensors WHERE building_id = #{buildingId}")
    List<Sensor> getSensorsByBuilding(String buildingId);
}
