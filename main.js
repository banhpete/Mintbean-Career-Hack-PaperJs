paper.install(window);
// Keep global references to both tools, so the HTML
// links below can access them.
var tool1;
var tool2;
var tool3;
var tool4;

window.onload = function () {
  paper.setup("myCanvas");

  var path;
  var copy;

  function onMouseDown(event) {
    path = new Path();
    path.strokeColor = "black";
    path.add(event.point);
  }

  tool1 = new Tool();
  tool1.onMouseDown = onMouseDown;

  tool1.onMouseDrag = function (event) {
    path.add(event.point);
  };

  let addSubtract = true;

  tool1.onMouseUp = function (event) {
    path.closed = true;
    copy = path.clone();
    copy.strokeColor = new Color(255, 255, 255, 0);
    console.log(path.segments.index);
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
    tool2.activate();
  };

  tool2 = new Tool();
  tool2.minDistance = 20;
  tool2.onMouseUp = function (event) {
    if (path.contains(event.point)) {
      var myCircle = new Path.Circle({
        center: event.point,
        radius: 20,
      });
      var myCircle2 = new Path.Circle({
        center: event.point,
        radius: 10,
      });
      myCircle.strokeColor = "black";
      myCircle.fillColor = "white";
      myCircle2.strokeColor = "black";
      myCircle2.fillColor = "black";
      tool3.activate();
    }
  };

  tool3 = new Tool();
  tool3.minDistance = 20;
  tool3.onMouseUp = function (event) {
    if (path.contains(event.point)) {
      var myCircle = new Path.Circle({
        center: event.point,
        radius: 20,
      });
      var myCircle2 = new Path.Circle({
        center: event.point,
        radius: 10,
      });
      myCircle.strokeColor = "black";
      myCircle.fillColor = "white";
      myCircle2.strokeColor = "black";
      myCircle2.fillColor = "black";
      tool4.activate();
      view.onMouseMove = function (event) {};
    }
  };

  tool4 = new Tool();
  tool4.onMouseDown = function (event) {
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

// // Only executed our code once the DOM is ready.
// window.onload = function () {
//   // Get a reference to the canvas object
//   var canvas = document.getElementById("myCanvas");
//   // Create an empty project and a view for the canvas:
//   paper.setup(canvas);
//   // Create a Paper.js Path to draw a line into it:
//   var path = new paper.Path();
//   // Give the stroke a color
//   path.strokeColor = "black";
//   var start = new paper.Point(100, 100);
//   // Move to start and draw a line from there
//   path.moveTo(start);
//   // Note that the plus operator on Point objects does not work
//   // in JavaScript. Instead, we need to call the add() function:
//   path.lineTo(start.add([200, -50]));
//   // Draw the view now:
//   paper.view.draw();
// }
