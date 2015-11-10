var physicsEngine = (function (run) {

    var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext('2d');
    var rectangle = {

        x: 1,
        y: 900,
        w: 50,
        h: 50
    };

    var rectangle2 = {
        x: 250,
        y: 900,
        w: 50,
        h: 50
    };


    var transform_object = new run.transform_library.transform();
    transform_object.rotate(-45 * (3.14) / 180);

    var rotation_points = run.generic_utils.get_rotation_points(transform_object, rectangle);
    var rotated_rectangle_vectors = run.generic_utils.get_vectors(rotation_points);

    var color = "#00FF00";
    run.draw.drawLine(context, rotated_rectangle_vectors.dot1, rotated_rectangle_vectors.dot2, color);
    run.draw.drawLine(context, rotated_rectangle_vectors.dot2, rotated_rectangle_vectors.dot3, color);
    run.draw.drawLine(context, rotated_rectangle_vectors.dot3, rotated_rectangle_vectors.dot4, color);
    run.draw.drawLine(context, rotated_rectangle_vectors.dot4, rotated_rectangle_vectors.dot1, color);

    var transform_object1 = new run.transform_library.transform();
    transform_object1.rotate(-30 * (3.14) / 180);
    var rotation_points_for_rectangle2 = run.generic_utils.get_rotation_points(transform_object1, rectangle2);
    var rotated_rectangle2_vectors = run.generic_utils.get_vectors(rotation_points_for_rectangle2);


    run.draw.drawLine(context, rotated_rectangle2_vectors.dot1, rotated_rectangle2_vectors.dot2, color);
    run.draw.drawLine(context, rotated_rectangle2_vectors.dot2, rotated_rectangle2_vectors.dot3, color);
    run.draw.drawLine(context, rotated_rectangle2_vectors.dot3, rotated_rectangle2_vectors.dot4, color);
    run.draw.drawLine(context, rotated_rectangle2_vectors.dot4, rotated_rectangle2_vectors.dot1, color);

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
    var vector_box1 = this.prepare_vectors(rotated_rectangle_vectors);
    var vector_box2 = this.prepare_vectors(rotated_rectangle2_vectors);


    //console.log(vector_box1);
    //console.log(vector_box2);
    //var projections_for_box1 = run.generic_utils.calculate_min_max_projection(vector_box1, axis);
    //var projections_for_box2 = run.generic_utils.calculate_min_max_projection(vector_box2, axis);
    //
    //
    //var gap = projC - (projA + projB);
    //console.log("The gap is:: " + gap);
    //
    //if ((projections_for_box2.maximum_projection_box < projections_for_box1.minimum_projection_box) ||
    //    (projections_for_box1.maximum_projection_box < projections_for_box2.minimum_projection_box)) {
    //    console.log("There's a gap between both boxes");
    //}
    //else {
    //    console.log("No gap calculated.");
    //}

    // calculate normal function
    // get dots of the boxes
    // calculate left normals
    // display onscreen using the draw module
    //**********
    var normals1 = get_normals(vector_box1);
    var normals2 = get_normals(vector_box2);
    //console.log(normals1);
    //
    //console.log(axis);
    //console.log(normals1[2]);
    //var result_p1 = run.generic_utils.calculate_min_max_projection(vector_box1, normals1[2]);
    //var result_p2 = run.generic_utils.calculate_min_max_projection(vector_box2, normals1[2]);
    //
    //if ((result_p2.maximum_projection_box < result_p1.minimum_projection_box) ||
    //    (result_p1.maximum_projection_box < result_p2.minimum_projection_box))
    //{
    //    console.log("There's a gap between both boxes");
    //}
    //else {
    //    console.log("No gap calculated.");
    //}

    var isSeparated = false;

    //checks only 2 and total 4 if needed because 2 lie on the same plane
    for (var i = 1; i < normals1.length - 1; i++) {
        var result_box1 = run.generic_utils.calculate_min_max_projection(vector_box1, normals1[i]);
        var result_box2 = run.generic_utils.calculate_min_max_projection(vector_box2, normals1[i]);

        isSeparated = result_box1.maximum_projection_box < result_box2.minimum_projection_box || result_box2.maximum_projection_box < result_box1.minimum_projection_box
        if (isSeparated) {
            break;
        }
    }
    if (!isSeparated) {
        for (var j = 1; j < normals2.length - 1; j++) {
            var result_P1 = run.generic_utils.calculate_min_max_projection(vector_box1, normals1[j]);
            var result_P2 = run.generic_utils.calculate_min_max_projection(vector_box2, normals1[j]);

            isSeparated = result_P1.maximum_projection_box < result_P2.minimum_projection_box || result_P2.maximum_projection_box < result_P1.minimum_projection_box
            if (isSeparated) {
                break;
            }
        }
    }

    //isSeparated = separate_p || separate_Q || separate_R || separate_S
    if (isSeparated) {
        console.log("Separated boxes");
    } else {
        console.log("Collided boxes.");
    }


    function get_normals(vector_box) {
        var normal_box = [];
        //start from 1 because index 0 is center
        var dx = 0;
        var dy = 0;
        var normalized_vector = 0;
        console.log("temp_vector");

        //starts from 1 because 0 is center and last one is pushed seperately
        for (var index = 1; index < vector_box.length - 1; index++) {
            dx = vector_box[index + 1].x - vector_box[index].x;
            dy = vector_box[index + 1].y - vector_box[index].y;
            normalized_vector = new run.vectorlib.vector(dx, dy);
            normalized_vector.normalize();
            var temp_vector = new run.vectorlib.vector(-normalized_vector.y, normalized_vector.x);
            console.log(temp_vector);
            normal_box.push(temp_vector);

            var Dx = vector_box[index].x + 5 * normalized_vector.x;
            var Dy = vector_box[index].y + 5 * normalized_vector.y;
            var draw_to = new run.vectorlib.vector(Dx, Dy);

            run.draw.drawLine(context, vector_box[index], draw_to, "red");
        }
        //add the last remaining normal
        dx = vector_box[1].x - vector_box[4].x;
        dy = vector_box[1].y - vector_box[4].y;
        normalized_vector = new run.vectorlib.vector(dx, dy);
        normalized_vector.normalize();
        var temp_vector1 = new run.vectorlib.vector(-normalized_vector.y, normalized_vector.x);
        console.log(temp_vector1);
        normal_box.push(temp_vector1);

        return normal_box;
    }


})(physicsEngine || {});