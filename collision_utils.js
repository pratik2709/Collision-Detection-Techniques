var physicsEngine = (function (run) {

    run.collision_utils = (function () {

        this.polygon_collision_result = function(rotated_rectangle_vectors, rotated_rectangle2_vectors, velocity_vector) {
            var vector_box1 = run.vector_manipulators.prepare_vectors(rotated_rectangle_vectors);
            var vector_box2 = run.vector_manipulators.prepare_vectors(rotated_rectangle2_vectors);

            var normals1 = run.generic_utils.get_normals(vector_box1);
            var normals2 = run.generic_utils.get_normals(vector_box2);
            var normals = normals1.concat(normals2);
            var mtvx;
            var mtvy;


            var intersect = false;
            var will_intersect = false;
            var minimum_interval_distance = Number.POSITIVE_INFINITY;
            var translation_axis;
            var minimum_translation_vector;
            var interval_distance;
            var velocity_projection;
            var center;
            for (var i = 0; i < normals.length; i++) {
                var result_box1 = run.generic_utils.calculate_min_max_projection(vector_box1, normals[i]);
                var result_box2 = run.generic_utils.calculate_min_max_projection(vector_box2, normals[i]);

                interval_distance = run.generic_utils.calculate_interval_distance(result_box1.minimum_projection_box,
                                                                                  result_box1.maximum_projection_box,
                                                                                  result_box2.minimum_projection_box,
                                                                                  result_box2.maximum_projection_box);


                if (interval_distance > 0) {
                    intersect = false
                }
                else {
                    intersect = true
                }

                // find if the polygons will intersect
                //projection of velocity on the current axis
                velocity_projection = normals[i].dot(velocity_vector);
                if (velocity_projection < 0) {
                    result_box1.minimum_projection_box += velocity_projection
                }
                else {
                    result_box1.maximum_projection_box += velocity_projection
                }
                // do the interval distance test
                interval_distance = run.generic_utils.calculate_interval_distance(result_box1.minimum_projection_box,
                                                                                  result_box1.maximum_projection_box,
                                                                                  result_box2.minimum_projection_box,
                                                                                  result_box2.maximum_projection_box);

                if (interval_distance > 0) {
                    will_intersect = false
                }
                else {
                    will_intersect = true;
                }

                if (!will_intersect && !intersect) {
                    break;
                }

                // ************************************************

                interval_distance = Math.abs(interval_distance);
                if (interval_distance < minimum_interval_distance) {
                    minimum_interval_distance = interval_distance;
                    translation_axis = normals[i];
                }

                //find vector -using polygons center
                center = rotated_rectangle_vectors.dot0.subtract_vectors(rotated_rectangle2_vectors.dot0);
                if (center.dot(normals[i]) < 0) {
                    translation_axis.x = -translation_axis.x;
                    translation_axis.y = -translation_axis.y;

                }
                // calculate the minimum translation vector here
                if (will_intersect) {
                    mtvx = translation_axis.x * minimum_interval_distance;
                    mtvy = translation_axis.y * minimum_interval_distance;
                    minimum_translation_vector = new run.vectorlib.vector(mtvx, mtvy);
                    console.log("2nd MINIMUM");
                    console.log(minimum_translation_vector);

                }
            }


            return {
                intersect: intersect,
                will_intersect: will_intersect,
                minimum_translation_vector: minimum_translation_vector
            }
        };


        return {
            polygon_collision_result: this.polygon_collision_result
        }

    })();

    return run

})(physicsEngine || {});

