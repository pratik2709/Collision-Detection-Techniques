var physicsEngine = (function (run) {

    var testVector1 = run.Vector.createVector(5, 9);
    var testVector2 = run.Vector.createVector(3, 4);
    console.log(testVector1);
    console.log(testVector1.dot(testVector2)); //51
    //
    ////test for calculating magnitude
    //console.log(testVector1.magnitude());

})(physicsEngine || {});