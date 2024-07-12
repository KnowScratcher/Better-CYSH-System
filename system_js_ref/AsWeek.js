var bWeekShow = false;
window.onload = function (e) {
    WeekInit();
};
function BeWeekVisible() {
    bWeekShow = true;
}
function BeWeekHideen() {
    bWeekShow = false;
}
function WeekInit() {
    if (document.getElementById("asWeek") != null) return;
    var divWidth = 350;
    var divHeight = 322;
    var newDiv = document.createElement("div");
    newDiv.id = "asWeek";
    newDiv.className = "Calendar";
    newDiv.style.width = divWidth + "px";
    newDiv.style.left = "10px";
    newDiv.style.top = "10px";
    newDiv.style.display = "none";
    newDiv.onmouseover = BeWeekVisible;
    newDiv.onmouseout = BeWeekHideen;
    document.body.appendChild(newDiv);
}
function WeekHidden() {
    var getDiv = document.getElementById("asWeek");
    if (getDiv && !bWeekShow) {
        getDiv.style.display = "none";
    }
}
function WeekShow(obj, str_value, asweek, assession) {
    WeekInit();
    var getDiv = document.getElementById("asWeek");
    var obj = document.getElementById(obj);
    var close = creatWeekCloseBtn();
    obj.style.color = "";
    getDiv.innerHTML = as_Week(obj, str_value, asweek, assession);
    getDiv.style.display = "block";
    getDiv.style.position = "absolute";
    getDiv.appendChild(close);
    getDiv.style.zIndex = "10000";
    pageWidth = document.body.clientWidth;
    pageHeight = document.body.clientHeight;
    setWidth = obj.offsetLeft;
    setHeight = obj.offsetTop + obj.offsetHeight;
    var objParent = obj.offsetParent;
    while (objParent != null) {
        setWidth += objParent.offsetLeft;
        setHeight += objParent.offsetTop;
        objParent = objParent.offsetParent;
    }
    if (setWidth + divWidth > pageWidth) {
        setWidth = pageWidth - divWidth;
    }
    if (setHeight + divHeight > pageHeight && setHeight - divHeight >= 0) {
        setHeight = obj.offsetTop - divHeight;
    }
    getDiv.style.left = setWidth + "px";
    getDiv.style.top = setHeight + "px";
    obj.select();
}
function setWeek(obj, sDateID) {
    var sDate = "";
    if (sDateID != "") {
        Dateobj = document.getElementById(sDateID);
        if (Dateobj != null) {
            sDate = Dateobj.value;
        }
    }
    obj = document.getElementById(obj);
    obj.style.color = "";
    obj.value = sDate;
    bWeekShow = false;
    WeekHidden();
}
function setWeekClose() {
    bWeekShow = false;
    WeekHidden();
}
function creatWeekCloseBtn() {
    var close = document.createElement("div");
    close.id = "Weekclose";
    close.className = "sesClose";
    close.onclick = setWeekClose;
    return close;
}
function ValidWeek(obj) {
    var getDiv = document.getElementById("asWeek");
    if (getDiv) {
    }
}
function Validate_Week(obj, regex) {
    if (obj.value.length == 0) {
        return;
    }
    var obj_valid = document.getElementById(obj.id.replace("_tb", "_err"));
    if (obj_valid.id == obj.id) {
        obj_valid = null;
    }
    if (obj_valid != null) {
        obj_valid.style.display = "none";
    }
    if (obj.value.match(regex) == null) {
        if (obj_valid != null) {
            obj_valid.style.display = "table-footer-group";
        }
        if (bWeekShow) {
            return;
        }
        setTimeout(function () {
            obj.select();
        }, 0);
    }
}
function as_Week(target_obj, str_value, iweek, isession) {
    if (target_obj == null) {
        target_obj = document.getElementById(target_obj);
    }
    var aryvalue;
    if (str_value.length != 0) {
        aryvalue = str_value.toString().split("、");
    }
    var arr_weeks = ["一", "二", "三", "四", "五", "六", "日"];
    var n_weekstart = 1;
    var dNow = new Date();
    var str_buffer = new String(
        '<table  width="348px" align="center">\n' +
            "<tr>\n" +
            '<td colspan="' +
            (iweek + 1).toString() +
            '" class="dataclear"><font ><a href="javascript: return false;" onclick="setWeek(\'' +
            target_obj.id +
            "', ''); return false;\">清除節次</a></font></td>\n" +
            "</tr>\n" +
            "<tr>\n" +
            '<td colspan="' +
            (iweek + 1).toString() +
            '"  style="text-align: center;" ><label id="asweek_show" >'
    );
    if (str_value.length != 0) {
        str_buffer += str_value;
    } else {
        str_buffer += "請挑選節次";
    }
    str_buffer +=
        "</label></td>\n" +
        "</tr>\n" +
        "<tr>\n" +
        '<td colspan="' +
        (iweek + 1).toString() +
        '"  style="text-align: center;" ><font ><a href="javascript: return false;" onclick="setWeek(\'' +
        target_obj.id +
        "','asweek_set');\">確認</a></font></td>\n" +
        "</tr>\n" +
        "<tr>\n" +
        '<td colspan="' +
        (iweek + 1).toString() +
        '" ><input id="asweek_set" type="hidden" ';
    if (str_value.length != 0) {
        str_buffer += 'value="' + str_value + '"';
    }
    str_buffer + " ></td>\n" + "</tr>\n" + "<tr>\n";
    str_buffer +=
        '<table border="0" align="center" width="100%" height="70%">\n' +
        "<tr>\n" +
        "<td>節次</td>\n" +
        "<td>一</td>\n" +
        "<td >二</td>\n" +
        "<td>三</td>\n" +
        "<td>四</td>\n" +
        "<td >五</td>\n";
    if (iweek > 5) {
        str_buffer += '<td ><font color="#0000CC">六</font></td>\n';
    }
    if (iweek > 6) {
        str_buffer += '<td ><font color="#FF0000">日</font></td>\n';
    }
    str_buffer += "</tr>";
    for (var n_session = 1; n_session <= isession; n_session++) {
        str_buffer += "<tr>\n";
        str_buffer +=
            '\t<td bgcolor="white" align="right"><font color="black" face="tahoma, verdana" size="2">' +
            n_session.toString() +
            "</font></a></td>\n";
        for (var n_week = 0; n_week < iweek; n_week++) {
            str_buffer += '\t<td bgcolor="white" align="right">';
            str_buffer +=
                '<a href="javascript: return false;" onclick="setSession(this,\'' +
                n_week.toString() +
                "', '" +
                n_session.toString() +
                "');\">" +
                '<font color="black" face="tahoma, verdana" size="2">';
            str_buffer +=
                '<label class="weekcontainer"><input id="asweek' +
                n_week.toString() +
                n_session.toString() +
                '"';
            if (aryvalue != null) {
                for (var n_value = 0; n_value < aryvalue.length; n_value++) {
                    var cweek = aryvalue[n_value].substring(0, 1);
                    if (arr_weeks[n_week] == cweek) {
                        if (
                            aryvalue[n_value]
                                .substring(1)
                                .indexOf(n_session.toString()) != -1
                        ) {
                            str_buffer += " checked ";
                        }
                    }
                }
            }
            str_buffer +=
                ' type="checkbox" ><span class="checkmark"></label></font></a></td>\n';
        }
        str_buffer += "</tr>\n";
    }
    str_buffer += "</table>\n";
    str_buffer += "</tr>\n" + "</table>\n";
    return str_buffer;
}
function setSession(objid, asweek, assession) {
    checkweekSel();
}
function checkweekSel() {
    var arr_weeks = ["一", "二", "三", "四", "五", "六", "日"];
    var sSel = "";
    var sweekSel = "";
    for (var n_week = 0; n_week < 7; n_week++) {
        sweekSel = "";
        for (var n_session = 1; n_session <= 8; n_session++) {
            var chkObj = document.getElementById(
                "asweek" + n_week.toString() + n_session.toString()
            );
            if (chkObj != null) {
                if (chkObj.checked) {
                    sweekSel = sweekSel + n_session.toString();
                } else {
                }
            }
        }
        if (sweekSel.length != 0) {
            if (sSel.length != 0) sSel = sSel + "、";
            sSel = sSel + arr_weeks[n_week] + "．" + sweekSel;
        }
    }
    if (sSel.length != 0) {
        document.getElementById("asweek_show").innerHTML = sSel;
    } else {
        document.getElementById("asweek_show").innerText = "請挑選節次";
    }
    document.getElementById("asweek_set").value = sSel;
}
