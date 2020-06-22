package com.mikedavis.CS4490.service.sql;

import com.mikedavis.CS4490.model.Event;

import java.util.List;

public interface EventService {
    public List<Event> getEvents(String buildingId, String sensorId);

    public void addEvent(Event event);

    public void deleteEvent(String eventTitle);

    public void updateEvent(Event event);
}
