package com.kirey.wscm.websocket;

import java.util.concurrent.atomic.AtomicInteger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@EnableScheduling
public class CounterService {

    private AtomicInteger counter = new AtomicInteger(0);

    @Autowired
    CounterHandler counterHandler;

//    @Scheduled(fixedDelay = 5000)
    public void sendCounterUpdate() {
        counterHandler.counterIncrementedCallback(counter.incrementAndGet());
    }

    Integer getValue() {
        return counter.get();
    }
}
