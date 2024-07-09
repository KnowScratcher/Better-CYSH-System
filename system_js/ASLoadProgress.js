function checklocaldata(obj) {   
    if (typeof (obj) === 'string') {
		obj = obj.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;');
		obj = obj.replace('\'\'', '&quot;').replace('\'', '&#x27;').replace('/', '&#x2F;');
 		obj = obj.replace('\u0008', '\b').replace('\u0009', '\t').replace('\u000A', '\n').replace('\u000C', '\f').replace('\u000D', '\r');
		obj = obj.replace('\u0022', '\x22').replace('\u0026', '\x26').replace('\u0027', '\x27').replace('\u002F', '\/').replace('\u005C', '\\');
		var pattern = new RegExp('[\u0000-\u001F]');
		obj = obj.replace(pattern,'\\x$1');	
	}
    return escape(obj);
}
function checklocalstorage(obj) {    
    if (typeof (obj) === 'string') {
        if (obj == '0') {
            return '0';
        }
        else if (obj == '1') {
            return '1';
        }
        else if (!isNaN(parseInt(obj))) {
            var spoint = parseInt(obj);
            if (spoint > 100 && spoint <= 200) {
                return '100';
            }
            else if (spoint > 200 && spoint <= 300) {
                return '200';
            }
            else if (spoint > 300 && spoint <= 400) {
                return '300';
            }
            else if (spoint > 400 && spoint <= 500) {
                return '400';
            }
            else if (spoint > 500) {
                return '500';
            }
            else {
                return '0';
            }
        }
        return clocaldata(obj);        
    }
    else if (typeof (obj) === 'number')
    {
        return '0';
    }
    else
    {
        return '0';
    }    
}

function clocaldata(pobj) {
    var chkstr = 'abcdefghijklmnopqrstuvwxyz';
    var chknstr = '1234567890.';
    var retvalue = '';
    if (pobj == null || pobj == "undefined")
    {
        return retvalue;
    }
    for (var e = 0; e < pobj.length; e++) {
        var rstr = chkstr.indexOf(pobj.substring(e, e + 1));
        if (rstr > -1) {
            retvalue = retvalue + chkstr[rstr];
        }
        var rstr2 = chkstr.toUpperCase().indexOf(pobj.substring(e, e + 1));
        if (rstr2 > -1) {
            retvalue = retvalue + chkstr[rstr2].toUpperCase();
        }
        var rstr3 = chknstr.indexOf(pobj.substring(e, e + 1));
        if (rstr3 > -1) {
            retvalue = retvalue + chknstr[rstr3];
        }
    }
    return retvalue;
}

function unicodetoascii(str) {
    const unicodeList = str.match(/\\u[\da-f]{4}/g) || []
    return unicodeList.reduce((pre, u) => {
        return pre.replace(u, String.fromCodePoint(Number(`0x${u.slice(2)}`)))
    }, str)
}

function AsProgress() {
    var h = "50vh";
    var w = "50vw";
	
	//20240423 loading
	let style = document.createElement('style');
	style.textContent = "\n  .dot {\n    position: absolute;\n    width: 15px;\n    height: 15px;\n    background-color: green;\n    border-radius: 50%;\n  }\n  @keyframes loadingRotate {\n    0% {\n      transform: rotate(0);\n    }\n    100% {\n      transform: rotate(360deg);\n    }\n  }\n";
	document.head.appendChild(style);
	

	let loadingContainer = document.createElement("div");
	loadingContainer.style = "position: relative;width: 55px;height: 60px;animation: loadingRotate 1s linear infinite;";
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

function AsMaskFrame() {
    var h = "100vh";
    var w = "100vw";
    var mask = document.createElement("div");
    mask.id = "AsdivMaskFrame"
    mask.style.position = "fixed";
    mask.style.top = "0px";
    mask.style.left = "0px";
    mask.style.height = h;
    mask.style.width = w;
    mask.style.backgroundColor = "#000000";
    mask.style.opacity = "0.3";
    mask.style.zIndex = "99998";
    mask.style.display = '';    
    if (self.frameElement && self.frameElement.tagName == "IFRAME")
    {
        var omask = window.top.document.getElementById("AsdivMaskFrame");
        if (omask == null || typeof (omask) == "undefind") {
            window.top.document.body.appendChild(mask);
        }
    }
    else
    {
        document.body.appendChild(mask);
    }
}

function ShowAsloader() {   
    AsMaskFrame();
    AsProgress();
    $(document).keydown(function (event) {       
        if (event.keyCode == "9") {
            event.preventDefault();
        }
        if (event.keyCode == "13") {
            event.preventDefault();
        }
    });    
}

function HiddenAsloader() {
    var asprogress = document.getElementById('AsdivProgress');
    if (asprogress) { document.body.removeChild(asprogress); };
    asprogress = window.top.document.getElementById('AsdivProgress');
    if (asprogress) { window.top.document.body.removeChild(asprogress); };
    var asmask = document.getElementById('AsdivMaskFrame');
    if (asmask) { document.body.removeChild(asmask); };
    asmask = window.top.document.getElementById('AsdivMaskFrame');
    if (asmask) { window.top.document.body.removeChild(asmask);};
    $(document).off("keydown");   
}

function rptcheck() {
    //debugger;
    if (document.readyState == 'complete') {
        HiddenAsloader();
    }
    else {
        setTimeout('rptcheck()', 1000);
    }
}

function inactivityTime() {
    var ast;
    var aspostback = new Date();
    //window.onload = resetTimer;
    // DOM Events
    window.onmousemove = resetTimer;
    window.onkeypress = resetTimer;
	window.addEventListener("compositionupdate", resetTimer);
    //window.onmousedown = resetTimer; // catches touchscreen presses
    //window.onclick = resetTimer;     // catches touchpad clicks
    //window.onscroll = resetTimer;    // catches scrolling with arrow keys
    resetTimer;

    function logout() {
        //alert("閒置時間過久,請重新登入");
        //window.location = "Login.aspx";
        var pagename = "Login.aspx";
        var arrPath = location.pathname.split('/');
        if (arrPath.length > 0) {
            if (arrPath[arrPath.length - 1].toLowerCase().indexOf('.aspx') > -1) {
                pagename = arrPath[arrPath.length - 1].toLowerCase();
            }
        }
		if (pagename.toUpperCase() != "LOGIN.ASPX") {
            var asrelogintag;
            var asreloginoutframe = window.top.document.getElementsByTagName('iframe');
            while(asreloginoutframe.length > 0){
                var ifinalframe = 0;
                for(var ipopc = 0; ipopc < asreloginoutframe.length; ipopc++){
            	var poptmp = asreloginoutframe[ipopc].contentWindow.document.getElementById('asrelogin');
            	if(poptmp){
            	    asrelogintag = poptmp;
            	    break;
            	}
            	if(asreloginoutframe[ipopc].id == 'iframecontent'){
            	     ifinalframe = ipopc;
            	}
                }
                asframetmp = asreloginoutframe[ifinalframe].contentWindow.document.getElementsByTagName('iframe');
                asreloginoutframe = asframetmp;
            }
            var basrelogin = false;
            if(window.top.document.getElementById('ReLogin_div')){
                basrelogin = true;
            }else{
                asreloginoutframe = window.top.document.getElementsByTagName('iframe');
                while(asreloginoutframe.length > 0){
                    var ifinalframe = 0;
                    for(var ipopc = 0; ipopc < asreloginoutframe.length; ipopc++){
            	    var poptmp = asreloginoutframe[ipopc].contentWindow.document.getElementById('ReLogin_div');
                	if(poptmp){
                	    basrelogin = true;
                	    break;
                	}
                	if(asreloginoutframe[ipopc].id == 'iframecontent'){
                	     ifinalframe = ipopc;
                	}
                    }
                    asframetmp = asreloginoutframe[ifinalframe].contentWindow.document.getElementsByTagName('iframe');
                    asreloginoutframe = asframetmp;
                }
            }

            if (asrelogintag) {
                if(!basrelogin){
                    var asreloginchk;
                    var website = location.href;
                    website = website.substring(0, website.lastIndexOf('/') + 1);
                    try {
	                    var asreloginclient = getXmlHttpRequestObject();
	                    asreloginclient.onreadystatechange = function () {
	                    	if (asreloginclient.readyState == 4 && asreloginclient.status == 200) {
	                    		asreloginchk = asreloginclient.getResponseHeader("asui");
	                    	}
	                    }
	                    asreloginclient.open("GET", encodeURI(website + "AsCheck.ashx"), false);
	                    asreloginclient.send();
                    }
                    catch (e) {
                    }

                    if(!asreloginchk){
	                    //ReloginWindow();
                    }
                }
            }
            else {
				alert("閒置時間過久,請重新登入");
                window.top.location = "../Login.aspx";
            }
        }
    }

    function resetTimer() {
	console.log("resetTimer");
        window.top.clearTimeout(ast);
        var sessionTimeoutWarning = 20; //min
        var sTimeout = parseInt(sessionTimeoutWarning) * 60 * 1000;
        ast = window.top.setTimeout(logout, sTimeout);
        var current = new Date();       
        if (((current.getTime() - aspostback.getTime())/60000)>15)
        {            
            try {
                var astimerclient = getXmlHttpRequestObject();
                astimerclient.open("GET", encodeURI("AsCheck.ashx"), false);
                astimerclient.send();
            }
            catch (e) {
            }
            aspostback = new Date();
	    console.log("AsCheck");
        }
        // 1000 milisec = 1 sec         
    }
};


function resizeTime() {
    var asresizetime;
    var asresizetimeout = false;
    var asresizechg = 200;
    //$(window).resize(function () {
	$(window).on('resize', function () {
        asresizetime = new Date();
        if (asresizetimeout === false) {
            asresizetimeout = true;
            setTimeout(resizeend, asresizechg);
        }
    });
    function resizeend() {
        if (new Date() - asresizetime < asresizechg) {
            setTimeout(resizeend, asresizechg);
        } else {
            asresizetimeout = false;
            rePopSize();
            console.log("window resizeend");
        }
    }

    function rePopSize() {
        var poplarges = document.getElementsByClassName('popLarge');
		if(poplarges.length == 0){
			var asiframecontent=document.getElementById('iframecontent');
			if(asiframecontent){
				asiframecontent.style.height= (parseInt(document.documentElement.clientHeight)-60).toString() + "px";
			}
		}
        for (var ipl = 0; ipl < poplarges.length; ipl++) {
            if (poplarges[ipl] != null || typeof (poplarges[ipl]) != undefined) {
                var viewHeight = document.documentElement.clientHeight;
                var viewWidth = document.documentElement.clientWidth;
				//iframe大小也要改
				var ifr = window.frameElement;
				if(ifr!= null && typeof (ifr) != undefined){
					ifr.style.height= (parseInt(ifr.parentElement.clientHeight)).toString() + "px";
				}
				//poplarges[ipl].style.width = (parseInt(viewWidth) - 50).toString() + "px";
				if (window.innerWidth > 780)
				{
				    poplarges[ipl].style.width = (parseInt(viewWidth) - 50).toString() + "px";
				}
				else {
				    poplarges[ipl].style.width = (parseInt(viewWidth)).toString() + "px";
				}
                poplarges[ipl].style.height = (parseInt(viewHeight)).toString() + "px";
            }
        }
        var zbrowserpop = document.getElementsByClassName('zBrowsePop');
		if(zbrowserpop.length == 0){
			var asiframecontent=document.getElementById('iframecontent');
			if(asiframecontent){
				asiframecontent.style.height= (parseInt(document.documentElement.clientHeight)-60).toString() + "px";
			}
		}
        for (var ibp = 0; ibp < zbrowserpop.length; ibp++) {
            if (zbrowserpop[ibp] != null || typeof (zbrowserpop[ibp]) != undefined) {
                var viewHeight = document.documentElement.clientHeight;
                var viewWidth = document.documentElement.clientWidth;
				//iframe大小也要改
				var ifr = window.frameElement;
				if(ifr!= null && typeof (ifr) != undefined){
					ifr.style.height= (parseInt(ifr.parentElement.clientHeight)).toString() + "px";
				}
				//zbrowserpop[ibp].style.width = (parseInt(viewWidth) - 50).toString() + "px";
				if (window.innerWidth > 780)
				{
				    zbrowserpop[ibp].style.width = (parseInt(viewWidth) - 50).toString() + "px";
				}
				else {
				    zbrowserpop[ibp].style.width = (parseInt(viewWidth)).toString() + "px";
				}
                zbrowserpop[ibp].style.height = (parseInt(viewHeight)).toString() + "px";
            }
        }
        //新增判斷function上存不存在有則跑
        if (window.setFreezeGrid) {
            setFreezeGrid();
        }
        //新增判斷特殊字視窗
        var divWord = document.getElementById('divSpecialWord');
        if (divWord) {
            resizeSpecicalWord();
        }
    };
}
resizeTime();

//20210809_依平_scrollbar保持位置
function getFileName()
{
    var url = this.location.href;
    var pos = url.lastIndexOf("/");
    if(pos == -1) {
        pos = url.lastIndexOf("\\");
	}
	var los = url.lastIndexOf(".aspx");
    var filename = url.substr(pos+1,los-pos-1);
    return filename;
}
function getMainName()
{
	var url = this.location.href;
	if(self.parent.frameElement){
		url = this.parent.location.href;
	}
    var pos = url.lastIndexOf("/");
    if(pos == -1) {
        pos = url.lastIndexOf("\\");
	}
	var los = url.lastIndexOf(".aspx");
    var filename = url.substr(pos+1,los-pos-1);
    return filename.substring(0,5);
}

localData = {
          hname:location.hostname?location.hostname:'localStatus',
          isLocalStorage:window.localStorage?true:false,
          dataDom:null,
 
          initDom:function(){ //初始化userData
              if(!this.dataDom){
                  try{
                     this.dataDom = document.createElement('input');
                     this.dataDom.type = 'hidden';
                     this.dataDom.style.display = "none";
                     this.dataDom.addBehavior('#default#userData');
                     document.body.appendChild(this.dataDom);
                     var exDate = new Date();
                     exDate = exDate.getDate()+30;
                     this.dataDom.expires = exDate.toUTCString();
                 }catch(ex){
                     return false;
                 }
             }
             return true;
         },
         set:function(key,value){
             if(this.isLocalStorage){
                 window.localStorage.setItem(key,value);
             }else{
                 if (this.initDom()) {
                     let thhname = location.hostname;
                     let newhname = clocaldata(thhname)
                     this.dataDom.load(checklocaldata(newhname));
                     this.dataDom.setAttribute(key,value);
                     this.dataDom.save(thhname);
                 }
             }
         },
         get: function (key) {
            
             if (this.isLocalStorage) {
                 var localitem = window.localStorage.getItem(key);
                 var newitem = clocaldata(localitem)
                 return checklocalstorage(newitem);
             }else{
                 if(this.initDom()){
                     let thhname = location.hostname;                    
                     let newhname = clocaldata(thhname)
                     this.dataDom.load(checklocaldata(newitem));
                     return this.dataDom.getAttribute(key);
                 }
             }
         },
         remove:function(key){
             if(this.isLocalStorage){
                 localStorage.removeItem(key);
             }else{
                 if(this.initDom()){
                     let localitem = this.hname;
                     let newitem = clocaldata(localitem)
                     this.dataDom.load(checklocaldata(newitem));
                     this.dataDom.removeAttribute(key);
                     this.dataDom.save(this.hname);
                 }
             }
         },
		 clear:function(){
			 if(this.isLocalStorage){
                 localStorage.clear();
             }else{
                 if(this.initDom()){
                     this.dataDom.load(checklocaldata(this.hname));
					 for (var i=0; i<this.dataDom.attributes.length; ++i) {
						attr = this.dataDom.attributes[i];
						this.dataDom.removeAttribute(attr.name);
					 }
                     this.dataDom.save(this.hname);
                 }
             }
		 }
     }
	 

function saveScroll()
{
	//pop窗剛開的時候，因為main版面會移動，所以要避開那個時候設定scroll位置
	//判斷方式:有div_close按鈕，旗標設定為0(只有在main時旗標會是0)
	if(self.frameElement){
		var divClose = self.frameElement.contentDocument.getElementsByClassName('webClose');
		var boolSet = true;
		for(var dc = 0;dc < divClose.length;dc++){
			if(divClose[dc].id.indexOf(getFileName()) > -1){
				boolSet = false;
			}
		}
		if(boolSet == false > 0&&localData.get(getMainName()) == '0'){
			return;
		}
	}
	//html
	localData.set(getFileName()+"_html",window.document.firstElementChild.scrollTop)
	//body
	localData.set(getFileName()+"_body",window.document.body.scrollTop)
	//gridview
	var lsttblFreeze = document.getElementsByClassName("tblFreeze");
	if (lsttblFreeze.length > 0) {
		for (var lst = 0; lst < lsttblFreeze.length; lst++) {
			localData.set(getFileName()+"_"+lsttblFreeze[lst].id,lsttblFreeze[lst].scrollTop);
		}
	}
}

function setScroll()
{
	//if(localData.get(getFileName().substring(0,5)) == null){
	//	localData.clear();
	//}
	//抓close按鈕self.frameElement.contentDocument.getElementsByClassName('webClose')
	//判斷是外還是pop
	if(self.parent.frameElement){
		//是pop
		localData.set(getMainName(),'1')
		//window.document.body.scrollTop=localData.get(getFileName()+"_body");
		window.document.firstElementChild.scrollTop=localData.get(getFileName()+"_html");
		var lsttblFreeze = document.getElementsByClassName("tblFreeze");
		if (lsttblFreeze.length > 0) {
			for (var lst = 0; lst < lsttblFreeze.length; lst++) {
				lsttblFreeze[lst].scrollTop=localData.get(getFileName()+"_"+lsttblFreeze[lst].id);
			}
		}
	}
	else {
		//是外層
		if(localData.get(getMainName()) == '1'){
			window.document.body.scrollTop=localData.get(getFileName()+"_body");
			var lsttblFreeze = document.getElementsByClassName("tblFreeze");
			if (lsttblFreeze.length > 0) {
				for (var lst = 0; lst < lsttblFreeze.length; lst++) {
					lsttblFreeze[lst].scrollTop=localData.get(getFileName()+"_"+lsttblFreeze[lst].id);
				}
			}
			//只保留外層的紀錄
			localData.clear();
			//body
			localData.set(getFileName()+"_body",window.document.body.scrollTop)
			//gridview
			var lsttblFreeze = document.getElementsByClassName("tblFreeze");
			if (lsttblFreeze.length > 0) {
				for (var lst = 0; lst < lsttblFreeze.length; lst++) {
					localData.set(getFileName()+"_"+lsttblFreeze[lst].id,lsttblFreeze[lst].scrollTop);
				}
			}
		}
		else{
			if(localData.get(getMainName()) != null){
				localData.clear();
			}
		}
		localData.set(getMainName(),'0')
	}
    //window.document.body.scrollTop=localData.get(getFileName()+"_body");
	window.document.body.setAttribute("onscroll","saveScroll()");
	var lsttblFreeze = document.getElementsByClassName("tblFreeze");
	if (lsttblFreeze.length > 0) {
		for (var lst = 0; lst < lsttblFreeze.length; lst++) {
			//lsttblFreeze[lst].scrollTop=localData.get(getFileName()+"_"+lsttblFreeze[lst].id);
			lsttblFreeze[lst].setAttribute("onscroll","saveScroll()");
		}
	}
	//clearScroll();
}

function clearScroll()
{
	if(LastPage!=getFileName()){
    //body
	localData.remove(getFileName()+"_body")
	//gridview
	var lsttblFreeze = document.getElementsByClassName("tblFreeze");
		if (lsttblFreeze.length > 0) {
			for (var lst = 0; lst < lsttblFreeze.length; lst++) {
				localData.remove(getFileName()+"_"+lsttblFreeze[lst].id);
			}
		}
	}
}
window.addEventListener("load", function() {
	//20210917_依平_比較目前頁面跟之前紀錄的是否為同一頁面，不同的話不設定scroll
	if(localData.get('page') != getMainName()){
		localData.set(getMainName(),'0');
	}
    setScroll();
});
//20210917_依平_增加離開頁面時判斷postback的參數，設定旗標
window.addEventListener("beforeunload", function()
{
	var theForm;
	var theFormlist = document.getElementsByTagName('form');
	for(var f = 0; f < theFormlist.length; f++){
		//20220418_依平_轉換成小寫比對
		if(theFormlist[f].id.toLowerCase() == ('form_' + getFileName()).toLowerCase()){
			theForm = theFormlist[f];
		}
	}
	if(!theForm){
		theForm = document.form1;
	}
	if(theForm){
	var asevent = theForm.__EVENTTARGET;
		if(asevent){
			//20210924_依平_上下一頁跟搜尋要回到最上面，其他保留原位置
			if( asevent.value.endsWith('_btnLast') || 
				asevent.value.endsWith('_btnNext') ||
				asevent.value.endsWith('_btnBefore') ||
				asevent.value.endsWith('_btnFirst') ||
				asevent.value.endsWith('_btnsearch'))
			{
				localData.set(getMainName(),'0');
			}
			else 
			{
			  localData.set(getMainName(),'1');
			}
		}
	}
	//紀錄目前頁面
	localData.set('page',getMainName());
});
