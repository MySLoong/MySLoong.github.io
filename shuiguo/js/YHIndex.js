/////////////////////////////////////////////////////////////////////////////
// 保存指定网页内容
var SavePage = function (pageName,pageVersion) {
    if (typeof (window.localStorage) == "undefined" || typeof (JSON) == "undefined" || typeof pageName != "string" || pageName.length <= 0) {
        return false;
    }
    var PageList = null;
    if (!localStorage.PageList) {
        PageList = {};
        localStorage.PageList = JSON.stringify(PageList);
    }
    PageList = JSON.parse(localStorage.PageList);
    if (PageList == null || typeof PageList != "object") {
        PageList = {};
        localStorage.PageList = JSON.stringify(PageList)
    }
    PageList = JSON.parse(localStorage.PageList);
    pageName = pageName.replace(/-/g, "_");
    if (typeof PageList[pageName] == "object" && eval(PageList[pageName].PageCheck) && PageList[pageName].PageVersion == pageVersion) {
        return false;
    }
    // 注册当前页
    PageList[pageName] = {
        PageName: pageName,
        PageCheck: "PageCheck('" + pageName + "')",
        PageVersion:pageVersion
    };
    localStorage.PageList = JSON.stringify(PageList);

    // 写入当前页
    var PageInfo = {
        PageHead: $("head").html(),
        PageContent: $(".page-content").html(),
        PageScript:$(".page-script").html()
    };
    eval("(localStorage." + pageName + "=JSON.stringify(PageInfo))");
}

/////////////////////////////////////////////////////////////////////////////
// 检测指定网页是否需要更新
var PageCheck = function (pageNname) {
    var flag = false;
    //$.ajax({
    //    type: "post",
    //    url: "YHAshx/PageManager.ashx",
    //    data: { action: pageNname },
    //    async: false,
    //    success: function (data) {
    //        if (data == null || data == undefined) {
    //            flag = false;
    //            return;
    //        }
    //        if (data.flag == null || data.flag == undefined) {
    //            flag = false;
    //            return;
    //        }
    //        flag = data.flag;
    //    },
    //    error: function (xhr) {
    //        flag = true;
    //    }
    //});
    //return flag;
    return true;
}

////////////////////////////////////////////////////////////////////////////
// 从本地储存中读取指定网页
var LoadPage = function (pageName, pageUrl) {
    pageName = pageName.replace(/-/g, "_");
    if (typeof (window.localStorage) != "undefined" && typeof (JSON) != "undefined") {
        var PageList = null;
        if (!localStorage.PageList) {
            PageList: { };
            localStorage.PageList = JSON.stringify(PageList)
        }
        PageList = JSON.parse(localStorage.PageList);
        if (typeof PageList[pageName] != "object" || !eval(PageList[pageName].PageCheck)) {
            window.location.href = pageUrl;
            return false;
        }
        var PageInfo = JSON.parse(eval("localStorage." + pageName));
        if (typeof PageInfo != "object") {
            window.location.href = pageUrl;
            return false;
        }
        var strName = $("body").attr("class");
        if (typeof strName == "string" && strName == pageName) {
            return false;
        }
        //$("body").html("");
        //$("head").html("");
        //$("head").html(PageInfo.PageHead);
        $("body").attr("class", pageName);
        $("body").attr("version", PageList[pageName].PageVersion);
        $(".page-content").html(PageInfo.PageContent);
        $(".page-script").html(PageInfo.PageScript);
    }
}

$(function () {
    var liClick = function () {
        var pageName = $(this).find("a").attr("href").replace(".html", "").replace(/-/g, "_");
        LoadPage(pageName, $(this).find("a").attr("href"));
        $(".active").removeClass("active");
        $(this).attr("class", "active");
        window.location.href = window.location.href + "#" + pageName;
        return false;
    }
    $(".footer").find("li").unbind("click").bind("click", liClick);
});