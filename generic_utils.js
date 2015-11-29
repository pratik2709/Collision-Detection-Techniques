var physicsEngine = (function (run) {

    run.generic_utils = (function () {

        this.calculate_minimum_translation_vector = function(){


        };

        this.calculate_min_max_projection = function(vector_box, axis){
            var minimum_projection_box = vector_box[1].dot(axis);
            var maximum_projection_box = vector_box[1].dot(axis);

            //0 is center, 1 is already initialized so starting from 2
            for (var k = 2; k < vector_box.length; k++) {
                var current_projection1 = vector_box[k].dot(axis);

                if (minimum_projection_box > current_projection1) {
                    minimum_projection_box = current_projection1;
                }

                //minimum projection on axis
                if (current_projection1 > maximum_projection_box) {
                    maximum_projection_box = current_projection1;

                }
            }
            return {
                minimum_projection_box: minimum_projection_box,
                maximum_projection_box: maximum_projection_box
            }
        };

        this.calculate_interval_distance = function(minimumA, maximumA, minimumB, maximumB){
            if(minimumB > maximumA){
                return minimumB - maximumA
            }
            else{
                // imagine in terms of boxes overlapping and having crossed each other
                return minimumA - maximumB
            }

        };

        this.get_normals = function(vector_box){
            var normal_box = [];
            //start from 1 because index 0 is center
            var dx = 0;
            var dy = 0;
            var normalized_vector = 0;
            var temp_vector;

            //starts from 1 because 0 is center and last one is pushed seperately
            for (var index = 1; index < vector_box.length - 1; index++) {
                dx = vector_box[index + 1].x - vector_box[index].x;
                dy = vector_box[index + 1].y - vector_box[index].y;
                normalized_vector = new run.vectorlib.vector(dx, dy);
                normalized_vector.normalize();
                temp_vector = new run.vectorlib.vector(-normalized_vector.y, normalized_vector.x);
                normal_box.push(temp_vector);
            }
            //add the last remaining normal
            dx = vector_box[1].x - vector_box[4].x;
            dy = vector_box[1].y - vector_box[4].y;
            normalized_vector = new run.vectorlib.vector(dx, dy);
            normalized_vector.normalize();
            temp_vector = new run.vectorlib.vector(-normalized_vector.y, normalized_vector.x);
            normal_box.push(temp_vector);
            return normal_box;
        };

        this.check_is_separated = function(box1, box2){
            return box1.maximum_projection_box < box2.minimum_projection_box ||
            box2.maximum_projection_box < box1.minimum_projection_box;
        };

        return {
            calculate_min_max_projection: this.calculate_min_max_projection,
            get_normals: this.get_normals,
            check_is_separated: this.check_is_separated,
            calculate_interval_distance: this.calculate_interval_distance
        }

    })();

    return run

})(physicsEngine || {});
