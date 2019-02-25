const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const maxX = 512;
const maxY = 512;
const minR = 10;
const maxR = 70;

const rand = function (min, max) {
    return Math.random() * (max - min) + min;
}

let paused = false;
const pause = function (event) {
    if (event.key === " ") {
        paused = !paused;
    }
}
document.addEventListener("keydown", pause);

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

class Circle {
    constructor() {
        this.radius = rand(minR, maxR);
        this.x = rand(0, maxX);
        this.y = rand(0, maxY);
        this.vectorX = rand(1, 5);
        this.vectorY = rand(1, 5);
        this.color = getRandomColor();
        this.score = maxR - this.radius;
    }

    move() {
        this.x += this.vectorX;
        if (this.x > maxX) {
            this.x -= maxX;
        }
        this.y += this.vectorY;
        if (this.y > maxY) {
            this.y -= maxY;
        }
    }

    /**
     * @param {Number} x
     * @param {Number} y
     */
    isClicked(x, y) {
        return x > this.x - this.radius
            && x < this.x + this.radius
            && y > this.y - this.radius
            && y < this.y + this.radius;
    }
}

const circles = [];
for (let i = 0; i < 10; i++) {
    circles.push(new Circle());
}

/**
 * @param {CanvasRenderingContext2D} ctx
 * @param {Circle} circle
 */
const placeCircle = function (ctx, circle) {
    ctx.strokeStyle = circle.color;
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI);
    ctx.stroke();
}

let clickEvent = null;
function click(event) {
    if (paused) {
        return;
    }
    clickEvent = event;
}

let score = 0;
let gameFinished = false;
const name = prompt('Enter name');

function draw() {
    if (paused) {
        requestAnimationFrame(draw);
        return;
    }

    if (gameFinished) {
        document.location = 'top.php?score=' + score + '&name=' + name;
        paused = true;
        return;
    }

    ctx.clearRect(0, 0, maxX, maxY);
    for (let i = 0; i < circles.length; i++) {
        let circle = circles[i];
        if (circle === null) {
            continue;
        }

        if (clickEvent !== null) {
            let rect = canvas.getBoundingClientRect();
            let x = clickEvent.clientX - rect.left;
            let y = clickEvent.clientY - rect.top;
            if (circle.isClicked(x, y)) {
                score += circle.score;
                circles[i] = null;
                clickEvent = null;
                continue;
            }
        }

        placeCircle(ctx, circle);
        circle.move()
    }

    ctx.fillStyle = "#000";
    ctx.font = "24px Verdana";
    ctx.fillText("Score: " + parseInt(score) + " time: " + parseInt(timeRemaining), maxX / 2 - 10, maxY - 20);

    requestAnimationFrame(draw);
}

let timeRemaining = 10;
const int = setInterval(function () {
    if (paused) {
        return;
    }
    timeRemaining -= .100;
    if (timeRemaining <= .0) {
        gameFinished = true;
    }
}, 100);

document.addEventListener("DOMContentLoaded", draw);
canvas.addEventListener('click', click);
