package kr.ac.wku.estimation.socket;

import com.fasterxml.jackson.databind.ObjectMapper;
import kr.ac.wku.estimation.dto.CompleteDTO;
import kr.ac.wku.estimation.entity.HFile;
import kr.ac.wku.estimation.service.FileService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.util.*;

@Slf4j
@RequiredArgsConstructor
@Component
public class ClientSocketHandler extends TextWebSocketHandler {

    private static final Map<UUID, WebSocketSession> clientSessionMap = new HashMap<>();
    private static final Map<WebSocketSession, UUID> clientUUIDMap = new HashMap<>();
    private static WebSocketSession aiSession;

    private final FileService fileService;

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws IOException {
        String[] payload = message.getPayload().split(":");
        switch(payload[0]){
            case "client", "CLIENT" -> {
                switch(payload[1]){
                    case "connect", "CONNECT" -> {
                        clientSessionMap.put(UUID.fromString(payload[2]), session);
                        clientUUIDMap.put(session, UUID.fromString(payload[2]));
                        session.sendMessage(new TextMessage("connected:"+new ObjectMapper().writeValueAsString(fileService.findByOwner(UUID.fromString(payload[2])))));
                    }
                }
            }
            case "ai", "AI" -> {
                switch(payload[1]){
                    case "connect", "CONNECT" -> {
                        aiSession = session;
                        session.sendMessage(new TextMessage("connected"));
                    }
                    case "comp", "COMP" -> {
                        ObjectMapper objectMapper = new ObjectMapper();
                        CompleteDTO dto = objectMapper.readValue(payload[2], CompleteDTO.class);
                        Optional<HFile> optionalFile = fileService.findByName(dto.getFileName());
                        optionalFile.ifPresent(file -> {
                            file.setTall(dto.getTall());
                            file.setWeight(dto.getWeight());
                            file.setFlag(true);
                            file.setReason(dto.getReason());
                        });
                    }
                }
            }
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) {
        UUID uuid = clientUUIDMap.get(session);
        clientSessionMap.remove(uuid);
        clientUUIDMap.remove(session);
    }

    public static void sendMessageToAI(String message) throws IOException {
        if(aiSession == null) return;
        aiSession.sendMessage(new TextMessage(message));
    }

    public static void sendMessage(UUID uuid, String message) throws IOException {
        WebSocketSession session = clientSessionMap.get(uuid);
        if(session != null) return;
        session.sendMessage(new TextMessage(message));
    }

}
