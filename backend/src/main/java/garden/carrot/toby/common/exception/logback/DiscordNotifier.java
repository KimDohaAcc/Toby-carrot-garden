package garden.carrot.toby.common.exception.logback;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import club.minnced.discord.webhook.WebhookClient;
import club.minnced.discord.webhook.WebhookClientBuilder;

@Component
public class DiscordNotifier {
	private final WebhookClient webhookClient;

	public DiscordNotifier(@Value("${discord.webhook}") String webhookUrl) {
		this.webhookClient = new WebhookClientBuilder(webhookUrl).build();
	}

	public void notify(String message) {
		webhookClient.send(message);
	}
}