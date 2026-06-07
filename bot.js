const { Client, GatewayIntentBits } = require("discord.js");
const dotenv = require("dotenv");
const http = require("http");

dotenv.config();

http
  .createServer((req, res) => {
    res.write("Bot is alive");
    res.end();
  })
  .listen(process.env.PORT || 3001);

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const PREFIX = "!";

client.once("ready", () => {
  console.log("Bot EH prêt 🚒🚓🚑");
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  // Commande recrutement
  if (message.content === "!recrutement") {
    message.reply(
      "📋 **Recrutement EH ouvert !**\n\n" +
        "Tape !pompier / !police / !samu pour commencer ta candidature 🚒🚓🚑",
    );
  }

  // Pompier
  if (message.content === "!pompier") {
    message.reply(
      "🚒 **Candidature Pompier**\n\n" +
        "Réponds ici :\n" +
        "1️⃣ Pseudo Roblox ?\n" +
        "2️⃣ Pourquoi pompier ?\n" +
        "3️⃣ Expérience RP ?\n" +
        "4️⃣ Es-tu actif ?",
    );
  }

  // Police
  if (message.content === "!police") {
    message.reply(
      "🚓 **Candidature Police**\n\n" +
        "1️⃣ Pseudo Roblox ?\n" +
        "2️⃣ Pourquoi police ?\n" +
        "3️⃣ Comment gérer une poursuite RP ?\n" +
        "4️⃣ Es-tu sérieux en RP ?",
    );
  }

  // SAMU
  if (message.content === "!samu") {
    message.reply(
      "🚑 **Candidature SAMU**\n\n" +
        "1️⃣ Pseudo Roblox ?\n" +
        "2️⃣ Pourquoi SAMU ?\n" +
        "3️⃣ Expérience médicale RP ?\n" +
        "4️⃣ Comment réagir sur un accident ?",
    );
  }

  if (message.content.startsWith("!accept")) {
    const args = message.content.split(" ");

    const member = message.mentions.members.first();
    const roleName = args[2];

    if (!member) return message.reply("Mentionne un utilisateur 👀");
    if (!roleName) return message.reply("Précise un rôle");

    const role = message.guild.roles.cache.find(
      (r) => r.name.toLowerCase() === roleName.toLowerCase(),
    );

    if (!role) return message.reply("❌ Rôle introuvable");

    try {
      await member.roles.add(role);
      message.reply(`✔️ ${member.user.username} accepté en ${roleName}`);
    } catch (err) {
      console.error(err);
      message.reply("❌ Permissions insuffisantes ou hiérarchie des rôles");
    }
  }
});

client.on("error", console.error);

console.log("Token chargé :", !!process.env.TOKEN_DISCORD);

client.login(process.env.TOKEN_DISCORD);
