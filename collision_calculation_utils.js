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

        return {
            calculate_min_max_projection: this.calculate_min_max_projection
        }

    })();

    return run

})(physicsEngine || {});

