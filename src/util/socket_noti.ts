import { io } from "socket.io-client";

// const socket = io("http://localhost:4000"); // WebSocket 서버 URL 확인
// corse 처리및 경로 수정

// WebSocket 클라이언트 초기화
// const socket = io("https://whatcpu.p-e.kr", { // 서버 URL 설정
// const socket = io("http://localhost:4000", { // 서버 URL 설정
const socket = io("wss://43.201.240.255:4000", { // 서버 URL 설정
  path: "/socket.io/", // 서버에서 지정한 path와 동일하게 설정
  transports: ["websocket", "polling"],//WebSocket 연결 실패 시 fallback을 허용
  withCredentials: true, // 쿠키 전송 허용 (서버에서 credentials: true 설정 필요)
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
