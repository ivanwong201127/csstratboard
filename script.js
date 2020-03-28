/**
 * @author Windows7
 */
$(document).ready(function(){
	var screenheight = $(window).height;
	var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext("2d");
	var lastX,lastY;
	var cPushArray = new Array();
				//red   	//blue    //orange   //yellow  //light blue //green //purple
	var color = ["#ff0000",'#0011ff',"#ffa100","#fffa00","#00ffe9","#10ff00","#ff00d8"];
	var colorwords = ["red",'blue',"orange","yellow","light blue","green","purple"];
	var colorindex = 0;
	var cStep = 0;
	var drawing = false;
	//DROP DOWN EVENTS
	$(".maplist").on("change",function(){
		var selectedmap = "url('"+this.value+".png')";
		$("canvas").css("background-image",selectedmap);
	});
    //MOUSE WHEEL EVENTS
    if(document.getElementById("myCanvas").addEventListener){
	    document.getElementById("myCanvas").addEventListener("mousewheel",MouseWheelHandler,false);
	    document.getElementById("myCanvas").addEventListener("DOMMouseScroll", MouseWheelHandler, false);
	   }
	function MouseWheelHandler(e){
    	var e = window.event || e; // old IE support
		var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
		if(delta == 1){
			colorindex ++;
			if(colorindex >6){
				colorindex = 0;
			}
		}
		if(delta == -1){
			colorindex --;
			if(colorindex<0){
				colorindex = 6;
			}
		}
		$(".colorindicator").text("Current color:" + colorwords[colorindex]);
    }
	//LEFT CLICK EVENT
	$("#myCanvas").mousedown(function(event){
		if(event.which == 1){
			drawing = true;
			var rect = canvas.getBoundingClientRect();
			var mousex = event.clientX - rect.left;
			var mousey = event.clientY - rect.top;
			drawline(mousex,mousey,color[colorindex]);
			cPush();
		}
		
	//UNDO CLICK
		if(event.which == 3){
			cUndo();
		}
	});
	$("#myCanvas").mousemove(function(event){
		var rect = canvas.getBoundingClientRect();
		var mousex = event.clientX - rect.left;
		var mousey = event.clientY - rect.top;
		drawline(mousex,mousey,color[colorindex]);
	});
	$("#myCanvas").mouseup(function(event){
		drawing = false;
	});
	function drawline(x,y,color){
		if(drawing){
			ctx.beginPath();
	        ctx.strokeStyle = color;
	        ctx.lineWidth = 5;
	        ctx.lineJoin = "round";
	        ctx.moveTo(lastX, lastY);
	        ctx.lineTo(x, y);
	        ctx.stroke();
	        ctx.closePath();
		}
		lastX = x; lastY = y;
	}
	//UNDO FUNCTION
	function cPush() {
	    cPushArray.push(document.getElementById("myCanvas").toDataURL("image/png"));
	}
	function cUndo() {
    if (cPushArray.length > 0) {
    	ctx.clearRect(0, 0, 960, 592);
        var canvasPic = new Image();
        canvasPic.src = cPushArray[cPushArray.length-1];
        canvasPic.onload = function () { ctx.drawImage(canvasPic, 0, 0); };
        cPushArray.pop();
    }
}
});
