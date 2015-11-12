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
    run.draw.drawPolygonWithLines(context, rotated_rectangle_vectors, color);


    var transform_object1 = new run.transform_library.transform();
    transform_object1.rotate(-30 * (3.14) / 180);
    var rotation_points_for_rectangle2 = run.generic_utils.get_rotation_points(transform_object1, rectangle2);
    var rotated_rectangle2_vectors = run.generic_utils.get_vectors(rotation_points_for_rectangle2);


    run.draw.drawPolygonWithLines(context, rotated_rectangle2_vectors, color);


    //prepare the vector arrays which contain all
    //the vectors belong to the boxes
    var vector_box1 = this.prepare_vectors(rotated_rectangle_vectors);
    var vector_box2 = this.prepare_vectors(rotated_rectangle2_vectors);


    // calculate normal function
    // get dots of the boxes
    // calculate left normals
    // display onscreen using the draw module
    //**********
    var normals1 = get_normals(vector_box1);
    var normals2 = get_normals(vector_box2);

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