package com.group4.HaUISocialMedia_server.rest;

import com.group4.HaUISocialMedia_server.dto.NotificationDto;
import com.group4.HaUISocialMedia_server.dto.SearchObject;
import com.group4.HaUISocialMedia_server.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/api/notification")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;


    @PostMapping("/paging")
    public ResponseEntity<Set<NotificationDto>> pagingNotification(@RequestBody SearchObject searchObject) {
//        Set<NotificationDto> res = notificationService.getAnyNotification(searchObject);

        Set<NotificationDto> res = notificationService.pagingNotification(searchObject);
        if (res == null)
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>(res, HttpStatus.OK);
    }
}
