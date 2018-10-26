console.log('Hello World!')

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

function createWindow () {
  var container = document.getElementById('container')
  var window = document.createElement('div')
  var drag = document.createElement('div')
  drag.id = 'helloheader'
  drag.class = drag
  window.id = 'hello'
  drag.innerHTML = 'Hello guys!'
  window.append(drag)
  container.appendChild(window)
}

var button = document.getElementById('button')

button.addEventListener('click', myFunc)

function myFunc () {
  dragElement(document.getElementById('mydiv'))
  createWindow()
  dragElement(document.getElementById('hello'))
}