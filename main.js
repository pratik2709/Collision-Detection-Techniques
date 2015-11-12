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


    var vector_box1 = this.prepare_vectors(rotated_rectangle_vectors);
    var vector_box2 = this.prepare_vectors(rotated_rectangle2_vectors);

    var normals1 = run.generic_utils.get_normals(vector_box1);
    var normals2 = run.generic_utils.get_normals(vector_box2);

    var isSeparated = false;

    //checks only 2 and total 4 if needed because 2 lie on the same plane
    for (var i = 1; i < normals1.length - 1; i++) {
        var result_box1 = run.generic_utils.calculate_min_max_projection(vector_box1, normals1[i]);
        var result_box2 = run.generic_utils.calculate_min_max_projection(vector_box2, normals1[i]);

        isSeparated = run.generic_utils.check_is_separated(result_box1, result_box2);
        if (isSeparated) {
            break;
        }
    }
    if (!isSeparated) {
        for (var j = 1; j < normals2.length - 1; j++) {
            var result_P1 = run.generic_utils.calculate_min_max_projection(vector_box1, normals1[j]);
            var result_P2 = run.generic_utils.calculate_min_max_projection(vector_box2, normals1[j]);

            isSeparated = run.generic_utils.check_is_separated(result_P1, result_P2);
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

})(physicsEngine || {});