function SerachGrid(grd, tbSrh) {
    var obj = document.getElementById(grd.id + "_show");
    if (obj != null) {
        grd.parentNode.removeChild(obj);
    }
    var sKeyWord = tbSrh.value.toLowerCase().trim();
    if (sKeyWord.length == 0) {
        grd.style.display = "";
    } else {
        if (grd.style.display != "none") {
            grd.style.display = "none";
        }
        var hasInnerText =
            document.getElementsByTagName("body")[0].innerText !== undefined
                ? true
                : false;
        var asTable = document.createElement("table");
        asTable.id = grd.id + "_show";
        asTable.border = grd.border;
        asTable.cellSpacing = grd.cellSpacing;
        asTable.className = grd.className;
        for (var i = grd.style.length; i-- > 0; ) {
            var name = grd.style[i];
            asTable.style.setProperty(
                name,
                grd.style.getPropertyValue(name),
                (priority = grd.style.getPropertyPriority(name))
            );
        }
        asTable.style.display = "";
        var asTbody = document.createElement("tbody");
        var asth = grd.rows[0].cloneNode(true);
        asTbody.appendChild(asth);
        for (var r = 1, row; (row = grd.rows[r]); r++) {
            var bfind = false;
            var rowtext = hasInnerText ? row.innerText : row.textContent;
            if (rowtext.toLowerCase().indexOf(sKeyWord) != -1) {
                for (var c = 0, col; (col = row.cells[c]); c++) {
                    for (var n = 0, nod; (nod = col.childNodes[n]); n++) {
                        var nodtext =
                            nod.innerText != undefined
                                ? nod.innerText
                                : nod.textContent;
                        if (
                            nodtext.toLowerCase().indexOf(sKeyWord) != -1 &&
                            nod.innerHTML.indexOf("labHidden") == -1
                        ) {
                            bfind = true;
                            break;
                        }
                    }
                    if (bfind) break;
                }
            }
            if (bfind) {
                var clone = row.cloneNode(true);
                asTbody.appendChild(clone);
            } else {
            }
        }
        asTable.appendChild(asTbody);
        grd.parentNode.appendChild(asTable);
    }
}
function SerachGridNoheader(grd, tbSrh) {
    var obj = document.getElementById(grd.id + "_show");
    if (obj != null) {
        grd.parentNode.removeChild(obj);
    }
    var sKeyWord = tbSrh.value.toLowerCase().trim();
    if (sKeyWord.length == 0) {
        grd.style.display = "";
    } else {
        if (grd.style.display != "none") {
            grd.style.display = "none";
        }
        var hasInnerText =
            document.getElementsByTagName("body")[0].innerText !== undefined
                ? true
                : false;
        var asTable = document.createElement("table");
        asTable.id = grd.id + "_show";
        asTable.border = grd.border;
        asTable.cellSpacing = grd.cellSpacing;
        asTable.className = grd.className;
        for (var i = grd.style.length; i-- > 0; ) {
            var name = grd.style[i];
            asTable.style.setProperty(
                name,
                grd.style.getPropertyValue(name),
                (priority = grd.style.getPropertyPriority(name))
            );
        }
        asTable.style.display = "";
        var asTbody = document.createElement("tbody");
        for (var r = 0, row; (row = grd.rows[r]); r++) {
            var bfind = false;
            var rowtext =
                row.innerText != undefined ? row.innerText : row.textContent;
            if (rowtext.toLowerCase().indexOf(sKeyWord) != -1) {
                for (var c = 0, col; (col = row.cells[c]); c++) {
                    for (var n = 0, nod; (nod = col.childNodes[n]); n++) {
                        var nodtext =
                            nod.innerText != undefined
                                ? nod.innerText
                                : nod.textContent;
                        if (
                            nodtext.toLowerCase().indexOf(sKeyWord) != -1 &&
                            nod.innerHTML.indexOf("labHidden") == -1
                        ) {
                            bfind = true;
                            break;
                        }
                    }
                    if (bfind) break;
                }
            }
            if (bfind) {
                var clonerow = row.cloneNode(true);
                asTbody.appendChild(clonerow);
            } else {
            }
        }
        asTable.appendChild(asTbody);
        grd.parentNode.appendChild(asTable);
    }
}
function BrowserAction(asURL, sListFld) {
    var aryListFld = sListFld.split("&");
    var strLink = "";
    for (var i = 0; i < aryListFld.length; i++) {
        if (aryListFld[i].trim().length == 0) {
            continue;
        }
        strLink +=
            "window.parent.document.getElementById('" + aryListFld[i] + ";";
    }
    eval(strLink);
    window.parent.document.getElementById(asURL + "_close").onclick();
}
function asBrowserAction(ctl, asURL, sListFld) {
    var aryListFld = sListFld.split("&");
    for (var i = 0; i < aryListFld.length; i++) {
        if (aryListFld[i].trim().length == 0) {
            continue;
        }
        var aListFld = aryListFld[i].replaceAll("!!", "\n").split("=");
        var ctlpoint = aListFld[0].toString().indexOf("*");
        if (ctlpoint > 0) {
            var iloop = 1;
            var ichk = 0;
            while (ichk < 5) {
                iloop = iloop + 1;
                var ctl = iloop.toString();
                if (iloop < 10) ctl = "0" + ctl;
                var obj = window.parent.document.getElementById(
                    aListFld[0].replace("*", ctl)
                );
                if (obj == null) {
                    obj = window.parent.document.getElementById(
                        "ctl00_MainContent_" + aListFld[0]
                    );
                }
                if (obj != null) {
                    var listapp = obj.getAttribute("aslistapp");
                    if (obj.hasChildNodes) {
                        for (var j = 0; j < obj.children.length; j++) {
                            if (obj.children[j].tagName == "INPUT") {
                                if (
                                    listapp != null &&
                                    typeof listapp != "undefind"
                                ) {
                                    if (obj.children[j].value.length > 0)
                                        obj.children[j].value += listapp;
                                    obj.children[j].value += aListFld[1];
                                } else {
                                    obj.children[j].value = aListFld[1];
                                }
                            }
                            if (
                                obj.children[j].tagName == "SPAN" &&
                                obj.children[j].className == "labHidden"
                            ) {
                                if (
                                    listapp != null &&
                                    typeof listapp != "undefind"
                                ) {
                                    if (obj.children[j].innerText.length > 0)
                                        obj.children[j].innerText += listapp;
                                    obj.children[j].innerText += aListFld[1];
                                } else {
                                    obj.children[j].innerText = aListFld[1];
                                }
                            }
                            if (
                                obj.children[j].tagName == "DIV" &&
                                obj.children[j].className == "asContentV"
                            ) {
                                if (obj.children[j].hasChildNodes) {
                                    for (
                                        var jj = 0;
                                        jj < obj.children[j].children.length;
                                        jj++
                                    ) {
                                        var objCh =
                                            obj.children[j].children[jj];
                                        if (objCh.tagName == "INPUT") {
                                            if (
                                                listapp != null &&
                                                typeof listapp != "undefind"
                                            ) {
                                                if (objCh.value.length > 0)
                                                    objCh.value += listapp;
                                                objCh.value += aListFld[1];
                                            } else {
                                                objCh.value = aListFld[1];
                                            }
                                        }
                                        if (objCh.tagName == "SELECT") {
                                            for (
                                                var iop = 0;
                                                iop < objCh.options.length;
                                                iop++
                                            ) {
                                                if (
                                                    objCh.options[iop].value ==
                                                    aListFld[1]
                                                ) {
                                                    objCh.options[
                                                        iop
                                                    ].selected = true;
                                                    break;
                                                }
                                            }
                                        }
                                        if (objCh.tagName == "TEXTAREA") {
                                            if (
                                                listapp != null &&
                                                typeof listapp != "undefind"
                                            ) {
                                                if (objCh.value.length > 0)
                                                    objCh.value += listapp;
                                                objCh.value += aListFld[1];
                                            } else {
                                                objCh.value = aListFld[1];
                                            }
                                        }
                                        if (objCh.tagName == "TABLE") {
                                            var tmp =
                                                objCh.getElementsByTagName(
                                                    "INPUT"
                                                );
                                            for (
                                                var t = 0;
                                                t < tmp.length;
                                                t++
                                            ) {
                                                if (tmp[t].type == "radio") {
                                                    if (
                                                        aListFld[1] ==
                                                        tmp[t].value
                                                    ) {
                                                        tmp[t].checked = true;
                                                        break;
                                                    }
                                                }
                                            }
                                        }
                                        if (objCh.tagName == "SPAN") {
                                            var tmp =
                                                objCh.getElementsByTagName(
                                                    "INPUT"
                                                );
                                            for (
                                                var t = 0;
                                                t < tmp.length;
                                                t++
                                            ) {
                                                if (tmp[t].type == "radio") {
                                                    if (
                                                        aListFld[1] ==
                                                        tmp[t].value
                                                    ) {
                                                        tmp[t].checked = true;
                                                        break;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                } else {
                    ichk = ichk + 1;
                }
            }
        } else {
            var obj = window.parent.document.getElementById(aListFld[0]);
            if (obj == null) {
                obj = window.parent.document.getElementById(
                    "ctl00_MainContent_" + aListFld[0]
                );
            }
            if (obj != null) {
                var listapp = obj.getAttribute("aslistapp");
                if (obj.hasChildNodes) {
                    for (var j = 0; j < obj.children.length; j++) {
                        if (obj.children[j].tagName == "INPUT") {
                            if (
                                listapp != null &&
                                typeof listapp != "undefind"
                            ) {
                                if (obj.children[j].value.length > 0)
                                    obj.children[j].value += listapp;
                                obj.children[j].value += aListFld[1];
                            } else {
                                obj.children[j].value = aListFld[1];
                            }
                        }
                        if (
                            obj.children[j].tagName == "SPAN" &&
                            obj.children[j].className == "labHidden"
                        ) {
                            if (
                                listapp != null &&
                                typeof listapp != "undefind"
                            ) {
                                if (obj.children[j].innerText.length > 0)
                                    obj.children[j].innerText += listapp;
                                obj.children[j].innerText += aListFld[1];
                            } else {
                                obj.children[j].innerText = aListFld[1];
                            }
                        }
                        if (
                            obj.children[j].tagName == "DIV" &&
                            obj.children[j].className == "asContentV"
                        ) {
                            if (obj.children[j].hasChildNodes) {
                                for (
                                    var jj = 0;
                                    jj < obj.children[j].children.length;
                                    jj++
                                ) {
                                    var objCh = obj.children[j].children[jj];
                                    if (objCh.tagName == "INPUT") {
                                        if (
                                            listapp != null &&
                                            typeof listapp != "undefind"
                                        ) {
                                            if (objCh.value.length > 0)
                                                objCh.value += listapp;
                                            objCh.value += aListFld[1];
                                        } else {
                                            objCh.value = aListFld[1];
                                        }
                                    }
                                    if (objCh.tagName == "SELECT") {
                                        for (
                                            var iop = 0;
                                            iop < objCh.options.length;
                                            iop++
                                        ) {
                                            if (
                                                objCh.options[iop].value ==
                                                aListFld[1]
                                            ) {
                                                objCh.options[
                                                    iop
                                                ].selected = true;
                                                break;
                                            }
                                        }
                                    }
                                    if (objCh.tagName == "TEXTAREA") {
                                        if (
                                            listapp != null &&
                                            typeof listapp != "undefind"
                                        ) {
                                            if (objCh.value.length > 0)
                                                objCh.value += listapp;
                                            objCh.value += aListFld[1];
                                        } else {
                                            objCh.value = aListFld[1];
                                        }
                                    }
                                    if (objCh.tagName == "TABLE") {
                                        var tmp =
                                            objCh.getElementsByTagName("INPUT");
                                        for (var t = 0; t < tmp.length; t++) {
                                            if (tmp[t].type == "radio") {
                                                if (
                                                    aListFld[1] == tmp[t].value
                                                ) {
                                                    tmp[t].checked = true;
                                                    break;
                                                }
                                            }
                                        }
                                    }
                                    if (objCh.tagName == "SPAN") {
                                        var tmp =
                                            objCh.getElementsByTagName("INPUT");
                                        for (var t = 0; t < tmp.length; t++) {
                                            if (tmp[t].type == "radio") {
                                                if (
                                                    aListFld[1] == tmp[t].value
                                                ) {
                                                    tmp[t].checked = true;
                                                    break;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    window.parent.document.getElementById(asURL + "_close").onclick();
}
function btnSingleWindow(btn, clientID, asURL, asMode, asAction, asListFiled) {
    if (!asCheckSession()) {
        alert("您尚未登入或已逾登入有效時限!\n請重新登入...");
        ReloginWindow();
        return false;
    }
    document.body.style.overflow = "hidden";
    var noscroll = function (event) {
        event.preventDefault();
    };
    document.body.addEventListener("touchmove", noscroll, false);
    if (self.frameElement && self.frameElement.tagName == "IFRAME") {
        var oobj = self.frameElement;
        if (oobj) {
            var pheight = oobj.parentElement.offsetHeight;
            oobj.style.height = pheight + "px";
        }
    }
    var div_name = asURL.substring(0, asURL.indexOf(".")) + "_div";
    if (document.getElementById(div_name) != null) {
        if (asMode.toLowerCase() == "always") {
            document
                .getElementById(div_name)
                .parentNode.removeChild(document.getElementById(div_name));
        } else if (asMode.toLowerCase() == "onlyone") {
            setSingleWindow(
                document.getElementById(div_name),
                OneFiled,
                document.getElementById(div_name.replace("_div", "_close"))
            );
            return;
        }
    }
    if (asURL.indexOf("?") == -1) {
        asURL = asURL + "?";
    } else {
        var tmpasURL = asURL.split("?");
        asURL = tmpasURL[0] + "?";
        for (var i = 1; i < tmpasURL.length; i++) {
            asURL = asURL + encodeURIComponent(tmpasURL[i]) + "&";
        }
        if (asURL.substring(asURL.length - 1) != "&") {
            asURL = asURL + "&";
        }
    }
    var close = btnBroswer_createCloseBtn(div_name);
    var div = btnBroswer_createDiv();
    var div2 = btnBroswer_createDiv();
    div2.id = div_name;
    div2.className = "zBrowsePop vcenter ";
    var iframe = document.createElement("iframe");
    var getUrlString = location.href;
    var asnewurl = new URL(getUrlString);
    var asnewParam = "";
    var assys = asnewurl.searchParams.get("assys");
    if (assys) {
        asnewParam += "assys=" + assys + "&";
    }
    var asapp = asnewurl.searchParams.get("asAppParam");
    if (asapp) {
        asnewParam += "asAppParam=" + asapp + "&";
    }
    var asC = asURL.indexOf("?");
    if (asC > -1) {
        var asBeginurl = asURL.substring(0, asC);
        var asEndurl = asURL.substring(asC + 1, asURL.length);
        asURL = asBeginurl + "?" + asnewParam + asEndurl;
    } else {
        asURL = asURL + "?" + asnewParam;
    }
    var popframesrc = asURL + "ASPopParam=" + encodeURIComponent(asListFiled);
    if (btn) {
        var AsPopClear = btn.getAttribute("asClearFiled");
        if (AsPopClear) {
            popframesrc =
                asURL +
                "ASPopParam=" +
                encodeURIComponent(asListFiled) +
                "&AsPopClear=" +
                encodeURIComponent(AsPopClear);
        }
    }
    iframe.src = popframesrc;
    iframe.width = "100%";
    iframe.height = "100%";
    iframe.scrolling = "auto";
    var isIE = /msie/i.test(navigator.userAgent) && !window.opera;
    if (isIE) {
        iframe.onreadystatechange = function () {
            if (iframe.readyState == "complete") {
                HiddenAsloader();
            }
        };
    } else {
        iframe.onload = function () {
            var asprogress = document.getElementById("AsdivProgress");
            HiddenAsloader();
        };
    }
    ShowAsloader();
    div2.appendChild(iframe);
    div2.appendChild(close);
    div.appendChild(div2);
    div.className = "vcenter ";
    document.body.appendChild(div);
    setSingleWindow(div, div2, close);
    if (asMode.toLowerCase() == "always") {
        close.onclick = function () {
            var asCloseJs = btn.getAttribute("data-asclosebeginjs");
            if (asCloseJs) {
                if (arrasclientJS[asCloseJs] != null) {
                    arrasclientJS[asCloseJs]();
                }
            }
            div.parentNode.removeChild(div);
            var elements =
                window.parent.document.getElementsByClassName("webClose");
            for (var e = 0; e < elements.length; e++) {
                elements[e].style.display = "";
            }
            document.body.style.overflow = "";
            if (self.frameElement && self.frameElement.tagName == "IFRAME") {
                var oobj = window.frameElement;
                if (oobj) {
                    if (
                        self.parent.frameElement &&
                        self.parent.frameElement.tagName == "IFRAME"
                    ) {
                    } else {
                        var pheight = oobj.parentElement.offsetHeight;
                        pheight = pheight - 55;
                        oobj.style.height = pheight + "px";
                    }
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
                    window.parent.document.getElementsByClassName(
                        "infoFoldBtn"
                    );
                if (asssoinfo) {
                    if (asssoinfo.length > 0) {
                        asssoinfo[0].style.display = "";
                    }
                }
            }
        };
    } else if (asMode.toLowerCase() == "onlyone") {
        close.onclick = function () {
            var asCloseJs = btn.getAttribute("data-asclosebeginjs");
            if (asCloseJs) {
                if (arrasclientJS[asCloseJs] != null) {
                    arrasclientJS[asCloseJs]();
                }
            }
            div.style.display = "none";
            var elements =
                window.parent.document.getElementsByClassName("webClose");
            for (var e = 0; e < elements.length; e++) {
                elements[e].style.display = "";
            }
            var asCalendarDiv = document.getElementById("asCalendar");
            if (asCalendarDiv) {
                asCalendarDiv.style.display = "none";
            }
            document.body.style.overflow = "";
            if (self.frameElement && self.frameElement.tagName == "IFRAME") {
                var oobj = window.frameElement;
                if (oobj) {
                    if (
                        self.parent.frameElement &&
                        self.parent.frameElement.tagName == "IFRAME"
                    ) {
                    } else {
                        var pheight = oobj.parentElement.offsetHeight;
                        pheight = pheight - 55;
                        oobj.style.height = pheight + "px";
                    }
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
                    window.parent.document.getElementsByClassName(
                        "infoFoldBtn"
                    );
                if (asssoinfo) {
                    if (asssoinfo.length > 0) {
                        asssoinfo[0].style.display = "";
                    }
                }
            }
        };
    }
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
    return false;
}
function btnPSingleWindow(
    btn,
    clientID,
    asURL,
    asMode,
    asAction,
    asListFiled,
    asTransParam,
    asTransObjs
) {
    if (!asCheckSession()) {
        alert("您尚未登入或已逾登入有效時限!\n請重新登入...");
        ReloginWindow();
        return false;
    }
    var asTransValue = "";
    for (ip = 0; ip < asTransObjs.length; ip++) {
        asTransObj = asTransObjs[ip];
        if (asTransObj != null) {
            if (asTransObj.tagName == "INPUT") {
                asTransValue += asTransObj.value + "!!";
            } else {
                if (asTransObj.hasChildNodes) {
                    if (
                        asTransObj.getElementsByClassName("asContentV").length >
                        0
                    ) {
                        var TObj =
                            asTransObj.getElementsByClassName("asContentV");
                        for (
                            var tt = 0;
                            tt <
                            asTransObj.getElementsByClassName("asContentV")
                                .length;
                            tt++
                        ) {
                            if (
                                TObj[tt].tagName == "DIV" &&
                                TObj[tt].className == "asContentV"
                            ) {
                                if (TObj[tt].hasChildNodes) {
                                    if (
                                        TObj[tt].children[0].tagName == "INPUT"
                                    ) {
                                        asTransValue +=
                                            TObj[tt].children[0].value + "!!";
                                    }
                                    if (
                                        TObj[tt].children[0].tagName == "SELECT"
                                    ) {
                                        for (
                                            var iop = 0;
                                            iop <
                                            TObj[tt].children[0].options.length;
                                            iop++
                                        ) {
                                            if (
                                                TObj[tt].children[0].options[
                                                    iop
                                                ].selected == true
                                            ) {
                                                asTransValue +=
                                                    TObj[tt].children[0]
                                                        .options[iop].value +
                                                    "!!";
                                                break;
                                            }
                                        }
                                    }
                                    if (
                                        TObj[tt].children[0].tagName == "TABLE"
                                    ) {
                                        var TableObj = TObj[tt].children[0];
                                        var InpObj =
                                            TableObj.getElementsByTagName(
                                                "INPUT"
                                            );
                                        for (
                                            var item = 0;
                                            item < InpObj.length;
                                            item++
                                        ) {
                                            if (
                                                InpObj[item].type == "radio" ||
                                                InpObj[item].type == "checkbox"
                                            ) {
                                                if (InpObj[item].checked) {
                                                    asTransValue +=
                                                        InpObj[item].value +
                                                        "!!";
                                                }
                                            }
                                        }
                                    }
                                    if (
                                        TObj[tt].children[0].tagName == "SPAN"
                                    ) {
                                        asTransValue +=
                                            TObj[tt].children[0].innerText +
                                            "!!";
                                    }
                                }
                            }
                        }
                    } else {
                        if (
                            asTransObj.getElementsByTagName("INPUT").length > 0
                        ) {
                            asTransValue += asTransObj.children[0].value + "!!";
                        }
                    }
                }
            }
        }
    }
    asCheckCode(asTransParam, asTransValue);
    if (asURL.substring(asURL.length - 1) != "?") {
        asURL = asURL + "?";
    }
    if (asCode != null) {
        asURL = asURL + "ASParam=" + asCode + "&";
    }
    return btnSingleWindow(btn, clientID, asURL, asMode, asAction, asListFiled);
}
function btnSetWindow(btn, clientID, asURL, asMode, asAction, asListFiled) {
    if (!asCheckSession()) {
        alert("您尚未登入或已逾登入有效時限!\n請重新登入...");
        ReloginWindow();
        return false;
    }
    asListFiled = decodeURIComponent(asListFiled);
    var newasListFiled = "";
    var parentID = btn.id.replace("_" + clientID + "_btn", "");
    if (parentID.lastIndexOf("ctl") > 0) {
        var newparentID = parentID.substring(0, parentID.lastIndexOf("ctl"));
        parentID = parentID.substring(parentID.lastIndexOf("ctl"));
        parentID = newparentID + "ctl*";
    }
    var tmpListFiled = asListFiled.split("&");
    for (var i = 0; i < tmpListFiled.length; i++) {
        var tmp2ListFiled = tmpListFiled[i].split("=");
        newasListFiled += parentID + "_" + tmp2ListFiled[0];
        if (tmp2ListFiled.length > 1) {
            newasListFiled += "=" + tmp2ListFiled[1];
        } else {
            newasListFiled += "=";
        }
        newasListFiled += "&";
    }
    asListFiled = newasListFiled;
    document.body.style.overflow = "hidden";
    var noscroll = function (event) {
        event.preventDefault();
    };
    document.body.addEventListener("touchmove", noscroll, false);
    var div_name = asURL.substring(0, asURL.indexOf(".")) + "_div";
    if (document.getElementById(div_name) != null) {
        if (asMode.toLowerCase() == "always") {
            document
                .getElementById(div_name)
                .parentNode.removeChild(document.getElementById(div_name));
        } else if (asMode.toLowerCase() == "onlyone") {
            setSingleWindow(
                document.getElementById(div_name),
                OneFiled,
                document.getElementById(div_name.replace("_div", "_close"))
            );
            return;
        }
    }
    if (asURL.indexOf("?") == -1) {
        asURL = asURL + "?";
    } else {
        var tmpasURL = asURL.split("?");
        asURL = tmpasURL[0] + "?";
        for (var i = 1; i < tmpasURL.length; i++) {
            asURL = asURL + encodeURIComponent(tmpasURL[i]) + "&";
        }
        if (asURL.substring(asURL.length - 1) != "&") {
            asURL = asURL + "&";
        }
    }
    var close = btnBroswer_createCloseBtn(div_name);
    var div = btnBroswer_createDiv();
    var div2 = btnBroswer_createDiv();
    div2.id = div_name;
    div2.className = "zBrowsePop vcenter ";
    var iframe = document.createElement("iframe");
    var getUrlString = location.href;
    var asnewurl = new URL(getUrlString);
    var asnewParam = "";
    var assys = asnewurl.searchParams.get("assys");
    if (assys) {
        asnewParam += "assys=" + assys + "&";
    }
    var asapp = asnewurl.searchParams.get("asAppParam");
    if (asapp) {
        asnewParam += "asAppParam=" + asapp + "&";
    }
    var asC = asURL.indexOf("?");
    if (asC > -1) {
        var asBeginurl = asURL.substring(0, asC);
        var asEndurl = asURL.substring(asC + 1, asURL.length);
        asURL = asBeginurl + "?" + asnewParam + asEndurl;
    } else {
        asURL = asURL + "?" + asnewParam;
    }
    iframe.src = asURL + encodeURIComponent(asListFiled);
    iframe.width = "100%";
    iframe.height = "100%";
    iframe.scrolling = "auto";
    var isIE = /msie/i.test(navigator.userAgent) && !window.opera;
    if (isIE) {
        iframe.onreadystatechange = function () {
            if (iframe.readyState == "complete") {
                HiddenAsloader();
            }
        };
    } else {
        iframe.onload = function () {
            HiddenAsloader();
        };
    }
    ShowAsloader();
    div2.appendChild(iframe);
    div2.appendChild(close);
    div.appendChild(div2);
    div.className = "vcenter ";
    document.body.appendChild(div);
    setSingleWindow(div, div2, close);
    if (asMode.toLowerCase() == "always") {
        close.onclick = function () {
            var asCloseJs = btn.getAttribute("data-asclosebeginjs");
            if (asCloseJs) {
                if (arrasclientJS[asCloseJs] != null) {
                    arrasclientJS[asCloseJs]();
                }
            }
            div.parentNode.removeChild(div);
            document.body.style.overflow = "";
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
                    window.parent.document.getElementsByClassName(
                        "infoFoldBtn"
                    );
                if (asssoinfo) {
                    if (asssoinfo.length > 0) {
                        asssoinfo[0].style.display = "";
                    }
                }
            }
        };
    } else if (asMode.toLowerCase() == "onlyone") {
        close.onclick = function () {
            var asCloseJs = btn.getAttribute("data-asclosebeginjs");
            if (asCloseJs) {
                if (arrasclientJS[asCloseJs] != null) {
                    arrasclientJS[asCloseJs]();
                }
            }
            div.style.display = "none";
            document.body.style.overflow = "";
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
                    window.parent.document.getElementsByClassName(
                        "infoFoldBtn"
                    );
                if (asssoinfo) {
                    if (asssoinfo.length > 0) {
                        asssoinfo[0].style.display = "";
                    }
                }
            }
        };
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
    return false;
}
function setSingleWindow(objwindow, obj, close) {
    var pageHeight =
        document.body.scrollHeight > document.body.clientHeight
            ? document.body.scrollHeight
            : document.body.clientHeight;
    var viewHeight = document.documentElement.clientHeight;
    var viewWidth = document.documentElement.clientWidth;
    var scrollTop =
        document.body.scrollTop != null &&
        document.body.scrollTop > document.documentElement.scrollTop
            ? document.body.scrollTop
            : document.documentElement.scrollTop;
    if (window.innerWidth > 780) {
        obj.style.width = (parseInt(viewWidth) - 50).toString() + "px";
    } else {
        obj.style.width = parseInt(viewWidth).toString() + "px";
    }
    obj.style.height = parseInt(viewHeight).toString() + "px";
    objwindow.style.width = "100%";
    objwindow.style.height = "100vh";
    objwindow.style.position = "fixed";
    objwindow.style.backgroundColor = "hsla(0, 0%, 0%, 0.6)";
    close.style.right = "2px";
    close.style.top = "2px";
}
function btnFullWindow(btn, asURL, asMode, asAction, asReloadId) {
    if (!asCheckSession()) {
        alert("您尚未登入或已逾登入有效時限!\n請重新登入...");
        ReloginWindow();
        return false;
    }
    if (self.frameElement && self.frameElement.tagName == "IFRAME") {
        var oobj = window.frameElement;
        if (oobj) {
            var pheight = oobj.parentElement.offsetHeight;
            oobj.style.height = pheight + "px";
        }
    }
    var div_name = asURL.substring(0, asURL.indexOf(".")) + "_div";
    document.body.style.overflow = "hidden";
    var noscroll = function (event) {
        event.preventDefault();
    };
    document.body.addEventListener("touchmove", noscroll, false);
    if (document.getElementById(div_name) != null) {
        if (asMode.toLowerCase() == "always") {
            document
                .getElementById(div_name)
                .parentNode.removeChild(document.getElementById(div_name));
        } else if (asMode.toLowerCase() == "onlyone") {
            document.getElementById(div_name).style.display = "block";
            return false;
        }
    }
    var div = btnBroswer_createDiv();
    var div2 = btnBroswer_createDiv();
    var close = btnBroswer_createCloseBtn(div_name);
    div.id = div_name;
    div.style.height = "100vh";
    div2.className = "popLarge vcenter ";
    var iframe = document.createElement("iframe");
    var getUrlString = location.href;
    var asnewurl = new URL(getUrlString);
    var asnewParam = "";
    var assys = asnewurl.searchParams.get("assys");
    if (assys) {
        asnewParam += "assys=" + assys + "&";
    }
    var asapp = asnewurl.searchParams.get("asAppParam");
    if (asapp) {
        asnewParam += "asAppParam=" + asapp + "&";
    }
    var asC = asURL.indexOf("?");
    if (asC > -1) {
        var asBeginurl = asURL.substring(0, asC);
        var asEndurl = asURL.substring(asC + 1, asURL.length);
        asURL = asBeginurl + "?" + asnewParam + asEndurl;
    } else {
        asURL = asURL + "?" + asnewParam;
    }
    iframe.src = asURL;
    iframe.width = "100%";
    iframe.height = "100%";
    iframe.scrolling = "auto";
    var isIE = /msie/i.test(navigator.userAgent) && !window.opera;
    if (isIE) {
        iframe.onreadystatechange = function () {
            if (iframe.readyState == "complete") {
                HiddenAsloader();
                var astoptitle =
                    iframe.contentDocument.getElementById("toptitle");
                if (astoptitle) {
                    var astitlename =
                        iframe.contentDocument.getElementById("titlename");
                    if (astitlename) {
                        if (astitlename.innerHTML.length == 0) {
                            var astopiframetitle =
                                document.getElementById("toptitle");
                            if (astopiframetitle) {
                                var astopiframename =
                                    document.getElementById("titlename");
                                if (astopiframename) {
                                    astitlename.innerHTML =
                                        astopiframename.innerHTML;
                                    astoptitle.style.display = "";
                                }
                            }
                            if (astitlename.innerHTML.length == 0) {
                                astoptitle.style.display = "none";
                            }
                        }
                    }
                }
            }
        };
    } else {
        iframe.onload = function () {
            var asprogress = document.getElementById("AsdivProgress");
            HiddenAsloader();
            var astoptitle = iframe.contentDocument.getElementById("toptitle");
            if (astoptitle) {
                var astitlename =
                    iframe.contentDocument.getElementById("titlename");
                if (astitlename) {
                    if (astitlename.innerHTML.length == 0) {
                        var astopiframetitle =
                            document.getElementById("toptitle");
                        if (astopiframetitle) {
                            var astopiframename =
                                document.getElementById("titlename");
                            if (astopiframename) {
                                astitlename.innerHTML =
                                    astopiframename.innerHTML;
                                astoptitle.style.display = "";
                            }
                        }
                        if (astitlename.innerHTML.length == 0) {
                            astoptitle.style.display = "none";
                        }
                    }
                }
            }
        };
    }
    ShowAsloader();
    div2.appendChild(iframe);
    setFullWindow(div, div2, close);
    if (asMode.toLowerCase() == "always") {
        close.onclick = function () {
            var message =
                "您尚未儲存編輯過的表單資料,請問您確定要離開本頁面嗎？";
            var modified = asCheckConfirmExt(div_name);
            if (modified != null) {
                if (modified) {
                    if (!confirm(message)) {
                        return false;
                    }
                } else {
                    modified = asCheckhasChanged(div_name);
                    if (modified) {
                        if (!confirm(message)) {
                            return false;
                        }
                    }
                }
            }
            var asCalendarDiv = document.getElementById("asCalendar");
            if (asCalendarDiv) {
                asCalendarDiv.style.display = "none";
            }
            var asCloseJs = btn.getAttribute("data-asclosebeginjs");
            if (asCloseJs) {
                if (arrasclientJS[asCloseJs] != null) {
                    arrasclientJS[asCloseJs]();
                }
            }
            div.parentNode.removeChild(div);
            var elements =
                window.parent.document.getElementsByClassName("webClose");
            for (var e = 0; e < elements.length; e++) {
                elements[e].style.display = "";
            }
            if (self.frameElement && self.frameElement.tagName == "IFRAME") {
                var oobj = window.frameElement;
                if (oobj) {
                    if (
                        self.parent.frameElement &&
                        self.parent.frameElement.tagName == "IFRAME"
                    ) {
                    } else {
                        var pheight = oobj.parentElement.offsetHeight;
                        pheight = pheight - 55;
                        oobj.style.height = pheight + "px";
                    }
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
                    window.parent.document.getElementsByClassName(
                        "infoFoldBtn"
                    );
                if (asssoinfo) {
                    if (asssoinfo.length > 0) {
                        asssoinfo[0].style.display = "";
                    }
                }
            }
            if (asAction == "Refresh") {
                closeFull(asReloadId);
            } else {
                closeFullReload(asReloadId);
            }
        };
    } else if (asMode.toLowerCase() == "onlyone") {
        close.onclick = function () {
            var message =
                "您尚未儲存編輯過的表單資料,請問您確定要離開本頁面嗎？";
            var modified = asCheckConfirmExt(div_name);
            if (modified != null) {
                if (modified) {
                    if (!confirm(message)) {
                        return false;
                    }
                } else {
                    modified = asCheckhasChanged(div_name);
                    if (modified) {
                        if (!confirm(message)) {
                            return false;
                        }
                    }
                }
            }
            var asCalendarDiv = document.getElementById("asCalendar");
            if (asCalendarDiv) {
                asCalendarDiv.style.display = "none";
            }
            var asCloseJs = btn.getAttribute("data-asclosebeginjs");
            if (asCloseJs) {
                if (arrasclientJS[asCloseJs] != null) {
                    arrasclientJS[asCloseJs]();
                }
            }
            div.style.display = "none";
            var elements =
                window.parent.document.getElementsByClassName("webClose");
            for (var e = 0; e < elements.length; e++) {
                elements[e].style.display = "";
            }
            if (self.frameElement && self.frameElement.tagName == "IFRAME") {
                var oobj = window.frameElement;
                if (oobj) {
                    if (
                        self.parent.frameElement &&
                        self.parent.frameElement.tagName == "IFRAME"
                    ) {
                    } else {
                        var pheight = oobj.parentElement.offsetHeight;
                        pheight = pheight - 55;
                        oobj.style.height = pheight + "px";
                    }
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
                    window.parent.document.getElementsByClassName(
                        "infoFoldBtn"
                    );
                if (asssoinfo) {
                    if (asssoinfo.length > 0) {
                        asssoinfo[0].style.display = "";
                    }
                }
            }
            if (asAction == "Refresh") {
                closeFull(asReloadId);
            } else {
                closeFullReload2(asReloadId);
            }
        };
    }
    div2.appendChild(close);
    div.appendChild(div2);
    document.body.appendChild(div);
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
    return false;
}
function btnNarrowWindow(btn, asURL, asMode, asAction, asReloadId) {
    if (!asCheckSession()) {
        alert("您尚未登入或已逾登入有效時限!\n請重新登入...");
        ReloginWindow();
        return false;
    }
    if (self.frameElement && self.frameElement.tagName == "IFRAME") {
        var oobj = window.frameElement;
        if (oobj) {
            var pheight = oobj.parentElement.offsetHeight;
            oobj.style.height = pheight + "px";
        }
    }
    var div_name = asURL.substring(0, asURL.indexOf(".")) + "_div";
    document.body.style.overflow = "hidden";
    var noscroll = function (event) {
        event.preventDefault();
    };
    document.body.addEventListener("touchmove", noscroll, false);
    if (document.getElementById(div_name) != null) {
        if (asMode.toLowerCase() == "always") {
            document
                .getElementById(div_name)
                .parentNode.removeChild(document.getElementById(div_name));
        } else if (asMode.toLowerCase() == "onlyone") {
            document.getElementById(div_name).style.display = "block";
            return false;
        }
    }
    var div = btnBroswer_createDiv();
    var div2 = btnBroswer_createDiv();
    var close = btnBroswer_createCloseBtn(div_name);
    div.id = div_name;
    div.style.height = "100vh";
    div2.className = "popLargeNarrow vcenter ";
    var iframe = document.createElement("iframe");
    var getUrlString = location.href;
    var asnewurl = new URL(getUrlString);
    var asnewParam = "";
    var assys = asnewurl.searchParams.get("assys");
    if (assys) {
        asnewParam += "assys=" + assys + "&";
    }
    var asapp = asnewurl.searchParams.get("asAppParam");
    if (asapp) {
        asnewParam += "asAppParam=" + asapp + "&";
    }
    var asC = asURL.indexOf("?");
    if (asC > -1) {
        var asBeginurl = asURL.substring(0, asC);
        var asEndurl = asURL.substring(asC + 1, asURL.length);
        asURL = asBeginurl + "?" + asnewParam + asEndurl;
    } else {
        asURL = asURL + "?" + asnewParam;
    }
    iframe.src = asURL;
    iframe.width = "100%";
    iframe.height = "100%";
    iframe.scrolling = "auto";
    var isIE = /msie/i.test(navigator.userAgent) && !window.opera;
    if (isIE) {
        iframe.onreadystatechange = function () {
            if (iframe.readyState == "complete") {
                HiddenAsloader();
            }
        };
    } else {
        iframe.onload = function () {
            HiddenAsloader();
        };
    }
    ShowAsloader();
    div2.appendChild(iframe);
    setFullWindow(div, div2, close);
    if (asMode.toLowerCase() == "always") {
        close.onclick = function () {
            var message =
                "您尚未儲存編輯過的表單資料,請問您確定要離開本頁面嗎？";
            var modified = asCheckConfirmExt(div_name);
            if (modified != null) {
                if (modified) {
                    if (!confirm(message)) {
                        return false;
                    }
                } else {
                    modified = asCheckhasChanged(div_name);
                    if (modified) {
                        if (!confirm(message)) {
                            return false;
                        }
                    }
                }
            }
            var asCalendarDiv = document.getElementById("asCalendar");
            if (asCalendarDiv) {
                asCalendarDiv.style.display = "none";
            }
            var asCloseJs = btn.getAttribute("data-asclosebeginjs");
            if (asCloseJs) {
                if (arrasclientJS[asCloseJs] != null) {
                    arrasclientJS[asCloseJs]();
                }
            }
            div.parentNode.removeChild(div);
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
                    asssocontent.style.height = "calc(100vh - 55px)";
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
                    window.parent.document.getElementsByClassName(
                        "infoFoldBtn"
                    );
                if (asssoinfo) {
                    if (asssoinfo.length > 0) {
                        asssoinfo[0].style.display = "";
                    }
                }
            }
            if (asAction == "Refresh") {
                closeFull(asReloadId);
            } else {
                closeFullReload(asReloadId);
            }
        };
    } else if (asMode.toLowerCase() == "onlyone") {
        close.onclick = function () {
            var message =
                "您尚未儲存編輯過的表單資料,請問您確定要離開本頁面嗎？";
            var modified = asCheckConfirmExt(div_name);
            if (modified != null) {
                if (modified) {
                    if (!confirm(message)) {
                        return false;
                    }
                } else {
                    modified = asCheckhasChanged(div_name);
                    if (modified) {
                        if (!confirm(message)) {
                            return false;
                        }
                    }
                }
            }
            var asCalendarDiv = document.getElementById("asCalendar");
            if (asCalendarDiv) {
                asCalendarDiv.style.display = "none";
            }
            var asCloseJs = btn.getAttribute("data-asclosebeginjs");
            if (asCloseJs) {
                if (arrasclientJS[asCloseJs] != null) {
                    arrasclientJS[asCloseJs]();
                }
            }
            div.style.display = "none";
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
                    asssocontent.style.height = "calc(100vh - 55px)";
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
                    window.parent.document.getElementsByClassName(
                        "infoFoldBtn"
                    );
                if (asssoinfo) {
                    if (asssoinfo.length > 0) {
                        asssoinfo[0].style.display = "";
                    }
                }
            }
            if (asAction == "Refresh") {
                closeFull(asReloadId);
            } else {
                closeFullReload(asReloadId);
            }
        };
    }
    div2.appendChild(close);
    div.appendChild(div2);
    document.body.appendChild(div);
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
    return false;
}
function btnFullWindow2(btn, asURL, asMode, asAction, asGrdId) {
    if (!asCheckSession()) {
        alert("您尚未登入或已逾登入有效時限!\n請重新登入...");
        ReloginWindow();
        return false;
    }
    if (self.frameElement && self.frameElement.tagName == "IFRAME") {
        var oobj = window.frameElement;
        if (oobj) {
            var pheight = oobj.parentElement.offsetHeight;
            oobj.style.height = pheight + "px";
        }
    }
    var div_name = asURL.substring(0, asURL.indexOf(".")) + "_div";
    document.body.style.overflow = "hidden";
    var noscroll = function (event) {
        event.preventDefault();
    };
    document.body.addEventListener("touchmove", noscroll, false);
    if (document.getElementById(div_name) != null) {
        if (asMode.toLowerCase() == "always") {
            document
                .getElementById(div_name)
                .parentNode.removeChild(document.getElementById(div_name));
        } else if (asMode.toLowerCase() == "onlyone") {
            document.getElementById(div_name).style.display = "block";
            return false;
        }
    }
    var div = btnBroswer_createDiv();
    var div2 = btnBroswer_createDiv();
    var close = btnBroswer_createCloseBtn(div_name);
    div.id = div_name;
    div.style.height = "100vh";
    div2.className = "popLarge vcenter ";
    var iframe = document.createElement("iframe");
    var getUrlString = location.href;
    var asnewurl = new URL(getUrlString);
    var asnewParam = "";
    var assys = asnewurl.searchParams.get("assys");
    if (assys) {
        asnewParam += "assys=" + assys + "&";
    }
    var asapp = asnewurl.searchParams.get("asAppParam");
    if (asapp) {
        asnewParam += "asAppParam=" + asapp + "&";
    }
    var asC = asURL.indexOf("?");
    if (asC > -1) {
        var asBeginurl = asURL.substring(0, asC);
        var asEndurl = asURL.substring(asC + 1, asURL.length);
        asURL = asBeginurl + "?" + asnewParam + asEndurl;
    } else {
        asURL = asURL + "?" + asnewParam;
    }
    iframe.src = asURL;
    iframe.width = "100%";
    iframe.height = "100%";
    iframe.scrolling = "auto";
    var isIE = /msie/i.test(navigator.userAgent) && !window.opera;
    if (isIE) {
        iframe.onreadystatechange = function () {
            if (iframe.readyState == "complete") {
                HiddenAsloader();
                var astoptitle =
                    iframe.contentDocument.getElementById("toptitle");
                if (astoptitle) {
                    var astitlename =
                        iframe.contentDocument.getElementById("titlename");
                    if (astitlename) {
                        if (astitlename.innerHTML.length == 0) {
                            var astopiframetitle =
                                document.getElementById("toptitle");
                            if (astopiframetitle) {
                                var astopiframename =
                                    document.getElementById("titlename");
                                if (astopiframename) {
                                    astitlename.innerHTML =
                                        astopiframename.innerHTML;
                                    astoptitle.style.display = "";
                                }
                            }
                            if (astitlename.innerHTML.length == 0) {
                                astoptitle.style.display = "none";
                            }
                        }
                    }
                }
            }
        };
    } else {
        iframe.onload = function () {
            HiddenAsloader();
            var astoptitle = iframe.contentDocument.getElementById("toptitle");
            if (astoptitle) {
                var astitlename =
                    iframe.contentDocument.getElementById("titlename");
                if (astitlename) {
                    if (astitlename.innerHTML.length == 0) {
                        var astopiframetitle =
                            document.getElementById("toptitle");
                        if (astopiframetitle) {
                            var astopiframename =
                                document.getElementById("titlename");
                            if (astopiframename) {
                                astitlename.innerHTML =
                                    astopiframename.innerHTML;
                                astoptitle.style.display = "";
                            }
                        }
                        if (astitlename.innerHTML.length == 0) {
                            astoptitle.style.display = "none";
                        }
                    }
                }
            }
        };
    }
    ShowAsloader();
    div2.appendChild(iframe);
    setFullWindow(div, div2, close);
    if (asMode.toLowerCase() == "always") {
        close.onclick = function () {
            var message =
                "您尚未儲存編輯過的表單資料,請問您確定要離開本頁面嗎？";
            var modified = asCheckConfirmExt(div_name);
            if (modified != null) {
                if (modified) {
                    if (!confirm(message)) {
                        return false;
                    }
                } else {
                    modified = asCheckhasChanged(div_name);
                    if (modified) {
                        if (!confirm(message)) {
                            return false;
                        }
                    }
                }
            }
            var asCalendarDiv = document.getElementById("asCalendar");
            if (asCalendarDiv) {
                asCalendarDiv.style.display = "none";
            }
            var asCloseJs = btn.getAttribute("data-asclosebeginjs");
            if (asCloseJs) {
                if (arrasclientJS[asCloseJs] != null) {
                    arrasclientJS[asCloseJs]();
                }
            }
            div.parentNode.removeChild(div);
            var elements =
                window.parent.document.getElementsByClassName("webClose");
            for (var e = 0; e < elements.length; e++) {
                elements[e].style.display = "";
            }
            if (self.frameElement && self.frameElement.tagName == "IFRAME") {
                var oobj = window.frameElement;
                if (oobj) {
                    if (
                        self.parent.frameElement &&
                        self.parent.frameElement.tagName == "IFRAME"
                    ) {
                    } else {
                        var pheight = oobj.parentElement.offsetHeight;
                        pheight = pheight - 55;
                        oobj.style.height = pheight + "px";
                    }
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
                    window.parent.document.getElementsByClassName(
                        "infoFoldBtn"
                    );
                if (asssoinfo) {
                    if (asssoinfo.length > 0) {
                        asssoinfo[0].style.display = "";
                    }
                }
            }
            if (asAction == "Refresh") {
                closeFull(asGrdId);
            } else {
                closeFullReload2(asGrdId);
            }
        };
    } else if (asMode.toLowerCase() == "onlyone") {
        close.onclick = function () {
            var message =
                "您尚未儲存編輯過的表單資料,請問您確定要離開本頁面嗎？";
            var modified = asCheckConfirmExt(div_name);
            if (modified != null) {
                if (modified) {
                    if (!confirm(message)) {
                        return false;
                    }
                } else {
                    modified = asCheckhasChanged(div_name);
                    if (modified) {
                        if (!confirm(message)) {
                            return false;
                        }
                    }
                }
            }
            var asCalendarDiv = document.getElementById("asCalendar");
            if (asCalendarDiv) {
                asCalendarDiv.style.display = "none";
            }
            var asCloseJs = btn.getAttribute("data-asclosebeginjs");
            if (asCloseJs) {
                if (arrasclientJS[asCloseJs] != null) {
                    arrasclientJS[asCloseJs]();
                }
            }
            div.style.display = "none";
            var elements =
                window.parent.document.getElementsByClassName("webClose");
            for (var e = 0; e < elements.length; e++) {
                elements[e].style.display = "";
            }
            if (self.frameElement && self.frameElement.tagName == "IFRAME") {
                var oobj = window.frameElement;
                if (oobj) {
                    if (
                        self.parent.frameElement &&
                        self.parent.frameElement.tagName == "IFRAME"
                    ) {
                    } else {
                        var pheight = oobj.parentElement.offsetHeight;
                        pheight = pheight - 55;
                        oobj.style.height = pheight + "px";
                    }
                }
                var asssocontent =
                    window.parent.document.getElementById("divcontent");
                if (asssocontent) {
                    asssocontent.style.height = "calc(100vh - 55px)";
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
                    window.parent.document.getElementsByClassName(
                        "infoFoldBtn"
                    );
                if (asssoinfo) {
                    if (asssoinfo.length > 0) {
                        asssoinfo[0].style.display = "";
                    }
                }
            }
            if (asAction == "Refresh") {
                closeFull(asGrdId);
            } else {
                closeFullReload2(asGrdId);
            }
        };
    }
    div2.appendChild(close);
    div.appendChild(div2);
    document.body.appendChild(div);
    var elements = window.parent.document.getElementsByClassName("webClose");
    for (var e = 0; e < elements.length; e++) {
        if (elements[e].id != close.id) {
            elements[e].style.display = "none";
        }
    }
    if (self.frameElement && self.frameElement.tagName == "IFRAME") {
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
    return false;
}
function btnNarrowWindow2(btn, asURL, asMode, asAction, asGrdId) {
    if (!asCheckSession()) {
        alert("您尚未登入或已逾登入有效時限!\n請重新登入...");
        ReloginWindow();
        return false;
    }
    var div_name = asURL.substring(0, asURL.indexOf(".")) + "_div";
    document.body.style.overflow = "hidden";
    var noscroll = function (event) {
        event.preventDefault();
    };
    document.body.addEventListener("touchmove", noscroll, false);
    if (document.getElementById(div_name) != null) {
        if (asMode.toLowerCase() == "always") {
            document
                .getElementById(div_name)
                .parentNode.removeChild(document.getElementById(div_name));
        } else if (asMode.toLowerCase() == "onlyone") {
            document.getElementById(div_name).style.display = "block";
            return false;
        }
    }
    var div = btnBroswer_createDiv();
    var div2 = btnBroswer_createDiv();
    var close = btnBroswer_createCloseBtn(div_name);
    div.id = div_name;
    div.style.height = "100vh";
    div2.className = "popLargeNarrow vcenter ";
    var iframe = document.createElement("iframe");
    var getUrlString = location.href;
    var asnewurl = new URL(getUrlString);
    var asnewParam = "";
    var assys = asnewurl.searchParams.get("assys");
    if (assys) {
        asnewParam += "assys=" + assys + "&";
    }
    var asapp = asnewurl.searchParams.get("asAppParam");
    if (asapp) {
        asnewParam += "asAppParam=" + asapp + "&";
    }
    var asC = asURL.indexOf("?");
    if (asC > -1) {
        var asBeginurl = asURL.substring(0, asC);
        var asEndurl = asURL.substring(asC + 1, asURL.length);
        asURL = asBeginurl + "?" + asnewParam + asEndurl;
    } else {
        asURL = asURL + "?" + asnewParam;
    }
    iframe.src = asURL;
    iframe.width = "100%";
    iframe.height = "100%";
    iframe.scrolling = "auto";
    var isIE = /msie/i.test(navigator.userAgent) && !window.opera;
    if (isIE) {
        iframe.onreadystatechange = function () {
            if (iframe.readyState == "complete") {
                HiddenAsloader();
            }
        };
    } else {
        iframe.onload = function () {
            HiddenAsloader();
        };
    }
    ShowAsloader();
    div2.appendChild(iframe);
    setFullWindow(div, div2, close);
    if (asMode.toLowerCase() == "always") {
        close.onclick = function () {
            var message =
                "您尚未儲存編輯過的表單資料,請問您確定要離開本頁面嗎？";
            var modified = asCheckConfirmExt(div_name);
            if (modified != null) {
                if (modified) {
                    if (!confirm(message)) {
                        return false;
                    }
                } else {
                    modified = asCheckhasChanged(div_name);
                    if (modified) {
                        if (!confirm(message)) {
                            return false;
                        }
                    }
                }
            }
            var asCalendarDiv = document.getElementById("asCalendar");
            if (asCalendarDiv) {
                asCalendarDiv.style.display = "none";
            }
            var asCloseJs = btn.getAttribute("data-asclosebeginjs");
            if (asCloseJs) {
                if (arrasclientJS[asCloseJs] != null) {
                    arrasclientJS[asCloseJs]();
                }
            }
            div.parentNode.removeChild(div);
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
                    asssocontent.style.height = "calc(100vh - 55px)";
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
                    window.parent.document.getElementsByClassName(
                        "infoFoldBtn"
                    );
                if (asssoinfo) {
                    if (asssoinfo.length > 0) {
                        asssoinfo[0].style.display = "";
                    }
                }
            }
            if (asAction == "Refresh") {
                closeFull(asGrdId);
            } else {
                closeFullReload2(asGrdId);
            }
        };
    } else if (asMode.toLowerCase() == "onlyone") {
        close.onclick = function () {
            var message =
                "您尚未儲存編輯過的表單資料,請問您確定要離開本頁面嗎？";
            var modified = asCheckConfirmExt(div_name);
            if (modified != null) {
                if (modified) {
                    if (!confirm(message)) {
                        return false;
                    }
                } else {
                    modified = asCheckhasChanged(div_name);
                    if (modified) {
                        if (!confirm(message)) {
                            return false;
                        }
                    }
                }
            }
            var asCalendarDiv = document.getElementById("asCalendar");
            if (asCalendarDiv) {
                asCalendarDiv.style.display = "none";
            }
            var asCloseJs = btn.getAttribute("data-asclosebeginjs");
            if (asCloseJs) {
                if (arrasclientJS[asCloseJs] != null) {
                    arrasclientJS[asCloseJs]();
                }
            }
            div.style.display = "none";
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
                    asssocontent.style.height = "calc(100vh - 55px)";
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
                    window.parent.document.getElementsByClassName(
                        "infoFoldBtn"
                    );
                if (asssoinfo) {
                    if (asssoinfo.length > 0) {
                        asssoinfo[0].style.display = "";
                    }
                }
            }
            if (asAction == "Refresh") {
                closeFull(asGrdId);
            } else {
                closeFullReload2(asGrdId);
            }
        };
    }
    div2.appendChild(close);
    div.appendChild(div2);
    document.body.appendChild(div);
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
    return false;
}
function setFullWindow(objwindow, obj, close) {
    var pageHeight =
        document.body.scrollHeight > document.body.clientHeight
            ? document.body.scrollHeight
            : document.body.clientHeight;
    var viewHeight = document.documentElement.clientHeight;
    var viewWidth = document.documentElement.clientWidth;
    var scrollTop =
        document.body.scrollTop != null &&
        document.body.scrollTop > document.documentElement.scrollTop
            ? document.body.scrollTop
            : document.documentElement.scrollTop;
    obj.style.backgroundColor = "#fff";
    if (window.innerWidth > 780) {
        obj.style.width = (parseInt(viewWidth) - 50).toString() + "px";
    } else {
        obj.style.width = parseInt(viewWidth).toString() + "px";
    }
    obj.style.height = parseInt(viewHeight).toString() + "px";
    objwindow.style.width = "100%";
    objwindow.style.height = "100vh";
    objwindow.style.position = "fixed";
    objwindow.style.backgroundColor = "hsla(0, 0%, 0%, 0.6)";
    objwindow.style.top = "0%";
    objwindow.style.left = "0%";
    objwindow.style.display = "block";
    close.style.right = "2px";
    close.style.top = "2px";
}
function closeFullReload(asReloadId) {
    document.body.style.overflow = "";
    if (asReloadId != null && asReloadId.trim().length != 0) {
        __doPostBack(asReloadId, "");
    } else {
        HiddenAsloader();
    }
}
function closeFullReload2(asGrdId) {
    document.body.style.overflow = "";
    if (asGrdId != null && asGrdId.trim().length != 0) {
        asGrdId = "asRe$" + asGrdId;
        __doPostBack(asGrdId, "");
    } else {
        HiddenAsloader();
    }
}
function closeFull(asTargetId) {
    document.body.style.overflow = "";
    if (asTargetId != null && asTargetId.trim().length != 0) {
        __doPostBack(asTargetId, "");
    } else {
        HiddenAsloader();
    }
}
function btnBroswer_createDiv() {
    var newDiv = document.createElement("div");
    newDiv.style.position = "absolute";
    newDiv.style.background = "rgb(255, 255, 255)";
    newDiv.style.zIndex = "9999";
    return newDiv;
}
function btnBroswer_createCloseBtn(div_id) {
    var close = document.createElement("div");
    close.id = div_id.replace("_div", "_close");
    close.style.zIndex = "9999";
    close.className = "webClose";
    return close;
}
function btnBroswer_createIframe() {
    var iframe = document.createElement("iframe");
    iframe.style.overflow = "auto";
    iframe.width = "100%";
    iframe.height = "100%";
    iframe.frameBorder = 0;
    return iframe;
}
var xmlHttp;
var xmlDiv;
function CallPage(sUrl, objDiv) {
    xmlDiv = objDiv;
    xmlHttp = GetHttpRequest();
    xmlHttp.onreadystatechange = ProcessRequestPage;
    xmlHttp.open("GET", encodeURI(sUrl), true);
    xmlHttp.send(null);
}
function ProcessRequestPage() {
    try {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            var sReturn = xmlHttp.responseText;
            var sValue = "";
            xmlDiv.innerHTML += sReturn;
            if (sReturn.indexOf(" width=") != -1) {
                sReturn = sReturn.substr(sReturn.indexOf(" width=") + 6, 10);
                for (var i = 0; i < 10; i++) {
                    if (isNaN(sReturn.substr(i, 1)) == false) {
                        sValue += sReturn.substr(i, 1);
                        continue;
                    }
                    if (sValue.length > 0) break;
                }
                xmlDiv.style.width = parseInt(sValue).toString() + "px";
            }
            xmlDiv.offsetParent.style.width =
                parseInt(sValue).toString() + "px";
            sReturn = xmlHttp.responseText;
            sValue = "";
            if (sReturn.indexOf(" height=") != -1) {
                sReturn = sReturn.substr(sReturn.indexOf(" height=") + 7, 10);
                for (var i = 0; i < 10; i++) {
                    if (isNaN(sReturn.substr(i, 1)) == false) {
                        sValue += sReturn.substr(i, 1);
                        continue;
                    }
                    if (sValue.length > 0) break;
                }
                xmlDiv.style.height = parseInt(sValue).toString() + "px";
            }
            xmlDiv.offsetParent.style.height =
                parseInt(sValue).toString() + "px";
        }
    } catch (e) {}
}
function GetHttpRequest() {
    var getXmlHttp;
    try {
        getXmlHttp = new XMLHttpRequest();
    } catch (e) {
        try {
            getXmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                getXmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {
                return false;
            }
        }
    }
    return getXmlHttp;
}
function asCheckSession() {
    var aschk = "";
    var website = location.href;
    website = website.substring(0, website.lastIndexOf("/") + 1);
    try {
        var client;
        try {
            client = new XMLHttpRequest();
        } catch (e) {
            try {
                client = new ActiveXObject("Msxml2.XMLHTTP");
            } catch (e) {
                try {
                    client = new ActiveXObject("Microsoft.XMLHTTP");
                } catch (e) {
                    return false;
                }
            }
        }
        client.onreadystatechange = function () {
            try {
                if (client.readyState == 4 && client.status == 200) {
                    aschk = client.getResponseHeader("asui");
                } else {
                    if (client.readyState == 4 && client.status == 403) {
                        return false;
                    }
                }
            } catch (e) {
                return false;
            }
        };
        client.open("GET", encodeURI(website + "AsCheck.ashx"), false);
        client.send();
    } catch (e) {
        return false;
    }
    if (aschk.length == 0) {
        return false;
    }
    return true;
}
function asCheckConfirmExt(div_name) {
    var div = document.getElementById(div_name);
    div = div.childNodes[0].childNodes[0];
    var asConfirmExt =
        div.contentWindow.document.getElementById("asConfirmExt");
    if (asConfirmExt != null && asConfirmExt != undefined) {
        var Confirmvalue = asConfirmExt.value;
        if (Confirmvalue == "Y") {
            return true;
        } else {
            return false;
        }
    }
    return null;
}
function asCheckhasChanged(div_name) {
    var div = document.getElementById(div_name);
    div = div.childNodes[0].childNodes[0];
    var inputs = div.contentWindow.document.getElementsByTagName("input");
    for (var i = 0; i < inputs.length; i++) {
        var input = inputs[i];
        if (input.type == "checkbox" || input.type == "radio") {
            if (
                input.parentNode.parentNode.parentNode.parentNode.parentNode !=
                null
            ) {
                var astabobj =
                    input.parentNode.parentNode.parentNode.parentNode
                        .parentNode;
                if (astabobj.className == "tabsConnect") {
                    continue;
                }
            }
            if (checkCheckBoxAndRadio(input)) {
                return true;
            }
        } else if (typeof input.defaultValue != "undefined") {
            if (chekcInput(input)) {
                return true;
            }
        } else if (input.type == "select-one") {
            if (checkSelectOne(input)) {
                return true;
            }
        } else if (input.type == "select-multiple") {
            if (checkSelectMultiple(input)) {
                return true;
            }
        } else if (input.type == "submit") {
            continue;
        } else {
        }
    }
    return false;
    function checkSelectOne(input) {
        if (input.options.length == 0) {
            return false;
        }
        var defaultIndex = 0;
        for (var j = 1; j < input.options.length; j++) {
            var option = input.options[j];
            if (option.defaultSelected) {
                defaultIndex = j;
                break;
            }
        }
        return defaultIndex != input.selectedIndex;
    }
    function checkSelectMultiple(input) {
        if (input.options.length == 0) {
            return false;
        }
        for (var j = 0; j < input.options.length; j++) {
            var option = input.options[j];
            if (option.defaultSelected != option.selected) {
                return true;
            }
        }
        return false;
    }
    function checkCheckBoxAndRadio(input) {
        return input.checked != input.defaultChecked;
    }
    function chekcInput(input) {
        return input.value != input.defaultValue;
    }
}
var asCode;
function asCheckCode(transparam, transvalue) {
    var website = location.href;
    website = website.substring(0, website.lastIndexOf("/") + 1);
    try {
        var client;
        try {
            client = new XMLHttpRequest();
        } catch (e) {
            try {
                client = new ActiveXObject("Msxml2.XMLHTTP");
            } catch (e) {
                try {
                    client = new ActiveXObject("Microsoft.XMLHTTP");
                } catch (e) {
                    return false;
                }
            }
        }
        client.onreadystatechange = function () {
            try {
                if (client.readyState == 4 && client.status == 200) {
                    asCode = client.responseText;
                } else {
                    if (client.readyState == 4 && client.status == 403) {
                        return false;
                    }
                }
            } catch (e) {
                return false;
            }
        };
        PostData = "p=" + transparam + "&v=" + transvalue + "&";
        client.open("POST", encodeURI(website + "AsCode.ashx"), false);
        client.send(PostData);
    } catch (e) {
        return false;
    }
    if (asCode.length == 0) {
        return false;
    }
    return true;
}
function chkmustparam(chkparam, strmsg) {
    var returnVal = true;
    for (var ckp = 0; ckp < chkparam.length; ckp++) {
        var asobj = document.getElementById(chkparam[ckp]);
        var hasVal = true;
        var msg = "";
        if (asobj != null) {
            if (asobj.hasChildNodes) {
                if (asobj.getElementsByClassName("asContentV").length > 0) {
                    var TObj = asobj.getElementsByClassName("asContentV");
                    for (
                        var tt = 0;
                        (tt =
                            asobj.getElementsByClassName("asContentV").length);
                        tt++
                    ) {
                        if (
                            TObj[tt].tagName == "DIV" &&
                            TObj[tt].className == "asContentV"
                        ) {
                            if (TObj[tt].hasChildNodes) {
                                if (TObj[tt].children[0].tagName == "INPUT") {
                                    if (
                                        TObj[tt].children[0].value.length == 0
                                    ) {
                                        hasVal = false;
                                    }
                                }
                                if (TObj[tt].children[0].tagName == "SELECT") {
                                    for (
                                        var iop = 0;
                                        iop <
                                        TObj[tt].children[0].options.length;
                                        iop++
                                    ) {
                                        if (
                                            TObj[tt].children[0].options[iop]
                                                .selected == true
                                        ) {
                                            if (
                                                TObj[tt].children[0].options[
                                                    iop
                                                ].value.length == 0
                                            ) {
                                                hasVal = false;
                                            }
                                            break;
                                        }
                                    }
                                }
                                if (TObj[tt].children[0].tagName == "TABLE") {
                                    var TableObj = TObj[tt].children[0];
                                    var InpObj =
                                        TableObj.getElementsByTagName("INPUT");
                                    for (
                                        var item = 0;
                                        item < InpObj.length;
                                        item++
                                    ) {
                                        if (
                                            InpObj[item].type == "radio" ||
                                            InpObj[item].type == "checkbox"
                                        ) {
                                            if (InpObj[item].checked) {
                                                if (
                                                    InpObj[item].value.length ==
                                                    0
                                                ) {
                                                    hasVal = false;
                                                }
                                            }
                                        }
                                    }
                                }
                                if (TObj[tt].children[0].tagName == "SPAN") {
                                    if (
                                        TObj[tt].children[0].innerText.length ==
                                        0
                                    ) {
                                        hasVal = false;
                                    }
                                }
                            }
                        }
                    }
                } else {
                    if (asobj.getElementsByTagName("INPUT").length > 0) {
                        if (asobj.children[0].value.length == 0) {
                            hasVal = false;
                        }
                    }
                }
                if (hasVal == false) {
                    if (asobj.getElementsByClassName("asCaptionV").length > 0) {
                        var CObj = asobj.getElementsByClassName("asCaptionV");
                        for (var Cap = 0; (Cap = CObj.length); Cap++) {
                            if (msg.length > 0) msg += "、";
                            msg += CObj[Cap].innerText;
                        }
                    }
                    returnVal = false;
                }
            }
        }
    }
    if (returnVal) {
        msg += strmsg;
    }
    return msg;
}
function asRptopenDIV(closebtnid, Rptiframeid, srctext) {
    if (!asCheckSession()) {
        alert("您尚未登入或已逾登入有效時限!\n請重新登入...");
        ReloginWindow();
        return false;
    }
    if (self.frameElement && self.frameElement.tagName == "IFRAME") {
        var oobj = window.frameElement;
        if (oobj) {
            var pheight = oobj.parentElement.offsetHeight;
            oobj.style.height = pheight + "px";
        }
    }
    document.body.style.overflow = "hidden";
    var noscroll = function (event) {
        event.preventDefault();
    };
    document.body.addEventListener("touchmove", noscroll, false);
    var elements = window.parent.document.getElementsByClassName("webClose");
    for (var e = 0; e < elements.length; e++) {
        if (elements[e].id != closebtnid) {
            elements[e].style.display = "none";
        }
    }
    if (self.frameElement && self.frameElement.tagName == "IFRAME") {
        var oobj = window.frameElement;
        var asssocontent = window.parent.document.getElementById("divcontent");
        if (asssocontent) {
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
    var ReportViewer_div = closebtnid.replace(
        "_ReportViewer_close",
        "_ReportViewer_div"
    );
    if (document.getElementById(ReportViewer_div) != null) {
        document.getElementById(ReportViewer_div).style.display = "";
        if (document.getElementById(Rptiframeid) != null) {
            document.getElementById(Rptiframeid).setAttribute("src", srctext);
        }
    }
}
function asRptcloseDIV(RVdivid) {
    if (document.getElementById(RVdivid) != null) {
        document.getElementById(RVdivid).remove();
        document.body.style.overflow = "";
        var elements =
            window.parent.document.getElementsByClassName("webClose");
        for (var e = 0; e < elements.length; e++) {
            elements[e].style.display = "";
        }
        if (self.frameElement && self.frameElement.tagName == "IFRAME") {
            var oobj = window.frameElement;
            if (oobj) {
                if (
                    self.parent.frameElement &&
                    self.parent.frameElement.tagName == "IFRAME"
                ) {
                } else {
                    var pheight = oobj.parentElement.offsetHeight;
                    pheight = pheight - 55;
                    oobj.style.height = pheight + "px";
                }
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
    }
}
