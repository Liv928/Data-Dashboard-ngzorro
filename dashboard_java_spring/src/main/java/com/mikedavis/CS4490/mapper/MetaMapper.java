package com.mikedavis.CS4490.mapper;

import com.mikedavis.CS4490.model.AdditionalMetadata;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface MetaMapper {
    @Results(value = {
            @Result(property = "id", column = "id"),
            @Result(property = "title", column = "title"),
            @Result(property = "description", column = "description"),
            @Result(property = "sensorId", column = "sensor_id")
    })
    @Insert("INSERT INTO AdditionalMetadata(title, description, sensor_id) VALUES (#{title}, #{description}, #{sensorId})")
    void insertAdditionalMetadata(AdditionalMetadata metadata);

    @Select("SELECT * FROM AdditionalMetadata WHERE sensor_id = #{sensorId}")
    List<AdditionalMetadata> getAdditionalMetadata(String sensorId);

    @Delete("DELETE FROM AdditionalMetadata WHERE title = #{metaTitle}")
    void deleteMeta(String metaTitle);

    @Update("UPDATE AdditionalMetadata SET title = #{title}, description = #{description} WHERE id = #{id}")
    void updateMeta(AdditionalMetadata metadata);


}
