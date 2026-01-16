exports.menu = () => {
 let text = `*${global.botname}*\n\n`
 for (let i = 1; i <= 2000; i++) {
  text += `${global.prefix}cmd${i}\n`
 }
 return text
}
