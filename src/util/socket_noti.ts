import { io } from "socket.io-client";

// const socket = io("http://localhost:4000"); // WebSocket 서버 URL 확인
const socket = io("http://whatcpu.p-e.kr", { //서버쪽과 연결
  transports: ["websocket"],
  withCredentials: true,
  reconnection: true, // 재연결 허용
  reconnectionAttempts: 5, // 최대 시도 횟수
  reconnectionDelay: 2000 // 재연결 간 간격(ms)
});


socket.on("new_notification", (data) => {
  console.log("New notification received:", data);
  // 알림을 처리하는 로직 추가
});

export default socket;
