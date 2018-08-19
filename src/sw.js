self.addEventListener('message', function (e) {
  console.log(e)
  console.log(self)
  console.log(self.clients.matchAll())
})
