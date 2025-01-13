import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

interface MessagePayload {
  roomId: string;
  text: string;
  username: string;
  profile: string;
}

export const connectSocket = (roomId: string): Socket | null => {
  if (!socket || !socket.connected) { //소켓 연결이 유지되고 있는지 확인
    console.log("Initializing new socket connection.");
    socket = io("http://whatcpu.p-e.kr", { //서버쪽과 연결
      transports: ["websocket"],
      withCredentials: true,
      reconnection: true, // 재연결 허용
      reconnectionAttempts: 5, // 최대 시도 횟수
      reconnectionDelay: 2000 // 재연결 간 간격(ms)
    });

  } else {
    console.log("Socket already connected.");
  }


  socket.emit("joinRoom", roomId); // 방에 참가
  return socket;
};

export const disconnectSocket = (roomId: string): void => {
  if (socket && socket.connected) {
    console.log("Disconnecting socket.");
    socket.emit("leaveRoom", roomId); // 떠난 방 정보 넘김
    socket.disconnect();
    socket = null; // 소켓 초기화
  }
};

// 서버로 메시지 전송
export const sendMessage = (
  roomId: string,
  text: string,
  userInfo: { username: string; profile: string },
): void => {
  if (socket) {
    const payload: MessagePayload = { roomId, text, ...userInfo };
    socket.emit("message", payload);
  }
};

// 메시지 수신 핸들러 등록
export const onMessage = (callback: (msg: MessagePayload) => void): void => {
  if (socket) {
    console.log("Registering message listener.");
    // socket.off("message"); // 기존 리스너 제거
    socket.removeAllListeners("message"); // 모든 기존 리스너 제거
    socket.on("message", (msg: MessagePayload) => callback(msg));
  } else {
    console.warn("Socket is not connected. Cannot register listener.");
  }
};
