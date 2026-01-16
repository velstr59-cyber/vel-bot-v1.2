const { menu } = require("./menu")

module.exports = async (sock, msg) => {
 const text =
  msg.message.conversation ||
  msg.message.extendedTextMessage?.text

 if (!text) return

 if (text === ".menu") {
  await sock.sendMessage(msg.key.remoteJid, { text: menu() })
 }

 if (text.includes("chat.whatsapp.com")) {
  await sock.sendMessage(msg.key.remoteJid, {
   text: "❌ Link grup terdeteksi"
  })
 }
}
