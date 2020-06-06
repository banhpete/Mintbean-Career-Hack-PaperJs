paper.install(window);
// Keep global references to both tools, so the HTML
// links below can access them.
var bodyDraw;
var eye1;
var eye2;
var mouth;

window.onload = function () {
  paper.setup("myCanvas");

  var path;
  var copy;

  function onMouseDown(event) {
    path = new Path();
    path.strokeColor = "black";
    path.add(event.point);
  }

  bodyDraw = new Tool();
  bodyDraw.onMouseDown = onMouseDown;

  bodyDraw.onMouseDrag = function (event) {
    path.add(event.point);
  };

  let addSubtract = true;

  bodyDraw.onMouseUp = function (event) {
    path.closed = true;
    copy = path.clone();
    copy.strokeColor = new Color(255, 255, 255, 0);
    path.fillColor = "#ff0000";
    path.strokeColor = "#ff0000";
    view.onFrame = function (event) {
      // Each frame, change the fill color of the path slightly by
      // adding 1 to its hue:
      path.fillColor.hue += 1;
      let i = 0;
      let randomValue;
      addSubtract = !addSubtract;
      do {
        var sinus = Math.sin(event.time * 3 + i) * 3;
        randomValue = Math.random() * 1;
        var segment = path.segments[i];
        var refSegment = copy.segments[i];
        segment.point.y = refSegment.point.y + sinus;
        segment.point.x = refSegment.point.x + sinus;
        i++;
      } while (!path.segments[i].isLast());
    };
    eye1.activate();
  };

  eye1 = new Tool();
  eye1.minDistance = 20;

  var myCircle;
  var myCircle2;

  let clientXPosition;
  let clientYPosition;

  let xVector;
  let yVector;
  let vectorLength;

  let pupilXDist;
  let pupilYDist;
  let pupilDist;

  eye1.onMouseUp = function (event) {
    if (path.contains(event.point)) {
      myCircle = new Path.Circle({
        center: event.point,
        radius: 20,
      });
      myCircle2 = new Path.Circle({
        center: event.point,
        radius: 10,
      });
      myCircle.strokeColor = "black";
      myCircle.fillColor = "white";
      myCircle2.strokeColor = "black";
      myCircle2.fillColor = "black";

      view.onMouseMove = function (event) {
        clientXPosition = event.point.x;
        clientYPosition = event.point.y;
      };

      view.onFrame = function (event) {
        if (!isNaN(clientXPosition) && !isNaN(clientYPosition)) {
          xVector = clientXPosition - myCircle.position.x;
          yVector = clientYPosition - myCircle.position.y;
          vectorLength = Math.sqrt(xVector * xVector + yVector * yVector);
          xVector /= vectorLength;
          yVector /= vectorLength;

          pupilXDist = myCircle2.position.x - myCircle.position.x + xVector;
          pupilYDist = myCircle2.position.y - myCircle.position.y + yVector;
          pupilDist = Math.sqrt(
            pupilXDist * pupilXDist + pupilYDist * pupilYDist
          );

          if (pupilDist < 10) {
            myCircle2.position.x += xVector;
            myCircle2.position.y += yVector;
          }
          // Each frame, change the fill color of the path slightly by
          // adding 1 to its hue:
          path.fillColor.hue += 1;
          let i = 0;
          let randomValue;
          addSubtract = !addSubtract;
          do {
            var sinus = Math.sin(event.time * 3 + i) * 3;
            randomValue = Math.random() * 1;
            var segment = path.segments[i];
            var refSegment = copy.segments[i];
            segment.point.y = refSegment.point.y + sinus;
            segment.point.x = refSegment.point.x + sinus;
            i++;
          } while (!path.segments[i].isLast());
        }
      };

      eye2.activate();
    }
  };

  eye2 = new Tool();
  eye2.minDistance = 20;

  var myCircle3;
  var myCircle4;

  let pupilXDist2;
  let pupilYDist2;
  let pupilDist2;

  eye2.onMouseUp = function (event) {
    if (path.contains(event.point)) {
      myCircle3 = new Path.Circle({
        center: event.point,
        radius: 20,
      });
      myCircle4 = new Path.Circle({
        center: event.point,
        radius: 10,
      });
      myCircle3.strokeColor = "black";
      myCircle3.fillColor = "white";
      myCircle4.strokeColor = "black";
      myCircle4.fillColor = "black";

      view.onMouseMove = function (event) {
        clientXPosition = event.point.x;
        clientYPosition = event.point.y;
      };

      view.onFrame = function (event) {
        if (!isNaN(clientXPosition) && !isNaN(clientYPosition)) {
          xVector = clientXPosition - myCircle.position.x;
          yVector = clientYPosition - myCircle.position.y;
          vectorLength = Math.sqrt(xVector * xVector + yVector * yVector);
          xVector /= vectorLength;
          yVector /= vectorLength;

          if (
            pupilXDist ==
            myCircle2.position.x - myCircle.position.x + xVector
          ) {
            pupilXDist = myCircle2.position.x - myCircle.position.x + xVector;
          } else {
            pupilXDist = myCircle2.position.x - myCircle.position.x + xVector;
          }

          if (
            pupilYDist ==
            myCircle2.position.y - myCircle.position.y + yVector
          ) {
          } else {
            pupilYDist = myCircle2.position.y - myCircle.position.y + yVector;
          }

          pupilDist = Math.sqrt(
            pupilXDist * pupilXDist + pupilYDist * pupilYDist
          );

          if (pupilDist < 10) {
            myCircle2.position.x += xVector;
            myCircle2.position.y += yVector;
          }

          pupilXDist2 = myCircle4.position.x - myCircle3.position.x + xVector;
          pupilYDist2 = myCircle4.position.y - myCircle3.position.y + yVector;
          pupilDist2 = Math.sqrt(
            pupilXDist2 * pupilXDist2 + pupilYDist2 * pupilYDist2
          );

          if (pupilDist2 < 10) {
            myCircle4.position.x += xVector;
            myCircle4.position.y += yVector;
          }

          // Each frame, change the fill color of the path slightly by
          // adding 1 to its hue:
          path.fillColor.hue += 1;
          let i = 0;
          let randomValue;
          addSubtract = !addSubtract;
          do {
            var sinus = Math.sin(event.time * 3 + i) * 3;
            randomValue = Math.random() * 1;
            var segment = path.segments[i];
            var refSegment = copy.segments[i];
            segment.point.y = refSegment.point.y + sinus;
            segment.point.x = refSegment.point.x + sinus;
            i++;
          } while (!path.segments[i].isLast());
        }
      };

      mouth.activate();
    }
  };

  mouth = new Tool();
  mouth.onMouseDown = function (event) {
    if (path.contains(event.point)) {
      var myCircle = new Path.Circle({
        center: event.point,
        radius: 50,
      });
      myCircle.removeSegment(1);
      myCircle.strokeColor = "black";
      myCircle.fillColor = "red";
      tool5.activate();
    }
  };

  tool5 = new Tool();
};
