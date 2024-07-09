var ascblMultitimoutID;

function ascheckPageID(obj) {
    var pname = obj.substring(obj.lastIndexOf('/')+1);
    pname = pname.substring(0, pname.lastIndexOf('.'));
    var newpname = checkPname(pname);
    if (newpname.length>5)
    {
        newpname = newpname.substring(0, 4);
    }
    return newpname;
}

function ascheckSYS(obj) {
    if (obj.lastIndexOf('?') > -0) {
        var pqs = obj.substring(obj.lastIndexOf('?') + 1);
        if (pqs.lastIndexOf('assys=') > -1) {
            pqs = pqs.substring(pqs.lastIndexOf('assys=') + 6);
        }
        if (pqs.lastIndexOf('&') > -1) {
            pqs = pqs.substring(0, pqs.lastIndexOf('&'));
        }
        var newpsys = checkPname(pqs);
        return newpsys;
    } else {
        return '';
    }
}
function ascheckHTML(obj) {	
    if (typeof (obj) === 'string')
    {
		obj = obj.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;');
		obj = obj.replace('\'\'', '&quot;').replace('\'', '&#x27;').replace('/', '&#x2F;');
    }
    return escape(obj);
}
function ascheckJS(obj) {
    if (typeof (obj) === 'string')
    {
		obj = obj.replace('\u0008', '\b').replace('\u0009', '\t').replace('\u000A', '\n').replace('\u000C', '\f').replace('\u000D', '\r');
		obj = obj.replace('\u0022', '\x22').replace('\u0026', '\x26').replace('\u0027', '\x27').replace('\u002F', '\/').replace('\u005C', '\\');
		var pattern = new RegEx('[\u0000-\u001F]');		
		obj = obj.replace(pattern, utoa($1));
    }
    return escape(obj);
}
function utoa(str) {
    const uList = str.match(/\\u[\da-f]{4}/g) || []
    return uList.reduce((pre, u) => {
        return pre.replace(u, String.fromCodePoint(Number(`0x${u.slice(2)}`)))
    }, str)
}
function checkPname(pobj)
{
    var chkstr = 'abcdefghijklmnopqrstuvwxyz';
    var chknstr = '1234567890';
    var retvalue = '';
    for (var e = 0; e < pobj.length; e++) 
    {
        var rstr = chkstr.indexOf(pobj.substring(e, e + 1));
        if (rstr>-1)
        {
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

function ShowMList(objid, btnid) {    
    var divRef = document.getElementById(objid);
    divRef.style.display = "block";
    var btnRef = document.getElementById(btnid);
    setascblMulti(divRef, btnRef);
}
function HideMList(objid, btnid) {
    if (document.getElementById(objid) != null) {
        document.getElementById(objid).style.display = "none";
        var btnRef = document.getElementById(btnid);
        var divRef = document.getElementById(objid);
        var s = '';
        var tip = '';
        var elements = divRef.getElementsByTagName('input')       
        for (var e = 0; e < elements.length; e++) {
            if (elements[e].checked == true) {
                var c = s + ',' + elements[e].labels[0].innerText.toString().trim();
                if (c.length < 10) {
                    if (s.length > 0) {
                        s = s + ',';
                        tip = tip + ',';
                    }
                    s = s + elements[e].labels[0].innerText.toString().trim();
                    tip = tip + elements[e].labels[0].innerText.toString().trim();
                }
                else {
                    if (s.length == 0) {
                        s = s + elements[e].labels[0].innerText.toString().trim();
                    }
                    else {
                        tip = tip + ',';
                    }
                    tip = tip + elements[e].labels[0].innerText.toString().trim();
                }               
            }
        }
        if (s.length == 0) {
            s = '請挑選';
        }
        else {
            s = s + '...';
        }
        divRef.parentNode.title = tip;
        btnRef.innerHTML = s;
        btnRef.innerText = s;
    }
}
function ShowMList2(winid, objid, btnid) {
    var btnRef = document.getElementById(btnid);    
    var objparent = btnRef.parentElement;
    if (objparent != null) {
        while (objparent) {
            objparent = objparent.parentElement;
            if (objparent.tagName == "TABLE") {
                break;
            }
            if (objparent.parentElement == null) {
                break;
            }
        }
        var objths = objparent.getElementsByTagName('TH')
        for (var th = 0; th < objths.length; th++) {            
            var objchk = objths[th].children[objths[th].children.length - 1];
            if (winid.replace('_cblMultiWin', '').indexOf(objchk.id) == -1 || th==0|| objchk.id.length == 0)
            {
                //objths[th].style.opacity = -1;
                objths[th].style.zIndex = "unset";
            }
        }
        //zidex
        var objmenu = document.getElementsByClassName('c-left')
        for (var me = 0; me < objmenu.length; me++) {
            objmenu[me].style.zIndex = "unset";
        }
    }

    var winRef = document.getElementById(winid);
    winRef.className = winRef.className + ' vcenter';
    winRef.style.display = "block";

    var objwindow = document.getElementById(winid + "_bg");
    objwindow.style.zIndex = "9999"
    objwindow.style.width = "100%";
    objwindow.style.height = "100vh";
    objwindow.style.position = "fixed";
    objwindow.style.backgroundColor = "hsla(0, 0%, 0%, 0.6)";
    objwindow.style.top = "0px";
    objwindow.style.left = "0px";
    objwindow.style.display = ""

    var divRef = document.getElementById(objid);
    divRef.style.display = "block";
    var tables = divRef.getElementsByTagName('table')
    for (var t = 0; t < tables.length; t++) {
        if (tables[t].id.indexOf('_show') > 0) {
            var obj = document.getElementById(tables[t].id);
            if (obj != null) {
                divRef.removeChild(obj);
            }
        }
    }
    //多欄顯示    
    var cbltbRef = divRef.getElementsByClassName("ctrlcbl")
    if (cbltbRef.length > 0) {
        for (var r = 0, row; row = cbltbRef[0].rows[r]; r++) {
            var cbllabel = row.getElementsByTagName('label');
            if (cbllabel.length > 0) {
                var cblallShow = cbllabel[0].innerText.toString().trim();
                //分割
                var cblarShow = cblallShow.split("!!");
                if (cblarShow.length > 1) {
                    cbllabel[0].innerText = cblarShow[0];
                    for (var e = 1; e < cblarShow.length; e++) {
                        var newlabel = document.createElement('label');
                        newlabel.innerHTML = cblarShow[e];
                        cbltbRef[0].rows[r].insertCell(cbltbRef[0].rows[r].cells.length).appendChild(newlabel);
                    }
                }
            }
        }
    }
    setascblMulti(divRef, btnRef);
}
function HideMList2(objid, lblid) {
	if (document.getElementById(objid) != null) {        
        var lblRef = document.getElementById(lblid);
        var divRef = document.getElementById(objid);
        var hdlRef = document.getElementById(lblid.replace('_hshow', '_hdcheck'));
		var divListRef = document.getElementById(objid.replace('_cblMultiWin','_cblMultiList'));	
		var tables = divListRef.getElementsByTagName('table')
		for(var t = 0; t < tables.length; t++)
		{
			if(tables[t].id.indexOf('_show')>0)
			{
				var ListRef = document.getElementById(tables[t].id.replace('_show',''));				
				var ListshowRef = document.getElementById(tables[t].id);
				var elements = ListshowRef.getElementsByTagName('input')
				for (var e = 0; e < elements.length; e++) {					
					if( document.getElementById(elements[e].id) != null)
					{
					    var list = document.getElementById(elements[e].id);				
						if (elements[e].checked == true) 
						{              
							list.checked = true;				
						}else
						{
							list.checked = false;
						}
					}
				}
				if (ListshowRef != null) {
					ListshowRef.parentNode.removeChild(ListshowRef);
				}
				if (ListRef != null) {
					ListRef.style.display = "";
				}
			}
		}
		
		
		if(document.getElementById(lblid.replace('_hshow','_htxt')) != null)
		{
			var keyRef = document.getElementById(lblid.replace('_hshow','_htxt'));
			keyRef.value='';			
		}	
		document.getElementById(objid).style.display = "none";
        
		var s = '';     
		var h = '';
		var elementId = lblid.replace('_hshow', '_cbl_');	 
        var elements = divRef.getElementsByTagName('input')
        for (var e = 0; e < elements.length; e++) {
            if (elements[e].checked == true) {              
                if (s.length > 0) {
                    s = s + ',';                    
                }
                s = s + elements[e].labels[0].innerText.toString().trim();  
				if (h.length > 0) h = h + ',';
                h = h + elements[e].id.substring(elements[e].id.lastIndexOf('_')).toString();							  
            }
        }       
        divRef.parentNode.title = s;
        lblRef.innerHTML = s;
        lblRef.innerText = s;
		hdlRef.value = h;				 
	}

	$("th.tmpHeader").css("z-index", "");
	$(".c-left").css("z-index", "");

    if (document.getElementById(objid + "_bg") != null) 
    {
        var winRef = document.getElementById(objid + "_bg");   
        winRef.style.display = "none";
    }
}
function CancelMList2(winid, objid, txtid) {   
    var srhtxt = document.getElementById(txtid);
    if (srhtxt) { srhtxt.value = ''; }
    var divRef = document.getElementById(objid);
    //var lblRef = document.getElementById(txtid.replace('_htxt', '_hshow'));
    var lblRef = document.getElementById(txtid.replace('_htxt', '_hdcheck'));
    var tables = divRef.getElementsByTagName('table')
    for (var t = 0; t < tables.length; t++) {
        if (tables[t].id.indexOf('_show') > 0) {
            var obj = document.getElementById(tables[t].id);
            if (obj != null) {
                divRef.removeChild(obj);
            }
        }
        else {

            var setobj = document.getElementById(tables[t].id);
            var elements = setobj.getElementsByTagName('input')
            var s = lblRef.value.replace(new RegExp(",", "g"), "$|");
            if (s.length > 0) {
                var re = new RegExp(s + '$');
                for (var e = 0; e < elements.length; e++) {
                    if (elements[e].checked == true) {
                        if (re.exec(elements[e].id.replace(new RegExp(" ", "g"), "")) == null) {
                            elements[e].checked = false;
                        }
                    }
                    else {
                        if (re.exec(elements[e].id.replace(new RegExp(" ", "g"), "")) != null) {
                            elements[e].checked = true;
                        }
                    }
                }
                setobj.style.display = "";
            }
            else {
                for (var e = 0; e < elements.length; e++) {

                    elements[e].checked = false;

                }
            }

        }
    }
    var getDiv = document.getElementById(winid);
    if (getDiv) { getDiv.style.display = 'none'; }
    var winDiv = document.getElementById(winid + '_bg');
    if (winDiv) { winDiv.style.display = 'none'; }    
    $("th.tmpHeader").css("z-index", "");
    $(".c-left").css("z-index", "");
}
function SetMList2(objid, lblid) {	
    if (document.getElementById(objid) != null) {		
		var divRef = document.getElementById(objid);
		var lblRef = document.getElementById(lblid);
		var hdlRef = document.getElementById(lblid.replace('_hshow', '_hdcheck'));
		var s = '';          
		var h = '';
		if(document.getElementById(objid + '_show') != null) {
			var ListshowRef = document.getElementById(objid + '_show');
			var elements = ListshowRef.getElementsByTagName('input')
			var elementId = lblid.replace('_hshow', '_cbl_');
			for (var e = 0; e < elements.length; e++) {
				elements[e].checked = true;
				var list = document.getElementById(elements[e].id);
				if(list!=null)
				{	
					list.checked = true;
					if (s.length > 0)s = s + ',';
					s = s + list.labels[0].innerText.toString().trim();
					if (h.length > 0) h = h + ',';
					h = h + elements[e].id.substring(elements[e].id.lastIndexOf('_')).toString();
				}
			}					
		}else
		{
		    var elements = divRef.getElementsByTagName('input');
		    var elementId = lblid.replace('_hshow', '_cbl_');
			for (var e = 0; e < elements.length; e++) {
				elements[e].checked = true;
				if (s.length > 0)s = s + ',';
				s = s + elements[e].labels[0].innerText.toString().trim();
				if (h.length > 0) h = h + ',';
				h = h + elements[e].id.substring(elements[e].id.lastIndexOf('_')).toString();
			}			
		}           
 
        divRef.parentNode.title = s;
        lblRef.innerHTML = s;
        lblRef.innerText = s;
        hdlRef.value = h;
    }
}
function ResetMList2(objid, lblid) {	
    if (document.getElementById(objid) != null){
        var divRef = document.getElementById(objid);
        var lblRef = document.getElementById(lblid);
        var hdlRef = document.getElementById(lblid.replace('_hshow', '_hdcheck'));
		
		if(document.getElementById(lblid.replace('_hshow','_htxt')) != null)
		{
			var keyRef = document.getElementById(lblid.replace('_hshow','_htxt'));
			keyRef.value='';	
		}
		
		if(document.getElementById(objid + '_show') != null) {
			var showRef = document.getElementById(objid + '_show');
			if (showRef != null) {
				showRef.parentNode.removeChild(showRef);
			}		
		}		
		
        var s = '';             
        var elements = divRef.getElementsByTagName('input')
        for (var e = 0; e < elements.length; e++) {
            elements[e].checked = false;
        }
		divRef.style.display = "";

        divRef.parentNode.title = '';
        lblRef.innerHTML = '';
        lblRef.innerText = '';
        hdlRef.value = '';
    }
}
function setascblMulti(objwindow, obj) {
    var setLeft = obj.offsetLeft;
    var setTop = obj.offsetTop + obj.offsetHeight;    
    var objParent = obj.offsetParent;
    while (objParent != null) {
        setLeft += objParent.offsetLeft;
        setTop += objParent.offsetTop;
        objParent = objParent.offsetParent;
    }
    //Page寬、高
    var pageWidth = document.body.clientWidth;
    var pageHeight = (document.body.scrollHeight > document.body.clientHeight) ? document.body.scrollHeight : document.body.clientHeight;
    //可視高
    var viewHeight = document.body.clientHeight;
    //被捲去的高
    var scrollTop = (document.body.scrollTop != null && document.body.scrollTop > document.documentElement.scrollTop) ? document.body.scrollTop : document.documentElement.scrollTop;
    var objviewTop = setTop - scrollTop; //含物件高
    //物件高
    var objHeight = obj.offsetHeight;
    //顯示在左邊
    if ((setLeft + objwindow.offsetWidth) > pageWidth) {
        setLeft = (pageWidth - objwindow.offsetWidth);
    }    
    //顯示在上面    
    if (
        ((setTop + objwindow.offsetHeight) > pageHeight && (setTop - objwindow.offsetHeight) >= 0)
        ||
        ((setTop + objwindow.offsetHeight) > viewHeight && (objviewTop - objHeight - objwindow.offsetHeight) >= 0)
       ) {
		setTop = setTop - objwindow.offsetHeight - objHeight + 55;
    }
    objwindow.style.position = "absolute";
    setTop = setTop - 55; 
    objwindow.style.top = setTop + "px";
}

function ShowgrdMList(winid, objid, btnid, mid) {    
    var btnRef = document.getElementById(btnid);
    var cbllistRef = document.getElementById(mid + '_listsTable');    
    var objparent = btnRef.parentElement;
    if (objparent != null) {
        while (objparent) {
            objparent = objparent.parentElement;
            if (objparent.tagName == "TABLE") {
                break;
            }
            if (objparent.parentElement == null) {
                break;
            }
        }
        var objths = objparent.getElementsByTagName('TH')
        for (var th = 0; th < objths.length; th++) {
            var objchk = objths[th].children[objths[th].children.length - 1];
            if (winid.replace('_cblMultiWin', '').indexOf(objchk.id) == -1 || th == 0 || objchk.id.length == 0) {
                //objths[th].style.opacity = -1;
                objths[th].style.zIndex = "unset";
            }
        }
        //zidex
        var objmenu = document.getElementsByClassName('c-left')
        for (var me = 0; me < objmenu.length; me++) {
            objmenu[me].style.zIndex = "unset";
        }
    }

    var winRef = document.getElementById(winid);
    winRef.className = winRef.className + ' vcenter';
    winRef.style.display = "block";

    var objwindow = document.getElementById(winid + "_bg");
    objwindow.style.zIndex = "9999"
    objwindow.style.width = "100%";
    objwindow.style.height = "100vh";
    objwindow.style.position = "fixed";
    objwindow.style.backgroundColor = "hsla(0, 0%, 0%, 0.6)";
    objwindow.style.top = "0px";
    objwindow.style.left = "0px";
    objwindow.style.display = ""

    //附加選項
    var divRef = document.getElementById(objid);
    if (cbllistRef != null) {
        var hdcblRef = document.getElementById(objid.replace('_cblMultiList', '_hfcblvalue'));
        var cblvalues =hdcblRef.value.toString().split(';');
        var cbleles = cbllistRef.getElementsByTagName('input')
        for (var e = 0; e < cbleles.length; e++) {          
            for (icblcheck = 0; icblcheck < cblvalues.length; icblcheck++) 
            {
                if(cblvalues[icblcheck] ==cbleles[e].value)
                {
                    cbleles[e].checked = true;
                }
            }
        }
        divRef.appendChild(cbllistRef);
    }    
    
    divRef.style.display = "block";
    var tables = divRef.getElementsByTagName('table')
    for (var t = 0; t < tables.length; t++) {
        if (tables[t].id.indexOf('_show') > 0) {
            var obj = document.getElementById(tables[t].id);
            if (obj != null) {
                divRef.removeChild(obj);
            }
        }
    }
    //多欄顯示    
    var cbltbRef = divRef.getElementsByClassName("ctrlcbl")
    if (cbltbRef.length > 0) {
        for (var r = 0, row; row = cbltbRef[0].rows[r]; r++) {
            var cbllabel = row.getElementsByTagName('label');
            var cblallShow = cbllabel[0].innerText.toString().trim();
            //分割
            var cblarShow = cblallShow.split("!!");
            if (cblarShow.length > 1) {
                cbllabel[0].innerText = cblarShow[0];
                for (var e = 1; e < cblarShow.length; e++) {
                    var newlabel = document.createElement('label');
                    newlabel.innerHTML = cblarShow[e];
                    cbltbRef[0].rows[r].insertCell(cbltbRef[0].rows[r].cells.length).appendChild(newlabel);
                }
            }
        }
    }
    setascblMulti(divRef, btnRef);
}
function HidegrdMList(objid, lblid, mid) {
   
    if (document.getElementById(objid) != null) {
        var lblRef = document.getElementById(lblid);
        var divRef = document.getElementById(objid);
        var hdlRef = document.getElementById(lblid.replace('_hshow', '_hdcheck'));
        var hdcblRef = document.getElementById(lblid.replace('_hshow', '_hfcblvalue'));
        var divListRef = document.getElementById(objid.replace('_cblMultiWin', '_cblMultiList'));
        var tables = divListRef.getElementsByTagName('table')
        for (var t = 0; t < tables.length; t++) {
            if (tables[t].id.indexOf('_show') > 0) {
                var ListRef = document.getElementById(tables[t].id.replace('_show', ''));
                var ListshowRef = document.getElementById(tables[t].id);
                var elements = ListshowRef.getElementsByTagName('input')
                for (var e = 0; e < elements.length; e++) {
                    if (document.getElementById(elements[e].id) != null) {
                        var list = document.getElementById(elements[e].id);
                        if (elements[e].checked == true) {
                            list.checked = true;
                        } else {
                            list.checked = false;
                        }
                    }
                }
                if (ListshowRef != null) {
                    ListshowRef.parentNode.removeChild(ListshowRef);
                }
                if (ListRef != null) {
                    ListRef.style.display = "";
                }
            }
        }


        if (document.getElementById(lblid.replace('_hshow', '_htxt')) != null) {
            var keyRef = document.getElementById(lblid.replace('_hshow', '_htxt'));
            keyRef.value = '';
        }
        document.getElementById(objid).style.display = "none";

        var s = '';
        var h = '';
        var v = '';
        var elementId = lblid.replace('_hshow', '_cbl_');
        var elements = divRef.getElementsByTagName('input')
        for (var e = 0; e < elements.length; e++) {
            if (elements[e].checked == true) {
                if (s.length > 0) {
                    s = s + ',';
                }
                s = s + elements[e].labels[0].innerText.toString().trim();
                if (h.length > 0) h = h + ',';
                h = h + elements[e].id.substring(elements[e].id.lastIndexOf('_')).toString();
                if (v.length > 0) v = v + ';';
                v = v + elements[e].value.toString().trim();
            }
        }
        divRef.parentNode.title = s;
        lblRef.innerHTML = s;
        lblRef.innerText = s;
        hdlRef.value = h;
        hdcblRef.value = v;
        //移除選項
        var cbllistDivRef = document.getElementById(mid + '_listsDiv');
        var cbllistRef = document.getElementById(mid + '_listsTable');
        if (cbllistDivRef != null && cbllistRef != null) {
            var cbleles = cbllistRef.getElementsByTagName('input')
            for (var e = 0; e < cbleles.length; e++) {
                cbleles[e].checked = false;
            }
            cbllistDivRef.appendChild(cbllistRef);
        }
    }
    $("th.tmpHeader").css("z-index", "");
    $(".c-left").css("z-index", "");
    if (document.getElementById(objid + "_bg") != null) {
        var winRef = document.getElementById(objid + "_bg");
        winRef.style.display = "none";
    }
}
function CancelgrdMList(winid, objid, txtid, mid) {
   
    var srhtxt = document.getElementById(txtid);
    if (srhtxt) { srhtxt.value = ''; }
    var divRef = document.getElementById(objid);
    //var lblRef = document.getElementById(txtid.replace('_htxt', '_hshow'));
    var lblRef = document.getElementById(txtid.replace('_htxt', '_hdcheck'));
    var hdcblRef = document.getElementById(txtid.replace('_htxt', '_hfcblvalue'));
    var tables = divRef.getElementsByTagName('table')
    for (var t = 0; t < tables.length; t++) {
        if (tables[t].id.indexOf('_show') > 0) {
            var obj = document.getElementById(tables[t].id);
            if (obj != null) {
                divRef.removeChild(obj);
            }
        }
        else {

            var setobj = document.getElementById(tables[t].id);
            var elements = setobj.getElementsByTagName('input')
            var s = lblRef.value.replace(new RegExp(",", "g"), "$|");
            if (s.length > 0) {
                var re = new RegExp(s + '$');
                for (var e = 0; e < elements.length; e++) {
                    if (elements[e].checked == true) {
                        if (re.exec(elements[e].id.replace(new RegExp(" ", "g"), "")) == null) {
                            elements[e].checked = false;
                        }
                    }
                    else {
                        if (re.exec(elements[e].id.replace(new RegExp(" ", "g"), "")) != null) {
                            elements[e].checked = true;
                        }
                    }
                }
                setobj.style.display = "";
            }
            else {
                for (var e = 0; e < elements.length; e++) {

                    elements[e].checked = false;

                }
            }

        }
    }
    var getDiv = document.getElementById(winid);
    if (getDiv) { getDiv.style.display = 'none'; }
    var winDiv = document.getElementById(winid + '_bg');
    if (winDiv) { winDiv.style.display = 'none'; }    
    //移除選項
    var cbllistDivRef = document.getElementById(mid + '_listsDiv');
    var cbllistRef = document.getElementById(mid + '_listsTable');
    if (cbllistDivRef != null && cbllistRef != null) {
        var cbleles = cbllistRef.getElementsByTagName('input')
        for (var e = 0; e < cbleles.length; e++) {
            cbleles[e].checked = false;
        }
        cbllistDivRef.appendChild(cbllistRef);
    }
    $("th.tmpHeader").css("z-index", "");
    $(".c-left").css("z-index", "");
}
function SetgrdMList(objid, lblid, mid) {
    
    if (document.getElementById(objid) != null) {
        var divRef = document.getElementById(objid);
        var lblRef = document.getElementById(lblid);
        var hdlRef = document.getElementById(lblid.replace('_hshow', '_hdcheck'));
        var hdcblRef = document.getElementById(lblid.replace('_hshow', '_hfcblvalue'));
        var s = '';
        var h = '';
        var v = '';
        if (document.getElementById(objid + '_show') != null) {
            var ListshowRef = document.getElementById(objid + '_show');
            var elements = ListshowRef.getElementsByTagName('input')
            var elementId = lblid.replace('_hshow', '_cbl_');
            for (var e = 0; e < elements.length; e++) {
                elements[e].checked = true;
                var list = document.getElementById(elements[e].id);
                if (list != null) {
                    list.checked = true;
                    if (s.length > 0) s = s + ',';
                    s = s + list.labels[0].innerText.toString().trim();
                    if (h.length > 0) h = h + ',';
                    h = h + elements[e].id.substring(elements[e].id.lastIndexOf('_')).toString();
                    if (v.length > 0) v = v + ';';
                    v = v + elements[e].value.toString().trim();
                }
            }
        } else {
            var elements = divRef.getElementsByTagName('input');
            var elementId = lblid.replace('_hshow', '_cbl_');
            for (var e = 0; e < elements.length; e++) {
                elements[e].checked = true;
                if (s.length > 0) s = s + ',';
                s = s + elements[e].labels[0].innerText.toString().trim();
                if (h.length > 0) h = h + ',';
                h = h + elements[e].id.substring(elements[e].id.lastIndexOf('_')).toString();
                if (v.length > 0) v = v + ';';
                v = v + elements[e].value.toString().trim();
            }
        }

        divRef.parentNode.title = s;
        lblRef.innerHTML = s;
        lblRef.innerText = s;
        hdlRef.value = h;
        hdcblRef.value = v;
    }
}
function ResetgrdMList(objid, lblid, mid) {   
    if (document.getElementById(objid) != null) {
        var divRef = document.getElementById(objid);
        var lblRef = document.getElementById(lblid);
        var hdlRef = document.getElementById(lblid.replace('_hshow', '_hdcheck'));
        var hdcblRef = document.getElementById(lblid.replace('_hshow', '_hfcblvalue'));

        if (document.getElementById(lblid.replace('_hshow', '_htxt')) != null) {
            var keyRef = document.getElementById(lblid.replace('_hshow', '_htxt'));
            keyRef.value = '';
        }

        if (document.getElementById(objid + '_show') != null) {
            var showRef = document.getElementById(objid + '_show');
            if (showRef != null) {
                showRef.parentNode.removeChild(showRef);
            }
        }

        var s = '';
        var elements = divRef.getElementsByTagName('input')
        for (var e = 0; e < elements.length; e++) {
            elements[e].checked = false;
        }
        //divRef.style.display = "";

        divRef.parentNode.title = '';
        lblRef.innerHTML = '';
        lblRef.innerText = '';
        hdlRef.value = '';
        hdcblRef.value = '';
    }
}


function callSearchPage(objid) 
{
    event.preventDefault();
    var keyCode = event.keyCode;
    if (keyCode)
    {
        keyCode = event.which;
    }
    if (keyCode === 13) {
        document.getElementById(objid).click();
        obj.click();
    }
}

function asKeyDownCtrl(objid){
    if (document.getElementById(objid) != null) {
        function asKeyDownCtrl2(e) {
			var key = (e) ? e.which : event.keyCode;
            var obj = (e) ? e.target : event.srcElement;

            var objtable;
            var objprevious;
            var objnext;
            var objnode = obj.parentNode;
            while (objnode != null) {
                if (objnode.tagName == "TABLE") {
                    objtable = objnode;
                }
                if (objnode.tagName == "TD") {
                    if (objnode.previousElementSibling!=null)
                    {
                        if(objnode.previousElementSibling.tagName == "TD")
                        {
                            objprevious = objnode.previousElementSibling;
                        }
                    }
                    if (objnode.nextElementSibling !=null)
                    {
                        if(objnode.nextElementSibling.tagName == "TD")
                        {
                            objnext = objnode.nextElementSibling;
                        }
                    }                    
                }                
                objnode = objnode.parentNode;
            }

            var bEnter = false;            
            switch (key) {
                case 13: //Enter							
                    bEnter = true;
                    if (e) {
						e.returnValue = false;
                        e.cancelBubble = true;
                        e.preventDefault();
                    }
                    else {
						event.returnValue = false;
                        event.cancelBubble = true;
                        event.preventDefault();
                    }
					if (objtable != null) {
                        var objid = obj.id;
                        objid = objid.replace(objtable.id + "_", "");
                        var objcolumn = objid.substring(objid.indexOf("_"));
                        objid = objid.replace(objcolumn, "");
                        objid = objid.replace("ctl", "");
                        var objrow = parseInt(objid)

						objrow = objrow + 1;
                        if (objrow < 10) {
                            objid = "ctl0" + objrow.toString();
                        } else {
                            objid = "ctl" + objrow.toString();
                        }
                        objid = objtable.id + "_" + objid + objcolumn;
                        var newObj = document.getElementById(objid);
                        if (newObj != null) {
                            while (newObj.readOnly) {
                                objrow = objrow + 1;
                                if (objrow < 10) {
                                    objid = "ctl0" + objrow.toString();
                                } else {
                                    objid = "ctl" + objrow.toString();
                                }
                                objid = objtable.id + "_" + objid + objcolumn;
                                newObj = document.getElementById(objid);
                                if (newObj == null) {
                                    break;
                                }
                            }
                            if (newObj) {
                                newObj.focus();
                                if (newObj.getAttribute("type") == "text") {
                                    newObj.select();
                                }
                            }
                        }
                    }
                    break;
                case 37: //←
                    if (e) {
                        e.returnValue = false;
                        e.cancelBubble = true;
                        e.preventDefault();
                    }
                    else {
                        event.returnValue = false;
                        event.cancelBubble = true;
                        event.preventDefault();
                    }
                    if (objtable != null && objprevious != null) {
                        var parNode = obj.parentNode;
                        while (parNode.tagName != "TD") {
                            parNode = parNode.parentNode;
                        }
                        var itm = 0;
                        var itmele = parNode.getElementsByTagName('input');
                        for (var ii = 0; ii < itmele.length; ii++) {
                            if (itmele[ii].id == obj.id) {
                                itm = ii;
                            }
                        }
                        var elements = objprevious.getElementsByTagName('input')
	                        if(elements[itm] == null) itm = 0;
							if(elements[itm] != null){
								if (elements[itm].getAttribute("type") == "text") {
									var tar = elements[itm];
									if (!elements[itm].readOnly) {
										elements[itm].focus();
										elements[itm].select();
										break;
									}
									else {
										while (tar.readOnly) {
											if (objprevious.previousElementSibling != null) {
												if (objprevious.previousElementSibling.tagName == "TD") {
													objprevious = objprevious.previousElementSibling;
													if (objtable != null && objprevious != null) {
														var elements = objprevious.getElementsByTagName('input')
														if(elements[itm] != null){
															if (elements[itm].getAttribute("type") == "text") {
																tar = elements[itm];
															}
														}
													}
												}
											}
											else {//回到原來的位置
												tar = obj;
												break;
											}
										}
										tar.focus();
										tar.select();
									}
								}
							}
                    }


                    break;
                case 39: //→
                case 9: //tab	
                    if (e) {
                        e.returnValue = false;
                        e.cancelBubble = true;
                        e.preventDefault();
                    }
                    else {
                        event.returnValue = false;
                        event.cancelBubble = true;
                        event.preventDefault();
                    }
                    if (objtable != null && objnext != null) {
                        var parNode = obj.parentNode;
                        while (parNode.tagName != "TD"){
                            parNode = parNode.parentNode;
                        }
                        var itm = 0;
                        var itmele = parNode.getElementsByTagName('input');
                        for (var ii = 0; ii < itmele.length; ii++) {
                            if (itmele[ii].id == obj.id) {
                                itm = ii;
                            }
                        }
                        var elements = objnext.getElementsByTagName('input')
                        if(elements[itm] == null) itm = 0;
                        if(elements[itm] != null){   
							if (elements[itm].getAttribute("type") == "text") {
								var tar = elements[itm];
								if (!elements[itm].readOnly) {
									elements[itm].focus();
									elements[itm].select();
										break;
									}
									else {
										while (tar.readOnly) {
											if (objnext.nextElementSibling != null) {
												if (objnext.nextElementSibling.tagName == "TD") {
													objnext = objnext.nextElementSibling;
													if (objtable != null && objnext != null) {
														var elements = objnext.getElementsByTagName('input')
														if(elements[itm] != null){
															if (elements[itm].getAttribute("type") == "text") {
																tar = elements[itm];
															}
														}
													}
												}
											}
											else {//回到原來的位置
												tar = obj;
												break;
											}
										}
										tar.focus();
										tar.select();
									}
								}
                            }
                    }

                    break;
                case 38: //↑
                case 40: //↓
                    if (e) {
                        e.returnValue = false;
                        e.cancelBubble = true;
                        e.preventDefault();
                    }
                    else {
                        event.returnValue = false;
                        event.cancelBubble = true;
                        event.preventDefault();
                    }
                    if (objtable != null) {
                        var objid = obj.id;
                        objid = objid.replace(objtable.id + "_", "");
                        var objcolumn = objid.substring(objid.indexOf("_"));
                        objid = objid.replace(objcolumn, "");
                        objid = objid.replace("ctl", "");
                        var objrow = parseInt(objid)
                        if (key == 38) {
                            objrow = objrow - 1;
                        } else {
                            objrow = objrow + 1;
                        }
                        if (objrow < 10) {
                            objid = "ctl0" + objrow.toString();
                        } else {
                            objid = "ctl" + objrow.toString();
                        }
                        objid = objtable.id + "_" + objid + objcolumn;
                        var newObj = document.getElementById(objid);
						if (newObj != null) {
							while (newObj.readOnly) {
								if (key == 38) {
									objrow = objrow - 1;
								} else {
									objrow = objrow + 1;
								}
								if (objrow < 10) {
									objid = "ctl0" + objrow.toString();
								} else {
									objid = "ctl" + objrow.toString();
								}
								objid = objtable.id + "_" + objid + objcolumn;
								newObj = document.getElementById(objid);
								if (newObj == null) {
									break;
								}
							}
						}
                        if (newObj) {
                            newObj.focus();
							if (newObj.getAttribute("type") == "text") {
								newObj.select();                                
                            }
                        }
						else
						{
							obj.focus();						
						}
                    }

                    break;
                default:
                    return;
            }
            return false;
        }
    
	    var ctlobj = document.getElementById(objid)
        var elements = ctlobj.getElementsByTagName('input')
        for (var e = 0; e < elements.length; e++) {
            if (elements[e].getAttribute("type") == "text") {
                elements[e].addEventListener("keydown", asKeyDownCtrl2, false);
            }
        }
	
	}
}
function asKeyCtrl(objid) {
    if (document.getElementById(objid) != null) {
        function asKeyDownCtrl1(e) {
            var key = (e) ? e.which : event.keyCode;
            var obj = (e) ? e.target : event.srcElement;

            var objtable;
            var objprevious;
            var objnext;
            var objnode = obj.parentNode;
            while (objnode != null) {
                if (objnode.tagName == "TABLE") {
                    objtable = objnode;
                }
                if (objnode.tagName == "TD") {
                    if (objnode.previousElementSibling!=null)
                    {
                        if(objnode.previousElementSibling.tagName == "TD")
                        {
                            objprevious = objnode.previousElementSibling;
                        }
                    }
                    if (objnode.nextElementSibling !=null)
                    {
                        if(objnode.nextElementSibling.tagName == "TD")
                        {
                            objnext = objnode.nextElementSibling;
                        }
                    }                    
                }                
                objnode = objnode.parentNode;
            }

            var bEnter = false;            
            switch (key) {
                case 13: //Enter							
                    bEnter = true;
                    if (e) {
                        e.preventDefault();
                    }
                    else {
                        event.preventDefault();
                    }
                    break;
                case 37: //←
                    if (e) {
                        e.preventDefault();
                    }
                    else {
                        event.preventDefault();
                    }
                    if (objtable != null && objprevious != null) {
                        var parNode = obj.parentNode;
                        while (parNode.tagName != "TD") {
                            parNode = parNode.parentNode;
                        }
                        var itm = 0;
                        var itmele = parNode.getElementsByTagName('input');
                        for (var ii = 0; ii < itmele.length; ii++) {
                            if (itmele[ii].id == obj.id) {
                                itm = ii;
                            }
                        }
                        var elements = objprevious.getElementsByTagName('input')
	                        if(elements[itm] == null) itm = 0;
							if(elements[itm] != null){
								if (elements[itm].getAttribute("type") == "text") {
									var tar = elements[itm];
									if (!elements[itm].readOnly) {
										elements[itm].focus();
										elements[itm].select();
										break;
									}
									else {
										while (tar.readOnly) {
											if (objprevious.previousElementSibling != null) {
												if (objprevious.previousElementSibling.tagName == "TD") {
													objprevious = objprevious.previousElementSibling;
													if (objtable != null && objprevious != null) {
														var elements = objprevious.getElementsByTagName('input')
														if(elements[itm] != null){
															if (elements[itm].getAttribute("type") == "text") {
																tar = elements[itm];
															}
														}
													}
												}
											}
											else {//回到原來的位置
												tar = obj;
												break;
											}
										}
										tar.focus();
										tar.select();
									}
								}
							}
                    }


                    break;
                case 39: //→
                    if (e) {
                        e.preventDefault();
                    }
                    else {
                        event.preventDefault();
                    }
                    if (objtable != null && objnext != null) {
                        var parNode = obj.parentNode;
                        while (parNode.tagName != "TD") {
                            parNode = parNode.parentNode;
                        }
                        var itm = 0;
                        var itmele = parNode.getElementsByTagName('input');
                        for (var ii = 0; ii < itmele.length; ii++) {
                            if (itmele[ii].id == obj.id) {
                                itm = ii;
                            }
                        }
                        var elements = objnext.getElementsByTagName('input')
                        if(elements[itm] == null) itm = 0;
						if(elements[itm] != null){
							if (elements[itm].getAttribute("type") == "text") {
								var tar = elements[itm];
								if (!elements[itm].readOnly) {
									elements[itm].focus();
									elements[itm].select();
									break;
								}
									else {
										while (tar.readOnly) {
											if (objnext.nextElementSibling != null) {
												if (objnext.nextElementSibling.tagName == "TD") {
													objnext = objnext.nextElementSibling;
													if (objtable != null && objnext != null) {
														var elements = objnext.getElementsByTagName('input')
														if(elements[itm] != null){
															if (elements[itm].getAttribute("type") == "text") {
																tar = elements[itm];
															}
														}
													}
												}
											}
											else {//回到原來的位置
												tar = obj;
												break;
											}
										}
										tar.focus();
										tar.select();
									}
								}
							}
                    }

                    break;
                case 38: //↑
                case 40: //↓
                    if (e) {
                        e.preventDefault();
                    }
                    else {
                        event.preventDefault();
                    }
                    if (objtable != null) {
                        var objid = obj.id;
                        objid = objid.replace(objtable.id + "_", "");
                        var objcolumn = objid.substring(objid.indexOf("_"));
                        objid = objid.replace(objcolumn, "");
                        objid = objid.replace("ctl", "");
                        var objrow = parseInt(objid)
                        if (key == 38) {
                            objrow = objrow - 1;
                        } else {
                            objrow = objrow + 1;
                        }
                        if (objrow < 10) {
                            objid = "ctl0" + objrow.toString();
                        } else {
                            objid = "ctl" + objrow.toString();
                        }
                        objid = objtable.id + "_" + objid + objcolumn;
                        var newObj = document.getElementById(objid);
                        if (newObj != null) {
                            while (newObj.readOnly) {
                                if (key == 38) {
                                    objrow = objrow - 1;
                                } else {
                                    objrow = objrow + 1;
                                }
                                if (objrow < 10) {
                                    objid = "ctl0" + objrow.toString();
                                } else {
                                    objid = "ctl" + objrow.toString();
                                }
                                objid = objtable.id + "_" + objid + objcolumn;
                                newObj = document.getElementById(objid);
                                if (newObj == null) {
                                    break;
                                }
                            }
                            if (newObj) {
                                newObj.focus();
                                if (newObj.getAttribute("type") == "text") {
                                    newObj.select();
                                }
                            }
                        }
                        if (newObj) {
                            newObj.focus();
                        }
						else
						{
							obj.focus();						
						}
                    }

                    break;
                default:
                    return;
            }
            return false;
        }

        var ctlobj = document.getElementById(objid)
        var elements = ctlobj.getElementsByTagName('input')
        for (var e = 0; e < elements.length; e++) {
            if (elements[e].getAttribute("type") == "text") {
                elements[e].addEventListener("keydown", asKeyDownCtrl1, false);
            }
        }
    }
}
function asKeyEnterCtrl(objid) {
    if (document.getElementById(objid) != null) {
        function asKeyDownCtrl3(e) {
            var key = (e) ? e.which : event.keyCode;
            var obj = (e) ? e.target : event.srcElement;

            var objtable;
            var objprevious;
            var objnext;
            var objnode = obj.parentNode;
            while (objnode != null) {
                if (objnode.tagName == "TABLE") {
                    objtable = objnode;
                }
                if (objnode.tagName == "TD") {
                    if (objnode.previousElementSibling != null) {
                        if (objnode.previousElementSibling.tagName == "TD") {
                            objprevious = objnode.previousElementSibling;
                        }
                    }
                    if (objnode.nextElementSibling != null) {
                        if (objnode.nextElementSibling.tagName == "TD") {
                            objnext = objnode.nextElementSibling;
                        }
                    }
                }
                objnode = objnode.parentNode;
            }

            var bEnter = false;
            switch (key) {
                case 13: //Enter							
                    bEnter = true;
                    if (e) {
                        e.returnValue = false;
                        e.cancelBubble = true;
                        e.preventDefault();
                    }
                    else {
                        event.returnValue = false;
                        event.cancelBubble = true;
                        event.preventDefault();
                    }
                    if (objtable != null) {
                        var objid = obj.id;
                        objid = objid.replace(objtable.id + "_", "");
                        var objcolumn = objid.substring(objid.indexOf("_"));
                        objid = objid.replace(objcolumn, "");
                        objid = objid.replace("ctl", "");
                        var objrow = parseInt(objid)
                        objrow = objrow + 1;
                        if (objrow < 10) {
                            objid = "ctl0" + objrow.toString();
                        } else {
                            objid = "ctl" + objrow.toString();
                        }
                        objid = objtable.id + "_" + objid + objcolumn;
                        var newObj = document.getElementById(objid);
                        if (newObj != null) {
                            while (newObj.readOnly) {
                                objrow = objrow + 1;
                                if (objrow < 10) {
                                    objid = "ctl0" + objrow.toString();
                                } else {
                                    objid = "ctl" + objrow.toString();
                                }
                                objid = objtable.id + "_" + objid + objcolumn;
                                newObj = document.getElementById(objid);
                                if (newObj == null) {
                                    break;
                                }
                            }
                            if (newObj) {
                                newObj.focus();
                                if (newObj.getAttribute("type") == "text") {
                                    newObj.select();
                                }
                            }
                        }
                        if (newObj) {
                            newObj.focus();
                            if (newObj.getAttribute("type") == "text") {
                                newObj.select();
                            }
                        }
                    }
                    break;
                
                default:
                    return;
            }
            return false;
        }

        var ctlobj = document.getElementById(objid)
        var elements = ctlobj.getElementsByTagName('input')
        for (var e = 0; e < elements.length; e++) {
            if (elements[e].getAttribute("type") == "text") {
                elements[e].addEventListener("keydown", asKeyDownCtrl3, false);
            }
        }

    }
}
function asKeyColumnCtrl(objid){
    if (document.getElementById(objid) != null) {
        function asKeyDownCtrl4(e) {
			var key = (e) ? e.which : event.keyCode;
            var obj = (e) ? e.target : event.srcElement;

            var objtable;
            var objprevious;
            var objnext;
            var objnode = obj.parentNode;
            while (objnode != null) {
                if (objnode.tagName == "TABLE") {
                    objtable = objnode;
                }
                if (objnode.tagName == "TD") {
                    if (objnode.previousElementSibling!=null)
                    {
                        if(objnode.previousElementSibling.tagName == "TD")
                        {
                            objprevious = objnode.previousElementSibling;
                        }
                    }
                    if (objnode.nextElementSibling !=null)
                    {
                        if(objnode.nextElementSibling.tagName == "TD")
                        {
                            objnext = objnode.nextElementSibling;
                        }
                    }                    
                }                
                objnode = objnode.parentNode;
            }

            var bEnter = false;            
            switch (key) {
                case 33: //Page Up
                case 34: //Page Down
                    if (e) {
                        e.preventDefault();
                    }
                    else {
                        event.preventDefault();
                    }
                    break;
                case 13: //Enter							
                    bEnter = true;
                    if (e) {
						e.returnValue = false;
                        e.cancelBubble = true;
                        e.preventDefault();
                    }
                    else {
						event.returnValue = false;
                        event.cancelBubble = true;
                        event.preventDefault();
                    }
					if (objtable != null) {
                        var objid = obj.id;
                        objid = objid.replace(objtable.id + "_", "");
                        var objcolumn = objid.substring(objid.indexOf("_"));
                        objid = objid.replace(objcolumn, "");
                        objid = objid.replace("ctl", "");
                        var objrow = parseInt(objid)

						objrow = objrow + 1;
                        if (objrow < 10) {
                            objid = "ctl0" + objrow.toString();
                        } else {
                            objid = "ctl" + objrow.toString();
                        }
                        objid = objtable.id + "_" + objid + objcolumn;
                        var newObj = document.getElementById(objid);
                        if (newObj != null) {
                            while (newObj.readOnly) {
                                objrow = objrow + 1;
                                if (objrow < 10) {
                                    objid = "ctl0" + objrow.toString();
                                } else {
                                    objid = "ctl" + objrow.toString();
                                }
                                objid = objtable.id + "_" + objid + objcolumn;
                                newObj = document.getElementById(objid);
                                if (newObj == null) {
                                    break;
                                }
                            }
                            if (newObj) {
                                newObj.focus();
                                if (newObj.getAttribute("type") == "text") {
                                    newObj.select();
                                }
                            }
                        }
                    }
                    break;
                case 38: //↑
                case 40: //↓
                    if (e) {
                        e.returnValue = false;
                        e.cancelBubble = true;
                        e.preventDefault();
                    }
                    else {
                        event.returnValue = false;
                        event.cancelBubble = true;
                        event.preventDefault();
                    }
                    if (objtable != null) {
                        var objid = obj.id;
                        objid = objid.replace(objtable.id + "_", "");
                        var objcolumn = objid.substring(objid.indexOf("_"));
                        objid = objid.replace(objcolumn, "");
                        objid = objid.replace("ctl", "");
                        var objrow = parseInt(objid)
                        if (key == 38) {
                            objrow = objrow - 1;
                        } else {
                            objrow = objrow + 1;
                        }
                        if (objrow < 10) {
                            objid = "ctl0" + objrow.toString();
                        } else {
                            objid = "ctl" + objrow.toString();
                        }
                        objid = objtable.id + "_" + objid + objcolumn;
                        var newObj = document.getElementById(objid);
						if (newObj != null) {
							while (newObj.readOnly) {
								if (key == 38) {
									objrow = objrow - 1;
								} else {
									objrow = objrow + 1;
								}
								if (objrow < 10) {
									objid = "ctl0" + objrow.toString();
								} else {
									objid = "ctl" + objrow.toString();
								}
								objid = objtable.id + "_" + objid + objcolumn;
								newObj = document.getElementById(objid);
								if (newObj == null) {
									break;
								}
							}
						}
                        if (newObj) {
                            newObj.focus();
							if (newObj.getAttribute("type") == "text") {
								newObj.select();                                
                            }
                        }
						else
						{
							obj.focus();						
						}
                    }

                    break;
                default:
                    return;
            }
            return false;
        }
    
	    var ctlobj = document.getElementById(objid)
        var elements = ctlobj.getElementsByTagName('input')
        for (var e = 0; e < elements.length; e++) {
            if (elements[e].getAttribute("type") == "text") {
                elements[e].addEventListener("keydown", asKeyDownCtrl4, false);
            }
        }
	
	}
}

function show_help(sApiFullName,sPageID)
{
    //呼叫API       
    if (sPageID=="ASSSO")
    {
        var iframeobj = document.getElementById('iframecontent');
	var sSys;
        if (iframeobj)
        {
            //wayne 20221006
            var pageuri = iframeobj.contentDocument.documentURI;
            sPageID = ascheckPageID(pageuri);
            sPageID = ascheckHTML(sPageID);
            sSys = ascheckSYS(pageuri);
            sSys = ascheckHTML(sSys);
        }
    }

    //var paramdata = new Array();
    //paramdata[0] = "PageID||" + sPageID;
	//if(sSys.lenght>0) paramdata[1] = "Sys||" + sSys;
    //var PostAsJsonObj = SetAsJsonObj('參數檔', 'key,value', null, null, null, paramdata);   
    var helppage;
    var client;
    if (window.XMLHttpRequest) {
        client = new XMLHttpRequest();
    }
    else if (window.ActiveXObject) {
        try {
            client = new ActiveXObject("Msxml2.XMLHTTP");
        }
        catch (e) {
            try {
                client = new ActiveXObject("Microsoft.XMLHTTP");
            }
            catch (e) {
                //var ss = document.getElementById('search_suggest');
                //ss.innerHTML = '<b><font color="red" size="6">您的瀏灠器不支援AJAX功能，請升級或使用其它的瀏灠器!!</font></b>';
                //ss.style.visibility = 'visible';
                //var width = (window.innerWidth) ? window.innerWidth : document.body.clientWidth;
                //var objectWidth = 800;
                //var newLocation = (width - objectWidth) / 2;
                //if (newLocation < 0) newLocation = 0;
                //ss.style.left = newLocation + 'px';
                //var height = (window.innerHeight) ? window.innerHeight : document.documentElement.clientHeight;
                //var objectHeight = 80;
                //var newLocation = (height - objectHeight) / 2;
                //if (newLocation < 0) newLocation = 50;
                //ss.style.top = newLocation + 'px';
                ss.style.position = 'absolute';
            }
        }
        client = new ActiveXObject("Microsoft.XMLHTTP");
    }
    client.onreadystatechange = function () {
        try {
            if (client.readyState == 4 && client.status == 200) {
                helppage = client.responseText;
            }
        }
        catch (e) {
        }
    }
    //client.open("POST", encodeURI(sApiFullName), false);
    client.open("POST", encodeURI('asHelp.ashx'), false);
    try {
        //client.send(PostAsJsonObj);
        var paramdatas = "PageID=" + sPageID;
        if (sSys.length > 0) paramdatas += "&Sys=" + sSys;
        client.send(paramdatas);
    }
    catch (e) { }

    var content = "<html><head><title>操作說明</title><link href='Styles/asHelp.css' type='text/css' rel='stylesheet'></head>";
    var topobj = document.getElementById("toptitle");
    var helptop = 0
    var helpleft = 0    
    if (topobj)
    {
        helptop = topobj.offsetTop;
        helpleft = topobj.offsetLeft;
    }
    //if (helppage)
    //{
    //    if (helppage.length!=0)
    //    {
			
    //        content += "<body>"
			//content += "<style>"
			//content += "input:checked + label{padding: 5px 25px 0px 15px;border-radius: 8px 8px 0 0;color: #ffffff;background-color: #83b6d2;border-top: 2px solid rgb(132, 182, 210);border-left: 2px solid rgb(132, 182, 210);border-right: 2px solid rgb(132, 182, 210);border-bottom: 2px solid rgb(131, 182, 210);}"
			//content += "input + label{padding: 5px 25px 0px 15px;border-radius: 8px 8px 0 0;color: #000000;background-color: #f3f3f3;border-top: 2px solid #adadad;border-left: 2px solid #adadad;border-right: 2px solid #adadad;border-bottom: 2px solid rgb(131, 182, 210);}"
			//content += "#asPageButtom{border-bottom: 2px solid #84b6d2;float: left;}";
			//content += ".pagediv {float: left;position: relative;}";
			//content += ".classDel::after, .classDel::before{content: '';position: absolute;top: 6px;float: right;right: 3px;width: 15px;height: 3px;border-radius: 20px;background: rgb(138 146 150);}";
			//content += ".classDel::after{transform: rotate(-45deg);-o-transform: rotate(-45deg);-ms-transform: rotate(-45deg);-moz-transform: rotate(-45deg);-webkit-transform: rotate(-45deg);}";
			//content += ".classDel::before{transform: rotate(45deg);-o-transform: rotate(45deg);-ms-transform: rotate(45deg);-moz-transform: rotate(45deg);-webkit-transform: rotate(45deg);}";
			//content += "</style>"
			//content += "<div id=asHelp><div id=asPageButtom></div><div id=asPagediv></div></div></body>";
	//		content += "<div id=asHelp><div id=asPageButtom></div><div id=asPagediv><p>建置中</p></div><iframe id='asPage' style='width: 99vw;height: 95%;' frameborder='no'></iframe></body>";
    //    }
			
    //}
	//else {
    //    content += "<body>"
    //    content += "<div id=err><p>建置中</p></div></body>";
    //}	
	//20210827_依平_資料庫沒有資料，抓畫面標題
	if(helppage)
	{
		if(helppage.length == 0){
			var astitlename = iframeobj.contentDocument.getElementById('titlename');
			if(astitlename){
				helppage=astitlename.innerText + "||";
			}
		}
	}
	else{
		var astext = "";
		if(iframeobj){
			var astitlename = iframeobj.contentDocument.getElementById('titlename');
			if(astitlename){
				astext=astitlename.innerText;
			}
		}
		helppage = astext+"||";
	}
	//20210827_依平_不論有沒有資料都要建立框
	content += "<body>"
	content += "<div id=asHelp><div id=asPageButtom></div><div id='asPagediv' style='width: 99vw;height: 95%;float: left;text-align: center;/*background: #464343;*/'><img src='../images/新校務建置中_檔案建置中.png' alt='建置中'></div><iframe id='asPage' style='width: 99vw;height: 95%;' frameborder='no'></iframe></body>";
    content += "</html>";
    //var HelpWin = window.open('', '操作說明', 'width=800,height=600,top=' + helptop + ',left=' + helpleft + ',scrollbars=yes,titlebar=no');
    var HelpWin = window.open('', '操作說明', '');
    //HelpWin.document.write(content);
    HelpWin.focus();   
	
	if(!HelpWin.document.getElementById('asHelp')){		
		HelpWin.document.write(content);
	}
	
	if(!HelpWin.document.getElementById('tab'+sPageID)){
		if(helppage)
		{
			if (helppage.length!=0)
			{	
		    //判斷如果有錯誤訊息顯示的建置中將其刪除 20210826 建叡
			var err ;
			if(HelpWin.document.getElementById('err') != null){
			err = HelpWin.document.getElementById('err');
			err.parentNode.removeChild(err);
			}
			//20210827_依平_有資料將建置中隱藏，iframe顯示 
			var asPagediv = HelpWin.document.getElementById('asPagediv');
			if(asPagediv){
				asPagediv.style.display="none";
			}
			var asiframe = HelpWin.document.getElementById('asPage');
			if(asiframe){
				asiframe.style.display="block";
			}
			
			
			var str = helppage.split('||');
			
			var asRblPage = document.createElement('input');
			asRblPage.setAttribute('type', 'radio');
			asRblPage.setAttribute('name','choice');
			asRblPage.setAttribute('id', 'tab'+sPageID);
			asRblPage.setAttribute('value', sPageID);
			asRblPage.style.display = 'none';
		
		
		
			if(str[1].length > 0)
			{
				asRblPage.setAttribute('onclick', "document.getElementById('asPage').src='"+str[1]+"';document.getElementById('asPage').style.display='block';document.getElementById('asPagediv').style.display='none';var objtab = document.getElementsByName('tabPanel');for(var sPanel = 0; sPanel < objtab.length;sPanel++){objtab[sPanel].style.display='none';document.getElementById('asPage').style.display='block';}");
				
				//var pdfstr = str[1].replace('data:application/pdf;base64,','');
				//var byteCharacters = atob(pdfstr);			
				//var byteArrays = [];
				//for (let offset = 0; offset < byteCharacters.length; offset += 512) {
					//var slice = byteCharacters.slice(offset, offset + 512);
					//var byteNumbers = new Array(slice.length);
					//for (let i = 0; i < slice.length; i++) {
				  	//byteNumbers[i] = slice.charCodeAt(i);
					//}
					//var byteArray = new Uint8Array(byteNumbers);
					//byteArrays.push(byteArray);
			  	//}
				//var aspdfBlob = new Blob(byteArrays, {type:'application/pdf'});
				//var aspdfUrl = URL.createObjectURL(aspdfBlob);
				//asRblPage.setAttribute('onclick', "document.getElementById('asPage').src='"+aspdfUrl+"';document.getElementById('asPage').style.display='block';document.getElementById('asPagediv').style.display='none';var objtab = document.getElementsByName('tabPanel');for(var sPanel = 0; sPanel < objtab.length;sPanel++){objtab[sPanel].style.display='none';document.getElementById('asPage').style.display='block';}");
			}
			else{
				asRblPage.setAttribute('onclick', "document.getElementById('asPage').style.display='none';document.getElementById('asPagediv').style.display='block';var objtab = document.getElementsByName('tabPanel');for(var sPanel = 0; sPanel < objtab.length;sPanel++){objtab[sPanel].style.display='none';document.getElementById('asPage').style.display='block';}");
			}
			
			var asLabelPage = document.createElement('label');
			asLabelPage.setAttribute('class', 'tab');
			asLabelPage.setAttribute('for','tab'+sPageID);
			//asLabelPage.innerText=sobjtmp.innerText.trim();
			asLabelPage.innerText=str[0];
			var asClassPage = document.createElement("div");
			asClassPage.setAttribute("onclick", "let nPage = document.getElementById('page"+sPageID+"').nextElementSibling;let lPage = document.getElementById('page"+sPageID+"').previousElementSibling;if(nPage){nPage.children[0].click();}else if(lPage){lPage.children[0].click();}else{window.close();}let node = document.getElementById('page"+sPageID+"');if(node.parentNode){node.parentNode.removeChild(node);}");
			asClassPage.className = 'classDel';
			
			var asPage = document.createElement("div");
			asPage.setAttribute('class', 'pagediv');
			asPage.setAttribute('id', 'page'+sPageID);
			
			asPage.appendChild(asRblPage);
			asPage.appendChild(asLabelPage);
			asPage.appendChild(asClassPage);
			HelpWin.document.getElementById('asPageButtom').appendChild(asPage);
			
			
			
			
			//HelpWin.document.getElementById('asPageButtom').appendChild(asRblPage);
			//HelpWin.document.getElementById('asPageButtom').appendChild(asLabelPage);
			//HelpWin.document.getElementById('asPageButtom').appendChild(asClassPage);
			asRblPage.click();
			}
		}
		else {
			//20210827_依平_沒有資料也沒有標題，建立一個空的選項把建置中顯示出來，顯示完把選項移除
			var asiframe = HelpWin.document.getElementById('asPage');
			if(asiframe){
				asiframe.style.display="none";
			}
			var asPagediv = HelpWin.document.getElementById('asPagediv');
			if(asPagediv){
				asPagediv.style.display="block";
			}
			var asRblPage = HelpWin.document.getElementById('tab0');
			if(asRblPage == null){
				asRblPage = document.createElement('input');
				asRblPage.setAttribute('type', 'radio');
				asRblPage.setAttribute('name','choice');
				asRblPage.setAttribute('id', 'tab0');
				asRblPage.style.display = 'none';
				
				var asPage = document.createElement("div");
				asPage.setAttribute('class', 'pagediv');
				asPage.setAttribute('id', 'page0');
			
				asPage.appendChild(asRblPage);
				
				HelpWin.document.getElementById('asPageButtom').appendChild(asPage);
			}
			asRblPage.click();
			var aspage0=HelpWin.document.getElementById('page0');
			if(aspage0){
				aspage0.parentNode.removeChild(aspage0);
			}
		}
	}
	else{
		HelpWin.document.getElementById('tab'+sPageID).click();
	}
}

function setascblchange(obj) {
    var cblid = obj.getElementsByTagName("input")[0].id.substr(0, obj.getElementsByTagName("input")[0].id.lastIndexOf("_"));
    var index = obj.getElementsByTagName("input")[0].id.substr(obj.getElementsByTagName("input")[0].id.lastIndexOf("_") + 1);
    var cbl_cb = document.getElementById(cblid).getElementsByTagName("input");

    if (index == "0") {
        for (var i = 0; i < cbl_cb.length; i++) {
            cbl_cb[i].checked = obj.getElementsByTagName("input")[0].checked;
        }
    }
    else {
        var alltrue = true;
        for (var i = 1; i < cbl_cb.length; i++) {
            if (cbl_cb[i].checked == false) {
                alltrue = false;
                break;
            }
        }

        document.getElementById(cblid + "_0").checked = alltrue;
    }
}

function showsetdiv(obj, targetobj) {
    var objid = obj.id;
    var setDiv = document.getElementById(objid + "_set");
    if (setDiv) {
        setDiv.style.display = "none";
    } else {
        var setDiv = document.createElement("div");
        setDiv.id = objid + "_set";
        setDiv.style.display = "none";
        obj.parentElement.appendChild(setDiv);      
    }
    setDiv.innerHTML = as_setgrd(objid, targetobj);
    setDiv.style.display = "";
    obj.style.display = "none";
}
function as_setgrd(objid, targetobj) {
    var str_buffer = new String(
    "<input id=\"" + objid + "_txt\" name=\"" + objid + "_txt\" type=\"text\" size=\"10\" class=\"ctrltext\" placeholder=\"請輸入\" onkeypress=\"if (event.keyCode == 13){var setvalue=document.getElementById('" + objid + "_txt').value;setasgrdtxt(setvalue, " + objid + ",'" + targetobj + "');return false;}\" >" +
    "<button id=\"\" onclick=\"var setvalue=document.getElementById('" + objid + "_txt').value;setasgrdtxt(setvalue, " + objid + ",'" + targetobj + "');return false;\">全部設定</button>" +    
    "<button id=\"\" onclick=\"clearasgrdtxt(" + objid + ",'" + targetobj + "');return false;\">全部清除</button>");    
    return str_buffer;
}
function setasgrd(obj, targetobj) {
    if (obj) 
    {
        var objid = obj.id;
        var objtype = obj.type;
        var objtag = obj.tagName;
        var objparent = obj.parentElement;
        var objclassname = obj.className;

        var objvalue ;
        if (obj.parentElement==null)
        {
            return;
        }

        while (objparent) {
            objparent = objparent.parentElement;
            if (objparent.tagName == "TABLE") {
                break;
            }
            if (objparent.parentElement == null) {
                break;
            }
        }

        if (objtag == "INPUT") {
            if (objtype == "checkbox") 
            {
                objvalue = obj.checked;
            }           
            var showtxt = '';
            if (objtype == "hidden" && objid.indexOf("_hfcblvalue") != -1) {
                var showobj = document.getElementById(objid.replace("_hfcblvalue", "_hshow"));
                showtxt = showobj.innerHTML;
                objvalue = obj.value;
            }

            var elements = objparent.getElementsByTagName(objtag)
            for (var e = 0; e < elements.length; e++) {
                if (elements[e].getAttribute("type") == objtype) {
                    var eleid = elements[e].id;
                    if (eleid.indexOf(targetobj) != -1)
                    {
                        if (objtype == "checkbox" && elements[e].getAttribute("disabled") != "disabled") {
                            elements[e].checked = objvalue;
                        }
						if (objtype == "hidden" && eleid.indexOf("_hfcblvalue") != -1)
                        {
                            elements[e].value = objvalue;
                            var showele = document.getElementById(eleid.replace("_hfcblvalue", "_hshow"));
                            showele.innerHTML = showtxt;
                        }

                    }
                }
            }
        }
        else 
        {
            if (objtag == "DIV")
            {
                var divChk = obj.getElementsByClassName("ascblMulti");
                if ((divChk.length > 0) && (document.getElementById(objid + '_cbl') != null)) 
                {
                    var setRef = document.getElementById(objid + '_cbl');
                    var setelements = setRef.getElementsByTagName('input');
                    objvalue = "";
                    for (var e = 0; e < setelements.length; e++) {
                        if (setelements[e].checked) {
                            if (objvalue.length > 0) objvalue = objvalue + ',';
                            objvalue += setelements[e].id.substring(setelements[e].id.lastIndexOf('_')).toString();
                        }
                        //s = s + elements[e].labels[0].innerText.toString().trim();
                    }
 
                    var elements = document.getElementsByClassName("ascblMulti")
                    for (var e = 0; e < elements.length; e++) {
                        if (elements[e] == divChk[0]){
                            continue;
                        }
                        var eleid = elements[e].id;
                        var parentid = elements[e].parentElement.id;
                        if ((document.getElementById(parentid + '_cbl') != null) && (eleid.indexOf(targetobj) != -1)) {
                            var s = '';
                            var h = '';
                            var divRef = document.getElementById(parentid + '_cbl');
                            var lblRef = document.getElementById(eleid.replace('_cblMulti2', '_hshow'));
                            var hdlRef = document.getElementById(eleid.replace('_cblMulti2', '_hdcheck'));
                            var tarelements = divRef.getElementsByTagName('input');

                            var h = objvalue.replace(new RegExp(",", "g"), "$|");
                            if (h.length > 0) {
                                var re = new RegExp(h + '$');
                                for (var t = 0; t < tarelements.length; t++) {
                                    if (re.exec(tarelements[t].id.replace(new RegExp(" ", "g"), "")) != null) {
                                        tarelements[t].checked = true;
                                        if (s.length > 0) s = s + ',';
                                        s = s + tarelements[t].labels[0].innerText.toString().trim();
                                    }
                                }
                            }
                            else {
                                for (var t = 0; t < tarelements.length; t++) {
                                    tarelements[t].checked = false;
                                }
                            }
                            divRef.parentNode.title = s;
                            lblRef.innerHTML = s;
                            lblRef.innerText = s;
                            hdlRef.value = objvalue;
                        }
                    }                  
                }
            }

            if (objtag == "TABLE")
            {                
                var trobj = obj.children[0].children[0];
                var tdelements = trobj.getElementsByTagName("INPUT")
                for (var e = 0; e < tdelements.length; e++) {
                    if (tdelements[e].getAttribute("type") == "radio") {
                        if(tdelements[e].checked)
                        {
                            objvalue = tdelements[e].value;
                        }
                    }
                }
                if (objvalue != null) {
                    var elements = objparent.getElementsByTagName("INPUT")
                    for (var e = 0; e < elements.length; e++) {
                        if (elements[e].getAttribute("type") == "radio") {
                            var eleid = elements[e].id;
                            if (eleid.indexOf(targetobj) != -1) {
                                if (elements[e].getAttribute("disabled") != "disabled" || elements[e].getAttribute("disabled") == null) {
                                    if (elements[e].value == objvalue)
                                    {
                                        elements[e].checked = "checked";
                                    };
                                }
                            }
                        }
                    }


                }
            }

            if (objtag == "SELECT")
            {
                var seelements = obj.getElementsByTagName("option")
                for (var e = 0; e < seelements.length; e++) {
                    if (seelements[e].selected) {
                        objvalue = seelements[e].value;
                    }
					if (objvalue != null) {
						var elements = objparent.getElementsByTagName(objtag)
						for (var e2 = 0; e2 < elements.length; e2++) {
							var eleid = elements[e2].id;
							if (eleid.indexOf(targetobj) != -1) {
								if (objtype == "select-one" && elements[e2].getAttribute("disabled") != "disabled") {
									var opelements = elements[e2].getElementsByTagName("option")
									for (var ope = 0; ope < opelements.length; ope++) {
										if (opelements[ope].value == objvalue) {
											opelements[ope].selected = "selected";
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
function setasgrdtxt(objvalue, obj, targetobj) {
    if (obj!=null && objvalue!=null) {
        if (objvalue.length>0) {
            var objparent = obj.parentElement;
            if (obj.parentElement == null) {
                return;
            }
            while (objparent) {
                objparent = objparent.parentElement;
                if (objparent.tagName == "TABLE") {
                    break;
                }
                if (objparent.parentElement == null) {
                    break;
                }
            }

            var elements = objparent.getElementsByTagName("INPUT")
            for (var e = 0; e < elements.length; e++) {
                if (elements[e].getAttribute("type") == "text") {
                    var eleid = elements[e].id;
                    if (eleid.indexOf(targetobj) != -1) {
                        elements[e].value = objvalue;
                    }
                }
            }
        }

        var objid = obj.id;
        var setDiv = document.getElementById(objid + "_set");
        if (setDiv) {
            setDiv.style.display = "none";
        }
        obj.style.display = "";
    }
}
function clearasgrdtxt(obj, targetobj) {
    if (obj != null) {
      
        var objparent = obj.parentElement;
        if (obj.parentElement == null) {
            return;
        }
        while (objparent) {
            objparent = objparent.parentElement;
            if (objparent.tagName == "TABLE") {
                break;
            }
            if (objparent.parentElement == null) {
                break;
            }
        }

        var elements = objparent.getElementsByTagName("INPUT")
        for (var e = 0; e < elements.length; e++) {
            if (elements[e].getAttribute("type") == "text") {
                var eleid = elements[e].id;
                if (eleid.indexOf(targetobj) != -1) {
                    elements[e].value = null;
                }
            }
        }
        
        var objid = obj.id;
        var setDiv = document.getElementById(objid + "_set");
        if (setDiv) {
            setDiv.style.display = "none";
        }
        obj.style.display = "";
    }
}

function asSetOrder(obj,tarobjid,osort,otype)
{
    var tarobj = document.getElementById(tarobjid);
    var oclassname = obj.className;
    var uobj = document.getElementById(tarobjid + '_U');
    var uclassname = uobj.className;
    var dobj = document.getElementById(tarobjid + '_D');
    var dclassname = dobj.className;
    var upobjs = document.getElementsByClassName("tblSortUp");
    {
        for (var u = 0; u < upobjs.length; u++) {
            upobjs[u].className = "tblSortUpNon";
        }
    }
    var dwnobjs = document.getElementsByClassName("tblSortDwn");
    {
        for (var d = 0; d < dwnobjs.length; d++) {
            dwnobjs[d].className = "tblSortDwnNon";
        }
    }
    
    if (otype == '') {
        if (uclassname.indexOf('Non') != -1 && dclassname.indexOf('Non') != -1) {
            uobj.className = "tblSortUp";
            otype = 'U';
        }
        else
        {
            if (uclassname.indexOf('Non') != -1) {
                uobj.className = uclassname.replace('Non', '');
                otype = 'U';
            } else {
                uobj.className = uclassname + 'Non';
            }
            if (dclassname.indexOf('Non') != -1) {
                dobj.className = dclassname.replace('Non', '');
                otype = 'D';
            } else {
                dobj.className = dclassname + 'Non';
            }
        }
    } else {
        var nclassname = '';
        if (otype == 'U') {
            nclassname = "tblSortUp";
        } else {
            nclassname = "tblSortDwn";
        }
        obj.className = nclassname;
    }

    tarobj.setAttribute('asOrder', otype);
    
    var objparent = tarobj.parentElement;
    if (objparent != null) {
        while (objparent) {
            objparent = objparent.parentElement;
            if (objparent.tagName == "TABLE") {
                break;
            }
            if (objparent.parentElement == null) {
                break;
            }
        }
    }

    __doPostBack('asSr$' + objparent.id , 'Sort$' + osort + '$' + otype);

}


function showAssearch(obj){
    function asAssearchKeyCtrl(e) {
        var key = (e) ? e.which : event.keyCode;
        var obj = (e) ? e.target : event.srcElement;       
        var bEnter = false;
        switch (key) {
            case 13: //Enter							
                bEnter = true;
                if (e) {
                    e.preventDefault();
                }
                else {
                    event.preventDefault();
                }
               
                while (obj_parent.parentNode!=null) {
                    if (obj_parent.className.indexOf("srhContent") > 0) {
                        isStd = true;
                        break;
                    }
                    obj_parent = obj_parent.parentNode;
                }
                var objbtn = document.getElementById(obj_parent.id + '_btnsearch');
                objbtn.onclick();
                break;
            default:
                return;
        }
        return false;
    }

    if (!obj) return;

    var Filterstr = '';
    var Filterdata = '';
    var Filtertitle = '';
    var elements = obj.getElementsByClassName("asCaptionV")
    for (var e = 0; e < elements.length; e++) {
        //尋找elements[e]是否包在class=pick_cls_std的div裡(學生元件)，當找到id=asSearch_bar就停止尋找
        var obj_parent = elements[e].parentNode;
        var isStd = false;

        while (obj_parent.id.indexOf("_bar") == -1) {
            if (obj_parent.className.indexOf("pick_cls_std") > 0) {
                isStd = true;
                break;
            }
            obj_parent = obj_parent.parentNode;
        }

        if (isStd) continue;
        var Captions = elements[e].getElementsByTagName("span")
        if(Captions)
        {
			if(Captions.length>0){
            if (Captions[0].innerText) {
                if (Captions[0].innerText.length != 0) {
                    Filterdata = '';
                    var objparent = elements[e].parentElement;
                    var contentsV = objparent.getElementsByClassName("asContentV")
                    for (var ec = 0; ec < contentsV.length; ec++) {
                        var check = contentsV[ec].getElementsByClassName("asContentV")
                        if (check.length == 0) {
                            var ecinputs = contentsV[ec].getElementsByTagName("INPUT")
                            for (var eci = 0; eci < ecinputs.length; eci++) {
                                if (ecinputs[eci].getAttribute("type") == "text") {
                                    //執行搜尋
                                    ecinputs[eci].addEventListener("keydown", asAssearchKeyCtrl, false);

                                    if (ecinputs[eci].value.length != 0) {
                                        if (Filterdata.length > 0) Filterdata += "_";

                                        var isDate = ecinputs[eci].getAttribute("asdatetype");
                                        if (isDate != null) {
                                            Filterdata += ecinputs[eci].value + showAssearch_week(ecinputs[eci].value, isDate);
                                        }
                                        else {
                                            Filterdata += ecinputs[eci].value;
                                        }
                                    }
                                }
                                if (ecinputs[eci].getAttribute("type") == "radio") {
                                    if (ecinputs[eci].checked) {
                                        var lb = ecinputs[eci].nextElementSibling;
                                        if (Filterdata.length > 0) Filterdata += "_";
                                        Filterdata += lb.innerText;
                                    }
                                }
                                if (ecinputs[eci].getAttribute("type") == "checkbox") {
                                    if (ecinputs[eci].checked) {
                                        var lb = ecinputs[eci].nextElementSibling;
                                        if (lb) {
                                            if (lb.getAttribute("for") == ecinputs[eci].id) {
                                                if (Filterdata.length > 0) Filterdata += "_";
                                                Filterdata += lb.innerText;
                                            }
                                            else {
                                                Filterdata += "v";
                                            }
                                        }
                                        else {
                                            Filterdata += "v";
                                        }
                                       
                                    }
                                }
                            }
                            var ecselects = contentsV[ec].getElementsByTagName("SELECT")
                            for (var ecs = 0; ecs < ecselects.length; ecs++) {
                                if (ecselects[ecs].value.length != 0) {
                                    if (Filterdata.length > 0) Filterdata += "_";
                                    var ecoptions = ecselects[ecs].getElementsByTagName("OPTION");
                                    for (var eco = 0; eco < ecoptions.length; eco++) {
                                        if (ecoptions[eco].selected) {
                                            Filterdata += ecoptions[eco].innerText;
                                        }
                                    }
                                    //if (ecinputs[eci].getAttribute("type") == "text") {
                                    //    if (ecinputs[eci].value.length != 0) {
                                    //        Filterdata += ecinputs[eci].value;
                                    //    }
                                    //}
                                    //for (var e = 0; e < tdelements.length; e++) {
                                    //    if (tdelements[e].getAttribute("type") == "radio") {
                                    //        if (tdelements[e].checked) {
                                    //            objvalue = tdelements[e].value;
                                    //        }
                                    //    }
                                    //}
                                }
                            }

                        }

                    }
                    var contentsH = objparent.getElementsByClassName("asContentH")
                    for (var ecH = 0; ecH < contentsH.length; ecH++) {
                        var check = contentsH[ecH].getElementsByClassName("asContentH")
                        if (check.length == 0) {
                            var ecinputs = contentsH[ecH].getElementsByTagName("INPUT")
                            for (var eci = 0; eci < ecinputs.length; eci++) {
                                if (ecinputs[eci].getAttribute("type") == "text") {
                                    //執行搜尋
                                    ecinputs[eci].addEventListener("keydown", asAssearchKeyCtrl, false);

                                    if (ecinputs[eci].value.length != 0) {
                                        if (Filterdata.length > 0) Filterdata += "_";

                                        var isDate = ecinputs[eci].getAttribute("asdatetype");
                                        if (isDate != null) {
                                            Filterdata += ecinputs[eci].value + showAssearch_week(ecinputs[eci].value, isDate);
                                        }
                                        else {
                                            Filterdata += ecinputs[eci].value;
                                        }
                                    }
                                }
                                if (ecinputs[eci].getAttribute("type") == "radio") {
                                    if (ecinputs[eci].checked) {
                                        var lb = ecinputs[eci].nextElementSibling;
                                        if (Filterdata.length > 0) Filterdata += "_";
                                        Filterdata += lb.innerText;
                                    }
                                }
                                if (ecinputs[eci].getAttribute("type") == "checkbox") {
                                    if (ecinputs[eci].checked) {
                                        var lb = ecinputs[eci].nextElementSibling;
                                        if (lb) {
                                            if (lb.getAttribute("for") == ecinputs[eci].id) {
                                                if (Filterdata.length > 0) Filterdata += "_";
                                                Filterdata += lb.innerText;
                                            }
                                            else {
                                                Filterdata += "v";
                                            }
                                        }
                                        else {
                                            Filterdata += "v";
                                        }
                                    }
                                }
                            }
                            var ecselects = contentsH[ecH].getElementsByTagName("SELECT")
                            for (var ecs = 0; ecs < ecselects.length; ecs++) {
                                if (ecselects[ecs].value.length != 0) {
                                    if (Filterdata.length > 0) Filterdata += "_";
                                    var ecoptions = ecselects[ecs].getElementsByTagName("OPTION");
                                    for (var eco = 0; eco < ecoptions.length; eco++) {
                                        if (ecoptions[eco].selected) {
                                            Filterdata += ecoptions[eco].innerText;
                                        }
                                    }
                                    //if (ecinputs[eci].getAttribute("type") == "text") {
                                    //    if (ecinputs[eci].value.length != 0) {
                                    //        Filterdata += ecinputs[eci].value;
                                    //    }
                                    //}
                                    //for (var e = 0; e < tdelements.length; e++) {
                                    //    if (tdelements[e].getAttribute("type") == "radio") {
                                    //        if (tdelements[e].checked) {
                                    //            objvalue = tdelements[e].value;
                                    //        }
                                    //    }
                                    //}
                                }
                            }

                        }

                    }
                    if (Filterdata.length != 0) {
                        Filterstr += (Captions[0].innerText) + '(' + Filterdata + ') ';
                        Filtertitle += (Captions[0].innerText) + '(' + Filterdata + ') ';
                    }
                }
            }
			}    
		}		
    }
    /*
    //顯示學生元件資訊
    var Filterdata_Std = '';
    var Filtertitle_Std = '';
    var elements_Std = obj.getElementsByClassName("pick_cls_std")
    for (var e_Std = 0; e_Std < elements_Std.length; e_Std++) {
        //asMstudent1_lab_dept_no 科
        var lab_dept_no = document.getElementById(elements_Std[e_Std].id + "_lab_dept_no");
        if (lab_dept_no != null) {
            if (lab_dept_no.style.display != "none") {
                Filterstr += lab_dept_no.innerText;
                if (lab_dept_no.hasAttribute("title")) {
                    Filtertitle += '科別(' + lab_dept_no.getAttribute("title") + ') ';
                }
            }
        }
        //asMstudent1_lab_grade 年
        var lab_grade = document.getElementById(elements_Std[e_Std].id + "_lab_grade");
        if (lab_grade != null) {
            if (lab_grade.style.display != "none") {
                Filterstr += lab_grade.innerText;
                if (lab_grade.hasAttribute("title")) {
                    Filtertitle += '年級(' + lab_grade.getAttribute("title") + ') ';
                }
            }
        }
        //asMstudent1_lab_class_sname 班
        var lab_class_sname = document.getElementById(elements_Std[e_Std].id + "_lab_class_sname");
        if (lab_class_sname != null) {
            if (lab_class_sname.style.display != "none") {
                Filterstr += lab_class_sname.innerText;
                if (lab_class_sname.hasAttribute("title")) {
                    Filtertitle += '班級(' + lab_class_sname.getAttribute("title") + ') ';
                }
            }
        }
        //asMstudent1_lab_std 學生
        var lab_std = document.getElementById(elements_Std[e_Std].id + "_lab_std");
        if (lab_std != null) {
            if (lab_std.style.display != "none") {
                Filterstr += lab_std.innerText;
                if (lab_std.hasAttribute("title")) {
                    Filtertitle += '學生(' + lab_std.getAttribute("title") + ') ';
                }
            }
        }
    }
    */
    var objid = obj.id;
    var objdiv = document.getElementById(objid.replace('_bar', ''));
    var asSearchfilterhf = document.getElementById(objid.replace('_bar', '_hf'));
    var asSearchfilter = document.getElementById(objid.replace('_bar', '_filter'));
    var asexp = obj.getAttribute("asexp");
    if (asexp == null) asexp = "false";
    var askeepexp = obj.getAttribute("askeepexp");
    if (askeepexp == null) askeepexp = "false";
    if (askeepexp.toUpperCase() == 'TRUE') {
        objdiv.classList.remove('srhCondition');
        obj.style.display = '';
        objdiv.style.display = "none";
    }
    else {
        if (Filterstr.length != 0) {
            if (asexp.toUpperCase() == 'TRUE') {
                objdiv.classList.remove('srhCondition');
                obj.style.display = '';
                objdiv.style.display = "none";
            }
            else {
                objdiv.classList.add('srhCondition');
                obj.style.display = "none";
                objdiv.style.display = '';
            }
        }
        else {
            if (asexp.toUpperCase() == 'TRUE') {
                objdiv.classList.remove('srhCondition');
                obj.style.display = '';
                objdiv.style.display = "none";
            }
            else {
                objdiv.classList.remove('srhCondition');
                obj.style.display = "none";
                objdiv.style.display = '';
            }
        }
    }
    if (Filterstr.length != 0) {
        asSearchfilter.classList.add('ctrlbuttonCnt');
    }
    else {
        asSearchfilter.classList.remove('ctrlbuttonCnt');
    }
    asSearchfilterhf.innerText = Filterstr;
    asSearchfilter.innerText = Filterstr;
    asSearchfilterhf.title = Filtertitle;
    asSearchfilter.title = Filtertitle;
}
function showAssearch_week(Asdatetime, Asdatetime_type) {
    if (Asdatetime_type=="R") {
        Asdatetime = (Number(Asdatetime.substring(0, 3)) + 1911).toString() + Asdatetime.substring(3);
    }
    //加星期
    var sDay = new Date(Asdatetime).getDay();
    //alert(sDate);
    var arr_weeks = ["日", "一", "二", "三", "四", "五", "六", "日"];
    return "(" + arr_weeks[sDay] + ")";
}

//檢查有無錯誤訊息
function candoSrh(obj) {
	//所有物件觸發blur
    var where_obj = obj.getElementsByClassName('asContentV');
    for (var w = 0; w < where_obj.length; w++) {
        if (where_obj[w].children.length > 0) {
            for (var c = 0; c < where_obj[w].children.length; c++) {
                //ddl
                if (where_obj[w].children[c].tagName == "SELECT") {
                    ddlchange(where_obj[w].children[c]);
                }
                else if (where_obj[w].children[c].tagName == "INPUT") {
                    //textbox
                    if (where_obj[w].children[c].type == 'text') {
                        where_obj[w].children[c].onblur();
                    }
                }
            }
        }
    }

    var Errmsg = "";
    var elements = obj.getElementsByClassName("asErrV")
    for (var e = 0; e < elements.length; e++) {
        //尋找錯誤訊息(asErrV)，當找到id=asSearch_bar就停止尋找
        var obj_parent = elements[e].parentNode;
        while (obj_parent.id.indexOf("_bar") == -1) {
            if (elements[e].style.display != "none") {
                if (elements[e].innerText.length > 0) {
                    if (Errmsg.length > 0) Errmsg += "\n";
                    Errmsg += elements[e].innerText;
                    break;
                }
            }
            obj_parent = obj_parent.parentNode;
        }
    }

    var elements = obj.getElementsByClassName("asErrH")
    for (var e = 0; e < elements.length; e++) {
        //尋找錯誤訊息(asErrH)，當找到id=asSearch_bar就停止尋找
        var obj_parent = elements[e].parentNode;
        while (obj_parent.id.indexOf("_bar") == -1) {
            if (elements[e].style.display != "none") {
                if (elements[e].innerText.length > 0) {
                    if (Errmsg.length > 0) Errmsg += "\n";
                    Errmsg += elements[e].innerText;
                    break;
                }
            }
            obj_parent = obj_parent.parentNode;
        }
    }
    if (Errmsg.length > 0) {
        alert(Errmsg);
        return false;
    }
    else {
        return true;
    }
}

//20210922_依平_ddlImg
function ddlImgOpen(objddl, clickDiv, showdiv) {
    var arrOpt = objddl.getElementsByTagName('option');
    var objVal = "";
    var objText = "";
    var ddsrtop = 0;
    var ddsrleft = 0;
    var ddlfontcaption_H = 0;
    var tmpobj = clickDiv.parentElement;
    var element = tmpobj.parentElement;
    //ddsrleft = tmpobj.offsetLeft - tmpobj.scrollLeft + tmpobj.clientLeft;
    //ddsrtop = tmpobj.offsetTop - tmpobj.scrollLeft + tmpobj.clientTop + clickDiv.offsetHeight;
    //ddsrtop += clickDiv.offsetHeight;
    while (element) {
        ddsrleft += element.offsetLeft - element.scrollLeft + element.clientLeft;
        ddsrtop += element.offsetTop - element.scrollLeft + element.clientTop;
        element = element.offsetParent;
    }
    //標題
    if (tmpobj.parentElement.children.length > 1) {
        for (var c = 0; c < tmpobj.parentElement.children.length; c++) {
            ddlfontcaption_H += tmpobj.parentElement.children[c].offsetHeight;
        }
    }
    else {
        ddlfontcaption_H = tmpobj.parentElement.offsetHeight;
    }
    var newliH = arrOpt.length * 25;
    if (arrOpt.length > 5) {
        newliH = 5 * 25;
    }

    if (showdiv.hasChildNodes) {
        showdiv.children[0].setAttribute('style', "height:" + newliH + "px;");
    }
    //最下面時，div區塊改接在上方
    if (ddsrtop >= window.innerHeight) {
        showdiv.setAttribute('style', "top:" + (window.innerHeight - newliH - tmpobj.parentElement.offsetHeight) + "px;left:" + ddsrleft + "px;");
    }
    else {
        showdiv.setAttribute('style', "top:" + (ddsrtop + ddlfontcaption_H) + "px;left:" + ddsrleft + "px;");
    }
}
//選擇選項
function ddlImgChose(obj, objddl, clickDiv, ddldiv) {
    var arrOpt = obj.firstElementChild;
    var objVal = '';
    var objText = '';
    if (arrOpt) {
        objVal = obj.getAttribute("value");
        var ddllab = document.getElementById(clickDiv.id.replace("_clickDiv", "_lab"));
        var ddlimg = document.getElementById(clickDiv.id.replace("_clickDiv", "_img"));
        if (ddllab && ddlimg) {
            if (arrOpt.tagName == 'SPAN') {
                objText = arrOpt.innerText;
                ddllab.innerText = objText;
                ddlimg.removeAttribute("src");
                ddllab.style.display = "block";
                ddlimg.style.display = "none";
            }
            else if (arrOpt.tagName == 'IMG') {
                objText = arrOpt.getAttribute("src");
                ddllab.innerText = "";
                ddlimg.setAttribute("src", objText);
                ddllab.style.display = "none";
                ddlimg.style.display = "block";
            }
        }

        //ddl的值
        var arrddl = objddl.getElementsByTagName('option');
        for (var i = 0; i < arrddl.length; i++) {
            if (arrddl[i].value == objVal) {
                arrddl[i].selected = 'selected';
            }
            else {
                arrddl[i].removeAttribute('selected');
            }
        }
        ddldiv.style.display = "none";

        if (objddl.getAttribute(onchange)) {
            if (objddl.fireEvent) {
                objddl.fireEvent('onchange');
            }
            else {
                objddl.onchange();
            }
        }
    }
}

//20210922_依平_lbImg
function lbImgChose(obj, objddl, clickDiv) {
    var asMulti = clickDiv.getAttribute('asMulti');
    if (!asMulti) {
        asMulti = true;
    }
    var e = window.event || arguments[0];
    if (e.shiftKey && asMulti == 'true') {
        //找到上一個
        var lastOpt = obj;
        var num1;
        var num2;
        var allOpt = clickDiv.getElementsByTagName('li');
        for (var a = 0; a < allOpt.length; a++) {
            if (allOpt[a].classList.contains("picklblast")) {
                allOpt[a].classList.remove("picklblast");
                allOpt[a].classList.add("picklb");
                lastOpt = allOpt[a];
                num1 = a;
            }
            if (allOpt[a] == obj) {
                num2 = a;
            }
        }
        //整理先後 1要<2
        if (num1 > num2) {
            var tmp = num1;
            num1 = num2;
            num2 = tmp;
        }
        //把之間的都選擇
        var arrddl = objddl.getElementsByTagName('option');
        for (var a = num1; a < num2 + 1 ; a++) {
            if (allOpt[a] == obj) {
                allOpt[a].classList.add("picklblast");
            }
            else {
                allOpt[a].classList.add("picklb");
            }
            arrddl[a].selected = 'selected';
        }

    }
    else if (e.ctrlKey && asMulti == 'true') {
        //所有的選項都改成舊的
        var allOpt = clickDiv.getElementsByTagName('li');
        for (var a = 0; a < allOpt.length; a++) {
            if (allOpt[a].classList.contains("picklblast")) {
                allOpt[a].classList.remove("picklblast");
                allOpt[a].classList.add("picklb");
            }
        }
        var arrOpt = obj.firstElementChild;
        var objVal = '';
        var objText = '';
        if (arrOpt) {
            objVal = obj.getAttribute("value");
            obj.classList.toggle("picklblast");

            //ddl的值
            var arrddl = objddl.getElementsByTagName('option');
            for (var i = 0; i < arrddl.length; i++) {
                if (arrddl[i].value == objVal) {
                    arrddl[i].selected = 'selected';
                }
            }
        }
    }
    else {
        //所有的選項都拿掉
        var allOpt = clickDiv.getElementsByTagName('li');
        for (var a = 0; a < allOpt.length; a++) {
            allOpt[a].classList.remove("picklb");
            allOpt[a].classList.remove("picklblast");
        }
        var arrOpt = obj.firstElementChild;
        var objVal = '';
        var objText = '';
        if (arrOpt) {
            objVal = obj.getAttribute("value");
            obj.classList.toggle("picklblast");

            //ddl的值
            var arrddl = objddl.getElementsByTagName('option');
            for (var i = 0; i < arrddl.length; i++) {
                if (arrddl[i].value == objVal) {
                    arrddl[i].selected = 'selected';
                }
                else {
                    arrddl[i].selected = '';
                }
            }
        }
    }
    if (objddl.getAttribute(onchange)) {
        if (objddl.fireEvent) {
            objddl.fireEvent('onchange');
        }
        else {
            objddl.onchange();
        }
    }
}

(function ($) {
    $.hasChanged = function () {
        return $(":input").hasChanged();
    }

    $.fn.hasChanged = function () {
        for (var i = 0; i < this.length; i++) {
            var input = this[i];
            if (input.type == "checkbox" || input.type == "radio") {
                if (input.parentNode.parentNode.parentNode.parentNode.parentNode != null) {
                    var astabobj = input.parentNode.parentNode.parentNode.parentNode.parentNode;
                    if (astabobj.className == "tabsConnect") {
                        continue;
                    }
                }
                if (checkCheckBoxAndRadio(input)) {
                    return true;
                }
            } else if (typeof (input.defaultValue) != "undefined") {
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
                //alert("不支援" + input.type);
                //return false;
            }
        }

        return false;
    }

    function checkSelectOne(input) {
        //下拉選單零筆，不考慮
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
        //下拉選單零筆，不考慮
        if (input.options.length == 0) {
            return false;
        }

        for (var j = 0; j < input.options.length; j++) {
            var option = input.options[j];
            if (option.defaultSelected != option.selected) {
                return true;
            }
        }

        return false
    }

    function checkCheckBoxAndRadio(input) {
        //checkbox與radio，比有沒有Checked
        return input.checked != input.defaultChecked;
    }

    function chekcInput(input) {
        return input.value != input.defaultValue;
    }
})(jQuery)
