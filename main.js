// shim layer with setTimeout fallback
window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();


var physicsEngine = (function (run) {

    var canvas = this.__canvas = new fabric.Canvas('myCanvas');
    var context = canvas.getContext('2d');
    fabric.Object.prototype.transparentCorners = false;
    var velocity1 = new run.vectorlib.vector(Math.random() * 10, 0);
    var velocity2 = new run.vectorlib.vector(0, 0);

    var rect1 = new fabric.Rect({
                                    width: 100, height: 100, left: 0, top: 150, angle: 30,
                                    fill: 'red', velocity: velocity1
                                });

    var rect2 = new fabric.Rect({
                                    width: 100, height: 100, left: 550, top: 250, angle: -10,
                                    fill: 'green', velocity: velocity2
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

            var rotated_rectangle_vectors = get_vectors_modified(obj.oCoords);
            var rotated_rectangle2_vectors = get_vectors_modified(options.target.oCoords);
            var check = is_colliding(rotated_rectangle_vectors, rotated_rectangle2_vectors);
            if (check) {
                obj.setOpacity(0.5);

            }
            else {
                obj.setOpacity(1);
            }

        });
    }

    rect1.animate('left', '+=1000', {
        onChange: function () {
            rect1.setCoords();
            rect2.setCoords();

            canvas.renderAll();
            var rotated_rectangle_vectors = get_vectors_modified(rect1.oCoords);
            var rotated_rectangle2_vectors = get_vectors_modified(rect2.oCoords);


            var velocity_vector = calculate_velocity(rotated_rectangle_vectors);
            var check = is_colliding(rotated_rectangle_vectors, rotated_rectangle2_vectors, velocity_vector);
            console.log("check");
            console.log(check);
            if (check.result) {
                rect1.setOpacity(0.5);
            }
            else {
                rect1.setOpacity(1);
            }
        },
        duration: 5000
    });

    rect2.animate('left', '-=1000', {
        onChange: function () {
            canvas.renderAll();

        },
        duration: 5000
    });

    function resolve_collision() {
        //calculate relative velocity
        var relative_velocity = rect1.velocity.subtract_vectors(rect2.velocity);

        //calculate normal

    }

    function calculate_velocity(rotated_rectangle_vectors){
        //calculate the velocity vector
        // use x and y co-ordinates of the rectangles (dot 4)
        // multiply with unit vector in the east direction
        // no change in direction constraint
        var unitvectoreast = new run.vectorlib.vector(1, 0);

        console.log("dot4::");
        console.log(rotated_rectangle_vectors.dot4);
        return rotated_rectangle_vectors.dot4.dot(unitvectoreast);
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


    function is_colliding(rotated_rectangle_vectors, rotated_rectangle2_vectors, velocity_vector) {
        var vector_box1 = this.prepare_vectors(rotated_rectangle_vectors);
        var vector_box2 = this.prepare_vectors(rotated_rectangle2_vectors);

        var normals1 = run.generic_utils.get_normals(vector_box1);
        var normals2 = run.generic_utils.get_normals(vector_box2);

        var isSeparated = false;
        var intersect = false;
        var willintersect = false;
        var minimum_interval_distance = Number.POSITIVE_INFINITY;
        var translation_axis;
        var minimum_translation_vector;
        var interval_distance;
        var velocity_projection;
        var center;

        //checks only 2 and total 4 if needed because 2 lie on the same plane
        for (var i = 1; i < normals1.length - 1; i++) {
            var result_box1 = run.generic_utils.calculate_min_max_projection(vector_box1, normals1[i]);
            var result_box2 = run.generic_utils.calculate_min_max_projection(vector_box2, normals1[i]);

            // minimum max projections calculated
            // calculate interval distance
            //interval_distance = run.generic_utils.interval_distance(result_box1.minimum_projection_box,
            //                                                            result_box1.maximum_projection_box,
            //                                                            result_box2.minimum_projection_box,
            //                                                            result_box2.maximum_projection_box);
            //console.log("interval distance is::");
            //console.log(interval_distance);
            //if(interval_distance > 0){
            //    rect1.setColor("red");
            //    rect2.setColor("green");
            //    intersect = false
            //}
            //else{
            //    //rect1.setColor("white");
            //    rect2.setColor("white");
            //}
            //
            ////projection of velocity on the current axis
            //velocity_projection = normals1[i].dot(velocity_vector);
            //if(velocity_projection < 0){
            //    result_box1.minimum_projection_box += velocity_projection
            //}
            //else {
            //    result_box1.maximum_projection_box += velocity_projection
            //}
            //// do the interval distance test
            //interval_distance = run.generic_utils.interval_distance(result_box1.minimum_projection_box,
            //                                                            result_box1.maximum_projection_box,
            //                                                            result_box2.minimum_projection_box,
            //                                                            result_box2.maximum_projection_box);
            //
            //if(interval_distance > 0){
            //    willintersect = false
            //}
            //
            //if(!willintersect && !intersect){
            //    break;
            //}
            //
            //interval_distance = Math.abs(interval_distance);
            //if(interval_distance < minimum_interval_distance){
            //    minimum_interval_distance = interval_distance;
            //    translation_axis = normals1[i]
            //}
            //
            ////find vector -using polygons center
            //center = rotated_rectangle_vectors.dot0.subtract_vectors(rotated_rectangle2_vectors.dot0)
            //if(center.dot(normals1[i]) < 0){
            //    translation_axis = -translation_axis
            //}


            isSeparated = run.generic_utils.check_is_separated(result_box1, result_box2);
            if (isSeparated) {
                break;
            }
        }
        if (!isSeparated) {
            for (var j = 1; j < normals2.length - 1; j++) {
                var result_P1 = run.generic_utils.calculate_min_max_projection(vector_box1, normals2[j]);
                var result_P2 = run.generic_utils.calculate_min_max_projection(vector_box2, normals2[j]);

                //***************************************
                // minimum max projections calculated
                // calculate interval distance
                //interval_distance = run.generic_utils.interval_distance(result_P1.minimum_projection_box,
                //                                                        result_P1.maximum_projection_box,
                //                                                        result_P2.minimum_projection_box,
                //                                                        result_P2.maximum_projection_box);
                //console.log("interval distance is::");
                //console.log(interval_distance);
                //if(interval_distance > 0){
                //    rect1.setColor("red");
                //    rect2.setColor("green");
                //    intersect = false
                //}
                //else{
                //    //rect1.setColor("white");
                //    rect2.setColor("white");
                //}
                //
                ////projection of velocity on the current axis
                //velocity_projection = normals2[j].dot(velocity_vector);
                //if(velocity_projection < 0){
                //    result_P1.minimum_projection_box += velocity_projection
                //}
                //else {
                //    result_P2.maximum_projection_box += velocity_projection
                //}
                //// do the interval distance test
                //interval_distance = run.generic_utils.interval_distance(result_P1.minimum_projection_box,
                //                                                        result_P1.maximum_projection_box,
                //                                                        result_P2.minimum_projection_box,
                //                                                        result_P2.maximum_projection_box);
                //
                //if(interval_distance > 0){
                //    willintersect = false
                //}
                //
                //if(!willintersect && !intersect){
                //    break;
                //}
                //
                //interval_distance = Math.abs(interval_distance);
                //if(interval_distance < minimum_interval_distance){
                //    minimum_interval_distance = interval_distance;
                //    translation_axis = normals2[j]
                //}
                //
                ////find vector -using polygons center
                //center = rotated_rectangle_vectors.dot0.subtract_vectors(rotated_rectangle2_vectors.dot0)
                //if(center.dot(normals2[j]) < 0){
                //    translation_axis = -translation_axis
                //}
                //***************************************


                isSeparated = run.generic_utils.check_is_separated(result_P1, result_P2);
                if (isSeparated) {
                    break;
                }
            }
        }

        if(willintersect){
            minimum_translation_vector = translation_axis*minimum_interval_distance
        }


        if (isSeparated) {
            console.log("Separated boxes");
            return {
                result: false,
                minimum_translation_vector: minimum_translation_vector
            }
        } else {
            console.log("Collided boxes.");
            return {
                result: true,
                minimum_translation_vector: minimum_translation_vector
            }
        }

    }

    function intersect_logic(normals1, vector_box1, vector_box2){
        for (var i = 1; i < normals1.length - 1; i++) {
            var result_box1 = run.generic_utils.calculate_min_max_projection(vector_box1, normals1[i]);
            var result_box2 = run.generic_utils.calculate_min_max_projection(vector_box2, normals1[i]);

            // minimum max projections calculated
            // calculate interval distance
            //interval_distance = run.generic_utils.interval_distance(result_box1.minimum_projection_box,
            //                                                            result_box1.maximum_projection_box,
            //                                                            result_box2.minimum_projection_box,
            //                                                            result_box2.maximum_projection_box);
            //console.log("interval distance is::");
            //console.log(interval_distance);
            //if(interval_distance > 0){
            //    rect1.setColor("red");
            //    rect2.setColor("green");
            //    intersect = false
            //}
            //else{
            //    //rect1.setColor("white");
            //    rect2.setColor("white");
            //}
            //
            ////projection of velocity on the current axis
            //velocity_projection = normals1[i].dot(velocity_vector);
            //if(velocity_projection < 0){
            //    result_box1.minimum_projection_box += velocity_projection
            //}
            //else {
            //    result_box1.maximum_projection_box += velocity_projection
            //}
            //// do the interval distance test
            //interval_distance = run.generic_utils.interval_distance(result_box1.minimum_projection_box,
            //                                                            result_box1.maximum_projection_box,
            //                                                            result_box2.minimum_projection_box,
            //                                                            result_box2.maximum_projection_box);
            //
            //if(interval_distance > 0){
            //    willintersect = false
            //}
            //
            //if(!willintersect && !intersect){
            //    break;
            //}
            //
            //interval_distance = Math.abs(interval_distance);
            //if(interval_distance < minimum_interval_distance){
            //    minimum_interval_distance = interval_distance;
            //    translation_axis = normals1[i]
            //}
            //
            ////find vector -using polygons center
            //center = rotated_rectangle_vectors.dot0.subtract_vectors(rotated_rectangle2_vectors.dot0)
            //if(center.dot(normals1[i]) < 0){
            //    translation_axis = -translation_axis
            //}


            isSeparated = run.generic_utils.check_is_separated(result_box1, result_box2);
            if (isSeparated) {
                return isSeparated;
            }
        }
    }


})(physicsEngine || {});