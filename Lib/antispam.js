let spam = {}
exports.check = (id) => {
 if (spam[id]) return true
 spam[id] = true
 setTimeout(() => delete spam[id], 3000)
 return false
}
