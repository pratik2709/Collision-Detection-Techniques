var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');

var rectangle = {
    x:(canvas.width / 2),
    y:(canvas.height / 2),
    w:200,
    h:100
};

var rectangle2 = {
    x:(2),
    y:(2),
    w:200,
    h:500
};

drawPolygon(rectangle.x, rectangle.y, rectangle.w, rectangle.h);
drawPolygon(rectangle2.x, rectangle2.y, rectangle2.w, rectangle2.h);

function drawPolygon(x,y,w,h){
    context.beginPath();
    context.rect(x,y,w,h);
    context.fillStyle = 'yellow';
    context.fill();
    context.lineWidth = 7;
    context.strokeStyle = 'black';
    context.stroke();

}