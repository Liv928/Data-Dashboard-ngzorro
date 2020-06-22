package com.mikedavis.CS4490.mapper;

import com.mikedavis.CS4490.model.AdditionalMetadata;
import com.mikedavis.CS4490.model.Cluster;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.Results;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface ClusterMapper {
    @Results(value = {
            @Result(property = "id", column = "id"),
            @Result(property = "name", column = "name"),
            @Result(property = "description", column = "description"),
            @Result(property = "buildingId", column = "building_id")
    })
    @Select("SELECT * FROM Clusters WHERE building_id = #{id}")
    List<Cluster> getBuildingClusters(String id);
}
