package com.sadesign.trelloclone.websocket;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;

@Controller
public class CardSocketController {
    @MessageMapping("/card")
    public void handleCardEvent() {
    }
}
