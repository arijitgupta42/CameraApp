
var constraints = { video: { facingMode: "user" }, audio: false };

const cameraView = document.querySelector("#camera--view"),
    cameraOutput = document.querySelector("#camera--output"),
    cameraSensor = document.querySelector("#camera--sensor"),
    cameraTrigger = document.querySelector("#camera--trigger")

function cameraStart() {
    navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function(stream) {
        track = stream.getTracks()[0];
        cameraView.srcObject = stream;
    })
    .catch(function(error) {
        console.error("Oops. Something is broken.", error);
    });
}

cameraTrigger.onclick = function() {
    cameraSensor.width = cameraView.videoWidth;
    cameraSensor.height = cameraView.videoHeight;
    cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
    cameraOutput.src = cameraSensor.toDataURL("image/jpeg");
    let picture = cameraOutput.src
    fetch(picture)
    	.then(res => res.blob())
    	.then(blobData => {
    		
	           
    		var subscriptionKey = "be09c536a8e94b459644617e26450628";
	    
	        var uriBase =
	            "https://centralindia.api.cognitive.microsoft.com/face/v1.0/detect";
	    
	        
	        var params = {
	            "returnFaceId": "true",
	            "returnFaceLandmarks": "false",
	        };
	      
	        $.ajax({
	            url: uriBase + "?" + $.param(params),

	            cache: false,

	            processData:false,
	    
	            
	            beforeSend: function(xhrObj){
	                xhrObj.setRequestHeader("Content-Type","application/octet-stream");
	                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
	            },
	    
	            type: "POST",
	    
	            
	            data: blobData,
	        })
	    
	        .done(function(data) {

	        	console.log("FaceID:",(JSON.stringify(data[0].faceId)));

	        })
	    
	        .fail(function(jqXHR, textStatus, errorThrown) {
	            
	            var errorString = (errorThrown === "") ?
	                "Error. " : errorThrown + " (" + jqXHR.status + "): ";
	            errorString += (jqXHR.responseText === "") ?
	                "" : (jQuery.parseJSON(jqXHR.responseText).message) ?
	                    jQuery.parseJSON(jqXHR.responseText).message :
	                        jQuery.parseJSON(jqXHR.responseText).error.message;
	            alert(errorString);
	        });
	    	})

	  


    
    cameraOutput.classList.add("taken");
};

window.addEventListener("load", cameraStart, false);