// JavaScript Document
/*
這檔案協助你編寫JS，請注意每個code block的使用，若你對自己的javascript很有信心，或是你認為我寫的方式有bug，歡迎自行修改編排
*/
var inputed = "";
var hasNewInput = false;
var isCaptured = false;

(function () {//facebook init
	var takePic = document.getElementById('camera');
	takePic.onchange = function (event){
		var files = event.target.files, file;
		if(files && files.length > 0){
			file = files[0];
			try{
				var URL = window.URL || window.webkitURL;
				var imgURL = URL.createObjectURL(file);
				var imgObj = document.getElementById('preview');
				imgObj.src = imgURL;
				URL.revokeObjectURL(imgURL);
				drawCanvas();
			}
			catch(e){
				console.log('try another way');
				try{
					var fileReader = new FileReader();
					fileReader.onload = function(event){
						var imgObj = document.getElementById('preview');
						imgObj = event.target.result;
					};
					drawCanvas();
				}
				catch(e){
					alert('capturing face failed');
				}
			}
		}	
	}
})();
//以下為canvas的程式碼，基本上不需多動，依據comments修改即可
	function drawCanvas(){
		//宣告基本變數
		var canvas = document.getElementById("canvas"); //宣告變數找到canvas標籤
	    var ctx = canvas.getContext("2d"); //找到2d內容
	    var canvasWidth = canvas.width;//大小
	    var canvasHeight = canvas.height;//高度

		var profileIMG = document.getElementById("preview");//抓html裡預載入的照片
		console.log(profileIMG);
		ctx.drawImage(profileIMG, 0, 0);//從XY軸0，0值開始畫如profileimg
		var s = 0;
	} //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<init end

// Post a BASE64 Encoded PNG Image to facebook，以下程式為把照片po到facebook的方法，基本上這樣就可以不用動了，但思考authToken該怎麼拿到，因為這裡我並沒有把使用者登入的token載入到這函數內，所以它是不會得到token的
function PostImageToFacebook(authToken) {
	$('.info').append('<img src="img/loading.gif"/>')//載入loading的img
    var canvas = document.getElementById("canvas");//找canvas
    var imageData = canvas.toDataURL("image/png");//把canvas轉換PNG
    try {
        blob = dataURItoBlob(imageData);//把影像載入轉換函數
    } catch (e) {
        console.log(e);//錯誤訊息的log
    }
    var fd = new FormData();
    fd.append("access_token", authToken);//請思考accesstoken要怎麼傳到這function內
    fd.append("source", blob);//輸入的照片
    fd.append("message", "這是HTML5 canvas和Facebook API結合教學");//輸入的訊息
    try {
        $.ajax({
            url: "https://graph.facebook.com/me/photos?access_token=" + authToken,//GraphAPI Call
            type: "POST",
            data: fd,
            processData: false,
            contentType: false,
            cache: false,
            success: function (data) {
                console.log("success " + data);//成功log + photoID
                  $(".info").html("Posted Canvas Successfully. [<a href='http://www.facebook.com/" + data.id + " '>Go to Profile Picture</a>] "); //成功訊息並顯示連接
            },
            error: function (shr, status, data) {
                $(".info").html("error " + data + " Status " + shr.status);//如果錯誤把訊息傳到class info內
            },
            complete: function () {
                $(".info").append("Posted to facebook");//完成後把訊息傳到HTML的div內
            }
        });

    } catch (e) {
        console.log(e);//錯誤訊息的log
    }
}

// Convert a data URI to blob把影像載入轉換函數
function dataURItoBlob(dataURI) {
    var byteString = atob(dataURI.split(',')[1]);
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], {
        type: 'image/png'
    });
}




