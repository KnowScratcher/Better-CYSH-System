var beforeMsg = "";
var beforesValue = "";
function ShowMsg(obj, sErrMsg) {
    if (sErrMsg == beforeMsg) {
        return;
    }
    beforeMsg = sErrMsg;
    var obj_valid;
    if (obj.id.indexOf("_tb") != -1) {
        obj_valid = document.getElementById(obj.id.replace(/_tb$/g, "_err"));
    } else {
        if (obj.id.indexOf("_ddl") != -1) {
            obj_valid = document.getElementById(
                obj.id.replace(/_ddl$/g, "_labErr")
            );
        }
    }
    if (obj_valid == null) return;
    obj_valid.style.display = "";
    obj_valid.innerText = sErrMsg;
    setTimeout(function () {
        beforeMsg = "";
    }, 0);
}
function Keylimit(e, type) {}
function isDate(sValue, isRocDate) {
    if (isRocDate) {
        sValue =
            (Number(sValue.substring(0, 3)) + 1911).toString() +
            sValue.substring(3);
    }
    var r = sValue.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
    if (r == null) return false;
    var d = new Date(r[1], r[3] - 1, r[4]);
    return (
        d.getFullYear() == r[1] &&
        d.getMonth() + 1 == r[3] &&
        d.getDate() == r[4]
    );
}
function check_id(sValue, kind) {
    var id = sValue;
    if (kind == "I") {
        if (id.length != 10) return false;
        if (
            isNaN(id.substr(1, 9)) ||
            id.substr(0, 1) < "A" ||
            id.substr(0, 1) > "Z"
        ) {
            return false;
        }
        var head = "ABCDEFGHJKLMNPQRSTUVXYWZIO";
        id = head.indexOf(id.substring(0, 1)) + 10 + "" + id.substr(1, 9);
        s =
            parseInt(id.substr(0, 1)) +
            parseInt(id.substr(1, 1)) * 9 +
            parseInt(id.substr(2, 1)) * 8 +
            parseInt(id.substr(3, 1)) * 7 +
            parseInt(id.substr(4, 1)) * 6 +
            parseInt(id.substr(5, 1)) * 5 +
            parseInt(id.substr(6, 1)) * 4 +
            parseInt(id.substr(7, 1)) * 3 +
            parseInt(id.substr(8, 1)) * 2 +
            parseInt(id.substr(9, 1)) +
            parseInt(id.substr(10, 1));
        if (s % 10 != 0) return false;
        return true;
    } else if (kind == "P") {
    } else if (kind == "R") {
        if (id.length != 10) return false;
        if (
            isNaN(id.substr(2, 8)) ||
            id.substr(0, 1) < "A" ||
            id.substr(0, 1) > "Z" ||
            id.substr(1, 1) < "A" ||
            id.substr(1, 1) > "Z"
        ) {
            return false;
        }
        var head = "ABCDEFGHJKLMNPQRSTUVXYWZIO";
        id =
            head.indexOf(id.substr(0, 1)) +
            10 +
            "" +
            ((head.indexOf(id.substr(1, 1)) + 10) % 10) +
            "" +
            id.substr(2, 8);
        s =
            parseInt(id.substr(0, 1)) +
            parseInt(id.substr(1, 1)) * 9 +
            parseInt(id.substr(2, 1)) * 8 +
            parseInt(id.substr(3, 1)) * 7 +
            parseInt(id.substr(4, 1)) * 6 +
            parseInt(id.substr(5, 1)) * 5 +
            parseInt(id.substr(6, 1)) * 4 +
            parseInt(id.substr(7, 1)) * 3 +
            parseInt(id.substr(8, 1)) * 2 +
            parseInt(id.substr(9, 1)) +
            parseInt(id.substr(10, 1));
        if (s % 10 != 0) {
            if (
                isNaN(id.substr(2, 8)) ||
                id.substr(0, 1) < "A" ||
                id.substr(0, 1) > "Z" ||
                id.substr(1, 1) < "8" ||
                id.substr(1, 1) > "9"
            ) {
                return false;
            }
            var head = "ABCDEFGHJKLMNPQRSTUVXYWZIO";
            id = head.indexOf(id.substr(0, 1)) + 10 + "" + id.substr(1, 9);
            s =
                parseInt(id.substr(0, 1)) +
                parseInt(id.substr(1, 1)) * 9 +
                parseInt(id.substr(2, 1)) * 8 +
                parseInt(id.substr(3, 1)) * 7 +
                parseInt(id.substr(4, 1)) * 6 +
                parseInt(id.substr(5, 1)) * 5 +
                parseInt(id.substr(6, 1)) * 4 +
                parseInt(id.substr(7, 1)) * 3 +
                parseInt(id.substr(8, 1)) * 2 +
                parseInt(id.substr(9, 1)) +
                parseInt(id.substr(10, 1));
            if (s % 10 != 0) {
                return false;
            }
            return true;
        }
        return true;
    } else {
        return false;
    }
}
function padLeft(str, len) {
    str = "" + str;
    return str.length >= len
        ? str
        : new Array(len - str.length + 1).join("0") + str;
}
function numFormat(sValue, sFormat) {
    if (sFormat.length == 0 || sValue.length == 0) {
        return sValue;
    }
    var sValueReturn = "";
    var sFormatArr = (sFormat.indexOf(".") < 0 ? sFormat + "." : sFormat).split(
        "."
    );
    if (sFormatArr.length > 2) {
        return sValue;
    }
    var sFormatChar_Right = sFormatArr[1].split("");
    var sFormatMaxRightNum = 0;
    if (sFormatChar_Right.length > 0) {
        for (var m = sFormatChar_Right.length - 1; m >= 0; m--) {
            if (
                sFormatChar_Right[m] == "#" ||
                /\d/.test(sFormatChar_Right[m])
            ) {
                sFormatMaxRightNum = m;
                var size = Math.pow(10, m + 1);
                sValue = Math.round(sValue * size) / size;
                break;
            }
        }
    } else {
        var size = Math.pow(10, sFormatChar_Right.length + 1);
        sValue = Math.round(sValue * size) / size;
    }
    var sValueArr = (
        sValue.toString().indexOf(".") < 0
            ? sValue.toString() + "."
            : sValue.toString()
    ).split(".");
    var sValueChar_Right = sValueArr[1].split("");
    var i = 0;
    var j = 0;
    while (i < sValueChar_Right.length || j < sFormatChar_Right.length) {
        if (i < sValueChar_Right.length && j < sFormatChar_Right.length) {
            if (
                sFormatChar_Right[j] == "#" ||
                /\d/.test(sFormatChar_Right[j])
            ) {
                sValueReturn = sValueReturn + sValueChar_Right[i];
                i++;
                j++;
            } else if (j > sFormatMaxRightNum) {
                sValueReturn = sValueReturn + sValueChar_Right[i];
                i++;
            } else {
                sValueReturn = sValueReturn + sFormatChar_Right[j];
                j++;
            }
            continue;
        }
        if (i < sValueChar_Right.length && j >= sFormatChar_Right.length) {
            sValueReturn = sValueReturn + sValueChar_Right[i];
            i++;
            continue;
        }
        if (i >= sValueChar_Right.length && j < sFormatChar_Right.length) {
            if (sFormatChar_Right[j] != "#" && sFormatChar_Right[j] != ",") {
                sValueReturn = sValueReturn + sFormatChar_Right[j];
            }
            j++;
            continue;
        }
    }
    if (sValueReturn.length > 0) {
        sValueReturn = "." + sValueReturn;
    }
    var sFormatChar_Left = sFormatArr[0].split("");
    var sValueChar_Left = sValueArr[0].split("");
    if (sValueChar_Left.length > 1) {
        for (var z = 0; z < sValueChar_Left.length; z++) {
            if (sValueChar_Left[z] == "0") {
                sValueChar_Left[z] = "";
            } else {
                break;
            }
        }
    }
    var sFormatMaxLeftNum = sFormatChar_Left.length - 1;
    for (var m = 0; m < sFormatChar_Left.length; m++) {
        if (sFormatChar_Left[m] == "#" || /\d/.test(sFormatChar_Left[m])) {
            sFormatMaxLeftNum = m;
            break;
        }
    }
    var j = sFormatChar_Left.length - 1;
    var i = sValueChar_Left.length - 1;
    while (i >= 0 || j >= 0) {
        if (i >= 0 && sValueChar_Left[i] == "-") {
            sValueReturn = sValueChar_Left[i] + sValueReturn;
            i--;
        }
        if (i >= 0 && j >= 0) {
            if (sFormatChar_Left[j] == "#" || /\d/.test(sFormatChar_Left[j])) {
                sValueReturn = sValueChar_Left[i] + sValueReturn;
                i--;
                j--;
            } else if (j < sFormatMaxLeftNum) {
                sValueReturn = sValueChar_Left[i] + sValueReturn;
                i--;
            } else {
                sValueReturn = sFormatChar_Left[j] + sValueReturn;
                j--;
            }
            continue;
        }
        if (i >= 0 && j < 0) {
            sValueReturn = sValueChar_Left[i] + sValueReturn;
            i--;
            continue;
        }
        if (i < 0 && j >= 0) {
            if (sFormatChar_Left[j] != "#" && sFormatChar_Left[j] != ",") {
                sValueReturn = sFormatChar_Left[j] + sValueReturn;
            }
            j--;
            continue;
        }
    }
    return sValueReturn;
}
function numReFormat(sValue) {
    if (sValue.length == 0) {
        return "";
    }
    var sValueArr = sValue.split(".");
    var Minus = sValue.indexOf("-") >= 0 ? "-" : "";
    var sValueReturn = "";
    switch (sValueArr.length) {
        case 2:
            sValueReturn =
                sValueArr[0].length == 0
                    ? "0"
                    : "" + "." + sValueArr[1].replace(/\D/g, "");
        case 1:
            sValueReturn =
                Minus + sValueArr[0].replace(/\D/g, "") + sValueReturn;
            break;
        default:
            return "";
    }
    return parseFloat(sValueReturn);
}
function numFocus(obj) {
    if (beforesValue.length > 0) {
        obj.value = beforesValue;
    } else {
        obj.value = numReFormat(obj.value);
    }
}
function numBlur(obj) {
    var sValue = obj.value;
    var bMust =
        obj.getAttribute("asMust").toLowerCase() == "true" ? true : false;
    var iMin = obj.getAttribute("asMin");
    var iMax = obj.getAttribute("asMax");
    var sErrMsg = obj.getAttribute("asErrMsg");
    var sFormat = obj.getAttribute("asFormat");
    if (bMust && sValue.length == 0) {
        ShowMsg(obj, "輸入資料不能為空白");
        return;
    }
    sValue = sValue.replace(/[,]+/g, "");
    if (sValue.length > 0 && isNaN(sValue)) {
        ShowMsg(obj, sErrMsg);
        return;
    }
    if (!(iMin == 0 && iMax == 0)) {
        if (
            parseFloat(sValue) < parseFloat(iMin) ||
            parseFloat(sValue) > parseFloat(iMax)
        ) {
            ShowMsg(obj, "輸入資料範圍必須在" + iMin + "～" + iMax + "之間");
            return;
        }
    }
    if (sValue.length > 0) {
        var nValue = parseFloat(sValue).toString();
        var sValueA = nValue.split(".");
        var sValueLen = sValueA.length == 2 ? sValueA[1].length : 0;
        if (sValueLen > 0) {
            var sFormatA = sFormat.split(".");
            var sFormatLen = sFormatA.length == 2 ? sFormatA[1].length : 0;
            if (sValueLen > sFormatLen) {
                ShowMsg(obj, "小數位不符");
                return;
            }
        }
    }
    var obj_valid = document.getElementById(obj.id.replace(/_tb$/g, "_err"));
    if (obj_valid != null) {
        obj_valid.innerText = "";
    }
    obj.value = numFormat(sValue, sFormat);
}
function dateFormat(sValue, sFormat) {
    var sValueArr = sValue.match(/\d+/g);
    var sValueReturn = "";
    if (sFormat.length > 0) {
        sValueReturn = sFormat;
    } else {
        sValueReturn = "YYYY/MM/DD";
    }
    sValueReturn = sValueReturn
        .replace(/(Y|y)+/g, sValueArr[0])
        .replace(/(M|m)+/g, sValueArr[1])
        .replace(/(D|d)+/g, sValueArr[2]);
    return sValueReturn;
}
function dateReFormat(sValue) {
    if (sValue.length == 0) {
        return "";
    }
    var sValueArr = sValue.match(/\d+/g);
    var sValueReturn = "";
    if (sValueArr != null) {
        switch (sValueArr.length) {
            case 3:
                sValueReturn =
                    padLeft(sValueArr[0], 4) +
                    "/" +
                    padLeft(sValueArr[1], 2) +
                    "/" +
                    padLeft(sValueArr[2], 2);
                break;
            case 2:
                var Today = new Date();
                sValueReturn =
                    Today.getFullYear() +
                    "/" +
                    padLeft(sValueArr[0], 2) +
                    "/" +
                    padLeft(sValueArr[1], 2);
                break;
            case 1:
                if (sValueArr[0].length == 8) {
                    sValueReturn =
                        sValueArr[0].substr(0, 4) +
                        "/" +
                        sValueArr[0].substr(4, 2) +
                        "/" +
                        sValueArr[0].substr(6, 2);
                }
                if (sValueArr[0].length == 4) {
                    var Today = new Date();
                    sValueReturn =
                        Today.getFullYear() +
                        "/" +
                        sValueArr[0].substr(0, 2) +
                        "/" +
                        sValueArr[0].substr(2, 2);
                }
                break;
            default:
                break;
        }
    }
    return sValueReturn;
}
function dateFocus(obj) {
    if (beforesValue.length > 0) {
        obj.value = beforesValue;
    } else {
        obj.value = dateReFormat(obj.value);
    }
}
function dateBlur(obj) {
    var sValue = obj.value;
    var bMust =
        obj.getAttribute("asMust").toLowerCase() == "true" ? true : false;
    var dMin = obj.getAttribute("asMin");
    var dMax = obj.getAttribute("asMax");
    var sErrMsg = obj.getAttribute("asErrMsg");
    var sFormat = obj.getAttribute("asFormat");
    if (sValue.length == 0 && bMust) {
        ShowMsg(obj, "輸入資料不能為空白");
        return;
    }
    if (sValue.length > 0) {
        sValue = dateReFormat(sValue);
        if (!isDate(sValue, false)) {
            ShowMsg(obj, sErrMsg);
            return;
        }
    }
    if (sValue.length > 0) {
        if (dMin != null && dMax != null) {
            if (
                sValue.replace(/\D/g, "") < dMin.replace(/\D/g, "") ||
                sValue.replace(/\D/g, "") > dMax.replace(/\D/g, "")
            ) {
                ShowMsg(
                    obj,
                    "輸入資料範圍必須在" + dMin + "～" + dMax + "之間"
                );
                return;
            }
        } else if (dMin != null) {
            if (sValue.replace(/\D/g, "") < dMin.replace(/\D/g, "")) {
                ShowMsg(obj, "輸入資料範圍必須大於" + dMin);
                return;
            }
        } else if (dMax != null) {
            if (sValue.replace(/\D/g, "") > dMax.replace(/\D/g, "")) {
                ShowMsg(obj, "輸入資料範圍必須小於" + dMax);
                return;
            }
        }
    }
    var checkBeginEnd = DateBeginEndCheck(obj.id, false);
    if (checkBeginEnd.length > 0) {
        ShowMsg(obj, checkBeginEnd);
        return;
    }
    var obj_valid = document.getElementById(obj.id.replace(/_tb$/g, "_err"));
    if (obj_valid != null) {
        obj_valid.innerText = "";
    }
    if (sValue.length > 0) obj.value = dateFormat(sValue, sFormat);
}
function datetimeBlur(obj) {
    let objid = obj.id;
    let start_date = null;
    let end_date = null;
    if (objid.indexOf("_tbBegin_ddlTime") > -1) {
        start_date = document.getElementById(
            objid.replace(/_tbBegin_ddlTime$/g, "_tbBegin_tb")
        );
        end_date = document.getElementById(
            objid.replace(/_tbBegin_ddlTime$/g, "_tbEnd_tb")
        );
    } else if (objid.indexOf("_tbEnd_ddlTime") > -1) {
        start_date = document.getElementById(
            objid.replace(/_tbEnd_ddlTime$/g, "_tbBegin_tb")
        );
        end_date = document.getElementById(
            objid.replace(/_tbEnd_ddlTime$/g, "_tbEnd_tb")
        );
    }
    if (start_date != null && end_date != null) {
        if (start_date.value.length > 0 && end_date.value.length > 0) {
            var checkBeginEnd = DateBeginEndCheck(start_date.id, true);
            if (checkBeginEnd.length > 0) {
                ShowMsg(start_date, checkBeginEnd);
                return;
            }
            var obj_valid = document.getElementById(
                start_date.id.replace(/_tb$/g, "_err")
            );
            if (obj_valid != null) {
                obj_valid.innerText = "";
            }
        }
    }
}
function rocFormat(sValue, sFormat) {
    if (sValue.length == 0) {
        return "";
    }
    var sValueArr = sValue.match(/\d+/g);
    var sValueReturn = "";
    if (sFormat.length > 0) {
        sValueReturn = sFormat;
    } else {
        sValueReturn = "YYYMMDD";
    }
    sValueReturn = sValueReturn
        .replace(/(Y|y)+/g, sValueArr[0])
        .replace(/(M|m)+/g, sValueArr[1])
        .replace(/(D|d)+/g, sValueArr[2]);
    return sValueReturn;
}
function rocReFormat(sValue) {
    if (sValue.length == 0) {
        return "";
    }
    var sValueArr = sValue.match(/\d+/g);
    var sValueReturn = "";
    if (sValueArr != null) {
        switch (sValueArr.length) {
            case 3:
                sValueReturn =
                    padLeft(sValueArr[0], 3) +
                    "/" +
                    padLeft(sValueArr[1], 2) +
                    "/" +
                    padLeft(sValueArr[2], 2);
                break;
            case 2:
                var Today = new Date();
                sValueReturn =
                    padLeft(Today.getFullYear() - 1911, 3) +
                    "/" +
                    padLeft(sValueArr[0], 2) +
                    "/" +
                    padLeft(sValueArr[1], 2);
                break;
            case 1:
                if (sValueArr[0].length == 7) {
                    sValueReturn =
                        sValueArr[0].substr(0, 3) +
                        "/" +
                        sValueArr[0].substr(2, 2) +
                        "/" +
                        sValueArr[0].substr(4, 2);
                }
                if (sValueArr[0].length == 4) {
                    var Today = new Date();
                    sValueReturn =
                        padLeft(Today.getFullYear() - 1911, 3) +
                        "/" +
                        sValueArr[0].substr(0, 2) +
                        "/" +
                        sValueArr[0].substr(2, 2);
                }
                break;
            default:
                break;
        }
    }
    return sValueReturn;
}
function rocFocus(obj) {
    if (beforesValue.length > 0) {
        obj.value = beforesValue;
    } else {
        obj.value = rocReFormat(obj.value);
    }
}
function rocBlur(obj) {
    var sValue = obj.value;
    var sChkValue = sValue;
    var bMust =
        obj.getAttribute("asMust").toLowerCase() == "true" ? true : false;
    var dMin = obj.getAttribute("asMin");
    var dMax = obj.getAttribute("asMax");
    var sErrMsg = obj.getAttribute("asErrMsg");
    var sFormat = obj.getAttribute("asFormat");
    if (sValue.length == 0 && bMust) {
        ShowMsg(obj, "輸入資料不能為空白");
        return;
    }
    if (sValue.length > 0) {
        sValue = rocReFormat(sValue);
        if (!isDate(sValue, true)) {
            ShowMsg(obj, sErrMsg);
            return;
        } else {
            if (dMin != null) {
                dMin =
                    (Number(dMin.substring(0, 4)) - 1911).toString() +
                    dMin.substring(4);
                dMin = rocReFormat(dMin);
            }
            if (dMax != null) {
                dMax =
                    (Number(dMax.substring(0, 4)) - 1911).toString() +
                    dMax.substring(4);
                dMax = rocReFormat(dMax);
            }
        }
    }
    if (sValue.length > 0) {
        if (dMin != null && dMax != null) {
            if (
                parseInt(sValue.replace(/\D/g, "")) <
                    parseInt(dMin.replace(/\D/g, "")) ||
                parseInt(sValue.replace(/\D/g, "")) >
                    parseInt(dMax.replace(/\D/g, ""))
            ) {
                ShowMsg(
                    obj,
                    "輸入資料範圍必須在" + dMin + "～" + dMax + "之間"
                );
                return;
            }
        } else if (dMin != null) {
            if (sValue.replace(/\D/g, "") < dMin.replace(/\D/g, "")) {
                ShowMsg(obj, "輸入資料範圍必須大於" + dMin);
                return;
            }
        } else if (dMax != null) {
            if (sValue.replace(/\D/g, "") > dMax.replace(/\D/g, "")) {
                ShowMsg(obj, "輸入資料範圍必須小於" + dMax);
                return;
            }
        }
    }
    var checkBeginEnd = DateBeginEndCheck(obj.id, true);
    if (checkBeginEnd.length > 0) {
        ShowMsg(obj, checkBeginEnd);
        return;
    }
    var obj_valid = document.getElementById(obj.id.replace(/_tb$/g, "_err"));
    if (obj_valid != null) {
        obj_valid.innerText = "";
    }
    if (sValue.length > 0) obj.value = rocFormat(sChkValue, sFormat);
}
function roctimeBlur(obj) {
    let objid = obj.id;
    let start_date = null;
    let end_date = null;
    if (objid.indexOf("_tbBegin_ddlTime") > -1) {
        start_date = document.getElementById(
            objid.replace(/_tbBegin_ddlTime$/g, "_tbBegin_tb")
        );
        end_date = document.getElementById(
            objid.replace(/_tbBegin_ddlTime$/g, "_tbEnd_tb")
        );
    } else if (objid.indexOf("_tbEnd_ddlTime") > -1) {
        start_date = document.getElementById(
            objid.replace(/_tbEnd_ddlTime$/g, "_tbBegin_tb")
        );
        end_date = document.getElementById(
            objid.replace(/_tbEnd_ddlTime$/g, "_tbEnd_tb")
        );
    }
    if (start_date != null && end_date != null) {
        if (start_date.value.length > 0 && end_date.value.length > 0) {
            var checkBeginEnd = DateBeginEndCheck(start_date.id, true);
            if (checkBeginEnd.length > 0) {
                ShowMsg(start_date, checkBeginEnd);
                return;
            }
            var obj_valid = document.getElementById(
                start_date.id.replace(/_tb$/g, "_err")
            );
            if (obj_valid != null) {
                obj_valid.innerText = "";
            }
        }
    }
}
function tbFocus(obj) {
    var obj_valid = document.getElementById(obj.id.replace(/_tb$/g, "_err"));
    if (obj_valid != null) {
        obj_valid.innerText = "";
    }
}
function tbBlur(obj) {
    var sValue = obj.value;
    var bMust =
        obj.getAttribute("asMust").toLowerCase() == "true" ? true : false;
    var iMin = obj.getAttribute("asMin");
    var iMax = obj.getAttribute("asMax");
    var sErrMsg = obj.getAttribute("asErrMsg");
    var bReadOnly = obj.getAttribute("ReadOnly") == "ReadOnly" ? true : false;
    if (bReadOnly) {
        return;
    }
    if (sValue.length == 0 && bMust) {
        ShowMsg(obj, "輸入資料不能為空白");
        return;
    }
    if (iMin != 0 && sValue.length < iMin) {
        ShowMsg(obj, "輸入資料最小長度為" + iMin);
        return;
    }
    if (iMax != 0 && sValue.length > iMax) {
        ShowMsg(obj, "輸入資料最大長度為" + iMax);
        return;
    }
    if (obj.getAttribute("asregex")) {
        var sRmsg = RegexBlur(obj);
        if (sRmsg.length > 0) {
            ShowMsg(obj, sRmsg);
            return;
        }
    }
    var obj_valid = document.getElementById(obj.id.replace(/_tb$/g, "_err"));
    if (obj_valid != null) {
        obj_valid.innerText = "";
    }
}
function changeCheck() {
    if (!asCheckSession()) {
        alert("您尚未登入或已逾登入有效時限!\n請重新登入...");
        ReloginWindow();
        return false;
    }
    return true;
}
function ddlchange(obj) {
    if (!changeCheck()) {
        return false;
    }
    var sValue = obj.value;
    var bMust =
        obj.getAttribute("asMust").toLowerCase() == "true" ? true : false;
    var sErrMsg = obj.getAttribute("asErrMsg");
    var bReadOnly = obj.getAttribute("ReadOnly") == "ReadOnly" ? true : false;
    if (bReadOnly) {
        return;
    }
    if (sValue.length == 0 && bMust) {
        ShowMsg(obj, "輸入資料不能為空白");
        return;
    }
    var obj_valid = document.getElementById(
        obj.id.replace(/_ddl$/g, "_labErr")
    );
    if (obj_valid != null) {
        obj_valid.innerText = "";
    }
}
function RegexBlur(obj) {
    var sValue = obj.value;
    var sRegex = obj.getAttribute("asregex");
    var sRegexmsg = obj.getAttribute("asregexmsg");
    if (sRegex && sValue.length > 0) {
        var rules = new RegExp(sRegex);
        var tmpRegex = rules.test(sValue);
        if (!tmpRegex) {
            if (!sRegexmsg) {
                sRegexmsg = "輸入格式不符";
            }
            return sRegexmsg;
        }
    }
    return "";
}
function idnoBlur(obj) {
    var sValue = obj.value;
    var bMust =
        obj.getAttribute("asMust").toLowerCase() == "true" ? true : false;
    var iMin = obj.getAttribute("asMin");
    var iMax = obj.getAttribute("asMax");
    var sErrMsg = obj.getAttribute("asErrMsg");
    var sIdType = obj.getAttribute("asIdType");
    if (sValue.length == 0 && bMust) {
        ShowMsg(obj, "輸入資料不能為空白");
        return;
    }
    var IdTypeI = false;
    var IdTypeP = false;
    var IdTypeR = false;
    if (sIdType.indexOf("I") > -1) IdTypeI = check_id(sValue, "I");
    if (sIdType.indexOf("P") > -1) IdTypeP = check_id(sValue, "P");
    if (sIdType.indexOf("R") > -1) IdTypeR = check_id(sValue, "R");
    if (sValue.length > 0 && !IdTypeI && !IdTypeP && !IdTypeR) {
        ShowMsg(obj, sErrMsg);
        return;
    }
    var obj_valid = document.getElementById(obj.id.replace(/_tb$/g, "_err"));
    if (obj_valid != null) {
        obj_valid.innerText = "";
    }
}
function emailBlur(obj) {
    var sValue = obj.value;
    var bMust =
        obj.getAttribute("asMust").toLowerCase() == "true" ? true : false;
    var iMin = obj.getAttribute("asMin");
    var iMax = obj.getAttribute("asMax");
    var sErrMsg = obj.getAttribute("asErrMsg");
    if (sValue.length == 0 && bMust) {
        ShowMsg(obj, "輸入資料不能為空白");
        return;
    }
    if (iMax != 0 && sValue.length > iMax) {
        ShowMsg(obj, "最大長度為" + iMax.toString() + "字");
        return;
    }
    if (
        sValue.length > 0 &&
        !/\w+([-+.´]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(sValue)
    ) {
        ShowMsg(obj, sErrMsg);
        return;
    }
    var obj_valid = document.getElementById(obj.id.replace(/_tb$/g, "_err"));
    if (obj_valid != null) {
        obj_valid.innerText = "";
    }
}
function phoneBlur(obj) {
    var sValue = obj.value;
    var bMust =
        obj.getAttribute("asMust").toLowerCase() == "true" ? true : false;
    var iMin = obj.getAttribute("asMin");
    var iMax = obj.getAttribute("asMax");
    var sErrMsg = obj.getAttribute("asErrMsg");
    var sPhoneType = obj.getAttribute("asPhoneType");
    if (sValue.length == 0 && bMust) {
        ShowMsg(obj, "輸入資料不能為空白");
        return;
    }
    if (iMax != 0 && sValue.length > iMax) {
        ShowMsg(obj, "最大長度為" + iMax.toString() + "字");
        return;
    }
    var bcheckphone = false;
    if (
        sPhoneType.indexOf("M") > -1 &&
        sValue.length > 0 &&
        /^09\d{2}[- ]?(\d{6}|\d{3}-\d{3})$/.test(sValue)
    ) {
        bcheckphone = true;
    }
    if (
        sPhoneType.indexOf("H") > -1 &&
        sValue.length > 0 &&
        /^(\d{2,3}-?|\(\d{2,3}\))\d{3,4}-?\d{4}$/.test(sValue)
    ) {
        bcheckphone = true;
    }
    if (!bcheckphone && sValue.length > 0) {
        ShowMsg(obj, sErrMsg);
        return;
    }
    var obj_valid = document.getElementById(obj.id.replace(/_tb$/g, "_err"));
    if (obj_valid != null) {
        obj_valid.innerText = "";
    }
}
function numFomat(sValue, sFormat) {
    if (sFormat.length == 0) {
        return sValue;
    }
    var sValueReturn = "";
    var sFormatArr = sFormat.split(".");
    if (sFormatArr.length > 2) {
        return sValue;
    }
    if (sFormatArr.length == 1) {
        sValue = Math.round(sValue);
        var sFormatChar = sFormatArr[0].split("");
        var sValueChar = sValue.toString().split("");
        var sFormatMaxLeftNum = sFormatChar.length - 1;
        for (var m = 0; m < sFormatChar.length; m++) {
            if (sFormatChar[m] == "#" || /\d/.test(sFormatChar[m])) {
                sFormatMaxLeftNum = m;
                break;
            }
        }
        var j = sFormatChar.length - 1;
        var i = sValueChar.length - 1;
        while (i >= 0 || j >= 0) {
            if (i >= 0 && sValueChar[i] == "-") {
                sValueReturn = sValueChar[i] + sValueReturn;
                i--;
            }
            if (i >= 0 && j >= 0) {
                if (sFormatChar[j] == "#" || /\d/.test(sFormatChar[j])) {
                    sValueReturn = sValueChar[i] + sValueReturn;
                    i--;
                    j--;
                } else if (j < sFormatMaxLeftNum) {
                    sValueReturn = sValueChar[i] + sValueReturn;
                    i--;
                } else {
                    sValueReturn = sFormatChar[j] + sValueReturn;
                    j--;
                }
                continue;
            }
            if (i >= 0 && j < 0) {
                sValueReturn = sValueChar[i] + sValueReturn;
                i--;
                continue;
            }
            if (i < 0 && j >= 0) {
                if (sFormatChar[j] != "#" && sFormatChar[j] != ",") {
                    sValueReturn = sFormatChar[j] + sValueReturn;
                }
                j--;
                continue;
            }
        }
        return sValueReturn;
    }
    if (sFormatArr.length == 2) {
        var sFormatChar_Right = sFormatArr[1].split("");
        var sFormatMaxRightNum = 0;
        for (var m = sFormatChar_Right.length - 1; m >= 0; m--) {
            if (
                sFormatChar_Right[m] == "#" ||
                /\d/.test(sFormatChar_Right[m])
            ) {
                sFormatMaxRightNum = m;
                var size = Math.pow(10, m + 1);
                sValue = Math.round(sValue * size) / size;
                break;
            }
        }
        var sValueArr = (
            sValue.toString().indexOf(".") < 0
                ? sValue.toString() + "."
                : sValue.toString()
        ).split(".");
        var sValueChar_Right = sValueArr[1].split("");
        var i = 0;
        var j = 0;
        while (i < sValueChar_Right.length || j < sFormatChar_Right.length) {
            if (i < sValueChar_Right.length && j < sFormatChar_Right.length) {
                if (
                    sFormatChar_Right[j] == "#" ||
                    /\d/.test(sFormatChar_Right[j])
                ) {
                    sValueReturn = sValueReturn + sValueChar_Right[i];
                    i++;
                    j++;
                } else if (j > sFormatMaxRightNum) {
                    sValueReturn = sValueReturn + sValueChar_Right[i];
                    i++;
                } else {
                    sValueReturn = sValueReturn + sFormatChar_Right[j];
                    j++;
                }
                continue;
            }
            if (i < sValueChar_Right.length && j >= sFormatChar_Right.length) {
                sValueReturn = sValueReturn + sValueChar_Right[i];
                i++;
                continue;
            }
            if (i >= sValueChar_Right.length && j < sFormatChar_Right.length) {
                if (
                    sFormatChar_Right[j] != "#" &&
                    sFormatChar_Right[j] != ","
                ) {
                    sValueReturn = sValueReturn + sFormatChar_Right[j];
                }
                j++;
                continue;
            }
        }
        if (sValueReturn.length > 0) {
            sValueReturn = "." + sValueReturn;
        }
        var sFormatChar_Left = sFormatArr[0].split("");
        var sValueChar_Left = sValueArr[0].split("");
        var sFormatMaxLeftNum = sFormatChar_Left.length - 1;
        for (var m = 0; m < sFormatChar_Left.length; m++) {
            if (sFormatChar_Left[m] == "#" || /\d/.test(sFormatChar_Left[m])) {
                sFormatMaxLeftNum = m;
                break;
            }
        }
        var j = sFormatChar_Left.length - 1;
        var i = sValueChar_Left.length - 1;
        while (i >= 0 || j >= 0) {
            if (i >= 0 && sValueChar_Left[i] == "-") {
                sValueReturn = sValueChar_Left[i] + sValueReturn;
                i--;
            }
            if (i >= 0 && j >= 0) {
                if (
                    sFormatChar_Left[j] == "#" ||
                    /\d/.test(sFormatChar_Left[j])
                ) {
                    sValueReturn = sValueChar_Left[i] + sValueReturn;
                    i--;
                    j--;
                } else if (j < sFormatMaxLeftNum) {
                    sValueReturn = sValueChar_Left[i] + sValueReturn;
                    i--;
                } else {
                    sValueReturn = sFormatChar_Left[j] + sValueReturn;
                    j--;
                }
                continue;
            }
            if (i >= 0 && j < 0) {
                sValueReturn = sValueChar_Left[i] + sValueReturn;
                i--;
                continue;
            }
            if (i < 0 && j >= 0) {
                if (sFormatChar_Left[j] != "#" && sFormatChar_Left[j] != ",") {
                    sValueReturn = sFormatChar_Left[j] + sValueReturn;
                }
                j--;
                continue;
            }
        }
        return sValueReturn;
    }
}
function numReFomat(sValue) {
    if (sValue.length == 0) {
        return "";
    }
    var sValueArr = sValue.split(".");
    var Minus = sValue.indexOf("-") >= 0 ? "-" : "";
    var sValueReturn = "";
    switch (sValueArr.length) {
        case 2:
            sValueReturn =
                sValueArr[0].length == 0
                    ? "0"
                    : "" + "." + sValueArr[1].replace(/\D/g, "");
        case 1:
            sValueReturn =
                Minus + sValueArr[0].replace(/\D/g, "") + sValueReturn;
            break;
        default:
            return "";
    }
    return parseFloat(sValueReturn);
}
function numFocus(obj) {
    if (beforesValue.length > 0) {
        obj.value = beforesValue;
    } else {
        obj.value = numReFomat(obj.value);
    }
}
function hourless(objid, hourid) {
    var hourobj = document.getElementById(hourid);
    var obj = document.getElementById(objid);
    var iMin = obj.getAttribute("asHMin");
    var iMax = obj.getAttribute("asHMax");
    var ihour = hourobj.innerText;
    if (parseInt(ihour) - 1 >= iMin) {
        hourobj.innerText = parseInt(ihour) - 1;
    }
}
function hourplus(objid, hourid) {
    var hourobj = document.getElementById(hourid);
    var obj = document.getElementById(objid);
    var iMin = obj.getAttribute("asHMin");
    var iMax = obj.getAttribute("asHMax");
    var ihour = hourobj.innerText;
    if (parseInt(ihour) + 1 <= iMax) {
        hourobj.innerText = parseInt(ihour) + 1;
    }
}
function minutesless(objid, minutesid, minutesrange) {
    var minutesobj = document.getElementById(minutesid);
    var obj = document.getElementById(objid);
    var iMin = obj.getAttribute("asMMin");
    var iMax = obj.getAttribute("asMMax");
    var iminutes = minutesobj.innerText;
    if (parseInt(iminutes) - 1 >= iMin) {
        minutesobj.innerText = parseInt(iminutes) - parseInt(minutesrange);
    }
}
function minutesplus(objid, minutesid, minutesrange) {
    var minutesobj = document.getElementById(minutesid);
    var obj = document.getElementById(objid);
    var iMin = obj.getAttribute("asMMin");
    var iMax = obj.getAttribute("asMMax");
    var iminutes = minutesobj.innerText;
    if (parseInt(iminutes) + 1 <= iMax) {
        minutesobj.innerText = parseInt(iminutes) + parseInt(minutesrange);
    }
}
function Keylimit(e, type) {
    var code = "which" in e ? e.which : e.keyCode;
    if (code == 13) {
        return false;
    } else {
        return true;
    }
}
function CountNChar(objid) {
    var tbobj = document.getElementById(objid + "_tb");
    var objMsg = document.getElementById(objid + "_showlen");
    var intMax = tbobj.getAttribute("asMax");
    var asLenMsg = tbobj.getAttribute("asLenMsg");
    var intChars = GetRealLength(tbobj, "U");
    var MsgStr = asLenMsg
        .replace("[Max]", intMax.toString())
        .replace("[Now]", intChars.toString());
    if (intChars > intMax) {
        MsgStr = "<font color='red'>" + MsgStr + "</font>";
    }
    if (objMsg) {
        objMsg.innerHTML = MsgStr;
    }
}
function CountChar(objid) {
    var tbobj = document.getElementById(objid + "_tb");
    var objMsg = document.getElementById(objid + "_showlen");
    var intMax = tbobj.getAttribute("asMax");
    var asLenMsg = tbobj.getAttribute("asLenMsg");
    var intChars = GetRealLength(tbobj, "B");
    var MsgStr = asLenMsg
        .replace("[Max]", intMax.toString())
        .replace("[Now]", intChars.toString());
    if (intChars > intMax) {
        MsgStr = "<font color='red'>" + MsgStr + "</font>";
    }
    if (objMsg) {
        objMsg.innerHTML = MsgStr;
    }
}
function GetRealLength(obj, sType) {
    var objvalue = obj.value.replace("\r\n", "\n");
    if (objvalue == null || typeof objvalue == "undefined") return 0;
    var intChars = parseInt(objvalue.length);
    if (sType.toUpperCase() == "U") return intChars;
    var TChar = 0;
    for (var i = 0; i < intChars; i++) {
        if (obj.value.charCodeAt(i) > 255) TChar = TChar + 2;
        else TChar++;
    }
    return TChar;
}
function ShowCheckMsg(objid) {
    var tbobj = document.getElementById(objid + "_tb");
    var objMsg = document.getElementById(objid + "_showlen");
    var intMax = tbobj.getAttribute("asMax");
    var asLenMsg = tbobj.getAttribute("asLenMsg");
    var sType = tbobj.getAttribute("asShowLen");
    var intChars = GetRealLength(tbobj, sType);
    if (intChars > intMax) {
        var defMsg = asLenMsg
            .replace("[Max]", intMax.toString())
            .replace("[Now]", intChars.toString());
        window.alert(defMsg);
    }
}
function DateBeginEndCheck(objid, isRocDate) {
    var begin_date;
    var end_date;
    var input_obj;
    if (objid.indexOf("_tbBegin_tb") > -1) {
        begin_date = document.getElementById(objid);
        end_date = document.getElementById(
            objid.replace(/_tbBegin_tb$/g, "_tbEnd_tb")
        );
        input_obj = "B";
    } else if (objid.indexOf("_tbEnd_tb") > -1) {
        end_date = document.getElementById(objid);
        begin_date = document.getElementById(
            objid.replace(/_tbEnd_tb$/g, "_tbBegin_tb")
        );
        input_obj = "E";
    }
    if (
        begin_date != null &&
        typeof begin_date != "undefined" &&
        end_date != null &&
        typeof end_date != "undefined"
    ) {
        var begin_date_err = document.getElementById(
            begin_date.id.replace(/_tb$/g, "_err")
        );
        var end_date_err = document.getElementById(
            end_date.id.replace(/_tb$/g, "_err")
        );
        if (input_obj == "B") {
            begin_date_err.innerText = "";
            if (begin_date.value.length == 0 && end_date.value.length > 0) {
                return "起訖日期必須都有值";
            }
        } else if (input_obj == "E") {
            end_date_err.innerText = "";
            if (begin_date.value.length > 0 && end_date.value.length == 0) {
                return "起訖日期必須都有值";
            }
        }
        if (begin_date.value.length > 0 && end_date.value.length > 0) {
            if (
                begin_date_err != null &&
                typeof begin_date_err != "undefined" &&
                end_date_err != null &&
                typeof end_date_err != "undefined"
            ) {
                if (beforeMsg == "起始日期要在結束日期之前") {
                    beforeMsg = "";
                }
                begin_date_err.innerText = begin_date_err.innerText.replace(
                    "起始日期要在結束日期之前",
                    ""
                );
                end_date_err.innerText = end_date_err.innerText.replace(
                    "起始日期要在結束日期之前",
                    ""
                );
                var startDate = begin_date.value;
                var endDate = end_date.value;
                if (isRocDate) {
                    startDate =
                        (Number(startDate.substring(0, 3)) + 1911).toString() +
                        startDate.substring(3);
                    endDate =
                        (Number(endDate.substring(0, 3)) + 1911).toString() +
                        endDate.substring(3);
                }
                startDate = startDate.replace(/-/g, "/");
                endDate = endDate.replace(/-/g, "/");
                let start_hr = null;
                let end_hr = null;
                if (objid.indexOf("_tbBegin_tb") > -1) {
                    start_hr = document.getElementById(
                        objid.replace(/_tbBegin_tb$/g, "_tbBegin_ddlTime")
                    );
                    end_hr = document.getElementById(
                        objid.replace(/_tbBegin_tb$/g, "_tbEnd_ddlTime")
                    );
                } else if (objid.indexOf("_tbEnd_tb") > -1) {
                    start_hr = document.getElementById(
                        objid.replace(/_tbEnd_tb$/g, "_tbBegin_ddlTime")
                    );
                    end_hr = document.getElementById(
                        objid.replace(/_tbEnd_tb$/g, "_tbEnd_ddlTime")
                    );
                }
                if (start_hr != null && end_hr != null) {
                    if (
                        start_hr[start_hr.selectedIndex] != null &&
                        end_hr[end_hr.selectedIndex] != null
                    ) {
                        startDate +=
                            " " +
                            start_hr[start_hr.selectedIndex].value +
                            ":00";
                        endDate +=
                            " " + end_hr[end_hr.selectedIndex].value + ":00";
                    }
                }
                if (Date.parse(startDate) - Date.parse(endDate) > 0) {
                    return "起始日期要在結束日期之前";
                }
            }
        }
        if (begin_date.value.length == 0 && end_date.value.length == 0) {
            begin_date_err.innerText = "";
            end_date_err.innerText = "";
        }
    }
    return "";
}
function pswdBlur(obj) {
    var sValue = obj.value;
    var bMust =
        obj.getAttribute("asMust").toLowerCase() == "true" ? true : false;
    var iMin = obj.getAttribute("asMin");
    var iMax = obj.getAttribute("asMax");
    var sErrMsg = obj.getAttribute("asErrMsg");
    var bReadOnly = obj.getAttribute("ReadOnly") == "ReadOnly" ? true : false;
    if (bReadOnly) {
        return;
    }
    if (sValue.length == 0 && bMust) {
        ShowMsg(obj, "密碼複雜度不符合要求");
        return;
    }
    if (iMin != 0 && sValue.length < iMin) {
        ShowMsg(obj, "密碼複雜度不符合要求最小長度為" + iMin);
        return;
    }
    if (iMax != 0 && sValue.length > iMax) {
        ShowMsg(obj, "超過資料長度" + iMax);
        return;
    }
    var ruleType = obj.getAttribute("asrulttype").split("");
    for (var jrt = 0; jrt < ruleType.length; jrt++) {
        var sRegex;
        switch (ruleType[jrt]) {
            case "E":
                sRegex = /[a-zA-Z]/;
                break;
            case "U":
                sRegex = /[A-Z]/;
                break;
            case "L":
                sRegex = /[a-z]/;
                break;
            case "D":
                sRegex = /[0-9]/;
                break;
            case "N":
                sRegex = /[\W_]/;
                break;
            default:
                break;
        }
        if (sRegex != null) {
            var re = new RegExp(sRegex);
            var found = sValue.match(re);
            if (found == null) {
                ShowMsg(obj, "密碼複雜度不符合要求");
                return;
            }
        }
    }
    var obj_valid = document.getElementById(obj.id.replace(/_tb$/g, "_err"));
    if (obj_valid != null) {
        obj_valid.innerText = "";
    }
}
function pswdShowCom(obj) {
    var pswdscore = 0;
    var sValue = obj.value;
    var wobj = document.getElementById(obj.id.replace("_tb", "_weak"));
    var mobj = document.getElementById(obj.id.replace("_tb", "_medium"));
    var sobj = document.getElementById(obj.id.replace("_tb", "_strong"));
    var pswdscore = pswcomplexity(sValue);
    if (pswdscore > 0) {
        if (pswdscore == 1) {
            if (!wobj.classList.contains("active"))
                wobj.classList.add("active");
            if (mobj.classList.contains("active"))
                mobj.classList.remove("active");
            if (sobj.classList.contains("active"))
                sobj.classList.remove("active");
        } else if (pswdscore < 4) {
            if (!wobj.classList.contains("active"))
                wobj.classList.add("active");
            if (!mobj.classList.contains("active"))
                mobj.classList.add("active");
            if (sobj.classList.contains("active"))
                sobj.classList.remove("active");
        } else {
            if (!wobj.classList.contains("active"))
                wobj.classList.add("active");
            if (!mobj.classList.contains("active"))
                mobj.classList.add("active");
            if (!sobj.classList.contains("active"))
                sobj.classList.add("active");
        }
    } else {
        if (wobj.classList.contains("active")) wobj.classList.remove("active");
        if (mobj.classList.contains("active")) mobj.classList.remove("active");
        if (sobj.classList.contains("active")) sobj.classList.remove("active");
    }
}
function pswcomplexity(pvalue) {
    var score = 0,
        length = pvalue.length,
        upperCase,
        lowerCase,
        digits,
        nonAlpha;
    if (length < 5) score += 0;
    else if (length < 8) score += 5;
    else if (length < 16) score += 10;
    else score += 15;
    lowerCase = pvalue.match(/[a-z]/g);
    if (lowerCase) score += 1;
    upperCase = pvalue.match(/[A-Z]/g);
    if (upperCase) score += 5;
    if (upperCase && lowerCase) score += 2;
    digits = pvalue.match(/\d/g);
    if (digits) {
        score += 5;
    }
    nonAlpha = pvalue.match(/[\W_]/g);
    if (nonAlpha) {
        score += nonAlpha.length > 1 ? 15 : 10;
    }
    if (upperCase && lowerCase && digits && nonAlpha) score += 15;
    if (score < 15) return 0;
    if (score < 20) return 1;
    if (score < 35) return 2;
    if (score < 50) return 3;
    return 4;
}
