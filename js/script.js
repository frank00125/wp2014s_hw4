// JavaScript Document
/*
這檔案協助你編寫JS，請注意每個code block的使用，若你對自己的javascript很有信心，或是你認為我寫的方式有bug，歡迎自行修改編排
*/
var inputed = "";
var hasNewInput = false;
var isCaptured = false;

document.ready = function () {//facebook init
	var takePic = document.getElementById('camera');
	takePic.onchange = function (event){
		var files = event.target.files, file;
		if(files && files.length > 0){
			file = files[0];
				var URL = window.URL || window.webkitURL;
				var imgURL = URL.createObjectURL(file);
				var imgObj = document.getElementById('preview');
				var ctx = document.getElementById('canvas');
				imgObj.width = ctx.width;
				imgObj.height = ctx.height;
				imgObj.src = imgURL;
				URL.revokeObjectURL(imgURL);
//以下為canvas的程式碼，基本上不需多動，依據comments修改即可
				var canvas = document.getElementById("canvas"); //宣告變數找到canvas標籤
				var ctx = canvas.getContext("2d"); //找到2d內容
				var canvasWidth = canvas.width;//大小
			    var canvasHeight = canvas.height;//高度
				var canvasLeft = canvas.left;
				var canvasTop = canvas.top;
	
				var profileIMG = document.getElementById("preview");//抓html裡預載入的照片
				console.log(profileIMG);
				console.log(ctx);
				ctx.drawImage(profileIMG,0 ,0);//從XY軸0，0值開始畫如profileimg
				var s = 0;
		}
	}//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<init end
};
