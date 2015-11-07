var physicsEngine = (function (run) {

    run.draw = (function () {


        this.drawPolygon = function(context, x, y, w, h, color) {
            context.beginPath();
            context.rect(x, y, w, h);
            context.fillStyle = "#FE8E9D";
            context.fill();
            context.lineWidth = 5;
            context.strokeStyle = "green";
            context.stroke();
        };

        this.drawLine = function(context, d1, d2) {

            //context.beginPath();
            context.moveTo(d1.x, d1.y);
            context.lineTo(d2.x, d2.y);
            context.strokeStyle = "#00FF00";
            context.lineWidth = 5;
            //context.closePath();
            context.stroke();
            context.fillStyle="red";
            context.fill();

        };


        return {
            drawPolygon: this.drawPolygon,
            drawLine: this.drawLine,
            rectangle: this.rectangle,
            rectangle2: this.rectangle2
        }

    })();

    return run

})(physicsEngine || {});
