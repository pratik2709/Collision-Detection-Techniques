var physicsEngine = (function (run) {

    //var canvas = document.getElementById('myCanvas');
    //var context = canvas.getContext('2d');
    //var rectangle = {
    //
    //    x: 1,
    //    y: 900,
    //    w: 50,
    //    h: 50
    //};
    //
    //var rectangle2 = {
    //    x: 250,
    //    y: 900,
    //    w: 50,
    //    h: 50
    //};

    var canvas = this.__canvas = new fabric.Canvas('myCanvas');
    var context = canvas.getContext('2d');
    fabric.Object.prototype.transparentCorners = false;

    var rect1 = new fabric.Rect({
                                    width: 100, height: 100, left: 0, top: 50, angle: 30,
                                    fill: 'red'
                                });

    var rect2 = new fabric.Rect({
                                    width: 100, height: 100, left: 350, top: 250, angle: -10,
                                    fill: 'green'
                                });






    canvas.add(rect1, rect2);
    //console.log(rect1);
    //var rotated_rectangle_vectors = get_vectors_modified(rect2.oCoords);
    //run.draw.drawPolygonWithLines(context, rotated_rectangle_vectors, "red");
    canvas.on({
                  'object:moving': onChange,
                  'object:scaling': onChange,
                  'object:rotating': onChange
              });

    function onChange(options) {
        options.target.setCoords();
        canvas.forEachObject(function(obj) {
            if (obj === options.target) return;
            console.log("*****************************");
            console.log(obj.oCoords);
            console.log(options.target.oCoords);
            var rotated_rectangle_vectors = get_vectors_modified(obj.oCoords);
            var rotated_rectangle2_vectors = get_vectors_modified(options.target.oCoords);
            var check = is_colliding(rotated_rectangle_vectors, rotated_rectangle2_vectors);
            if (check){
                obj.setOpacity(0.5);
            }
            else {
                obj.setOpacity(1);
            }

        });
    }

    //var rotated_rectangle_vectors = run.generic_utils.get_vectors(rotation_points);
    //
    //var rotated_rectangle2_vectors = run.generic_utils.get_vectors(rotation_points_for_rectangle2);

    function get_vectors_modified(points){
        var dot4 = new run.vectorlib.vector(points.tl.x, points.tl.y);
        var dot1 = new run.vectorlib.vector(points.tr.x, points.tr.y);
        var dot2 = new run.vectorlib.vector(points.br.x, points.br.y);
        var dot3 = new run.vectorlib.vector(points.bl.x, points.bl.y);
        var dot0 = new run.vectorlib.vector(points.bl.x, points.bl.y);

        return {
            dot0: dot0,
            dot1: dot1,
            dot2: dot2,
            dot3: dot3,
            dot4: dot4

        }
    }


    function is_colliding(rotated_rectangle_vectors, rotated_rectangle2_vectors){
        var vector_box1 = this.prepare_vectors(rotated_rectangle_vectors);
        var vector_box2 = this.prepare_vectors(rotated_rectangle2_vectors);

        var normals1 = run.generic_utils.get_normals(vector_box1);
        var normals2 = run.generic_utils.get_normals(vector_box2);

        var isSeparated = false;

        //checks only 2 and total 4 if needed because 2 lie on the same plane
        for (var i = 1; i < normals1.length -1; i++) {
            var result_box1 = run.generic_utils.calculate_min_max_projection(vector_box1, normals1[i]);
            var result_box2 = run.generic_utils.calculate_min_max_projection(vector_box2, normals1[i]);

            isSeparated = run.generic_utils.check_is_separated(result_box1, result_box2);
            if (isSeparated) {
                break;
            }
        }
        if (!isSeparated) {
            for (var j = 1; j < normals2.length -1; j++) {
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
            return false;
        } else {
            console.log("Collided boxes.");
            return true;
        }

    }



})(physicsEngine || {});