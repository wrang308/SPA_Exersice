module.exports = function initButtons () {
  var idCounter = 0
  var lastFocus
  var memoryIdCounter = 0 // is used to keep count on the number of memory games so we know what game is being played
  var chatIdCounter = 0 // is used to keep count on the number of chats so we know what chat is being used
  var clockIdCounter = 0 // is used to keep count on the number of clocks so we know where to put the clock
  // Make the DIV element draggable:
  var Memory = require('./memory')
  var Chat = require('./chat')
  var chat
  var Clock = require('./clock')
  var clock

  /**
   * This function will create a draggable div
   * @param elmnt
   */
  function dragElement (elmnt) {
    var pos1 = 0;
    let pos2 = 0;
    let pos3 = 0;
    let pos4 = 0
    if (document.getElementById(elmnt.id + 'header')) {
      // if present, the header is where you move the DIV from:
      console.log(elmnt.id + 'header')
      document.getElementById(elmnt.id + 'header').onmousedown = dragMouseDown
      // lastFocus = document.getElementById(elmnt.id + 'header')
    } else {
      // otherwise, move the DIV from anywhere inside the DIV:
      elmnt.onmousedown = dragMouseDown
    }

    /**
     * When the drag element is pressed down this function is called
     * @param e
     */
    function dragMouseDown (e) {
      e = e || window.event
      e.preventDefault()
      console.log(e.target)
      console.log(e)
      // makes so the pressed element will get focused.
      var focus = document.getElementById(e.target.id).parentNode
      console.log(focus)
      focus.classList.add('focus')
      // removes focus from the last element pressed when a new element is pressed.
      if (lastFocus !== focus) {
        if (lastFocus !== undefined) {
          lastFocus.classList.remove('focus')
        }
        lastFocus = focus
      }
      // get the mouse cursor position at startup:
      pos3 = e.clientX
      pos4 = e.clientY
      document.onmouseup = closeDragElement
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag
    }

    /**
     * This element is called when a dragable element is dragged. This function will update so it will get a new position.
     * @param e
     */
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

  /**
   * This function creates the windows that the application is in. It creates three different kinds of windows depentend
   * on the argumnet that is getting passed.
   * @param type is used to selecct what kind of window that should be created.
   */
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
    if (type === 'mem') { // if type is mem it will create a window for the memory game
      drag.innerHTML = 'Memory Game'
      window.style = 'width: 280px; height: 375px'
      window.appendChild(drag)
      window.appendChild(removeDiv)
      var mem = document.createElement('div')
      mem.id = 'memoryContainer' + memoryIdCounter
      mem.classList = 'memoryContainer'
      window.appendChild(mem)
      container.appendChild(window)
      Memory().setInitialButtons(memoryIdCounter)
      memoryIdCounter++
    } else if (type === 'chat') { // If the type is chat this will create the chat with a place to set username,
      // a chat box and an area to input chat messages
      chat = new Chat(chatIdCounter)
      drag.innerHTML = 'Chat Box'
      window.appendChild(drag)
      window.appendChild(removeDiv)
      var usernameInputDiv = document.createElement('div')
      usernameInputDiv.id = 'usernameInputDiv' + chatIdCounter
      var usernameInput = document.createElement('input')
      usernameInput.id = 'usernameInput' + chatIdCounter
      usernameInput.type = 'text'
      usernameInputDiv.appendChild(usernameInput)
      window.appendChild(usernameInputDiv)
      var chatBoxTitle = document.createElement('div')
      chatBoxTitle.id = 'chatBoxTitle' + chatIdCounter
      window.appendChild(chatBoxTitle)
      var chatBox = document.createElement('div')
      chatBox.id = 'chatBox' + chatIdCounter
      chatBox.classList = 'chatBox'
      window.appendChild(chatBox)
      var chatInput = document.createElement('div')
      chatInput.id = 'chatInput' + chatIdCounter
      chatInput.classList = 'chatInput'
      var input = document.createElement('input')
      input.id = 'input' + chatIdCounter
      input.type = 'text' + chatIdCounter
      chatInput.appendChild(input)
      window.appendChild(chatInput)
      console.log('add chat')
      container.appendChild(window)
      chat.initButtons(chatIdCounter)
      chatIdCounter++
    } else if (type === 'clock') { // if the type is clock a canvas will be made where a clock can be added.
      clock = new Clock()
      drag.innerHTML = 'Clock'
      window.appendChild(drag)
      window.appendChild(removeDiv)
      var canvas = document.createElement('canvas')
      canvas.id = 'clock' + clockIdCounter
      window.appendChild(canvas)
      container.appendChild(window)
      clock.init(clockIdCounter)
      clockIdCounter++
    }
  }

  /**
   * init will create buttons and add EventListeners to these buttons.
   */
  function init () {

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
  }

  /**
   * This function creates a window and makes it draggable.
   * @param type is what kind of application that should be made.
   */
  function myFunc (type) {
    createWindow(type)
    console.log(idCounter.toString())
    dragElement(document.getElementById('id' + idCounter.toString()))

    idCounter++
  }
  return {
    init: init
  }
}
