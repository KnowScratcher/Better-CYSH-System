function AsProgress() {
    var h = "50vh";
    var w = "50vw";
	
	//20240423 loading
	let style = document.createElement('style');
	style.textContent = "\n  .dot {\n    position: absolute;\n    width: 15px;\n    height: 15px;\n    background-color: green;\n    border-radius: 50%;\n  }\n  @keyframes loadingRotate {\n    0% {\n      transform: rotate(0);\n    }\n    100% {\n      transform: rotate(360deg);\n    }\n  }\n";
	document.head.appendChild(style);
	

	let loadingContainer = document.createElement("div");
	loadingContainer.style = "width: 55px;height: 60px;margin-left: auto;margin-right: auto;animation: loadingRotate 1s linear infinite;";
	let loadingdot1 = document.createElement("div");
	loadingdot1.className = "dot";
	loadingdot1.style.top = "0";
	loadingdot1.style.left = "calc(50% - 7.5px)";
	loadingdot1.style.opacity = ".1667";
	let loadingdot2 = document.createElement("div");
	loadingdot2.className = "dot";
	loadingdot2.style.top = "calc(33.33% - 5px)";
	loadingdot2.style.left = "calc(100% - 15px)";
	loadingdot2.style.opacity = ".3333";
	let loadingdot3 = document.createElement("div");
	loadingdot3.className = "dot";
	loadingdot3.style.top = "calc(66.67% - 5px)";
	loadingdot3.style.left = "calc(100% - 15px)";
	loadingdot3.style.opacity = ".5";
	let loadingdot4 = document.createElement("div");
	loadingdot4.className = "dot";
	loadingdot4.style.top = "calc(100% - 15px)";
	loadingdot4.style.left = "calc(50% - 7.5px)";
	loadingdot4.style.opacity = ".6667";
	let loadingdot5 = document.createElement("div");
	loadingdot5.className = "dot";
	loadingdot5.style.top = "calc(66.67% - 7.5px)";
	loadingdot5.style.left = "0";
	loadingdot5.style.opacity = ".8333";
	let loadingdot6 = document.createElement("div");
	loadingdot6.className = "dot";
	loadingdot6.style.top = "calc(33.33% - 7.5px)";
	loadingdot6.style.left = "0";
	loadingdot6.style.opacity = "1";
	loadingContainer.appendChild(loadingdot1);
	loadingContainer.appendChild(loadingdot2);
	loadingContainer.appendChild(loadingdot3);
	loadingContainer.appendChild(loadingdot4);
	loadingContainer.appendChild(loadingdot5);
	loadingContainer.appendChild(loadingdot6);

    var brTag = document.createElement("br");

    var fontTag = document.createElement("font");
    fontTag.color = "#1B3563";
    fontTag.size = "2";
    fontTag.innerHTML = "資料處理中";
    
    var progress = document.createElement("div");
    progress.id = "AsdivProgress"
    progress.style.textAlign = "center";		
    progress.appendChild(loadingContainer);
    progress.appendChild(brTag);
    progress.appendChild(fontTag);

    progress.style.position = "fixed";
    progress.style.top = h;
    progress.style.left = w ;
    progress.style.marginLeft = "-10vw";
    progress.style.width = "20vw"
//    progress.style.top = (h / 2) - (progress.style.height / 2);
//    progress.style.left = (w / 2) - (progress.style.width / 2);
    progress.style.zIndex = "99999";
    progress.style.display = '';    
    //document.body.appendChild(progress);
    //debugger;
    if (self.frameElement && self.frameElement.tagName == "IFRAME") {
        var oprogress = window.top.document.getElementById("AsdivProgress");
        if (oprogress == null || typeof (oprogress) == "undefind") {
            window.top.document.body.appendChild(progress);
        }
    }
    else {
        document.body.appendChild(progress);
    }
}			