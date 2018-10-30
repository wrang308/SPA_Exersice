console.log('Hello World!')
var idCounter = 0
var lastFocus
// Make the DIV element draggable:
var Memory = require('./modules/memory')
Memory()
var Chat = require('./modules/chat')
var chat
console.log(Memory)

function dragElement (elmnt) {
  var pos1 = 0; let pos2 = 0; let pos3 = 0; let pos4 = 0
  if (document.getElementById(elmnt.id + 'header')) {
    // if present, the header is where you move the DIV from:
    console.log(elmnt.id + 'header')
    document.getElementById(elmnt.id + 'header').onmousedown = dragMouseDown
    // lastFocus = document.getElementById(elmnt.id + 'header')
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown
  }

  function dragMouseDown (e) {
    e = e || window.event
    e.preventDefault()
    console.log(e.target)
    console.log(e)
    var focus = document.getElementById(e.target.id).parentNode
    console.log(focus)
    focus.classList.add('focus')
    if (lastFocus !== focus) {
      if (lastFocus !== undefined) {
        lastFocus.classList.remove('focus')
      }
      lastFocus = focus
    }
    // lastFocus.classList.remove('focus')
    // lastFocus =
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
  var removeDiv = document.createElement('button')
  removeDiv.innerHTML = 'X'
  removeDiv.classList = 'exit'
  drag.appendChild(removeDiv)
  removeDiv.addEventListener('click', function () {
    console.log('hello there!')
    this.parentNode.parentNode.removeChild(this.parentNode)
    // document.body.removeChild(this)
  })
  window.id = 'id' + idCounter
  window.classList.add('dragContainer')
  if (type === 'mem') {
    drag.innerHTML = 'Memory Game'
    window.appendChild(drag)
    window.appendChild(removeDiv)
    var mem = document.createElement('div')
    mem.id = 'memoryContainer'
    window.appendChild(mem)
    container.appendChild(window)
    Memory().setInitialButtons()
  } else if (type === 'chat') {
    chat = Chat()
    drag.innerHTML = 'Chat Box'
    window.appendChild(drag)
    window.appendChild(removeDiv)
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
    sendMessageDiv.addEventListener('click', function () {
      chat.sendMessage()
    })
    sendUserName.addEventListener('click', function () {
      chat.setUsername()
    })
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
  myFunc('clock')
})

function myFunc (type) {
  createWindow(type)
  console.log(idCounter.toString())
  dragElement(document.getElementById('id' + idCounter.toString()))

  idCounter++
}
