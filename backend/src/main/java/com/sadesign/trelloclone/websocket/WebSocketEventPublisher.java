package com.sadesign.trelloclone.websocket;

import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.boot.autoconfigure.condition.ConditionalOnBean;
import org.springframework.stereotype.Component;

@Component
@ConditionalOnBean(SimpMessagingTemplate.class)
public class WebSocketEventPublisher {
    private final SimpMessagingTemplate messagingTemplate;

    public WebSocketEventPublisher(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    public void publish(String destination, Object payload) {
        messagingTemplate.convertAndSend(destination, payload);
    }
}
