// shim layer with setTimeout fallback
window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame       ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        function( callback ){
            window.setTimeout(callback, 1000 / 60);
        };
})();

var physicsEngine = (function (run) {

    main();
    var canvas = this.__canvas = new fabric.Canvas('myCanvas');
    fabric.Object.prototype.transparentCorners = false;

    //function add_rectangle_to_canvas(canvas){
        var rect1 = new fabric.Rect({
                                        width: 100, height: 100, left: 100, top: 50, angle: 30,
                                        fill: 'red'
                                    });

        var rect2 = new fabric.Rect({
                                        width: 100, height: 100, left: 450, top: 50, angle: -10,
                                        fill: 'green'
                                    });

        canvas.add(rect1, rect2);
        canvas.on({
                      'object:moving': onChange,
                      'object:scaling': onChange,
                      'object:rotating': onChange
                  });
    //}

    // move the rectangles using request animframe
    // will also be the main method
    function main(){
        var speed = 4;
        var angle = 305;
        var radians = angle * Math.PI/ 180;
        var vx = Math.cos(radians) * speed;
        var vy = Math.sin(radians) * speed;
        //add_rectangle_to_canvas(canvas);
    }

    function execute_check(){
        rect1.setCoords();
        rect2.setCoords();

        canvas.renderAll();
        var rotated_rectangle_vectors = run.vector_manipulators.modify_fabric_vector_names_to_custom(rect1.oCoords);
        var rotated_rectangle2_vectors = run.vector_manipulators.modify_fabric_vector_names_to_custom(rect2.oCoords);


        var velocity_vector = calculate_velocity(rotated_rectangle_vectors);
        console.log("velocity is::");
        console.log(velocity_vector);
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