package com.mikedavis.CS4490.mapper;

import com.mikedavis.CS4490.model.Building;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface BuildingMapper {
    @Select("SELECT id, name, trend_data_id AS trendDataId FROM Buildings")
    List<Building> getBuildings();

    @Select("SELECT id, name, trend_data_id AS trendDataId FROM Buildings WHERE id = #{id}")
    Building getBuilding(String id);
}
