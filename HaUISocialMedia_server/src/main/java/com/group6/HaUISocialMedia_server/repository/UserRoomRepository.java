package com.group6.HaUISocialMedia_server.repository;

import com.group6.HaUISocialMedia_server.entity.Room;
import com.group6.HaUISocialMedia_server.entity.UserRoom;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface UserRoomRepository extends JpaRepository<UserRoom, UUID> {

    @Modifying
    @Transactional
    void deleteUserRoomsByRoom(Room room);

    // Pageable bắt buộc phải viết ở tham số cuối nếu muốn phân trang
    @Query("SELECT ur FROM UserRoom ur where ur.user.id = :userId and ur.room.name LIKE %:nameRoom%")
    List<UserRoom> findAllRoomByUser(@Param("userId") UUID userId, @Param("nameRoom") String nameRoom);

    @Query("select userRoom from UserRoom userRoom where userRoom.user.id = ?1 and userRoom.room.id = ?2")
    public UserRoom findByUserIdAndRoomId(UUID userId, UUID roomId);

}
