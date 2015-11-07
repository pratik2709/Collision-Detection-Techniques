var physicsEngine = (function (run) {

    run.draw = (function () {
        var canvas = document.getElementById('myCanvas');
        var context = canvas.getContext('2d');

        this.rectangle = {

            x: 1200,
            y: 1200,
            w: 200,
            h: 200
        };

        this.rectangle2 = {
            x: 800,
            y: 1200,
            w: 200,
            h: 200
        };

        this.drawPolygon = function(x, y, w, h, color) {
            context.beginPath();
            context.rect(x, y, w, h);
            context.fillStyle = "#FE8E9D";
            context.fill();
            context.lineWidth = 5;
            context.strokeStyle = "green";
            context.stroke();
        };

        this.drawLine = function(d1, d2) {

            context.beginPath();
            context.moveTo(d1.x, d1.y);
            context.lineTo(d2.x, d2.y);
            context.strokeStyle = "black";
            context.stroke();
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
