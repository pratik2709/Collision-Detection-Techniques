var physicsEngine = (function (run) {

    var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext('2d');
    var rectangle = {

        x: 10,
        y: 900,
        w: 50,
        h: 50
    };

    var rectangle2 = {
        x: 60,
        y: 900,
        w: 50,
        h: 50
    };

    //context.rotate(-45 * (3.14) / 180); //entire context has been rotated
    //run.draw.drawPolygon(context,rectangle.x, rectangle.y, rectangle.w, rectangle.h, '"#FE8E9D"');
    //context.rotate(45 * (3.14) / 180); //undo rotation


    var transform_object = new run.transform_library.transform();
    transform_object.rotate(-45 * (3.14) / 180);
    var d4 = transform_object.transformPoint(rectangle.x, rectangle.y);
    var d1 = transform_object.transformPoint(rectangle.x + rectangle.w, rectangle.y);
    var d2 = transform_object.transformPoint(rectangle.x + rectangle.w, rectangle.y + rectangle.h);
    var d3 = transform_object.transformPoint(rectangle.x, rectangle.y + rectangle.h);
    var d0 = transform_object.transformPoint(rectangle.x + (rectangle.w) / 2, rectangle.y + (rectangle.h) / 2);


    var dot14 = new run.vectorlib.vector(d4[0], d4[1]);
    var dot11 = new run.vectorlib.vector(d1[0], d1[1]);
    var dot12 = new run.vectorlib.vector(d2[0], d2[1]);
    var dot13 = new run.vectorlib.vector(d3[0], d3[1]);
    var dot10 = new run.vectorlib.vector(d0[0], d0[1]);


    run.draw.drawLine(context, dot11,dot12);
    run.draw.drawLine(context, dot12,dot13);
    run.draw.drawLine(context, dot13,dot14);
    run.draw.drawLine(context, dot14,dot11);



    //context.rotate(-45 * (3.14) / 180);
    //run.draw.drawPolygon(context,rectangle2.x, rectangle2.y, rectangle2.w, rectangle2.h, "#FE8E9D");
    //context.rotate(45 * (3.14) / 180); //undo rotation

    var d24 = transform_object.transformPoint(rectangle2.x, rectangle2.y);
    var d21 = transform_object.transformPoint(rectangle2.x + rectangle2.w, rectangle2.y);
    var d22 = transform_object.transformPoint(rectangle2.x + rectangle2.w, rectangle2.y + rectangle2.h);
    var d23 = transform_object.transformPoint(rectangle2.x, rectangle2.y + rectangle2.h);
    var d20 = transform_object.transformPoint(rectangle2.x + (rectangle2.w) / 2, rectangle2.y + (rectangle2.h) / 2);

    //console.log(pt);
    var dot24 = new run.vectorlib.vector(d24[0], d24[1]);
    var dot21 = new run.vectorlib.vector(d21[0], d21[1]);
    var dot22 = new run.vectorlib.vector(d22[0], d22[1]);
    var dot23 = new run.vectorlib.vector(d23[0], d23[1]);
    var dot20 = new run.vectorlib.vector(d20[0], d20[1]);

    run.draw.drawLine(context, dot21,dot22);
    run.draw.drawLine(context, dot22,dot23);
    run.draw.drawLine(context, dot23,dot24);
    run.draw.drawLine(context, dot24,dot21);

})(physicsEngine || {});