/*
   Author ZhouJT(jason_zhou05@163.com) 2016
*/
var Local = function (power) {
    this.version = 10094;
    if (typeof power == "string") {
        this.power = power;
    }
    else {
        this.power = "private";
    }
};

Local.prototype.loadJs = function (name, url, version, callback) {
    var self = this;

    if (window.localStorage) {
        var xhr;
        var js = localStorage.getItem(name);
        // 如果没有版本更新，检测是否已经创建标签
        var link = document.getElementsByClassName(name);
        if (js != null && js.length > 0) {
            if (link.length > 0 && link[0].getAttribute("version") == version) {
                if (callback != null) {
                    callback();
                }
                return;
            }
        }
        if (js == null || js.length == 0 || version != localStorage.getItem(name + "version") ||
            (link.length > 0 && link[0].getAttribute("version") != version)) {
            if (window.ActiveXObject) {
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            } else if (window.XMLHttpRequest) {
                xhr = new XMLHttpRequest();
            }
            if (xhr != null) {
                xhr.open("GET", url + "?v=" + version);
                xhr.onreadystatechange = function () {
                    if (xhr.readyState == 4) {
                        if (xhr.status == 200) {
                            js = xhr.responseText;
                            localStorage.setItem(name, js);
                            localStorage.setItem(name + "version", version);
                            js = js == null ? "" : js;
                            self.writeJs(name, js);
                            if (callback != null) {
                                callback();
                            }
                        }
                        else {
                            self.linkJs(name, url + "?v=" + version, callback);
                        }
                    }
                };
                xhr.send(null);
            }
        }
        else {
            self.writeJs(name, js);
            if (callback != null) {
                callback();
            }
        }
    } else {
        self.linkJs(name, url + "?v=" + version);
    }
};

Local.prototype.loadCss = function (name, url, version) {
    var self = this;
    if (window.localStorage) {
        var xhr;
        var css = localStorage.getItem(name);
        // 如果没有版本更新，检测是否已经创建标签
        var link = document.getElementsByClassName(name);
        if (js != null && js.length > 0) {
            if (link.length > 0 && link[0].getAttribute("version") == this.version) {
                return;
            }
            self.writeCss(name, js);
            return;
        }
        if (css == null || css.length == 0 || version != localStorage.getItem(name + "version") ||
            (link.length > 0 && link[0].getAttribute("version") != version)) {
            if (window.ActiveXObject) {
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            } else if (window.XMLHttpRequest) {
                xhr = new XMLHttpRequest();
            }
            if (xhr != null) {
                xhr.open("GET", url + "?v=" + version);
                xhr.onreadystatechange = function () {
                    if (xhr.readyState == 4) {
                        if (xhr.status == 200) {
                            css = xhr.responseText;
                            localStorage.setItem(name, css);
                            localStorage.setItem(name + "version", version);
                            css = css == null ? "" : css;
                            self.writeCss(name, css);
                        }
                        else {
                            self.linkCss(name, url + "?v=" + version, callback);
                        }

                    }
                };
                xhr.send(null);
            }
        }
    } else {
        self.linkCss(name, url + "?v=" + version);
    }
};

Local.prototype.writeJs = function (name, text) {
    // 检测是否已经存在标签
    var head = null;
    if (this.power == "private") {
        head = document.getElementsByClassName('page-script').item(0);
    }
    else if (this.power == "public") {
        head = document.getElementsByClassName('public-script').item(0);
    }
    var link = document.getElementsByClassName(name);
    if (link.length > 0) {
        link[0].innerHTML = text;
        link[0].setAttribute("version", this.version);
        return;
    }
    link = document.createElement("script");
    link.type = "text/javascript";
    link.className = name;
    link.innerHTML = text;
    link.setAttribute("version", this.version);
    head.appendChild(link);
}

Local.prototype.writeCss = function (name, text) {
    var head = document.getElementsByTagName('HEAD').item(0);
    var link = document.getElementsByClassName(name);
    if (link.length > 0) {
        link[0].innerHTML = text;
        link[0].setAttribute("version", this.version);
        return;
    }
    link = document.createElement("style");
    link.type = "text/css";
    link.className = name;
    link.innerHTML = text;
    link.setAttribute("version", this.version);
    head.appendChild(link);
}

Local.prototype.linkJs = function (name, url, callback) {
    var head = null;
    if (this.power == "private") {
        head = document.getElementsByClassName('page-script').item(0);
    }
    else if (this.power == "public") {
        head = document.getElementsByClassName('public-script').item(0);
    }
    var link = document.createElement("script");
    link.type = "text/javascript";
    link.className = name;
    link.src = url;
    link.version = this.version;
    if (typeof callback == "function")
        link.onload = callback;
    head.appendChild(link);
}

Local.prototype.linkCss = function (name, url, callback) {
    var head = document.getElementsByClassName('HEAD').item(0);
    var link = document.createElement("link");
    link.type = "text/css";
    link.rel = "stylesheet";
    link.rev = "stylesheet";
    link.media = "screen";
    link.className = name;
    link.href = url;
    link.version = this.version;
    if (typeof callback == "function")
        link.onload = callback;
    head.appendChild(link);
}

