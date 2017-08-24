$(document).ready(function() {
  let canvas = document.getElementById('canvas');
  let c = canvas.getContext('2d');
  const WIDTH = Number($('canvas').attr('width'));
  const HEIGHT = Number($('canvas').attr('height'));
  let clicked = false;

 // BALL CONSTRUCTOR
  function Ball(x, y) {
    this.coefficient  = [-1, 1];
    this.colors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple'];
    this.color = this.colors[Math.floor( Math.random() * this.colors.length )];
    this.radius = 5 + Math.random() * 15;
    this.height = HEIGHT - this.radius;
    this.energyRetention = 0.7 + Math.random() * 0.25; // 0 - 1
    this.fps = 30;
    this.realG = 40;
    this. g = this.realG / this.fps;
    this.xVelocity = (0.5 + Math.random() * 4) * this.coefficient[Math.floor(Math.random() * 2)];
    this.yVelocity = - Math.random() * 20;
    this.y = y;
    this.x = x;
    this.active = true;

    this.position = function() {
      this.x += this.xVelocity;
      this.y += this.yVelocity;

      if (this.y < this.height) {
        this.yVelocity += this.g;
      } else {
        this.y = this.height;
        this.yVelocity = - (this.energyRetention) * this.yVelocity;
      }
    }

    this.deactivateBall = function() {
      if (ball < 0 || ball > WIDTH) { this.active = false };
    }

    this.update = function() {
      this.position();
      //this.deactivateBall();
    }

    this.draw = function() {
      c.fillStyle = this.color;
      c.beginPath();
      c.moveTo(this.x, this.y);
      c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
      c.fill();
    }

  }

  let balls = [];

  // Add balls by keypress
  $('html').on('click', function(e) {
      balls.push( new Ball(e.offsetX, e.offsetY) );
      clicked = true;
  })

  // setInterval
  setInterval(function() {
    if (Math.random() < 0.2 && !clicked) {
      balls.push(new Ball(WIDTH/2, HEIGHT/3));
    }
    draw();
    update();
  }, 33);

  // Update
  function update() {
    balls.forEach( ball => ball.update() );
    // for some reason doesn't update second ball.
    //balls = balls.filter( ball => ball.active );
  }

  // Draw
  function draw() {
    c.clearRect(0, 0, WIDTH, HEIGHT);
    c.fillStyle = '#eee';
    c.fillRect(0, 0, WIDTH, HEIGHT);

    balls.forEach( ball => ball.draw() );
  }

})
