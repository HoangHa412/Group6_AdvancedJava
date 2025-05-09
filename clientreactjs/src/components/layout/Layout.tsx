import { memo, useEffect } from "react";
import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";
import { observer } from "mobx-react";
import { useStore } from "@/stores";
import SocketService from "@/services/SocketService";

function Layout() {
  const { authStore, chatStore } = useStore();
  const { getLoggedInUser } = authStore;
  const { onReceiveRoomMessage } = chatStore;

  useEffect(function () {
    async function initializeSocket() {
      const currentUser = getLoggedInUser();

      if (
        currentUser &&
        currentUser?.id &&
        currentUser?.role === "USER" &&
        !SocketService.stompClient
      ) {
        SocketService.initializeSocket(onReceiveRoomMessage);
      }
    }

    if (!SocketService.stompClient) initializeSocket();
  }, []);

  return (
    <>
      <NavBar />
      <main className="relative">
        <Outlet />
      </main>
    </>
  );
}

export default memo(observer(Layout));
