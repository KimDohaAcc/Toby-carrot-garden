package garden.carrot.toby.common.logback;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import club.minnced.discord.webhook.WebhookClient;
import club.minnced.discord.webhook.WebhookClientBuilder;

@Component
public class DiscordNotifier {
	private final int MAX_LENGTH = 2000;
	private final WebhookClient webhookClient;

	public DiscordNotifier(@Value("${discord.webhook}") String webhookUrl) {
		this.webhookClient = new WebhookClientBuilder(webhookUrl).build();
	}

	public void notify(String message) {
		int start = 0;
		int end = message.length();
		while (end > MAX_LENGTH && (start + MAX_LENGTH) < end) {
			webhookClient.send(message.substring(start, start + MAX_LENGTH));
			start += MAX_LENGTH;
		}
		webhookClient.send(message.substring(start, end));

	}
}