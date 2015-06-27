var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');

var rectangle = {
    x:(canvas.width / 2),
    y:(canvas.height / 2),
    w:200,
    h:100
};

var rectangle2 = {
    x:(canvas.width / 2),
    y:(canvas.height / 2),
    w:200,
    h:100
};

drawPolygon1(rectangle.x, rectangle.y, rectangle.w, rectangle.h);
drawPolygon2(rectangle2.x, rectangle2.y, rectangle2.w, rectangle2.h);

function drawPolygon1(x,y,w,h){
    context.beginPath();
    context.rect(x,y,w,h);
    context.fillStyle = 'yellow';
    context.fill();
    context.lineWidth = 7;
    context.strokeStyle = 'black';
    context.rotate(45*Math.PI/180);
    context.stroke();
    context.closePath();

}

function drawPolygon2(x,y,w,h){
    context.beginPath();
    context.rect(x,y,w,h);
    context.fillStyle = 'yellow';
    context.fill();
    context.lineWidth = 7;
    context.strokeStyle = 'black';
    context.rotate(45*Math.PI/180);
    context.stroke();
    context.closePath();

}

var Vector = function(x,y){
    this.x = x || 0;
    this.y = y || 0;
};

//get the dot product
//'this' refers to 'this object'
Vector.prototype.dot = function(other){
    return this.x * other.x + this.y * other.y
};

//test for dot product works or not
var testVector1 = new Vector(5,9);
var testVector2 = new Vector(3,4);
console.log(testVector1.dot(testVector2)); //51

//square the vector
Vector.prototype.square = function(){
    return this.dot(this);
};

//magnitude of the vector
Vector.prototype.magnitude = function(){
    return Math.sqrt(this.square());
};

//test for calculating magnitude
console.log(testVector1.magnitude());

//normalize a vector
Vector.prototype.normalize = function(){
    var magnitude = this.magnitude;
    if(magnitude > 0){
        this.x /= magnitude;
        this.y /= magnitude;
    }
    return this;
};

//get (x,y) each point belonging to the rectangle
//calculate from initial corner points all points for the rectangle
var dot14 = new Vector(rectangle.x, rectangle.y);
var dot11 = new Vector(rectangle.x + rectangle.width, rectangle.y);
var dot12 = new Vector(rectangle.x + rectangle.width, rectangle.y + rectangle.height);
var dot13 = new Vector(rectangle.x , rectangle.y + rectangle.height);
var dot10 = new Vector(rectangle.x + (rectangle.width)/2, rectangle.y + (rectangle.height)/2);

var dot24 = new Vector(rectangle2.x, rectangle2.y);
var dot21 = new Vector(rectangle2.x + rectangle2.width, rectangle2.y);
var dot22 = new Vector(rectangle2.x + rectangle2.width, rectangle2.y + rectangle2.height);
var dot23 = new Vector(rectangle2.x , rectangle2.y + rectangle2.height);
var dot20 = new Vector(rectangle2.x + (rectangle2.width)/2, rectangle2.y + (rectangle2.height)/2);

//get the axis
// why 1 and -1 ??
//does this needs to be calculated depending on the angle?
var axis_temp = new Vector(1, -1);
var axis = axis_temp.normalize();

//get all the vector distances
var C = new Vector(dot20.x - dot10.x, dot20.y - dot10.y);
var A = new Vector(dot11.x - dot10.x, dot11.y - dot10.y);
var B = new Vector(dot24.x - dot20.x, dot24.y - dot20.y);

var projC = C.dot(axis);
var projA = A.dot(axis);
var projB = B.dot(axis);

var gap = projC - (projA+projB);
console.log("The gap is:: " +gap);


