package kr.ac.wku.estimation.socket;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@RequiredArgsConstructor
@Configuration
@EnableWebSocket   //이게 websocket 서버로서 동작하겠다는 어노테이션
public class WebSocketConfig implements WebSocketConfigurer {
    private final ClientSocketHandler clientSocketHandler;
    private final AISocketHandler aiSocketHandler;

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(clientSocketHandler, "/ws/client").setAllowedOrigins("*");
        registry.addHandler(aiSocketHandler, "/ws/ai").setAllowedOrigins("*");
    }
}