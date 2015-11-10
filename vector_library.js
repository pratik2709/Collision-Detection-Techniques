var physicsEngine = (function (run) {

    run.vectorlib = (function(){
        var Vector = function (x, y) {
            this.x = x || 0;
            this.y = y || 0;

        };

        //get the dot product
        //'this' refers to 'this object'
        Vector.prototype.dot = function (other) {
            return this.x * other.x + this.y * other.y
        };


        //square the vector
        Vector.prototype.square = function () {
            return this.dot(this);
        };

        //magnitude of the vector
        Vector.prototype.magnitude = function () {
            return Math.sqrt(this.square());
        };

        //normalize a vector
        Vector.prototype.normalize = function () {
            var magnitude = this.magnitude();
            console.log(magnitude);
            if (magnitude > 0) {
                this.x /= magnitude;
                this.y /= magnitude;
            }
            return this;
        };

        Vector.prototype.scale = function (scale_value) {
            this.x *= scale_value;
            this.y *= scale_value;
            return this;
        };

        return {
            vector: Vector
        }

    })();


    return run

})(physicsEngine || {});