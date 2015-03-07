// JavaScript Document
/*
這檔案協助你編寫JS，請注意每個code block的使用，若你對自己的javascript很有信心，或是你認為我寫的方式有bug，歡迎自行修改編排
*/
var inputed = "";
var hasNewInput = false;
var isCaptured = false;
var obj = {
	'img1': false,
	'img2': false,
	'img3': false
};

/*var img1 = new Image();
img1.src = "";
var img2 = new Image();
img2.src = "";
var img3 = new Image();
img3.src = "";*/

document.ready = function () {//facebook init
	var takePic = document.getElementById('camera');
	takePic.onchange = function (event){
		var files = event.target.files, file;
		if(files && files.length > 0){
			file = files[0];
			var URL = window.URL || window.webkitURL;
			var imgURL = URL.createObjectURL(file);
			var imgObj = document.getElementById('preview');
			imgObj.src = imgURL;
			imgObj.width = 100;
			imgObj.height = 80;
			isCaptured = true;
		}
	};
	var canvas = document.getElementById('canvas');
	canvas.onclick = function() {
		if(isCaptured){
			isCaptured = false;
			$("img#preview").css('display','none');
			var canvas = document.getElementById("canvas"); //宣告變數找到canvas標籤
			var ctx = canvas.getContext("2d"); //找到2d內容
			var canvasWidth = canvas.width;//大小
			var canvasHeight = canvas.height;//高度
			var canvasLeft = canvas.left;
			var canvasTop = canvas.top;
		
			var profileIMG = document.getElementById("preview");//抓html裡預載入的照片
			profileIMG.width = canvasWidth;
			profileIMG.width = canvasHeight;
			ctx.clearRect(0,0,canvasWidth,canvasHeight);
			console.log(profileIMG);
			console.log(ctx);
			ctx.drawImage(profileIMG,0 ,0);//從XY軸0，0值開始畫如profileimg
			var s = 0;
		}
	};
	/*
	var input1 = document.getElementById('sendimg1');
	var input2 = document.getElementById('sendimg2');
	var input3 = document.getElementById('sendimg3');
	
	input1.onclick = function(){
		if(obj['img1'])
			obj['img1'] = false;
		else
			obj['img1'] = true;
		draw(20,80);

	};
	input2.onclick = function(){
		if(obj['img2'])
			obj['img2'] = false;
		else
			obj['img2'] = true;
		draw(20, 180);
	};
	input3.onclick = function(){
		if(obj['img3'])
			obj['img3'] = false;
		else
			obj['img3'] = true;
		draw(20, 280);
	};
	*/
	function draw(x, y){
		var canvas = document.getElementById("canvas"); //宣告變數找到canvas標籤
		var ctx = canvas.getContext("2d"); //找到2d內容
		var canvasWidth = canvas.width;//大小
		var canvasHeight = canvas.height;//高度

		var profileIMG = document.getElementById("preview");//抓html裡預載入的照片
		ctx.clearRect(0,0,canvasWidth,canvasHeight);
		ctx.drawImage(profileIMG,0 ,0);

		for(var img in obj){
			if(obj[img]==true){
				if(img=='img1'){
					ctx.drawImage(img1,x,y);
				}
				else if(img=='img2'){
					ctx.drawImage(img2,x,y);
				}
				else if(img=='img3'){
					ctx.drawImage(img3,x,y);
				}
			}
		}
	}
	
	var result = document.getElementById("gen");
	console.log(result);
	result.onclick = function(){
		var canvas = document.getElementById("canvas");
		var url = canvas.toDataURL('image/jpeg');
		var link = document.getElementById("download");
		link.innerHTML = "download";
		link.href = url;
	};
};
