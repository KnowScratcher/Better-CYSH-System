var xmlHttp;
var asjson;
var respostData;
var postData;
function AsdtData() {
    (dtName = ""),
        (dcNames = ""),
        (dcCaptions = ""),
        (dcDataType = ""),
        (dcMaxLength = ""),
        (drData = Array);
}
function ASjsonObj() {
    dtData = Array;
}
function SetAsJsonObj(
    dtName,
    dcNames,
    dcCaptions,
    dcDataType,
    dcMaxLength,
    drData
) {
    if (dcCaptions == null) dcCaptions = dcNames;
    var TmpDataType = "";
    var TmpMaxLength = "";
    var adcName = dcNames.toString().split(",");
    for (i = 0; i < adcName.length; i++) {
        if (dcDataType == null) {
            TmpDataType += "System.String,";
        }
        if (dcMaxLength == null) {
            TmpMaxLength += "-1,";
        }
    }
    if (TmpDataType.length != 0) {
        TmpDataType = TmpDataType.substring(0, TmpDataType.length - 1);
    }
    if (TmpMaxLength.length != 0) {
        TmpMaxLength = TmpMaxLength.substring(0, TmpMaxLength.length - 1);
    }
    if (dcDataType == null) dcDataType = TmpDataType;
    if (dcMaxLength == null) dcMaxLength = TmpMaxLength;
    asPostData = '{"dtData":';
    asPostData += "[";
    asPostData += "{";
    asPostData += '"dtName":' + '"' + dtName + '",';
    asPostData += '"dcNames":' + '"' + dcNames + '",';
    asPostData += '"dcCaptions":' + '"' + dcCaptions + '",';
    asPostData += '"dcDataType":' + '"' + dcDataType + '",';
    asPostData += '"dcMaxLength":' + '"' + dcMaxLength + '",';
    asPostData += '"drData": [';
    for (i = 0; i < drData.length; i++) {
        if (i != 0) asPostData += ",";
        asPostData += '"' + drData[i] + '"';
    }
    asPostData += "]";
    asPostData += "}";
    asPostData += "]}";
    return asPostData;
}
function getXmlHttpRequestObject() {
    if (window.XMLHttpRequest) {
        return new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        try {
            return new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                return new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {
                var ss = document.getElementById("search_suggest");
                ss.innerHTML =
                    '<b><font color="red" size="6">您的瀏灠器不支援AJAX功能，請升級或使用其它的瀏灠器!!</font></b>';
                ss.style.visibility = "visible";
                var width = window.innerWidth
                    ? window.innerWidth
                    : document.body.clientWidth;
                var objectWidth = 800;
                var newLocation = (width - objectWidth) / 2;
                if (newLocation < 0) newLocation = 0;
                ss.style.left = newLocation + "px";
                var height = window.innerHeight
                    ? window.innerHeight
                    : document.documentElement.clientHeight;
                var objectHeight = 80;
                var newLocation = (height - objectHeight) / 2;
                if (newLocation < 0) newLocation = 50;
                ss.style.top = newLocation + "px";
                ss.style.position = "absolute";
            }
        }
        return new ActiveXObject("Microsoft.XMLHTTP");
    }
}
function ProcessRequest() {
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
function CallApi(sApiFullName, PostData) {
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
            xmlHttp.onreadystatechange = ProcessRequest;
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
function filter1change(ctlID, thisID, targetID) {
    setData(ctlID, targetID);
}
function filter2change(ctlID, thisID, targetID) {
    setData(ctlID, targetID);
}
function filter3change(ctlID, thisID, targetID) {
    setData(ctlID, targetID);
}
function filter4change(ctlID, thisID, targetID) {
    setData(ctlID, targetID);
}
function setData(thisID, DataID) {
    var objFilter1 = document.getElementById(thisID + "_Filter1_ddl");
    var objFilter2 = document.getElementById(thisID + "_Filter2_ddl");
    var objFilter3 = document.getElementById(thisID + "_Filter3_ddl");
    var objFilter4 = document.getElementById(thisID + "_Filter4_ddl");
    var objFilter = document.getElementById(thisID + "_Filter");
    var objWebStd = document.getElementById(thisID);
    var objLB = document.getElementById(DataID);
    var objLData = document.getElementById(thisID + "_LData");
    var ApiUrl = objWebStd.getAttribute("asApi");
    var filter1RSource = "";
    var filter2RSource = "";
    var filter3RSource = "";
    var filter4RSource = "";
    filter1RSource = objWebStd.getAttribute("asfilter1RSource");
    filter2RSource = objWebStd.getAttribute("asfilter2RSource");
    filter3RSource = objWebStd.getAttribute("asfilter3RSource");
    filter4RSource = objWebStd.getAttribute("asfilter4RSource");
    var ItemSource = objWebStd.getAttribute("asApiItemSource");
    var asFilterMust = objWebStd.getAttribute("asFilterMust");
    var asIsFilter = 0;
    var asFilterItemMust = objWebStd.getAttribute("asFilterItemMust");
    if (asFilterItemMust != null && typeof asFilterItemMust != "undefined") {
        for (var tCnt = asFilterItemMust.length; tCnt < 4; tCnt++) {
            asFilterItemMust += "F";
        }
    } else {
        asFilterItemMust = "FFFF";
    }
    var FilterMust = asFilterItemMust.split("");
    var Filterdata = new Array();
    if (objFilter1 != null) {
        if (objFilter1.options[objFilter1.selectedIndex].value == "") {
            if (FilterMust[0] == "T") {
                alert("請選擇" + filter1RSource);
                return;
            }
        }
        asIsFilter += objFilter1.options[objFilter1.selectedIndex].value;
        Filterdata[0] =
            filter1RSource +
            "||" +
            objFilter1.options[objFilter1.selectedIndex].value;
    } else {
        Filterdata[0] = filter1RSource + "||";
    }
    if (objFilter2 != null) {
        if (objFilter2.options[objFilter2.selectedIndex].value == "") {
            if (FilterMust[1] == "T") {
                alert("請選擇" + filter2RSource);
                return;
            }
        }
        asIsFilter += objFilter2.options[objFilter2.selectedIndex].value;
        Filterdata[1] =
            filter2RSource +
            "||" +
            objFilter2.options[objFilter2.selectedIndex].value;
    } else {
        Filterdata[1] = filter2RSource + "||";
    }
    if (objFilter3 != null) {
        if (objFilter3.options[objFilter3.selectedIndex].value == "") {
            if (FilterMust[2] == "T") {
                alert("請選擇" + filter3RSource);
                return;
            }
        }
        asIsFilter += objFilter3.options[objFilter3.selectedIndex].value;
        Filterdata[2] =
            filter3RSource +
            "||" +
            objFilter3.options[objFilter3.selectedIndex].value;
    } else {
        Filterdata[2] = filter3RSource + "||";
    }
    if (objFilter4 != null) {
        if (objFilter4.options[objFilter4.selectedIndex].value == "") {
            if (FilterMust[3] == "T") {
                alert("請選擇" + filter4RSource);
                return;
            }
        }
        asIsFilter += objFilter4.options[objFilter4.selectedIndex].value;
        Filterdata[3] =
            filter4RSource +
            "||" +
            objFilter4.options[objFilter4.selectedIndex].value;
    } else {
        Filterdata[3] = filter4RSource + "||";
    }
    var iFilter = 4;
    if (objFilter.value.length != 0) {
        var aFilter = objFilter.value.split("&");
        for (i = 0; i < aFilter.length; i++) {
            var aFilterList = aFilter[i].split("=");
            Filterdata[iFilter] = aFilterList[0] + "||" + aFilterList[1];
            iFilter = iFilter + 1;
        }
    }
    if (asFilterMust == "T" && asIsFilter.length == 0) {
        alert("請至少選擇一項條件");
        var tlength = objLB.options.length;
        for (i = tlength - 1; i >= 0; i--) {
            objLB.options[i] = null;
        }
        return;
    }
    var PostAsJsonObj =
        "apiName=" +
        ApiUrl +
        "&Param=" +
        SetAsJsonObj("參數檔", "key,value", null, null, null, Filterdata);
    var website = location.href;
    website = website.substring(0, website.lastIndexOf("/") + 1);
    ApiUrl = website + "AsCallBase.ashx";
    ShowAsloader();
    setTimeout(function () {
        var jobj = CallApi(ApiUrl, PostAsJsonObj);
        if (jobj !== null && typeof jobj != "undefined") {
            objLData.value = "";
            var data = [];
            var adcCaption = jobj.dtData[0].dcCaptions.toString().split(",");
            var adcName = jobj.dtData[0].dcNames.toString().split(",");
            for (i = 0; i < adcName.length; i++) {
                if (ItemSource != null && typeof ItemSource != "undefined") {
                    var ItemName = ItemSource.split(",");
                    if (ItemName.length == 2) {
                        for (i = 0; i < adcName.length; i++) {
                            if (adcName[i].toString() == ItemName[0]) {
                                data[0] = i;
                            }
                            if (adcName[i].toString() == ItemName[1]) {
                                data[1] = i;
                            }
                        }
                    } else {
                        for (i = 0; i < adcName.length; i++) {
                            if (adcName[i].toString() == ItemName[0]) {
                                data[0] = i;
                                data[1] = i;
                            }
                        }
                    }
                } else {
                    if (adcName[i].toString() == "key") {
                        data[0] = i;
                    }
                    if (adcName[i].toString() == "value") {
                        data[1] = i;
                    }
                }
            }
            var tmplength = objLB.options.length;
            for (i = tmplength - 1; i >= 0; i--) {
                objLB.options[i] = null;
            }
            var objLBSel = document.getElementById(
                DataID.replace("_lbStdL", "_lbStdR")
            );
            var datasel = [];
            for (k = 0; k < objLBSel.options.length; k++) {
                datasel[k] = objLBSel.options[k].value;
            }
            for (i = 0; i < jobj.dtData[0].drData.length; i++) {
                var adrData = jobj.dtData[0].drData[i].split("||");
                var chkSel = false;
                for (j = 0; j < datasel.length; j++) {
                    if (datasel[j] == adrData[data[0]].toString()) {
                        chkSel = true;
                    }
                }
                if (chkSel == false) {
                    var opt = document.createElement("option");
                    opt.text = adrData[data[1]].toString();
                    opt.value = adrData[data[0]].toString();
                    opt.label = adrData[data[1]].toString();
                    objLB.options.add(opt);
                    if (objLData.value.length > 0) objLData.value += "@";
                    let optvalue = opt.value;
                    if (optvalue.indexOf("@") > -1) {
                        optvalue = optvalue.replace("@", "{(#split!Mark#)}");
                    }
                    let opttext = opt.text;
                    if (opttext.indexOf("@") > -1) {
                        opttext = opttext.replace("@", "{(#split!Mark#)}");
                    }
                    objLData.value += optvalue + "!!" + opttext;
                }
            }
        }
        $(document).off("keydown");
    }, 0);
}
function CallApiUpdate(ApiUrl, dtName, dcNames, drData, ApiMsg) {
    var UpdateMsg = new Array();
    var Filterdata = new Array();
    Filterdata[0] = drData;
    ShowAsloader();
    var PostAsJsonObj =
        "apiName=" +
        ApiUrl +
        "&Param=" +
        SetAsJsonObj(dtName, dcNames, dcNames, null, null, Filterdata);
    var website = location.href;
    website = website.substring(0, website.lastIndexOf("/") + 1);
    ApiUrl = website + "AsCallBase.ashx";
    var jobj = CallApi(ApiUrl, PostAsJsonObj);
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
            if (adcName[i].toString() == "ukey") {
                data[2] = i;
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
            if (adrData.length > 2 && data.length > 2) {
                UpdateMsg[2] = adrData[data[2]].toString();
            } else {
                UpdateMsg[2] = "";
            }
        }
        if (ApiMsg == null) ApiMsg = 1;
        if (ApiMsg > 0) {
            if (UpdateMsg[0] == "失敗") {
                alert(UpdateMsg[0].toString() + ":" + UpdateMsg[1].toString());
            } else {
                if (ApiMsg == 2) {
                    alert(
                        UpdateMsg[0].toString() + ":" + UpdateMsg[1].toString()
                    );
                }
            }
        }
        return UpdateMsg;
    } else {
        if (ApiMsg == null) ApiMsg = 1;
        if (ApiMsg > 0) {
            UpdateMsg[0] = "失敗";
        }
        alert("失敗");
        return UpdateMsg;
    }
}
function CallApiUpdateDt(ApiUrl, dtName, dcNames, dtData, ApiMsg) {
    var UpdateMsg = new Array();
    ShowAsloader();
    var PostAsJsonObj =
        "apiName=" +
        ApiUrl +
        "&Param=" +
        SetAsJsonObj(dtName, dcNames, dcNames, null, null, dtData);
    var website = location.href;
    website = website.substring(0, website.lastIndexOf("/") + 1);
    ApiUrl = website + "AsCallBase.ashx";
    var jobj = CallApi(ApiUrl, PostAsJsonObj);
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
            if (adcName[i].toString() == "ukey") {
                data[2] = i;
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
            if (adrData.length > 2 && data.length > 2) {
                UpdateMsg[2] = adrData[data[2]].toString();
            } else {
                UpdateMsg[2] = "";
            }
        }
        if (ApiMsg == null) ApiMsg = 1;
        if (ApiMsg > 0) {
            if (UpdateMsg[0] == "失敗") {
                alert(UpdateMsg[0].toString() + ":" + UpdateMsg[1].toString());
            } else {
                if (ApiMsg == 2) {
                    alert(
                        UpdateMsg[0].toString() + ":" + UpdateMsg[1].toString()
                    );
                }
            }
        }
        return UpdateMsg;
    } else {
        if (ApiMsg == null) ApiMsg = 1;
        if (ApiMsg > 0) {
            UpdateMsg[0] = "失敗";
        }
        alert("失敗");
        return UpdateMsg;
    }
}
function asArray2DVar(x, y) {
    this.length = x;
    this.x = x;
    this.y = y;
    for (var i = 0; i < this.length; i++) this[i] = new Array(y);
}
function CallApiArray(ApiUrl, dtName, dcNames, Filterdata, ApiMsg) {
    ShowAsloader();
    var PostAsJsonObj =
        "apiName=" +
        ApiUrl +
        "&Param=" +
        SetAsJsonObj(dtName, dcNames, dcNames, null, null, Filterdata);
    var website = location.href;
    website = website.substring(0, website.lastIndexOf("/") + 1);
    ApiUrl = website + "AsCallBase.ashx";
    var jobj = CallApi(ApiUrl, PostAsJsonObj);
    if (jobj !== null && typeof jobj != "undefined") {
        var adcName = jobj.dtData[0].dcNames.toString().split(",");
        var data = new asArray2DVar(
            jobj.dtData[0].drData.length,
            new Array(adcName.length)
        );
        for (i = 0; i < jobj.dtData[0].drData.length; i++) {
            var adrData = jobj.dtData[0].drData[i].split("||");
            for (j = 0; j < adcName.length; j++) {
                if (adrData.length >= j) {
                    data[i][adcName[j].toString()] = adrData[j].toString();
                } else {
                    data[i][adcName[j].toString()] = "";
                }
            }
        }
        return data;
    } else {
        alert("失敗");
    }
}
function asResolve(thisID, DataID) {
    var objWebStd = document.getElementById(thisID);
    var objLB = document.getElementById(DataID);
    var objRData = document.getElementById(thisID + "_RData");
    var ResolveUrl = objWebStd.getAttribute("asResolve");
    var ItemSource = objWebStd.getAttribute("asApiItemSource");
    var ResolvData = document.getElementById(thisID + "_tbStdL").value;
    if (ResolvData.length == 0) {
        return;
    }
    var objFilter = document.getElementById(thisID + "_Filter");
    var Filterdata = new Array();
    var iFilter = 0;
    if (objFilter.value.length != 0) {
        var aFilter = objFilter.value.split("&");
        for (i = 0; i < aFilter.length; i++) {
            var aFilterList = aFilter[i].split("=");
            Filterdata[iFilter] = aFilterList[0] + "||" + aFilterList[1];
            iFilter = iFilter + 1;
        }
    }
    Filterdata[iFilter] = "EXCEL||" + ResolvData;
    var PostAsJsonObj =
        "apiName=" +
        ResolveUrl +
        "&Param=" +
        SetAsJsonObj("參數檔", "key,value", null, null, null, Filterdata);
    var website = location.href;
    website = website.substring(0, website.lastIndexOf("/") + 1);
    ResolveUrl = website + "AsCallBase.ashx";
    var SetData = false;
    var SetObj = document.getElementById(thisID + "_cbSet");
    if (SetObj) {
        SetData = SetObj.checked;
    }
    ShowAsloader();
    setTimeout(function () {
        var jobj = CallApi(ResolveUrl, PostAsJsonObj);
        if (jobj !== null && typeof jobj != "undefined") {
            var data = new Array();
            var adcCaption = jobj.dtData[0].dcCaptions.toString().split(",");
            var adcName = jobj.dtData[0].dcNames.toString().split(",");
            for (i = 0; i < adcName.length; i++) {
                if (ItemSource != null && typeof ItemSource != "undefined") {
                    var ItemName = ItemSource.split(",");
                    if (ItemName.length == 2) {
                        for (i = 0; i < adcName.length; i++) {
                            if (adcName[i].toString() == ItemName[0]) {
                                data[0] = i;
                            }
                            if (adcName[i].toString() == ItemName[1]) {
                                data[1] = i;
                            }
                        }
                    } else {
                        for (i = 0; i < adcName.length; i++) {
                            if (adcName[i].toString() == ItemName[0]) {
                                data[0] = i;
                                data[1] = i;
                            }
                        }
                    }
                } else {
                    if (adcName[i].toString() == "key") {
                        data[0] = i;
                    }
                    if (adcName[i].toString() == "value") {
                        data[1] = i;
                    }
                }
            }
            var datasel = [];
            for (k = 0; k < objLB.options.length; k++) {
                datasel[k] = objLB.options[k].value.replace("#asNot#", "");
            }
            for (i = 0; i < jobj.dtData[0].drData.length; i++) {
                var adrData = jobj.dtData[0].drData[i].split("||");
                var chkSel = false;
                for (j = 0; j < datasel.length; j++) {
                    if (datasel[j] == adrData[data[0]].toString()) {
                        chkSel = true;
                    }
                }
                if (chkSel == false) {
                    var opt = document.createElement("option");
                    opt.text = adrData[data[1]].toString();
                    opt.value = adrData[data[0]].toString();
                    opt.label = adrData[data[1]].toString();
                    if (SetData) {
                        opt.setAttribute("class", "doNotDrop");
                        opt.value += "#asNot#";
                    }
                    objLB.options.add(opt);
                    if (objRData.value.length > 0) {
                        objRData.value += "@";
                    }
                    let optvalue = opt.value;
                    if (optvalue.indexOf("@") > -1) {
                        optvalue = optvalue.replace("@", "{(#split!Mark#)}");
                    }
                    let opttext = opt.text;
                    if (opttext.indexOf("@") > -1) {
                        opttext = opttext.replace("@", "{(#split!Mark#)}");
                    }
                    objRData.value += optvalue + "!!" + opttext;
                    var objLBSel = document.getElementById(
                        DataID.replace("_lbStdR", "_lbStdL")
                    );
                    for (d = 0; d < objLBSel.options.length; d++) {
                        if (objLBSel.options[d].value == opt.value) {
                            objLBSel.options[d] = null;
                        }
                    }
                } else {
                }
            }
            asSumList(thisID + "_labMsg", DataID);
        } else {
            alert("失敗");
        }
    }, 0);
}
function asSumList(MsgID, DataID) {
    var objDDL = document.getElementById(DataID);
    var objMsg = document.getElementById(MsgID);
    var icount = 0;
    for (var i = 0; i < objDDL.length; i++) {
        if (objDDL[i].getAttribute("opgp") != undefined) {
            var opgp = objDDL[i].getAttribute("opgp");
            if (opgp != "undefined") {
                opgp = opgp.substring(0, selectedValue.indexOf(","));
                if (opgp != "0") {
                    icount = icount + 1;
                }
            } else {
                icount = icount + 1;
            }
        } else {
            icount = icount + 1;
        }
    }
    var MsgFormate = objMsg.getAttribute("asMsgFormate");
    var Msg;
    if (MsgFormate != undefined) {
        Msg = MsgFormate.replace("##", icount.toString());
    } else {
        Msg = icount.toString();
    }
    objMsg.innerHTML = Msg;
}
function asStdAdd(ctlID, thisID, bCheckSelected) {
    var objWebStd = document.getElementById(ctlID);
    var ListL = document.getElementById(thisID);
    var ListR = document.getElementById(thisID.replace("_lbStdL", "_lbStdR"));
    var ListL_Data = document.getElementById(ctlID + "_LData");
    var ListR_Data = document.getElementById(ctlID + "_RData");
    var SetData = false;
    var SetObj = document.getElementById(ctlID + "_cbSet");
    if (SetObj) {
        SetData = SetObj.checked;
    }
    for (var i = 0; i < ListL.length; i++) {
        if (ListL[i].selected || !bCheckSelected) {
            var selectedValue = ListL[i].value;
            selectedValue = selectedValue.substring(
                0,
                selectedValue.indexOf(",")
            );
            if (selectedValue == "0") {
                var k = 0;
                var opt = document.createElement("option");
                var opgp = ListL[i].getAttribute("opgp");
                ListR.options.add(opt, k);
                opt.text = ListL[i].text;
                opt.value = ListL[i].value;
                opt.label = ListL[i].label;
                opt.setAttribute("opgp", opgp);
                for (var j = ListL.length - 1; j >= 0; j--) {
                    if (
                        ListL[j].getAttribute("opgp") == opgp &&
                        j != ListL.selectedIndex
                    ) {
                        var opt = document.createElement("option");
                        ListR.options.add(opt, k + 1);
                        opt.text = ListL[j].text;
                        opt.value = ListL[j].value;
                        opt.label = ListL[j].label;
                        if (SetData) {
                            opt.setAttribute("class", "doNotDrop");
                            opt.value += "#asNot#";
                        }
                        opt.setAttribute("opgp", opgp);
                    }
                }
            } else {
                var opt = document.createElement("option");
                ListR.options.add(opt);
                opt.text = ListL[i].text;
                opt.value = ListL[i].value;
                opt.label = ListL[i].label;
                if (SetData) {
                    opt.setAttribute("class", "doNotDrop");
                    opt.value += "#asNot#";
                }
                opt.setAttribute("opgp", opgp);
            }
        }
    }
    for (var i = ListL.length - 1; i >= 0; i--) {
        if (ListL[i].selected || !bCheckSelected) {
            var selectedValue = ListL[i].value;
            selectedValue = selectedValue.substring(
                0,
                selectedValue.indexOf(",")
            );
            if (selectedValue == "0") {
                var opgp = ListL[i].getAttribute("opgp");
                for (var j = ListL.length - 1; j >= 0; j--) {
                    if (
                        ListL[j].getAttribute("opgp") == opgp &&
                        j != ListL.selectedIndex
                    ) {
                        var Lval = ListL[j].value + "!!" + ListL[j].text;
                        ListL.remove(j);
                        ListL_Data.value = ListL_Data.value
                            .replace(Lval, "")
                            .replace("@@", "@");
                    }
                }
                var Lval = ListL[i].value + "!!" + ListL[i].text;
                ListL_Data.value = ListL_Data.value
                    .replace(Lval, "")
                    .replace("@@", "@");
                ListL.remove(i);
            } else {
                var Lval = ListL[i].value + "!!" + ListL[i].text;
                ListL_Data.value = ListL_Data.value
                    .replace(Lval, "")
                    .replace("@@", "@");
                ListL.remove(i);
            }
        }
    }
    var KeyWord = document.getElementById(ctlID + "_FilterKeyWord_tb");
    var KeyVal = "";
    if (KeyWord != null && typeof KeyWord != "undefined") {
        if (KeyWord.value.length > 0) {
            KeyVal = KeyWord.value;
            KeyWord.value = "";
            FilterKeyWordchange(ctlID, ctlID + "_FilterKeyWord", thisID);
        }
        asSumList(ctlID + "_labMsg", thisID.replace("_lbStdL", "_lbStdR"));
        asReLoadData(ctlID);
        KeyWord.value = KeyVal;
        FilterKeyWordchange(ctlID, ctlID + "_FilterKeyWord", thisID);
    } else {
        asSumList(ctlID + "_labMsg", thisID.replace("_lbStdL", "_lbStdR"));
        asReLoadData(ctlID);
    }
}
function asStdAddAll(ctlID, thisID) {
    asStdAdd(ctlID, thisID, false);
}
function asStdDel(ctlID, thisID, bCheckSelected) {
    var objWebStd = document.getElementById(ctlID);
    var ListL = document.getElementById(thisID.replace("_lbStdR", "_lbStdL"));
    var ListR = document.getElementById(thisID);
    var ListL_Data = document.getElementById(ctlID + "_LData");
    var ListR_Data = document.getElementById(ctlID + "_RData");
    for (var i = 0; i < ListR.length; i++) {
        if (ListR[i].selected || !bCheckSelected) {
            var selectedValue = ListR[i].value;
            selectedValue = selectedValue.substring(
                0,
                selectedValue.indexOf(",")
            );
            if (selectedValue == "0") {
                var k = 0;
                var opt = document.createElement("option");
                var opgp = ListR[i].getAttribute("opgp");
                opt.text = ListR[i].text;
                opt.value = ListR[i].value;
                opt.label = ListR[i].label;
                opt.setAttribute("opgp", opgp);
                ListL.options.add(opt, k);
                var Lval = ListR[i].value + "!!" + ListR[i].text;
                var Larray = ListL_Data.valu.split("@");
                Larray.splice(k, 0, Lval);
                ListL_Data.value = "";
                for (var l = 0; l < Larray.length; l++) {
                    if (l > 0) ListL_Data.value += "@";
                    ListL_Data.value += Larray[l].replace(
                        "{(#split!Mark#)}",
                        "@"
                    );
                }
                for (var j = ListR.length - 1; j >= 0; j--) {
                    if (
                        ListR[j].getAttribute("opgp") == opgp &&
                        j != ListR.selectedIndex
                    ) {
                        var opt = document.createElement("option");
                        opt.text = ListR[j].text;
                        opt.value = ListR[j].value.replace("#asNot#", "");
                        opt.label = ListR[j].label;
                        opt.setAttribute("opgp", opgp);
                        ListL.options.add(opt, k + 1);
                        var Lval = ListR[j].value + "!!" + ListR[j].text;
                        var Larray = ListL_Data.valu.split("@");
                        Larray.splice(k + 1, 0, Lval);
                        ListL_Data.value = "";
                        for (var l = 0; l < Larray.length; l++) {
                            if (l > 0) ListL_Data.value += "@";
                            ListL_Data.value += Larray[l].replace(
                                "{(#split!Mark#)}",
                                "@"
                            );
                        }
                    }
                }
            } else {
                var opt = document.createElement("option");
                opt.text = ListR[i].text;
                opt.value = ListR[i].value.replace("#asNot#", "");
                opt.label = ListR[i].label;
                opt.setAttribute("opgp", opgp);
                ListL.options.add(opt);
                if (ListL_Data.value.length > 0) {
                    ListL_Data.value += "@";
                }
                let optvalue = ListR[i].value;
                if (optvalue.indexOf("@") > -1) {
                    optvalue = optvalue.replace("@", "{(#split!Mark#)}");
                }
                let opttext = ListR[i].text;
                if (opttext.indexOf("@") > -1) {
                    opttext = opttext.replace("@", "{(#split!Mark#)}");
                }
                ListL_Data.value += optvalue + "!!" + opttext;
            }
        }
    }
    for (var i = ListR.length - 1; i >= 0; i--) {
        if (ListR[i].selected || !bCheckSelected) {
            var selectedValue = ListR[i].value;
            selectedValue = selectedValue.substring(
                0,
                selectedValue.indexOf(",")
            );
            if (selectedValue == "0") {
                var opgp = ListR[i].getAttribute("opgp");
                for (var j = ListR.length - 1; j >= 0; j--) {
                    if (
                        ListR[j].getAttribute("opgp") == opgp &&
                        j != ListR.selectedIndex
                    ) {
                        ListR.remove(j);
                    }
                }
                ListR.remove(i);
            } else {
                ListR.remove(i);
            }
        }
    }
    var KeyWord = document.getElementById(ctlID + "_FilterKeyWord_tb");
    var KeyVal = "";
    if (KeyWord != null && typeof KeyWord != "undefined") {
        if (KeyWord.value.length > 0) {
            KeyVal = KeyWord.value;
            KeyWord.value = "";
            FilterKeyWordchange(
                ctlID,
                ctlID + "_FilterKeyWord",
                thisID.replace("_lbStdR", "_lbStdL")
            );
        }
        asSumList(ctlID + "_labMsg", thisID);
        asReLoadData(ctlID);
        KeyWord.value = KeyVal;
        FilterKeyWordchange(
            ctlID,
            ctlID + "_FilterKeyWord",
            thisID.replace("_lbStdR", "_lbStdL")
        );
    } else {
        asSumList(ctlID + "_labMsg", thisID);
        asReLoadData(ctlID);
    }
}
function asStdDelAll(ctlID, thisID) {
    asStdDel(ctlID, thisID, false);
}
function asReLoadData(thisID) {
    var objWebStd = document.getElementById(thisID);
    var ListLObj = document.getElementById(thisID + "_lbStdL");
    var ListRObj = document.getElementById(thisID + "_lbStdR");
    var ListL_DataObj = document.getElementById(thisID + "_LData");
    var ListR_DataObj = document.getElementById(thisID + "_RData");
    ListR_DataObj.value = "";
    ListL_DataObj.value = "";
    for (var i = 0; i < ListRObj.length; i++) {
        if (i > 0) ListR_DataObj.value += "@";
        let optvalue = ListRObj[i].value;
        if (optvalue.indexOf("@") > -1) {
            optvalue = optvalue.replace("@", "{(#split!Mark#)}");
        }
        let opttext = ListRObj[i].text;
        if (opttext.indexOf("@") > -1) {
            opttext = opttext.replace("@", "{(#split!Mark#)}");
        }
        ListR_DataObj.value += optvalue + "!!" + opttext;
    }
    for (var i = 0; i < ListLObj.length; i++) {
        if (i > 0) ListL_DataObj.value += "@";
        let optvalue = ListLObj[i].value;
        if (optvalue.indexOf("@") > -1) {
            optvalue = optvalue.replace("@", "{(#split!Mark#)}");
        }
        let opttext = ListLObj[i].text;
        if (opttext.indexOf("@") > -1) {
            opttext = opttext.replace("@", "{(#split!Mark#)}");
        }
        ListL_DataObj.value += optvalue + "!!" + opttext;
    }
}
function asSetStd(ctlID, thisID) {
    var ListR = document.getElementById(thisID);
    for (var i = 0; i < ListR.length; i++) {
        if (ListR[i].selected) {
            var selectedValue = ListR[i].value;
            var selectedText = ListR[i].text;
            var selectedLabel = ListR[i].label;
            if (selectedValue.indexOf("#asNot#") == -1) {
                ListR[i].setAttribute("class", "doNotDrop");
                ListR[i].value += "#asNot#";
            } else {
                ListR[i].setAttribute("class", "");
                ListR[i].value = selectedValue.replace("#asNot#", "");
            }
        }
    }
}
function asChgStd(ctlID, thisID) {
    var ListR = document.getElementById(thisID);
    for (var i = 0; i < ListR.length; i++) {
        if (ListR[i].selected) {
            var selectedValue = ListR[i].value;
            var selectedText = ListR[i].text;
            var selectedLabel = ListR[i].label;
            if (selectedValue.indexOf("#asNot#") == -1) {
                ListR[i].setAttribute("class", "doNotDrop");
                ListR[i].value += "#asNot#";
            } else {
                ListR[i].setAttribute("class", "");
                ListR[i].value = selectedValue.replace("#asNot#", "");
            }
        }
    }
    var ListRObj = document.getElementById(ctlID + "_lbStdR");
    var ListR_DataObj = document.getElementById(ctlID + "_RData");
    ListR_DataObj.value = "";
    for (var i = 0; i < ListRObj.length; i++) {
        if (i > 0) ListR_DataObj.value += "@";
        let optvalue = ListRObj[i].value;
        if (optvalue.indexOf("@") > -1) {
            optvalue = optvalue.replace("@", "{(#split!Mark#)}");
        }
        let opttext = ListRObj[i].text;
        if (opttext.indexOf("@") > -1) {
            opttext = opttext.replace("@", "{(#split!Mark#)}");
        }
        ListR_DataObj.value += optvalue + "!!" + opttext;
    }
}
function FilterKeyWordchange(ctlID, thisID, targetID) {
    var objLB = document.getElementById(targetID);
    var tmplength = objLB.options.length;
    for (var i = tmplength - 1; i >= 0; i--) {
        objLB.options[i] = null;
    }
    var LDataVal = document.getElementById(ctlID + "_LData").value;
    var tmpArr = LDataVal.split("@");
    for (var l1 = 0; l1 < tmpArr.length; l1++) {
        var tmpmval = tmpArr[l1].replace("{(#split!Mark#)}", "@").split("!!");
        if (tmpmval.length == 2) {
            var keyW = document.getElementById(thisID + "_tb").value;
            if (tmpmval[1].indexOf(keyW) > -1) {
                var opt = document.createElement("option");
                opt.text = tmpmval[1];
                opt.value = tmpmval[0];
                opt.label = tmpmval[1];
                objLB.options.add(opt);
            }
        }
    }
}
