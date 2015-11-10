var physicsEngine = (function (run) {

    run.generic_utils = (function () {

        this.prepare_vectors = function(rotated_rectangle_vectors){
            var vector_box = [];
            for (var key in rotated_rectangle_vectors) {
                if (rotated_rectangle_vectors.hasOwnProperty(key)) {
                    vector_box.push(rotated_rectangle_vectors[key]);
                }
            }
            return vector_box
        };


        this.get_rotation_points = function (transform_object, rectangle) {
            var rotation_point_d4 = transform_object.transformPoint(rectangle.x, rectangle.y);
            var rotation_point_d1 = transform_object.transformPoint(rectangle.x + rectangle.w, rectangle.y);
            var rotation_point_d2 = transform_object.transformPoint(rectangle.x + rectangle.w,
                                                                     rectangle.y + rectangle.h);
            var rotation_point_d3 = transform_object.transformPoint(rectangle.x, rectangle.y + rectangle.h);
            var rotation_point_d0 = transform_object.transformPoint(rectangle.x + (rectangle.w) / 2,
                                                                     rectangle.y + (rectangle.h) / 2);

            return {
                d4: rotation_point_d4,
                d1: rotation_point_d1,
                d2: rotation_point_d2,
                d3: rotation_point_d3,
                d0: rotation_point_d0
            }
        };

        this.get_vectors = function(points){
            var dot4 = new run.vectorlib.vector(points.d4[0], points.d4[1]);
            var dot1 = new run.vectorlib.vector(points.d1[0], points.d1[1]);
            var dot2 = new run.vectorlib.vector(points.d2[0], points.d2[1]);
            var dot3 = new run.vectorlib.vector(points.d3[0], points.d3[1]);
            var dot0 = new run.vectorlib.vector(points.d0[0], points.d0[1]);

            return {
                dot0: dot0,
                dot1: dot1,
                dot2: dot2,
                dot3: dot3,
                dot4: dot4

            }
        };

        this.calculate_min_max_projection = function(vector_box, axis){
            var minimum_projection_box = vector_box[1].dot(axis);
            var maximum_projection_box = vector_box[1].dot(axis);

            //0 is center, 1 is already initialized so starting from 2
            for (var k = 2; k < vector_box.length; k++) {
                var current_projection1 = vector_box[k].dot(axis);

                if (minimum_projection_box > current_projection1) {
                    minimum_projection_box = current_projection1;
                    console.log(current_projection1, minimum_projection_box);

                }
                //minimum projection on axis
                if (current_projection1 > maximum_projection_box) {
                    maximum_projection_box = current_projection1;
                    console.log(current_projection1, maximum_projection_box);

                }
            }
            console.log("for box1::" +minimum_projection_box, maximum_projection_box);
            return {
                minimum_projection_box: minimum_projection_box,
                maximum_projection_box: maximum_projection_box
            }
        };

        return {
            get_rotation_points: this.get_rotation_points,
            get_vectors: this.get_vectors,
            calculate_min_max_projection: this.calculate_min_max_projection,
            prepare_vectors: this.prepare_vectors
        }

    })();

    return run

})(physicsEngine || {});
