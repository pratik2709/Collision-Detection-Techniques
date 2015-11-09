var physicsEngine = (function (run) {

    run.generic_utils = (function () {


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
                dot4: dot4,
                dot1: dot1,
                dot2: dot2,
                dot3: dot3,
                dot0: dot0
            }
        };

        return {
            get_rotation_points: this.get_rotation_points,
            get_vectors: this.get_vectors
        }

    })();

    return run

})(physicsEngine || {});
