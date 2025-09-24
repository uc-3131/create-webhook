import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { channelId, name } = req.body || {};

  if (!channelId || !name) {
    return res.status(400).json({ message: "channelId ve name gerekli" });
  }

  try {
    const response = await axios.post(
      `https://discord.com/api/v10/channels/${channelId}/webhooks`,
      { name },
      {
        headers: {
          Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(error.response?.status || 500).json({
      message: "Discord API hatası",
      error: error.response?.data || error.message,
    });
  }
}
