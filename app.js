/*document.getElementById("quality").addEventListener("input", function()
{
	document.getElementById("qualityValue").innerHTML = document.getElementById("quality").value;
});*/


document.getElementById("go").addEventListener("click", function()
{
	var files = document.getElementById("files").files;

	/*var quality = document.getElementById("quality").value || 5;
	quality = parseInt(quality);
	var sample = 21 - (quality*2);*/
	var loop = document.getElementById("loop").value || 0;
	var delay = document.getElementById("fps").value || 10;
	var fps = document.getElementById("fps").value || 10;
	var ms = 1000 / fps;
	var matte = [255, 255, 255];
	var transparent = [0, 255, 0];

	var frames = [];
	
	var img = new Image();
	
	img.onload = function ()
	{
		var canvas = document.createElement("canvas");
		var ctx    = canvas.getContext("2d");
		
		canvas.width  = img.width;
		canvas.height = img.height;
		ctx.drawImage(img, 0, 0);
		
		frames.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
		
		if (frames.length >= files.length)
		{
			var gifWorker = new Worker("omggif-worker.js");
		
		
			gifWorker.addEventListener('message', function(e)
			{
				if (e.data.type === "gif")
				{
					var htmlimg = document.createElement("img");
					htmlimg.src = 'data:image/gif;base64,' + window.btoa(e.data.data);
					document.getElementById("result").innerHTML = "<p>Result: </p><br>";
					document.getElementById("result").appendChild(htmlimg);
				}
			});
			
			gifWorker.postMessage({
				frames: frames,
				delay: ms,
				loop: loop,
				sample: 10,
				matte: matte,
				transparent: transparent
			});
		}
		else
		{
			img.src = URL.createObjectURL(files[frames.length]);
		}
	}
	img.src = URL.createObjectURL(files[0]);
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	/*
	encoder.start();
	encoder.setQuality(21 - (quality*2)); // the less the better
	encoder.setRepeat(document.getElementById("loop").value || 0);
	encoder.setFrameRate(document.getElementById("fps").value || 10);
	
	var processedImages = 0;
	
	var img = new Image();
	var onImageLoaded = function()
	{
		var canvas = document.createElement("canvas");
		var ctx    = canvas.getContext("2d");
		
		canvas.width  = img.width;
		canvas.height = img.height;
		ctx.drawImage(img, 0, 0);
		encoder.addFrame(ctx);
		encoder.setTransparent(0x000000);
		
		img = new Image();
		
		img.onload = function()
		{
			onImageLoaded();
		}
		
		if (processedImages >= files.length)
		{
			encoder.finish();
			var htmlimg = document.createElement("img");
			htmlimg.src = 'data:image/gif;base64,'+encode64(encoder.stream().getData());
			document.getElementById("result").innerHTML = "<p>Result: </p><br>";
			document.getElementById("result").appendChild(htmlimg);
			
			return;
		}
		else
		{
			img.src = URL.createObjectURL(files[processedImages++]);
		}
		
	}
	
	img.onload = function()
	{
		onImageLoaded();
	}
	
	img.src = URL.createObjectURL(files[processedImages++]);
	*/
	
	
});
