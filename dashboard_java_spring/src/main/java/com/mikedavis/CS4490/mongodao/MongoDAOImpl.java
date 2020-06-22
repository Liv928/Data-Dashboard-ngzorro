package com.mikedavis.CS4490.mongodao;

import com.mikedavis.CS4490.model.MongoData;
import com.mikedavis.CS4490.model.SensorData;
import com.mikedavis.CS4490.model.SensorMeta;
import com.mongodb.DBObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class MongoDAOImpl implements MongoDAO{

    @Autowired
    MongoTemplate mongoTemplate;

    @Override
    public SensorMeta findSensorMetaById(String id) {
        return mongoTemplate.findOne(new Query(Criteria.where("_id").is(id)), SensorMeta.class, "3357_meta");
    }

    @Override
    public List<SensorMeta> findSensorMetasById(String id){
        return mongoTemplate.find(new Query(Criteria.where("name").regex(id)), SensorMeta.class, "3357_meta");
    }

    //-----------------------------------------------------------------------------------------------------------------------

    @Override
    public List<DBObject> getMongoDataByID(String id, String date){
        return  mongoTemplate.find(new Query(Criteria.where("_id").is(id + "-" + date)), DBObject.class, "3357");
    }

    @Override
    public List<DBObject> findMongoDataById(String id){
        return mongoTemplate.find(new Query(Criteria.where("_id").regex(id)), DBObject.class, "3357");
    }

}
