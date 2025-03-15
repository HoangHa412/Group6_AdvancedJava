package com.group4.HaUISocialMedia_server.config;

import com.group4.HaUISocialMedia_server.dto.MessageTypeDto;
import com.group4.HaUISocialMedia_server.dto.NotificationTypeDto;
import com.group4.HaUISocialMedia_server.dto.RoomTypeDto;
import com.group4.HaUISocialMedia_server.entity.*;
import com.group4.HaUISocialMedia_server.repository.*;
import com.group4.HaUISocialMedia_server.service.MessageTypeService;
import com.group4.HaUISocialMedia_server.service.NotificationTypeService;
import com.group4.HaUISocialMedia_server.service.RoomTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class SetupData implements ApplicationRunner {

    @Override
    public void run(ApplicationArguments args) throws Exception {
        setupData();

        System.out.println("Application started with diayti's initial config!");
    }

    private void setupData() {
        initializeBaseUser();
        initializeRoomType();
        initializeMessageType();
        initializeNotificationType();
    }

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private void initializeBaseUser() {
        //initialize user admin
        User admin = userRepository.findByUsername("admin");
        if (admin == null) {
            admin = new User();
            admin.setRole(Role.ADMIN.name());
            admin.setUsername("admin");
            admin.setPassword(passwordEncoder.encode("admin"));

            userRepository.save(admin);
        }
//        List<User> users = userRepository.findAllByRole("USER");
//        for(User user:users){
//            user.setDisable(false);
//            userRepository.save(user);
//        }
    }

    @Autowired
    private RoomTypeService roomTypeService;

    private void initializeRoomType() {
        RoomType privates = roomTypeService.getRoomTypeEntityByName("private");
        if (privates == null) {
            RoomTypeDto dto = new RoomTypeDto();
            dto.setCode("001");
            dto.setName("private");
            dto.setDescription("private room is for 2 people chatting");
            roomTypeService.createRoomType(dto);
        }

        RoomType pub = roomTypeService.getRoomTypeEntityByName("public");
        if (pub == null) {
            RoomTypeDto dto = new RoomTypeDto();
            dto.setCode("002");
            dto.setName("public");
            dto.setDescription("public room is for multiple people chatting");
            roomTypeService.createRoomType(dto);
        }

        RoomType group = roomTypeService.getRoomTypeEntityByName("group");
        if (group == null) {
            RoomTypeDto dto = new RoomTypeDto();
            dto.setCode("003");
            dto.setName("group");
            dto.setDescription("is private room chat for at least 3 people");
            roomTypeService.createRoomType(dto);
        }
    }
    @Autowired
    private MessageTypeService messageTypeService;

    private void initializeMessageType() {
        MessageType joined = messageTypeService.getMessageTypeEntityByName("join");
        if (joined == null) {
            MessageTypeDto dto = new MessageTypeDto();
            dto.setCode("001");
            dto.setName("join");
            dto.setDescription("new user joined conversation");
            messageTypeService.createMessageType(dto);
        }

        MessageType left = messageTypeService.getMessageTypeEntityByName("left");
        if (left == null) {
            MessageTypeDto dto = new MessageTypeDto();
            dto.setCode("002");
            dto.setName("left");
            dto.setDescription("an user had left the conversation");
            messageTypeService.createMessageType(dto);
        }

        MessageType chat = messageTypeService.getMessageTypeEntityByName("chat");
        if (chat == null) {
            MessageTypeDto dto = new MessageTypeDto();
            dto.setCode("003");
            dto.setName("chat");
            dto.setDescription("a common message in the conversation");
            messageTypeService.createMessageType(dto);
        }

        MessageType notification = messageTypeService.getMessageTypeEntityByName("notification");
        if (notification == null) {
            MessageTypeDto dto = new MessageTypeDto();
            dto.setCode("004");
            dto.setName("notification");
            dto.setDescription("is a notification");
            messageTypeService.createMessageType(dto);
        }

        MessageType recall = messageTypeService.getMessageTypeEntityByName("recall");
        if (recall == null) {
            MessageTypeDto dto = new MessageTypeDto();
            dto.setCode("006");
            dto.setName("recall");
            dto.setDescription("a message which is recalled by creator");
            messageTypeService.createMessageType(dto);
        }

        MessageType sticker = messageTypeService.getMessageTypeEntityByName("sticker");
        if (sticker == null) {
            MessageTypeDto dto = new MessageTypeDto();
            dto.setCode("007");
            dto.setName("sticker");
            dto.setDescription("sticker in conversation");
            messageTypeService.createMessageType(dto);
        }
    }

    @Autowired
    private NotificationTypeService notificationTypeService;

    private void initializeNotificationType() {
//        NotificationType tym1 = notificationTypeService.getNotificationTypeEntityByName("Liked");
//        if (tym1 == null) {
//            NotificationTypeDto tym = new NotificationTypeDto();
//            tym.setCode("001");
//            tym.setName("Liked");
//            tym.setDescription("a person liked your post");
//            notificationTypeService.save(tym);
//        }
//
//        NotificationType accept1 = notificationTypeService.getNotificationTypeEntityByName("Accepted");
//        if (accept1 == null) {
//            NotificationTypeDto accept = new NotificationTypeDto();
//            accept.setCode("002");
//            accept.setName("Accepted");
//            accept.setDescription("a person accepted your request friend");
//            notificationTypeService.save(accept);
//        }
//
//        NotificationType request1 = notificationTypeService.getNotificationTypeEntityByName("Requested");
//        if (request1 == null) {
//            NotificationTypeDto request = new NotificationTypeDto();
//            request.setCode("003");
//            request.setName("Requested");
//            request.setDescription("a person requested add friend with you");
//            notificationTypeService.save(request);
//        }

        NotificationType post = notificationTypeService.getNotificationTypeEntityByName("Post");
        if (post == null) {
            NotificationTypeDto postDto = new NotificationTypeDto();
            postDto.setCode("001");
            postDto.setName("Post");
            postDto.setDescription("Tym, Comment, Reply Comment");
            notificationTypeService.save(postDto);
        }

        NotificationType friend = notificationTypeService.getNotificationTypeEntityByName("Friend");
        if (friend == null) {
            NotificationTypeDto friendDto = new NotificationTypeDto();
            friendDto.setCode("002");
            friendDto.setName("Friend");
            friendDto.setDescription("add friend, accept friend");
            notificationTypeService.save(friendDto);
        }

        NotificationType group = notificationTypeService.getNotificationTypeEntityByName("Group");
        if (group == null) {
            NotificationTypeDto groupDto = new NotificationTypeDto();
            groupDto.setCode("003");
            groupDto.setName("Group");
            groupDto.setDescription("approve request, update background group");
            notificationTypeService.save(groupDto);
        }

        NotificationType chat = notificationTypeService.getNotificationTypeEntityByName("Chat");
        if (chat == null) {
            NotificationTypeDto chatDto = new NotificationTypeDto();
            chatDto.setCode("004");
            chatDto.setName("Chat");
            chatDto.setDescription("alert when a message is sent to a conversation that user joined in");
            notificationTypeService.save(chatDto);
        }
    }


}