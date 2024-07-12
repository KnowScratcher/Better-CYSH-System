function SetQMenu(setid, smenuid, apiurl) {
    var UpdateMsg = new Array();
    var Filterdata = new Array();
    var Filterdata = new Array();
    Filterdata[0] = "munuid||" + smenuid;
    var PostAsJsonObj =
        "apiName=" +
        apiurl +
        "&Param=" +
        SetAsJsonObj("參數檔", "key,value", null, null, null, Filterdata);
    var website = location.href;
    website = website.substring(0, website.lastIndexOf("/") + 1);
    apiurl = website + "AsCall.ashx";
    var jobj = QMenuCallApi(apiurl, PostAsJsonObj);
    if (jobj !== null && typeof jobj != "undefined") {
        var data = new Array();
        var adcCaption = jobj.dtData[0].dcCaptions.toString().split(",");
        var adcName = jobj.dtData[0].dcNames.toString().split(",");
        for (i = 0; i < adcName.length; i++) {
            if (adcName[i].toString() == "狀態") {
                data[0] = i;
            }
            if (adcName[i].toString() == "訊息") {
                data[1] = i;
            }
        }
        for (i = 0; i < jobj.dtData[0].drData.length; i++) {
            var adrData = jobj.dtData[0].drData[i].split("||");
            if (adrData.length != 0) {
                UpdateMsg[0] = adrData[data[0]].toString();
            } else {
                UpdateMsg[0] = "";
            }
            if (adrData.length > 1) {
                UpdateMsg[1] = adrData[data[1]].toString();
            } else {
                UpdateMsg[1] = "";
            }
        }
        if (UpdateMsg[0] == "失敗") {
        } else {
        }
    } else {
        UpdateMsg[0] = "失敗";
    }
}
function SetUflag(setid, stype, apiurl) {
    var UpdateMsg = new Array();
    var Filterdata = new Array();
    var infotype = "0";
    if (stype) infotype = "1";
    Filterdata[0] = "infoid||" + setid;
    Filterdata[1] = "infotype||" + infotype;
    var PostAsJsonObj = SetAsJsonObj(
        "參數檔",
        "key,value",
        null,
        null,
        null,
        Filterdata
    );
    var strPrame = "apiName=" + apiurl + "&公告編號=" + PostAsJsonObj;
    var jobj = MainCallApi(strPrame);
    jobj = JSON.parse(jobj);
    if (jobj !== null && typeof jobj != "undefined") {
        var data = new Array();
        var adcCaption = jobj.dtData[0].dcCaptions.toString().split(",");
        var adcName = jobj.dtData[0].dcNames.toString().split(",");
        for (i = 0; i < adcName.length; i++) {
            if (adcName[i].toString() == "結果") {
                data[0] = i;
            }
            if (adcName[i].toString() == "訊息") {
                data[1] = i;
            }
        }
        for (i = 0; i < jobj.dtData[0].drData.length; i++) {
            var adrData = jobj.dtData[0].drData[i].split("||");
            if (adrData.length != 0) {
                UpdateMsg[0] = adrData[data[0]].toString();
            } else {
                UpdateMsg[0] = "";
            }
            if (adrData.length > 1) {
                UpdateMsg[1] = adrData[data[1]].toString();
            } else {
                UpdateMsg[1] = "";
            }
        }
        if (UpdateMsg[0] == "失敗") {
        } else {
        }
    } else {
        UpdateMsg[0] = "失敗";
    }
    return UpdateMsg[0].toString();
}
function SetAllUflag(stype, apiurl) {
    let sysinfo = document.getElementById("hide_sysinfo");
    let ssysinfo = "";
    if (sysinfo) {
        ssysinfo = sysinfo.value;
    }
    if (stype && ssysinfo.length > 0) {
        var UpdateMsg = new Array();
        var Filterdata = new Array();
        var infotype = "0";
        if (stype) infotype = "1";
        Filterdata[0] = "info||" + ssysinfo;
        var PostAsJsonObj = SetAsJsonObj(
            "參數檔",
            "key,value",
            null,
            null,
            null,
            Filterdata
        );
        var strPrame = "apiName=" + apiurl + "&公告編號=" + PostAsJsonObj;
        var jobj = MainCallApi(strPrame);
        jobj = JSON.parse(jobj);
        if (jobj !== null && typeof jobj != "undefined") {
            var data = new Array();
            var adcCaption = jobj.dtData[0].dcCaptions.toString().split(",");
            var adcName = jobj.dtData[0].dcNames.toString().split(",");
            for (i = 0; i < adcName.length; i++) {
                if (adcName[i].toString() == "結果") {
                    data[0] = i;
                }
                if (adcName[i].toString() == "訊息") {
                    data[1] = i;
                }
            }
            for (i = 0; i < jobj.dtData[0].drData.length; i++) {
                var adrData = jobj.dtData[0].drData[i].split("||");
                if (adrData.length != 0) {
                    UpdateMsg[0] = adrData[data[0]].toString();
                } else {
                    UpdateMsg[0] = "";
                }
                if (adrData.length > 1) {
                    UpdateMsg[1] = adrData[data[1]].toString();
                } else {
                    UpdateMsg[1] = "";
                }
            }
            if (UpdateMsg[0] == "失敗") {
            } else {
            }
        } else {
            UpdateMsg[0] = "失敗";
        }
        return UpdateMsg[0].toString();
    }
}
function QMenuProcessRequest() {
    try {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            respostData = xmlHttp.responseText;
            asjson = JSON.parse(respostData);
            var mask = document.getElementById("AsdivMaskFrame");
            if (mask) {
                document.body.removeChild(mask);
            }
            mask = window.top.document.getElementById("AsdivMaskFrame");
            if (mask) {
                window.top.document.body.removeChild(mask);
            }
            var load = document.getElementById("AsdivProgress");
            if (load) {
                document.body.removeChild(load);
            }
            load = window.top.document.getElementById("AsdivProgress");
            if (load) {
                window.top.document.body.removeChild(load);
            }
        }
    } catch (e) {
        var mask = document.getElementById("AsdivMaskFrame");
        if (mask) {
            document.body.removeChild(mask);
        }
        mask = window.top.document.getElementById("AsdivMaskFrame");
        if (mask) {
            window.top.document.body.removeChild(mask);
        }
        var load = document.getElementById("AsdivProgress");
        if (load) {
            document.body.removeChild(load);
        }
        load = window.top.document.getElementById("AsdivProgress");
        if (load) {
            window.top.document.body.removeChild(load);
        }
    }
}
function QMenuCallApi(sApiFullName, PostData) {
    asjson = null;
    var asui = null;
    var website = location.href;
    website = website.substring(0, website.lastIndexOf("/") + 1);
    try {
        client = getXmlHttpRequestObject();
        client.onreadystatechange = function () {
            try {
                if (client.readyState == 4 && client.status == 200) {
                    asui = client.getResponseHeader("asui");
                } else {
                    if (client.readyState == 4 && client.status == 403) {
                        alert("無權限");
                    }
                }
            } catch (e) {}
        };
        client.open("GET", encodeURI(website + "AsCheck.ashx"), false);
        client.send();
        if (asui.length != 0) {
            xmlHttp = getXmlHttpRequestObject();
            xmlHttp.onreadystatechange = QMenuProcessRequest;
            xmlHttp.open("POST", encodeURI(sApiFullName), false);
            xmlHttp.setRequestHeader("asui", asui);
            xmlHttp.send(PostData);
        } else {
            return "";
        }
    } catch (e) {
        var mask = document.getElementById("AsdivMaskFrame");
        if (mask) {
            document.body.removeChild(mask);
        }
        mask = window.top.document.getElementById("AsdivMaskFrame");
        if (mask) {
            window.top.document.body.removeChild(mask);
        }
        var load = document.getElementById("AsdivProgress");
        if (load) {
            document.body.removeChild(load);
        }
        load = window.top.document.getElementById("AsdivProgress");
        if (load) {
            window.top.document.body.removeChild(load);
        }
    }
    return asjson;
}
