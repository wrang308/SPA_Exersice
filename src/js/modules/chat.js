module.exports = function chat () {
  var sock = new WebSocket('ws://vhost3.lnu.se:20080/socket/')
  var currentDate
  var username

  var title = document.getElementById('chatBoxTitle')

  sock.onopen = function () {
    console.log('connected')
  }
  sock.onmessage = function (payload) {
    var obj = JSON.parse(payload.data)
    if (obj.type === 'message') {
      var chatContainer = document.getElementById('chatBox')
      var elem = document.createElement('div')
      currentDate.getDate() // used for timestamp in the chat
      var h = addZero(currentDate.getHours())
      var m = addZero(currentDate.getMinutes())
      var s = addZero(currentDate.getSeconds())
      elem.innerHTML = '[' + h + ':' + m + ':' + s + '] ' + obj.username + ': ' + obj.data
      chatContainer.appendChild(elem)
      chatContainer.scrollBy(0, chatContainer.scrollHeight)
      console.log(obj.data)
    }

    console.log(payload.data)
  }

  sock.onclose = function (p1) {
    console.log('disconnected')
  }

  function sendMessage () {
    var message = '{' +
      '"type": "message",' +
      '"data" : "' + document.getElementById('input').value + '" ,' +
      '"username": "' + username + '",' +
      '"channel": "my, not so secret, channel",' +
      '"key": "eDBE76deU7L0H9mEBgxUKVR0VCnq0XBd"' +
      '}'

    document.getElementById('input').value = ''
    sock.send(message)
  }

  function setUsername () {
    username = document.getElementById('usernameInput').value
    document.getElementById('usernameInputDiv').classList.add('displayNone')
    document.getElementById('chatBoxTitle').innerHTML = 'Username: ' + username
  }

  function updateTime () {
    setInterval(function () {
      currentDate = new Date()
    }, 1000)
  }

  updateTime()

  function addZero (i) {
    if (i < 10) {
      i = '0' + i
    }
    return i
  }
  return {
    sendMessage: sendMessage,
    setUsername: setUsername
  }
}