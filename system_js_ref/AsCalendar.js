var divWidth = 350;
var divHeight = 322;
var bCalendarShow = false;
window.onload = function (e) {
    CalendarInit();
};
function BeVisible() {
    bCalendarShow = true;
}
function BeHideen() {
    bCalendarShow = false;
}
function CalendarInit() {
    if (document.getElementById("asCalendar") != null) return;
    var objwindow = document.createElement("div");
    objwindow.id = "asCalendar_bg";
    objwindow.style.zIndex = "9999";
    objwindow.style.width = "100%";
    objwindow.style.height = "100vh";
    objwindow.style.position = "fixed";
    objwindow.style.backgroundColor = "hsla(0, 0%, 0%, 0.6)";
    objwindow.style.top = "0px";
    objwindow.style.left = "0px";
    objwindow.style.display = "";
    var newDiv = document.createElement("div");
    newDiv.id = "asCalendar";
    newDiv.className = "Calendar";
    newDiv.style.width = divWidth + "px";
    newDiv.style.left = "10px";
    newDiv.style.top = "10px";
    newDiv.style.display = "none";
    newDiv.onmouseover = BeVisible;
    newDiv.onmouseout = BeHideen;
    document.body.appendChild(objwindow);
    document.body.appendChild(newDiv);
}
function CalendarHidden() {
    var getDiv = document.getElementById("asCalendar");
    if (getDiv && !bCalendarShow) {
        getDiv.style.display = "none";
        var getbgDiv = document.getElementById("asCalendar_bg");
        if (getbgDiv) {
            getbgDiv.style.display = "none";
        }
    }
}
function CalendarShow(obj, str_date) {
    CalendarInit();
    var getDiv = document.getElementById("asCalendar");
    var obj = document.getElementById(obj);
    var close = creatCalendarCloseBtn();
    obj.style.color = "";
    getDiv.innerHTML = as_Calendar(obj, str_date);
    getDiv.style.display = "block";
    getDiv.style.position = "fixed";
    getDiv.appendChild(close);
    getDiv.style.zIndex = "10000";
    var getbgDiv = document.getElementById("asCalendar_bg");
    getbgDiv.style.zIndex = "9999";
    getbgDiv.style.position = "fixed";
    getbgDiv.style.display = "";
    pageWidth = document.body.clientWidth;
    pageHeight =
        document.body.scrollHeight > document.body.clientHeight
            ? document.body.scrollHeight
            : document.body.clientHeight;
    pageHeight =
        pageHeight > document.documentElement.clientHeight
            ? document.documentElement.clientHeight
            : pageHeight;
    setWidth = obj.offsetLeft;
    setHeight = obj.offsetTop + obj.offsetHeight;
    var objParent = obj.offsetParent;
    var isBrowserPop = false;
    while (objParent != null) {
        if (objParent.className.indexOf("zBrowsePop") != -1) {
            isBrowserPop = true;
            setWidth += (pageWidth * 1) / 10;
            setHeight += (pageHeight * 7) / 100;
        }
        if (!isBrowserPop) {
            setWidth += objParent.offsetLeft;
            setHeight += objParent.offsetTop;
        }
        objParent = objParent.offsetParent;
    }
    if (setWidth + divWidth > pageWidth) {
        setWidth = pageWidth - divWidth;
    }
    if (setHeight + divHeight > pageHeight && setHeight - divHeight >= 0) {
        setHeight = setHeight - obj.offsetHeight - getDiv.offsetHeight;
    }
    getDiv.style.left = "50vw";
    getDiv.style.top = "50vh";
    getDiv.className = getDiv.className + " vcenter";
}
function ValidDate(obj) {
    var asDateType = obj.getAttribute("asDateType");
    var regex = /^(1|0)\d{2}\/([0]\d|[1][0-2])\/([0-2]\d|[3][0-1])$/;
    if (asDateType == "U") {
        regex = /^(19|20)\d{2}\/([0]\d|[1][0-2])\/([0-2]\d|[3][0-1])$/;
    }
    var getDiv = document.getElementById("asCalendar");
    if (getDiv) {
        CalendarHidden();
    }
    Validate_Date(obj, regex);
}
function Validate_Date(obj, regex) {
    var obj_valid = document.getElementById(
        obj.id.substring(0, obj.id.length - 3) + "_err"
    );
    if (obj_valid != null) {
        if (obj_valid.id == obj.id) {
            obj_valid = null;
        }
    }
    if (obj_valid != null) {
        obj_valid.style.display = "none";
    }
    var asDateType = obj.getAttribute("asDateType");
    if (asDateType == "U") {
        dateBlur(obj);
    } else {
        rocBlur(obj);
    }
    if (obj.value.length == 0) {
        return;
    }
    if (obj.value.match(regex) == null) {
        if (obj_valid != null) {
            obj_valid.style.display = "table-footer-group";
        }
        if (bCalendarShow) {
            return;
        }
        setTimeout(function () {
            obj.select();
        }, 0);
    }
}
function setDate(obj, sDate) {
    obj = document.getElementById(obj);
    obj.style.color = "";
    obj.value = sDate;
    bCalendarShow = false;
    ValidDate(obj);
    CalendarHidden();
}
function setClose() {
    bCalendarShow = false;
    CalendarHidden();
}
function creatCalendarCloseBtn() {
    var close = document.createElement("div");
    close.id = "close";
    close.className = "calClose";
    close.onclick = setClose;
    return close;
}
function set_month_day(str_date, set_date) {
    if (
        Month_Last_Day(set_date.getYear(), set_date.getMonth() + 1) >
        str_date.getDate()
    ) {
        set_date.setDate(str_date.getDate());
    } else {
        set_date.setDate(
            Month_Last_Day(set_date.getYear(), set_date.getMonth() + 1)
        );
    }
    return set_date;
}
function as_Calendar(target_obj, str_datetime) {
    if (target_obj == null) {
        target_obj = document.getElementById(target_obj);
    }
    var asDateType = target_obj.getAttribute("asDateType");
    var asMinYear = target_obj.getAttribute("asMin");
    var asMaxYear = target_obj.getAttribute("asMax");
    if (asMinYear == null || typeof asMinYear === "undefined") {
        asMinYear = target_obj.getAttribute("asPMin");
    }
    if (asMaxYear == null || typeof asMaxYear === "undefined") {
        asMaxYear = target_obj.getAttribute("asPMax");
    }
    var asMinsYear = "";
    var asMaxsYear = "";
    asMinsYear = asMinYear.substring(0, 4);
    asMaxsYear = asMaxYear.substring(0, 4);
    var sTip = target_obj.getAttribute("asTip");
    var n_weekstart = 1;
    var dt_datetime =
        str_datetime == null || str_datetime == ""
            ? new Date()
            : str2dt(str_datetime, asDateType, sTip);
    var dt_prev_year = new Date(dt_datetime);
    dt_prev_year.setYear(dt_datetime.getFullYear() - 1);
    var dt_next_year = new Date(dt_datetime);
    dt_next_year.setYear(dt_datetime.getFullYear() + 1);
    var dt_prev_month = new Date(dt_datetime);
    dt_prev_month.setDate(1);
    dt_prev_month.setMonth(dt_datetime.getMonth() - 1);
    dt_prev_month = set_month_day(dt_datetime, dt_prev_month);
    var dt_next_month = new Date(dt_datetime);
    dt_next_month.setDate(1);
    dt_next_month.setMonth(dt_datetime.getMonth() + 1);
    dt_next_month = set_month_day(dt_datetime, dt_next_month);
    var dt_firstday = new Date(dt_datetime);
    dt_firstday.setDate(1);
    dt_firstday.setDate(1 - ((7 + dt_firstday.getDay() - n_weekstart) % 7));
    var dt_lastday = new Date(dt_next_month);
    dt_lastday.setDate(0);
    var YearList = "";
    var MonthList = "";
    var dNow = new Date();
    if (asDateType == "R") {
        YearList +=
            '民國<select size="1" name="YearList" onchange="CalendarShow(\'' +
            target_obj.id +
            "',this.value+'" +
            putZeroBeforeString(new String(dt_datetime.getMonth() + 1), 2) +
            putZeroBeforeString(new String(dt_datetime.getDate()), 2) +
            "');\">\n";
        for (var i = asMinsYear - 1911; i <= asMaxsYear - 1911; i++) {
            if (i == dt_datetime.getFullYear() - 1911) {
                YearList +=
                    '<option value="' +
                    putZeroBeforeString(new String(i), 3) +
                    '" selected>' +
                    i +
                    "</option>\n";
            } else {
                YearList +=
                    '<option value="' +
                    putZeroBeforeString(new String(i), 3) +
                    '">' +
                    i +
                    "</option>\n";
            }
        }
    } else {
        YearList +=
            '西元<select size="1" name="YearList" onchange="CalendarShow(\'' +
            target_obj.id +
            "', this.value+'/" +
            (dt_datetime.getMonth() + 1) +
            "/" +
            dt_datetime.getDate() +
            "');\">\n";
        for (var i = asMinsYear; i <= asMaxsYear; i++) {
            if (i == dt_datetime.getFullYear()) {
                YearList +=
                    '<option value="' + i + '" selected>' + i + "</option>\n";
            } else {
                YearList += '<option value="' + i + '">' + i + "</option>\n";
            }
        }
    }
    if (asDateType == "R") {
        MonthList +=
            '<select size="1" name="MonthList" onchange="CalendarShow(\'' +
            target_obj.id +
            "','" +
            putZeroBeforeString(
                new String(dt_datetime.getFullYear() - 1911),
                3
            ) +
            "/'+this.value+'/" +
            putZeroBeforeString(new String(dt_datetime.getDate()), 2) +
            "');\">\n";
    } else {
        MonthList +=
            '<select size="1" name="MonthList" onchange="CalendarShow(\'' +
            target_obj.id +
            "','" +
            dt_datetime.getFullYear() +
            "/'+this.value+'/" +
            dt_datetime.getDate() +
            "');\">\n";
    }
    for (var i = 1; i <= 12; i++) {
        if (i == dt_datetime.getMonth() + 1) {
            MonthList +=
                '<option value="' +
                putZeroBeforeString(new String(i), 2) +
                '" selected>' +
                i +
                "</option>\n";
        } else {
            MonthList +=
                '<option value="' +
                putZeroBeforeString(new String(i), 2) +
                '">' +
                i +
                "</option>\n";
        }
    }
    var str_buffer = new String(
        '<div><div class="datatable" ><table  width="348px" align="center">\n' +
            "<tr>\n" +
            '<td colspan="3" class="dataclear"><font ><input type="button" class="ctrlbutton"  value="清除日期" onclick="setDate(\'' +
            target_obj.id +
            "', ''); return false;\"></font></td>\n" +
            "</tr>\n" +
            "<tr>\n"
    );
    var enddate = new Date(dt_prev_month);
    enddate.setMonth(enddate.getMonth() + 1);
    enddate.setDate(1);
    enddate.setDate(enddate.getDate() - 1);
    if (Check_MRange(enddate, asMinYear, asMaxYear)) {
        str_buffer +=
            '<td><font class="FieldTitleFont"><input type="button" class="ctrlbutton" value="上月" onclick="CalendarShow(\'' +
            target_obj.id +
            "', '" +
            dt2dtstr(dt_prev_month, asDateType) +
            "'); return false;\"></font></td>\n";
    } else {
        str_buffer +=
            '<td><font class="FieldTitleFont"><input type="button" class="ctrlbutton" value="上月" disabled="disabled" onclick="return false;"></font></td>\n';
    }
    str_buffer +=
        "<td>" + YearList + "</select>年\n" + MonthList + "</select>月</td>";
    if (Check_MRange(dt_next_month.setDate(1), asMinYear, asMaxYear)) {
        str_buffer +=
            '<td><font class="FieldTitleFont"><input type="button" class="ctrlbutton" value="下月"  onclick="CalendarShow(\'' +
            target_obj.id +
            "', '" +
            dt2dtstr(dt_next_month, asDateType) +
            "'); return false;\"></font></td>\n";
    } else {
        str_buffer +=
            '<td><font class="FieldTitleFont"><input type="button" class="ctrlbutton" value="下月" disabled="disabled" onclick="return false;"></font></td>\n';
    }
    str_buffer +=
        "</tr>\n" +
        "</table>\n" +
        '<table border="0" align="center" width="100%" height="70%">\n' +
        "<tr>\n" +
        "<td>一</td>\n" +
        "<td >二</td>\n" +
        "<td>三</td>\n" +
        "<td>四</td>\n" +
        "<td >五</td>\n" +
        '<td ><font color="#0000CC">六</font></td>\n' +
        '<td ><font color="#FF0000">日</font></td>\n' +
        "</tr>";
    var dt_current_day = new Date(dt_firstday);
    let CalendarRowCount = 0;
    while (
        dt_current_day.getMonth() == dt_datetime.getMonth() ||
        dt_current_day.getMonth() == dt_firstday.getMonth()
    ) {
        str_buffer += "<tr>\n";
        for (var n_current_wday = 0; n_current_wday < 7; n_current_wday++) {
            if (
                dt_current_day.getDate() == dt_datetime.getDate() &&
                dt_current_day.getMonth() == dt_datetime.getMonth()
            ) {
                str_buffer +=
                    '\t<td style="background-color:#cae2cb" align="right" ';
            } else if (
                dt_current_day.getDay() == 0 ||
                dt_current_day.getDay() == 6
            ) {
                str_buffer +=
                    '\t<td style="background-color:white" align="right" ';
            } else {
                str_buffer +=
                    '\t<td style="background-color:white" align="right" ';
            }
            if (Check_Range(dt_current_day, asMinYear, asMaxYear)) {
                if (dt_current_day.getMonth() == dt_datetime.getMonth()) {
                    str_buffer +=
                        " onclick=\"setDate('" +
                        target_obj.id +
                        "', '" +
                        dt2dtstr(dt_current_day, asDateType) +
                        '\');" > <a href="javascript: return false;" >' +
                        '<font color="black" face="tahoma, verdana" size="2">';
                } else {
                    str_buffer +=
                        " onclick=\"setDate('" +
                        target_obj.id +
                        "', '" +
                        dt2dtstr(dt_current_day, asDateType) +
                        '\');" >  <a href="javascript: return false;" >' +
                        '<font color="gray" face="tahoma, verdana" size="2">';
                }
                str_buffer += dt_current_day.getDate() + "</font></a></td>\n";
            } else {
                str_buffer +=
                    '><font color="gray" face="tahoma, verdana" size="2">';
                str_buffer += dt_current_day.getDate() + "</font></td>\n";
            }
            dt_current_day.setDate(dt_current_day.getDate() + 1);
        }
        str_buffer += "</tr>\n";
        CalendarRowCount++;
    }
    for (let CalendarRow = CalendarRowCount; CalendarRow < 6; CalendarRow++) {
        str_buffer += "<tr>\n";
        for (var n_current_wday = 0; n_current_wday < 7; n_current_wday++) {
            if (
                dt_current_day.getDate() == dt_datetime.getDate() &&
                dt_current_day.getMonth() == dt_datetime.getMonth()
            ) {
                str_buffer +=
                    '\t<td style="background-color:#cae2cb" align="right" ';
            } else if (
                dt_current_day.getDay() == 0 ||
                dt_current_day.getDay() == 6
            ) {
                str_buffer +=
                    '\t<td style="background-color:white" align="right" ';
            } else {
                str_buffer +=
                    '\t<td style="background-color:white" align="right" ';
            }
            if (Check_Range(dt_current_day, asMinYear, asMaxYear)) {
                if (dt_current_day.getMonth() == dt_datetime.getMonth()) {
                    str_buffer +=
                        " onclick=\"setDate('" +
                        target_obj.id +
                        "', '" +
                        dt2dtstr(dt_current_day, asDateType) +
                        '\');" > <a href="javascript: return false;" >' +
                        '<font color="black" face="tahoma, verdana" size="2">';
                } else {
                    str_buffer +=
                        " onclick=\"setDate('" +
                        target_obj.id +
                        "', '" +
                        dt2dtstr(dt_current_day, asDateType) +
                        '\');" >  <a href="javascript: return false;" >' +
                        '<font color="gray" face="tahoma, verdana" size="2">';
                }
                str_buffer += dt_current_day.getDate() + "</font></a></td>\n";
            } else {
                str_buffer +=
                    '><font color="gray" face="tahoma, verdana" size="2">';
                str_buffer += dt_current_day.getDate() + "</font></td>\n";
            }
            dt_current_day.setDate(dt_current_day.getDate() + 1);
        }
        str_buffer += "</tr>\n";
    }
    str_buffer += "</table>\n";
    return str_buffer;
}
function Check_Range(dt_current_day, asMin, asMax) {
    var dt_minday = new Date(asMin);
    var dt_maxday = new Date(asMax);
    dt_maxday.setDate(dt_maxday.getDate() + 1);
    if (dt_current_day >= dt_minday && dt_current_day < dt_maxday) {
        return true;
    }
    return false;
}
function Check_MRange(dt_current_month, asMin, asMax) {
    var dt_minday = new Date(asMin);
    var dt_maxday = new Date(asMax);
    dt_maxday.setDate(dt_maxday.getDate() + 1);
    if (dt_current_month >= dt_minday && dt_current_month < dt_maxday) {
        return true;
    }
    return false;
}
function str2dt(str_datetime, asDateType, sTip) {
    if (str_datetime == sTip) return new Date();
    if (asDateType == "U") {
        var re_date = /^(\d+)([.\/-]|\s|)(\d+)([.\/-]|\s|)(\d+)$/;
        if (!re_date.exec(str_datetime)) {
            alert("日期格式(YYYY/MM/DD)錯誤！： " + str_datetime);
            return new Date();
        } else if (Check_Date(RegExp.$1, RegExp.$3, RegExp.$5) == 0) {
            return new Date(RegExp.$1, RegExp.$3 - 1, RegExp.$5);
        } else {
            alert("不正確的西元日期！： " + str_datetime);
            return new Date();
        }
    } else {
        var SplitRule =
            /([0-9]{3})([.\/-]|\s|)([0-9]{2})([.\/-]|\s|)([0-9]{2})/;
        var tmpDate = SplitRule.exec(str_datetime);
        if (tmpDate == null) {
            alert("日期格式(YYY/MM/DD)錯誤！： " + str_datetime);
            return new Date();
        } else if (Check_ROCDate(tmpDate[1], tmpDate[3], tmpDate[5]) == 0) {
            return new Date(
                parseFloat(tmpDate[1]) + 1911,
                parseFloat(tmpDate[3]) - 1,
                parseFloat(tmpDate[5])
            );
        } else {
            alert("不正確的民國日期： " + str_datetime);
            return new Date();
        }
    }
}
function dt2dtstr(dt_datetime, asDateType) {
    if (asDateType == "U") {
        return new String(
            dt_datetime.getFullYear() +
                "/" +
                putZeroBeforeString(new String(dt_datetime.getMonth() + 1), 2) +
                "/" +
                putZeroBeforeString(new String(dt_datetime.getDate()), 2)
        );
    } else {
        return new String(
            putZeroBeforeString(
                new String(dt_datetime.getFullYear() - 1911),
                3
            ) +
                "/" +
                putZeroBeforeString(new String(dt_datetime.getMonth() + 1), 2) +
                "/" +
                putZeroBeforeString(new String(dt_datetime.getDate()), 2)
        );
    }
}
function putZeroBeforeString(str_in, int_length) {
    while (str_in.length < int_length) {
        str_in = "0" + str_in;
    }
    return str_in;
}
function Check_Date(getYear, getMonth, getDay) {
    if (getYear.length == 0 || getMonth.length == 0 || getDay.length == 0) {
        return 1;
    } else if (isNaN(getYear) || isNaN(getMonth) || isNaN(getDay)) {
        return 2;
    } else {
        getYear = parseFloat(getYear);
        getMonth = parseFloat(getMonth);
        getDay = parseFloat(getDay);
    }
    if (getMonth > 12 || getMonth < 1) {
        return 3;
    } else if (getDay > Month_Last_Day(getYear, getMonth) || getDay < 1) {
        return 4;
    } else {
        return 0;
    }
}
function Check_ROCDate(getYear, getMonth, getDay) {
    getYear = parseFloat(getYear) + 1911;
    return Check_Date(getYear, getMonth, getDay);
}
function Month_Last_Day(getYear, getMonth) {
    if (getMonth == 2) {
        if (getYear % 4 == 0 && (getYear % 100 != 0 || getYear % 400 == 0)) {
            return 29;
        } else {
            return 28;
        }
    }
    if (getMonth <= 7 && getMonth % 2 == 1) {
        return 31;
    }
    if (getMonth >= 8 && getMonth % 2 == 0) {
        return 31;
    }
    return 30;
}
