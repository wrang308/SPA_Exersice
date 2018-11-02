module.exports = function chat (id) {
  var sock = new WebSocket('ws://vhost3.lnu.se:20080/socket/')
  var currentDate
  var username
  /**
  * Function that tells that a connection to the socket is made.
  */
  sock.onopen = function () {
    console.log('connected')
  }
  /**
   * funtion that prints out a message when a message is received. Prints out a timestamp before the message and username
   * @param payload is the object received from the socket
   */
  sock.onmessage = function (payload) {
    var obj = JSON.parse(payload.data)
    if (obj.type === 'message') {
      var chatContainer = document.getElementById('chatBox' + id)
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
  }
  /**
   * Function that tells if we get disconnected fromm the socket
   */
  sock.onclose = function () {
    console.log('disconnected')
  }

  /**
   *  This function is used when we want to send a message to the chat with the socket. fetches data from the input div
   *  and makes it into a JSON object that get sent to the socket.
   * @param id is an argument so we know what window to fetch the data from
   */
  function sendMessage (id) {
    console.log(id)
    var message = '{' +
      '"type": "message",' +
      '"data" : "' + document.getElementById('input' + id).value + '" ,' +
      '"username": "' + username + '",' +
      '"channel": "my, not so secret, channel",' +
      '"key": "eDBE76deU7L0H9mEBgxUKVR0VCnq0XBd"' +
      '}'

    document.getElementById('input' + id).value = ''
    sock.send(message)
  }

  /**
   * SetUsername is a function that is used to set the username and then display the username for the user
   * @param id is an argument so we know what window to fetch the data from
   */
  function setUsername (id) {
    username = document.getElementById('usernameInput' + id).value
    document.getElementById('usernameInputDiv' + id).classList.add('displayNone')
    document.getElementById('chatBoxTitle' + id).innerHTML = 'Username: ' + username
  }

  /**
   * initBButtons is a function that adds the buttons to the chat window and add addEventListeners to these buttons. One
   * button for setting a username and one button for sending a message.
   * @param id is an argument so we know what window to fetch the data from
   */
  function initButtons (id) {
    var chatInput = document.getElementById('chatInput' + id)
    var sendMessageDiv = document.createElement('button')
    sendMessageDiv.id = 'sendMessage' + id
    sendMessageDiv.innerHTML = 'Send message'
    chatInput.appendChild(sendMessageDiv)
    sendMessageDiv.addEventListener('click', function () {
      sendMessage(id)
    })
    var usernameInputDiv = document.getElementById('usernameInputDiv' + id)
    var sendUserName = document.createElement('button')
    sendUserName.id = 'sendUserName' + id
    sendUserName.innerHTML = 'set username'
    usernameInputDiv.appendChild(sendUserName)
    sendUserName.addEventListener('click', function () {
      setUsername(id)
    })
  }

  /**
   * This function is used for the timestamp in the chat. It keeps the timestamp updated by updating the current date
   * every second.
   */
  function updateTime () {
    setInterval(function () {
      currentDate = new Date()
    }, 1000)
  }

  updateTime()

  /**
   * This is a function for the the timestamp to make it look more consistent. If a number is lower than 10 a zero is added
   * in front of it i.e 8 --> 09
   * @param i is the number that will be checked. If it is lower than 10 a zero will be added in front, if the number is
   * higher than 10 this function will just return the number.
   * @returns {*}
   */
  function addZero (i) {
    if (i < 10) {
      i = '0' + i
    }
    return i
  }
  return {
    sendMessage: sendMessage,
    setUsername: setUsername,
    initButtons: initButtons
  }
}