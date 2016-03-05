// shim layer with setTimeout fallback
window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

var requestId;

var physicsEngine = (function (run) {

        //fabric.Object.prototype.transparentCorners = false;
        var x, y, a, b,rect1,rect2,speed,angle,vx,vy,velocity_vector, radians, canvas;
        initialize_variables();
        add_rectangle_to_canvas(canvas, x, y, a, b);

        function initialize_variables(){
            canvas = this.__canvas = new fabric.Canvas('myCanvas');
            x = 10;
            y = 10;
            a = 450;
            b = 50;
            speed = 4;
            angle = 1;
            radians = angle * Math.PI / 180;
            vx = Math.cos(radians) * speed;
            vy = Math.sin(radians) * speed;
            velocity_vector = new run.vectorlib.vector(vx, vy);
        }


        function add_rectangle_to_canvas(canvas, x, y, a, b) {
            rect1 = new fabric.Rect({
                width: 100, height: 100, left: x, top: y, angle: 30,
                fill: 'red'
            });

            //450 50

            rect2 = new fabric.Rect({
                width: 100, height: 100, left: a, top: b, angle: -10,
                fill: 'green'
            });

            canvas.add(rect1, rect2);

        }

        function remove_rectangle_from_canvas() {
            canvas.clear().renderAll()
        }


        function main() {
            remove_rectangle_from_canvas();
            var rotated_rectangle_vectors = run.vector_manipulators.modify_fabric_vector_names_to_custom(rect1.oCoords);
            var rotated_rectangle2_vectors = run.vector_manipulators.modify_fabric_vector_names_to_custom(rect2.oCoords);

            var check = run.collision_utils.polygon_collision_result(rotated_rectangle_vectors, rotated_rectangle2_vectors, velocity_vector);
            if (check.intersect) {
                rect1.setOpacity(0.5);
                x += (velocity_vector.x + check.minimum_translation_vector.x);
                y += (velocity_vector.y + check.minimum_translation_vector.y);
                add_rectangle_to_canvas(canvas, x, y, a, b);

            }
            else {
                rect1.setOpacity(1);
                x += velocity_vector.x;
                y += velocity_vector.y;
                add_rectangle_to_canvas(canvas, x, y, a, b);
            }

            requestId = requestAnimFrame(main);
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

        return {
            main: main,
            add_rectangle_to_canvas: add_rectangle_to_canvas,
            initialize_variables: initialize_variables
        };

})(physicsEngine || {});


function start() {
    physicsEngine.initialize_variables();
    physicsEngine.main()
}

function reset(){
    stop();
    physicsEngine.initialize_variables();
    start();
}

function stop() {
    if (requestId) {
        window.cancelAnimationFrame(requestId);
        requestId = undefined;
    }
}