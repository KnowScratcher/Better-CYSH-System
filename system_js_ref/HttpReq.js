var xmlHttp;
function CallPage(sUrl) {
    xmlHttp = GetHttpRequest();
    xmlHttp.onreadystatechange = ProcessRequest;
    xmlHttp.open("GET", encodeURI(sUrl), true);
    xmlHttp.send(null);
}
function ProcessRequest() {
    try {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
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
