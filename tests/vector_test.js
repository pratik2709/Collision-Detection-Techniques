var physicsEngine = (function (run) {

    var dot1 = new run.vectorlib.vector(5, 9);
    var dot2 = new run.vectorlib.vector(3, 4);
    console.log(dot1);
    console.log(dot1.dot(dot2)); //51
    console.log(dot1.magnitude());


})(physicsEngine || {});