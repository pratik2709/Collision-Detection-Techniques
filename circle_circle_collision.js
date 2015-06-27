var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');

var circle1 = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 70

};

var circle2 = {
    x: (canvas.width / 2) - 140,
    y: (canvas.height / 2),
    radius: 70

};

drawCircle(circle1);
drawCircle(circle2);

function drawCircle(circle){
    context.beginPath();
    context.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI, false);
    context.fillStyle = 'green';
    context.fill();
    context.lineWidth = 5;
    context.strokeStyle = '#003300';
    context.stroke();
}

var totalRadius = circle1.radius + circle2.radius;

//using distance formula to calculate distance
var difference_square = Math.pow((circle1.x - circle2.x),2) + Math.pow((circle1.y - circle2.y),2);
console.log(circle1.x,circle1.y);
console.log(circle2.x,circle2.y);
console.log(Math.pow((circle1.x - circle2.x),2));
console.log(Math.pow((circle1.y - circle2.y),2));
console.log("The difference is:: " + difference_square);
console.log("Radius square is:: " +Math.pow(totalRadius,2));

if(difference_square > Math.pow(totalRadius,2)){
    console.log("not touching, circles are away from each other");
}
else if (difference_square === Math.pow(totalRadius,2)){
    console.log("Circles touch each other");
}
else if (difference_square < Math.pow(totalRadius,2)){
    console.log("Circles penetrated each other");
}
else{
    console.log("That's plain wierd !");
}