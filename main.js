var physicsEngine = (function (run) {

    var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext('2d');
    var rectangle = {

        x: 500,
        y: 500,
        w: 200,
        h: 200
    };

    var rectangle2 = {
        x: 500,
        y: 500,
        w: 200,
        h: 200
    };
    //context.rotate(-45 * (3.14) / 180);
    run.draw.drawPolygon(context, rectangle.x, rectangle.y, rectangle.w, rectangle.h, '"#FE8E9D"');
    //context.rotate(45 * (3.14) / 180);

})(physicsEngine || {});