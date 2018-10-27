console.log('Hello World!')
var idCounter = 0

// Make the DIV element draggable:

function dragElement (elmnt) {
  var pos1 = 0; let pos2 = 0; let pos3 = 0; let pos4 = 0
  if (document.getElementById(elmnt.id + 'header')) {
    // if present, the header is where you move the DIV from:
    console.log(elmnt.id + 'header')
    document.getElementById(elmnt.id + 'header').onmousedown = dragMouseDown
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown
  }

  function dragMouseDown (e) {
    e = e || window.event
    e.preventDefault()
    // get the mouse cursor position at startup:
    pos3 = e.clientX
    pos4 = e.clientY
    document.onmouseup = closeDragElement
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag
  }

  function elementDrag (e) {
    e = e || window.event
    e.preventDefault()
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX
    pos2 = pos4 - e.clientY
    pos3 = e.clientX
    pos4 = e.clientY
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + 'px'
    elmnt.style.left = (elmnt.offsetLeft - pos1) + 'px'
  }

  function closeDragElement () {
    // stop moving when mouse button is released:
    document.onmouseup = null
    document.onmousemove = null
  }
}

function createWindow (type) {
  var container = document.getElementById('container')
  var window = document.createElement('div')
  var drag = document.createElement('div')
  drag.id = 'id' + idCounter + 'header'
  drag.classList.add('drag')
  window.id = 'id' + idCounter
  window.classList.add('dragContainer')
  drag.innerHTML = 'Hello guys!'
  window.append(drag)
  if (type === 'mem') {
    var mem = document.createElement('div')
    mem.id = 'memoryContainer'
    window.appendChild(mem)
    container.appendChild(window)
    setInitialButtons()
  } else if (type === 'chat') {
    var usernameInputDiv = document.createElement('div')
    usernameInputDiv.id = 'usernameInputDiv'
    var usernameInput = document.createElement('input')
    usernameInput.id = 'usernameInput'
    usernameInput.type = 'text'
    usernameInputDiv.appendChild(usernameInput)
    var sendUserName = document.createElement('button')
    sendUserName.id = 'sendUserName'
    sendUserName.innerHTML = 'set username'
    usernameInputDiv.appendChild(sendUserName)
    window.appendChild(usernameInputDiv)
    var chatBoxTitle = document.createElement('div')
    chatBoxTitle.id = 'chatBoxTitle'
    window.appendChild(chatBoxTitle)
    var chatBox = document.createElement('div')
    chatBox.id = 'chatBox'
    window.appendChild(chatBox)
    var chatInput = document.createElement('div')
    chatInput.id = 'chatInput'
    var input = document.createElement('input')
    input.id = 'input'
    input.type = 'text'
    chatInput.appendChild(input)
    var sendMessageDiv = document.createElement('button')
    sendMessageDiv.id = 'sendMessage'
    sendMessageDiv.innerHTML = 'Send message'
    chatInput.appendChild(sendMessageDiv)
    window.appendChild(chatInput)
    console.log('add chat')
    container.appendChild(window)
    sendMessageDiv.addEventListener('click', sendMessage)
    sendUserName.addEventListener('click', setUsername)
  }
}

var memButton = document.getElementById('addMemory')
var chatButton = document.getElementById('addChat')
var appButton = document.getElementById('addApp')

memButton.addEventListener('click', function () {
  myFunc('mem')
})
chatButton.addEventListener('click', function () {
  myFunc('chat')
})
appButton.addEventListener('click', function () {
  console.log('add App')
})

function myFunc (type) {
  createWindow(type)
  console.log(idCounter.toString())
  dragElement(document.getElementById('id' + idCounter.toString()))

  idCounter++
}

var gameArray
var turn1
var turn2
var lastTile
var tries = 0
var pairs = 0

function makePlayArea (cols, rows) {
  gameArray = initializeArray(rows * cols / 2)
  var a

  var container = document.getElementById('memoryContainer')
  container.innerHTML = '<template>\n' +
    '<a href="#"><img src="image/0.png" alt="A memory brick"></a>\n' +
    '</template>'
  var template = document.querySelectorAll('#memoryContainer template')[0].content.firstElementChild

  gameArray.forEach(function (tile, index) {
    a = document.importNode(template, true)

    container.appendChild(a)

    a.addEventListener('click', function (event) {
      var img = event.target.nodeName === 'IMG' ? event.target : event.target.firstElementChild

      turnBrick(tile, index, img)
    })

    if ((index + 1) % cols === 0) {
      container.appendChild(document.createElement('br'))
    }
  })
}

function initializeArray (length) {
  let array = []
  let counter = 0
  for (let i = 0; i < length; i++) {
    array[counter] = i + 1
    counter++
    array[counter] = i + 1
    counter++
  }
  shuffle(array)
  return array
}

function turnBrick (tile, index, img) {
  if (turn2) {
    return
  }

  img.src = 'image/' + tile + '.png'

  if (!turn1) {
    // First brick is clicked
    lastTile = tile
    turn1 = img
  } else {
    // Second brick is clicked
    if (img === turn1) {
      return
    }
    tries++
    turn2 = img
    if (tile === lastTile) {
      // A pair is found
      console.log('Pair')
      pairs++

      if (pairs === (gameArray.length / 2)) {
        // Game is won
        console.log('Won on ' + tries + ' tries')
        var c = document.getElementById('memoryContainer')
        var score = document.createElement('div')
        score.innerHTML = ('You won in ' + tries + ' tries')
        c.appendChild(score)
        setInitialButtons()
      }

      window.setTimeout(function () {
        turn1.parentNode.classList.add('removed')
        turn2.parentNode.classList.add('removed')

        turn1 = null
        turn2 = null
      }, 400)
    } else {
      window.setTimeout(function () {
        // No pair found, turn back the cards
        turn1.src = 'image/0.png'
        turn2.src = 'image/0.png'
        turn1 = null
        turn2 = null
      }, 750)
    }
  }
}

function shuffle (a) {
  var j, x, i
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1))
    x = a[i]
    a[i] = a[j]
    a[j] = x
  }
  return a
}

function setInitialButtons () {
  pairs = 0
  tries = 0

  var container = document.getElementById('memoryContainer')

  var button1 = document.createElement('BUTTON')
  button1.innerHTML = 'Play 4X4'
  button1.addEventListener('click', function () {
    makePlayArea(4, 4)
  })
  var button2 = document.createElement('BUTTON')
  button2.innerHTML = 'Play 4X2'
  button2.addEventListener('click', function () {
    makePlayArea(4, 2)
  })
  var button3 = document.createElement('BUTTON')
  button3.innerHTML = 'Play 2X2'
  button3.addEventListener('click', function () {
    makePlayArea(2, 2)
  })
  container.appendChild(button1)
  container.appendChild(button2)
  container.appendChild(button3)
}

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
  document.getElementById('usernameInputDiv').classList.add('removed')
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
