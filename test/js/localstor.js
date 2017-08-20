 /*
    Author ZhouJT(jason_zhou05@163.com) 2016
 */
var Local = function () {
    this.version = 10018;
};

Local.prototype.loadJs = function (name, url, version, callback) {
    var self = this;
    var ele = document.getElementsByClassName(name);
    if (ele.length > 0) {
        if (callback != null) {
            callback();
        }
        return;
    }
    if (window.localStorage) {
        var xhr;
        var js = localStorage.getItem(name);
        if (js == null || js.length == 0 || version != localStorage.getItem(name + "version")) {
            if (window.ActiveXObject) {
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            } else if (window.XMLHttpRequest) {
                xhr = new XMLHttpRequest();
            }
            if (xhr != null) {
                xhr.open("GET", url);
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
                            self.linkJs(name, url, callback);
                        }
                    }
                };
                xhr.send(null);
            }
        } else {
            self.writeJs(name, js);
            if (callback != null) {
                callback();
            }
        }
    } else {
        self.linkJs(name, url);
    }
};

Local.prototype.loadCss = function (name, url, version) {
    var self = this;
    var ele = document.getElementsByClassName(name);
    if (ele.length > 0) {
        if (callback != null) {
            callback();
        }
        return;
    }
    if (window.localStorage) {
        var xhr;
        var css = localStorage.getItem(name);
        if (css == null || css.length == 0 || version != localStorage.getItem(name + "version")) {
            if (window.ActiveXObject) {
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            } else if (window.XMLHttpRequest) {
                xhr = new XMLHttpRequest();
            }
            if (xhr != null) {
                xhr.open("GET", url);
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
                            self.linkCss(name, url, callback);
                        }

                    }
                };
                xhr.send(null);
            }
        } else {
            self.writeCss(name, css);
        }
    } else {
        self.linkCss(name, url);
    }
};

Local.prototype.writeJs = function (name, text) {
    var head = document.getElementsByTagName('HEAD').item(0);
    var link = document.createElement("script");
    link.type = "text/javascript";
    link.className = name;
    link.innerHTML = text;
    head.appendChild(link);
}

Local.prototype.writeCss = function (name, text) {
    var head = document.getElementsByTagName('HEAD').item(0);
    var link = document.createElement("style");
    link.type = "text/css";
    link.className = name;
    link.innerHTML = text;
    head.appendChild(link);
}

Local.prototype.linkJs = function (name, url, callback) {
    var head = document.getElementsByTagName('HEAD').item(0);
    var link = document.createElement("script");
    link.type = "text/javascript";
    link.className = name;
    link.src = url;
    if (typeof callback == "function")
        link.onload = callback;
    head.appendChild(link);
}

Local.prototype.linkCss = function (name, url, callback) {
    var head = document.getElementsByTagName('HEAD').item(0);
    var link = document.createElement("link");
    link.type = "text/css";
    link.rel = "stylesheet";
    link.rev = "stylesheet";
    link.media = "screen";
    link.className = name;
    link.href = url;
    if (typeof callback == "function")
        link.onload = callback;
    head.appendChild(link);
}
