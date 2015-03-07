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
			}
			catch(e){
				try{
					var fileReader = new FileReader();
					fileReader.onload = function(event){
						var imgObj = document.getElementById('preview');
						imgObj = event.target.result;
					};
				}
				catch(e){
					alert('capturing face failed');
				}
			}
		}	
	}

//以下為canvas的程式碼，基本上不需多動，依據comments修改即可
	
	//起始畫面
	var ctx = document.getElementById('canvas').getContext('2d'); //宣告變數找到頁面的canvas標籤的2d內容
	ctx.font = '20px "Arial"'; //設定字體與大小
	ctx.fillText("Click here to start fill with Facebook Profile Picture", 40, 270); //設定預設的開始畫面
    var img = new Image(); // 新增圖像1
    img.src = "img/overlay.png"; //圖像路徑（路徑自己設，且自己加入想要的圖層）
	img.crossOrigin = "Anonymous";
	var img2 = new Image(); //新增圖像2
	img2.src = "img/overlayback.png" //圖像路徑
	img2.crossOrigin = "Anonymous";
	var img3 = new Image();//新增圖像3
	img3.src = "img/typography.png"//圖像路徑
	img3.crossOrigin = "Anonymous";
	

	//宣告基本變數
    var canvas = document.getElementById("canvas"); //宣告變數找到canvas標籤
    var ctx = canvas.getContext("2d"); //找到2d內容
    var canvasOffset = $("#canvas").offset();//找到offset
    var offsetX = canvasOffset.left;//左方
    var offsetY = canvasOffset.top;//上方
    var canvasWidth = canvas.width;//大小
    var canvasHeight = canvas.height;//高度
    var isDragging = false;//拖拉
	var isDrawed = false;

    function handleMouseDown(e){//滑鼠按下的函數
		if(!isDrawed){
			ctx.clearRect(0,0,canvasWidth,canvasHeight); //移除canvas起始的內容
			ctx.drawImage(img2,0,0); //劃入i:mg2
			var profileIMG = document.getElementById("preview");//抓html裡預載入的照片
			profileIMG.crossOrigin = "Anonymous"; // 這務必要做，為了讓Facebook的照片能夠crossdomain傳入到你的頁面，CORS Policy請參考https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image 
			ctx.drawImage(profileIMG,canMouseX,canMouseY);//從XY軸0，0值開始畫如profileimg
			ctx.fillStyle = "black"; //字體顏色
			ctx.font='20px "微軟正黑體"'; //字體大小和字形
			ctx.fillText(inputed, 275, 450); //字體也可以依據滑鼠游標移動，所輸入的值可自行調整，若不想移動輸入的字體，可以把它改成（inputedText,0,0)X Y軸 0，0的位置
			isDrawed = true;
		}
	}
})(); //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<init end

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




