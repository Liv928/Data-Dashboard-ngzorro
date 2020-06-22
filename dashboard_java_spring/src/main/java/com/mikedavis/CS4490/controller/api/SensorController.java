package com.mikedavis.CS4490.controller.api;

import com.mikedavis.CS4490.model.AdditionalMetadata;
import com.mikedavis.CS4490.model.Sensor;
import com.mikedavis.CS4490.service.sql.SensorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/sensors")
public class SensorController {
    @Autowired
    private SensorService sensorService;

    @RequestMapping("/{id}")
    public Sensor getSensor(@PathVariable String id){
        return sensorService.getSensor(id);
    }

    @RequestMapping("/building/{buildingId}")
    public List<Sensor> getSensorsByBuilding(@PathVariable String buildingId){
        return sensorService.getSensorsByBuilding(buildingId);
    }

    @RequestMapping(path = "/sensor/addmetadata", method = RequestMethod.POST)
    public ResponseEntity<String> additionalMetadata(@RequestBody AdditionalMetadata additionalMetadata){
        sensorService.insertAdditionalMetadata(additionalMetadata);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @RequestMapping(path = "/sensor/deletemetadata", method = RequestMethod.DELETE)
    public void deleteMeta(@RequestParam String title){

        sensorService.deleteAdditionalMetadata(title);
    }

    @RequestMapping(path = "/sensor/updatemetadata", method = RequestMethod.POST)
    public void updateMeta(@RequestBody AdditionalMetadata additionalMetadata){
        sensorService.updateAdditionalMetadata(additionalMetadata);
    }
}
