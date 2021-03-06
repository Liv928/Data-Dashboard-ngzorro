package com.mikedavis.CS4490.mapper;

import com.mikedavis.CS4490.model.AdditionalMetadata;
import com.mikedavis.CS4490.model.Event;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface EventMapper {
    @Results(value = {
            @Result(property = "id", column = "id"),
            @Result(property = "title", column = "title"),
            @Result(property = "description", column = "description"),
            @Result(property = "startDate", column = "start_date"),
            @Result(property = "endDate", column = "end_date"),
            @Result(property = "buildingId", column = "building_id"),
            @Result(property = "clusterId", column = "cluster_id"),
            @Result(property = "isGlobal", column = "is_global"),
            @Result(property = "category", column = "category")
    })
    @Insert("INSERT INTO Events(title, description, start_date, end_date, building_id, cluster_id, is_global, category) VALUES (#{title}, #{description}, #{startDate}, #{endDate}, #{buildingId}, #{clusterId}, #{isGlobal}, #{category})")
    void insertEvent(Event event);

    @Select("SELECT e.id, e.title, e.description, e.start_date as startDate, e.end_date as endDate, e.building_id as buildingId, e.cluster_id as clusterId, e.is_global as isGlobal, e.category as category FROM Events e LEFT JOIN Clusters c ON e.cluster_id = c.id WHERE (e.building_id = #{buildingId} AND (c.id IN (SELECT id FROM SensorClusters WHERE sensor_id = #{sensorId}) OR c.id IS NULL)) OR e.building_id = 'GLOBAL'")
    List<Event> getEvents(String buildingId, String sensorId);

    @Delete("DELETE FROM Events WHERE id = #{id}")
    void deleteEvent(int id);

    @Update("UPDATE Events SET title = #{title}, description = #{description}, start_date = #{startDate}, end_date = #{endDate}, building_id = #{buildingId}, cluster_id = #{clusterId}, is_global = #{isGlobal}, category = #{category} WHERE id = #{id}")
    void updateEvent(Event event);
}
