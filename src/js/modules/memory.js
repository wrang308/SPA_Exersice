module.exports = function memory () {
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

    img.src = '../image/' + tile + '.png'

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
          turn1.src = '../image/0.png'
          turn2.src = '../image/0.png'
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

    console.log('inside memoery')
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
  return {
    setInitialButtons: setInitialButtons
  }
}
