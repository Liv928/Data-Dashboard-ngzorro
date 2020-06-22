package com.mikedavis.CS4490.controller.api;

import com.mikedavis.CS4490.model.Building;
import com.mikedavis.CS4490.model.Cluster;
import com.mikedavis.CS4490.service.sql.BuildingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/buildings")
public class BuildingController {
    @Autowired
    private BuildingService buildingService;

    @RequestMapping("")
    public List<Building> getBuildings(){
        return buildingService.getBuildings();
    }

    @RequestMapping("/{id}")
    public Building getBuilding(@PathVariable String id){
        return buildingService.getBuilding(id);
    }

    @RequestMapping("/clusters/{id}")
    public List<Cluster> getClusters(@PathVariable String id) { return buildingService.getClusters(id); }

}
