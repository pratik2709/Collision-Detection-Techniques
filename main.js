var physicsEngine = (function (run) {

    var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext('2d');
    var rectangle = {

        x: 30,
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

    // rotate
    // get the  rotate co-ordinates
    //

    var transform_object = new run.transform_library.transform();
    transform_object.rotate(-45 * (3.14) / 180);

    var rotation_points = run.generic_utils.get_rotation_points(transform_object, rectangle);
    var rotated_rectangle_vectors = run.generic_utils.get_vectors(rotation_points);
    console.log("rotated rectangle vectors::");
    console.log(rotated_rectangle_vectors);


    run.draw.drawLine(context, rotated_rectangle_vectors.dot1, rotated_rectangle_vectors.dot2);
    run.draw.drawLine(context, rotated_rectangle_vectors.dot2, rotated_rectangle_vectors.dot3);
    run.draw.drawLine(context, rotated_rectangle_vectors.dot3, rotated_rectangle_vectors.dot4);
    run.draw.drawLine(context, rotated_rectangle_vectors.dot4, rotated_rectangle_vectors.dot1);


    var rotation_points_for_rectangle2 = run.generic_utils.get_rotation_points(transform_object, rectangle2);
    var rotated_rectangle2_vectors = run.generic_utils.get_vectors(rotation_points_for_rectangle2);
    console.log(rotated_rectangle2_vectors);


    run.draw.drawLine(context, rotated_rectangle2_vectors.dot1, rotated_rectangle2_vectors.dot2);
    run.draw.drawLine(context, rotated_rectangle2_vectors.dot2, rotated_rectangle2_vectors.dot3);
    run.draw.drawLine(context, rotated_rectangle2_vectors.dot3, rotated_rectangle2_vectors.dot4);
    run.draw.drawLine(context, rotated_rectangle2_vectors.dot4, rotated_rectangle2_vectors.dot1);

    //get the axis
    // why 1 and -1 ?? Draw it on paper and decide
    //does this needs to be calculated depending on the angle?
    var axis_temp = new run.vectorlib.vector(1, -1);
    var axis = axis_temp.normalize();

    //get all the vector distances
    var C = new run.vectorlib.vector(rotated_rectangle2_vectors.dot2.x - rotated_rectangle_vectors.dot0.x,
                                     rotated_rectangle2_vectors.dot2.y - rotated_rectangle_vectors.dot0.y);
    var A = new run.vectorlib.vector(rotated_rectangle_vectors.dot1.x - rotated_rectangle_vectors.dot0.x,
                                     rotated_rectangle_vectors.dot1.y - rotated_rectangle_vectors.dot0.y);
    var B = new run.vectorlib.vector(rotated_rectangle_vectors.dot4.x - rotated_rectangle2_vectors.dot2.x,
                                     rotated_rectangle_vectors.dot4.y - rotated_rectangle2_vectors.dot2.y);

    var projC = C.dot(axis);
    var projA = A.dot(axis);
    var projB = B.dot(axis);

    //prepare the vector arrays which contain all
    //the vectors belong to the boxes
    var vector_box1 = [];
    for (var key in rotated_rectangle_vectors) {
        if (rotated_rectangle_vectors.hasOwnProperty(key)) {
            vector_box1.push(rotated_rectangle_vectors[key]);
        }
    }

    var vector_box2 = [];
    for (var key in rotated_rectangle2_vectors) {
        if (rotated_rectangle2_vectors.hasOwnProperty(key)) {
            vector_box2.push(rotated_rectangle2_vectors[key]);
        }
    }

    console.log(vector_box1);
//good practice not to declare in other ways
//    var vector_box2 = rotated_rectangle2_vectors;
    console.log(vector_box2);
    var projections = run.generic_utils.calculate_min_max_projection(vector_box1, axis);

//minimum projection of box1
//    var minimum_projection_box1 = vector_box1[1].dot(axis);
//    var maximum_projection_box1 = vector_box1[1].dot(axis);
//
//    console.log("proj for box1");
//    for (var k = 2; k < vector_box1.length; k++) {
//        var current_projection1 = vector_box1[k].dot(axis);
//        //console.log(current_projection1);
//        //maximum projection on axis
//        if (minimum_projection_box1 > current_projection1) {
//            minimum_projection_box1 = current_projection1;
//            console.log(current_projection1, minimum_projection_box1);
//
//        }
//        //minimum projection on axis
//        if (current_projection1 > maximum_projection_box1) {
//            maximum_projection_box1 = current_projection1;
//            console.log(current_projection1, maximum_projection_box1);
//
//        }
//    }
//    console.log("for box1::" +minimum_projection_box1, maximum_projection_box1);


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

    if ((maximum_projection_box2 < projections.minimum_projection_box) || (projections.maximum_projection_box < minimum_projection_box2)) {
        console.log("There's a gap between both boxes");
    }
    else {
        console.log("No gap calculated.");
    }

})(physicsEngine || {});