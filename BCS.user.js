// ==UserScript==
// @name         Better CYSH System
// @namespace    http://tampermonkey.net/
// @version      v1.0.1-pre1
// @description  校務行政系統太爛，我來改一下
// @author       Know Scratcher
// @match        https://cysh-cy.k12ea.gov.tw/SCH_UI/*
// @icon         https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwVyK87J0AUJjuDvUjVZTTvuV_haCtwyzWKXoDSEuOzQ&s
// @grant GM_setValue
// @grant GM_getValue
// @grant GM.setValue
// @grant GM.getValue
// @grant GM_setClipboard
// @grant unsafeWindow
// ==/UserScript==

(function () {
    "use strict";

    let icon = document.createElement("link");
    icon.href = "https://cysh-cy.k12ea.gov.tw/SCH_UI/btnimg/%e4%bf%ae%e8%aa%b2%e7%b4%80%e9%8c%84.png";
    icon.rel = "icon";
    document.head.appendChild(icon);

    //timeline
    let jquery = document.createElement("script");
    jquery.src = "https://code.jquery.com/jquery-1.9.1.min.js";
    jquery.type = "text/javascript";

    document.head.append()

    document.querySelector("#form1 > table > tbody > tr > td > div:nth-child(2)").innerHTML = "BCS v1.0.0";
    document.querySelector("#MenuArea > div").innerHTML = document.querySelector("#MenuArea > div").innerHTML + `<div class="grid_2" style="text-align:center;min-height: 150px;"><a id="ASAs1" title="成績查詢" href="SIndex.aspx?AsParam=X0Z3UzJuJWU0JWJlJWJkJWU4JWFiJWJkJWU3JWI1JTk0JWU5JThkJTg1ZkxUVWtPVyUxN28lN2QlN2MlMGQlN2IlMDMlMDIlN2IlMDElMDIlMTZXV1o5dTIlM2MnODMlMTUlZTUlYWQlODklZTclOTQlYWM=" target="_self" style="display:inline-block;width:100%;"><img title="成績查詢" src="../btnimg/%E6%88%90%E7%B8%BE%E6%9F%A5%E8%A9%A2.png" alt="成績查詢" style="border-width:0px;"></a><br><span id="ASlblAs1" title="成績查詢">成績查詢</span><br><br></div>`;


    
    let keep_login = GM_getValue("bcs.keep_login");
    GM_setValue("bcs.keep_login",true);
    console.log(keep_login);
    if (keep_login == undefined) {
        GM_setValue("bcs.keep_login",true);
    }else if (keep_login) {
        console.log("kee")
        setInterval(function () {window.dispatchEvent(new Event("compositionupdate"));},100);
    }

})();