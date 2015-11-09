var physicsEngine = (function (run) {

    var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext('2d');
    var rectangle = {

        x: 150,
        y: 900,
        w: 50,
        h: 50
    };

    var rectangle2 = {
        x: 90,
        y: 900,
        w: 50,
        h: 50
    };

    //context.rotate(-45 * (3.14) / 180); //entire context has been rotated
    //run.draw.drawPolygon(context,rectangle.x, rectangle.y, rectangle.w, rectangle.h, '"#FE8E9D"');
    //context.rotate(45 * (3.14) / 180); //undo rotation


    var transform_object = new run.transform_library.transform();
    transform_object.rotate(-45 * (3.14) / 180);
    var rotation_point_d14 = transform_object.transformPoint(rectangle.x, rectangle.y);
    var rotation_point_d11 = transform_object.transformPoint(rectangle.x + rectangle.w, rectangle.y);
    var rotation_point_d12 = transform_object.transformPoint(rectangle.x + rectangle.w, rectangle.y + rectangle.h);
    var rotation_point_d13 = transform_object.transformPoint(rectangle.x, rectangle.y + rectangle.h);
    var rotation_point_d10 = transform_object.transformPoint(rectangle.x + (rectangle.w) / 2, rectangle.y + (rectangle.h) / 2);


    var dot14 = new run.vectorlib.vector(rotation_point_d14[0], rotation_point_d14[1]);
    var dot11 = new run.vectorlib.vector(rotation_point_d11[0], rotation_point_d11[1]);
    var dot12 = new run.vectorlib.vector(rotation_point_d12[0], rotation_point_d12[1]);
    var dot13 = new run.vectorlib.vector(rotation_point_d13[0], rotation_point_d13[1]);
    var dot10 = new run.vectorlib.vector(rotation_point_d10[0], rotation_point_d10[1]);


    run.draw.drawLine(context, dot11,dot12);
    run.draw.drawLine(context, dot12,dot13);
    run.draw.drawLine(context, dot13,dot14);
    run.draw.drawLine(context, dot14,dot11);


    //context.rotate(-45 * (3.14) / 180);
    //run.draw.drawPolygon(context,rectangle2.x, rectangle2.y, rectangle2.w, rectangle2.h, "#FE8E9D");
    //context.rotate(45 * (3.14) / 180); //undo rotation

    var rotation_point_d24 = transform_object.transformPoint(rectangle2.x, rectangle2.y);
    var rotation_point_d21 = transform_object.transformPoint(rectangle2.x + rectangle2.w, rectangle2.y);
    var rotation_point_d22 = transform_object.transformPoint(rectangle2.x + rectangle2.w, rectangle2.y + rectangle2.h);
    var rotation_point_d23 = transform_object.transformPoint(rectangle2.x, rectangle2.y + rectangle2.h);
    var rotation_point_d20 = transform_object.transformPoint(rectangle2.x + (rectangle2.w) / 2, rectangle2.y + (rectangle2.h) / 2);

    //console.log(pt);
    var dot24 = new run.vectorlib.vector(rotation_point_d24[0], rotation_point_d24[1]);
    var dot21 = new run.vectorlib.vector(rotation_point_d21[0], rotation_point_d21[1]);
    var dot22 = new run.vectorlib.vector(rotation_point_d22[0], rotation_point_d22[1]);
    var dot23 = new run.vectorlib.vector(rotation_point_d23[0], rotation_point_d23[1]);
    var dot20 = new run.vectorlib.vector(rotation_point_d20[0], rotation_point_d20[1]);

    run.draw.drawLine(context, dot21,dot22);
    run.draw.drawLine(context, dot22,dot23);
    run.draw.drawLine(context, dot23,dot24);
    run.draw.drawLine(context, dot24,dot21);

    //get the axis
    // why 1 and -1 ?? Draw it on paper and decide
    //does this needs to be calculated depending on the angle?
    var axis_temp = new run.vectorlib.vector(1, -1);
    var axis = axis_temp.normalize();

//get all the vector distances
    var C = new run.vectorlib.vector(dot20.x - dot10.x, dot20.y - dot10.y);
    var A = new run.vectorlib.vector(dot11.x - dot10.x, dot11.y - dot10.y);
    var B = new run.vectorlib.vector(dot24.x - dot20.x, dot24.y - dot20.y);

    var projC = C.dot(axis);
    var projA = A.dot(axis);
    var projB = B.dot(axis);

//prepare the vector arrays which contain all
//the vectors belong to the boxes

    var vector_box1 = [dot10, dot11, dot12, dot13, dot14];
    console.log(vector_box1);
//good practice not to declare in other ways
    var vector_box2 = [dot20, dot21, dot22, dot23, dot24];
    console.log(vector_box2);

//minimum projection of box1
    var minimum_projection_box1 = vector_box1[1].dot(axis);
    var maximum_projection_box1 = vector_box1[1].dot(axis);

    console.log("proj for box1");
    for (var k = 2; k < vector_box1.length; k++) {
        var current_projection1 = vector_box1[k].dot(axis);
        //console.log(current_projection1);
        //maximum projection on axis
        if (minimum_projection_box1 > current_projection1) {
            minimum_projection_box1 = current_projection1;
            console.log(current_projection1, minimum_projection_box1);

        }
        //minimum projection on axis
        if (current_projection1 > maximum_projection_box1) {
            maximum_projection_box1 = current_projection1;
            console.log(current_projection1, maximum_projection_box1);

        }
    }
    console.log("for box1::" +minimum_projection_box1, maximum_projection_box1);


//my method of calculating maximum



//minimum projection of box1
    var minimum_projection_box2 = vector_box2[1].dot(axis);
    var maximum_projection_box2 = vector_box2[1].dot(axis);
    console.log("proj for box2");

    for (var j = 2; j < vector_box2.length; j++) {
        var current_projection2 = vector_box2[j].dot(axis);
        console.log(current_projection2);

        //maximum projection on axis
        if (minimum_projection_box2 > current_projection2) {
            minimum_projection_box2 = current_projection2;

        }
        //minimum projection on axis
        if (current_projection2 > maximum_projection_box2) {
            maximum_projection_box2 = current_projection2;
        }
    }
    console.log("for box2::" +minimum_projection_box2, maximum_projection_box2);


    var gap = projC - (projA + projB);
    console.log("The gap is:: " + gap);

    if ((maximum_projection_box2 < minimum_projection_box1) || (maximum_projection_box1 < minimum_projection_box2)) {
        console.log("There's a gap between both boxes");
    }
    else {
        console.log("No gap calculated.");
    }

})(physicsEngine || {});