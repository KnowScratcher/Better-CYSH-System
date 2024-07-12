function LocationWindow(targethref) {
    if (self.frameElement && self.frameElement.tagName == "IFRAME") {
        var oobj = window.frameElement;
        if (oobj) {
            top.location.href = targethref;
        }
    } else {
        location.href = targethref;
    }
}
function ReloginWindow() {
    if (self.frameElement && self.frameElement.tagName == "IFRAME") {
        var oobj = window.frameElement;
        if (oobj) {
            var pheight = oobj.parentElement.offsetHeight;
            oobj.style.height = pheight + "px";
        }
    }
    var close = btnRelogin_createCloseBtn("ReLogin_close");
    var div = btnRelogin_createDiv();
    var div2 = btnRelogin_createDiv();
    div2.id = "ReLogin_div";
    div2.className = "zBrowsePop vcenter ";
    var iframe = document.createElement("iframe");
    iframe.src = "..\\SSO\\ReLogin.aspx";
    iframe.width = "100%";
    iframe.height = "100%";
    iframe.scrolling = "auto";
    var isIE = /msie/i.test(navigator.userAgent) && !window.opera;
    if (isIE) {
        iframe.onreadystatechange = function () {
            if (iframe.readyState == "complete") {
                var asprogress = document.getElementById("AsdivProgress");
                if (asprogress) {
                    document.body.removeChild(asprogress);
                }
                asprogress =
                    window.top.document.getElementById("AsdivProgress");
                if (asprogress) {
                    window.top.document.body.removeChild(asprogress);
                }
                var asmask = document.getElementById("AsdivMaskFrame");
                if (asmask) {
                    document.body.removeChild(asmask);
                }
                asmask = window.top.document.getElementById("AsdivMaskFrame");
                if (asmask) {
                    window.top.document.body.removeChild(asmask);
                }
            }
        };
    } else {
        iframe.onload = function () {
            var asprogress = document.getElementById("AsdivProgress");
            if (asprogress) {
                document.body.removeChild(asprogress);
            }
            asprogress = window.top.document.getElementById("AsdivProgress");
            if (asprogress) {
                window.top.document.body.removeChild(asprogress);
            }
            var asmask = document.getElementById("AsdivMaskFrame");
            if (asmask) {
                document.body.removeChild(asmask);
            }
            asmask = window.top.document.getElementById("AsdivMaskFrame");
            if (asmask) {
                window.top.document.body.removeChild(asmask);
            }
        };
    }
    div2.appendChild(iframe);
    div2.appendChild(close);
    div.appendChild(div2);
    div.className = "vcenter ";
    document.body.appendChild(div);
    close.onclick = function () {
        div.parentNode.removeChild(div);
        var asprogress = document.getElementById("AsdivProgress");
        if (asprogress) {
            document.body.removeChild(asprogress);
        }
        asprogress = window.top.document.getElementById("AsdivProgress");
        if (asprogress) {
            window.top.document.body.removeChild(asprogress);
        }
        var asmask = document.getElementById("AsdivMaskFrame");
        if (asmask) {
            document.body.removeChild(asmask);
        }
        asmask = window.top.document.getElementById("AsdivMaskFrame");
        if (asmask) {
            window.top.document.body.removeChild(asmask);
        }
        var elements =
            window.parent.document.getElementsByClassName("webClose");
        for (var e = 0; e < elements.length; e++) {
            elements[e].style.display = "";
        }
        if (self.frameElement && self.frameElement.tagName == "IFRAME") {
            var oobj = window.frameElement;
            if (oobj) {
                var pheight = oobj.parentElement.offsetHeight;
                pheight = pheight - 55;
                oobj.style.height = pheight + "px";
            }
            var asssocontent =
                window.parent.document.getElementById("divcontent");
            if (asssocontent) {
                asssocontent.style.paddingTop = "55px";
            }
            var asssoheader =
                window.parent.document.getElementsByTagName("HEADER");
            if (asssoheader) {
                if (asssoheader.length > 0) {
                    asssoheader[0].style.display = "";
                }
            }
            var asssoinfo =
                window.parent.document.getElementsByClassName("infoFoldBtn");
            if (asssoinfo) {
                if (asssoinfo.length > 0) {
                    asssoinfo[0].style.display = "";
                }
            }
        }
        document.body.style.overflow = "scroll";
    };
    var pageHeight =
        document.body.scrollHeight > document.body.clientHeight
            ? document.body.scrollHeight
            : document.body.clientHeight;
    var viewHeight = document.documentElement.clientHeight;
    var scrollTop =
        document.body.scrollTop != null &&
        document.body.scrollTop > document.documentElement.scrollTop
            ? document.body.scrollTop
            : document.documentElement.scrollTop;
    div2.style.width = "600px";
    div2.style.height = parseInt(viewHeight).toString() + "px";
    div.style.width = "100%";
    div.style.height = "100vh";
    div.style.position = "fixed";
    div.style.backgroundColor = "hsla(0, 0%, 0%, 0.6)";
    close.style.right = "2px";
    close.style.top = "2px";
    var elements = window.parent.document.getElementsByClassName("webClose");
    for (var e = 0; e < elements.length; e++) {
        if (elements[e].id != close.id) {
            elements[e].style.display = "none";
        }
    }
    if (self.frameElement && self.frameElement.tagName == "IFRAME") {
        var oobj = window.frameElement;
        var asssocontent = window.parent.document.getElementById("divcontent");
        if (asssocontent) {
            asssocontent.style.height = "calc(100vh - 4px)";
            asssocontent.style.paddingTop = "0px";
        }
        var asssoheader = window.parent.document.getElementsByTagName("HEADER");
        if (asssoheader) {
            if (asssoheader.length > 0) {
                asssoheader[0].style.display = "none";
            }
        }
        var asssoinfo =
            window.parent.document.getElementsByClassName("infoFoldBtn");
        if (asssoinfo) {
            if (asssoinfo.length > 0) {
                asssoinfo[0].style.display = "none";
            }
        }
    }
}
function ReloginTargetWindow(target) {
    var tmpoobj = self.frameElement;
    var tmpwindow = window;
    var tempdocument = document;
    if (self.frameElement && self.frameElement.tagName == "IFRAME") {
        oobj = window.frameElement;
        if (oobj) {
            var pheight = oobj.parentElement.offsetHeight;
            oobj.style.height = pheight + "px";
        }
    } else {
        if (self.window.length > 0) {
            for (var wi = 0; wi < self.window.length; wi++) {
                if (
                    self.window[wi].frameElement &&
                    self.window[wi].frameElement.tagName == "IFRAME" &&
                    self.window[wi].frameElement.id == "iframecontent"
                ) {
                    tmpoobj = window[wi].frameElement;
                    tmpwindow = window[wi];
                    tempdocument = tmpoobj.contentDocument;
                    if (tmpoobj) {
                        var pheight = tmpoobj.parentElement.offsetHeight;
                        tmpoobj.style.height = pheight + "px";
                    }
                }
            }
        }
    }
    var close = btnRelogin_createCloseBtn("ReLogin_close");
    var div = btnRelogin_createDiv();
    var div2 = btnRelogin_createDiv();
    div2.id = "ReLogin_div";
    div2.className = "zBrowsePop vcenter ";
    var iframe = document.createElement("iframe");
    iframe.src = "..\\SSO\\ReLogin.aspx?astarget=" + encodeURIComponent(target);
    iframe.width = "100%";
    iframe.height = "100%";
    iframe.scrolling = "auto";
    var isIE = /msie/i.test(navigator.userAgent) && !tmpwindow.opera;
    if (isIE) {
        iframe.onreadystatechange = function () {
            if (iframe.readyState == "complete") {
                var asprogress = document.getElementById("AsdivProgress");
                if (asprogress) {
                    document.body.removeChild(asprogress);
                }
                asprogress =
                    tmpwindow.top.document.getElementById("AsdivProgress");
                if (asprogress) {
                    tmpwindow.top.document.body.removeChild(asprogress);
                }
                var asmask = document.getElementById("AsdivMaskFrame");
                if (asmask) {
                    document.body.removeChild(asmask);
                }
                asmask =
                    tmpwindow.top.document.getElementById("AsdivMaskFrame");
                if (asmask) {
                    tmpwindow.top.document.body.removeChild(asmask);
                }
            }
        };
    } else {
        iframe.onload = function () {
            var asprogress = document.getElementById("AsdivProgress");
            if (asprogress) {
                document.body.removeChild(asprogress);
            }
            asprogress = tmpwindow.top.document.getElementById("AsdivProgress");
            if (asprogress) {
                tmpwindow.top.document.body.removeChild(asprogress);
            }
            var asmask = document.getElementById("AsdivMaskFrame");
            if (asmask) {
                document.body.removeChild(asmask);
            }
            asmask = tmpwindow.top.document.getElementById("AsdivMaskFrame");
            if (asmask) {
                tmpwindow.top.document.body.removeChild(asmask);
            }
        };
    }
    div2.appendChild(iframe);
    div2.appendChild(close);
    div.appendChild(div2);
    div.className = "vcenter ";
    tempdocument.body.appendChild(div);
    close.onclick = function () {
        div.parentNode.removeChild(div);
        var elements =
            tmpwindow.parent.document.getElementsByClassName("webClose");
        for (var e = 0; e < elements.length; e++) {
            elements[e].style.display = "";
        }
        if (self.frameElement && self.frameElement.tagName == "IFRAME") {
            var oobj = window.frameElement;
            if (oobj) {
                var pheight = oobj.parentElement.offsetHeight;
                pheight = pheight - 55;
                oobj.style.height = pheight + "px";
            }
            var asssocontent =
                window.parent.document.getElementById("divcontent");
            if (asssocontent) {
                asssocontent.style.paddingTop = "55px";
            }
            var asssoheader =
                window.parent.document.getElementsByTagName("HEADER");
            if (asssoheader) {
                if (asssoheader.length > 0) {
                    asssoheader[0].style.display = "";
                }
            }
            var asssoinfo =
                window.parent.document.getElementsByClassName("infoFoldBtn");
            if (asssoinfo) {
                if (asssoinfo.length > 0) {
                    asssoinfo[0].style.display = "";
                }
            }
        } else {
            if (self.window.length > 0) {
                if (
                    tmpoobj &&
                    tmpoobj.tagName == "IFRAME" &&
                    tmpoobj.id == "iframecontent"
                ) {
                    if (tmpoobj) {
                        var pheight = tmpoobj.parentElement.offsetHeight;
                        pheight = pheight - 55;
                        tmpoobj.style.height = pheight + "px";
                    }
                    var asssocontent =
                        tmpwindow.parent.document.getElementById("divcontent");
                    if (asssocontent) {
                        asssocontent.style.paddingTop = "55px";
                    }
                    var asssoheader =
                        tmpwindow.parent.document.getElementsByTagName(
                            "HEADER"
                        );
                    if (asssoheader) {
                        if (asssoheader.length > 0) {
                            asssoheader[0].style.display = "";
                        }
                    }
                    var asssoinfo =
                        tmpwindow.parent.document.getElementsByClassName(
                            "infoFoldBtn"
                        );
                    if (asssoinfo) {
                        if (asssoinfo.length > 0) {
                            asssoinfo[0].style.display = "";
                        }
                    }
                }
            }
        }
        tempdocument.body.style.overflow = "scroll";
    };
    var pageHeight =
        tempdocument.body.scrollHeight > tempdocument.body.clientHeight
            ? tempdocument.body.scrollHeight
            : tempdocument.body.clientHeight;
    var viewHeight = tempdocument.documentElement.clientHeight;
    var scrollTop =
        tempdocument.body.scrollTop != null &&
        tempdocument.body.scrollTop > tempdocument.documentElement.scrollTop
            ? tempdocument.body.scrollTop
            : tempdocument.documentElement.scrollTop;
    div2.style.width = "600px";
    div2.style.height = parseInt(viewHeight * 0.85).toString() + "px";
    div.style.width = "100%";
    div.style.height = "100vh";
    div.style.position = "fixed";
    div.style.backgroundColor = "hsla(0, 0%, 0%, 0.6)";
    close.style.right = "2px";
    close.style.top = "2px";
    var elements = tmpwindow.parent.document.getElementsByClassName("webClose");
    for (var e = 0; e < elements.length; e++) {
        if (elements[e].id != close.id) {
            elements[e].style.display = "none";
        }
    }
    if (self.frameElement && self.frameElement.tagName == "IFRAME") {
        var oobj = window.frameElement;
        var asssocontent = window.parent.document.getElementById("divcontent");
        if (asssocontent) {
            asssocontent.style.height = "calc(100vh - 4px)";
            asssocontent.style.paddingTop = "0px";
        }
        var asssoheader = window.parent.document.getElementsByTagName("HEADER");
        if (asssoheader) {
            if (asssoheader.length > 0) {
                asssoheader[0].style.display = "none";
            }
        }
        var asssoinfo =
            window.parent.document.getElementsByClassName("infoFoldBtn");
        if (asssoinfo) {
            if (asssoinfo.length > 0) {
                asssoinfo[0].style.display = "none";
            }
        }
    } else {
        if (self.window.length > 0) {
            if (
                tmpoobj &&
                tmpoobj.tagName == "IFRAME" &&
                tmpoobj.id == "iframecontent"
            ) {
                var asssocontent =
                    tmpwindow.parent.document.getElementById("divcontent");
                if (asssocontent) {
                    asssocontent.style.height = "calc(100vh - 4px)";
                    asssocontent.style.paddingTop = "0px";
                }
                var asssoheader =
                    tmpwindow.parent.document.getElementsByTagName("HEADER");
                if (asssoheader) {
                    if (asssoheader.length > 0) {
                        asssoheader[0].style.display = "none";
                    }
                }
                var asssoinfo =
                    tmpwindow.parent.document.getElementsByClassName(
                        "infoFoldBtn"
                    );
                if (asssoinfo) {
                    if (asssoinfo.length > 0) {
                        asssoinfo[0].style.display = "none";
                    }
                }
            }
        }
    }
}
function ReloginContextWindow(target) {
    var close = btnRelogin_createCloseBtn("ReLogin_close");
    var div = btnRelogin_createDiv();
    var div2 = btnRelogin_createDiv();
    div2.id = "ReLogin_div";
    div2.className = "zBrowsePop vcenter ";
    var iframe = document.createElement("iframe");
    iframe.src =
        "..\\SSO\\ReLogin.aspx?ascontext=" + encodeURIComponent(target);
    iframe.width = "100%";
    iframe.height = "100%";
    iframe.scrolling = "auto";
    var isIE = /msie/i.test(navigator.userAgent) && !window.opera;
    if (isIE) {
        iframe.onreadystatechange = function () {
            if (iframe.readyState == "complete") {
                var asprogress = document.getElementById("AsdivProgress");
                if (asprogress) {
                    document.body.removeChild(asprogress);
                }
                asprogress =
                    window.top.document.getElementById("AsdivProgress");
                if (asprogress) {
                    window.top.document.body.removeChild(asprogress);
                }
                var asmask = document.getElementById("AsdivMaskFrame");
                if (asmask) {
                    document.body.removeChild(asmask);
                }
                asmask = window.top.document.getElementById("AsdivMaskFrame");
                if (asmask) {
                    window.top.document.body.removeChild(asmask);
                }
            }
        };
    } else {
        iframe.onload = function () {
            var asprogress = document.getElementById("AsdivProgress");
            if (asprogress) {
                document.body.removeChild(asprogress);
            }
            asprogress = window.top.document.getElementById("AsdivProgress");
            if (asprogress) {
                window.top.document.body.removeChild(asprogress);
            }
            var asmask = document.getElementById("AsdivMaskFrame");
            if (asmask) {
                document.body.removeChild(asmask);
            }
            asmask = window.top.document.getElementById("AsdivMaskFrame");
            if (asmask) {
                window.top.document.body.removeChild(asmask);
            }
        };
    }
    div2.appendChild(iframe);
    div2.appendChild(close);
    div.appendChild(div2);
    div.className = "vcenter ";
    document.body.appendChild(div);
    close.onclick = function () {
        div.parentNode.removeChild(div);
        var elements =
            window.parent.document.getElementsByClassName("webClose");
        for (var e = 0; e < elements.length; e++) {
            elements[e].style.display = "";
        }
        if (self.frameElement && self.frameElement.tagName == "IFRAME") {
            var oobj = window.frameElement;
            var asssoheader =
                window.parent.document.getElementsByTagName("HEADER");
            if (asssoheader) {
                if (asssoheader.length > 0) {
                    asssoheader[0].style.display = "";
                }
            }
            var asssoinfo =
                window.parent.document.getElementsByClassName("infoFoldBtn");
            if (asssoinfo) {
                if (asssoinfo.length > 0) {
                    asssoinfo[0].style.display = "";
                }
            }
        }
        document.body.style.overflow = "scroll";
    };
    var pageHeight =
        document.body.scrollHeight > document.body.clientHeight
            ? document.body.scrollHeight
            : document.body.clientHeight;
    var viewHeight = document.documentElement.clientHeight;
    var scrollTop =
        document.body.scrollTop != null &&
        document.body.scrollTop > document.documentElement.scrollTop
            ? document.body.scrollTop
            : document.documentElement.scrollTop;
    div2.style.width = "600px";
    div2.style.height = parseInt(viewHeight * 0.85).toString() + "px";
    div.style.width = "100%";
    div.style.height = "100vh";
    div.style.position = "fixed";
    div.style.backgroundColor = "hsla(0, 0%, 0%, 0.6)";
    close.style.right = "2px";
    close.style.top = "2px";
    var elements = window.parent.document.getElementsByClassName("webClose");
    for (var e = 0; e < elements.length; e++) {
        if (elements[e].id != close.id) {
            elements[e].style.display = "none";
        }
    }
    if (self.frameElement && self.frameElement.tagName == "IFRAME") {
        var oobj = window.frameElement;
        var asssoheader = window.parent.document.getElementsByTagName("HEADER");
        if (asssoheader) {
            if (asssoheader.length > 0) {
                asssoheader[0].style.display = "none";
            }
        }
        var asssoinfo =
            window.parent.document.getElementsByClassName("infoFoldBtn");
        if (asssoinfo) {
            if (asssoinfo.length > 0) {
                asssoinfo[0].style.display = "none";
            }
        }
    }
}
function Close_UpWin() {
    $("#ReLogin_div").slideUp("5000", function () {
        $("#ReLogin_div").remove();
    });
}
function btnRelogin_createDiv() {
    var newDiv = document.createElement("div");
    newDiv.style.position = "absolute";
    newDiv.style.background = "rgb(255, 255, 255)";
    newDiv.style.zIndex = "9999";
    return newDiv;
}
function btnRelogin_createCloseBtn(div_id) {
    var close = document.createElement("div");
    close.id = div_id.replace("_div", "_close");
    close.style.zIndex = "9999";
    close.className = "webClose";
    return close;
}
function btnRelogin_createIframe() {
    var iframe = document.createElement("iframe");
    iframe.style.overflow = "auto";
    iframe.width = "100%";
    iframe.height = "100%";
    iframe.frameBorder = 0;
    return iframe;
}
