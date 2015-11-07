var physicsEngine = (function (run) {

    run.Vector = (function () {
        this.createVector = function (x, y) {
            this.x = x || 0;
            this.y = y || 0;

            return this;
        };

        //get the dot product
        //'this' refers to 'this object'
        this.dot = function (other) {
            return this.x * other.x + this.y * other.y
        };


        //square the vector
        this.square = function () {
            return this.dot(this);
        };

        //magnitude of the vector
        this.magnitude = function () {
            return Math.sqrt(this.square());
        };

        //normalize a vector
        this.normalize = function () {
            var magnitude = this.magnitude;
            if (magnitude > 0) {
                this.x /= magnitude;
                this.y /= magnitude;
            }
            return this;
        };

        return {
            createVector: this.createVector,
            dot: this.dot,
            square: this.square,
            magnitude: this.magnitude
        }

    })();

    return run

})(physicsEngine || {});