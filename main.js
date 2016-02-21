//
// mrc
// http://ili.li
// ver 0.2.0
//

var width, height, center;
var x = view.center.x,
    y = view.center.y;
var points = 800;
var smooth = true;
var radius = 280;
var speed = 4;
var ani = false;
var path = new Path({
    strokeWidth: 1,
    strokeColor: '#000'
});
var ggg;

var copyright = new PointText({


});

var r = new Raster('./mrc.jpg', [x, y]);

r.blendMode = 'source-in';

r.onLoad = function() {
    var textMRC = new PointText({
        content: 'MRC',
        fontSize: 144,
        position: new Point(x, y - 50),
        fillColor: '#fff',
        content: 'MRC',
        fontSize: 144,
        fontWeight: 900,
        shadowColor: new Color(0, 0, 0, 0.8),
        shadowBlur: 15,
        shadowOffset: new Point(5, 0)
    });
    textMRC.data.offsetY = -50;

    var lineAfterMRC = new Path.Rectangle({
        position: new Point(x, y - 5),
        size: [320, 4],
        fillColor: '#fff',
        shadowColor: new Color(0, 0, 0),
        shadowBlur: 12,
        shadowOffset: new Point(5, 5)
    });
    lineAfterMRC.data.offsetY = -5;

    var textCorder = new PointText({
        fillColor: '#fff',
        content: 'A CODER & DESIGNER',
        fontSize: 30,
        position: new Point(x, y + 20),
        fontWeight: 900,
        shadowColor: new Color(0, 0, 0),
        shadowBlur: 12,
        shadowOffset: new Point(5, 5)
    });
    textCorder.data.offsetY = 20;

    var redDelLine = new Path.Rectangle({
        position: new Point(x + 70, y + 10),
        size: [170, 4],
        fillColor: 'red'
    });
    redDelLine.data.offsetX = 70;
    redDelLine.data.offsetY = 10;

    var redDelLine2 = new Path.Rectangle({
        position: new Point(x + 70, y + 20),
        size: [170, 4],
        fillColor: 'red'
    });
    redDelLine2.data.offsetX = 70;
    redDelLine2.data.offsetY = 20;
    //add to a group
    ggg = new Group(textMRC,lineAfterMRC,textCorder,redDelLine,redDelLine2);
    ggg.onMouseEnter = function(e) {
        ani = true;
    }
    ggg.onMouseLeave = function(e) {
        ani = false;
    }
    // test group
    // ggg._children[0].position = new Point(0,0);
}

//
// overlay
//

var s = new Shape.Rectangle({
    point: [view.size.width / 2, 0],
    size: [view.size.width / 2, view.size.height],
    fillColor: '#fff'
});


var g = new Group(path, r);
// g.clipped = true;

g.onMouseEnter = function(e) {
    ani = true;
}
g.onMouseLeave = function(e) {
    ani = false;
}

initializePath();

//
//function
//

function initializePath() {
    center = view.center;
    width = view.size.width;
    height = view.size.height / 2;
    path.segments = [];
    // path.add(view.bounds.bottomLeft);
    for (var i = 0; i < points; i++) {
        var point = theCordAfterCricleLimit();
        if (point) {
            path.add(point);
        }
    }
    path.smooth();
}

function makeCenter(){
    if(ggg){
        var currentX = view.center.x,
            currentY = view.center.y;
        for(var i = 0;i < ggg._children.length; i++){
            var offsetX = ggg._children[i].data.offsetX ? ggg._children[i].data.offsetX : 0,
                offsetY = ggg._children[i].data.offsetY ? ggg._children[i].data.offsetY : 0;

            ggg._children[i].position = new Point(currentX+offsetX,currentY+offsetY);
        }
        r.position = new Point(currentX,currentY);
        s.position = new Point(view.size.width/4*3,view.size.height/2);
        s.size = new Size(view.size.width/2,view.size.height);
    }
}

function theCordAfterCricleLimit() {
    var rdx = rd(center.x - radius, center.x + radius),
    rdy = rd(center.y - radius, center.y + radius);

    var xLength = Math.abs(rdx - center.x),
    yLength = Math.abs(rdy - center.y);

    var lengthFormOrigin = Math.sqrt((xLength * xLength) + (yLength * yLength));
    if (lengthFormOrigin > radius) {
        return '';
    }
    var point = new Point(rdx, rdy);
    return point;
}

function rd(m, n) {
    var c = n - m + 1;
    return Math.random() * c + m;
}

function onFrame(event) {
    if (ani) {
        if (event.count % speed == 0) {
            path.segments = [];
            for (var i = 0; i < points; i++) {
                var point = theCordAfterCricleLimit();
                if (point) {
                    path.add(point);
                }
            }
            if (smooth) {
                path.smooth();
            }
        }
    }
}

// Reposition the path whenever the window is resized:
function onResize(event) {
    initializePath();
    setTimeout(makeCenter(),500);
}

//
//
//
