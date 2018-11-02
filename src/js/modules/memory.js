module.exports = function memory () {
  var gameArray // The array that is representing the game field
  var turn1
  var turn2
  var lastTile
  var tries = 0 // Counter for knowing how many tries that is used per game.
  var pairs = 0 // Is used so we know how many pairs is found so we know when the game is won.

  /**
   *  This function will make the play area of the memory game, it will create an array that represent the play area
   * @param cols this is the number of columns that the play area will have
   * @param rows this is the number of rows that the play area will have
   * @param id is used so we know what window to fetch the data from
   */
  function makePlayArea (cols, rows, id) {
    gameArray = initializeArray(rows * cols / 2)
    var a

    var container = document.getElementById('memoryContainer' + id)
    container.innerHTML = '<template>\n' +
      '<a href="#"><img src="image/0.png" alt="A memory brick"></a>\n' +
      '</template>'
    var template = document.querySelectorAll('#memoryContainer' + id + ' template')[0].content.firstElementChild

    gameArray.forEach(function (tile, index) {
      a = document.importNode(template, true)

      container.appendChild(a)

      a.addEventListener('click', function (event) {
        var img = event.target.nodeName === 'IMG' ? event.target : event.target.firstElementChild

        turnBrick(tile, img, id)
      })

      if ((index + 1) % cols === 0) {
        container.appendChild(document.createElement('br'))
      }
    })
  }

  /**
   * This function creates an array that will represent every brick in the memory game. It creates 2 of every number up
   * til the length i.e length = 3 array before shuffle will be [1, 1, 2, 2, 3, 3]. After the array is created it will
   * be shuffled and then returned
   * @param length this is the length of the array
   * @returns {Array} is a shuffled array of duplicates
   */
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

  /**
   * This is one of the main functions in the memory game. This contains most of the game logic that is being used in
   * the memory game.
   * @param tile is the tile that is pressed.
   * @param img is the current image of the tile
   * @param id is used so we know what window to fetch the data from
   */
  function turnBrick (tile, img, id) {
    // making sure that if yoou spam no new turn will be made before the last one is done.
    if (turn2) {
      return
    }

    img.src = '../image/' + tile + '.png'

    if (!turn1) {
      // First brick is clicked
      lastTile = tile
      turn1 = img
    } else { // Second brick is clicked
      if (img === turn1) { // check that the same brick isn't clicked, if same buttons is clicked this will just return.
        return
      }
      tries++
      turn2 = img
      if (tile === lastTile) { // logic checking if a pair is found.
        // A pair is found
        console.log('Pair')
        pairs++

        if (pairs === (gameArray.length / 2)) { // checking the win condition of the game
          // Game is won
          console.log('Won on ' + tries + ' tries')
          var c = document.getElementById('memoryContainer' + id)
          var score = document.createElement('div')
          score.innerHTML = ('You won in ' + tries + ' tries')
          c.appendChild(score)
          setInitialButtons(id)
        }

        window.setTimeout(function () { // adding short delay before removing tiles when pair is found
          turn1.parentNode.classList.add('removed')
          turn2.parentNode.classList.add('removed')

          turn1 = null
          turn2 = null
        }, 400)
      } else {
        window.setTimeout(function () { // adding delay before turning bricks when no pair is found.
          // No pair found, turn back the cards
          turn1.src = '../image/0.png'
          turn2.src = '../image/0.png'
          turn1 = null
          turn2 = null
        }, 750)
      }
    }
  }

  /**
   * A function that gets an array as argument and shuffles the array.
   * @param a is the array that will be shuffled.
   * @returns {*} a is the array sent as argument but shuffled.
   */
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

  /**
   * This is a function that creates start buttons for the memory game and adds EventListeners to these buttons. The
   * buttons is for different sized playing field of the memory game, one for a 4x4 field, one for a 4x2 field and the
   * last one for a 2x2 field.
   * @param id is used so we know what window we are going to attach the buttons to.
   */
  function setInitialButtons (id) {
    pairs = 0
    tries = 0

    console.log('inside memoery')
    var container = document.getElementById('memoryContainer' + id)

    var button1 = document.createElement('BUTTON')
    button1.innerHTML = 'Play 4X4'
    button1.addEventListener('click', function () {
      makePlayArea(4, 4, id)
    })
    var button2 = document.createElement('BUTTON')
    button2.innerHTML = 'Play 4X2'
    button2.addEventListener('click', function () {
      makePlayArea(4, 2, id)
    })
    var button3 = document.createElement('BUTTON')
    button3.innerHTML = 'Play 2X2'
    button3.addEventListener('click', function () {
      makePlayArea(2, 2, id)
    })
    container.appendChild(button1)
    container.appendChild(button2)
    container.appendChild(button3)
  }
  return {
    setInitialButtons: setInitialButtons
  }
}
