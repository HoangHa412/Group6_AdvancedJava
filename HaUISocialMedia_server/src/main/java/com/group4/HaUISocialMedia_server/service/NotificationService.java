package com.group4.HaUISocialMedia_server.service;


import com.group4.HaUISocialMedia_server.dto.NotificationDto;
import com.group4.HaUISocialMedia_server.dto.SearchObject;

import java.util.Set;
import java.util.UUID;

public interface NotificationService {

    public Set<NotificationDto> getAllNotifications();

    public NotificationDto save(NotificationDto notificationDto);

    public NotificationDto update(NotificationDto notificationDto);

    public Set<NotificationDto> pagingNotification(SearchObject searchObject);
}
