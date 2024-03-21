package garden.carrot.toby.common.exception.logback;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import club.minnced.discord.webhook.WebhookClient;
import club.minnced.discord.webhook.WebhookClientBuilder;

@Component
public class DiscordNotifier {

    private final WebhookClient webhookClient;

    public DiscordNotifier(@Value("$https://discordapp.com/api/webhooks/1216969482816196648/gwIdO95GG4cRHWpy6hvpBOYp-xtvpFYpN2yDSfyEF0T_wfTGGbv2c70WShsJbCnEx_TU") String webhookUrl) {

        this.webhookClient = new WebhookClientBuilder(webhookUrl).build();
    }

    public void notify(String message) {
        webhookClient.send(message);
    }
}