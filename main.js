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
    fabric.Object.prototype.transparentCorners = false;
    var x = 10;
    var y = 10;
    var rect1;
    var rect2;
    var speed = 4;
    var angle = 1;
    var radians = angle * Math.PI / 180;
    var vx = Math.cos(radians) * speed;
    var vy = Math.sin(radians) * speed;
    var velocity_vector = new run.vectorlib.vector(vx, vy);
    add_rectangle_to_canvas(canvas, x, y);

    function add_rectangle_to_canvas(canvas, x, y) {
        rect1 = new fabric.Rect({
            width: 100, height: 100, left: x, top: y, angle: 30,
            fill: 'red'
        });

        rect2 = new fabric.Rect({
            width: 100, height: 100, left: 450, top: 50, angle: -10,
            fill: 'green'
        });

        canvas.add(rect1, rect2);

    }

    function remove_rectangle_from_canvas() {
        canvas.clear().renderAll()
    }

    main();

    function main() {
        remove_rectangle_from_canvas();
        var rotated_rectangle_vectors = run.vector_manipulators.modify_fabric_vector_names_to_custom(rect1.oCoords);
        var rotated_rectangle2_vectors = run.vector_manipulators.modify_fabric_vector_names_to_custom(rect2.oCoords);

        var check = run.collision_utils.polygon_collision_result(rotated_rectangle_vectors, rotated_rectangle2_vectors, velocity_vector);
        if (check.intersect) {
            rect1.setOpacity(0.5);
            velocity_vector.add(check.minimum_translation_vector);
            x += velocity_vector.x;
            y += velocity_vector.y;
            //velocity_vector = new run.vectorlib.vector(vx, vy);
            add_rectangle_to_canvas(canvas, x, y);

        }
        else {
            rect1.setOpacity(1);
            x += velocity_vector.x;
            y += velocity_vector.y;
            //velocity_vector = new run.vectorlib.vector(vx, vy);
            add_rectangle_to_canvas(canvas, x, y);
        }

        requestAnimFrame(main);
    }

    function execute_check(velocity_vector) {
        var rotated_rectangle_vectors = run.vector_manipulators.modify_fabric_vector_names_to_custom(rect1.oCoords);
        var rotated_rectangle2_vectors = run.vector_manipulators.modify_fabric_vector_names_to_custom(rect2.oCoords);

        var check = run.collision_utils.polygon_collision_result(rotated_rectangle_vectors, rotated_rectangle2_vectors, velocity_vector);
        if (check.intersect) {
            rect1.setOpacity(0.5);
        }
        else {
            rect1.setOpacity(1);
        }
    }


    function onChange(options) {
        options.target.setCoords();
        canvas.forEachObject(function (obj) {
            if (obj === options.target) {
                return;
            }

            var rotated_rectangle_vectors = run.vector_manipulators.modify_fabric_vector_names_to_custom(obj.oCoords);
            var rotated_rectangle2_vectors = run.vector_manipulators.modify_fabric_vector_names_to_custom(options.target.oCoords);
            var velocity_vector = calculate_velocity(rotated_rectangle_vectors);

            var check = run.collision_utils.polygon_collision_result(rotated_rectangle_vectors, rotated_rectangle2_vectors, velocity_vector);
            if (check.intersect) {
                obj.setOpacity(0.5);
            }
            else {
                obj.setOpacity(1);
            }

        });
    }

    function calculate_velocity(rotated_rectangle_vectors) {
        //calculate the velocity vector
        // use x and y co-ordinates of the rectangles (dot 4)
        // multiply with unit vector in the east direction
        // no change in direction constraint
        var unitvectoreast = new run.vectorlib.vector(1, 0);

        return rotated_rectangle_vectors.dot4.dot(unitvectoreast);
    }


})(physicsEngine || {});