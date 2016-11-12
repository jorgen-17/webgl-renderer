function init(){
	canvas = document.getElementById("mycanvas");
	gl = canvas.getContext("webgl", 
								{
									alpha: false,
									antialias: false,
                   					depth: false
								});
	
	gl.viewport(0, 0, canvas.width, canvas.height);
	gl.clearColor(0, 0.5, 0, 0.5);
	gl.clear(gl.COLOR_BUFFER_BIT);

	resizeCanvas();
}

function resizeCanvas() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	drawStuff(); 
}

window.addEventListener('resize', resizeCanvas, false);

function drawStuff() {
	gl.viewport(0, 0, canvas.width, canvas.height);
	gl.clearColor(0.75, 0.75, 0.75, 0.5);
	gl.clear(gl.COLOR_BUFFER_BIT);
}