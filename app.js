var encoder = new GIFEncoder();

document.getElementById("quality").addEventListener("input", function()
{
	document.getElementById("qualityValue").innerHTML = document.getElementById("quality").value;
});

document.getElementById("go").addEventListener("click", function()
{
	var files = document.getElementById("files").files;
	
	encoder.start();
	var quality = document.getElementById("quality").value || 5;
	quality = parseInt(quality);
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
		//encoder.setTransparent(0x000000);
		
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
	
	/*
	
	var img = new Image();
	img.onload = function()
	{
		canvas.width  = this.width;
		canvas.height = this.height;
		ctx.drawImage(img, 0, 0);
		encoder.addFrame(ctx);
		encoder.finish();
		
		var htmlimg = document.createElement("img");
		htmlimg.src = 'data:image/gif;base64,'+encode64(encoder.stream().getData());
		document.body.appendChild(htmlimg);
	}
	img.src = URL.createObjectURL(files[0]);*/
	
	
});
