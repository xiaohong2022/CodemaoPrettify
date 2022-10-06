// ==UserScript==
// @name         CodemaoPrettify
// @namespace    https://shequ.codemao.cn/
// @version      1.2.0
// @description  美化编程猫主页的一个小插件
// @author       xiaohong2022
// @match        *://shequ.codemao.cn/*
// @match        *://shequ.codemao.cn/
// @icon         https://shequ.codemao.cn/favicon.ico
// @require      https://unpkg.com/mdui@1.0.2/dist/js/mdui.min.js
// @require      https://cdn.jsdelivr.net/npm/jquery@3.4.1/dist/jquery.slim.min.js
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_addStyle
// @license      GPL-3.0
// ==/UserScript==

!function (f) {
    try {
        console.log('%cCodemaoPrettify', 'text-shadow: 0 1px 0 #ccc,0 2px 0 #ffc9c9,0 3px 0 #bbb,0 4px 0 #ffb9b9,0 5px 0 #aaa,0 6px 1px rgba(255,0,0,.1),0 0 5px rgba(255,0,0,.1),0 1px 3px rgba(0,0,0,.3),0 3px 5px rgba(255,0,0,.2),0 5px 10px rgba(255,0,0,.25);font-size:3em;color:#f00');
        console.log("%c嘿，欢迎使用 CodemaoPrettify！", "font-size:10px;padding:10px 0px 5px 0px");
        console.log("%cCodemaoPrettify v1.2.0", "font-size:10px;color:#f00");
        console.log("%cCopyright (c) 2022 xiaohong2022", "font-size:10px;padding:0px 0px 10px 0px;color:#f00");

        f((...content) => {
            console.log("%cCodemaoPrettify", "background: #e7520d; border-radius: 3px; padding: 0 4px;color: #fff;", ...content);
        });
    } catch (e) {
        console.error(e);
        console.log("加载出错", e);
    }
}(function (logs) {
    // 开始运行
    logs("开始运行");
    const starttime = Date.now()

    // 鸡助工具
    const setv = ((html, name, value) => { html.setAttribute(name, value) });
    const setn = ((html, value) => { html.setAttribute(value, "") });
    const seth = ((html, html5) => { html.innerHTML = html5 });
    const sett = ((html, text) => { html.innerText = text });
    const addhtml = ((position, localName, data, html) => { var newHtml = document.createElement(localName); for (var name in data) { newHtml.setAttribute(name, data[name]) }; newHtml.innerHTML = html; var newElement = position.appendChild(newHtml); return (newElement) })
    const addanot = ((position, value) => { var newHtml = document.createComment(value); var newElement = position.appendChild(newHtml); return (newElement) });

    // 读取数据
    const settings = GM_getValue("settings", {
        theme: {
            color: "#fec433",
            hover: "#f6b206",
            highlight: "#ec443d",
            transparent: "#faefda",
        },
        hide: {
            "首页": false,
            "课程": false,
            "发现": false,
            "工作室": false,
            "论坛": false,
            "素材": false,
            "活动": false,
            "下载APP": false,
            "消息": false,
            "创作": false,
        },
        otherhide: {
            "赛事中心": false,
            "下载": false,
            "反馈建议": false,
            "前往教师版": false,
        },
        homehide: {
            "创作教程": false,
            "代码岛3.0精选": false,
            "点猫精选": false,
            "新作喵喵看": false,
            "训练师小课堂": false,
            "工作室精选": false,
            "原创少儿小说": false,
            "编程TV": false,
            "社区星推荐": false,
        },
        discoverhide: {
            "射击": false,
            "多人游戏": false,
            "冒险": false,
            "休闲": false,
            "学科知识": false,
            "解谜": false,
            "传说之下": false,
            "经典复刻": false,
            "创意": false,
            "音乐": false,
            "教程": false,
            "新人必玩": false,
            "敏捷": false,
            "益智": false,
            "模拟": false,
            "艺术": false,
            "格斗竞技": false,
        },
        communityhide: {
            "热门活动": false,
            "积木编程乐园": false,
            "工作室&师徒": false,
            "你问我答": false,
            "神奇代码岛": false,
            "图书馆": false,
            "CoCo应用创作": false,
            "Python乐园": false,
            "源码精灵": false,
            "NOC编程猫比赛": false,
            "灌水池塘": false,
            "通天塔": false,
            "训练师小课堂": false,
        },
        galleryhide: {
            "动作类": false,
            "射击类": false,
            "休闲类": false,
            "艺术类": false,
            "冒险类": false,
            "学科类": false,
            "故事类": false,
            "IP类": false,
            "节日类": false,
            "其他": false,
        },
        coursehide: {
            "源码编程课": false,
            "3D编程课": false,
            "Python编程课": false,
            "移动端编程课": false,
            "幼儿编程课": false,
        },
        usercenterhide: {
            "等级": false,
            "工作室": false,
            "关注、粉丝": false,
            "荣誉墙": false,
            "我正在做什么": false,
        },
        banner: {
            open: false,
            colormode: false,
            color: "#000",
            image: "https://cdn-community.codemao.cn/community_frontend/asset/banner_65b4a.png"
        },
        css: "",
        showfooter: true,
        showsidenav: true,
        usemdui: true,
    });
    logs("数据读取完毕");
    logs("Settings", settings);

    // 导入MDUI样式
    addhtml(document.head, "link", {
        rel: "stylesheet",
        href: "https://unpkg.com/mdui@1.0.2/dist/css/mdui.min.css"
    }, "");
    logs("MDUI加载完毕");

    // 添加涟漪特效
    [
        ".c-navigator--header-content .c-navigator--nav_wrap .c-navigator--item", "a",
        ".r-gallery--label", ".r-mall-r-home--tap", ".c-post_list--post_body",
        ".r-work_shop-r-details--user_card", ".c-post_box-post_cont--send_btn",
        ".r-work_shop-r-details--work_card", ".r-home-c-box3_recommend--work_card_wrap",
        ".r-home-c-recommend_work_area--work_card_wrap", ".r-home-c-community_star--user_recommend_item",
        ".r-home-c-course--course_card", ".r-home-c-banner--banner_sub_item", ".r-work_shop--workshop_entry",
        ".r-work_shop--card_item", ".r-course-c-block--course-item", ".r-course-c-block--toggle p",
        ".r-setting--main_area .r-setting--btn_save", ".r-setting--account_setting .r-setting--setting_item .r-setting--setting_btn",
        ".r-work_manager--work_manager_wrap .r-work_manager--content_wrap .r-work_manager--content_container .r-work_manager--content .r-work_manager--blank_content .r-work_manager--wrap .r-work_manager--create_button .r-work_manager--web_create",
        ".r-work_manager-c-action_button--action_button", "button:not(.slick-arrow)",
        ".r-work_manager--work_manager_wrap .r-work_manager--content_wrap .r-work_manager--content_container .r-work_manager--content .r-work_manager--blank_content .r-work_manager--wrap .r-work_manager--create_button .r-work_manager--client_create_wrap",
    ].forEach((e) => {
        setInterval(() => {// 使用循环添加，防止消失
            if (settings.usemdui) {
                $(e).addClass("mdui-ripple")
            }
        }, 100)
    });

    // 添加涟漪特效后，tab上的一些按钮点击后不会显示菜单，因此要修复一下
    $(`.c-navigator--header-content .c-navigator--nav_wrap .c-navigator--item[data-watch_event="更多-入口tab"]`)[0].style.overflow = "unset";
    $(`.c-navigator--header-content .c-navigator--nav_wrap .c-navigator--item[data-watch_event="下载APP-入口tab"]`)[0].style.overflow = "unset";

    logs("涟漪特效应用完毕");

    // 设置页面主题色
    function createRootStyleCss(d) {
        return `:root{--xhbcmpre-theme-color:${d.theme.color};--xhbcmpre-theme-hover:${d.theme.hover};--xhbcmpre-theme-highlight:${d.theme.highlight};--xhbcmpre-theme-transparent:${d.theme.transparent};}
        ${d.showfooter ? "" : ".r-work_manager--work_manager_wrap .r-work_manager--content_wrap .r-work_manager--footer_wrap,.c-footer--footer_wrap{display:none}"}
        ${d.showsidenav ? "" : ".r-course-c-guide--slide_nav_wrap,.c-side_nav--side_nav_cont{display:none}"}
        ${d.banner.open ? `.r-user-c-banner--banner .r-user-c-banner--background{${d.banner.colormode ? `background:${d.banner.color}!important` : `background-image:url(${d.banner.image})!important`}}` : ""}
        ${d.css}`
    }
    const Theme_Style_Setting = GM_addStyle("");
    function updata() {
        Theme_Style_Setting.innerHTML = createRootStyleCss(settings);
        GM_setValue("settings", settings);
    }
    updata();
    logs("主题色样式设置加载完毕");

    // 控制面板
    const SettingsRoot = addhtml($(`.c-navigator--item[data-watch_event="更多-入口tab"] > div > .c-navigator--second_nav > ul`)[0], "li", { class: "c-navigator--dropdown_item" }, `<a>CodemaoPrettify</a>`);
    const SettingsRootdialog = addhtml(document.body, "div", { class: "mdui-dialog", id: "CodemaoPrettify-Settings-Dialog" }, `<div class="mdui-dialog-content" style="height: 46px;"></div><div class="mdui-dialog-actions"><a href="javascript:;" class="mdui-btn mdui-ripple mdui-text-color-primary">使用默认设置</a><a href="javascript:;" class="mdui-btn mdui-ripple mdui-text-color-primary">保存（需要刷新）</a></div>`)
    function addcheckbox(position, text, isselect = false) {
        const acb1 = addhtml(position, "label", { class: "mdui-checkbox" }, `<input type="checkbox" ${isselect ? "checked" : ""}/><i class="mdui-checkbox-icon"></i>${text}`);
        let r = {
            input: acb1.querySelector("input"),
            this: acb1,
            onchange: null,
            getvalue: function () {
                return this.input.checked;
            },
            setvalue: function (v) {
                this.input.checked = !!v
                this.input.onchange()
            },
        };
        r.input.onchange = (() => {
            updata();
            updata();
            updata();
            updata();
            updata();
            if (r.onchange) {
                r.onchange(r.getvalue(), text);
            };
        })
        return r
    }
    function addradio(position, text, name, isselect = false) {
        const acb1 = addhtml(position, "label", { class: "mdui-radio" }, `<input type="radio" name="${name}" ${isselect ? "checked" : ""}/><i class="mdui-radio-icon"></i>${text}`);
        let r = {
            input: acb1.querySelector("input"),
            this: acb1,
            onchange: null,
            getvalue: function () {
                return this.input.checked;
            },
            setvalue: function (v) {
                this.input.checked = !!v
                this.input.onchange()
            },
        };
        r.input.onchange = (() => {
            updata();
            updata();
            updata();
            updata();
            updata();
            if (r.onchange) {
                r.onchange(r.getvalue(), text);
            };
        })
        return r
    }
    function addcolorbox(position, value) {
        const t1 = addhtml(position, "div", { class: "CodemaoPrettify-ColorBox" }, "");
        const t3 = addhtml(t1, "input", { type: "color", value }, "");
        const t2 = addhtml(t1, "span", { style: "color: " + value }, value);
        let r = {
            input: t3,
            this: t1,
            onchange: null,
            getvalue: () => {
                return t2.innerText;
            },
            setvalue: (v) => {
                t3.value = v
                t3.oninput();
            },
        };
        t1._root = r;
        t3.oninput = () => {
            t2.style.color = t3.value;
            sett(t2, t3.value)
            updata();
            updata();
            updata();
            updata();
            updata();
            if (r.onchange) {
                r.onchange(t3.value);
            };
        }
        return r;
    }
    const content = SettingsRootdialog.children[0];
    const resetbtn = SettingsRootdialog.children[1].children[0];
    const offbtn = SettingsRootdialog.children[1].children[1];
    addhtml(content, "p", { style: "text-shadow: 0 1px 0 #ccc,0 2px 0 #ffc9c9,0 3px 0 #bbb,0 4px 0 #ffb9b9,0 5px 0 #aaa,0 6px 1px rgba(255,0,0,.1),0 0 5px rgba(255,0,0,.1),0 1px 3px rgba(0,0,0,.3),0 3px 5px rgba(255,0,0,.2),0 5px 10px rgba(255,0,0,.25);font-size:3em;color:#f00" },
        "CodemaoPrettify");
    addhtml(content, "p", {}, "CodemaoPrettify v1.2.0 GPL-3.0");
    addhtml(content, "p", {}, "Copyright © 2022 xiaohong2022 All Rights Reserved.");
    addhtml(content, "p", { class: "mdui-typo-title" }, "主色调");
    const t2 = addcolorbox(content, settings.theme.color)
    addhtml(content, "p", { class: "mdui-typo-title" }, "辅色调");
    const t3 = addcolorbox(content, settings.theme.hover)
    addhtml(content, "p", { class: "mdui-typo-title" }, "突出色调");
    const t4 = addcolorbox(content, settings.theme.highlight)
    addhtml(content, "p", { class: "mdui-typo-title" }, "亮色调");
    const t5 = addcolorbox(content, settings.theme.transparent)
    t2.onchange = (v) => {
        settings.theme.color = v;
    };
    t3.onchange = (v) => {
        settings.theme.hover = v;
    };
    t4.onchange = (v) => {
        settings.theme.highlight = v;
    };
    t5.onchange = (v) => {
        settings.theme.transparent = v;
    };
    addhtml(content, "p", { class: "mdui-typo-title" }, "MDUI");
    const t14 = addcheckbox(content, "启用涟漪特效", settings.usemdui)
    t14.onchange = ((v) => {
        settings.usemdui = v
    })
    const t7 = [];
    addhtml(content, "p", { class: "mdui-typo-title" }, "页面排版");
    var t16 = addhtml(content, "div", { class: "CodemaoPrettify-flex" }, "");
    const t15 = addcheckbox(t16, "显示页脚", settings.showfooter)
    t15.onchange = ((v) => {
        settings.showfooter = v
        updata();
        updata();
        updata();
        updata();
    })
    const t17 = addcheckbox(t16, "显示边侧栏", settings.showsidenav)
    t7.push(t17)
    t7.push(t15)
    t17.onchange = ((v) => {
        settings.showsidenav = v
        updata();
        updata();
        updata();
        updata();
    })
    addhtml(content, "p", { class: "mdui-typo-title" }, "导航栏排版");
    var t6 = addhtml(content, "div", { class: "CodemaoPrettify-flex" }, "");
    for (const oooo in settings.hide) {
        let t8 = addcheckbox(t6, oooo, !settings.hide[oooo])
        t7.push(t8);
        t8.onchange = ((v, t) => {
            settings.hide[t] = !v
        })
    }
    addhtml(content, "p", { class: "mdui-typo-title" }, "导航栏“…”菜单排版");
    var t10 = addhtml(content, "div", { class: "CodemaoPrettify-flex" }, "");
    for (const oooo in settings.otherhide) {
        let t8 = addcheckbox(t10, oooo, !settings.otherhide[oooo])
        t7.push(t8);
        t8.onchange = ((v, t) => {
            settings.otherhide[t] = !v
        })
    }
    addhtml(content, "p", { class: "mdui-typo-title" }, "首页排版");
    var t9 = addhtml(content, "div", { class: "CodemaoPrettify-flex" }, "");
    for (const oooo in settings.homehide) {
        let t8 = addcheckbox(t9, oooo, !settings.homehide[oooo])
        t7.push(t8);
        t8.onchange = ((v, t) => {
            settings.homehide[t] = !v
        })
    }
    addhtml(content, "p", { class: "mdui-typo-title" }, "课程页排版");
    var t18 = addhtml(content, "div", { class: "CodemaoPrettify-flex" }, "");
    for (const oooo in settings.coursehide) {
        let t8 = addcheckbox(t18, oooo, !settings.coursehide[oooo])
        t7.push(t8);
        t8.onchange = ((v, t) => {
            settings.coursehide[t] = !v
            updata();
            updata();
            updata();
        })
    }
    addhtml(content, "p", { class: "mdui-typo-title" }, "发现页排版");
    var t11 = addhtml(content, "div", { class: "CodemaoPrettify-flex" }, "");
    for (const oooo in settings.discoverhide) {
        let t8 = addcheckbox(t11, oooo, !settings.discoverhide[oooo])
        t7.push(t8);
        t8.onchange = ((v, t) => {
            settings.discoverhide[t] = !v
        })
    }
    addhtml(content, "p", { class: "mdui-typo-title" }, "论坛页排版");
    var t12 = addhtml(content, "div", { class: "CodemaoPrettify-flex" }, "");
    for (const oooo in settings.communityhide) {
        let t8 = addcheckbox(t12, oooo, !settings.communityhide[oooo])
        t7.push(t8);
        t8.onchange = ((v, t) => {
            settings.communityhide[t] = !v
        })
    }
    addhtml(content, "p", { class: "mdui-typo-title" }, "活动页排版");
    var t13 = addhtml(content, "div", { class: "CodemaoPrettify-flex" }, "");
    for (const oooo in settings.galleryhide) {
        let t8 = addcheckbox(t13, oooo, !settings.galleryhide[oooo])
        t7.push(t8);
        t8.onchange = ((v, t) => {
            settings.galleryhide[t] = !v
        })
    }
    addhtml(content, "p", { class: "mdui-typo-title" }, "个人中心排版");
    var t28 = addhtml(content, "div", { class: "CodemaoPrettify-flex" }, "");
    for (const oooo in settings.usercenterhide) {
        let t8 = addcheckbox(t28, oooo, !settings.usercenterhide[oooo])
        t7.push(t8);
        t8.onchange = ((v, t) => {
            settings.usercenterhide[t] = !v
        })
    }
    var t1 = addhtml(content, "div", { class: "CodemaoPrettify-flex" }, "");
    var t20 = addhtml(content, "div", { class: "CodemaoPrettify-flex" }, "");
    var t27 = addhtml(content, "div", { class: "CodemaoPrettify-flex" }, "");
    let t24 = addcheckbox(t1, "自定义个人中心背景", settings.banner.open)
    const t22 = "Codemao_Prettify_Personal_Center_Background_Mode_Select_Radio_4_xa_5_kf_74_a_84_w_02_t_87_ig_85_rc_84_s_6_fg_4_q_6_gk_4_uj_6_svl_9_Name_t_2_2_xh_2022_CodeId_452450_Greasy_Fork_Save_End_"
    var t21 = addradio(t1, "颜色", t22, settings.banner.colormode)
    var t23 = addradio(t1, "图片", t22, !settings.banner.colormode)
    var t25 = addhtml(t20, "img", { src: settings.banner.image, width: 200, height: "100%", style: "margin-top:10px;margin-bottom:20px;cursor: pointer;", "mdui-tooltip": "{content: '点击切换图片', position: 'top'}" }, "");
    var t26 = addcolorbox(t27, settings.banner.color);
    function updatabanner(v) {
        if (v) {
            t20.style.display = ""
            t21.this.style.display = ""
            t27.style.display = ""
            t23.this.style.display = ""
        } else {
            t20.style.display = "none"
            t27.style.display = "none"
            t21.this.style.display = "none"
            t23.this.style.display = "none"
        }
    }
    function updatabanner2(v) {
        if (v) {
            t25.style.display = "none"
            t26.this.style.display = ""
        } else {
            t25.style.display = ""
            t26.this.style.display = "none"
        }
    }
    t26.onchange = (v) => {
        settings.banner.color = v;
    };
    updatabanner2(settings.banner.colormode)
    updatabanner(settings.banner.open)
    t24.onchange = ((v) => {
        updatabanner(v)
        settings.banner.open = v
        updata()
        updata()
        updata()
        updata()
    })
    t23.onchange = ((v) => {
        updatabanner2(false)
        settings.banner.colormode = false
        updata()
        updata()
        updata()
        updata()
    })
    t21.onchange = ((v) => {
        updatabanner2(true)
        settings.banner.colormode = true
        updata()
        updata()
        updata()
        updata()
    })
    t26.onchange = ((v) => {
        settings.banner.color = v
        updata()
        updata()
        updata()
        updata()
    })
    t25.onclick = function () {
        const filee = addhtml(document.body, "input", { style: "display:none", type: 'file', accept: "image" }, "");
        filee.click()
        filee.onchange = function () {
            filee.remove();
            var file = this.files[0];
            if (!file) return;
            logs(file)
            if (/image\/\w+/.test(file.type)) {
                if (FileReader) {
                    var reader = new FileReader();
                    var imgFile;
                    reader.readAsDataURL(file);
                    reader.onload = (e) => {
                        imgFile = e.target.result;
                        t25.src = imgFile;
                        settings.banner.image = imgFile
                        updata()
                        updata()
                        updata()
                        updata()
                    };
                } else {
                    const urlobj = URL || window.URL || window.webkitURL || window;
                    var imageURL = urlobj.createObjectURL(file);
                    t25.src = imageURL;
                    settings.banner.image = imageURL
                    updata()
                    updata()
                    updata()
                    updata()
                }
            } else {
                alert("文件格式错误！")
            }
        }
    }
    addhtml(content, "p", { class: "mdui-typo-title" }, "自定义CSS");
    var t19 = addhtml(content, "div", { class: "CodemaoPrettify-flex" }, `<div class="mdui-textfield"><textarea class="mdui-textfield-input"></textarea></div>`);
    t19.children[0].children[0].oninput = ({ target }) => {
        settings.css = target.value;
        updata()
        updata()
        updata()
        updata()
        updata()
        updata()
    }
    SettingsRoot.onclick = (() => {
        new mdui.Dialog(SettingsRootdialog).open();
        logs("设置窗口被打开");
    })
    offbtn.onclick = (() => {
        if (offbtn.innerText == "保存中...") return
        logs("点击-保存");
        sett(offbtn, "保存中...")
        resetbtn.remove()
        t2.input.disabled = true
        t3.input.disabled = true
        t4.input.disabled = true
        t5.input.disabled = true
        t14.input.disabled = true
        t7.forEach((e) => {
            e.input.disabled = true
        })
        updata();
        updata();
        updata();
        updata();
        updata();
        setInterval(() => {
            updata();
        })
        setTimeout(() => {
            window.location.reload()
        }, 500)
    })
    resetbtn.onclick = (() => {
        t2.setvalue("#fec433")
        t3.setvalue("#f6b206")
        t4.setvalue("#ec443d")
        t5.setvalue("#faefda")
        t24.setvalue(false);
        settings.banner.image = "https://cdn-community.codemao.cn/community_frontend/asset/banner_65b4a.png"
        t25.src = "https://cdn-community.codemao.cn/community_frontend/asset/banner_65b4a.png"
        t26.setvalue("#000")
        t7.forEach((e) => {
            e.setvalue(true)
        })
        updata();
        updata();
        updata();
        updata();
        t14.setvalue(true)
        logs("数据已重置");
    })
    logs("控制面板加载完毕");

    // 根据设置更改排版
    function updatePage() {
        requestAnimationFrame(updatePage)
        for (const o in settings.hide) {
            try {
                if (o == "创作") {
                    if (!settings.hide[o]) {
                        $(`.c-navigator--header-content .c-navigator--ide_link`)[0].style.display = ""
                    } else {
                        $(`.c-navigator--header-content .c-navigator--ide_link`)[0].style.display = "none"
                    }
                } else if (o == "消息") {
                    if (!settings.hide[o]) {
                        $(`.c-navigator--header-content .c-navigator--user_wrap .c-navigator--message_cont`)[0].style.display = ""
                    } else {
                        $(`.c-navigator--header-content .c-navigator--user_wrap .c-navigator--message_cont`)[0].style.display = "none"
                    }
                } else {
                    if (!settings.hide[o]) {
                        $(`.c-navigator--header-content .c-navigator--nav_wrap .c-navigator--item[data-watch_event="${o}-入口tab"]`)[0].style.display = ""
                    } else {
                        $(`.c-navigator--header-content .c-navigator--nav_wrap .c-navigator--item[data-watch_event="${o}-入口tab"]`)[0].style.display = "none"
                    }
                }
            } catch (e) { }
        }
        for (const o in settings.discoverhide) {
            try {
                $(`.r-discover-c-tagList--sort_cont .r-discover-c-tagList--sort_item`).each((_, e) => {
                    if (e.innerText == o) {
                        if (!settings.discoverhide[o]) {
                            e.style.display = ""
                        } else {
                            e.style.display = "none"
                        }
                    }
                })
            } catch (e) { }
        }
        for (const o in settings.homehide) {
            try {
                const data = {
                    "创作教程": "r-home--guide_part.r-home--reverse",
                    "代码岛3.0精选": "r-home-c-box3_recommend--recommend_work",
                    "点猫精选": "r-home-c-recommend_work_area--recommend_work",
                    "新作喵喵看": "r-home-c-new_work_area--new_work",
                    "训练师小课堂": "r-home-c-box3_community--recommend_work",
                    "工作室精选": "r-home-c-workshop_area--workshop_work",
                    "原创少儿小说": "r-home-c-novel_area--novel_area",
                    "编程TV": "r-home-c-code_tv--novel_area",
                    "社区星推荐": "r-home-c-community_star--user_recommend_area",
                }
                $("." + data[o]).each((_, e) => {
                    if (!settings.homehide[o]) {
                        e.style.display = ""
                    } else {
                        e.style.display = "none"
                    }
                })
            } catch (e) { }
        }
        for (const o in settings.communityhide) {
            try {
                $(".r-community--board_container .r-community--board_list .r-community--board_item").each((_, e) => {
                    if (e.querySelector("span").innerText == o) {
                        if (!settings.communityhide[o]) {
                            e.style.display = ""
                        } else {
                            e.style.display = "none"
                        }
                    }
                })
            } catch (e) { }
        }
        for (const o in settings.galleryhide) {
            try {
                $(`.r-gallery--labels .r-gallery--label`).each((_, e) => {
                    if (e.innerText == o) {
                        if (!settings.galleryhide[o]) {
                            e.style.display = ""
                        } else {
                            e.style.display = "none"
                        }
                    }
                })
            } catch (e) { }
        }
        for (const o in settings.otherhide) {
            try {
                $(`.c-navigator--header-content .c-navigator--nav_wrap .c-navigator--dropdown .c-navigator--dropdown_item`).each((_, e) => {
                    if (e.innerText == o) {
                        if (!settings.otherhide[o]) {
                            e.style.display = ""
                        } else {
                            e.style.display = "none"
                        }
                    }
                })
            } catch (e) { }
        }
        for (const o in settings.coursehide) {
            try {
                $(`.r-course-c-block--block`).each((a, e) => {
                    const data = {
                        "源码编程课": "0 1 2 3 4 5 6",
                        "3D编程课": "7 8",
                        "Python编程课": "9",
                        "移动端编程课": "10 11",
                        "幼儿编程课": "12",
                    }
                    for (const iii in data) {
                        let iiii = data[iii].split(" ")
                        if (iiii.includes(String(a))) {
                            if (settings.coursehide[iii]) {
                                e.style.display = "none"
                            } else {
                                e.style.display = ""
                            }
                        }
                    }
                })
            } catch (e) { }
        }
        for (const o in settings.usercenterhide) {
            const data = {
                "等级": "r-user-c-banner--icon",
                "工作室": "r-user-c-tooltips--tooltip",
                "我正在做什么": "r-user-c-button-panel--bottom",
                "荣誉墙": "r-user-c-slide-panel--middle",
                "关注、粉丝": "r-user-c-slide-panel--top",
            }
            try {
                $("." + data[o]).each((_, e) => {
                    if (!settings.usercenterhide[o]) {
                        e.style.display = ""
                    } else {
                        e.style.display = "none"
                    }
                })
            } catch (e) { }
        }
    }
    updatePage()

    // 帖子防吞格式
    if (/.+:\/\/shequ.codemao.cn\/community\/.+/.test(window.location.href)) {
        const textarea = "#react-tinymce-0_ifr";
        var doNotShield = {
            run: async () => {
                const content = document.querySelector(textarea).contentDocument.body;
                const data = `<!DOCTYPE HTML>
<html lang="ch-Zh">
<head>
    <meta charset="utf-8">
    <link href="https://static.codemao.cn/community/prism/prism.min.css" rel="stylesheet" type="text/css" />
</head>
<body>
    ${content.innerHTML}
</body>
</html>`;
                document.querySelector(textarea).contentDocument.body.innerHTML = `<iframe style="width: 100%; height: 100%; display: block; margin: 40px auto; max-width: 100%;" class="do-not-shield"></iframe>`;
                document.querySelector(textarea).contentDocument.querySelector('.do-not-shield').contentDocument.write(`
            <form method="post" style="display:none;" action="https://codemaoblog.pythonanywhere.com/box3/hash/new">
			<input name="text">
			<input type="submit">
		</form>
		<script>
			document.querySelector('input').value = \`${data}\`;
			document.querySelectorAll('input')[1].click();
		</script>`);
                setTimeout(() => {
                    document.querySelector(textarea).contentDocument.querySelector('.do-not-shield').setAttribute('src', '//codemaoblog.pythonanywhere.com/box3/hash.html?hash=' + md5(data.replaceAll('\n', ''), 32))
                }, 1000)
            }
        };
        doNotShield.run();
    }

    // 样式表
    GM_addStyle(`
    /* 辅色调 */
    .c-navigator--header-content .c-navigator--nav_wrap .c-navigator--item:hover,
    .r-discover-c-tagList--sort_cont .r-discover-c-tagList--sort_item:hover,
    .r-community--search_container .r-community--search_header .r-community--send_btn:hover,
    .r-work_shop-r-details--details_wrap .r-work_shop-r-details--header_cont .r-work_shop-r-details--btns_wrap .r-work_shop-r-details--btn:hover,
    .c-comment--comment_sender .c-comment--comment_btn:hover,
    .c-comment-c-comment_reply--reply_container .c-comment-c-comment_reply--reply_bottom .c-comment-c-comment_reply--reply_sender .c-comment-c-comment_reply--reply_send a:hover,
    .r-work-c-author_info--focus_btn.r-work-c-author_info--not_focus:hover,
    .r-work-c-comment_area--comment_sender .r-work-c-comment_area--comment_btn:hover,
    .r-work-c-comment_area-c-comment_reply--reply_container .r-work-c-comment_area-c-comment_reply--reply_bottom .r-work-c-comment_area-c-comment_reply--reply_sender .r-work-c-comment_area-c-comment_reply--reply_send a:hover,
    .r-user-c-banner--banner .r-user-c-banner--background .r-user-c-banner--container .r-user-c-banner--right-box .r-user-c-banner--btn.r-user-c-banner--unattention:hover,
    .r-community-r-detail--forum_container .r-community-r-detail--forum_bottom .r-community-r-detail--add_reply:hover,
    .r-community-r-detail-c-comment_reply--reply_container .r-community-r-detail-c-comment_reply--reply_bottom .r-community-r-detail-c-comment_reply--reply_sender .r-community-r-detail-c-comment_reply--reply_send a:hover,
    .r-studio--right_wrap .r-studio--send_btn:hover,
    .c-navigator--header-content .c-navigator--nav_wrap .c-navigator--selected,
    .c-navigator--header-content .c-navigator--user_wrap .c-navigator--avatar_wrap:hover,
    .c-navigator--header-content .c-navigator--user_wrap .c-navigator--message_wrap:hover,
    .r-community-c-forum_sender--bottom_options .r-community-c-forum_sender--option:hover,
    .r-setting--account_setting .r-setting--setting_item .r-setting--setting_btn:hover,
    .r-community-r-detail--comment_sender .r-community-r-detail--sender_container .r-community-r-detail--options .r-community-r-detail--send_btn:hover,
    .r-community-r-detail-c-report_comment--bottom_options .r-community-r-detail-c-report_comment--option:hover,
    .r-user-c-banner--banner .r-user-c-banner--background .r-user-c-banner--container .r-user-c-banner--right-box .r-user-c-banner--btn.r-user-c-banner--master:hover,
    .r-work_manager--work_manager_wrap .r-work_manager--content_wrap .r-work_manager--content_container .r-work_manager--content .r-work_manager--blank_content .r-work_manager--wrap .r-work_manager--create_button .r-work_manager--web_create:hover
    {background:var(--xhbcmpre-theme-hover)!important;}
    /* 突出色 */
    .c-navigator--header-content .c-navigator--ide_link,
    .r-work_shop-c-user_card--user_item .r-work_shop-c-user_card--number_one,
    .r-work_shop-c-user_card--user_item .r-work_shop-c-user_card--number_one.r-work_shop-c-user_card--number_two
    {background:var(--xhbcmpre-theme-highlight)!important;}
    /* 透明色 */
    .r-course-c-block--block .r-course-c-block--area .r-course-c-block--tag.r-course-c-block--active,
    .c-post_list--post_container .c-post_list--post_footer .c-post_list--has_reply,
    .c-post_list--post_container .c-post_list--post_footer .c-post_list--has_reply:hover,
    .r-mall-r-home--title_all .r-mall-r-home--title .r-mall-r-home--tap.r-mall-r-home--select,
    .r-mall-r-theme--theme_wrap .r-mall-r-theme--category_list li.r-mall-r-theme--select,
    .r-gallery--labels .r-gallery--label_active,
    .r-work_manager--work_panel_header .r-work_manager--status_tab_container .r-work_manager--status_tab.r-work_manager--selected,
    .r-work_manager-c-sidebar--sidebar .r-work_manager-c-sidebar--work_type_list_wrap .r-work_manager-c-sidebar--work_type_list .r-work_manager-c-sidebar--work_type_item:hover
    {background:var(--xhbcmpre-theme-transparent)!important;}
    /* 主题色 */
    .c-navigator--navigator,
    .r-discover-c-tagList--sort_cont .r-discover-c-tagList--sort_item.r-discover-c-tagList--select,
    .r-community--search_container .r-community--search_header .r-community--send_btn,
    .r-community--forum_filter .r-community--filter_tab.r-community--active span,
    .c-pagination--btn.c-pagination--page-container .c-pagination--activePage,
    .r-work_shop-r-details--details_wrap .r-work_shop-r-details--header_cont .r-work_shop-r-details--nav_cont .r-work_shop-r-details--nav.r-work_shop-r-details--select:after,
    .r-work_shop-r-details--details_wrap .r-work_shop-r-details--header_cont .r-work_shop-r-details--btns_wrap .r-work_shop-r-details--btn,
    .c-pagination--btn.c-pagination--page-container .c-pagination--activePage,
    .c-comment-c-comment_reply--reply_container .c-comment-c-comment_reply--reply_bottom .c-comment-c-comment_reply--reply_sender .c-comment-c-comment_reply--reply_send a,
    .c-comment--comment_sender .c-comment--comment_btn,
    .r-work-c-author_info--focus_btn.r-work-c-author_info--not_focus,
    .r-work-c-comment_area--comment_sender .r-work-c-comment_area--comment_btn,
    .r-work-c-comment_area-c-comment_reply--reply_container .r-work-c-comment_area-c-comment_reply--reply_bottom .r-work-c-comment_area-c-comment_reply--reply_sender .r-work-c-comment_area-c-comment_reply--reply_send a,
    .r-user-c-banner--banner .r-user-c-banner--background .r-user-c-banner--container .r-user-c-banner--right-box .r-user-c-banner--btn.r-user-c-banner--unattention,
    .r-community-r-detail--forum_container .r-community-r-detail--forum_bottom .r-community-r-detail--add_reply,
    .r-community-r-detail-c-comment_reply--reply_container .r-community-r-detail-c-comment_reply--reply_bottom .r-community-r-detail-c-comment_reply--reply_sender .r-community-r-detail-c-comment_reply--reply_send a,
    .r-studio--right_wrap .r-studio--send_btn,
    .c-post_box-post_cont--post_cont .c-post_box-post_cont--send_btn,
    .r-download-c-btn--btn .r-download-c-btn--text:hover,
    .r-download--down-load .r-download--zhichi-wrap button,
    .c-navigator--header-content,
    .r-community-c-forum_sender--bottom_options .r-community-c-forum_sender--option,
    .r-work_manager-c-create_button--block,
    .r-work_manager-c-sidebar--sidebar .r-work_manager-c-sidebar--work_type_list_wrap .r-work_manager-c-sidebar--work_type_list .r-work_manager-c-sidebar--work_type_item.r-work_manager-c-sidebar--selected,
    .r-work_manager-c-normal_work_card--normal_work_card .r-work_manager-c-normal_work_card--publish_tag,
    .r-message--container .r-message--nav_item.r-message--cur_nav:after,
    .line,
    .r-setting--main_area .r-setting--btn_save,
    .r-setting--account_setting .r-setting--setting_item .r-setting--setting_btn,
    .r-community-r-detail--comment_sender .r-community-r-detail--sender_container .r-community-r-detail--options .r-community-r-detail--send_btn,
    .mdui-checkbox input[type=checkbox]:checked+.mdui-checkbox-icon::after,
    .r-community-r-detail-c-report_comment--container .r-community-r-detail-c-report_comment--label_group .r-community-r-detail-c-report_comment--item_point i,
    .r-community-r-detail-c-report_comment--bottom_options .r-community-r-detail-c-report_comment--option,
    .r-work_manager-c-action_button--action_button:hover,
    .r-user-c-banner--banner .r-user-c-banner--background .r-user-c-banner--container .r-user-c-banner--right-box .r-user-c-banner--btn.r-user-c-banner--master,
    .mdui-radio-icon::before,
    .r-work_manager--work_manager_wrap .r-work_manager--content_wrap .r-work_manager--content_container .r-work_manager--content .r-work_manager--blank_content .r-work_manager--wrap .r-work_manager--create_button .r-work_manager--web_create
    {background:var(--xhbcmpre-theme-color)!important;}

    .r-home-c-section_header--section_header .r-home-c-section_header--right_text,
    .r-discover--header .r-discover--switch-box .r-discover--active,
    .r-discover-c-tagList--sort_cont .r-discover-c-tagList--sort_item:hover,
    .r-community--forum_filter .r-community--filter_tab.r-community--active,
    .r-community--forum_filter .r-community--filter_tab:hover,
    .r-course-c-block--block .r-course-c-block--area .r-course-c-block--tag.r-course-c-block--active,
    .r-course-c-block--block .r-course-c-block--area .r-course-c-block--tag:hover,
    .c-post_list--post_container .c-post_list--post_footer .c-post_list--has_reply,
    .r-community--search_container .r-community--search_header .r-community--roules_btn:hover,
    .r-mall-r-home--title_all .r-mall-r-home--title .r-mall-r-home--tap.r-mall-r-home--select,
    .r-mall-r-home--title_all .r-mall-r-home--title .r-mall-r-home--tap:hover,
    .r-mall-r-theme--theme_wrap .r-mall-r-theme--category_list li.r-mall-r-theme--select,
    .r-mall-r-theme--theme_wrap .r-mall-r-theme--category_list li:hover,
    .r-mall-r-theme--theme_wrap .r-mall-r-theme--order_list .r-mall-r-theme--active a,
    .r-work_shop-r-details--details_wrap .r-work_shop-r-details--header_cont .r-work_shop-r-details--nav_cont .r-work_shop-r-details--nav.r-work_shop-r-details--select,
    .r-work_shop-r-details--title_num .r-work_shop-r-details--tab.r-work_shop-r-details--select,
    .r-work_shop-r-details--title_num .r-work_shop-r-details--tab:hover,
    .c-comment-c-comment_item--content_container .c-comment-c-comment_item--content_bottom .c-comment-c-comment_item--content_praise.c-comment-c-comment_item--active,
    .r-work_shop-c-user_card--user_item .r-work_shop-c-user_card--nickname:hover,
    .r-work-c-comment_area-c-comment_item--content_container .r-work-c-comment_area-c-comment_item--content_bottom .r-work-c-comment_area-c-comment_item--content_praise.r-work-c-comment_area-c-comment_item--active,
    .r-user-c-banner--banner .r-user-c-banner--nav-box ul p.r-user-c-banner--active span,
    .r-user-c-banner--banner .r-user-c-banner--nav-box ul p:hover span,
    .r-user-r-project--project .r-user-r-project--guide>span.r-user-r-project--active,
    .r-user-r-project--project .r-user-r-project--guide>span:hover,
    .r-community-r-detail-c-comment_item--content_container .r-community-r-detail-c-comment_item--content_bottom .r-community-r-detail-c-comment_item--content_praise.r-community-r-detail-c-comment_item--active,
    .r-gallery--labels .r-gallery--label_active,
    .r-studio--cont .r-studio--center_cont .r-studio--header .r-studio--tap.r-studio--active a,
    .r-studio--right_wrap .r-studio--roules_btn:hover,
    .r-studio-c-user_item--user_item .r-studio-c-user_item--nickname:hover,
    .c-post_box-post_cont--post_cont .c-post_box-post_cont--send_btn:hover,
    .c-post_box-post_cont--post_cont .c-post_box-post_cont--roules_btn:hover,
    .r-download-c-btn--btn .r-download-c-btn--text,
    .r-download-c-card--card .r-download-c-card--right-box .r-download-c-card--footer .r-download-c-card--more,
    .r-discover-c-banner--banner_cont .r-discover-c-banner--item p:hover,
    .r-work_manager--work_panel_header .r-work_manager--status_tab_container .r-work_manager--status_tab.r-work_manager--selected,
    .r-message--container .r-message--nav_item.r-message--cur_nav, .r-message--container .r-message--nav_item.r-message--cur_nav span,
    .r-message-c-comments--comments_list .r-message-c-comments--comments_item .r-message-c-comments--contnet p .r-message-c-comments--work_name,
    .r-message--container .r-message--nav_item:hover, .r-message--container .r-message--nav_item:hover span,
    .mdui-text-color-primary,
    .r-message-c-buy--buy_list .r-message-c-buy--buy_item .r-message-c-buy--contnet p .r-message-c-buy--work_name,
    .loading_container,
    .r-discover--header .r-discover--switch-box li:hover,
    .r-setting--left_area a.r-setting--active,
    .r-work_manager--work_panel_header .r-work_manager--status_tab_container .r-work_manager--status_tab:hover,
    .r-community-r-detail-c-comment_item--content_container .r-community-r-detail-c-comment_item--content_bottom .r-community-r-detail-c-comment_item--content_praise.r-community-r-detail-c-comment_item--active i,
    .r-work-c-comment_area-c-comment_item--content_container .r-work-c-comment_area-c-comment_item--content_bottom .r-work-c-comment_area-c-comment_item--content_praise.r-work-c-comment_area-c-comment_item--active i,
    .r-work-c-comment_area-c-comment_editor--content_container .r-work-c-comment_area-c-comment_editor--edit_emotion .r-work-c-comment_area-c-comment_editor--insert_emotiion.r-work-c-comment_area-c-comment_editor--active,
    .r-work-c-comment_area-c-comment_editor--content_container .r-work-c-comment_area-c-comment_editor--edit_emotion .r-work-c-comment_area-c-comment_editor--insert_emotiion:hover,
    {color:var(--xhbcmpre-theme-color)!important;}

    .r-discover--header .r-discover--switch-box .r-discover--active,
    .r-discover-c-tagList--sort_cont .r-discover-c-tagList--sort_item.r-discover-c-tagList--select,
    .r-discover-c-tagList--sort_cont .r-discover-c-tagList--sort_item:hover,
    .r-discover--header .r-discover--search-box input:focus,
    .r-community--search_form input:focus,
    .c-pagination--btn.c-pagination--page-container .c-pagination--activePage,
    .r-mall-r-home--search_form input:focus,
    .c-pagination--btn.c-pagination--page-container .c-pagination--activePage,
    .c-comment-c-comment_reply--reply_container .c-comment-c-comment_reply--reply_bottom .c-comment-c-comment_reply--reply_sender .c-comment-c-comment_reply--reply_editor:focus,
    .r-work-c-comment_area-c-comment_reply--reply_container .r-work-c-comment_area-c-comment_reply--reply_bottom .r-work-c-comment_area-c-comment_reply--reply_sender .r-work-c-comment_area-c-comment_reply--reply_editor:focus,
    .r-user-c-banner--banner .r-user-c-banner--nav-box ul p.r-user-c-banner--active span,
    .r-community-r-detail-c-comment_reply--reply_container .r-community-r-detail-c-comment_reply--reply_bottom .r-community-r-detail-c-comment_reply--reply_sender .r-community-r-detail-c-comment_reply--reply_editor:focus,
    .r-studio--right_wrap .r-studio--search_form input:focus,
    .c-post_box-post_cont--post_cont .c-post_box-post_cont--search_form input:focus,
    .r-download-c-btn--btn .r-download-c-btn--text,
    .r-setting--setting_form .r-setting--form_item .r-setting--radio_input.r-setting--selected:before,
    .r-setting--account_setting .r-setting--setting_item .r-setting--setting_btn,
    .r-work_shop--container .r-work_shop--cont .r-work_shop--title .r-work_shop--search_cont .r-work_shop--search_form input:focus,
    .mdui-checkbox input[type=checkbox]:checked+.mdui-checkbox-icon::after,
    .r-community-r-detail-c-report_comment--container .r-community-r-detail-c-report_comment--label_group .r-community-r-detail-c-report_comment--item_point.r-community-r-detail-c-report_comment--select,
    .r-community-c-forum_sender--container .r-community-c-forum_sender--form_item .r-community-c-forum_sender--title_input:focus,
    .r-work-c-comment_area-c-comment_editor--content_container .r-work-c-comment_area-c-comment_editor--editor:focus,
    .r-work-c-comment_area-c-comment_editor--content_container .r-work-c-comment_area-c-comment_editor--edit_emotion .r-work-c-comment_area-c-comment_editor--insert_emotiion.r-work-c-comment_area-c-comment_editor--active,
    .r-work-c-comment_area-c-comment_editor--content_container .r-work-c-comment_area-c-comment_editor--edit_emotion .r-work-c-comment_area-c-comment_editor--insert_emotiion:hover,
    .mdui-radio input[type=radio]:checked+.mdui-radio-icon
    {border-color:var(--xhbcmpre-theme-color)!important;}
    /* 其他 */
    .r-discover-c-tagList--sort_cont .r-discover-c-tagList--sort_item:hover{color:#fff!important;background:var(--xhbcmpre-theme-hover)!important;}
    .mdui-dialog-actions .mdui-btn{color:var(--xhbcmpre-theme-color)!important;}
    .r-home-c-banner--banner_sub_item > a{position: unset!important;}
    .c-post_box-post_cont--post_cont .c-post_box-post_cont--send_btn:hover{color:#fff!important}
    .r-home-c-community_star--user_recommend_cont .r-home-c-community_star--user_recommend_item[data-data_report_btn_name="首页-社区星推荐"] a{position: unset!important;}
    .CodemaoPrettify-ColorBox span {font-size: larger;margin-left: 5px;}
    .CodemaoPrettify-ColorBox input {background: #fff;}
    .r-setting--account_setting .r-setting--setting_item .r-setting--setting_btn{color:#fff!important;}
    .CodemaoPrettify-flex {display: flex;flex-direction: column;}
    .CodemaoPrettify-flex .mdui-textfield{padding:0px}
    .mdui-checkbox input[type=checkbox]:focus:not(:disabled):checked+.mdui-checkbox-icon, .mdui-checkbox input[type=checkbox]:focus:not(:disabled):indeterminate+.mdui-checkbox-icon, .mdui-checkbox:active input[type=checkbox]:not(:disabled):checked+.mdui-checkbox-icon, .mdui-checkbox:active input[type=checkbox]:not(:disabled):indeterminate+.mdui-checkbox-icon{-webkit-box-shadow: 0 0 0 15px var(--xhbcmpre-theme-transparent);box-shadow: 0 0 0 15px var(--xhbcmpre-theme-transparent);}
    .mdui-radio input[type=radio]:focus:checked:not(:disabled)+.mdui-radio-icon, .mdui-radio:active input[type=radio]:checked:not(:disabled)+.mdui-radio-icon{-webkit-box-shadow: 0 0 0 15px var(--xhbcmpre-theme-transparent);box-shadow: 0 0 0 15px var(--xhbcmpre-theme-transparent);}
    .mdui-textfield-focus .mdui-textfield-input, .mdui-textfield-focus .mdui-textfield-input:hover {border-bottom-color: var(--xhbcmpre-theme-color)!important;-webkit-box-shadow: 0 1px 0 0 var(--xhbcmpre-theme-color)!important;box-shadow: 0 1px 0 0 var(--xhbcmpre-theme-color)!important;}
   /* ::-moz-selection {background: var(--xhbcmpre-theme-color)!important;color: #fff;}
    ::selection {background: var(--xhbcmpre-theme-color)!important;color: #fff;}*/
`);
    logs("主题色应用样式加载完毕");

    // 加载完毕
    logs("加载完毕，用时", Date.now() - starttime, "ms");
})
