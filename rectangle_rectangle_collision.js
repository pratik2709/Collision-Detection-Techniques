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

var Vector = function(x,y){
    this.x = x || 0;
    this.y = y || 0;
};

//get (x,y) each point belonging to the rectangle
//calculate from initial corner points all points for the rectangle
var dot14 = new Vector(rectangle.x, rectangle.y);
var dot11 = new Vector(rectangle.x + rectangle.width, rectangle.y);
var dot12 = new Vector(rectangle.x + rectangle.width, rectangle.y + rectangle.height);
var dot13 = new Vector(rectangle.x , rectangle.y + rectangle.height);


var dot24 = new Vector(rectangle2.x, rectangle2.y);
var dot21 = new Vector(rectangle2.x + rectangle2.width, rectangle2.y);
var dot22 = new Vector(rectangle2.x + rectangle2.width, rectangle2.y + rectangle2.height);
var dot23 = new Vector(rectangle2.x , rectangle2.y + rectangle2.height);

//get the axis

