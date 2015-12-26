var physicsEngine = (function (run) {

    run.vector_manipulators = (function () {

        this.prepare_vectors = function(rotated_rectangle_vectors){
            var vector_box = [];
            for (var key in rotated_rectangle_vectors) {
                if (rotated_rectangle_vectors.hasOwnProperty(key)) {
                    vector_box.push(rotated_rectangle_vectors[key]);
                }
            }
            return vector_box
        };

        this.modify_fabric_vector_names_to_custom = function(points) {
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
        };

        return {
            prepare_vectors: this.prepare_vectors,
            modify_fabric_vector_names_to_custom: this.modify_fabric_vector_names_to_custom

        }

    })();

    return run

})(physicsEngine || {});

