var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');
var centerX = canvas.width / 2;
var centerY = canvas.height / 2;
var radius = 70;

var circle1 = {
    centerX: canvas.width / 2,
    centerY: canvas.height / 2,
    radius: 70

};

var circle2 = {
    centerX: canvas.width / 2 + 100,
    centerY: canvas.height / 2,
    radius: 70

};

drawCircle(circle1);
drawCircle(circle2);

function drawCircle(circle){
    context.beginPath();
    context.arc(circle.centerX, circle.centerY, circle.radius, 0, 2 * Math.PI, false);
    context.fillStyle = 'green';
    context.fill();
    context.lineWidth = 5;
    context.strokeStyle = '#003300';
    context.stroke();
}

