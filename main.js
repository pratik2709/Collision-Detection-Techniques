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

    var obj1 = {

        dot0:  new run.vectorlib.vector(448.8863550888934, 232.0559542679674),
        dot1:  new run.vectorlib.vector(448.8863550888934, 232.0559542679674),
        dot2:  new run.vectorlib.vector(466.4248210332534, 331.5215373222004),
        dot3:  new run.vectorlib.vector(366.95923797902043,349.06000326656033),
        dot4:  new run.vectorlib.vector(349.42077203466044, 249.59442021232735)
    };

    var obj2 = {

        dot0:  new run.vectorlib.vector(448.8863550888934, 232.0559542679674),
        dot1:  new run.vectorlib.vector(554.2478274693435, 141.72385807660848),
        dot2:  new run.vectorlib.vector(503.7478274693435, 229.19242385883678),
        dot3:  new run.vectorlib.vector(416.27926168711525, 178.69242385883678),
        dot4:  new run.vectorlib.vector(466.77926168711525, 91.22385807660848)
    };



    var transform_object = new run.transform_library.transform();
    transform_object.rotate(-45 * (3.14) / 180);

    var rotation_points = run.generic_utils.get_rotation_points(transform_object, rectangle);
    var rotated_rectangle_vectors = obj1;

    var color = "#00FF00";
    run.draw.drawPolygonWithLines(context, obj1, color);


    var transform_object1 = new run.transform_library.transform();
    transform_object1.rotate(-30 * (3.14) / 180);
    var rotation_points_for_rectangle2 = run.generic_utils.get_rotation_points(transform_object1, rectangle2);
    var rotated_rectangle2_vectors = obj2;

    run.draw.drawPolygonWithLines(context, obj2, color);


    var vector_box1 = this.prepare_vectors(rotated_rectangle_vectors);
    var vector_box2 = this.prepare_vectors(rotated_rectangle2_vectors);

    var normals1 = run.generic_utils.get_normals(vector_box1);
    var normals2 = run.generic_utils.get_normals(vector_box2);
    console.log(normals1);
    console.log(normals2);


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
            var result_P1 = run.generic_utils.calculate_min_max_projection(vector_box1, normals2[j]);
            var result_P2 = run.generic_utils.calculate_min_max_projection(vector_box2, normals2[j]);

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