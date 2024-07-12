function btnSearchWindow(btn, asURL, ParentURL) {
    ParentURL = decodeURI(ParentURL).replace("/", "");
    var asfilterID = btn.id.replace("_btn", "_hf");
    var asfilter;
    var asFilterSource;
    var asGrdID;
    if (document.getElementById(asfilterID) != null) {
        asfilter = document.getElementById(asfilterID).value;
    } else {
        asfilter = "";
    }
    if (btn.getAttribute("asFilterSource") != null) {
        asFilterSource = btn.getAttribute("asFilterSource");
    } else {
        asFilterSource = "";
    }
    if (btn.getAttribute("asGrdID") != null) {
        asGrdID = btn.getAttribute("asGrdID");
    } else {
        asGrdID = "";
    }
    if (asfilter.length != 0) {
        asCheckSearch(asFilterSource, asfilter);
    }
    var pageWidth = document.documentElement.clientWidth,
        pageHeight = document.documentElement.clientHeight;
    document.body.style.overflow = "hidden";
    var noscroll = function (event) {
        event.preventDefault();
    };
    document.body.addEventListener("touchmove", noscroll, false);
    var div_name = asURL.substring(0, asURL.indexOf(".")) + "_div";
    if (document.getElementById(div_name) != null) {
        document
            .getElementById(div_name)
            .parentNode.removeChild(document.getElementById(div_name));
    }
    var close = btnSearch_creatCloseBtn(div_name);
    var div = btnSearch_creatDiv();
    var div2 = btnSearch_creatDiv();
    div.id = div_name;
    div.setAttribute("asfilterID", asfilterID);
    div.setAttribute("asFilterSource", asFilterSource);
    div.setAttribute("asGrdID", asGrdID);
    if (asSearch != null) {
        asfilter = asSearch;
    }
    CallfilterPage(asURL + "?asparam=" + asfilter, div2);
    div2.appendChild(close);
    div.appendChild(div2);
    div.style.display = "block";
    document.body.appendChild(div);
    div.style.backgroundColor = "hsla(0, 0%, 0%, 0.6)";
    div.style.width = "100%";
    div.style.height = "100vh";
    div.style.position = "fixed";
    div.className = "vcenter ";
    div2.style.backgroundColor = "#fff";
    div2.style.width = "80%";
    div2.style.height = "85%";
    div2.className = "zBrowsePop vcenter ";
    ShowAsloader();
    close.onclick = function () {
        var asCalendarDiv = document.getElementById("asCalendar");
        if (asCalendarDiv) {
            asCalendarDiv.style.display = "none";
        }
        div.parentNode.removeChild(div);
        document.body.style.overflow = "scroll";
    };
    return false;
}
function btnSearch_creatDiv() {
    var newDiv = document.createElement("div");
    newDiv.style.position = "absolute";
    newDiv.style.zIndex = "9999";
    return newDiv;
}
function btnSearch_creatCloseBtn(div_id) {
    var close = document.createElement("div");
    close.id = div_id.replace("_div", "_close");
    close.className = "webClose";
    return close;
}
function creatIframe() {
    var iframe = document.createElement("iframe");
    iframe.style.overflow = "auto";
    iframe.width = "100%";
    iframe.height = "100%";
    iframe.frameBorder = 0;
    return iframe;
}
var xmlHttp;
var xmlDiv;
function CallfilterPage(sUrl, objDiv) {
    xmlDiv = objDiv;
    xmlHttp = filterGetHttpRequest();
    xmlHttp.onreadystatechange = filterProcessRequest;
    xmlHttp.open("GET", encodeURI(sUrl), true);
    xmlHttp.send(null);
}
function filterProcessRequest() {
    try {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            var sReturn = xmlHttp.responseText;
            var sValue = "";
            xmlDiv.insertAdjacentHTML("afterbegin", sReturn);
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
        }
    } catch (e) {}
}
function filterGetHttpRequest() {
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
function SearchReturn(btn, divdoc, ParentURL) {
    var returnVal = "";
    var popname = divdoc;
    var searchdocumentID = btn.id.replace("_btn", "");
    var divdoc = divdoc + "_div";
    var divdocument = document.getElementById(divdoc);
    var asfilterID = divdocument.getAttribute("asfilterID");
    var asFilterSource = divdocument.getAttribute("asFilterSource");
    var asGrdID = divdocument.getAttribute("asGrdID");
    if (asGrdID.length > 0) {
        popname = "asSr$" + asGrdID;
    }
    asCheckSearch(asFilterSource, "");
    if (asSearch != null) {
        asFilterSource = asSearch;
    }
    var aFilter = asFilterSource.split("&");
    var allobj = divdocument.getElementsByTagName("INPUT");
    var i;
    var errmsg = "";
    for (i = 0; i < allobj.length; i++) {
        var childobj = allobj[i];
        for (ii = 0; ii < aFilter.length; ii++) {
            var aFilterLst = aFilter[ii].split("=");
            if (childobj.id.indexOf(aFilterLst[1]) != -1) {
                if (childobj.type == "checkbox") {
                    var ascheck = "0";
                    if (childobj.checked) ascheck = "1";
                    returnVal += aFilterLst[0] + "=" + ascheck + "&";
                } else {
                    if (childobj.type == "text") {
                        if (
                            (childobj.id.toString() + "#as#").indexOf(
                                aFilterLst[1] + "_tbBegin_tb" + "#as#"
                            ) != -1
                        ) {
                            var date1 = childobj.value;
                            var childobjDateType =
                                childobj.getAttribute("asDateType");
                            var childobjMust = childobj.getAttribute("asMust");
                            if (childobjDateType == "R") {
                                date1 =
                                    (
                                        parseInt(
                                            date1.substring(
                                                0,
                                                date1.indexOf("/")
                                            )
                                        ) + 1911
                                    ).toString() +
                                    date1.substring(date1.indexOf("/"));
                            }
                            if (date1 == "NaN") date1 = "";
                            if (childobjMust == "true" && date1 == "") {
                                errmsg += "請輸入起始日期\n";
                            } else {
                                returnVal += aFilterLst[0] + "=" + date1;
                            }
                            var childobjend = document.getElementById(
                                childobj.id.replace("_tbBegin_tb", "_tbEnd_tb")
                            );
                            if (childobjend != null) {
                                var date2 = childobjend.value;
                                var childobjendDateType =
                                    childobjend.getAttribute("asDateType");
                                var childobjendMust =
                                    childobjend.getAttribute("asMust");
                                if (childobjendDateType == "R") {
                                    date2 =
                                        (
                                            parseInt(
                                                date2.substring(
                                                    0,
                                                    date2.indexOf("/")
                                                )
                                            ) + 1911
                                        ).toString() +
                                        date2.substring(date2.indexOf("/"));
                                }
                                if (date2 == "NaN") date2 = "";
                                if (childobjendMust == "true" && date2 == "") {
                                    errmsg += "請輸入結束日期\n";
                                } else {
                                    returnVal += "!!" + date2;
                                }
                            }
                            returnVal += "&";
                        } else {
                            var childobjMust = childobj.getAttribute("asMust");
                            if (
                                childobjMust == "true" &&
                                childobj.value.length == 0 &&
                                childobj.id.indexOf(
                                    aFilterLst[1] + "_tbEnd_tb"
                                ) == -1
                            ) {
                                errmsg += "請輸入" + aFilterLst[0] + "\n";
                                break;
                            }
                            if (
                                childobj.value.length != 0 &&
                                childobj.id.indexOf(
                                    aFilterLst[1] + "_tbEnd_tb"
                                ) == -1
                            ) {
                                returnVal +=
                                    aFilterLst[0] + "=" + childobj.value + "&";
                            }
                        }
                    } else {
                        if (childobj.type == "hidden") {
                            returnVal +=
                                aFilterLst[0] + "=" + childobj.value + "&";
                        }
                    }
                }
            }
        }
    }
    var allobj = divdocument.getElementsByTagName("SELECT");
    var j;
    for (j = 0; j < allobj.length; j++) {
        var childobj = allobj[j];
        for (jj = 0; jj < aFilter.length; jj++) {
            if (
                (childobj.id.toString() + "#as#").indexOf(
                    aFilterLst[1] + "_tbBegin_ddlTime" + "#as#"
                ) != -1 ||
                (childobj.id.toString() + "#as#").indexOf(
                    aFilterLst[1] + "_tbEnd_ddlTime" + "#as#"
                ) != -1
            ) {
            } else {
                var aFilterLst = aFilter[jj].split("=");
                if (childobj.id.indexOf(aFilterLst[1]) != -1) {
                    var childobjMust = childobj.getAttribute("asMust");
                    if (childobjMust == "true" && childobj.value.length == 0) {
                        errmsg += "請選擇" + aFilterLst[0] + "\n";
                    } else {
                        returnVal += aFilterLst[0] + "=" + childobj.value + "&";
                    }
                }
            }
        }
    }
    var radioobj = divdocument.getElementsByTagName("TABLE");
    var r;
    for (r = 0; r < radioobj.length; r++) {
        var parentobj = radioobj[j];
        for (rr = 0; rr < aFilter.length; rr++) {
            var aFilterLst = aFilter[rr].split("=");
            if (parentobj.id.indexOf(aFilterLst[1]) != -1) {
                var childobjMust = parentobj.getAttribute("asMust");
                var fla = false;
                for (
                    rrr = 0;
                    rrr < parentobj.children[0].children[0].children.length;
                    rrr++
                ) {
                    var childobj =
                        parentobj.children[0].children[0].children[rrr]
                            .children[0];
                    if (childobj.checked) {
                        returnVal += aFilterLst[0] + "=" + childobj.value + "&";
                        fla = true;
                    }
                }
                if (childobjMust == "true" && fla == false) {
                    errmsg += "請選擇" + aFilterLst[0] + "\n";
                }
            }
        }
    }
    if (errmsg == "") {
        var asfilter = document.getElementById(asfilterID);
        asCheckSearch("", returnVal);
        if (asSearch != null) {
            returnVal = asSearch;
        }
        asfilter.value = returnVal;
        ShowAsloader();
        __doPostBack(popname, "");
    } else {
        alert(errmsg);
    }
}
var asSearch;
function asCheckSearch(transparam, transvalue) {
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
                    asSearch = client.responseText;
                } else {
                    if (client.readyState == 4 && client.status == 403) {
                        return false;
                    }
                }
            } catch (e) {
                return false;
            }
        };
        transvalue = transvalue.replace("/=/g", "!**!").replace("/&/g", "!!");
        PostData =
            "p=" +
            encodeURIComponent(transparam) +
            "&v=" +
            encodeURIComponent(transvalue) +
            "&";
        client.open("POST", encodeURI(website + "AsSearch.ashx"), false);
        client.send(PostData);
    } catch (e) {
        return false;
    }
    if (asSearch != null) {
        if (asSearch.length == 0) {
            return false;
        }
    } else {
        return false;
    }
    return true;
}
