var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');

var rectangle = {

    x:1200,
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
//console.log(testVector1.dot(testVector2)); //51

//square the vector
Vector.prototype.square = function(){
    return this.dot(this);
};

//magnitude of the vector
Vector.prototype.magnitude = function(){
    return Math.sqrt(this.square());
};

//test for calculating magnitude
//console.log(testVector1.magnitude());

//normalize a vector
Vector.prototype.normalize = function(){
    var magnitude = this.magnitude;
    if(magnitude > 0){
        this.x /= magnitude;
        this.y /= magnitude;
    }
    return this;
};

context.rotate(-45 * (3.14)/180);
drawPolygon(rectangle.x, rectangle.y, rectangle.w, rectangle.h, '"#FE8E9D"');
//entire context has been rotated
context.rotate(45 * (3.14)/180); //undo rotation

//    var t = new Transform();
//    t.rotate(5);
//    var m = t.m;
//    ctx.setTransform(m[0], m[1], m[2], m[3], m[4], m[5]);
var t = new Transform();
t.rotate(-45 * (3.14)/180);
var d4 = t.transformPoint(rectangle.x, rectangle.y);
var d1 = t.transformPoint(rectangle.x + rectangle.w, rectangle.y);
var d2 = t.transformPoint(rectangle.x + rectangle.w, rectangle.y + rectangle.h);
var d3 = t.transformPoint(rectangle.x , rectangle.y + rectangle.h);
var d0 = t.transformPoint(rectangle.x + (rectangle.w)/2, rectangle.y + (rectangle.h)/2);

//console.log(pt);
var dot14 = new Vector(d4[0], d4[1]);
var dot11 = new Vector(d1[0], d1[1]);
var dot12 = new Vector(d2[0] , d2[1]);
var dot13 = new Vector(d3[0] , d3[1]);
var dot10 = new Vector(d0[0] , d0[1] );

//drawLine(dot11,dot12);
//drawLine(dot12,dot13);
//drawLine(dot13,dot14);
//drawLine(dot14,dot11);


context.rotate(-45 * (3.14)/180);
drawPolygon(rectangle2.x, rectangle2.y, rectangle2.w, rectangle2.h, "#FE8E9D");

context.rotate(45 * (3.14)/180); //undo rotation

var d24 = t.transformPoint(rectangle2.x, rectangle2.y);
var d21 = t.transformPoint(rectangle2.x + rectangle2.w, rectangle2.y);
var d22 = t.transformPoint(rectangle2.x + rectangle2.w, rectangle2.y + rectangle2.h);
var d23 = t.transformPoint(rectangle2.x , rectangle2.y + rectangle2.h);
var d20 = t.transformPoint(rectangle2.x + (rectangle2.w)/2, rectangle2.y + (rectangle2.h)/2);

//console.log(pt);
var dot24 = new Vector(d24[0], d24[1]);
var dot21 = new Vector(d21[0], d21[1]);
var dot22 = new Vector(d22[0] , d22[1]);
var dot23 = new Vector(d23[0] , d23[1]);
var dot20 = new Vector(d20[0] , d20[1]);
//
//drawLine(dot21,dot22);
//drawLine(dot22,dot23);
//drawLine(dot23,dot24);
//drawLine(dot24,dot21);


function drawPolygon(x,y,w,h, color){
    context.beginPath();
    context.rect(x,y,w,h);
    context.fillStyle = "#FE8E9D";
    context.fill();
    context.lineWidth = 5;
    context.strokeStyle = "green";
    context.stroke();

}

function drawLine(d1,d2){

    context.beginPath();
    context.moveTo(d1.x,d1.y);
    context.lineTo(d2.x,d2.y);
    context.strokeStyle = "black";
    context.stroke();
}


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


//prepare the vector arrays which contain all
//the vectors belong to the boxes

var vector_box1 = [dot10,dot11,dot12,dot13,dot14];
console.log(vector_box1);
//good practice not to declare in other ways
var vector_box2 = [dot20,dot21,dot22,dot23,dot24];
console.log(vector_box2);

//minimum projection of box1
var minimum_projection_box1 = vector_box1[1].dot(axis);
var maximum_projection_box1 = vector_box1[1].dot(axis);

console.log("proj for box1");
for(var k=2; k< vector_box1.length; k++){
    var current_projection1 = vector_box1[k].dot(axis);
    //console.log(current_projection1);
    //maximum projection on axis
    if(minimum_projection_box1 > current_projection1){
        minimum_projection_box1 = current_projection1;
        console.log(current_projection1, minimum_projection_box1);

    }
    //minimum projection on axis
    if(current_projection1 > maximum_projection_box1){
        maximum_projection_box1 = current_projection1;
        console.log(current_projection1, maximum_projection_box1);

    }
}
console.log(minimum_projection_box1, maximum_projection_box1);


//minimum projection of box1
var minimum_projection_box2 = vector_box2[1].dot(axis);
var maximum_projection_box2 = vector_box2[1].dot(axis);
console.log("proj for box2");

for(var j=2; j< vector_box2.length; j++){
    var current_projection2 = vector_box2[j].dot(axis);
    console.log(current_projection2);

    //maximum projection on axis
    if(minimum_projection_box2 > current_projection2){
        minimum_projection_box2 = current_projection2;

    }
    //minimum projection on axis
    if(current_projection2 > maximum_projection_box2){
        maximum_projection_box2 = current_projection2;
    }
}
console.log(minimum_projection_box2, maximum_projection_box2);


var gap = projC - (projA+projB);
console.log("The gap is:: " +gap);

if ((maximum_projection_box2 < minimum_projection_box1) || (maximum_projection_box1 < minimum_projection_box2))  {
    console.log("There's a gap between both boxes");
}
else {
    console.log("No gap calculated.");
}





