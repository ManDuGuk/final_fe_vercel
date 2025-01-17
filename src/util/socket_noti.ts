import { io } from "socket.io-client";

// const socket = io("http://localhost:4000"); // WebSocket 서버 URL 확인
// corse 처리및 경로 수정
const socket = io("https://whatcpu.p-e.kr", { //서버쪽과 연결
  transports: ["websocket"],
  withCredentials: true,
  reconnection: true, // 재연결 허용
  reconnectionAttempts: 5, // 최대 시도 횟수
  reconnectionDelay: 2000 // 재연결 간 간격(ms)
});

// 연결 성공 이벤트
socket.on("connect", () => {
  console.log("Connected to the server socket-noti:", socket.id);
});

// 연결 에러 이벤트 (오류 이유 출력)
socket.on("connect_error", (err: any) => {
  console.error("Connection error socket-noti:", err); // 에러 메시지 출력
  console.error("Detailed error object socket-noti:", err); // 에러 전체 객체 출력
});

socket.on("new_notification", (data: any) => {
  console.log("New notification received:", data);
  // 알림을 처리하는 로직 추가
});

export default socket;
