const {
 default: makeWASocket,
 useMultiFileAuthState
} = require("@whiskeysockets/baileys")
const P = require("pino")
const fs = require("fs")
require("./config")

async function start() {
 const { state, saveCreds } = await useMultiFileAuthState("./session")

 const sock = makeWASocket({
  auth: state,
  logger: P({ level: "silent" }),
  printQRInTerminal: false
 })

 if (!fs.existsSync("./session/creds.json")) {
  const code = await sock.requestPairingCode(global.owner[0])
  console.log("PAIRING CODE:", code)
 }

 sock.ev.on("creds.update", saveCreds)

 sock.ev.on("messages.upsert", async ({ messages }) => {
  const msg = messages[0]
  if (!msg.message) return
  require("./lib/handler")(sock, msg)
 })
}

start()
