const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

client.on("ready", () => {
  console.log("Bot ready: " + client.user.tag);
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  
  const content = message.content.toLowerCase();

  // Commandes VIP
  if (content === "!vip" || content === "!buy" || content === "!tip") {
    message.reply(`🔥 Soutiens-moi sur Buy Me a Coffee!\n\n☕ https://buymeacoffee.com/nathanlcz`);
  }
  
  // Commandes liens
  if (content === "!links" || content === "!liens") {
    message.reply(`📱 Mes liens:\n\n🔥 https://onlyfans.com/...\n💜 https://fansly.com/...\n🐦 https://twitter.com/...`);
  }
  
  // Commande stats
  if (content === "!stats") {
    message.reply(`📊 Dashboard: https://ton-site.com/dashboard`);
  }
});

client.login(process.env.DISCORD_TOKEN);

console.log("🤖 MonetCord Bot starting...");