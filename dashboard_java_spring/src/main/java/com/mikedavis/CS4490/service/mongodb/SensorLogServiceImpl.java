package com.mikedavis.CS4490.service.mongodb;

import com.mikedavis.CS4490.model.*;
import com.mikedavis.CS4490.mongodao.MongoDAO;
import com.mikedavis.CS4490.service.sql.EventService;
import com.mikedavis.CS4490.service.sql.SensorService;
import com.mongodb.DBObject;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
public class SensorLogServiceImpl implements SensorLogService {

    @Autowired
    MongoTemplate mongoTemplate;

    @Autowired
    SensorService sensorService;

    @Autowired
    EventService eventService;

    @Autowired
    MongoDAO mongoDAO;

    //return a JSONaArray which looks like [ ["00:00:00", data point], [], ...]
    // for the test data, the list should contain only one JSONArray
    public JSONArray getSensorJSONDataByID(String id, String date){
        //return a list of JSON object {}
        List<DBObject> sensorLogDoc = mongoTemplate.find(new Query(Criteria.where("_id").is(id + "-" + date)), DBObject.class, "3357");
        System.out.println("getSensorJSON-count: " + sensorLogDoc.size());

        JSONArray data = new JSONArray();

        //for all the documents found in mongodb
        for(DBObject object : sensorLogDoc){

            //put all the data point into an array
            for(String key : object.keySet()){
                if(key.matches("^\\d{2}:\\d{2}:\\d{2}$")){
                    JSONArray dataPoint = new JSONArray();
                    dataPoint.put(key);//"00:00:00"
                    dataPoint.put(object.get(key));
                    data.put(dataPoint);
                }
            }
        }
        return data;
    }

    // add JSONData ["timestamp", "data point"] to an existed jsonArray
    public void addJSONDataByID(String id, String date, List<JSONArray> jsonArray){
        List<DBObject> sensorLogDoc = mongoTemplate.find(new Query(Criteria.where("_id").is(id + "628-" + date)), DBObject.class, "3357");

        SimpleDateFormat simpleDateFormat = new  SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        simpleDateFormat.setTimeZone(TimeZone.getTimeZone("UTC"));
        Long timeStamp;

        for(DBObject object : sensorLogDoc){
            for(String key : object.keySet()){
                if(key.matches("^\\d{2}:\\d{2}:\\d{2}$")){

                    JSONArray dataPoint = new JSONArray();
                    String start = date + " " + key;
                    try{
                        timeStamp = simpleDateFormat.parse(start).getTime();
                        dataPoint.put(timeStamp);
                        dataPoint.put(object.get(key));
                        jsonArray.add(dataPoint);
                    } catch(ParseException e){
                        e.printStackTrace();
                    }
                }
            }
        }
    }

    // return a sensorLog which contains a Map <"temperature", "data point">
    public SensorLog getSensorLogByID(String id, String date){
        List<DBObject> sensorLogDoc = mongoTemplate.find(new Query(Criteria.where("_id").is(id + "-" + date)), DBObject.class, "3357");

        SensorLog sensorLog = new SensorLog();
        sensorLog.setId(id);
        sensorLog.setDate(date);
        Map<String, String> trendLogData = new LinkedHashMap<String, String>();

        for(DBObject object : sensorLogDoc){
            for(String key : object.keySet()){
                if(key.matches("^\\d{2}:\\d{2}:\\d{2}$")){
                    trendLogData.put(key, object.get(key).toString());
                }
            }
        }
        sensorLog.setData(trendLogData);
        return sensorLog;
    }

    // return a sensorData for a specific date
    public SensorData getSensorDataByID(String id, String date){
        SensorData sensorData = new SensorData();
        // a single data point
        JSONArray data = getSensorJSONDataByID(id, date);
        sensorData.setData(data.toString());

        sensorData.setSensor(sensorService.getSensor(id));
        sensorData.setSensorMeta(getSensorMetaDataByID(id));
        return sensorData;
    }

    //user specify start and end
    //return a sensorData contains a range of data from mongo
    public SensorData getSensorDataByDateRange(String id, String start, String end){
        SensorData sensorData = new SensorData();
        sensorData.setSensor(sensorService.getSensor(id));
        sensorData.setSensorMeta(getSensorMetaDataByID(id));
        // Date
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate startDate = LocalDate.parse(start, formatter);
        LocalDate endDate = LocalDate.parse(end, formatter);

        //find the data in the date range and add them to a list which contains JSONArray
        List<JSONArray> data = new ArrayList<>();
        for (LocalDate date = startDate; date.isBefore(endDate); date = date.plusDays(1))
        {
            //fetch data from MongoDB through the addJSON function
            addJSONDataByID(id, date.toString(), data);
        }

        sensorData.setData(data.toString());

        return sensorData;
    }

    //return a sensorData (sensor, data from mongo, sensorMeta, AddiMetadata list, events list)
    //get range of mongo data according to metadata
    public SensorData getAllSensorDataByID(String id){
        SensorData sensorData = new SensorData();
        sensorData.setSensor(sensorService.getSensor(id));
        sensorData.setAdditionalMetadata(sensorService.getAdditionalMetadata(id)); //from sql server
        sensorData.setSensorMeta(getSensorMetaDataByID(id));                       //from mongodb

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        String start = sensorData.getSensorMeta().getFirst();
        System.out.println("first: "+start);
        String end = sensorData.getSensorMeta().getLast();
        System.out.println("last:" + end);

        LocalDate startDate = LocalDate.parse(start, formatter);
        LocalDate endDate = LocalDate.parse(end, formatter);

        List<JSONArray> data = new ArrayList<>();
        for (LocalDate date = startDate; date.isBefore(endDate); date = date.plusDays(1))
        {
            addJSONDataByID(id, date.toString(), data);
        }
        System.out.println("all data size: " + data.size());

        Collections.sort(data, new Comparator<JSONArray>(){
            @Override
            public int compare(JSONArray jsonArrayA, JSONArray jsonArrayB){
                int compare = 0;
                try{
                    long keyA = jsonArrayA.getLong(0);
                    long keyB = jsonArrayB.getLong(0);
                    compare = Long.compare(keyA, keyB);
                } catch(Exception e){
                    e.printStackTrace();
                }
                return compare;
            }
        });
        sensorData.setData(data.toString());

        List<Event> events = eventService.getEvents(sensorService.getSensor(id).getBuildingId(), id);
        sensorData.setEvents(events);
        return sensorData;
    }

    //return a single sensorMeta
    //invoked by previous function
    public SensorMeta getSensorMetaDataByID(String id) {
        SensorMeta sensorMeta = mongoDAO.findSensorMetaById(id);
        return sensorMeta;
    }

    //return a list of sensorMeta
    //currently not invoked by any function 2020-6-22
    public List<SensorMeta> findSensorMetasById(String id) {
        List<SensorMeta> sensorMetas = mongoDAO.findSensorMetasById(id);
        return sensorMetas;
    }
}
