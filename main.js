var physicsEngine = (function (run) {


    var canvas = this.__canvas = new fabric.Canvas('myCanvas');
    var context = canvas.getContext('2d');
    fabric.Object.prototype.transparentCorners = false;

    var rect1 = new fabric.Rect({
                                    width: 100, height: 100, left: 100, top: 50, angle: 30,
                                    fill: 'red'
                                });

    var rect2 = new fabric.Rect({
                                    width: 100, height: 100, left: 450, top: 50, angle: -10,
                                    fill: 'green'
                                });


    rect1.animate('left', '+=500', {
        onChange: function () {
            rect1.setCoords();
            rect2.setCoords();

            canvas.renderAll();
            var rotated_rectangle_vectors = get_vectors_modified(rect1.oCoords);
            var rotated_rectangle2_vectors = get_vectors_modified(rect2.oCoords);


            var velocity_vector = calculate_velocity(rotated_rectangle_vectors);
            var check = is_colliding(rotated_rectangle_vectors, rotated_rectangle2_vectors, velocity_vector);
            if (check) {
                rect1.setOpacity(0.5);
            }
            else {
                rect1.setOpacity(1);
            }
        },
        duration: 5000
    });

    rect2.animate('left', '-=500', {
        onChange: function () {
            canvas.renderAll();

        },
        duration: 5000
    });


    canvas.add(rect1, rect2);

    canvas.on({
                  'object:moving': onChange,
                  'object:scaling': onChange,
                  'object:rotating': onChange
              });

    function onChange(options) {
        options.target.setCoords();
        canvas.forEachObject(function (obj) {
            if (obj === options.target) {
                return;
            }
            console.log("*****************************");
            console.log(obj.oCoords);
            console.log(options.target.oCoords);
            var rotated_rectangle_vectors = get_vectors_modified(obj.oCoords);
            var rotated_rectangle2_vectors = get_vectors_modified(options.target.oCoords);
            var velocity_vector = calculate_velocity(rotated_rectangle_vectors);
            var check = is_colliding(rotated_rectangle_vectors, rotated_rectangle2_vectors, velocity_vector);
            if (check) {
                obj.setOpacity(0.5);
            }
            else {
                obj.setOpacity(1);
            }

        });
    }

    function get_vectors_modified(points) {
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

    function calculate_velocity(rotated_rectangle_vectors) {
        //calculate the velocity vector
        // use x and y co-ordinates of the rectangles (dot 4)
        // multiply with unit vector in the east direction
        // no change in direction constraint
        var unitvectoreast = new run.vectorlib.vector(1, 0);

        return rotated_rectangle_vectors.dot4.dot(unitvectoreast);
    }


    function is_colliding(rotated_rectangle_vectors, rotated_rectangle2_vectors, velocity_vector) {
        var vector_box1 = this.prepare_vectors(rotated_rectangle_vectors);
        var vector_box2 = this.prepare_vectors(rotated_rectangle2_vectors);

        var normals1 = run.generic_utils.get_normals(vector_box1);
        var normals2 = run.generic_utils.get_normals(vector_box2);

        var isSeparated = false;

        //checks only 2 and total 4 if needed because 2 lie on the same plane
        isSeparated = intersection_logic(normals1, vector_box1, vector_box2, rotated_rectangle_vectors,
                                         rotated_rectangle2_vectors, velocity_vector);
        if (isSeparated.result) {
            isSeparated = intersection_logic(normals2, vector_box1, vector_box2, rotated_rectangle_vectors,
                                             rotated_rectangle2_vectors, velocity_vector)
        }

        if (isSeparated.result) {
            console.log("Separated boxes");
            return false;
        } else {
            console.log("Collided boxes.");
            return true;
        }

    }

    function intersection_logic(normals, vector_box1, vector_box2, rotated_rectangle_vectors, rotated_rectangle2_vectors, velocity_vector) {
        var isSeparated = false;
        var intersect = false;
        var willintersect = false;
        var minimum_interval_distance = Number.POSITIVE_INFINITY;
        var translation_axis;
        var minimum_translation_vector;
        var interval_distance;
        var velocity_projection;
        var center;
        for (var i = 1; i < normals.length - 1; i++) {
            var result_box1 = run.generic_utils.calculate_min_max_projection(vector_box1, normals[i]);
            var result_box2 = run.generic_utils.calculate_min_max_projection(vector_box2, normals[i]);

            interval_distance = run.generic_utils.interval_distance(result_box1.minimum_projection_box,
                                                                    result_box1.maximum_projection_box,
                                                                    result_box2.minimum_projection_box,
                                                                    result_box2.maximum_projection_box);

            console.log("interval");
            console.log(interval_distance);
            if (interval_distance > 0) {
                //rect1.setColor("red");
                //rect2.setColor("green");
                intersect = false
            }
            else{
                intersect = true
            }
            console.log("INTERSECt");
            console.log(intersect);
            //else {
            //    //rect1.setColor("white");
            //    //rect2.setColor("white");
            //}

            //projection of velocity on the current axis
            velocity_projection = normals[i].dot(velocity_vector);
            if (velocity_projection < 0) {
                result_box1.minimum_projection_box += velocity_projection
            }
            else {
                result_box1.maximum_projection_box += velocity_projection
            }
            // do the interval distance test
            interval_distance = run.generic_utils.interval_distance(result_box1.minimum_projection_box,
                                                                    result_box1.maximum_projection_box,
                                                                    result_box2.minimum_projection_box,
                                                                    result_box2.maximum_projection_box);

            if (interval_distance > 0) {
                willintersect = false
            }

            if (!willintersect && !intersect) {
                break;
            }

            interval_distance = Math.abs(interval_distance);
            if (interval_distance < minimum_interval_distance) {
                minimum_interval_distance = interval_distance;
                translation_axis = normals[i]
            }

            //find vector -using polygons center
            center = rotated_rectangle_vectors.dot0.subtract_vectors(rotated_rectangle2_vectors.dot0);
            if (center.dot(normals[i]) < 0) {
                translation_axis = -translation_axis
            }

            //isSeparated = run.generic_utils.check_is_separated(result_box1, result_box2);
            //if (isSeparated) {
            //    break;
            //}
        }

        return {
            result: intersect,
            minimum_translation_vector: minimum_translation_vector
        }
    }


})(physicsEngine || {});