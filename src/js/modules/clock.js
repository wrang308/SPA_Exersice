module.exports = function clock () {
  let canvas, ctx

  /**
   * A funtion that initialize the clock by adding the face, hour hand, minute hand, and second hand.
   */
  function draw () {
    let time = (function () {
        var midnight = new Date()
        midnight.setHours(0)
        midnight.setMinutes(0)
        midnight.setSeconds(0)
        midnight.setMilliseconds(0)
        return Date.now() - midnight.getTime()

      })(),
      hours = time / (60 * 60 * 1000),
      minutes = hours * 60 % 60,
      seconds = minutes * 60 % 60,
      c = {x: canvas.width / 2, y: canvas.height / 2}

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    secondHand()
    minuteHand()
    hourHand()
    face()

    /**
     * this function creates the face of the clock
     */
    function face () {
      ctx.lineWidth = 4
      ctx.strokeStyle = 'black'
      ctx.beginPath()
      ctx.arc(c.x, c.y, 140, 0, Math.PI * 2)
      ctx.stroke()
      ctx.lineWidth = 3
      for (let i = 0; i < 60; i++) { // this loop is being used to create the minute/second marks for the clock and the hour marks.
        let r = 135,
          l = 5
        ctx.strokeStyle = '#3c3b3b'
        if (i % 5 === 0) { // this creates the hour marks for the clock, change the color of it and makes it a bit longer.
          r -= l
          l *= 2
          ctx.strokeStyle = '#5c2727'
        }
        let v = new Vector(r, Math.PI * 2 * (i / 60) - Math.PI / 2)
        ctx.beginPath()
        ctx.moveTo(v.getX() + c.x, v.getY() + c.y)
        v.setMag(r + l)
        ctx.lineTo(v.getX() + c.x, v.getY() + c.y)
        ctx.stroke()
      }
      // This part creates the number of the face on the clock.
      ctx.font = '18px Noto Sans'
      ctx.fillStyle = 'black'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      for (let i = 1; i <= 12; i++) {
        let v = new Vector(113, Math.PI * 2 * (i / 12) - Math.PI / 2)
        ctx.fillText(i, v.getX() + c.x, v.getY() + c.y)
      }
      // This part of the code creates the small circle in the middle of the face of the clock where the hands of the clock connects.
      ctx.beginPath()
      ctx.arc(c.x, c.y, 2.5, 0, Math.PI * 2)
      ctx.fillStyle = 'white'
      ctx.strokeStyle = 'black'
      ctx.lineWidth = 2.5
      ctx.fill()
      ctx.stroke()

    }

    /**
     * This function creates the second hand of the clock
     */
    function secondHand () {
      ctx.lineWidth = 1.5
      ctx.strokeStyle = 'black'
      ctx.beginPath()
      var a = Math.PI * 2 * (seconds / 60) - Math.PI / 2
      var v = new Vector(108, a)
      var v2 = new Vector(-20, a)
      ctx.moveTo(v2.getX() + c.x, v2.getY() + c.y)
      ctx.lineTo(v.getX() + c.x, v.getY() + c.y)
      ctx.stroke()
    }
    /**
     * This function creates the minute hand of the clock
     */
    function minuteHand () {
      ctx.lineWidth = 4
      ctx.strokeStyle = 'black'
      ctx.beginPath()
      var a = Math.PI * 2 * (minutes / 60) - Math.PI / 2
      var v = new Vector(90, a)
      ctx.moveTo(c.x, c.y)
      ctx.lineTo(v.getX() + c.x, v.getY() + c.y)
      ctx.stroke()
    }
    /**
     * This function creates the hour hand of the clock
     */
    function hourHand () {
      ctx.lineWidth = 4
      ctx.strokeStyle = 'black'
      ctx.beginPath()
      var a = Math.PI * 2 * (hours / 12) - Math.PI / 2
      var v = new Vector(70, a)
      ctx.moveTo(c.x, c.y)
      ctx.lineTo(v.getX() + c.x, v.getY() + c.y)
      ctx.stroke()
    }
  }

  /**
   * This function initializes the clock
   * @param idis used so we know what window we should connect the clock to
   */
  function init (id) {
    canvas = document.getElementById('clock' + id)
    canvas.width = canvas.height = 300
    ctx = canvas.getContext('2d')
    setInterval(draw, 10)
  }

  return {
    init: init
  }
}