// ==UserScript==
// @name         Better CYSH System
// @namespace    http://tampermonkey.net/
// @version      v1.0.1
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

    $(document).ready(function () {
        let config_keep_login = GM_getValue("bcs.keep_login");
        let config_move_grade = GM_getValue("bcs.move_grade");
        if (config_keep_login == undefined) {
            config_keep_login = false;
            GM_setValue("bcs.keep_login",config_keep_login);
        }  
        if (config_move_grade == undefined) {
            config_move_grade = true;
            GM_setValue("bcs.move_grade",config_move_grade);
        }

        // show version
        $("#form1 > table > tbody > tr > td > div:nth-child(2)").text("BCS "+GM_info.script.version);
        // add setting icon
        $("#divmenu > ul").append(`<li onclick="if(checkCall() !=false){bcs_setting_pop();}">
    <img src="/SCH_UI/images/setting1.png" id="hschinfoinage" class="grid_6 omega" style="width:50px;">
</li>`);

        $("#form1").append(`<div id="divbcssetting_outer_id" class="gray_bg" style="display: none;">
    <div id="divbcssetting" class="grid_16 omega divsubcont_pop">
        <div class="qa_content">
            <div class="close_btn" onclick="close_bcs_setting_pop()"></div>
            <div class="grid_4 alpha">
                <div class="sys_item">
                    <div class="sys_item_img">
                        <img src="/SCH_UI/images/setting1.png" id="schoolitemimage" class="grid_2 alpha" alt="設定">
                    </div>
                    <div class="sys_item_text">BCS設定</div>
                </div>
            </div>
        </div>
        <style>
            .bcs_setting {
                width: 80%;
                margin-left: auto;
                margin-right: auto;
                display: flex;
                flex-direction: row;
                flex-wrap: nowrap;
                justify-content: space-between;
            }

            .switch {
                position: relative;
                display: inline-block;
                width: 60px;
                height: 34px;
            }

            .switch input {
                opacity: 0;
                width: 0;
                height: 0;
            }

            .slider {
                position: absolute;
                cursor: pointer;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: #ccc;
                -webkit-transition: .4s;
                transition: .4s;
            }

            .slider:before {
                position: absolute;
                content: "";
                height: 26px;
                width: 26px;
                left: 4px;
                bottom: 4px;
                background-color: white;
                -webkit-transition: .4s;
                transition: .4s;
            }


            input:checked+.slider {
                background-color: #2196F3;
            }

            input:focus+.slider {
                box-shadow: 0 0 1px #2196F3;
            }

            input:checked+.slider:before {
                -webkit-transform: translateX(26px);
                -ms-transform: translateX(26px);
                transform: translateX(26px);
            }

            /* Rounded sliders */
            .slider.round {
                border-radius: 34px;
            }

            .slider.round:before {
                border-radius: 50%;
            }
        </style>
        <script>
            function bcs_setting_pop() {
                document.getElementById("divbcssetting_outer_id").style.display = "block";
            }
            function close_bcs_setting_pop() {
                document.getElementById("divbcssetting_outer_id").style.display = "none";
            }
        </script>
        <div id="BullBlock" class="loginCenterBg"
            style="height: calc(100% - 70px); overflow: auto; float: left; width: 100%;">
            <div style="height: 100%;width: 100%;display: flex;flex-direction: column;gap: 15px;">
                <div class="bcs_setting">
                    <p>保持登入</p>
                    <label class="switch">
                        <input type="checkbox" id="bcs-keep_login">
                        <span class="slider round"></span>
                    </label>
                </div>
                <div class="bcs_setting">
                    <p>將成績查詢移至主畫面</p>
                    <label class="switch">
                        <input type="checkbox"  id="bcs-move_grade">
                        <span class="slider round"></span>
                    </label>
                </div>
            </div>
        </div>
    </div>
</div>`);
        
        // keep login
        $("#bcs-keep_login").prop("checked",config_keep_login);
        $("#bcs-keep_login").change(function () { 
            GM_setValue("bcs.keep_login",this.checked);
            config_keep_login = this.checked;
            console.log("move_grade = "+config_keep_login);
        });

        $("#bcs-move_grade").prop("checked",config_move_grade);
        $("#bcs-move_grade").change(function () { 
            GM_setValue("bcs.move_grade",this.checked);
            config_move_grade = this.checked;
            console.log("move_grade = "+config_move_grade);
        });

        if (config_keep_login) {
            setInterval(function () {window.dispatchEvent(new Event("compositionupdate"));},100);
        }
        if (config_move_grade) {
            // add the grade button
            $("#MenuArea > div").append(`<div class="grid_2" style="text-align:center;min-height: 150px;"><a id="ASAs1" title="成績查詢" href="SIndex.aspx?AsParam=X0Z3UzJuJWU0JWJlJWJkJWU4JWFiJWJkJWU3JWI1JTk0JWU5JThkJTg1ZkxUVWtPVyUxN28lN2QlN2MlMGQlN2IlMDMlMDIlN2IlMDElMDIlMTZXV1o5dTIlM2MnODMlMTUlZTUlYWQlODklZTclOTQlYWM=" target="_self" style="display:inline-block;width:100%;"><img title="成績查詢" src="../btnimg/%E6%88%90%E7%B8%BE%E6%9F%A5%E8%A9%A2.png" alt="成績查詢" style="border-width:0px;"></a><br><span id="ASlblAs1" title="成績查詢">成績查詢</span><br><br></div>`);
        }
    });
    
    

})();