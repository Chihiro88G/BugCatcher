// create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 900;
canvas.height = 580;
var timer = 0;
var caught = false;
var fps = 10;
document.body.appendChild(canvas);

// background image
var bgReady = false;
var bgImage = new Image();

bgImage.onload = function () {
    bgReady = true;
};
bgImage.src = "game-background-p7-1.jpg";

// bug image
var bugReady = false;
var bugImage = new Image();
bugImage.onload = function () {
    bugReady = true;
};
bugImage.src = "cute-bug70.png";
bugImage.width = "20px";

var bug = {};
var bugCaught = 0;
// When bug is caught, reset
var reset = function () {
    bug.x = 40 + (Math.random() * (canvas.width - 70));
    do {
        bug.y = 40 + (Math.random() * (canvas.height - 70));
    }
    while (bug.y < 100)
};

// mousedown event
window.addEventListener("mousedown", onMouseDown, false);
function onMouseDown(omd) {

    if (omd.button != 0) return;

    mouseXinCanvas = omd.clientX;
    mouseYinCanvas = omd.clientY;

    if (bugBody(bug, mouseXinCanvas, mouseYinCanvas)) {
        caught = true;
        clearInterval(timer);
        timer = setInterval(reset, 20000 / fps);
        reset();
    }
    if (ResetScore(mouseXinCanvas, mouseYinCanvas)) {
        location.reload();
    }
    if (ResetSpeed(mouseXinCanvas, mouseYinCanvas)) {
        clearInterval(timer);
        timer = setInterval(reset, 20000 / fps);
        reset();
        render();
    }
};

//bugs body
function bugBody(bug, x, y) {

    if (x <= (bug.x + 80)
        && bug.x <= (x + 80)
        && y <= (bug.y + 80)
        && bug.y <= (y + 80)
    ) {
        fps = fps + 5;
        bugCaught++;
        return true;
    }
    return false;
};

//Reset Score
function ResetScore(x, y) {

    if (x > (305)
        && x < (545)
        && y > (15)
        && y < (85)
    ) {
        return true;
    }
    return false;
};

//Reset speed 
function ResetSpeed(x, y) {
    if (x > (605)
        && x < (845)
        && y > (15)
        && y < (85)
    ) {
        fps = 10;
        return true;
    }
    return false;
};

// Draw everything
var render = function () {

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);


    if (bgReady) {
        ctx.drawImage(bgImage, 0, 100);
    }
    if (bugReady) {
        ctx.drawImage(bugImage, bug.x, bug.y);
    }
    if (caught == true) {
        if (bgReady) {
            ctx.drawImage(bgImage, 0, 100);
        }
        caught = false;
    }

    // Score, Title
    ctx.fillStyle = "rgb(252, 90, 31)";
    ctx.font = "34px Helvetica";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("Bug Smasher", 5, 40);
    ctx.font = "20px Helvetica";
    ctx.fillText("Score:" + bugCaught, 10, 10);

    // Reset Score, Speed button
    ctx.fillStyle = "rgb(253, 114, 246)";
    ctx.fillRect(250, 10, 250, 80);
    ctx.fillRect(520, 10, 250, 80);
    ctx.fillStyle = "rgb(253, 114, 246)";
    ctx.fillRect(255, 15, 240, 70);
    ctx.fillRect(525, 15, 240, 70);
    ctx.fillStyle = "rgb(255, 255, 255)";
    ctx.font = "34px Arial";
    ctx.fillText("Reset Score", 275, 30);
    ctx.fillText("Reset Speed", 545, 30);
};

// The main game loop
var main = function () {
    render();
    // Request to do this again ASAP
    requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame
var wnd = window;
requestAnimationFrame = wnd.requestAnimationFrame || wnd.webkitRequestAnimationFrame || wnd.msRequestAnimationFrame || wnd.mozRequestAnimationFrame;
reset();
main();