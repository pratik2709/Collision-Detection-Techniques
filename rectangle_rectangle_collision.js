var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');

var rectangle = {

    x:600,
    y:1200,
    w:200,
    h:200
};

var rectangle2 = {
    x:800,
    y:1200,
    w:200,
    h:200
};

context.rotate(-45 * (3.14)/180);
drawPolygon(rectangle.x, rectangle.y, rectangle.w, rectangle.h, '"#FE8E9D"');
//entire context has been rotated
context.rotate(45 * (3.14)/180); //undo rotation

context.rotate(-45 * (3.14)/180);
drawPolygon(rectangle2.x, rectangle2.y, rectangle2.w, rectangle2.h, "#FE8E9D");

function drawPolygon(x,y,w,h, color){
    context.beginPath();
    context.rect(x,y,w,h);
    context.fillStyle = "#FE8E9D";
    context.fill();
    context.lineWidth = 5;
    context.strokeStyle = "black";
    context.stroke();

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
var dot11 = new Vector(rectangle.x + rectangle.w, rectangle.y);
console.log(dot11);
//drawPolygon(dot11.x,dot11.y,10,10,"#000000");
//context.fillRect(dot11.x,dot11.y,10,10);
//context.fillStyle = "#000000";
//context.fill();


var dot12 = new Vector(rectangle.x + rectangle.w, rectangle.y + rectangle.h);
var dot13 = new Vector(rectangle.x , rectangle.y + rectangle.h);
var dot10 = new Vector(rectangle.x + (rectangle.w)/2, rectangle.y + (rectangle.h)/2);
console.log(dot10);

var dot24 = new Vector(rectangle2.x, rectangle2.y);
console.log(dot24);
var dot21 = new Vector(rectangle2.x + rectangle2.w, rectangle2.y);
var dot22 = new Vector(rectangle2.x + rectangle2.w, rectangle2.y + rectangle2.h);
var dot23 = new Vector(rectangle2.x , rectangle2.y + rectangle2.h);
var dot20 = new Vector(rectangle2.x + (rectangle2.w)/2, rectangle2.y + (rectangle2.h)/2);
console.log(dot20);

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


