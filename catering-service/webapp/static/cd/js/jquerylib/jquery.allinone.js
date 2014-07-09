(function () {
    var l = this, g, y = l.jQuery, p = l.$, o = l.jQuery = l.$ = function (E, F) {
        return new o.fn.init(E, F)
    }, D = /^[^<]*(<(.|\s)+>)[^>]*$|^#([\w-]+)$/, f = /^.[^:#\[\.,]*$/;
    o.fn = o.prototype = {init: function (E, H) {
        E = E || document;
        if (E.nodeType) {
            this[0] = E;
            this.length = 1;
            this.context = E;
            return this
        }
        if (typeof E === "string") {
            var G = D.exec(E);
            if (G && (G[1] || !H)) {
                if (G[1]) {
                    E = o.clean([G[1]], H)
                } else {
                    var I = document.getElementById(G[3]);
                    if (I && I.id != G[3]) {
                        return o().find(E)
                    }
                    var F = o(I || []);
                    F.context = document;
                    F.selector = E;
                    return F
                }
            } else {
                return o(H).find(E)
            }
        } else {
            if (o.isFunction(E)) {
                return o(document).ready(E)
            }
        }
        if (E.selector && E.context) {
            this.selector = E.selector;
            this.context = E.context
        }
        return this.setArray(o.isArray(E) ? E : o.makeArray(E))
    }, selector: "", jquery: "1.3.2", size: function () {
        return this.length
    }, get: function (E) {
        return E === g ? Array.prototype.slice.call(this) : this[E]
    }, pushStack: function (F, H, E) {
        var G = o(F);
        G.prevObject = this;
        G.context = this.context;
        if (H === "find") {
            G.selector = this.selector + (this.selector ? " " : "") + E
        } else {
            if (H) {
                G.selector = this.selector + "." + H + "(" + E + ")"
            }
        }
        return G
    }, setArray: function (E) {
        this.length = 0;
        Array.prototype.push.apply(this, E);
        return this
    }, each: function (F, E) {
        return o.each(this, F, E)
    }, index: function (E) {
        return o.inArray(E && E.jquery ? E[0] : E, this)
    }, attr: function (F, H, G) {
        var E = F;
        if (typeof F === "string") {
            if (H === g) {
                return this[0] && o[G || "attr"](this[0], F)
            } else {
                E = {};
                E[F] = H
            }
        }
        return this.each(function (I) {
            for (F in E) {
                o.attr(G ? this.style : this, F, o.prop(this, E[F], G, I, F))
            }
        })
    }, css: function (E, F) {
        if ((E == "width" || E == "height") && parseFloat(F) < 0) {
            F = g
        }
        return this.attr(E, F, "curCSS")
    }, text: function (F) {
        if (typeof F !== "object" && F != null) {
            return this.empty().append((this[0] && this[0].ownerDocument || document).createTextNode(F))
        }
        var E = "";
        o.each(F || this, function () {
            o.each(this.childNodes, function () {
                if (this.nodeType != 8) {
                    E += this.nodeType != 1 ? this.nodeValue : o.fn.text([this])
                }
            })
        });
        return E
    }, wrapAll: function (E) {
        if (this[0]) {
            var F = o(E, this[0].ownerDocument).clone();
            if (this[0].parentNode) {
                F.insertBefore(this[0])
            }
            F.map(function () {
                var G = this;
                while (G.firstChild) {
                    G = G.firstChild
                }
                return G
            }).append(this)
        }
        return this
    }, wrapInner: function (E) {
        return this.each(function () {
            o(this).contents().wrapAll(E)
        })
    }, wrap: function (E) {
        return this.each(function () {
            o(this).wrapAll(E)
        })
    }, append: function () {
        return this.domManip(arguments, true, function (E) {
            if (this.nodeType == 1) {
                this.appendChild(E)
            }
        })
    }, prepend: function () {
        return this.domManip(arguments, true, function (E) {
            if (this.nodeType == 1) {
                this.insertBefore(E, this.firstChild)
            }
        })
    }, before: function () {
        return this.domManip(arguments, false, function (E) {
            this.parentNode.insertBefore(E, this)
        })
    }, after: function () {
        return this.domManip(arguments, false, function (E) {
            this.parentNode.insertBefore(E, this.nextSibling)
        })
    }, end: function () {
        return this.prevObject || o([])
    }, push: [].push, sort: [].sort, splice: [].splice, find: function (E) {
        if (this.length === 1) {
            var F = this.pushStack([], "find", E);
            F.length = 0;
            o.find(E, this[0], F);
            return F
        } else {
            return this.pushStack(o.unique(o.map(this, function (G) {
                return o.find(E, G)
            })), "find", E)
        }
    }, clone: function (G) {
        var E = this.map(function () {
            if (!o.support.noCloneEvent && !o.isXMLDoc(this)) {
                var I = this.outerHTML;
                if (!I) {
                    var J = this.ownerDocument.createElement("div");
                    J.appendChild(this.cloneNode(true));
                    I = J.innerHTML
                }
                return o.clean([I.replace(/ jQuery\d+="(?:\d+|null)"/g, "").replace(/^\s*/, "")])[0]
            } else {
                return this.cloneNode(true)
            }
        });
        if (G === true) {
            var H = this.find("*").andSelf(), F = 0;
            E.find("*").andSelf().each(function () {
                if (this.nodeName !== H[F].nodeName) {
                    return
                }
                var I = o.data(H[F], "events");
                for (var K in I) {
                    for (var J in I[K]) {
                        o.event.add(this, K, I[K][J], I[K][J].data)
                    }
                }
                F++
            })
        }
        return E
    }, filter: function (E) {
        return this.pushStack(o.isFunction(E) && o.grep(this, function (G, F) {
            return E.call(G, F)
        }) || o.multiFilter(E, o.grep(this, function (F) {
            return F.nodeType === 1
        })), "filter", E)
    }, closest: function (E) {
        var G = o.expr.match.POS.test(E) ? o(E) : null, F = 0;
        return this.map(function () {
            var H = this;
            while (H && H.ownerDocument) {
                if (G ? G.index(H) > -1 : o(H).is(E)) {
                    o.data(H, "closest", F);
                    return H
                }
                H = H.parentNode;
                F++
            }
        })
    }, not: function (E) {
        if (typeof E === "string") {
            if (f.test(E)) {
                return this.pushStack(o.multiFilter(E, this, true), "not", E)
            } else {
                E = o.multiFilter(E, this)
            }
        }
        var F = E.length && E[E.length - 1] !== g && !E.nodeType;
        return this.filter(function () {
            return F ? o.inArray(this, E) < 0 : this != E
        })
    }, add: function (E) {
        return this.pushStack(o.unique(o.merge(this.get(), typeof E === "string" ? o(E) : o.makeArray(E))))
    }, is: function (E) {
        return!!E && o.multiFilter(E, this).length > 0
    }, hasClass: function (E) {
        return!!E && this.is("." + E)
    }, val: function (K) {
        if (K === g) {
            var E = this[0];
            if (E) {
                if (o.nodeName(E, "option")) {
                    return(E.attributes.value || {}).specified ? E.value : E.text
                }
                if (o.nodeName(E, "select")) {
                    var I = E.selectedIndex, L = [], M = E.options, H = E.type == "select-one";
                    if (I < 0) {
                        return null
                    }
                    for (var F = H ? I : 0, J = H ? I + 1 : M.length; F < J; F++) {
                        var G = M[F];
                        if (G.selected) {
                            K = o(G).val();
                            if (H) {
                                return K
                            }
                            L.push(K)
                        }
                    }
                    return L
                }
                return(E.value || "").replace(/\r/g, "")
            }
            return g
        }
        if (typeof K === "number") {
            K += ""
        }
        return this.each(function () {
            if (this.nodeType != 1) {
                return
            }
            if (o.isArray(K) && /radio|checkbox/.test(this.type)) {
                this.checked = (o.inArray(this.value, K) >= 0 || o.inArray(this.name, K) >= 0)
            } else {
                if (o.nodeName(this, "select")) {
                    var N = o.makeArray(K);
                    o("option", this).each(function () {
                        this.selected = (o.inArray(this.value, N) >= 0 || o.inArray(this.text, N) >= 0)
                    });
                    if (!N.length) {
                        this.selectedIndex = -1
                    }
                } else {
                    this.value = K
                }
            }
        })
    }, html: function (E) {
        return E === g ? (this[0] ? this[0].innerHTML.replace(/ jQuery\d+="(?:\d+|null)"/g, "") : null) : this.empty().append(E)
    }, replaceWith: function (E) {
        return this.after(E).remove()
    }, eq: function (E) {
        return this.slice(E, +E + 1)
    }, slice: function () {
        return this.pushStack(Array.prototype.slice.apply(this, arguments), "slice", Array.prototype.slice.call(arguments).join(","))
    }, map: function (E) {
        return this.pushStack(o.map(this, function (G, F) {
            return E.call(G, F, G)
        }))
    }, andSelf: function () {
        return this.add(this.prevObject)
    }, domManip: function (J, M, L) {
        if (this[0]) {
            var I = (this[0].ownerDocument || this[0]).createDocumentFragment(), F = o.clean(J, (this[0].ownerDocument || this[0]), I), H = I.firstChild;
            if (H) {
                for (var G = 0, E = this.length; G < E; G++) {
                    L.call(K(this[G], H), this.length > 1 || G > 0 ? I.cloneNode(true) : I)
                }
            }
            if (F) {
                o.each(F, z)
            }
        }
        return this;
        function K(N, O) {
            return M && o.nodeName(N, "table") && o.nodeName(O, "tr") ? (N.getElementsByTagName("tbody")[0] || N.appendChild(N.ownerDocument.createElement("tbody"))) : N
        }
    }};
    o.fn.init.prototype = o.fn;
    function z(E, F) {
        if (F.src) {
            o.ajax({url: F.src, async: false, dataType: "script"})
        } else {
            o.globalEval(F.text || F.textContent || F.innerHTML || "")
        }
        if (F.parentNode) {
            F.parentNode.removeChild(F)
        }
    }

    function e() {
        return+new Date
    }

    o.extend = o.fn.extend = function () {
        var J = arguments[0] || {}, H = 1, I = arguments.length, E = false, G;
        if (typeof J === "boolean") {
            E = J;
            J = arguments[1] || {};
            H = 2
        }
        if (typeof J !== "object" && !o.isFunction(J)) {
            J = {}
        }
        if (I == H) {
            J = this;
            --H
        }
        for (; H < I; H++) {
            if ((G = arguments[H]) != null) {
                for (var F in G) {
                    var K = J[F], L = G[F];
                    if (J === L) {
                        continue
                    }
                    if (E && L && typeof L === "object" && !L.nodeType) {
                        J[F] = o.extend(E, K || (L.length != null ? [] : {}), L)
                    } else {
                        if (L !== g) {
                            J[F] = L
                        }
                    }
                }
            }
        }
        return J
    };
    var b = /z-?index|font-?weight|opacity|zoom|line-?height/i, q = document.defaultView || {}, s = Object.prototype.toString;
    o.extend({noConflict: function (E) {
        l.$ = p;
        if (E) {
            l.jQuery = y
        }
        return o
    }, isFunction: function (E) {
        return s.call(E) === "[object Function]"
    }, isArray: function (E) {
        return s.call(E) === "[object Array]"
    }, isXMLDoc: function (E) {
        return E.nodeType === 9 && E.documentElement.nodeName !== "HTML" || !!E.ownerDocument && o.isXMLDoc(E.ownerDocument)
    }, globalEval: function (G) {
        if (G && /\S/.test(G)) {
            var F = document.getElementsByTagName("head")[0] || document.documentElement, E = document.createElement("script");
            E.type = "text/javascript";
            if (o.support.scriptEval) {
                E.appendChild(document.createTextNode(G))
            } else {
                E.text = G
            }
            F.insertBefore(E, F.firstChild);
            F.removeChild(E)
        }
    }, nodeName: function (F, E) {
        return F.nodeName && F.nodeName.toUpperCase() == E.toUpperCase()
    }, each: function (G, K, F) {
        var E, H = 0, I = G.length;
        if (F) {
            if (I === g) {
                for (E in G) {
                    if (K.apply(G[E], F) === false) {
                        break
                    }
                }
            } else {
                for (; H < I;) {
                    if (K.apply(G[H++], F) === false) {
                        break
                    }
                }
            }
        } else {
            if (I === g) {
                for (E in G) {
                    if (K.call(G[E], E, G[E]) === false) {
                        break
                    }
                }
            } else {
                for (var J = G[0]; H < I && K.call(J, H, J) !== false; J = G[++H]) {
                }
            }
        }
        return G
    }, prop: function (H, I, G, F, E) {
        if (o.isFunction(I)) {
            I = I.call(H, F)
        }
        return typeof I === "number" && G == "curCSS" && !b.test(E) ? I + "px" : I
    }, className: {add: function (E, F) {
        o.each((F || "").split(/\s+/), function (G, H) {
            if (E.nodeType == 1 && !o.className.has(E.className, H)) {
                E.className += (E.className ? " " : "") + H
            }
        })
    }, remove: function (E, F) {
        if (E.nodeType == 1) {
            E.className = F !== g ? o.grep(E.className.split(/\s+/),function (G) {
                return!o.className.has(F, G)
            }).join(" ") : ""
        }
    }, has: function (F, E) {
        return F && o.inArray(E, (F.className || F).toString().split(/\s+/)) > -1
    }}, swap: function (H, G, I) {
        var E = {};
        for (var F in G) {
            E[F] = H.style[F];
            H.style[F] = G[F]
        }
        I.call(H);
        for (var F in G) {
            H.style[F] = E[F]
        }
    }, css: function (H, F, J, E) {
        if (F == "width" || F == "height") {
            var L, G = {position: "absolute", visibility: "hidden", display: "block"}, K = F == "width" ? ["Left", "Right"] : ["Top", "Bottom"];

            function I() {
                L = F == "width" ? H.offsetWidth : H.offsetHeight;
                if (E === "border") {
                    return
                }
                o.each(K, function () {
                    if (!E) {
                        L -= parseFloat(o.curCSS(H, "padding" + this, true)) || 0
                    }
                    if (E === "margin") {
                        L += parseFloat(o.curCSS(H, "margin" + this, true)) || 0
                    } else {
                        L -= parseFloat(o.curCSS(H, "border" + this + "Width", true)) || 0
                    }
                })
            }

            if (H.offsetWidth !== 0) {
                I()
            } else {
                o.swap(H, G, I)
            }
            return Math.max(0, Math.round(L))
        }
        return o.curCSS(H, F, J)
    }, curCSS: function (I, F, G) {
        var L, E = I.style;
        if (F == "opacity" && !o.support.opacity) {
            L = o.attr(E, "opacity");
            return L == "" ? "1" : L
        }
        if (F.match(/float/i)) {
            F = w
        }
        if (!G && E && E[F]) {
            L = E[F]
        } else {
            if (q.getComputedStyle) {
                if (F.match(/float/i)) {
                    F = "float"
                }
                F = F.replace(/([A-Z])/g, "-$1").toLowerCase();
                var M = q.getComputedStyle(I, null);
                if (M) {
                    L = M.getPropertyValue(F)
                }
                if (F == "opacity" && L == "") {
                    L = "1"
                }
            } else {
                if (I.currentStyle) {
                    var J = F.replace(/\-(\w)/g, function (N, O) {
                        return O.toUpperCase()
                    });
                    L = I.currentStyle[F] || I.currentStyle[J];
                    if (!/^\d+(px)?$/i.test(L) && /^\d/.test(L)) {
                        var H = E.left, K = I.runtimeStyle.left;
                        I.runtimeStyle.left = I.currentStyle.left;
                        E.left = L || 0;
                        L = E.pixelLeft + "px";
                        E.left = H;
                        I.runtimeStyle.left = K
                    }
                }
            }
        }
        return L
    }, clean: function (F, K, I) {
        K = K || document;
        if (typeof K.createElement === "undefined") {
            K = K.ownerDocument || K[0] && K[0].ownerDocument || document
        }
        if (!I && F.length === 1 && typeof F[0] === "string") {
            var H = /^<(\w+)\s*\/?>$/.exec(F[0]);
            if (H) {
                return[K.createElement(H[1])]
            }
        }
        var G = [], E = [], L = K.createElement("div");
        o.each(F, function (P, S) {
            if (typeof S === "number") {
                S += ""
            }
            if (!S) {
                return
            }
            if (typeof S === "string") {
                S = S.replace(/(<(\w+)[^>]*?)\/>/g, function (U, V, T) {
                    return T.match(/^(abbr|br|col|img|input|link|meta|param|hr|area|embed)$/i) ? U : V + "></" + T + ">"
                });
                var O = S.replace(/^\s+/, "").substring(0, 10).toLowerCase();
                var Q = !O.indexOf("<opt") && [1, "<select multiple='multiple'>", "</select>"] || !O.indexOf("<leg") && [1, "<fieldset>", "</fieldset>"] || O.match(/^<(thead|tbody|tfoot|colg|cap)/) && [1, "<table>", "</table>"] || !O.indexOf("<tr") && [2, "<table><tbody>", "</tbody></table>"] || (!O.indexOf("<td") || !O.indexOf("<th")) && [3, "<table><tbody><tr>", "</tr></tbody></table>"] || !O.indexOf("<col") && [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"] || !o.support.htmlSerialize && [1, "div<div>", "</div>"] || [0, "", ""];
                L.innerHTML = Q[1] + S + Q[2];
                while (Q[0]--) {
                    L = L.lastChild
                }
                if (!o.support.tbody) {
                    var R = /<tbody/i.test(S), N = !O.indexOf("<table") && !R ? L.firstChild && L.firstChild.childNodes : Q[1] == "<table>" && !R ? L.childNodes : [];
                    for (var M = N.length - 1; M >= 0; --M) {
                        if (o.nodeName(N[M], "tbody") && !N[M].childNodes.length) {
                            N[M].parentNode.removeChild(N[M])
                        }
                    }
                }
                if (!o.support.leadingWhitespace && /^\s/.test(S)) {
                    L.insertBefore(K.createTextNode(S.match(/^\s*/)[0]), L.firstChild)
                }
                S = o.makeArray(L.childNodes)
            }
            if (S.nodeType) {
                G.push(S)
            } else {
                G = o.merge(G, S)
            }
        });
        if (I) {
            for (var J = 0; G[J]; J++) {
                if (o.nodeName(G[J], "script") && (!G[J].type || G[J].type.toLowerCase() === "text/javascript")) {
                    E.push(G[J].parentNode ? G[J].parentNode.removeChild(G[J]) : G[J])
                } else {
                    if (G[J].nodeType === 1) {
                        G.splice.apply(G, [J + 1, 0].concat(o.makeArray(G[J].getElementsByTagName("script"))))
                    }
                    I.appendChild(G[J])
                }
            }
            return E
        }
        return G
    }, attr: function (J, G, K) {
        if (!J || J.nodeType == 3 || J.nodeType == 8) {
            return g
        }
        var H = !o.isXMLDoc(J), L = K !== g;
        G = H && o.props[G] || G;
        if (J.tagName) {
            var F = /href|src|style/.test(G);
            if (G == "selected" && J.parentNode) {
                J.parentNode.selectedIndex
            }
            if (G in J && H && !F) {
                if (L) {
                    if (G == "type" && o.nodeName(J, "input") && J.parentNode) {
                        throw"type property can't be changed"
                    }
                    J[G] = K
                }
                if (o.nodeName(J, "form") && J.getAttributeNode(G)) {
                    return J.getAttributeNode(G).nodeValue
                }
                if (G == "tabIndex") {
                    var I = J.getAttributeNode("tabIndex");
                    return I && I.specified ? I.value : J.nodeName.match(/(button|input|object|select|textarea)/i) ? 0 : J.nodeName.match(/^(a|area)$/i) && J.href ? 0 : g
                }
                return J[G]
            }
            if (!o.support.style && H && G == "style") {
                return o.attr(J.style, "cssText", K)
            }
            if (L) {
                J.setAttribute(G, "" + K)
            }
            var E = !o.support.hrefNormalized && H && F ? J.getAttribute(G, 2) : J.getAttribute(G);
            return E === null ? g : E
        }
        if (!o.support.opacity && G == "opacity") {
            if (L) {
                J.zoom = 1;
                J.filter = (J.filter || "").replace(/alpha\([^)]*\)/, "") + (parseInt(K) + "" == "NaN" ? "" : "alpha(opacity=" + K * 100 + ")")
            }
            return J.filter && J.filter.indexOf("opacity=") >= 0 ? (parseFloat(J.filter.match(/opacity=([^)]*)/)[1]) / 100) + "" : ""
        }
        G = G.replace(/-([a-z])/ig, function (M, N) {
            return N.toUpperCase()
        });
        if (L) {
            J[G] = K
        }
        return J[G]
    }, trim: function (E) {
        return(E || "").replace(/^\s+|\s+$/g, "")
    }, makeArray: function (G) {
        var E = [];
        if (G != null) {
            var F = G.length;
            if (F == null || typeof G === "string" || o.isFunction(G) || G.setInterval) {
                E[0] = G
            } else {
                while (F) {
                    E[--F] = G[F]
                }
            }
        }
        return E
    }, inArray: function (G, H) {
        for (var E = 0, F = H.length; E < F; E++) {
            if (H[E] === G) {
                return E
            }
        }
        return-1
    }, merge: function (H, E) {
        var F = 0, G, I = H.length;
        if (!o.support.getAll) {
            while ((G = E[F++]) != null) {
                if (G.nodeType != 8) {
                    H[I++] = G
                }
            }
        } else {
            while ((G = E[F++]) != null) {
                H[I++] = G
            }
        }
        return H
    }, unique: function (K) {
        var F = [], E = {};
        try {
            for (var G = 0, H = K.length; G < H; G++) {
                var J = o.data(K[G]);
                if (!E[J]) {
                    E[J] = true;
                    F.push(K[G])
                }
            }
        } catch (I) {
            F = K
        }
        return F
    }, grep: function (F, J, E) {
        var G = [];
        for (var H = 0, I = F.length; H < I; H++) {
            if (!E != !J(F[H], H)) {
                G.push(F[H])
            }
        }
        return G
    }, map: function (E, J) {
        var F = [];
        for (var G = 0, H = E.length; G < H; G++) {
            var I = J(E[G], G);
            if (I != null) {
                F[F.length] = I
            }
        }
        return F.concat.apply([], F)
    }});
    var C = navigator.userAgent.toLowerCase();
    o.browser = {version: (C.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [0, "0"])[1], safari: /webkit/.test(C), opera: /opera/.test(C), msie: /msie/.test(C) && !/opera/.test(C), mozilla: /mozilla/.test(C) && !/(compatible|webkit)/.test(C)};
    o.each({parent: function (E) {
        return E.parentNode
    }, parents: function (E) {
        return o.dir(E, "parentNode")
    }, next: function (E) {
        return o.nth(E, 2, "nextSibling")
    }, prev: function (E) {
        return o.nth(E, 2, "previousSibling")
    }, nextAll: function (E) {
        return o.dir(E, "nextSibling")
    }, prevAll: function (E) {
        return o.dir(E, "previousSibling")
    }, siblings: function (E) {
        return o.sibling(E.parentNode.firstChild, E)
    }, children: function (E) {
        return o.sibling(E.firstChild)
    }, contents: function (E) {
        return o.nodeName(E, "iframe") ? E.contentDocument || E.contentWindow.document : o.makeArray(E.childNodes)
    }}, function (E, F) {
        o.fn[E] = function (G) {
            var H = o.map(this, F);
            if (G && typeof G == "string") {
                H = o.multiFilter(G, H)
            }
            return this.pushStack(o.unique(H), E, G)
        }
    });
    o.each({appendTo: "append", prependTo: "prepend", insertBefore: "before", insertAfter: "after", replaceAll: "replaceWith"}, function (E, F) {
        o.fn[E] = function (G) {
            var J = [], L = o(G);
            for (var K = 0, H = L.length; K < H; K++) {
                var I = (K > 0 ? this.clone(true) : this).get();
                o.fn[F].apply(o(L[K]), I);
                J = J.concat(I)
            }
            return this.pushStack(J, E, G)
        }
    });
    o.each({removeAttr: function (E) {
        o.attr(this, E, "");
        if (this.nodeType == 1) {
            this.removeAttribute(E)
        }
    }, addClass: function (E) {
        o.className.add(this, E)
    }, removeClass: function (E) {
        o.className.remove(this, E)
    }, toggleClass: function (F, E) {
        if (typeof E !== "boolean") {
            E = !o.className.has(this, F)
        }
        o.className[E ? "add" : "remove"](this, F)
    }, remove: function (E) {
        if (!E || o.filter(E, [this]).length) {
            o("*", this).add([this]).each(function () {
                o.event.remove(this);
                o.removeData(this)
            });
            if (this.parentNode) {
                this.parentNode.removeChild(this)
            }
        }
    }, empty: function () {
        o(this).children().remove();
        while (this.firstChild) {
            this.removeChild(this.firstChild)
        }
    }}, function (E, F) {
        o.fn[E] = function () {
            return this.each(F, arguments)
        }
    });
    function j(E, F) {
        return E[0] && parseInt(o.curCSS(E[0], F, true), 10) || 0
    }

    var h = "jQuery" + e(), v = 0, A = {};
    o.extend({cache: {}, data: function (F, E, G) {
        F = F == l ? A : F;
        var H = F[h];
        if (!H) {
            H = F[h] = ++v
        }
        if (E && !o.cache[H]) {
            o.cache[H] = {}
        }
        if (G !== g) {
            o.cache[H][E] = G
        }
        return E ? o.cache[H][E] : H
    }, removeData: function (F, E) {
        F = F == l ? A : F;
        var H = F[h];
        if (E) {
            if (o.cache[H]) {
                delete o.cache[H][E];
                E = "";
                for (E in o.cache[H]) {
                    break
                }
                if (!E) {
                    o.removeData(F)
                }
            }
        } else {
            try {
                delete F[h]
            } catch (G) {
                if (F.removeAttribute) {
                    F.removeAttribute(h)
                }
            }
            delete o.cache[H]
        }
    }, queue: function (F, E, H) {
        if (F) {
            E = (E || "fx") + "queue";
            var G = o.data(F, E);
            if (!G || o.isArray(H)) {
                G = o.data(F, E, o.makeArray(H))
            } else {
                if (H) {
                    G.push(H)
                }
            }
        }
        return G
    }, dequeue: function (H, G) {
        var E = o.queue(H, G), F = E.shift();
        if (!G || G === "fx") {
            F = E[0]
        }
        if (F !== g) {
            F.call(H)
        }
    }});
    o.fn.extend({data: function (E, G) {
        var H = E.split(".");
        H[1] = H[1] ? "." + H[1] : "";
        if (G === g) {
            var F = this.triggerHandler("getData" + H[1] + "!", [H[0]]);
            if (F === g && this.length) {
                F = o.data(this[0], E)
            }
            return F === g && H[1] ? this.data(H[0]) : F
        } else {
            return this.trigger("setData" + H[1] + "!", [H[0], G]).each(function () {
                o.data(this, E, G)
            })
        }
    }, removeData: function (E) {
        return this.each(function () {
            o.removeData(this, E)
        })
    }, queue: function (E, F) {
        if (typeof E !== "string") {
            F = E;
            E = "fx"
        }
        if (F === g) {
            return o.queue(this[0], E)
        }
        return this.each(function () {
            var G = o.queue(this, E, F);
            if (E == "fx" && G.length == 1) {
                G[0].call(this)
            }
        })
    }, dequeue: function (E) {
        return this.each(function () {
            o.dequeue(this, E)
        })
    }});
    (function () {
        var R = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^[\]]*\]|['"][^'"]*['"]|[^[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?/g, L = 0, H = Object.prototype.toString;
        var F = function (Y, U, ab, ac) {
            ab = ab || [];
            U = U || document;
            if (U.nodeType !== 1 && U.nodeType !== 9) {
                return[]
            }
            if (!Y || typeof Y !== "string") {
                return ab
            }
            var Z = [], W, af, ai, T, ad, V, X = true;
            R.lastIndex = 0;
            while ((W = R.exec(Y)) !== null) {
                Z.push(W[1]);
                if (W[2]) {
                    V = RegExp.rightContext;
                    break
                }
            }
            if (Z.length > 1 && M.exec(Y)) {
                if (Z.length === 2 && I.relative[Z[0]]) {
                    af = J(Z[0] + Z[1], U)
                } else {
                    af = I.relative[Z[0]] ? [U] : F(Z.shift(), U);
                    while (Z.length) {
                        Y = Z.shift();
                        if (I.relative[Y]) {
                            Y += Z.shift()
                        }
                        af = J(Y, af)
                    }
                }
            } else {
                var ae = ac ? {expr: Z.pop(), set: E(ac)} : F.find(Z.pop(), Z.length === 1 && U.parentNode ? U.parentNode : U, Q(U));
                af = F.filter(ae.expr, ae.set);
                if (Z.length > 0) {
                    ai = E(af)
                } else {
                    X = false
                }
                while (Z.length) {
                    var ah = Z.pop(), ag = ah;
                    if (!I.relative[ah]) {
                        ah = ""
                    } else {
                        ag = Z.pop()
                    }
                    if (ag == null) {
                        ag = U
                    }
                    I.relative[ah](ai, ag, Q(U))
                }
            }
            if (!ai) {
                ai = af
            }
            if (!ai) {
                throw"Syntax error, unrecognized expression: " + (ah || Y)
            }
            if (H.call(ai) === "[object Array]") {
                if (!X) {
                    ab.push.apply(ab, ai)
                } else {
                    if (U.nodeType === 1) {
                        for (var aa = 0; ai[aa] != null; aa++) {
                            if (ai[aa] && (ai[aa] === true || ai[aa].nodeType === 1 && K(U, ai[aa]))) {
                                ab.push(af[aa])
                            }
                        }
                    } else {
                        for (var aa = 0; ai[aa] != null; aa++) {
                            if (ai[aa] && ai[aa].nodeType === 1) {
                                ab.push(af[aa])
                            }
                        }
                    }
                }
            } else {
                E(ai, ab)
            }
            if (V) {
                F(V, U, ab, ac);
                if (G) {
                    hasDuplicate = false;
                    ab.sort(G);
                    if (hasDuplicate) {
                        for (var aa = 1; aa < ab.length; aa++) {
                            if (ab[aa] === ab[aa - 1]) {
                                ab.splice(aa--, 1)
                            }
                        }
                    }
                }
            }
            return ab
        };
        F.matches = function (T, U) {
            return F(T, null, null, U)
        };
        F.find = function (aa, T, ab) {
            var Z, X;
            if (!aa) {
                return[]
            }
            for (var W = 0, V = I.order.length; W < V; W++) {
                var Y = I.order[W], X;
                if ((X = I.match[Y].exec(aa))) {
                    var U = RegExp.leftContext;
                    if (U.substr(U.length - 1) !== "\\") {
                        X[1] = (X[1] || "").replace(/\\/g, "");
                        Z = I.find[Y](X, T, ab);
                        if (Z != null) {
                            aa = aa.replace(I.match[Y], "");
                            break
                        }
                    }
                }
            }
            if (!Z) {
                Z = T.getElementsByTagName("*")
            }
            return{set: Z, expr: aa}
        };
        F.filter = function (ad, ac, ag, W) {
            var V = ad, ai = [], aa = ac, Y, T, Z = ac && ac[0] && Q(ac[0]);
            while (ad && ac.length) {
                for (var ab in I.filter) {
                    if ((Y = I.match[ab].exec(ad)) != null) {
                        var U = I.filter[ab], ah, af;
                        T = false;
                        if (aa == ai) {
                            ai = []
                        }
                        if (I.preFilter[ab]) {
                            Y = I.preFilter[ab](Y, aa, ag, ai, W, Z);
                            if (!Y) {
                                T = ah = true
                            } else {
                                if (Y === true) {
                                    continue
                                }
                            }
                        }
                        if (Y) {
                            for (var X = 0; (af = aa[X]) != null; X++) {
                                if (af) {
                                    ah = U(af, Y, X, aa);
                                    var ae = W ^ !!ah;
                                    if (ag && ah != null) {
                                        if (ae) {
                                            T = true
                                        } else {
                                            aa[X] = false
                                        }
                                    } else {
                                        if (ae) {
                                            ai.push(af);
                                            T = true
                                        }
                                    }
                                }
                            }
                        }
                        if (ah !== g) {
                            if (!ag) {
                                aa = ai
                            }
                            ad = ad.replace(I.match[ab], "");
                            if (!T) {
                                return[]
                            }
                            break
                        }
                    }
                }
                if (ad == V) {
                    if (T == null) {
                        throw"Syntax error, unrecognized expression: " + ad
                    } else {
                        break
                    }
                }
                V = ad
            }
            return aa
        };
        var I = F.selectors = {order: ["ID", "NAME", "TAG"], match: {ID: /#((?:[\w\u00c0-\uFFFF_-]|\\.)+)/, CLASS: /\.((?:[\w\u00c0-\uFFFF_-]|\\.)+)/, NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF_-]|\\.)+)['"]*\]/, ATTR: /\[\s*((?:[\w\u00c0-\uFFFF_-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/, TAG: /^((?:[\w\u00c0-\uFFFF\*_-]|\\.)+)/, CHILD: /:(only|nth|last|first)-child(?:\((even|odd|[\dn+-]*)\))?/, POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^-]|$)/, PSEUDO: /:((?:[\w\u00c0-\uFFFF_-]|\\.)+)(?:\((['"]*)((?:\([^\)]+\)|[^\2\(\)]*)+)\2\))?/}, attrMap: {"class": "className", "for": "htmlFor"}, attrHandle: {href: function (T) {
            return T.getAttribute("href")
        }}, relative: {"+": function (aa, T, Z) {
            var X = typeof T === "string", ab = X && !/\W/.test(T), Y = X && !ab;
            if (ab && !Z) {
                T = T.toUpperCase()
            }
            for (var W = 0, V = aa.length, U; W < V; W++) {
                if ((U = aa[W])) {
                    while ((U = U.previousSibling) && U.nodeType !== 1) {
                    }
                    aa[W] = Y || U && U.nodeName === T ? U || false : U === T
                }
            }
            if (Y) {
                F.filter(T, aa, true)
            }
        }, ">": function (Z, U, aa) {
            var X = typeof U === "string";
            if (X && !/\W/.test(U)) {
                U = aa ? U : U.toUpperCase();
                for (var V = 0, T = Z.length; V < T; V++) {
                    var Y = Z[V];
                    if (Y) {
                        var W = Y.parentNode;
                        Z[V] = W.nodeName === U ? W : false
                    }
                }
            } else {
                for (var V = 0, T = Z.length; V < T; V++) {
                    var Y = Z[V];
                    if (Y) {
                        Z[V] = X ? Y.parentNode : Y.parentNode === U
                    }
                }
                if (X) {
                    F.filter(U, Z, true)
                }
            }
        }, "": function (W, U, Y) {
            var V = L++, T = S;
            if (!U.match(/\W/)) {
                var X = U = Y ? U : U.toUpperCase();
                T = P
            }
            T("parentNode", U, V, W, X, Y)
        }, "~": function (W, U, Y) {
            var V = L++, T = S;
            if (typeof U === "string" && !U.match(/\W/)) {
                var X = U = Y ? U : U.toUpperCase();
                T = P
            }
            T("previousSibling", U, V, W, X, Y)
        }}, find: {ID: function (U, V, W) {
            if (typeof V.getElementById !== "undefined" && !W) {
                var T = V.getElementById(U[1]);
                return T ? [T] : []
            }
        }, NAME: function (V, Y, Z) {
            if (typeof Y.getElementsByName !== "undefined") {
                var U = [], X = Y.getElementsByName(V[1]);
                for (var W = 0, T = X.length; W < T; W++) {
                    if (X[W].getAttribute("name") === V[1]) {
                        U.push(X[W])
                    }
                }
                return U.length === 0 ? null : U
            }
        }, TAG: function (T, U) {
            return U.getElementsByTagName(T[1])
        }}, preFilter: {CLASS: function (W, U, V, T, Z, aa) {
            W = " " + W[1].replace(/\\/g, "") + " ";
            if (aa) {
                return W
            }
            for (var X = 0, Y; (Y = U[X]) != null; X++) {
                if (Y) {
                    if (Z ^ (Y.className && (" " + Y.className + " ").indexOf(W) >= 0)) {
                        if (!V) {
                            T.push(Y)
                        }
                    } else {
                        if (V) {
                            U[X] = false
                        }
                    }
                }
            }
            return false
        }, ID: function (T) {
            return T[1].replace(/\\/g, "")
        }, TAG: function (U, T) {
            for (var V = 0; T[V] === false; V++) {
            }
            return T[V] && Q(T[V]) ? U[1] : U[1].toUpperCase()
        }, CHILD: function (T) {
            if (T[1] == "nth") {
                var U = /(-?)(\d*)n((?:\+|-)?\d*)/.exec(T[2] == "even" && "2n" || T[2] == "odd" && "2n+1" || !/\D/.test(T[2]) && "0n+" + T[2] || T[2]);
                T[2] = (U[1] + (U[2] || 1)) - 0;
                T[3] = U[3] - 0
            }
            T[0] = L++;
            return T
        }, ATTR: function (X, U, V, T, Y, Z) {
            var W = X[1].replace(/\\/g, "");
            if (!Z && I.attrMap[W]) {
                X[1] = I.attrMap[W]
            }
            if (X[2] === "~=") {
                X[4] = " " + X[4] + " "
            }
            return X
        }, PSEUDO: function (X, U, V, T, Y) {
            if (X[1] === "not") {
                if (X[3].match(R).length > 1 || /^\w/.test(X[3])) {
                    X[3] = F(X[3], null, null, U)
                } else {
                    var W = F.filter(X[3], U, V, true ^ Y);
                    if (!V) {
                        T.push.apply(T, W)
                    }
                    return false
                }
            } else {
                if (I.match.POS.test(X[0]) || I.match.CHILD.test(X[0])) {
                    return true
                }
            }
            return X
        }, POS: function (T) {
            T.unshift(true);
            return T
        }}, filters: {enabled: function (T) {
            return T.disabled === false && T.type !== "hidden"
        }, disabled: function (T) {
            return T.disabled === true
        }, checked: function (T) {
            return T.checked === true
        }, selected: function (T) {
            T.parentNode.selectedIndex;
            return T.selected === true
        }, parent: function (T) {
            return!!T.firstChild
        }, empty: function (T) {
            return!T.firstChild
        }, has: function (V, U, T) {
            return!!F(T[3], V).length
        }, header: function (T) {
            return/h\d/i.test(T.nodeName)
        }, text: function (T) {
            return"text" === T.type
        }, radio: function (T) {
            return"radio" === T.type
        }, checkbox: function (T) {
            return"checkbox" === T.type
        }, file: function (T) {
            return"file" === T.type
        }, password: function (T) {
            return"password" === T.type
        }, submit: function (T) {
            return"submit" === T.type
        }, image: function (T) {
            return"image" === T.type
        }, reset: function (T) {
            return"reset" === T.type
        }, button: function (T) {
            return"button" === T.type || T.nodeName.toUpperCase() === "BUTTON"
        }, input: function (T) {
            return/input|select|textarea|button/i.test(T.nodeName)
        }}, setFilters: {first: function (U, T) {
            return T === 0
        }, last: function (V, U, T, W) {
            return U === W.length - 1
        }, even: function (U, T) {
            return T % 2 === 0
        }, odd: function (U, T) {
            return T % 2 === 1
        }, lt: function (V, U, T) {
            return U < T[3] - 0
        }, gt: function (V, U, T) {
            return U > T[3] - 0
        }, nth: function (V, U, T) {
            return T[3] - 0 == U
        }, eq: function (V, U, T) {
            return T[3] - 0 == U
        }}, filter: {PSEUDO: function (Z, V, W, aa) {
            var U = V[1], X = I.filters[U];
            if (X) {
                return X(Z, W, V, aa)
            } else {
                if (U === "contains") {
                    return(Z.textContent || Z.innerText || "").indexOf(V[3]) >= 0
                } else {
                    if (U === "not") {
                        var Y = V[3];
                        for (var W = 0, T = Y.length; W < T; W++) {
                            if (Y[W] === Z) {
                                return false
                            }
                        }
                        return true
                    }
                }
            }
        }, CHILD: function (T, W) {
            var Z = W[1], U = T;
            switch (Z) {
                case"only":
                case"first":
                    while (U = U.previousSibling) {
                        if (U.nodeType === 1) {
                            return false
                        }
                    }
                    if (Z == "first") {
                        return true
                    }
                    U = T;
                case"last":
                    while (U = U.nextSibling) {
                        if (U.nodeType === 1) {
                            return false
                        }
                    }
                    return true;
                case"nth":
                    var V = W[2], ac = W[3];
                    if (V == 1 && ac == 0) {
                        return true
                    }
                    var Y = W[0], ab = T.parentNode;
                    if (ab && (ab.sizcache !== Y || !T.nodeIndex)) {
                        var X = 0;
                        for (U = ab.firstChild; U; U = U.nextSibling) {
                            if (U.nodeType === 1) {
                                U.nodeIndex = ++X
                            }
                        }
                        ab.sizcache = Y
                    }
                    var aa = T.nodeIndex - ac;
                    if (V == 0) {
                        return aa == 0
                    } else {
                        return(aa % V == 0 && aa / V >= 0)
                    }
            }
        }, ID: function (U, T) {
            return U.nodeType === 1 && U.getAttribute("id") === T
        }, TAG: function (U, T) {
            return(T === "*" && U.nodeType === 1) || U.nodeName === T
        }, CLASS: function (U, T) {
            return(" " + (U.className || U.getAttribute("class")) + " ").indexOf(T) > -1
        }, ATTR: function (Y, W) {
            var V = W[1], T = I.attrHandle[V] ? I.attrHandle[V](Y) : Y[V] != null ? Y[V] : Y.getAttribute(V), Z = T + "", X = W[2], U = W[4];
            return T == null ? X === "!=" : X === "=" ? Z === U : X === "*=" ? Z.indexOf(U) >= 0 : X === "~=" ? (" " + Z + " ").indexOf(U) >= 0 : !U ? Z && T !== false : X === "!=" ? Z != U : X === "^=" ? Z.indexOf(U) === 0 : X === "$=" ? Z.substr(Z.length - U.length) === U : X === "|=" ? Z === U || Z.substr(0, U.length + 1) === U + "-" : false
        }, POS: function (X, U, V, Y) {
            var T = U[2], W = I.setFilters[T];
            if (W) {
                return W(X, V, U, Y)
            }
        }}};
        var M = I.match.POS;
        for (var O in I.match) {
            I.match[O] = RegExp(I.match[O].source + /(?![^\[]*\])(?![^\(]*\))/.source)
        }
        var E = function (U, T) {
            U = Array.prototype.slice.call(U);
            if (T) {
                T.push.apply(T, U);
                return T
            }
            return U
        };
        try {
            Array.prototype.slice.call(document.documentElement.childNodes)
        } catch (N) {
            E = function (X, W) {
                var U = W || [];
                if (H.call(X) === "[object Array]") {
                    Array.prototype.push.apply(U, X)
                } else {
                    if (typeof X.length === "number") {
                        for (var V = 0, T = X.length; V < T; V++) {
                            U.push(X[V])
                        }
                    } else {
                        for (var V = 0; X[V]; V++) {
                            U.push(X[V])
                        }
                    }
                }
                return U
            }
        }
        var G;
        if (document.documentElement.compareDocumentPosition) {
            G = function (U, T) {
                var V = U.compareDocumentPosition(T) & 4 ? -1 : U === T ? 0 : 1;
                if (V === 0) {
                    hasDuplicate = true
                }
                return V
            }
        } else {
            if ("sourceIndex"in document.documentElement) {
                G = function (U, T) {
                    var V = U.sourceIndex - T.sourceIndex;
                    if (V === 0) {
                        hasDuplicate = true
                    }
                    return V
                }
            } else {
                if (document.createRange) {
                    G = function (W, U) {
                        var V = W.ownerDocument.createRange(), T = U.ownerDocument.createRange();
                        V.selectNode(W);
                        V.collapse(true);
                        T.selectNode(U);
                        T.collapse(true);
                        var X = V.compareBoundaryPoints(Range.START_TO_END, T);
                        if (X === 0) {
                            hasDuplicate = true
                        }
                        return X
                    }
                }
            }
        }
        (function () {
            var U = document.createElement("form"), V = "script" + (new Date).getTime();
            U.innerHTML = "<input name='" + V + "'/>";
            var T = document.documentElement;
            T.insertBefore(U, T.firstChild);
            if (!!document.getElementById(V)) {
                I.find.ID = function (X, Y, Z) {
                    if (typeof Y.getElementById !== "undefined" && !Z) {
                        var W = Y.getElementById(X[1]);
                        return W ? W.id === X[1] || typeof W.getAttributeNode !== "undefined" && W.getAttributeNode("id").nodeValue === X[1] ? [W] : g : []
                    }
                };
                I.filter.ID = function (Y, W) {
                    var X = typeof Y.getAttributeNode !== "undefined" && Y.getAttributeNode("id");
                    return Y.nodeType === 1 && X && X.nodeValue === W
                }
            }
            T.removeChild(U)
        })();
        (function () {
            var T = document.createElement("div");
            T.appendChild(document.createComment(""));
            if (T.getElementsByTagName("*").length > 0) {
                I.find.TAG = function (U, Y) {
                    var X = Y.getElementsByTagName(U[1]);
                    if (U[1] === "*") {
                        var W = [];
                        for (var V = 0; X[V]; V++) {
                            if (X[V].nodeType === 1) {
                                W.push(X[V])
                            }
                        }
                        X = W
                    }
                    return X
                }
            }
            T.innerHTML = "<a href='#'></a>";
            if (T.firstChild && typeof T.firstChild.getAttribute !== "undefined" && T.firstChild.getAttribute("href") !== "#") {
                I.attrHandle.href = function (U) {
                    return U.getAttribute("href", 2)
                }
            }
        })();
        if (document.querySelectorAll) {
            (function () {
                var T = F, U = document.createElement("div");
                U.innerHTML = "<p class='TEST'></p>";
                if (U.querySelectorAll && U.querySelectorAll(".TEST").length === 0) {
                    return
                }
                F = function (Y, X, V, W) {
                    X = X || document;
                    if (!W && X.nodeType === 9 && !Q(X)) {
                        try {
                            return E(X.querySelectorAll(Y), V)
                        } catch (Z) {
                        }
                    }
                    return T(Y, X, V, W)
                };
                F.find = T.find;
                F.filter = T.filter;
                F.selectors = T.selectors;
                F.matches = T.matches
            })()
        }
        if (document.getElementsByClassName && document.documentElement.getElementsByClassName) {
            (function () {
                var T = document.createElement("div");
                T.innerHTML = "<div class='test e'></div><div class='test'></div>";
                if (T.getElementsByClassName("e").length === 0) {
                    return
                }
                T.lastChild.className = "e";
                if (T.getElementsByClassName("e").length === 1) {
                    return
                }
                I.order.splice(1, 0, "CLASS");
                I.find.CLASS = function (U, V, W) {
                    if (typeof V.getElementsByClassName !== "undefined" && !W) {
                        return V.getElementsByClassName(U[1])
                    }
                }
            })()
        }
        function P(U, Z, Y, ad, aa, ac) {
            var ab = U == "previousSibling" && !ac;
            for (var W = 0, V = ad.length; W < V; W++) {
                var T = ad[W];
                if (T) {
                    if (ab && T.nodeType === 1) {
                        T.sizcache = Y;
                        T.sizset = W
                    }
                    T = T[U];
                    var X = false;
                    while (T) {
                        if (T.sizcache === Y) {
                            X = ad[T.sizset];
                            break
                        }
                        if (T.nodeType === 1 && !ac) {
                            T.sizcache = Y;
                            T.sizset = W
                        }
                        if (T.nodeName === Z) {
                            X = T;
                            break
                        }
                        T = T[U]
                    }
                    ad[W] = X
                }
            }
        }

        function S(U, Z, Y, ad, aa, ac) {
            var ab = U == "previousSibling" && !ac;
            for (var W = 0, V = ad.length; W < V; W++) {
                var T = ad[W];
                if (T) {
                    if (ab && T.nodeType === 1) {
                        T.sizcache = Y;
                        T.sizset = W
                    }
                    T = T[U];
                    var X = false;
                    while (T) {
                        if (T.sizcache === Y) {
                            X = ad[T.sizset];
                            break
                        }
                        if (T.nodeType === 1) {
                            if (!ac) {
                                T.sizcache = Y;
                                T.sizset = W
                            }
                            if (typeof Z !== "string") {
                                if (T === Z) {
                                    X = true;
                                    break
                                }
                            } else {
                                if (F.filter(Z, [T]).length > 0) {
                                    X = T;
                                    break
                                }
                            }
                        }
                        T = T[U]
                    }
                    ad[W] = X
                }
            }
        }

        var K = document.compareDocumentPosition ? function (U, T) {
            return U.compareDocumentPosition(T) & 16
        } : function (U, T) {
            return U !== T && (U.contains ? U.contains(T) : true)
        };
        var Q = function (T) {
            return T.nodeType === 9 && T.documentElement.nodeName !== "HTML" || !!T.ownerDocument && Q(T.ownerDocument)
        };
        var J = function (T, aa) {
            var W = [], X = "", Y, V = aa.nodeType ? [aa] : aa;
            while ((Y = I.match.PSEUDO.exec(T))) {
                X += Y[0];
                T = T.replace(I.match.PSEUDO, "")
            }
            T = I.relative[T] ? T + "*" : T;
            for (var Z = 0, U = V.length; Z < U; Z++) {
                F(T, V[Z], W)
            }
            return F.filter(X, W)
        };
        o.find = F;
        o.filter = F.filter;
        o.expr = F.selectors;
        o.expr[":"] = o.expr.filters;
        F.selectors.filters.hidden = function (T) {
            return T.offsetWidth === 0 || T.offsetHeight === 0
        };
        F.selectors.filters.visible = function (T) {
            return T.offsetWidth > 0 || T.offsetHeight > 0
        };
        F.selectors.filters.animated = function (T) {
            return o.grep(o.timers,function (U) {
                return T === U.elem
            }).length
        };
        o.multiFilter = function (V, T, U) {
            if (U) {
                V = ":not(" + V + ")"
            }
            return F.matches(V, T)
        };
        o.dir = function (V, U) {
            var T = [], W = V[U];
            while (W && W != document) {
                if (W.nodeType == 1) {
                    T.push(W)
                }
                W = W[U]
            }
            return T
        };
        o.nth = function (X, T, V, W) {
            T = T || 1;
            var U = 0;
            for (; X; X = X[V]) {
                if (X.nodeType == 1 && ++U == T) {
                    break
                }
            }
            return X
        };
        o.sibling = function (V, U) {
            var T = [];
            for (; V; V = V.nextSibling) {
                if (V.nodeType == 1 && V != U) {
                    T.push(V)
                }
            }
            return T
        };
        return;
        l.Sizzle = F
    })();
    o.event = {add: function (I, F, H, K) {
        if (I.nodeType == 3 || I.nodeType == 8) {
            return
        }
        if (I.setInterval && I != l) {
            I = l
        }
        if (!H.guid) {
            H.guid = this.guid++
        }
        if (K !== g) {
            var G = H;
            H = this.proxy(G);
            H.data = K
        }
        var E = o.data(I, "events") || o.data(I, "events", {}), J = o.data(I, "handle") || o.data(I, "handle", function () {
            return typeof o !== "undefined" && !o.event.triggered ? o.event.handle.apply(arguments.callee.elem, arguments) : g
        });
        J.elem = I;
        o.each(F.split(/\s+/), function (M, N) {
            var O = N.split(".");
            N = O.shift();
            H.type = O.slice().sort().join(".");
            var L = E[N];
            if (o.event.specialAll[N]) {
                o.event.specialAll[N].setup.call(I, K, O)
            }
            if (!L) {
                L = E[N] = {};
                if (!o.event.special[N] || o.event.special[N].setup.call(I, K, O) === false) {
                    if (I.addEventListener) {
                        I.addEventListener(N, J, false)
                    } else {
                        if (I.attachEvent) {
                            I.attachEvent("on" + N, J)
                        }
                    }
                }
            }
            L[H.guid] = H;
            o.event.global[N] = true
        });
        I = null
    }, guid: 1, global: {}, remove: function (K, H, J) {
        if (K.nodeType == 3 || K.nodeType == 8) {
            return
        }
        var G = o.data(K, "events"), F, E;
        if (G) {
            if (H === g || (typeof H === "string" && H.charAt(0) == ".")) {
                for (var I in G) {
                    this.remove(K, I + (H || ""))
                }
            } else {
                if (H.type) {
                    J = H.handler;
                    H = H.type
                }
                o.each(H.split(/\s+/), function (M, O) {
                    var Q = O.split(".");
                    O = Q.shift();
                    var N = RegExp("(^|\\.)" + Q.slice().sort().join(".*\\.") + "(\\.|$)");
                    if (G[O]) {
                        if (J) {
                            delete G[O][J.guid]
                        } else {
                            for (var P in G[O]) {
                                if (N.test(G[O][P].type)) {
                                    delete G[O][P]
                                }
                            }
                        }
                        if (o.event.specialAll[O]) {
                            o.event.specialAll[O].teardown.call(K, Q)
                        }
                        for (F in G[O]) {
                            break
                        }
                        if (!F) {
                            if (!o.event.special[O] || o.event.special[O].teardown.call(K, Q) === false) {
                                if (K.removeEventListener) {
                                    K.removeEventListener(O, o.data(K, "handle"), false)
                                } else {
                                    if (K.detachEvent) {
                                        K.detachEvent("on" + O, o.data(K, "handle"))
                                    }
                                }
                            }
                            F = null;
                            delete G[O]
                        }
                    }
                })
            }
            for (F in G) {
                break
            }
            if (!F) {
                var L = o.data(K, "handle");
                if (L) {
                    L.elem = null
                }
                o.removeData(K, "events");
                o.removeData(K, "handle")
            }
        }
    }, trigger: function (I, K, H, E) {
        var G = I.type || I;
        if (!E) {
            I = typeof I === "object" ? I[h] ? I : o.extend(o.Event(G), I) : o.Event(G);
            if (G.indexOf("!") >= 0) {
                I.type = G = G.slice(0, -1);
                I.exclusive = true
            }
            if (!H) {
                I.stopPropagation();
                if (this.global[G]) {
                    o.each(o.cache, function () {
                        if (this.events && this.events[G]) {
                            o.event.trigger(I, K, this.handle.elem)
                        }
                    })
                }
            }
            if (!H || H.nodeType == 3 || H.nodeType == 8) {
                return g
            }
            I.result = g;
            I.target = H;
            K = o.makeArray(K);
            K.unshift(I)
        }
        I.currentTarget = H;
        var J = o.data(H, "handle");
        if (J) {
            J.apply(H, K)
        }
        if ((!H[G] || (o.nodeName(H, "a") && G == "click")) && H["on" + G] && H["on" + G].apply(H, K) === false) {
            I.result = false
        }
        if (!E && H[G] && !I.isDefaultPrevented() && !(o.nodeName(H, "a") && G == "click")) {
            this.triggered = true;
            try {
                H[G]()
            } catch (L) {
            }
        }
        this.triggered = false;
        if (!I.isPropagationStopped()) {
            var F = H.parentNode || H.ownerDocument;
            if (F) {
                o.event.trigger(I, K, F, true)
            }
        }
    }, handle: function (K) {
        var J, E;
        K = arguments[0] = o.event.fix(K || l.event);
        K.currentTarget = this;
        var L = K.type.split(".");
        K.type = L.shift();
        J = !L.length && !K.exclusive;
        var I = RegExp("(^|\\.)" + L.slice().sort().join(".*\\.") + "(\\.|$)");
        E = (o.data(this, "events") || {})[K.type];
        for (var G in E) {
            var H = E[G];
            if (J || I.test(H.type)) {
                K.handler = H;
                K.data = H.data;
                var F = H.apply(this, arguments);
                if (F !== g) {
                    K.result = F;
                    if (F === false) {
                        K.preventDefault();
                        K.stopPropagation()
                    }
                }
                if (K.isImmediatePropagationStopped()) {
                    break
                }
            }
        }
    }, props: "altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode metaKey newValue originalTarget pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" "), fix: function (H) {
        if (H[h]) {
            return H
        }
        var F = H;
        H = o.Event(F);
        for (var G = this.props.length, J; G;) {
            J = this.props[--G];
            H[J] = F[J]
        }
        if (!H.target) {
            H.target = H.srcElement || document
        }
        if (H.target.nodeType == 3) {
            H.target = H.target.parentNode
        }
        if (!H.relatedTarget && H.fromElement) {
            H.relatedTarget = H.fromElement == H.target ? H.toElement : H.fromElement
        }
        if (H.pageX == null && H.clientX != null) {
            var I = document.documentElement, E = document.body;
            H.pageX = H.clientX + (I && I.scrollLeft || E && E.scrollLeft || 0) - (I.clientLeft || 0);
            H.pageY = H.clientY + (I && I.scrollTop || E && E.scrollTop || 0) - (I.clientTop || 0)
        }
        if (!H.which && ((H.charCode || H.charCode === 0) ? H.charCode : H.keyCode)) {
            H.which = H.charCode || H.keyCode
        }
        if (!H.metaKey && H.ctrlKey) {
            H.metaKey = H.ctrlKey
        }
        if (!H.which && H.button) {
            H.which = (H.button & 1 ? 1 : (H.button & 2 ? 3 : (H.button & 4 ? 2 : 0)))
        }
        return H
    }, proxy: function (F, E) {
        E = E || function () {
            return F.apply(this, arguments)
        };
        E.guid = F.guid = F.guid || E.guid || this.guid++;
        return E
    }, special: {ready: {setup: B, teardown: function () {
    }}}, specialAll: {live: {setup: function (E, F) {
        o.event.add(this, F[0], c)
    }, teardown: function (G) {
        if (G.length) {
            var E = 0, F = RegExp("(^|\\.)" + G[0] + "(\\.|$)");
            o.each((o.data(this, "events").live || {}), function () {
                if (F.test(this.type)) {
                    E++
                }
            });
            if (E < 1) {
                o.event.remove(this, G[0], c)
            }
        }
    }}}};
    o.Event = function (E) {
        if (!this.preventDefault) {
            return new o.Event(E)
        }
        if (E && E.type) {
            this.originalEvent = E;
            this.type = E.type
        } else {
            this.type = E
        }
        this.timeStamp = e();
        this[h] = true
    };
    function k() {
        return false
    }

    function u() {
        return true
    }

    o.Event.prototype = {preventDefault: function () {
        this.isDefaultPrevented = u;
        var E = this.originalEvent;
        if (!E) {
            return
        }
        if (E.preventDefault) {
            E.preventDefault()
        }
        E.returnValue = false
    }, stopPropagation: function () {
        this.isPropagationStopped = u;
        var E = this.originalEvent;
        if (!E) {
            return
        }
        if (E.stopPropagation) {
            E.stopPropagation()
        }
        E.cancelBubble = true
    }, stopImmediatePropagation: function () {
        this.isImmediatePropagationStopped = u;
        this.stopPropagation()
    }, isDefaultPrevented: k, isPropagationStopped: k, isImmediatePropagationStopped: k};
    var a = function (F) {
        var E = F.relatedTarget;
        while (E && E != this) {
            try {
                E = E.parentNode
            } catch (G) {
                E = this
            }
        }
        if (E != this) {
            F.type = F.data;
            o.event.handle.apply(this, arguments)
        }
    };
    o.each({mouseover: "mouseenter", mouseout: "mouseleave"}, function (F, E) {
        o.event.special[E] = {setup: function () {
            o.event.add(this, F, a, E)
        }, teardown: function () {
            o.event.remove(this, F, a)
        }}
    });
    o.fn.extend({bind: function (F, G, E) {
        return F == "unload" ? this.one(F, G, E) : this.each(function () {
            o.event.add(this, F, E || G, E && G)
        })
    }, one: function (G, H, F) {
        var E = o.event.proxy(F || H, function (I) {
            o(this).unbind(I, E);
            return(F || H).apply(this, arguments)
        });
        return this.each(function () {
            o.event.add(this, G, E, F && H)
        })
    }, unbind: function (F, E) {
        return this.each(function () {
            o.event.remove(this, F, E)
        })
    }, trigger: function (E, F) {
        return this.each(function () {
            o.event.trigger(E, F, this)
        })
    }, triggerHandler: function (E, G) {
        if (this[0]) {
            var F = o.Event(E);
            F.preventDefault();
            F.stopPropagation();
            o.event.trigger(F, G, this[0]);
            return F.result
        }
    }, toggle: function (G) {
        var E = arguments, F = 1;
        while (F < E.length) {
            o.event.proxy(G, E[F++])
        }
        return this.click(o.event.proxy(G, function (H) {
            this.lastToggle = (this.lastToggle || 0) % F;
            H.preventDefault();
            return E[this.lastToggle++].apply(this, arguments) || false
        }))
    }, hover: function (E, F) {
        return this.mouseenter(E).mouseleave(F)
    }, ready: function (E) {
        B();
        if (o.isReady) {
            E.call(document, o)
        } else {
            o.readyList.push(E)
        }
        return this
    }, live: function (G, F) {
        var E = o.event.proxy(F);
        E.guid += this.selector + G;
        o(document).bind(i(G, this.selector), this.selector, E);
        return this
    }, die: function (F, E) {
        o(document).unbind(i(F, this.selector), E ? {guid: E.guid + this.selector + F} : null);
        return this
    }});
    function c(H) {
        var E = RegExp("(^|\\.)" + H.type + "(\\.|$)"), G = true, F = [];
        o.each(o.data(this, "events").live || [], function (I, J) {
            if (E.test(J.type)) {
                var K = o(H.target).closest(J.data)[0];
                if (K) {
                    F.push({elem: K, fn: J})
                }
            }
        });
        F.sort(function (J, I) {
            return o.data(J.elem, "closest") - o.data(I.elem, "closest")
        });
        o.each(F, function () {
            if (this.fn.call(this.elem, H, this.fn.data) === false) {
                return(G = false)
            }
        });
        return G
    }

    function i(F, E) {
        return["live", F, E.replace(/\./g, "`").replace(/ /g, "|")].join(".")
    }

    o.extend({isReady: false, readyList: [], ready: function () {
        if (!o.isReady) {
            o.isReady = true;
            if (o.readyList) {
                o.each(o.readyList, function () {
                    this.call(document, o)
                });
                o.readyList = null
            }
            o(document).triggerHandler("ready")
        }
    }});
    var x = false;

    function B() {
        if (x) {
            return
        }
        x = true;
        if (document.addEventListener) {
            document.addEventListener("DOMContentLoaded", function () {
                document.removeEventListener("DOMContentLoaded", arguments.callee, false);
                o.ready()
            }, false)
        } else {
            if (document.attachEvent) {
                document.attachEvent("onreadystatechange", function () {
                    if (document.readyState === "complete") {
                        document.detachEvent("onreadystatechange", arguments.callee);
                        o.ready()
                    }
                });
                if (document.documentElement.doScroll && l == l.top) {
                    (function () {
                        if (o.isReady) {
                            return
                        }
                        try {
                            document.documentElement.doScroll("left")
                        } catch (E) {
                            setTimeout(arguments.callee, 0);
                            return
                        }
                        o.ready()
                    })()
                }
            }
        }
        o.event.add(l, "load", o.ready)
    }

    o.each(("blur,focus,load,resize,scroll,unload,click,dblclick,mousedown,mouseup,mousemove,mouseover,mouseout,mouseenter,mouseleave,change,select,submit,keydown,keypress,keyup,error").split(","), function (F, E) {
        o.fn[E] = function (G) {
            return G ? this.bind(E, G) : this.trigger(E)
        }
    });
    o(l).bind("unload", function () {
        for (var E in o.cache) {
            if (E != 1 && o.cache[E].handle) {
                o.event.remove(o.cache[E].handle.elem)
            }
        }
    });
    (function () {
        o.support = {};
        var F = document.documentElement, G = document.createElement("script"), K = document.createElement("div"), J = "script" + (new Date).getTime();
        K.style.display = "none";
        K.innerHTML = '   <link/><table></table><a href="a" style="color:red;float:left;opacity:.5;">a</a><select><option>text</option></select><object><param/></object>';
        var H = K.getElementsByTagName("*"), E = K.getElementsByTagName("a")[0];
        if (!H || !H.length || !E) {
            return
        }
        o.support = {leadingWhitespace: K.firstChild.nodeType == 3, tbody: !K.getElementsByTagName("tbody").length, objectAll: !!K.getElementsByTagName("object")[0].getElementsByTagName("*").length, htmlSerialize: !!K.getElementsByTagName("link").length, style: /red/.test(E.getAttribute("style")), hrefNormalized: E.getAttribute("href") === "a", opacity: E.style.opacity === "0.5", cssFloat: !!E.style.cssFloat, scriptEval: false, noCloneEvent: true, boxModel: null};
        G.type = "text/javascript";
        try {
            G.appendChild(document.createTextNode("window." + J + "=1;"))
        } catch (I) {
        }
        F.insertBefore(G, F.firstChild);
        if (l[J]) {
            o.support.scriptEval = true;
            delete l[J]
        }
        F.removeChild(G);
        if (K.attachEvent && K.fireEvent) {
            K.attachEvent("onclick", function () {
                o.support.noCloneEvent = false;
                K.detachEvent("onclick", arguments.callee)
            });
            K.cloneNode(true).fireEvent("onclick")
        }
        o(function () {
            var L = document.createElement("div");
            L.style.width = L.style.paddingLeft = "1px";
            document.body.appendChild(L);
            o.boxModel = o.support.boxModel = L.offsetWidth === 2;
            document.body.removeChild(L).style.display = "none"
        })
    })();
    var w = o.support.cssFloat ? "cssFloat" : "styleFloat";
    o.props = {"for": "htmlFor", "class": "className", "float": w, cssFloat: w, styleFloat: w, readonly: "readOnly", maxlength: "maxLength", cellspacing: "cellSpacing", rowspan: "rowSpan", tabindex: "tabIndex"};
    o.fn.extend({_load: o.fn.load, load: function (G, J, K) {
        if (typeof G !== "string") {
            return this._load(G)
        }
        var I = G.indexOf(" ");
        if (I >= 0) {
            var E = G.slice(I, G.length);
            G = G.slice(0, I)
        }
        var H = "GET";
        if (J) {
            if (o.isFunction(J)) {
                K = J;
                J = null
            } else {
                if (typeof J === "object") {
                    J = o.param(J);
                    H = "POST"
                }
            }
        }
        var F = this;
        o.ajax({url: G, type: H, dataType: "html", data: J, complete: function (M, L) {
            if (L == "success" || L == "notmodified") {
                F.html(E ? o("<div/>").append(M.responseText.replace(/<script(.|\s)*?\/script>/g, "")).find(E) : M.responseText)
            }
            if (K) {
                F.each(K, [M.responseText, L, M])
            }
        }});
        return this
    }, serialize: function () {
        return o.param(this.serializeArray())
    }, serializeArray: function () {
        return this.map(function () {
            return this.elements ? o.makeArray(this.elements) : this
        }).filter(function () {
            return this.name && !this.disabled && (this.checked || /select|textarea/i.test(this.nodeName) || /text|hidden|password|search/i.test(this.type))
        }).map(function (E, F) {
            var G = o(this).val();
            return G == null ? null : o.isArray(G) ? o.map(G, function (I, H) {
                return{name: F.name, value: I}
            }) : {name: F.name, value: G}
        }).get()
    }});
    o.each("ajaxStart,ajaxStop,ajaxComplete,ajaxError,ajaxSuccess,ajaxSend".split(","), function (E, F) {
        o.fn[F] = function (G) {
            return this.bind(F, G)
        }
    });
    var r = e();
    o.extend({get: function (E, G, H, F) {
        if (o.isFunction(G)) {
            H = G;
            G = null
        }
        return o.ajax({type: "GET", url: E, data: G, success: H, dataType: F})
    }, getScript: function (E, F) {
        return o.get(E, null, F, "script")
    }, getJSON: function (E, F, G) {
        return o.get(E, F, G, "json")
    }, post: function (E, G, H, F) {
        if (o.isFunction(G)) {
            H = G;
            G = {}
        }
        return o.ajax({type: "POST", url: E, data: G, success: H, dataType: F})
    }, ajaxSetup: function (E) {
        o.extend(o.ajaxSettings, E)
    }, ajaxSettings: {url: location.href, global: true, type: "GET", contentType: "application/x-www-form-urlencoded", processData: true, async: true, xhr: function () {
        return l.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest()
    }, accepts: {xml: "application/xml, text/xml", html: "text/html", script: "text/javascript, application/javascript", json: "application/json, text/javascript", text: "text/plain", _default: "*/*"}}, lastModified: {}, ajax: function (M) {
        M = o.extend(true, M, o.extend(true, {}, o.ajaxSettings, M));
        var W, F = /=\?(&|$)/g, R, V, G = M.type.toUpperCase();
        if (M.data && M.processData && typeof M.data !== "string") {
            M.data = o.param(M.data)
        }
        if (M.dataType == "jsonp") {
            if (G == "GET") {
                if (!M.url.match(F)) {
                    M.url += (M.url.match(/\?/) ? "&" : "?") + (M.jsonp || "callback") + "=?"
                }
            } else {
                if (!M.data || !M.data.match(F)) {
                    M.data = (M.data ? M.data + "&" : "") + (M.jsonp || "callback") + "=?"
                }
            }
            M.dataType = "json"
        }
        if (M.dataType == "json" && (M.data && M.data.match(F) || M.url.match(F))) {
            W = "jsonp" + r++;
            if (M.data) {
                M.data = (M.data + "").replace(F, "=" + W + "$1")
            }
            M.url = M.url.replace(F, "=" + W + "$1");
            M.dataType = "script";
            l[W] = function (X) {
                V = X;
                I();
                L();
                l[W] = g;
                try {
                    delete l[W]
                } catch (Y) {
                }
                if (H) {
                    H.removeChild(T)
                }
            }
        }
        if (M.dataType == "script" && M.cache == null) {
            M.cache = false
        }
        if (M.cache === false && G == "GET") {
            var E = e();
            var U = M.url.replace(/(\?|&)_=.*?(&|$)/, "$1_=" + E + "$2");
            M.url = U + ((U == M.url) ? (M.url.match(/\?/) ? "&" : "?") + "_=" + E : "")
        }
        if (M.data && G == "GET") {
            M.url += (M.url.match(/\?/) ? "&" : "?") + M.data;
            M.data = null
        }
        if (M.global && !o.active++) {
            o.event.trigger("ajaxStart")
        }
        var Q = /^(\w+:)?\/\/([^\/?#]+)/.exec(M.url);
        if (M.dataType == "script" && G == "GET" && Q && (Q[1] && Q[1] != location.protocol || Q[2] != location.host)) {
            var H = document.getElementsByTagName("head")[0];
            var T = document.createElement("script");
            T.src = M.url;
            if (M.scriptCharset) {
                T.charset = M.scriptCharset
            }
            if (!W) {
                var O = false;
                T.onload = T.onreadystatechange = function () {
                    if (!O && (!this.readyState || this.readyState == "loaded" || this.readyState == "complete")) {
                        O = true;
                        I();
                        L();
                        T.onload = T.onreadystatechange = null;
                        H.removeChild(T)
                    }
                }
            }
            H.appendChild(T);
            return g
        }
        var K = false;
        var J = M.xhr();
        if (M.username) {
            J.open(G, M.url, M.async, M.username, M.password)
        } else {
            J.open(G, M.url, M.async)
        }
        try {
            if (M.data) {
                J.setRequestHeader("Content-Type", M.contentType)
            }
            if (M.ifModified) {
                J.setRequestHeader("If-Modified-Since", o.lastModified[M.url] || "Thu, 01 Jan 1970 00:00:00 GMT")
            }
            J.setRequestHeader("X-Requested-With", "XMLHttpRequest");
            J.setRequestHeader("Accept", M.dataType && M.accepts[M.dataType] ? M.accepts[M.dataType] + ", */*" : M.accepts._default)
        } catch (S) {
        }
        if (M.beforeSend && M.beforeSend(J, M) === false) {
            if (M.global && !--o.active) {
                o.event.trigger("ajaxStop")
            }
            J.abort();
            return false
        }
        if (M.global) {
            o.event.trigger("ajaxSend", [J, M])
        }
        var N = function (X) {
            if (J.readyState == 0) {
                if (P) {
                    clearInterval(P);
                    P = null;
                    if (M.global && !--o.active) {
                        o.event.trigger("ajaxStop")
                    }
                }
            } else {
                if (!K && J && (J.readyState == 4 || X == "timeout")) {
                    K = true;
                    if (P) {
                        clearInterval(P);
                        P = null
                    }
                    R = X == "timeout" ? "timeout" : !o.httpSuccess(J) ? "error" : M.ifModified && o.httpNotModified(J, M.url) ? "notmodified" : "success";
                    if (R == "success") {
                        try {
                            V = o.httpData(J, M.dataType, M)
                        } catch (Z) {
                            R = "parsererror"
                        }
                    }
                    if (R == "success") {
                        var Y;
                        try {
                            Y = J.getResponseHeader("Last-Modified")
                        } catch (Z) {
                        }
                        if (M.ifModified && Y) {
                            o.lastModified[M.url] = Y
                        }
                        if (!W) {
                            I()
                        }
                    } else {
                        o.handleError(M, J, R)
                    }
                    L();
                    if (X) {
                        J.abort()
                    }
                    if (M.async) {
                        J = null
                    }
                }
            }
        };
        if (M.async) {
            var P = setInterval(N, 13);
            if (M.timeout > 0) {
                setTimeout(function () {
                    if (J && !K) {
                        N("timeout")
                    }
                }, M.timeout)
            }
        }
        try {
            J.send(M.data)
        } catch (S) {
            o.handleError(M, J, null, S)
        }
        if (!M.async) {
            N()
        }
        function I() {
            if (M.success) {
                M.success(V, R)
            }
            if (M.global) {
                o.event.trigger("ajaxSuccess", [J, M])
            }
        }

        function L() {
            if (M.complete) {
                M.complete(J, R)
            }
            if (M.global) {
                o.event.trigger("ajaxComplete", [J, M])
            }
            if (M.global && !--o.active) {
                o.event.trigger("ajaxStop")
            }
        }

        return J
    }, handleError: function (F, H, E, G) {
        if (F.error) {
            F.error(H, E, G)
        }
        if (F.global) {
            o.event.trigger("ajaxError", [H, F, G])
        }
    }, active: 0, httpSuccess: function (F) {
        try {
            return!F.status && location.protocol == "file:" || (F.status >= 200 && F.status < 300) || F.status == 304 || F.status == 1223
        } catch (E) {
        }
        return false
    }, httpNotModified: function (G, E) {
        try {
            var H = G.getResponseHeader("Last-Modified");
            return G.status == 304 || H == o.lastModified[E]
        } catch (F) {
        }
        return false
    }, httpData: function (J, H, G) {
        var F = J.getResponseHeader("content-type"), E = H == "xml" || !H && F && F.indexOf("xml") >= 0, I = E ? J.responseXML : J.responseText;
        if (E && I.documentElement.tagName == "parsererror") {
            throw"parsererror"
        }
        if (G && G.dataFilter) {
            I = G.dataFilter(I, H)
        }
        if (typeof I === "string") {
            if (H == "script") {
                o.globalEval(I)
            }
            if (H == "json") {
                I = l["eval"]("(" + I + ")")
            }
        }
        return I
    }, param: function (E) {
        var G = [];

        function H(I, J) {
            G[G.length] = encodeURIComponent(I) + "=" + encodeURIComponent(J)
        }

        if (o.isArray(E) || E.jquery) {
            o.each(E, function () {
                H(this.name, this.value)
            })
        } else {
            for (var F in E) {
                if (o.isArray(E[F])) {
                    o.each(E[F], function () {
                        H(F, this)
                    })
                } else {
                    H(F, o.isFunction(E[F]) ? E[F]() : E[F])
                }
            }
        }
        return G.join("&").replace(/%20/g, "+")
    }});
    var m = {}, n, d = [
        ["height", "marginTop", "marginBottom", "paddingTop", "paddingBottom"],
        ["width", "marginLeft", "marginRight", "paddingLeft", "paddingRight"],
        ["opacity"]
    ];

    function t(F, E) {
        var G = {};
        o.each(d.concat.apply([], d.slice(0, E)), function () {
            G[this] = F
        });
        return G
    }

    o.fn.extend({show: function (J, L) {
        if (J) {
            return this.animate(t("show", 3), J, L)
        } else {
            for (var H = 0, F = this.length; H < F; H++) {
                var E = o.data(this[H], "olddisplay");
                this[H].style.display = E || "";
                if (o.css(this[H], "display") === "none") {
                    var G = this[H].tagName, K;
                    if (m[G]) {
                        K = m[G]
                    } else {
                        var I = o("<" + G + " />").appendTo("body");
                        K = I.css("display");
                        if (K === "none") {
                            K = "block"
                        }
                        I.remove();
                        m[G] = K
                    }
                    o.data(this[H], "olddisplay", K)
                }
            }
            for (var H = 0, F = this.length; H < F; H++) {
                this[H].style.display = o.data(this[H], "olddisplay") || ""
            }
            return this
        }
    }, hide: function (H, I) {
        if (H) {
            return this.animate(t("hide", 3), H, I)
        } else {
            for (var G = 0, F = this.length; G < F; G++) {
                var E = o.data(this[G], "olddisplay");
                if (!E && E !== "none") {
                    o.data(this[G], "olddisplay", o.css(this[G], "display"))
                }
            }
            for (var G = 0, F = this.length; G < F; G++) {
                this[G].style.display = "none"
            }
            return this
        }
    }, _toggle: o.fn.toggle, toggle: function (G, F) {
        var E = typeof G === "boolean";
        return o.isFunction(G) && o.isFunction(F) ? this._toggle.apply(this, arguments) : G == null || E ? this.each(function () {
            var H = E ? G : o(this).is(":hidden");
            o(this)[H ? "show" : "hide"]()
        }) : this.animate(t("toggle", 3), G, F)
    }, fadeTo: function (E, G, F) {
        return this.animate({opacity: G}, E, F)
    }, animate: function (I, F, H, G) {
        var E = o.speed(F, H, G);
        return this[E.queue === false ? "each" : "queue"](function () {
            var K = o.extend({}, E), M, L = this.nodeType == 1 && o(this).is(":hidden"), J = this;
            for (M in I) {
                if (I[M] == "hide" && L || I[M] == "show" && !L) {
                    return K.complete.call(this)
                }
                if ((M == "height" || M == "width") && this.style) {
                    K.display = o.css(this, "display");
                    K.overflow = this.style.overflow
                }
            }
            if (K.overflow != null) {
                this.style.overflow = "hidden"
            }
            K.curAnim = o.extend({}, I);
            o.each(I, function (O, S) {
                var R = new o.fx(J, K, O);
                if (/toggle|show|hide/.test(S)) {
                    R[S == "toggle" ? L ? "show" : "hide" : S](I)
                } else {
                    var Q = S.toString().match(/^([+-]=)?([\d+-.]+)(.*)$/), T = R.cur(true) || 0;
                    if (Q) {
                        var N = parseFloat(Q[2]), P = Q[3] || "px";
                        if (P != "px") {
                            J.style[O] = (N || 1) + P;
                            T = ((N || 1) / R.cur(true)) * T;
                            J.style[O] = T + P
                        }
                        if (Q[1]) {
                            N = ((Q[1] == "-=" ? -1 : 1) * N) + T
                        }
                        R.custom(T, N, P)
                    } else {
                        R.custom(T, S, "")
                    }
                }
            });
            return true
        })
    }, stop: function (F, E) {
        var G = o.timers;
        if (F) {
            this.queue([])
        }
        this.each(function () {
            for (var H = G.length - 1; H >= 0; H--) {
                if (G[H].elem == this) {
                    if (E) {
                        G[H](true)
                    }
                    G.splice(H, 1)
                }
            }
        });
        if (!E) {
            this.dequeue()
        }
        return this
    }});
    o.each({slideDown: t("show", 1), slideUp: t("hide", 1), slideToggle: t("toggle", 1), fadeIn: {opacity: "show"}, fadeOut: {opacity: "hide"}}, function (E, F) {
        o.fn[E] = function (G, H) {
            return this.animate(F, G, H)
        }
    });
    o.extend({speed: function (G, H, F) {
        var E = typeof G === "object" ? G : {complete: F || !F && H || o.isFunction(G) && G, duration: G, easing: F && H || H && !o.isFunction(H) && H};
        E.duration = o.fx.off ? 0 : typeof E.duration === "number" ? E.duration : o.fx.speeds[E.duration] || o.fx.speeds._default;
        E.old = E.complete;
        E.complete = function () {
            if (E.queue !== false) {
                o(this).dequeue()
            }
            if (o.isFunction(E.old)) {
                E.old.call(this)
            }
        };
        return E
    }, easing: {linear: function (G, H, E, F) {
        return E + F * G
    }, swing: function (G, H, E, F) {
        return((-Math.cos(G * Math.PI) / 2) + 0.5) * F + E
    }}, timers: [], fx: function (F, E, G) {
        this.options = E;
        this.elem = F;
        this.prop = G;
        if (!E.orig) {
            E.orig = {}
        }
    }});
    o.fx.prototype = {update: function () {
        if (this.options.step) {
            this.options.step.call(this.elem, this.now, this)
        }
        (o.fx.step[this.prop] || o.fx.step._default)(this);
        if ((this.prop == "height" || this.prop == "width") && this.elem.style) {
            this.elem.style.display = "block"
        }
    }, cur: function (F) {
        if (this.elem[this.prop] != null && (!this.elem.style || this.elem.style[this.prop] == null)) {
            return this.elem[this.prop]
        }
        var E = parseFloat(o.css(this.elem, this.prop, F));
        return E && E > -10000 ? E : parseFloat(o.curCSS(this.elem, this.prop)) || 0
    }, custom: function (I, H, G) {
        this.startTime = e();
        this.start = I;
        this.end = H;
        this.unit = G || this.unit || "px";
        this.now = this.start;
        this.pos = this.state = 0;
        var E = this;

        function F(J) {
            return E.step(J)
        }

        F.elem = this.elem;
        if (F() && o.timers.push(F) && !n) {
            n = setInterval(function () {
                var K = o.timers;
                for (var J = 0; J < K.length; J++) {
                    if (!K[J]()) {
                        K.splice(J--, 1)
                    }
                }
                if (!K.length) {
                    clearInterval(n);
                    n = g
                }
            }, 13)
        }
    }, show: function () {
        this.options.orig[this.prop] = o.attr(this.elem.style, this.prop);
        this.options.show = true;
        this.custom(this.prop == "width" || this.prop == "height" ? 1 : 0, this.cur());
        o(this.elem).show()
    }, hide: function () {
        this.options.orig[this.prop] = o.attr(this.elem.style, this.prop);
        this.options.hide = true;
        this.custom(this.cur(), 0)
    }, step: function (H) {
        var G = e();
        if (H || G >= this.options.duration + this.startTime) {
            this.now = this.end;
            this.pos = this.state = 1;
            this.update();
            this.options.curAnim[this.prop] = true;
            var E = true;
            for (var F in this.options.curAnim) {
                if (this.options.curAnim[F] !== true) {
                    E = false
                }
            }
            if (E) {
                if (this.options.display != null) {
                    this.elem.style.overflow = this.options.overflow;
                    this.elem.style.display = this.options.display;
                    if (o.css(this.elem, "display") == "none") {
                        this.elem.style.display = "block"
                    }
                }
                if (this.options.hide) {
                    o(this.elem).hide()
                }
                if (this.options.hide || this.options.show) {
                    for (var I in this.options.curAnim) {
                        o.attr(this.elem.style, I, this.options.orig[I])
                    }
                }
                this.options.complete.call(this.elem)
            }
            return false
        } else {
            var J = G - this.startTime;
            this.state = J / this.options.duration;
            this.pos = o.easing[this.options.easing || (o.easing.swing ? "swing" : "linear")](this.state, J, 0, 1, this.options.duration);
            this.now = this.start + ((this.end - this.start) * this.pos);
            this.update()
        }
        return true
    }};
    o.extend(o.fx, {speeds: {slow: 600, fast: 200, _default: 400}, step: {opacity: function (E) {
        o.attr(E.elem.style, "opacity", E.now)
    }, _default: function (E) {
        if (E.elem.style && E.elem.style[E.prop] != null) {
            E.elem.style[E.prop] = E.now + E.unit
        } else {
            E.elem[E.prop] = E.now
        }
    }}});
    if (document.documentElement.getBoundingClientRect) {
        o.fn.offset = function () {
            if (!this[0]) {
                return{top: 0, left: 0}
            }
            if (this[0] === this[0].ownerDocument.body) {
                return o.offset.bodyOffset(this[0])
            }
            var G = this[0].getBoundingClientRect(), J = this[0].ownerDocument, F = J.body, E = J.documentElement, L = E.clientTop || F.clientTop || 0, K = E.clientLeft || F.clientLeft || 0, I = G.top + (self.pageYOffset || o.boxModel && E.scrollTop || F.scrollTop) - L, H = G.left + (self.pageXOffset || o.boxModel && E.scrollLeft || F.scrollLeft) - K;
            return{top: I, left: H}
        }
    } else {
        o.fn.offset = function () {
            if (!this[0]) {
                return{top: 0, left: 0}
            }
            if (this[0] === this[0].ownerDocument.body) {
                return o.offset.bodyOffset(this[0])
            }
            o.offset.initialized || o.offset.initialize();
            var J = this[0], G = J.offsetParent, F = J, O = J.ownerDocument, M, H = O.documentElement, K = O.body, L = O.defaultView, E = L.getComputedStyle(J, null), N = J.offsetTop, I = J.offsetLeft;
            while ((J = J.parentNode) && J !== K && J !== H) {
                M = L.getComputedStyle(J, null);
                N -= J.scrollTop, I -= J.scrollLeft;
                if (J === G) {
                    N += J.offsetTop, I += J.offsetLeft;
                    if (o.offset.doesNotAddBorder && !(o.offset.doesAddBorderForTableAndCells && /^t(able|d|h)$/i.test(J.tagName))) {
                        N += parseInt(M.borderTopWidth, 10) || 0, I += parseInt(M.borderLeftWidth, 10) || 0
                    }
                    F = G, G = J.offsetParent
                }
                if (o.offset.subtractsBorderForOverflowNotVisible && M.overflow !== "visible") {
                    N += parseInt(M.borderTopWidth, 10) || 0, I += parseInt(M.borderLeftWidth, 10) || 0
                }
                E = M
            }
            if (E.position === "relative" || E.position === "static") {
                N += K.offsetTop, I += K.offsetLeft
            }
            if (E.position === "fixed") {
                N += Math.max(H.scrollTop, K.scrollTop), I += Math.max(H.scrollLeft, K.scrollLeft)
            }
            return{top: N, left: I}
        }
    }
    o.offset = {initialize: function () {
        if (this.initialized) {
            return
        }
        var L = document.body, F = document.createElement("div"), H, G, N, I, M, E, J = L.style.marginTop, K = '<div style="position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;"><div></div></div><table style="position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;" cellpadding="0" cellspacing="0"><tr><td></td></tr></table>';
        M = {position: "absolute", top: 0, left: 0, margin: 0, border: 0, width: "1px", height: "1px", visibility: "hidden"};
        for (E in M) {
            F.style[E] = M[E]
        }
        F.innerHTML = K;
        L.insertBefore(F, L.firstChild);
        H = F.firstChild, G = H.firstChild, I = H.nextSibling.firstChild.firstChild;
        this.doesNotAddBorder = (G.offsetTop !== 5);
        this.doesAddBorderForTableAndCells = (I.offsetTop === 5);
        H.style.overflow = "hidden", H.style.position = "relative";
        this.subtractsBorderForOverflowNotVisible = (G.offsetTop === -5);
        L.style.marginTop = "1px";
        this.doesNotIncludeMarginInBodyOffset = (L.offsetTop === 0);
        L.style.marginTop = J;
        L.removeChild(F);
        this.initialized = true
    }, bodyOffset: function (E) {
        o.offset.initialized || o.offset.initialize();
        var G = E.offsetTop, F = E.offsetLeft;
        if (o.offset.doesNotIncludeMarginInBodyOffset) {
            G += parseInt(o.curCSS(E, "marginTop", true), 10) || 0, F += parseInt(o.curCSS(E, "marginLeft", true), 10) || 0
        }
        return{top: G, left: F}
    }};
    o.fn.extend({position: function () {
        var I = 0, H = 0, F;
        if (this[0]) {
            var G = this.offsetParent(), J = this.offset(), E = /^body|html$/i.test(G[0].tagName) ? {top: 0, left: 0} : G.offset();
            J.top -= j(this, "marginTop");
            J.left -= j(this, "marginLeft");
            E.top += j(G, "borderTopWidth");
            E.left += j(G, "borderLeftWidth");
            F = {top: J.top - E.top, left: J.left - E.left}
        }
        return F
    }, offsetParent: function () {
        var E = this[0].offsetParent || document.body;
        while (E && (!/^body|html$/i.test(E.tagName) && o.css(E, "position") == "static")) {
            E = E.offsetParent
        }
        return o(E)
    }});
    o.each(["Left", "Top"], function (F, E) {
        var G = "scroll" + E;
        o.fn[G] = function (H) {
            if (!this[0]) {
                return null
            }
            return H !== g ? this.each(function () {
                this == l || this == document ? l.scrollTo(!F ? H : o(l).scrollLeft(), F ? H : o(l).scrollTop()) : this[G] = H
            }) : this[0] == l || this[0] == document ? self[F ? "pageYOffset" : "pageXOffset"] || o.boxModel && document.documentElement[G] || document.body[G] : this[0][G]
        }
    });
    o.each(["Height", "Width"], function (I, G) {
        var E = I ? "Left" : "Top", H = I ? "Right" : "Bottom", F = G.toLowerCase();
        o.fn["inner" + G] = function () {
            return this[0] ? o.css(this[0], F, false, "padding") : null
        };
        o.fn["outer" + G] = function (K) {
            return this[0] ? o.css(this[0], F, false, K ? "margin" : "border") : null
        };
        var J = G.toLowerCase();
        o.fn[J] = function (K) {
            return this[0] == l ? document.compatMode == "CSS1Compat" && document.documentElement["client" + G] || document.body["client" + G] : this[0] == document ? Math.max(document.documentElement["client" + G], document.body["scroll" + G], document.documentElement["scroll" + G], document.body["offset" + G], document.documentElement["offset" + G]) : K === g ? (this.length ? o.css(this[0], J) : null) : this.css(J, typeof K === "string" ? K : K + "px")
        }
    })
})();
jQuery.cookie = function (name, value, options) {
    if (typeof value != 'undefined') {
        options = options || {};
        if (value === null) {
            value = '';
            options.expires = -1;
        }
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString();
        }
        var path = options.path ? '; path=' + (options.path) : '';
        var domain = options.domain ? '; domain=' + (options.domain) : '';
        var secure = options.secure ? '; secure' : '';
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    } else {
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
};
(function ($) {
    $.fn.pager = function (options) {
        var opts = $.extend({}, $.fn.pager.defaults, options);
        return this.each(function () {
            $(this).empty().append(renderpager(parseInt(options.pagenumber), parseInt(options.pagecount), options.buttonClickCallback));
            $('.pages li').mouseover(function () {
                this.style.cursor = "pointer";
            }).mouseout(function () {
                this.style.cursor = "auto";
            });
        });
    };
    function renderpager(pagenumber, pagecount, buttonClickCallback) {
        var $pager = $('<ul class="pages"></ul>');
        $pager.append(renderButton('首页', pagenumber, pagecount, buttonClickCallback)).append(renderButton('上一页', pagenumber, pagecount, buttonClickCallback));
        var startPoint = 1;
        var endPoint = 9;
        if (pagenumber > 4) {
            startPoint = pagenumber - 4;
            endPoint = pagenumber + 4;
        }
        if (endPoint > pagecount) {
            startPoint = pagecount - 8;
            endPoint = pagecount;
        }
        if (startPoint < 1) {
            startPoint = 1;
        }
        for (var page = startPoint; page <= endPoint; page++) {
            var currentButton = $('<li class="page-number">' + (page) + '</li>');
            page == pagenumber ? currentButton.addClass('pgCurrent') : currentButton.click(function () {
                buttonClickCallback(this.firstChild.data);
            });
            currentButton.appendTo($pager);
        }
        $pager.append(renderButton('下一页', pagenumber, pagecount, buttonClickCallback)).append(renderButton('末页', pagenumber, pagecount, buttonClickCallback));
        return $pager;
    }

    function renderButton(buttonLabel, pagenumber, pagecount, buttonClickCallback) {
        var $Button = $('<li class="pgNext">' + buttonLabel + '</li>');
        var destPage = 1;
        switch (buttonLabel) {
            case"首页":
                destPage = 1;
                break;
            case"上一页":
                destPage = pagenumber - 1;
                break;
            case"下一页":
                destPage = pagenumber + 1;
                break;
            case"末页":
                destPage = pagecount;
                break;
        }
        if (buttonLabel == "首页" || buttonLabel == "上一页") {
            pagenumber <= 1 ? $Button.addClass('pgEmpty') : $Button.click(function () {
                buttonClickCallback(destPage);
            });
        }
        else {
            pagenumber >= pagecount ? $Button.addClass('pgEmpty') : $Button.click(function () {
                buttonClickCallback(destPage);
            });
        }
        return $Button;
    }

    $.fn.pager.defaults = {pagenumber: 1, pagecount: 1};
})(jQuery);
(function (c) {
    function h(b) {
        c.fn.cycle.debug && k(b)
    }

    function k() {
        window.console && window.console.log && window.console.log("[cycle] " + Array.prototype.join.call(arguments, " "))
    }

    function l(b, e, h) {
        function m(b, e, h) {
            if (!b && e === !0) {
                b = c(h).data("cycle.opts");
                if (!b)return k("options not found, can not resume"), !1;
                if (h.cycleTimeout)clearTimeout(h.cycleTimeout), h.cycleTimeout = 0;
                t(b.elements, b, 1, 1)
            }
        }

        if (b.cycleStop == void 0)b.cycleStop = 0;
        if (e === void 0 || e === null)e = {};
        if (e.constructor == String)switch (e) {
            case"destroy":
            case"stop":
                h = c(b).data("cycle.opts");
                if (!h)return!1;
                b.cycleStop++;
                b.cycleTimeout && clearTimeout(b.cycleTimeout);
                b.cycleTimeout = 0;
                c(b).removeData("cycle.opts");
                e == "destroy" && r(h);
                return!1;
            case"toggle":
                return b.cyclePause = b.cyclePause === 1 ? 0 : 1, m(b.cyclePause, h, b), !1;
            case"pause":
                return b.cyclePause = 1, !1;
            case"resume":
                return b.cyclePause = 0, m(!1, h, b), !1;
            case"prev":
            case"next":
                h = c(b).data("cycle.opts");
                if (!h)return k('options not found, "prev/next" ignored'), !1;
                c.fn.cycle[e](h);
                return!1;
            default:
                e = {fx: e}
        } else if (e.constructor == Number) {
            var l = e, e = c(b).data("cycle.opts");
            if (!e)return k("options not found, can not advance slide"), !1;
            if (l < 0 || l >= e.elements.length)return k("invalid slide index: " + l), !1;
            e.nextSlide = l;
            if (b.cycleTimeout)clearTimeout(b.cycleTimeout), b.cycleTimeout = 0;
            if (typeof h == "string")e.oneTimeFx = h;
            t(e.elements, e, 1, l >= e.currSlide);
            return!1
        }
        return e
    }

    function s(b, e) {
        if (!c.support.opacity && e.cleartype && b.style.filter)try {
            b.style.removeAttribute("filter")
        } catch (h) {
        }
    }

    function r(b) {
        b.next && c(b.next).unbind(b.prevNextEvent);
        b.prev && c(b.prev).unbind(b.prevNextEvent);
        if (b.pager || b.pagerAnchorBuilder)c.each(b.pagerAnchors || [], function () {
            this.unbind().remove()
        });
        b.pagerAnchors = null;
        b.destroy && b.destroy(b)
    }

    function q(b, e, h, m, l) {
        var j = c.extend({}, c.fn.cycle.defaults, m || {}, c.metadata ? b.metadata() : c.meta ? b.data() : {});
        if (j.autostop)j.countdown = j.autostopCount || h.length;
        var q = b[0];
        b.data("cycle.opts", j);
        j.$cont = b;
        j.stopCount = q.cycleStop;
        j.elements = h;
        j.before = j.before ? [j.before] : [];
        j.after = j.after ? [j.after] : [];
        j.after.unshift(function () {
            j.busy = 0
        });
        !c.support.opacity && j.cleartype && j.after.push(function () {
            s(this, j)
        });
        j.continuous && j.after.push(function () {
            t(h, j, 0, !j.rev)
        });
        v(j);
        !c.support.opacity && j.cleartype && !j.cleartypeNoBg && B(e);
        b.css("position") == "static" && b.css("position", "relative");
        j.width && b.width(j.width);
        j.height && j.height != "auto" && b.height(j.height);
        if (j.startingSlide)j.startingSlide = parseInt(j.startingSlide);
        if (j.random) {
            j.randomMap = [];
            for (q = 0; q < h.length; q++)j.randomMap.push(q);
            j.randomMap.sort(function () {
                return Math.random() - 0.5
            });
            j.randomIndex = 1;
            j.startingSlide = j.randomMap[1]
        } else if (j.startingSlide >= h.length)j.startingSlide = 0;
        j.currSlide = j.startingSlide || 0;
        var r = j.startingSlide;
        e.css({position: "absolute", top: 0, left: 0}).hide().each(function (b) {
            b = r ? b >= r ? h.length - (b - r) : r - b : h.length - b;
            c(this).css("z-index", b)
        });
        c(h[r]).css("opacity", 1).show();
        s(h[r], j);
        j.fit && j.width && e.width(j.width);
        j.fit && j.height && j.height != "auto" && e.height(j.height);
        if (j.containerResize && !b.innerHeight()) {
            for (var u = q = 0, J = 0; J < h.length; J++) {
                var F = c(h[J]), H = F[0], w = F.outerWidth(), C = F.outerHeight();
                w || (w = H.offsetWidth || H.width || F.attr("width"));
                C || (C = H.offsetHeight || H.height || F.attr("height"));
                q = w > q ? w : q;
                u = C > u ? C : u
            }
            q > 0 && u > 0 && b.css({width: q + "px", height: u + "px"})
        }
        j.pause && b.hover(function () {
            this.cyclePause++
        }, function () {
            this.cyclePause--
        });
        if (z(j) === !1)return!1;
        var M = !1;
        m.requeueAttempts = m.requeueAttempts || 0;
        e.each(function () {
            var b = c(this);
            this.cycleH = j.fit && j.height ? j.height : b.height() || this.offsetHeight || this.height || b.attr("height") || 0;
            this.cycleW = j.fit && j.width ? j.width : b.width() || this.offsetWidth || this.width || b.attr("width") || 0;
            if (b.is("img")) {
                var b = c.browser.mozilla && this.cycleW == 34 && this.cycleH == 19 && !this.complete, e = c.browser.opera && (this.cycleW == 42 && this.cycleH == 19 || this.cycleW == 37 && this.cycleH == 17) && !this.complete, h = this.cycleH == 0 && this.cycleW == 0 && !this.complete;
                if (c.browser.msie && this.cycleW == 28 && this.cycleH == 30 && !this.complete || b || e || h)if (l.s && j.requeueOnImageNotLoaded && ++m.requeueAttempts < 100)return k(m.requeueAttempts, " - img slide not loaded, requeuing slideshow: ", this.src, this.cycleW, this.cycleH), setTimeout(function () {
                    c(l.s, l.c).cycle(m)
                }, j.requeueTimeout), M = !0, !1; else k("could not determine size of image: " + this.src, this.cycleW, this.cycleH)
            }
            return!0
        });
        if (M)return!1;
        j.cssBefore = j.cssBefore || {};
        j.animIn = j.animIn || {};
        j.animOut = j.animOut || {};
        e.not(":eq(" + r + ")").css(j.cssBefore);
        j.cssFirst && c(e[r]).css(j.cssFirst);
        if (j.timeout) {
            j.timeout = parseInt(j.timeout);
            if (j.speed.constructor == String)j.speed = c.fx.speeds[j.speed] || parseInt(j.speed);
            j.sync || (j.speed /= 2);
            for (q = j.fx == "shuffle" ? 500 : 250; j.timeout - j.speed < q;)j.timeout += j.speed
        }
        if (j.easing)j.easeIn = j.easeOut = j.easing;
        if (!j.speedIn)j.speedIn = j.speed;
        if (!j.speedOut)j.speedOut = j.speed;
        j.slideCount = h.length;
        j.currSlide = j.lastSlide = r;
        if (j.random) {
            if (++j.randomIndex == h.length)j.randomIndex = 0;
            j.nextSlide = j.randomMap[j.randomIndex]
        } else j.nextSlide = j.startingSlide >= h.length - 1 ? 0 : j.startingSlide + 1;
        if (!j.multiFx)if (q = c.fn.cycle.transitions[j.fx], c.isFunction(q))q(b, e, j); else if (j.fx != "custom" && !j.multiFx)return k("unknown transition: " + j.fx, "; slideshow terminating"), !1;
        b = e[r];
        j.before.length && j.before[0].apply(b, [b, b, j, !0]);
        j.after.length > 1 && j.after[1].apply(b, [b, b, j, !0]);
        j.next && c(j.next).bind(j.prevNextEvent, function () {
            return x(j, j.rev ? -1 : 1)
        });
        j.prev && c(j.prev).bind(j.prevNextEvent, function () {
            return x(j, j.rev ? 1 : -1)
        });
        (j.pager || j.pagerAnchorBuilder) && E(h, j);
        A(j, h);
        return j
    }

    function v(b) {
        b.original = {before: [], after: []};
        b.original.cssBefore = c.extend({}, b.cssBefore);
        b.original.cssAfter = c.extend({}, b.cssAfter);
        b.original.animIn = c.extend({}, b.animIn);
        b.original.animOut = c.extend({}, b.animOut);
        c.each(b.before, function () {
            b.original.before.push(this)
        });
        c.each(b.after, function () {
            b.original.after.push(this)
        })
    }

    function z(b) {
        var e, o, m = c.fn.cycle.transitions;
        if (b.fx.indexOf(",") > 0) {
            b.multiFx = !0;
            b.fxs = b.fx.replace(/\s*/g, "").split(",");
            for (e = 0; e < b.fxs.length; e++) {
                var l = b.fxs[e];
                o = m[l];
                if (!o || !m.hasOwnProperty(l) || !c.isFunction(o))k("discarding unknown transition: ", l), b.fxs.splice(e, 1), e--
            }
            if (!b.fxs.length)return k("No valid transitions named; slideshow terminating."), !1
        } else if (b.fx == "all")for (p in b.multiFx = !0, b.fxs = [], m)o = m[p], m.hasOwnProperty(p) && c.isFunction(o) && b.fxs.push(p);
        if (b.multiFx && b.randomizeEffects) {
            o = Math.floor(Math.random() * 20) + 30;
            for (e = 0; e < o; e++)b.fxs.push(b.fxs.splice(Math.floor(Math.random() * b.fxs.length), 1)[0]);
            h("randomized fx sequence: ", b.fxs)
        }
        return!0
    }

    function A(b, e) {
        b.addSlide = function (h, k) {
            var l = c(h), j = l[0];
            b.autostopCount || b.countdown++;
            e[k ? "unshift" : "push"](j);
            if (b.els)b.els[k ? "unshift" : "push"](j);
            b.slideCount = e.length;
            l.css("position", "absolute");
            l[k ? "prependTo" : "appendTo"](b.$cont);
            k && (b.currSlide++, b.nextSlide++);
            !c.support.opacity && b.cleartype && !b.cleartypeNoBg && B(l);
            b.fit && b.width && l.width(b.width);
            b.fit && b.height && b.height != "auto" && $slides.height(b.height);
            j.cycleH = b.fit && b.height ? b.height : l.height();
            j.cycleW = b.fit && b.width ? b.width : l.width();
            l.css(b.cssBefore);
            (b.pager || b.pagerAnchorBuilder) && c.fn.cycle.createPagerAnchor(e.length - 1, j, c(b.pager), e, b);
            if (c.isFunction(b.onAddSlide))b.onAddSlide(l); else l.hide()
        }
    }

    function t(b, e, k, m) {
        if (k && e.busy && e.manualTrump)h("manualTrump in go(), stopping active transition"), c(b).stop(!0, !0), e.busy = !1;
        if (e.busy)h("transition active, ignoring new tx request"); else {
            var l = e.$cont[0], j = b[e.currSlide], q = b[e.nextSlide];
            if (!(l.cycleStop != e.stopCount || l.cycleTimeout === 0 && !k))if (!k && !l.cyclePause && (e.autostop && --e.countdown <= 0 || e.nowrap && !e.random && e.nextSlide < e.currSlide))e.end && e.end(e); else {
                var r = !1;
                if ((k || !l.cyclePause) && e.nextSlide != e.currSlide) {
                    var r = !0, s = e.fx;
                    j.cycleH = j.cycleH || c(j).height();
                    j.cycleW = j.cycleW || c(j).width();
                    q.cycleH = q.cycleH || c(q).height();
                    q.cycleW = q.cycleW || c(q).width();
                    if (e.multiFx) {
                        if (e.lastFx == void 0 || ++e.lastFx >= e.fxs.length)e.lastFx = 0;
                        s = e.fxs[e.lastFx];
                        e.currFx = s
                    }
                    if (e.oneTimeFx)s = e.oneTimeFx, e.oneTimeFx = null;
                    c.fn.cycle.resetState(e, s);
                    e.before.length && c.each(e.before, function (b, c) {
                        l.cycleStop == e.stopCount && c.apply(q, [j, q, e, m])
                    });
                    s = function () {
                        c.each(e.after, function (b, c) {
                            l.cycleStop == e.stopCount && c.apply(q, [j, q, e, m])
                        })
                    };
                    h("tx firing; currSlide: " + e.currSlide + "; nextSlide: " + e.nextSlide);
                    e.busy = 1;
                    if (e.fxFn)e.fxFn(j, q, e, s, m, k && e.fastOnEvent); else if (c.isFunction(c.fn.cycle[e.fx]))c.fn.cycle[e.fx](j, q, e, s, m, k && e.fastOnEvent); else c.fn.cycle.custom(j, q, e, s, m, k && e.fastOnEvent)
                }
                if (r || e.nextSlide == e.currSlide)if (e.lastSlide = e.currSlide, e.random) {
                    e.currSlide = e.nextSlide;
                    if (++e.randomIndex == b.length)e.randomIndex = 0;
                    e.nextSlide = e.randomMap[e.randomIndex];
                    if (e.nextSlide == e.currSlide)e.nextSlide = e.currSlide == e.slideCount - 1 ? 0 : e.currSlide + 1
                } else k = e.nextSlide + 1 == b.length, e.nextSlide = k ? 0 : e.nextSlide + 1, e.currSlide = k ? b.length - 1 : e.nextSlide - 1;
                r && e.pager && e.updateActivePagerLink(e.pager, e.currSlide, e.activePagerClass);
                r = 0;
                e.timeout && !e.continuous ? r = u(j, q, e, m) : e.continuous && l.cyclePause && (r = 10);
                if (r > 0)l.cycleTimeout = setTimeout(function () {
                    t(b, e, 0, !e.rev)
                }, r)
            }
        }
    }

    function u(b, c, k, m) {
        if (k.timeoutFn) {
            for (b = k.timeoutFn(b, c, k, m); b - k.speed < 250;)b += k.speed;
            h("calculated timeout: " + b + "; speed: " + k.speed);
            if (b !== !1)return b
        }
        return k.timeout
    }

    function x(b, e) {
        var h = b.elements, k = b.$cont[0], l = k.cycleTimeout;
        if (l)clearTimeout(l), k.cycleTimeout = 0;
        if (b.random && e < 0) {
            b.randomIndex--;
            if (--b.randomIndex == -2)b.randomIndex = h.length - 2; else if (b.randomIndex == -1)b.randomIndex = h.length - 1;
            b.nextSlide = b.randomMap[b.randomIndex]
        } else if (b.random)b.nextSlide = b.randomMap[b.randomIndex]; else if (b.nextSlide = b.currSlide + e, b.nextSlide < 0) {
            if (b.nowrap)return!1;
            b.nextSlide = h.length - 1
        } else if (b.nextSlide >= h.length) {
            if (b.nowrap)return!1;
            b.nextSlide = 0
        }
        k = b.onPrevNextEvent || b.prevNextClick;
        c.isFunction(k) && k(e > 0, b.nextSlide, h[b.nextSlide]);
        t(h, b, 1, e >= 0);
        return!1
    }

    function E(b, e) {
        var h = c(e.pager);
        c.each(b, function (k, l) {
            c.fn.cycle.createPagerAnchor(k, l, h, b, e)
        });
        e.updateActivePagerLink(e.pager, e.startingSlide, e.activePagerClass)
    }

    function B(b) {
        function e(b) {
            b = parseInt(b).toString(16);
            return b.length < 2 ? "0" + b : b
        }

        function k(b) {
            for (; b && b.nodeName.toLowerCase() != "html"; b = b.parentNode) {
                var h = c.css(b, "background-color");
                if (h.indexOf("rgb") >= 0)return b = h.match(/\d+/g), "#" + e(b[0]) + e(b[1]) + e(b[2]);
                if (h && h != "transparent")return h
            }
            return"#ffffff"
        }

        h("applying clearType background-color hack");
        b.each(function () {
            c(this).css("background-color", k(this))
        })
    }

    if (c.support == void 0)c.support = {opacity: !c.browser.msie};
    c.fn.cycle = function (b, e) {
        var o = {s: this.selector, c: this.context};
        if (this.length === 0 && b != "stop") {
            if (!c.isReady && o.s)return k("DOM not ready, queuing slideshow"), c(function () {
                c(o.s, o.c).cycle(b, e)
            }), this;
            k("terminating; zero elements found by selector" + (c.isReady ? "" : " (DOM not ready)"));
            return this
        }
        return this.each(function () {
            var m = l(this, b, e);
            if (m !== !1) {
                m.updateActivePagerLink = m.updateActivePagerLink || c.fn.cycle.updateActivePagerLink;
                this.cycleTimeout && clearTimeout(this.cycleTimeout);
                this.cycleTimeout = this.cyclePause = 0;
                var r = c(this), j = m.slideExpr ? c(m.slideExpr, this) : r.children(), s = j.get();
                if (s.length < 2)k("terminating; too few slides: " + s.length); else {
                    var x = q(r, j, s, m, o);
                    if (x !== !1 && (m = x.continuous ? 10 : u(x.currSlide, x.nextSlide, x, !x.rev)))m += x.delay || 0, m < 10 && (m = 10), h("first timeout: " + m), this.cycleTimeout = setTimeout(function () {
                        t(s, x, 0, !x.rev)
                    }, m)
                }
            }
        })
    };
    c.fn.cycle.resetState = function (b, e) {
        e = e || b.fx;
        b.before = [];
        b.after = [];
        b.cssBefore = c.extend({}, b.original.cssBefore);
        b.cssAfter = c.extend({}, b.original.cssAfter);
        b.animIn = c.extend({}, b.original.animIn);
        b.animOut = c.extend({}, b.original.animOut);
        b.fxFn = null;
        c.each(b.original.before, function () {
            b.before.push(this)
        });
        c.each(b.original.after, function () {
            b.after.push(this)
        });
        var h = c.fn.cycle.transitions[e];
        c.isFunction(h) && h(b.$cont, c(b.elements), b)
    };
    c.fn.cycle.updateActivePagerLink = function (b, e, h) {
        c(b).each(function () {
            c(this).children().removeClass(h).eq(e).addClass(h)
        })
    };
    c.fn.cycle.next = function (b) {
        x(b, b.rev ? -1 : 1)
    };
    c.fn.cycle.prev = function (b) {
        x(b, b.rev ? 1 : -1)
    };
    c.fn.cycle.createPagerAnchor = function (b, e, k, m, l) {
        c.isFunction(l.pagerAnchorBuilder) ? (e = l.pagerAnchorBuilder(b, e), h("pagerAnchorBuilder(" + b + ", el) returned: " + e)) : e = '<a href="#">' + (b + 1) + "</a>";
        if (e) {
            var j = c(e);
            if (j.parents("body").length === 0) {
                var q = [];
                k.length > 1 ? (k.each(function () {
                    var b = j.clone(!0);
                    c(this).append(b);
                    q.push(b[0])
                }), j = c(q)) : j.appendTo(k)
            }
            l.pagerAnchors = l.pagerAnchors || [];
            l.pagerAnchors.push(j);
            j.bind(l.pagerEvent, function (e) {
                e.preventDefault();
                l.nextSlide = b;
                var e = l.$cont[0], j = e.cycleTimeout;
                if (j)clearTimeout(j), e.cycleTimeout = 0;
                e = l.onPagerEvent || l.pagerClick;
                c.isFunction(e) && e(l.nextSlide, m[l.nextSlide]);
                t(m, l, 1, l.currSlide < b)
            });
            !/^click/.test(l.pagerEvent) && !l.allowPagerClickBubble && j.bind("click.cycle", function () {
                return!1
            });
            l.pauseOnPagerHover && j.hover(function () {
                l.$cont[0].cyclePause++
            }, function () {
                l.$cont[0].cyclePause--
            })
        }
    };
    c.fn.cycle.hopsFromLast = function (b, c) {
        var h = b.lastSlide, k = b.currSlide;
        return c ? k > h ? k - h : b.slideCount - h : k < h ? h - k : h + b.slideCount - k
    };
    c.fn.cycle.commonReset = function (b, e, h, k, l, j) {
        c(h.elements).not(b).hide();
        h.cssBefore.opacity = 1;
        h.cssBefore.display = "block";
        if (k !== !1 && e.cycleW > 0)h.cssBefore.width = e.cycleW;
        if (l !== !1 && e.cycleH > 0)h.cssBefore.height = e.cycleH;
        h.cssAfter = h.cssAfter || {};
        h.cssAfter.display = "none";
        c(b).css("zIndex", h.slideCount + (j === !0 ? 1 : 0));
        c(e).css("zIndex", h.slideCount + (j === !0 ? 0 : 1))
    };
    c.fn.cycle.custom = function (b, e, h, k, l, j) {
        var q = c(b), r = c(e), s = h.speedIn, b = h.speedOut, t = h.easeIn, e = h.easeOut;
        r.css(h.cssBefore);
        j && (s = typeof j == "number" ? b = j : b = 1, t = e = null);
        q.animate(h.animOut, b, e, function () {
            h.cssAfter && q.css(h.cssAfter);
            h.sync || r.animate(h.animIn, s, t, k)
        });
        h.sync && r.animate(h.animIn, s, t, k)
    };
    c.fn.cycle.transitions = {fade: function (b, e, h) {
        e.not(":eq(" + h.currSlide + ")").css("opacity", 0);
        h.before.push(function (b, e, j) {
            c.fn.cycle.commonReset(b, e, j);
            j.cssBefore.opacity = 0
        });
        h.animIn = {opacity: 1};
        h.animOut = {opacity: 0};
        h.cssBefore = {top: 0, left: 0}
    }};
    c.fn.cycle.ver = function () {
        return"2.86"
    };
    c.fn.cycle.defaults = {fx: "fade", timeout: 4E3, timeoutFn: null, continuous: 0, speed: 1E3, speedIn: null, speedOut: null, next: null, prev: null, onPrevNextEvent: null, prevNextEvent: "click.cycle", pager: null, onPagerEvent: null, pagerEvent: "click.cycle", allowPagerClickBubble: !1, pagerAnchorBuilder: null, before: null, after: null, end: null, easing: null, easeIn: null, easeOut: null, shuffle: null, animIn: null, animOut: null, cssBefore: null, cssAfter: null, fxFn: null, height: "auto", startingSlide: 0, sync: 1, random: 0, fit: 0, containerResize: 1, pause: 0, pauseOnPagerHover: 0, autostop: 0, autostopCount: 0, delay: 0, slideExpr: null, cleartype: !c.support.opacity, cleartypeNoBg: !1, nowrap: 0, fastOnEvent: 0, randomizeEffects: 1, rev: 0, manualTrump: !0, requeueOnImageNotLoaded: !0, requeueTimeout: 250, activePagerClass: "activeSlide", updateActivePagerLink: null}
})(jQuery);
(function (c) {
    c.fn.hoverIntent = function (h, k) {
        var l = {sensitivity: 7, interval: 100, timeout: 0}, l = c.extend(l, k ? {over: h, out: k} : h), s, r, q, v, z = function (c) {
            s = c.pageX;
            r = c.pageY
        }, A = function (h, k) {
            k.hoverIntent_t = clearTimeout(k.hoverIntent_t);
            if (Math.abs(q - s) + Math.abs(v - r) < l.sensitivity)return c(k).unbind("mousemove", z), k.hoverIntent_s = 1, l.over.apply(k, [h]); else q = s, v = r, k.hoverIntent_t = setTimeout(function () {
                A(h, k)
            }, l.interval)
        }, t = function (h) {
            for (var k = (h.type == "mouseover" ? h.fromElement : h.toElement) || h.relatedTarget; k && k != this;)try {
                k = k.parentNode
            } catch (r) {
                k = this
            }
            if (k == this)return!1;
            var s = jQuery.extend({}, h), b = this;
            if (b.hoverIntent_t)b.hoverIntent_t = clearTimeout(b.hoverIntent_t);
            if (h.type == "mouseover") {
                if (q = s.pageX, v = s.pageY, c(b).bind("mousemove", z), b.hoverIntent_s != 1)b.hoverIntent_t = setTimeout(function () {
                    A(s, b)
                }, l.interval)
            } else if (c(b).unbind("mousemove", z), b.hoverIntent_s == 1)b.hoverIntent_t = setTimeout(function () {
                b.hoverIntent_t = clearTimeout(b.hoverIntent_t);
                b.hoverIntent_s = 0;
                l.out.apply(b, [s])
            }, l.timeout)
        };
        return this.mouseover(t).mouseout(t)
    }
})(jQuery);
(function (c) {
    c.fn.hoverIntent = function (h, k) {
        var l = {sensitivity: 7, interval: 100, timeout: 0}, l = c.extend(l, k ? {over: h, out: k} : h), s, r, q, v, z = function (c) {
            s = c.pageX;
            r = c.pageY
        }, A = function (h, k) {
            k.hoverIntent_t = clearTimeout(k.hoverIntent_t);
            if (Math.abs(q - s) + Math.abs(v - r) < l.sensitivity)return c(k).unbind("mousemove", z), k.hoverIntent_s = 1, l.over.apply(k, [h]); else q = s, v = r, k.hoverIntent_t = setTimeout(function () {
                A(h, k)
            }, l.interval)
        }, t = function (h) {
            for (var k = (h.type == "mouseover" ? h.fromElement : h.toElement) || h.relatedTarget; k && k != this;)try {
                k = k.parentNode
            } catch (r) {
                k = this
            }
            if (k == this)return!1;
            var s = jQuery.extend({}, h), b = this;
            if (b.hoverIntent_t)b.hoverIntent_t = clearTimeout(b.hoverIntent_t);
            if (h.type == "mouseover") {
                if (q = s.pageX, v = s.pageY, c(b).bind("mousemove", z), b.hoverIntent_s != 1)b.hoverIntent_t = setTimeout(function () {
                    A(s, b)
                }, l.interval)
            } else if (c(b).unbind("mousemove", z), b.hoverIntent_s == 1)b.hoverIntent_t = setTimeout(function () {
                b.hoverIntent_t = clearTimeout(b.hoverIntent_t);
                b.hoverIntent_s = 0;
                l.out.apply(b, [s])
            }, l.timeout)
        };
        return this.mouseover(t).mouseout(t)
    }
})(jQuery);

jQuery.ui || (function ($) {
    var _remove = $.fn.remove, isFF2 = $.browser.mozilla && (parseFloat($.browser.version) < 1.9);
    $.ui = {version: "1.7.2", plugin: {add: function (module, option, set) {
        var proto = $.ui[module].prototype;
        for (var i in set) {
            proto.plugins[i] = proto.plugins[i] || [];
            proto.plugins[i].push([option, set[i]]);
        }
    }, call: function (instance, name, args) {
        var set = instance.plugins[name];
        if (!set || !instance.element[0].parentNode) {
            return;
        }
        for (var i = 0; i < set.length; i++) {
            if (instance.options[set[i][0]]) {
                set[i][1].apply(instance.element, args);
            }
        }
    }}, contains: function (a, b) {
        return document.compareDocumentPosition ? a.compareDocumentPosition(b) & 16 : a !== b && a.contains(b);
    }, hasScroll: function (el, a) {
        if ($(el).css('overflow') == 'hidden') {
            return false;
        }
        var scroll = (a && a == 'left') ? 'scrollLeft' : 'scrollTop', has = false;
        if (el[scroll] > 0) {
            return true;
        }
        el[scroll] = 1;
        has = (el[scroll] > 0);
        el[scroll] = 0;
        return has;
    }, isOverAxis: function (x, reference, size) {
        return(x > reference) && (x < (reference + size));
    }, isOver: function (y, x, top, left, height, width) {
        return $.ui.isOverAxis(y, top, height) && $.ui.isOverAxis(x, left, width);
    }, keyCode: {BACKSPACE: 8, CAPS_LOCK: 20, COMMA: 188, CONTROL: 17, DELETE: 46, DOWN: 40, END: 35, ENTER: 13, ESCAPE: 27, HOME: 36, INSERT: 45, LEFT: 37, NUMPAD_ADD: 107, NUMPAD_DECIMAL: 110, NUMPAD_DIVIDE: 111, NUMPAD_ENTER: 108, NUMPAD_MULTIPLY: 106, NUMPAD_SUBTRACT: 109, PAGE_DOWN: 34, PAGE_UP: 33, PERIOD: 190, RIGHT: 39, SHIFT: 16, SPACE: 32, TAB: 9, UP: 38}};
    if (isFF2) {
        var attr = $.attr, removeAttr = $.fn.removeAttr, ariaNS = "../www.w3.org/2005/07/aaa", ariaState = /^aria-/, ariaRole = /^wairole:/;
        $.attr = function (elem, name, value) {
            var set = value !== undefined;
            return(name == 'role' ? (set ? attr.call(this, elem, name, "wairole:" + value) : (attr.apply(this, arguments) || "").replace(ariaRole, "")) : (ariaState.test(name) ? (set ? elem.setAttributeNS(ariaNS, name.replace(ariaState, "aaa:"), value) : attr.call(this, elem, name.replace(ariaState, "aaa:"))) : attr.apply(this, arguments)));
        };
        $.fn.removeAttr = function (name) {
            return(ariaState.test(name) ? this.each(function () {
                this.removeAttributeNS(ariaNS, name.replace(ariaState, ""));
            }) : removeAttr.call(this, name));
        };
    }
    $.fn.extend({remove: function () {
        $("*", this).add(this).each(function () {
            $(this).triggerHandler("remove");
        });
        return _remove.apply(this, arguments);
    }, enableSelection: function () {
        return this.attr('unselectable', 'off').css('MozUserSelect', '').unbind('selectstart.ui');
    }, disableSelection: function () {
        return this.attr('unselectable', 'on').css('MozUserSelect', 'none').bind('selectstart.ui', function () {
            return false;
        });
    }, scrollParent: function () {
        var scrollParent;
        if (($.browser.msie && (/(static|relative)/).test(this.css('position'))) || (/absolute/).test(this.css('position'))) {
            scrollParent = this.parents().filter(function () {
                return(/(relative|absolute|fixed)/).test($.curCSS(this, 'position', 1)) && (/(auto|scroll)/).test($.curCSS(this, 'overflow', 1) + $.curCSS(this, 'overflow-y', 1) + $.curCSS(this, 'overflow-x', 1));
            }).eq(0);
        } else {
            scrollParent = this.parents().filter(function () {
                return(/(auto|scroll)/).test($.curCSS(this, 'overflow', 1) + $.curCSS(this, 'overflow-y', 1) + $.curCSS(this, 'overflow-x', 1));
            }).eq(0);
        }
        return(/fixed/).test(this.css('position')) || !scrollParent.length ? $(document) : scrollParent;
    }});
    $.extend($.expr[':'], {data: function (elem, i, match) {
        return!!$.data(elem, match[3]);
    }, focusable: function (element) {
        var nodeName = element.nodeName.toLowerCase(), tabIndex = $.attr(element, 'tabindex');
        return(/input|select|textarea|button|object/.test(nodeName) ? !element.disabled : 'a' == nodeName || 'area' == nodeName ? element.href || !isNaN(tabIndex) : !isNaN(tabIndex)) && !$(element)['area' == nodeName ? 'parents' : 'closest'](':hidden').length;
    }, tabbable: function (element) {
        var tabIndex = $.attr(element, 'tabindex');
        return(isNaN(tabIndex) || tabIndex >= 0) && $(element).is(':focusable');
    }});
    function getter(namespace, plugin, method, args) {
        function getMethods(type) {
            var methods = $[namespace][plugin][type] || [];
            return(typeof methods == 'string' ? methods.split(/,?\s+/) : methods);
        }

        var methods = getMethods('getter');
        if (args.length == 1 && typeof args[0] == 'string') {
            methods = methods.concat(getMethods('getterSetter'));
        }
        return($.inArray(method, methods) != -1);
    }

    $.widget = function (name, prototype) {
        var namespace = name.split(".")[0];
        name = name.split(".")[1];
        $.fn[name] = function (options) {
            var isMethodCall = (typeof options == 'string'), args = Array.prototype.slice.call(arguments, 1);
            if (isMethodCall && options.substring(0, 1) == '_') {
                return this;
            }
            if (isMethodCall && getter(namespace, name, options, args)) {
                var instance = $.data(this[0], name);
                return(instance ? instance[options].apply(instance, args) : undefined);
            }
            return this.each(function () {
                var instance = $.data(this, name);
                (!instance && !isMethodCall && $.data(this, name, new $[namespace][name](this, options))._init());
                (instance && isMethodCall && $.isFunction(instance[options]) && instance[options].apply(instance, args));
            });
        };
        $[namespace] = $[namespace] || {};
        $[namespace][name] = function (element, options) {
            var self = this;
            this.namespace = namespace;
            this.widgetName = name;
            this.widgetEventPrefix = $[namespace][name].eventPrefix || name;
            this.widgetBaseClass = namespace + '-' + name;
            this.options = $.extend({}, $.widget.defaults, $[namespace][name].defaults, $.metadata && $.metadata.get(element)[name], options);
            this.element = $(element).bind('setData.' + name,function (event, key, value) {
                if (event.target == element) {
                    return self._setData(key, value);
                }
            }).bind('getData.' + name,function (event, key) {
                if (event.target == element) {
                    return self._getData(key);
                }
            }).bind('remove', function () {
                return self.destroy();
            });
        };
        $[namespace][name].prototype = $.extend({}, $.widget.prototype, prototype);
        $[namespace][name].getterSetter = 'option';
    };
    $.widget.prototype = {_init: function () {
    }, destroy: function () {
        this.element.removeData(this.widgetName).removeClass(this.widgetBaseClass + '-disabled' + ' ' + this.namespace + '-state-disabled').removeAttr('aria-disabled');
    }, option: function (key, value) {
        var options = key, self = this;
        if (typeof key == "string") {
            if (value === undefined) {
                return this._getData(key);
            }
            options = {};
            options[key] = value;
        }
        $.each(options, function (key, value) {
            self._setData(key, value);
        });
    }, _getData: function (key) {
        return this.options[key];
    }, _setData: function (key, value) {
        this.options[key] = value;
        if (key == 'disabled') {
            this.element[value ? 'addClass' : 'removeClass'](this.widgetBaseClass + '-disabled' + ' ' + this.namespace + '-state-disabled').attr("aria-disabled", value);
        }
    }, enable: function () {
        this._setData('disabled', false);
    }, disable: function () {
        this._setData('disabled', true);
    }, _trigger: function (type, event, data) {
        var callback = this.options[type], eventName = (type == this.widgetEventPrefix ? type : this.widgetEventPrefix + type);
        event = $.Event(event);
        event.type = eventName;
        if (event.originalEvent) {
            for (var i = $.event.props.length, prop; i;) {
                prop = $.event.props[--i];
                event[prop] = event.originalEvent[prop];
            }
        }
        this.element.trigger(event, data);
        return!($.isFunction(callback) && callback.call(this.element[0], event, data) === false || event.isDefaultPrevented());
    }};
    $.widget.defaults = {disabled: false};
    $.ui.mouse = {_mouseInit: function () {
        var self = this;
        this.element.bind('mousedown.' + this.widgetName,function (event) {
            return self._mouseDown(event);
        }).bind('click.' + this.widgetName, function (event) {
            if (self._preventClickEvent) {
                self._preventClickEvent = false;
                event.stopImmediatePropagation();
                return false;
            }
        });
        if ($.browser.msie) {
            this._mouseUnselectable = this.element.attr('unselectable');
            this.element.attr('unselectable', 'on');
        }
        this.started = false;
    }, _mouseDestroy: function () {
        this.element.unbind('.' + this.widgetName);
        ($.browser.msie && this.element.attr('unselectable', this._mouseUnselectable));
    }, _mouseDown: function (event) {
        event.originalEvent = event.originalEvent || {};
        if (event.originalEvent.mouseHandled) {
            return;
        }
        (this._mouseStarted && this._mouseUp(event));
        this._mouseDownEvent = event;
        var self = this, btnIsLeft = (event.which == 1), elIsCancel = (typeof this.options.cancel == "string" ? $(event.target).parents().add(event.target).filter(this.options.cancel).length : false);
        if (!btnIsLeft || elIsCancel || !this._mouseCapture(event)) {
            return true;
        }
        this.mouseDelayMet = !this.options.delay;
        if (!this.mouseDelayMet) {
            this._mouseDelayTimer = setTimeout(function () {
                self.mouseDelayMet = true;
            }, this.options.delay);
        }
        if (this._mouseDistanceMet(event) && this._mouseDelayMet(event)) {
            this._mouseStarted = (this._mouseStart(event) !== false);
            if (!this._mouseStarted) {
                event.preventDefault();
                return true;
            }
        }
        this._mouseMoveDelegate = function (event) {
            return self._mouseMove(event);
        };
        this._mouseUpDelegate = function (event) {
            return self._mouseUp(event);
        };
        $(document).bind('mousemove.' + this.widgetName, this._mouseMoveDelegate).bind('mouseup.' + this.widgetName, this._mouseUpDelegate);
        ($.browser.safari || event.preventDefault());
        event.originalEvent.mouseHandled = true;
        return true;
    }, _mouseMove: function (event) {
        if ($.browser.msie && !event.button) {
            return this._mouseUp(event);
        }
        if (this._mouseStarted) {
            this._mouseDrag(event);
            return event.preventDefault();
        }
        if (this._mouseDistanceMet(event) && this._mouseDelayMet(event)) {
            this._mouseStarted = (this._mouseStart(this._mouseDownEvent, event) !== false);
            (this._mouseStarted ? this._mouseDrag(event) : this._mouseUp(event));
        }
        return!this._mouseStarted;
    }, _mouseUp: function (event) {
        $(document).unbind('mousemove.' + this.widgetName, this._mouseMoveDelegate).unbind('mouseup.' + this.widgetName, this._mouseUpDelegate);
        if (this._mouseStarted) {
            this._mouseStarted = false;
            this._preventClickEvent = (event.target == this._mouseDownEvent.target);
            this._mouseStop(event);
        }
        return false;
    }, _mouseDistanceMet: function (event) {
        return(Math.max(Math.abs(this._mouseDownEvent.pageX - event.pageX), Math.abs(this._mouseDownEvent.pageY - event.pageY)) >= this.options.distance);
    }, _mouseDelayMet: function (event) {
        return this.mouseDelayMet;
    }, _mouseStart: function (event) {
    }, _mouseDrag: function (event) {
    }, _mouseStop: function (event) {
    }, _mouseCapture: function (event) {
        return true;
    }};
    $.ui.mouse.defaults = {cancel: null, distance: 1, delay: 0};
})(jQuery);
(function ($) {
    var setDataSwitch = {dragStart: "start.draggable", drag: "drag.draggable", dragStop: "stop.draggable", maxHeight: "maxHeight.resizable", minHeight: "minHeight.resizable", maxWidth: "maxWidth.resizable", minWidth: "minWidth.resizable", resizeStart: "start.resizable", resize: "drag.resizable", resizeStop: "stop.resizable"}, uiDialogClasses = 'ui-dialog ' + 'ui-widget ' + 'ui-widget-content ' + 'ui-corner-all ';
    $.widget("ui.dialog", {_init: function () {
        this.originalTitle = this.element.attr('title');
        var self = this, options = this.options, title = options.title || this.originalTitle || ' ', titleId = $.ui.dialog.getTitleId(this.element), uiDialog = (this.uiDialog = $('<div/>')).appendTo(document.body).hide().addClass(uiDialogClasses + options.dialogClass).css({position: 'absolute', overflow: 'hidden', zIndex: options.zIndex}).attr('tabIndex', -1).css('outline', 0).keydown(function (event) {
            (options.closeOnEscape && event.keyCode && event.keyCode == $.ui.keyCode.ESCAPE && self.close(event));
        }).attr({role: 'dialog', 'aria-labelledby': titleId}).mousedown(function (event) {
            self.moveToTop(false, event);
        }), uiDialogContent = this.element.show().removeAttr('title').addClass('ui-dialog-content ' + 'ui-widget-content').appendTo(uiDialog), uiDialogTitlebar = (this.uiDialogTitlebar = $('<div></div>')).addClass('ui-dialog-titlebar ' + 'ui-widget-header ' + 'ui-corner-all ' + 'ui-helper-clearfix').prependTo(uiDialog), uiDialogTitlebarClose = $('<a href="#"/>').addClass('ui-dialog-titlebar-close ' + 'ui-corner-all').attr('role', 'button').hover(function () {
            uiDialogTitlebarClose.addClass('ui-state-hover');
        },function () {
            uiDialogTitlebarClose.removeClass('ui-state-hover');
        }).focus(function () {
            uiDialogTitlebarClose.addClass('ui-state-focus');
        }).blur(function () {
            uiDialogTitlebarClose.removeClass('ui-state-focus');
        }).mousedown(function (ev) {
            ev.stopPropagation();
        }).click(function (event) {
            self.close(event);
            return false;
        }).appendTo(uiDialogTitlebar), uiDialogTitlebarCloseText = (this.uiDialogTitlebarCloseText = $('<span/>')).addClass('ui-icon ' + 'ui-icon-closethick').text(options.closeText).appendTo(uiDialogTitlebarClose), uiDialogTitle = $('<span/>').addClass('ui-dialog-title').attr('id', titleId).html(title).prependTo(uiDialogTitlebar);
        uiDialogTitlebar.find("*").add(uiDialogTitlebar).disableSelection();
        (options.draggable && $.fn.draggable && this._makeDraggable());
        (options.resizable && $.fn.resizable && this._makeResizable());
        this._createButtons(options.buttons);
        this._isOpen = false;
        (options.bgiframe && $.fn.bgiframe && uiDialog.bgiframe());
        (options.autoOpen && this.open());
    }, destroy: function () {
        (this.overlay && this.overlay.destroy());
        this.uiDialog.hide();
        this.element.unbind('.dialog').removeData('dialog').removeClass('ui-dialog-content ui-widget-content').hide().appendTo('body');
        this.uiDialog.remove();
        (this.originalTitle && this.element.attr('title', this.originalTitle));
    }, close: function (event) {
        var self = this;
        if (false === self._trigger('beforeclose', event)) {
            return;
        }
        (self.overlay && self.overlay.destroy());
        self.uiDialog.unbind('keypress.ui-dialog');
        (self.options.hide ? self.uiDialog.hide(self.options.hide, function () {
            self._trigger('close', event);
        }) : self.uiDialog.hide() && self._trigger('close', event));
        $.ui.dialog.overlay.resize();
        self._isOpen = false;
        if (self.options.modal) {
            var maxZ = 0;
            $('.ui-dialog').each(function () {
                if (this != self.uiDialog[0]) {
                    maxZ = Math.max(maxZ, $(this).css('z-index'));
                }
            });
            $.ui.dialog.maxZ = maxZ;
        }
    }, isOpen: function () {
        return this._isOpen;
    }, moveToTop: function (force, event) {
        if ((this.options.modal && !force) || (!this.options.stack && !this.options.modal)) {
            return this._trigger('focus', event);
        }
        if (this.options.zIndex > $.ui.dialog.maxZ) {
            $.ui.dialog.maxZ = this.options.zIndex;
        }
        (this.overlay && this.overlay.$el.css('z-index', $.ui.dialog.overlay.maxZ = ++$.ui.dialog.maxZ));
        var saveScroll = {scrollTop: this.element.attr('scrollTop'), scrollLeft: this.element.attr('scrollLeft')};
        this.uiDialog.css('z-index', ++$.ui.dialog.maxZ);
        this.element.attr(saveScroll);
        this._trigger('focus', event);
    }, open: function () {
        if (this._isOpen) {
            return;
        }
        var options = this.options, uiDialog = this.uiDialog;
        this.overlay = options.modal ? new $.ui.dialog.overlay(this) : null;
        (uiDialog.next().length && uiDialog.appendTo('body'));
        this._size();
        this._position(options.position);
        uiDialog.show(options.show);
        this.moveToTop(true);
        (options.modal && uiDialog.bind('keypress.ui-dialog', function (event) {
            if (event.keyCode != $.ui.keyCode.TAB) {
                return;
            }
            var tabbables = $(':tabbable', this), first = tabbables.filter(':first')[0], last = tabbables.filter(':last')[0];
            if (event.target == last && !event.shiftKey) {
                setTimeout(function () {
                    first.focus();
                }, 1);
            } else if (event.target == first && event.shiftKey) {
                setTimeout(function () {
                    last.focus();
                }, 1);
            }
        }));
        $([]).add(uiDialog.find('.ui-dialog-content :tabbable:first')).add(uiDialog.find('.ui-dialog-buttonpane :tabbable:first')).add(uiDialog).filter(':first').focus();
        this._trigger('open');
        this._isOpen = true;
    }, _createButtons: function (buttons) {
        var self = this, hasButtons = false, uiDialogButtonPane = $('<div></div>').addClass('ui-dialog-buttonpane ' + 'ui-widget-content ' + 'ui-helper-clearfix');
        this.uiDialog.find('.ui-dialog-buttonpane').remove();
        (typeof buttons == 'object' && buttons !== null && $.each(buttons, function () {
            return!(hasButtons = true);
        }));
        if (hasButtons) {
            $.each(buttons, function (name, fn) {
                $('<button type="button"></button>').addClass('ui-state-default ' + 'ui-corner-all').text(name).click(function () {
                    fn.apply(self.element[0], arguments);
                }).hover(function () {
                    $(this).addClass('ui-state-hover');
                },function () {
                    $(this).removeClass('ui-state-hover');
                }).focus(function () {
                    $(this).addClass('ui-state-focus');
                }).blur(function () {
                    $(this).removeClass('ui-state-focus');
                }).appendTo(uiDialogButtonPane);
            });
            uiDialogButtonPane.appendTo(this.uiDialog);
        }
    }, _makeDraggable: function () {
        var self = this, options = this.options, heightBeforeDrag;
        this.uiDialog.draggable({cancel: '.ui-dialog-content', handle: '.ui-dialog-titlebar', containment: 'document', start: function () {
            heightBeforeDrag = options.height;
            $(this).height($(this).height()).addClass("ui-dialog-dragging");
            (options.dragStart && options.dragStart.apply(self.element[0], arguments));
        }, drag: function () {
            (options.drag && options.drag.apply(self.element[0], arguments));
        }, stop: function () {
            $(this).removeClass("ui-dialog-dragging").height(heightBeforeDrag);
            (options.dragStop && options.dragStop.apply(self.element[0], arguments));
            $.ui.dialog.overlay.resize();
        }});
    }, _makeResizable: function (handles) {
        handles = (handles === undefined ? this.options.resizable : handles);
        var self = this, options = this.options, resizeHandles = typeof handles == 'string' ? handles : 'n,e,s,w,se,sw,ne,nw';
        this.uiDialog.resizable({cancel: '.ui-dialog-content', alsoResize: this.element, maxWidth: options.maxWidth, maxHeight: options.maxHeight, minWidth: options.minWidth, minHeight: options.minHeight, start: function () {
            $(this).addClass("ui-dialog-resizing");
            (options.resizeStart && options.resizeStart.apply(self.element[0], arguments));
        }, resize: function () {
            (options.resize && options.resize.apply(self.element[0], arguments));
        }, handles: resizeHandles, stop: function () {
            $(this).removeClass("ui-dialog-resizing");
            options.height = $(this).height();
            options.width = $(this).width();
            (options.resizeStop && options.resizeStop.apply(self.element[0], arguments));
            $.ui.dialog.overlay.resize();
        }}).find('.ui-resizable-se').addClass('ui-icon ui-icon-grip-diagonal-se');
    }, _position: function (pos) {
        var wnd = $(window), doc = $(document), pTop = doc.scrollTop(), pLeft = doc.scrollLeft(), minTop = pTop;
        if ($.inArray(pos, ['center', 'top', 'right', 'bottom', 'left']) >= 0) {
            pos = [pos == 'right' || pos == 'left' ? pos : 'center', pos == 'top' || pos == 'bottom' ? pos : 'middle'];
        }
        if (pos.constructor != Array) {
            pos = ['center', 'middle'];
        }
        if (pos[0].constructor == Number) {
            pLeft += pos[0];
        } else {
            switch (pos[0]) {
                case'left':
                    pLeft += 0;
                    break;
                case'right':
                    pLeft += wnd.width() - this.uiDialog.outerWidth();
                    break;
                default:
                case'center':
                    pLeft += (wnd.width() - this.uiDialog.outerWidth()) / 2;
            }
        }
        if (pos[1].constructor == Number) {
            pTop += pos[1];
        } else {
            switch (pos[1]) {
                case'top':
                    pTop += 0;
                    break;
                case'bottom':
                    pTop += wnd.height() - this.uiDialog.outerHeight();
                    break;
                default:
                case'middle':
                    pTop += (wnd.height() - this.uiDialog.outerHeight()) / 2;
            }
        }
        pTop = Math.max(pTop, minTop);
        this.uiDialog.css({top: pTop, left: pLeft});
    }, _setData: function (key, value) {
        (setDataSwitch[key] && this.uiDialog.data(setDataSwitch[key], value));
        switch (key) {
            case"buttons":
                this._createButtons(value);
                break;
            case"closeText":
                this.uiDialogTitlebarCloseText.text(value);
                break;
            case"dialogClass":
                this.uiDialog.removeClass(this.options.dialogClass).addClass(uiDialogClasses + value);
                break;
            case"draggable":
                (value ? this._makeDraggable() : this.uiDialog.draggable('destroy'));
                break;
            case"height":
                this.uiDialog.height(value);
                break;
            case"position":
                this._position(value);
                break;
            case"resizable":
                var uiDialog = this.uiDialog, isResizable = this.uiDialog.is(':data(resizable)');
                (isResizable && !value && uiDialog.resizable('destroy'));
                (isResizable && typeof value == 'string' && uiDialog.resizable('option', 'handles', value));
                (isResizable || this._makeResizable(value));
                break;
            case"title":
                $(".ui-dialog-title", this.uiDialogTitlebar).html(value || ' ');
                break;
            case"width":
                this.uiDialog.width(value);
                break;
        }
        $.widget.prototype._setData.apply(this, arguments);
    }, _size: function () {
        var options = this.options;
        this.element.css({height: 0, minHeight: 0, width: 'auto'});
        var nonContentHeight = this.uiDialog.css({height: 'auto', width: options.width}).height();
        this.element.css({minHeight: Math.max(options.minHeight - nonContentHeight, 0), height: options.height == 'auto' ? 'auto' : Math.max(options.height - nonContentHeight, 0)});
    }});
    $.extend($.ui.dialog, {version: "1.7.2", defaults: {autoOpen: true, bgiframe: false, buttons: {}, closeOnEscape: true, closeText: 'close', dialogClass: '', draggable: true, hide: null, height: 'auto', maxHeight: false, maxWidth: false, minHeight: 150, minWidth: 150, modal: false, position: 'center', resizable: true, show: null, stack: true, title: '', width: 300, zIndex: 1000}, getter: 'isOpen', uuid: 0, maxZ: 0, getTitleId: function ($el) {
        return'ui-dialog-title-' + ($el.attr('id') || ++this.uuid);
    }, overlay: function (dialog) {
        this.$el = $.ui.dialog.overlay.create(dialog);
    }});
    $.extend($.ui.dialog.overlay, {instances: [], maxZ: 0, events: $.map('focus,mousedown,mouseup,keydown,keypress,click'.split(','),function (event) {
        return event + '.dialog-overlay';
    }).join(' '), create: function (dialog) {
        if (this.instances.length === 0) {
            setTimeout(function () {
                if ($.ui.dialog.overlay.instances.length) {
                    $(document).bind($.ui.dialog.overlay.events, function (event) {
                        var dialogZ = $(event.target).parents('.ui-dialog').css('zIndex') || 0;
                        return(dialogZ > $.ui.dialog.overlay.maxZ);
                    });
                }
            }, 1);
            $(document).bind('keydown.dialog-overlay', function (event) {
                (dialog.options.closeOnEscape && event.keyCode && event.keyCode == $.ui.keyCode.ESCAPE && dialog.close(event));
            });
            $(window).bind('resize.dialog-overlay', $.ui.dialog.overlay.resize);
        }
        var $el = $('<div></div>').appendTo(document.body).addClass('ui-widget-overlay').css({width: this.width(), height: this.height()});
        (dialog.options.bgiframe && $.fn.bgiframe && $el.bgiframe());
        this.instances.push($el);
        return $el;
    }, destroy: function ($el) {
        this.instances.splice($.inArray(this.instances, $el), 1);
        if (this.instances.length === 0) {
            $([document, window]).unbind('.dialog-overlay');
        }
        $el.remove();
        var maxZ = 0;
        $.each(this.instances, function () {
            maxZ = Math.max(maxZ, this.css('z-index'));
        });
        this.maxZ = maxZ;
    }, height: function () {
        if ($.browser.msie && $.browser.version < 7) {
            var scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
            var offsetHeight = Math.max(document.documentElement.offsetHeight, document.body.offsetHeight);
            if (scrollHeight < offsetHeight) {
                return $(window).height() + 'px';
            } else {
                return scrollHeight + 'px';
            }
        } else {
            return $(document).height() + 'px';
        }
    }, width: function () {
        if ($.browser.msie && $.browser.version < 7) {
            var scrollWidth = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth);
            var offsetWidth = Math.max(document.documentElement.offsetWidth, document.body.offsetWidth);
            if (scrollWidth < offsetWidth) {
                return $(window).width() + 'px';
            } else {
                return scrollWidth + 'px';
            }
        } else {
            return $(document).width() + 'px';
        }
    }, resize: function () {
        var $overlays = $([]);
        $.each($.ui.dialog.overlay.instances, function () {
            $overlays = $overlays.add(this);
        });
        $overlays.css({width: 0, height: 0}).css({width: $.ui.dialog.overlay.width(), height: $.ui.dialog.overlay.height()});
    }});
    $.extend($.ui.dialog.overlay.prototype, {destroy: function () {
        $.ui.dialog.overlay.destroy(this.$el);
    }});
})(jQuery);
(function ($) {
    var setDataSwitch = {dragStart: "start.draggable", drag: "drag.draggable", dragStop: "stop.draggable", maxHeight: "maxHeight.resizable", minHeight: "minHeight.resizable", maxWidth: "maxWidth.resizable", minWidth: "minWidth.resizable", resizeStart: "start.resizable", resize: "drag.resizable", resizeStop: "stop.resizable"}, uiDialogClasses = 'ui-dialog ' + 'ui-widget ' + 'ui-widget-content ' + 'ui-corner-all ';
    $.widget("ui.dialog", {_init: function () {
        this.originalTitle = this.element.attr('title');
        var self = this, options = this.options, title = options.title || this.originalTitle || ' ', titleId = $.ui.dialog.getTitleId(this.element), uiDialog = (this.uiDialog = $('<div/>')).appendTo(document.body).hide().addClass(uiDialogClasses + options.dialogClass).css({position: 'absolute', overflow: 'hidden', zIndex: options.zIndex}).attr('tabIndex', -1).css('outline', 0).keydown(function (event) {
            (options.closeOnEscape && event.keyCode && event.keyCode == $.ui.keyCode.ESCAPE && self.close(event));
        }).attr({role: 'dialog', 'aria-labelledby': titleId}).mousedown(function (event) {
            self.moveToTop(false, event);
        }), uiDialogContent = this.element.show().removeAttr('title').addClass('ui-dialog-content ' + 'ui-widget-content').appendTo(uiDialog), uiDialogTitlebar = (this.uiDialogTitlebar = $('<div></div>')).addClass('ui-dialog-titlebar ' + 'ui-widget-header ' + 'ui-corner-all ' + 'ui-helper-clearfix').prependTo(uiDialog), uiDialogTitlebarClose = $('<a href="#"/>').addClass('ui-dialog-titlebar-close ' + 'ui-corner-all').attr('role', 'button').hover(function () {
            uiDialogTitlebarClose.addClass('ui-state-hover');
        },function () {
            uiDialogTitlebarClose.removeClass('ui-state-hover');
        }).focus(function () {
            uiDialogTitlebarClose.addClass('ui-state-focus');
        }).blur(function () {
            uiDialogTitlebarClose.removeClass('ui-state-focus');
        }).mousedown(function (ev) {
            ev.stopPropagation();
        }).click(function (event) {
            self.close(event);
            return false;
        }).appendTo(uiDialogTitlebar), uiDialogTitlebarCloseText = (this.uiDialogTitlebarCloseText = $('<span/>')).addClass('ui-icon ' + 'ui-icon-closethick').text(options.closeText).appendTo(uiDialogTitlebarClose), uiDialogTitle = $('<span/>').addClass('ui-dialog-title').attr('id', titleId).html(title).prependTo(uiDialogTitlebar);
        uiDialogTitlebar.find("*").add(uiDialogTitlebar).disableSelection();
        (options.draggable && $.fn.draggable && this._makeDraggable());
        (options.resizable && $.fn.resizable && this._makeResizable());
        this._createButtons(options.buttons);
        this._isOpen = false;
        (options.bgiframe && $.fn.bgiframe && uiDialog.bgiframe());
        (options.autoOpen && this.open());
    }, destroy: function () {
        (this.overlay && this.overlay.destroy());
        this.uiDialog.hide();
        this.element.unbind('.dialog').removeData('dialog').removeClass('ui-dialog-content ui-widget-content').hide().appendTo('body');
        this.uiDialog.remove();
        (this.originalTitle && this.element.attr('title', this.originalTitle));
    }, close: function (event) {
        var self = this;
        if (false === self._trigger('beforeclose', event)) {
            return;
        }
        (self.overlay && self.overlay.destroy());
        self.uiDialog.unbind('keypress.ui-dialog');
        (self.options.hide ? self.uiDialog.hide(self.options.hide, function () {
            self._trigger('close', event);
        }) : self.uiDialog.hide() && self._trigger('close', event));
        $.ui.dialog.overlay.resize();
        self._isOpen = false;
        if (self.options.modal) {
            var maxZ = 0;
            $('.ui-dialog').each(function () {
                if (this != self.uiDialog[0]) {
                    maxZ = Math.max(maxZ, $(this).css('z-index'));
                }
            });
            $.ui.dialog.maxZ = maxZ;
        }
    }, isOpen: function () {
        return this._isOpen;
    }, moveToTop: function (force, event) {
        if ((this.options.modal && !force) || (!this.options.stack && !this.options.modal)) {
            return this._trigger('focus', event);
        }
        if (this.options.zIndex > $.ui.dialog.maxZ) {
            $.ui.dialog.maxZ = this.options.zIndex;
        }
        (this.overlay && this.overlay.$el.css('z-index', $.ui.dialog.overlay.maxZ = ++$.ui.dialog.maxZ));
        var saveScroll = {scrollTop: this.element.attr('scrollTop'), scrollLeft: this.element.attr('scrollLeft')};
        this.uiDialog.css('z-index', ++$.ui.dialog.maxZ);
        this.element.attr(saveScroll);
        this._trigger('focus', event);
    }, open: function () {
        if (this._isOpen) {
            return;
        }
        var options = this.options, uiDialog = this.uiDialog;
        this.overlay = options.modal ? new $.ui.dialog.overlay(this) : null;
        (uiDialog.next().length && uiDialog.appendTo('body'));
        this._size();
        this._position(options.position);
        uiDialog.show(options.show);
        this.moveToTop(true);
        (options.modal && uiDialog.bind('keypress.ui-dialog', function (event) {
            if (event.keyCode != $.ui.keyCode.TAB) {
                return;
            }
            var tabbables = $(':tabbable', this), first = tabbables.filter(':first')[0], last = tabbables.filter(':last')[0];
            if (event.target == last && !event.shiftKey) {
                setTimeout(function () {
                    first.focus();
                }, 1);
            } else if (event.target == first && event.shiftKey) {
                setTimeout(function () {
                    last.focus();
                }, 1);
            }
        }));
        $([]).add(uiDialog.find('.ui-dialog-content :tabbable:first')).add(uiDialog.find('.ui-dialog-buttonpane :tabbable:first')).add(uiDialog).filter(':first').focus();
        this._trigger('open');
        this._isOpen = true;
    }, _createButtons: function (buttons) {
        var self = this, hasButtons = false, uiDialogButtonPane = $('<div></div>').addClass('ui-dialog-buttonpane ' + 'ui-widget-content ' + 'ui-helper-clearfix');
        this.uiDialog.find('.ui-dialog-buttonpane').remove();
        (typeof buttons == 'object' && buttons !== null && $.each(buttons, function () {
            return!(hasButtons = true);
        }));
        if (hasButtons) {
            $.each(buttons, function (name, fn) {
                $('<button type="button"></button>').addClass('ui-state-default ' + 'ui-corner-all').text(name).click(function () {
                    fn.apply(self.element[0], arguments);
                }).hover(function () {
                    $(this).addClass('ui-state-hover');
                },function () {
                    $(this).removeClass('ui-state-hover');
                }).focus(function () {
                    $(this).addClass('ui-state-focus');
                }).blur(function () {
                    $(this).removeClass('ui-state-focus');
                }).appendTo(uiDialogButtonPane);
            });
            uiDialogButtonPane.appendTo(this.uiDialog);
        }
    }, _makeDraggable: function () {
        var self = this, options = this.options, heightBeforeDrag;
        this.uiDialog.draggable({cancel: '.ui-dialog-content', handle: '.ui-dialog-titlebar', containment: 'document', start: function () {
            heightBeforeDrag = options.height;
            $(this).height($(this).height()).addClass("ui-dialog-dragging");
            (options.dragStart && options.dragStart.apply(self.element[0], arguments));
        }, drag: function () {
            (options.drag && options.drag.apply(self.element[0], arguments));
        }, stop: function () {
            $(this).removeClass("ui-dialog-dragging").height(heightBeforeDrag);
            (options.dragStop && options.dragStop.apply(self.element[0], arguments));
            $.ui.dialog.overlay.resize();
        }});
    }, _makeResizable: function (handles) {
        handles = (handles === undefined ? this.options.resizable : handles);
        var self = this, options = this.options, resizeHandles = typeof handles == 'string' ? handles : 'n,e,s,w,se,sw,ne,nw';
        this.uiDialog.resizable({cancel: '.ui-dialog-content', alsoResize: this.element, maxWidth: options.maxWidth, maxHeight: options.maxHeight, minWidth: options.minWidth, minHeight: options.minHeight, start: function () {
            $(this).addClass("ui-dialog-resizing");
            (options.resizeStart && options.resizeStart.apply(self.element[0], arguments));
        }, resize: function () {
            (options.resize && options.resize.apply(self.element[0], arguments));
        }, handles: resizeHandles, stop: function () {
            $(this).removeClass("ui-dialog-resizing");
            options.height = $(this).height();
            options.width = $(this).width();
            (options.resizeStop && options.resizeStop.apply(self.element[0], arguments));
            $.ui.dialog.overlay.resize();
        }}).find('.ui-resizable-se').addClass('ui-icon ui-icon-grip-diagonal-se');
    }, _position: function (pos) {
        var wnd = $(window), doc = $(document), pTop = doc.scrollTop(), pLeft = doc.scrollLeft(), minTop = pTop;
        if ($.inArray(pos, ['center', 'top', 'right', 'bottom', 'left']) >= 0) {
            pos = [pos == 'right' || pos == 'left' ? pos : 'center', pos == 'top' || pos == 'bottom' ? pos : 'middle'];
        }
        if (pos.constructor != Array) {
            pos = ['center', 'middle'];
        }
        if (pos[0].constructor == Number) {
            pLeft += pos[0];
        } else {
            switch (pos[0]) {
                case'left':
                    pLeft += 0;
                    break;
                case'right':
                    pLeft += wnd.width() - this.uiDialog.outerWidth();
                    break;
                default:
                case'center':
                    pLeft += (wnd.width() - this.uiDialog.outerWidth()) / 2;
            }
        }
        if (pos[1].constructor == Number) {
            pTop += pos[1];
        } else {
            switch (pos[1]) {
                case'top':
                    pTop += 0;
                    break;
                case'bottom':
                    pTop += wnd.height() - this.uiDialog.outerHeight();
                    break;
                default:
                case'middle':
                    pTop += (wnd.height() - this.uiDialog.outerHeight()) / 2;
            }
        }
        pTop = Math.max(pTop, minTop);
        this.uiDialog.css({top: pTop, left: pLeft});
    }, _setData: function (key, value) {
        (setDataSwitch[key] && this.uiDialog.data(setDataSwitch[key], value));
        switch (key) {
            case"buttons":
                this._createButtons(value);
                break;
            case"closeText":
                this.uiDialogTitlebarCloseText.text(value);
                break;
            case"dialogClass":
                this.uiDialog.removeClass(this.options.dialogClass).addClass(uiDialogClasses + value);
                break;
            case"draggable":
                (value ? this._makeDraggable() : this.uiDialog.draggable('destroy'));
                break;
            case"height":
                this.uiDialog.height(value);
                break;
            case"position":
                this._position(value);
                break;
            case"resizable":
                var uiDialog = this.uiDialog, isResizable = this.uiDialog.is(':data(resizable)');
                (isResizable && !value && uiDialog.resizable('destroy'));
                (isResizable && typeof value == 'string' && uiDialog.resizable('option', 'handles', value));
                (isResizable || this._makeResizable(value));
                break;
            case"title":
                $(".ui-dialog-title", this.uiDialogTitlebar).html(value || ' ');
                break;
            case"width":
                this.uiDialog.width(value);
                break;
        }
        $.widget.prototype._setData.apply(this, arguments);
    }, _size: function () {
        var options = this.options;
        this.element.css({height: 0, minHeight: 0, width: 'auto'});
        var nonContentHeight = this.uiDialog.css({height: 'auto', width: options.width}).height();
        this.element.css({minHeight: Math.max(options.minHeight - nonContentHeight, 0), height: options.height == 'auto' ? 'auto' : Math.max(options.height - nonContentHeight, 0)});
    }});
    $.extend($.ui.dialog, {version: "1.7.2", defaults: {autoOpen: true, bgiframe: false, buttons: {}, closeOnEscape: true, closeText: 'close', dialogClass: '', draggable: true, hide: null, height: 'auto', maxHeight: false, maxWidth: false, minHeight: 150, minWidth: 150, modal: false, position: 'center', resizable: true, show: null, stack: true, title: '', width: 300, zIndex: 1000}, getter: 'isOpen', uuid: 0, maxZ: 0, getTitleId: function ($el) {
        return'ui-dialog-title-' + ($el.attr('id') || ++this.uuid);
    }, overlay: function (dialog) {
        this.$el = $.ui.dialog.overlay.create(dialog);
    }});
    $.extend($.ui.dialog.overlay, {instances: [], maxZ: 0, events: $.map('focus,mousedown,mouseup,keydown,keypress,click'.split(','),function (event) {
        return event + '.dialog-overlay';
    }).join(' '), create: function (dialog) {
        if (this.instances.length === 0) {
            setTimeout(function () {
                if ($.ui.dialog.overlay.instances.length) {
                    $(document).bind($.ui.dialog.overlay.events, function (event) {
                        var dialogZ = $(event.target).parents('.ui-dialog').css('zIndex') || 0;
                        return(dialogZ > $.ui.dialog.overlay.maxZ);
                    });
                }
            }, 1);
            $(document).bind('keydown.dialog-overlay', function (event) {
                (dialog.options.closeOnEscape && event.keyCode && event.keyCode == $.ui.keyCode.ESCAPE && dialog.close(event));
            });
            $(window).bind('resize.dialog-overlay', $.ui.dialog.overlay.resize);
        }
        var $el = $('<div></div>').appendTo(document.body).addClass('ui-widget-overlay').css({width: this.width(), height: this.height()});
        (dialog.options.bgiframe && $.fn.bgiframe && $el.bgiframe());
        this.instances.push($el);
        return $el;
    }, destroy: function ($el) {
        this.instances.splice($.inArray(this.instances, $el), 1);
        if (this.instances.length === 0) {
            $([document, window]).unbind('.dialog-overlay');
        }
        $el.remove();
        var maxZ = 0;
        $.each(this.instances, function () {
            maxZ = Math.max(maxZ, this.css('z-index'));
        });
        this.maxZ = maxZ;
    }, height: function () {
        if ($.browser.msie && $.browser.version < 7) {
            var scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
            var offsetHeight = Math.max(document.documentElement.offsetHeight, document.body.offsetHeight);
            if (scrollHeight < offsetHeight) {
                return $(window).height() + 'px';
            } else {
                return scrollHeight + 'px';
            }
        } else {
            return $(document).height() + 'px';
        }
    }, width: function () {
        if ($.browser.msie && $.browser.version < 7) {
            var scrollWidth = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth);
            var offsetWidth = Math.max(document.documentElement.offsetWidth, document.body.offsetWidth);
            if (scrollWidth < offsetWidth) {
                return $(window).width() + 'px';
            } else {
                return scrollWidth + 'px';
            }
        } else {
            return $(document).width() + 'px';
        }
    }, resize: function () {
        var $overlays = $([]);
        $.each($.ui.dialog.overlay.instances, function () {
            $overlays = $overlays.add(this);
        });
        $overlays.css({width: 0, height: 0}).css({width: $.ui.dialog.overlay.width(), height: $.ui.dialog.overlay.height()});
    }});
    $.extend($.ui.dialog.overlay.prototype, {destroy: function () {
        $.ui.dialog.overlay.destroy(this.$el);
    }});
})(jQuery);
(function ($) {
    $.widget("ui.draggable", $.extend({}, $.ui.mouse, {_init: function () {
        if (this.options.helper == 'original' && !(/^(?:r|a|f)/).test(this.element.css("position")))
            this.element[0].style.position = 'relative';
        (this.options.addClasses && this.element.addClass("ui-draggable"));
        (this.options.disabled && this.element.addClass("ui-draggable-disabled"));
        this._mouseInit();
    }, destroy: function () {
        if (!this.element.data('draggable'))return;
        this.element.removeData("draggable").unbind(".draggable").removeClass("ui-draggable" + " ui-draggable-dragging" + " ui-draggable-disabled");
        this._mouseDestroy();
    }, _mouseCapture: function (event) {
        var o = this.options;
        if (this.helper || o.disabled || $(event.target).is('.ui-resizable-handle'))
            return false;
        this.handle = this._getHandle(event);
        if (!this.handle)
            return false;
        return true;
    }, _mouseStart: function (event) {
        var o = this.options;
        this.helper = this._createHelper(event);
        this._cacheHelperProportions();
        if ($.ui.ddmanager)
            $.ui.ddmanager.current = this;
        this._cacheMargins();
        this.cssPosition = this.helper.css("position");
        this.scrollParent = this.helper.scrollParent();
        this.offset = this.element.offset();
        this.offset = {top: this.offset.top - this.margins.top, left: this.offset.left - this.margins.left};
        $.extend(this.offset, {click: {left: event.pageX - this.offset.left, top: event.pageY - this.offset.top}, parent: this._getParentOffset(), relative: this._getRelativeOffset()});
        this.originalPosition = this._generatePosition(event);
        this.originalPageX = event.pageX;
        this.originalPageY = event.pageY;
        if (o.cursorAt)
            this._adjustOffsetFromHelper(o.cursorAt);
        if (o.containment)
            this._setContainment();
        this._trigger("start", event);
        this._cacheHelperProportions();
        if ($.ui.ddmanager && !o.dropBehaviour)
            $.ui.ddmanager.prepareOffsets(this, event);
        this.helper.addClass("ui-draggable-dragging");
        this._mouseDrag(event, true);
        return true;
    }, _mouseDrag: function (event, noPropagation) {
        this.position = this._generatePosition(event);
        this.positionAbs = this._convertPositionTo("absolute");
        if (!noPropagation) {
            var ui = this._uiHash();
            this._trigger('drag', event, ui);
            this.position = ui.position;
        }
        if (!this.options.axis || this.options.axis != "y")this.helper[0].style.left = this.position.left + 'px';
        if (!this.options.axis || this.options.axis != "x")this.helper[0].style.top = this.position.top + 'px';
        if ($.ui.ddmanager)$.ui.ddmanager.drag(this, event);
        return false;
    }, _mouseStop: function (event) {
        var dropped = false;
        if ($.ui.ddmanager && !this.options.dropBehaviour)
            dropped = $.ui.ddmanager.drop(this, event);
        if (this.dropped) {
            dropped = this.dropped;
            this.dropped = false;
        }
        if ((this.options.revert == "invalid" && !dropped) || (this.options.revert == "valid" && dropped) || this.options.revert === true || ($.isFunction(this.options.revert) && this.options.revert.call(this.element, dropped))) {
            var self = this;
            $(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function () {
                self._trigger("stop", event);
                self._clear();
            });
        } else {
            this._trigger("stop", event);
            this._clear();
        }
        return false;
    }, _getHandle: function (event) {
        var handle = !this.options.handle || !$(this.options.handle, this.element).length ? true : false;
        $(this.options.handle, this.element).find("*").andSelf().each(function () {
            if (this == event.target)handle = true;
        });
        return handle;
    }, _createHelper: function (event) {
        var o = this.options;
        var helper = $.isFunction(o.helper) ? $(o.helper.apply(this.element[0], [event])) : (o.helper == 'clone' ? this.element.clone() : this.element);
        if (!helper.parents('body').length)
            helper.appendTo((o.appendTo == 'parent' ? this.element[0].parentNode : o.appendTo));
        if (helper[0] != this.element[0] && !(/(fixed|absolute)/).test(helper.css("position")))
            helper.css("position", "absolute");
        return helper;
    }, _adjustOffsetFromHelper: function (obj) {
        if (obj.left != undefined)this.offset.click.left = obj.left + this.margins.left;
        if (obj.right != undefined)this.offset.click.left = this.helperProportions.width - obj.right + this.margins.left;
        if (obj.top != undefined)this.offset.click.top = obj.top + this.margins.top;
        if (obj.bottom != undefined)this.offset.click.top = this.helperProportions.height - obj.bottom + this.margins.top;
    }, _getParentOffset: function () {
        this.offsetParent = this.helper.offsetParent();
        var po = this.offsetParent.offset();
        if (this.cssPosition == 'absolute' && this.scrollParent[0] != document && $.ui.contains(this.scrollParent[0], this.offsetParent[0])) {
            po.left += this.scrollParent.scrollLeft();
            po.top += this.scrollParent.scrollTop();
        }
        if ((this.offsetParent[0] == document.body) || (this.offsetParent[0].tagName && this.offsetParent[0].tagName.toLowerCase() == 'html' && $.browser.msie))
            po = {top: 0, left: 0};
        return{top: po.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0), left: po.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)};
    }, _getRelativeOffset: function () {
        if (this.cssPosition == "relative") {
            var p = this.element.position();
            return{top: p.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(), left: p.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()};
        } else {
            return{top: 0, left: 0};
        }
    }, _cacheMargins: function () {
        this.margins = {left: (parseInt(this.element.css("marginLeft"), 10) || 0), top: (parseInt(this.element.css("marginTop"), 10) || 0)};
    }, _cacheHelperProportions: function () {
        this.helperProportions = {width: this.helper.outerWidth(), height: this.helper.outerHeight()};
    }, _setContainment: function () {
        var o = this.options;
        if (o.containment == 'parent')o.containment = this.helper[0].parentNode;
        if (o.containment == 'document' || o.containment == 'window')this.containment = [0 - this.offset.relative.left - this.offset.parent.left, 0 - this.offset.relative.top - this.offset.parent.top, $(o.containment == 'document' ? document : window).width() - this.helperProportions.width - this.margins.left, ($(o.containment == 'document' ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top];
        if (!(/^(document|window|parent)$/).test(o.containment) && o.containment.constructor != Array) {
            var ce = $(o.containment)[0];
            if (!ce)return;
            var co = $(o.containment).offset();
            var over = ($(ce).css("overflow") != 'hidden');
            this.containment = [co.left + (parseInt($(ce).css("borderLeftWidth"), 10) || 0) + (parseInt($(ce).css("paddingLeft"), 10) || 0) - this.margins.left, co.top + (parseInt($(ce).css("borderTopWidth"), 10) || 0) + (parseInt($(ce).css("paddingTop"), 10) || 0) - this.margins.top, co.left + (over ? Math.max(ce.scrollWidth, ce.offsetWidth) : ce.offsetWidth) - (parseInt($(ce).css("borderLeftWidth"), 10) || 0) - (parseInt($(ce).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left, co.top + (over ? Math.max(ce.scrollHeight, ce.offsetHeight) : ce.offsetHeight) - (parseInt($(ce).css("borderTopWidth"), 10) || 0) - (parseInt($(ce).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top];
        } else if (o.containment.constructor == Array) {
            this.containment = o.containment;
        }
    }, _convertPositionTo: function (d, pos) {
        if (!pos)pos = this.position;
        var mod = d == "absolute" ? 1 : -1;
        var o = this.options, scroll = this.cssPosition == 'absolute' && !(this.scrollParent[0] != document && $.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent, scrollIsRootNode = (/(html|body)/i).test(scroll[0].tagName);
        return{top: (pos.top + this.offset.relative.top * mod + this.offset.parent.top * mod - ($.browser.safari && this.cssPosition == 'fixed' ? 0 : (this.cssPosition == 'fixed' ? -this.scrollParent.scrollTop() : (scrollIsRootNode ? 0 : scroll.scrollTop())) * mod)), left: (pos.left + this.offset.relative.left * mod + this.offset.parent.left * mod - ($.browser.safari && this.cssPosition == 'fixed' ? 0 : (this.cssPosition == 'fixed' ? -this.scrollParent.scrollLeft() : scrollIsRootNode ? 0 : scroll.scrollLeft()) * mod))};
    }, _generatePosition: function (event) {
        var o = this.options, scroll = this.cssPosition == 'absolute' && !(this.scrollParent[0] != document && $.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent, scrollIsRootNode = (/(html|body)/i).test(scroll[0].tagName);
        if (this.cssPosition == 'relative' && !(this.scrollParent[0] != document && this.scrollParent[0] != this.offsetParent[0])) {
            this.offset.relative = this._getRelativeOffset();
        }
        var pageX = event.pageX;
        var pageY = event.pageY;
        if (this.originalPosition) {
            if (this.containment) {
                if (event.pageX - this.offset.click.left < this.containment[0])pageX = this.containment[0] + this.offset.click.left;
                if (event.pageY - this.offset.click.top < this.containment[1])pageY = this.containment[1] + this.offset.click.top;
                if (event.pageX - this.offset.click.left > this.containment[2])pageX = this.containment[2] + this.offset.click.left;
                if (event.pageY - this.offset.click.top > this.containment[3])pageY = this.containment[3] + this.offset.click.top;
            }
            if (o.grid) {
                var top = this.originalPageY + Math.round((pageY - this.originalPageY) / o.grid[1]) * o.grid[1];
                pageY = this.containment ? (!(top - this.offset.click.top < this.containment[1] || top - this.offset.click.top > this.containment[3]) ? top : (!(top - this.offset.click.top < this.containment[1]) ? top - o.grid[1] : top + o.grid[1])) : top;
                var left = this.originalPageX + Math.round((pageX - this.originalPageX) / o.grid[0]) * o.grid[0];
                pageX = this.containment ? (!(left - this.offset.click.left < this.containment[0] || left - this.offset.click.left > this.containment[2]) ? left : (!(left - this.offset.click.left < this.containment[0]) ? left - o.grid[0] : left + o.grid[0])) : left;
            }
        }
        return{top: (pageY - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ($.browser.safari && this.cssPosition == 'fixed' ? 0 : (this.cssPosition == 'fixed' ? -this.scrollParent.scrollTop() : (scrollIsRootNode ? 0 : scroll.scrollTop())))), left: (pageX - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ($.browser.safari && this.cssPosition == 'fixed' ? 0 : (this.cssPosition == 'fixed' ? -this.scrollParent.scrollLeft() : scrollIsRootNode ? 0 : scroll.scrollLeft())))};
    }, _clear: function () {
        this.helper.removeClass("ui-draggable-dragging");
        if (this.helper[0] != this.element[0] && !this.cancelHelperRemoval)this.helper.remove();
        this.helper = null;
        this.cancelHelperRemoval = false;
    }, _trigger: function (type, event, ui) {
        ui = ui || this._uiHash();
        $.ui.plugin.call(this, type, [event, ui]);
        if (type == "drag")this.positionAbs = this._convertPositionTo("absolute");
        return $.widget.prototype._trigger.call(this, type, event, ui);
    }, plugins: {}, _uiHash: function (event) {
        return{helper: this.helper, position: this.position, absolutePosition: this.positionAbs, offset: this.positionAbs};
    }}));
    $.extend($.ui.draggable, {version: "1.7.2", eventPrefix: "drag", defaults: {addClasses: true, appendTo: "parent", axis: false, cancel: ":input,option", connectToSortable: false, containment: false, cursor: "auto", cursorAt: false, delay: 0, distance: 1, grid: false, handle: false, helper: "original", iframeFix: false, opacity: false, refreshPositions: false, revert: false, revertDuration: 500, scope: "default", scroll: true, scrollSensitivity: 20, scrollSpeed: 20, snap: false, snapMode: "both", snapTolerance: 20, stack: false, zIndex: false}});
    $.ui.plugin.add("draggable", "connectToSortable", {start: function (event, ui) {
        var inst = $(this).data("draggable"), o = inst.options, uiSortable = $.extend({}, ui, {item: inst.element});
        inst.sortables = [];
        $(o.connectToSortable).each(function () {
            var sortable = $.data(this, 'sortable');
            if (sortable && !sortable.options.disabled) {
                inst.sortables.push({instance: sortable, shouldRevert: sortable.options.revert});
                sortable._refreshItems();
                sortable._trigger("activate", event, uiSortable);
            }
        });
    }, stop: function (event, ui) {
        var inst = $(this).data("draggable"), uiSortable = $.extend({}, ui, {item: inst.element});
        $.each(inst.sortables, function () {
            if (this.instance.isOver) {
                this.instance.isOver = 0;
                inst.cancelHelperRemoval = true;
                this.instance.cancelHelperRemoval = false;
                if (this.shouldRevert)this.instance.options.revert = true;
                this.instance._mouseStop(event);
                this.instance.options.helper = this.instance.options._helper;
                if (inst.options.helper == 'original')
                    this.instance.currentItem.css({top: 'auto', left: 'auto'});
            } else {
                this.instance.cancelHelperRemoval = false;
                this.instance._trigger("deactivate", event, uiSortable);
            }
        });
    }, drag: function (event, ui) {
        var inst = $(this).data("draggable"), self = this;
        var checkPos = function (o) {
            var dyClick = this.offset.click.top, dxClick = this.offset.click.left;
            var helperTop = this.positionAbs.top, helperLeft = this.positionAbs.left;
            var itemHeight = o.height, itemWidth = o.width;
            var itemTop = o.top, itemLeft = o.left;
            return $.ui.isOver(helperTop + dyClick, helperLeft + dxClick, itemTop, itemLeft, itemHeight, itemWidth);
        };
        $.each(inst.sortables, function (i) {
            this.instance.positionAbs = inst.positionAbs;
            this.instance.helperProportions = inst.helperProportions;
            this.instance.offset.click = inst.offset.click;
            if (this.instance._intersectsWith(this.instance.containerCache)) {
                if (!this.instance.isOver) {
                    this.instance.isOver = 1;
                    this.instance.currentItem = $(self).clone().appendTo(this.instance.element).data("sortable-item", true);
                    this.instance.options._helper = this.instance.options.helper;
                    this.instance.options.helper = function () {
                        return ui.helper[0];
                    };
                    event.target = this.instance.currentItem[0];
                    this.instance._mouseCapture(event, true);
                    this.instance._mouseStart(event, true, true);
                    this.instance.offset.click.top = inst.offset.click.top;
                    this.instance.offset.click.left = inst.offset.click.left;
                    this.instance.offset.parent.left -= inst.offset.parent.left - this.instance.offset.parent.left;
                    this.instance.offset.parent.top -= inst.offset.parent.top - this.instance.offset.parent.top;
                    inst._trigger("toSortable", event);
                    inst.dropped = this.instance.element;
                    inst.currentItem = inst.element;
                    this.instance.fromOutside = inst;
                }
                if (this.instance.currentItem)this.instance._mouseDrag(event);
            } else {
                if (this.instance.isOver) {
                    this.instance.isOver = 0;
                    this.instance.cancelHelperRemoval = true;
                    this.instance.options.revert = false;
                    this.instance._trigger('out', event, this.instance._uiHash(this.instance));
                    this.instance._mouseStop(event, true);
                    this.instance.options.helper = this.instance.options._helper;
                    this.instance.currentItem.remove();
                    if (this.instance.placeholder)this.instance.placeholder.remove();
                    inst._trigger("fromSortable", event);
                    inst.dropped = false;
                }
            }
            ;
        });
    }});
    $.ui.plugin.add("draggable", "cursor", {start: function (event, ui) {
        var t = $('body'), o = $(this).data('draggable').options;
        if (t.css("cursor"))o._cursor = t.css("cursor");
        t.css("cursor", o.cursor);
    }, stop: function (event, ui) {
        var o = $(this).data('draggable').options;
        if (o._cursor)$('body').css("cursor", o._cursor);
    }});
    $.ui.plugin.add("draggable", "iframeFix", {start: function (event, ui) {
        var o = $(this).data('draggable').options;
        $(o.iframeFix === true ? "iframe" : o.iframeFix).each(function () {
            $('<div class="ui-draggable-iframeFix" style="background: #fff;"></div>').css({width: this.offsetWidth + "px", height: this.offsetHeight + "px", position: "absolute", opacity: "0.001", zIndex: 1000}).css($(this).offset()).appendTo("body");
        });
    }, stop: function (event, ui) {
        $("div.ui-draggable-iframeFix").each(function () {
            this.parentNode.removeChild(this);
        });
    }});
    $.ui.plugin.add("draggable", "opacity", {start: function (event, ui) {
        var t = $(ui.helper), o = $(this).data('draggable').options;
        if (t.css("opacity"))o._opacity = t.css("opacity");
        t.css('opacity', o.opacity);
    }, stop: function (event, ui) {
        var o = $(this).data('draggable').options;
        if (o._opacity)$(ui.helper).css('opacity', o._opacity);
    }});
    $.ui.plugin.add("draggable", "scroll", {start: function (event, ui) {
        var i = $(this).data("draggable");
        if (i.scrollParent[0] != document && i.scrollParent[0].tagName != 'HTML')i.overflowOffset = i.scrollParent.offset();
    }, drag: function (event, ui) {
        var i = $(this).data("draggable"), o = i.options, scrolled = false;
        if (i.scrollParent[0] != document && i.scrollParent[0].tagName != 'HTML') {
            if (!o.axis || o.axis != 'x') {
                if ((i.overflowOffset.top + i.scrollParent[0].offsetHeight) - event.pageY < o.scrollSensitivity)
                    i.scrollParent[0].scrollTop = scrolled = i.scrollParent[0].scrollTop + o.scrollSpeed; else if (event.pageY - i.overflowOffset.top < o.scrollSensitivity)
                    i.scrollParent[0].scrollTop = scrolled = i.scrollParent[0].scrollTop - o.scrollSpeed;
            }
            if (!o.axis || o.axis != 'y') {
                if ((i.overflowOffset.left + i.scrollParent[0].offsetWidth) - event.pageX < o.scrollSensitivity)
                    i.scrollParent[0].scrollLeft = scrolled = i.scrollParent[0].scrollLeft + o.scrollSpeed; else if (event.pageX - i.overflowOffset.left < o.scrollSensitivity)
                    i.scrollParent[0].scrollLeft = scrolled = i.scrollParent[0].scrollLeft - o.scrollSpeed;
            }
        } else {
            if (!o.axis || o.axis != 'x') {
                if (event.pageY - $(document).scrollTop() < o.scrollSensitivity)
                    scrolled = $(document).scrollTop($(document).scrollTop() - o.scrollSpeed); else if ($(window).height() - (event.pageY - $(document).scrollTop()) < o.scrollSensitivity)
                    scrolled = $(document).scrollTop($(document).scrollTop() + o.scrollSpeed);
            }
            if (!o.axis || o.axis != 'y') {
                if (event.pageX - $(document).scrollLeft() < o.scrollSensitivity)
                    scrolled = $(document).scrollLeft($(document).scrollLeft() - o.scrollSpeed); else if ($(window).width() - (event.pageX - $(document).scrollLeft()) < o.scrollSensitivity)
                    scrolled = $(document).scrollLeft($(document).scrollLeft() + o.scrollSpeed);
            }
        }
        if (scrolled !== false && $.ui.ddmanager && !o.dropBehaviour)
            $.ui.ddmanager.prepareOffsets(i, event);
    }});
    $.ui.plugin.add("draggable", "snap", {start: function (event, ui) {
        var i = $(this).data("draggable"), o = i.options;
        i.snapElements = [];
        $(o.snap.constructor != String ? (o.snap.items || ':data(draggable)') : o.snap).each(function () {
            var $t = $(this);
            var $o = $t.offset();
            if (this != i.element[0])i.snapElements.push({item: this, width: $t.outerWidth(), height: $t.outerHeight(), top: $o.top, left: $o.left});
        });
    }, drag: function (event, ui) {
        var inst = $(this).data("draggable"), o = inst.options;
        var d = o.snapTolerance;
        var x1 = ui.offset.left, x2 = x1 + inst.helperProportions.width, y1 = ui.offset.top, y2 = y1 + inst.helperProportions.height;
        for (var i = inst.snapElements.length - 1; i >= 0; i--) {
            var l = inst.snapElements[i].left, r = l + inst.snapElements[i].width, t = inst.snapElements[i].top, b = t + inst.snapElements[i].height;
            if (!((l - d < x1 && x1 < r + d && t - d < y1 && y1 < b + d) || (l - d < x1 && x1 < r + d && t - d < y2 && y2 < b + d) || (l - d < x2 && x2 < r + d && t - d < y1 && y1 < b + d) || (l - d < x2 && x2 < r + d && t - d < y2 && y2 < b + d))) {
                if (inst.snapElements[i].snapping)(inst.options.snap.release && inst.options.snap.release.call(inst.element, event, $.extend(inst._uiHash(), {snapItem: inst.snapElements[i].item})));
                inst.snapElements[i].snapping = false;
                continue;
            }
            if (o.snapMode != 'inner') {
                var ts = Math.abs(t - y2) <= d;
                var bs = Math.abs(b - y1) <= d;
                var ls = Math.abs(l - x2) <= d;
                var rs = Math.abs(r - x1) <= d;
                if (ts)ui.position.top = inst._convertPositionTo("relative", {top: t - inst.helperProportions.height, left: 0}).top - inst.margins.top;
                if (bs)ui.position.top = inst._convertPositionTo("relative", {top: b, left: 0}).top - inst.margins.top;
                if (ls)ui.position.left = inst._convertPositionTo("relative", {top: 0, left: l - inst.helperProportions.width}).left - inst.margins.left;
                if (rs)ui.position.left = inst._convertPositionTo("relative", {top: 0, left: r}).left - inst.margins.left;
            }
            var first = (ts || bs || ls || rs);
            if (o.snapMode != 'outer') {
                var ts = Math.abs(t - y1) <= d;
                var bs = Math.abs(b - y2) <= d;
                var ls = Math.abs(l - x1) <= d;
                var rs = Math.abs(r - x2) <= d;
                if (ts)ui.position.top = inst._convertPositionTo("relative", {top: t, left: 0}).top - inst.margins.top;
                if (bs)ui.position.top = inst._convertPositionTo("relative", {top: b - inst.helperProportions.height, left: 0}).top - inst.margins.top;
                if (ls)ui.position.left = inst._convertPositionTo("relative", {top: 0, left: l}).left - inst.margins.left;
                if (rs)ui.position.left = inst._convertPositionTo("relative", {top: 0, left: r - inst.helperProportions.width}).left - inst.margins.left;
            }
            if (!inst.snapElements[i].snapping && (ts || bs || ls || rs || first))(inst.options.snap.snap && inst.options.snap.snap.call(inst.element, event, $.extend(inst._uiHash(), {snapItem: inst.snapElements[i].item})));
            inst.snapElements[i].snapping = (ts || bs || ls || rs || first);
        }
        ;
    }});
    $.ui.plugin.add("draggable", "stack", {start: function (event, ui) {
        var o = $(this).data("draggable").options;
        var group = $.makeArray($(o.stack.group)).sort(function (a, b) {
            return(parseInt($(a).css("zIndex"), 10) || o.stack.min) - (parseInt($(b).css("zIndex"), 10) || o.stack.min);
        });
        $(group).each(function (i) {
            this.style.zIndex = o.stack.min + i;
        });
        this[0].style.zIndex = o.stack.min + group.length;
    }});
    $.ui.plugin.add("draggable", "zIndex", {start: function (event, ui) {
        var t = $(ui.helper), o = $(this).data("draggable").options;
        if (t.css("zIndex"))o._zIndex = t.css("zIndex");
        t.css('zIndex', o.zIndex);
    }, stop: function (event, ui) {
        var o = $(this).data("draggable").options;
        if (o._zIndex)$(ui.helper).css('zIndex', o._zIndex);
    }});
})(jQuery);
(function (i) {
    var q = {vertical: false, rtl: false, start: 1, offset: 1, size: null, scroll: 3, visible: null, animation: "normal", easing: "swing", auto: 0, wrap: null, initCallback: null, reloadCallback: null, itemLoadCallback: null, itemFirstInCallback: null, itemFirstOutCallback: null, itemLastInCallback: null, itemLastOutCallback: null, itemVisibleInCallback: null, itemVisibleOutCallback: null, buttonNextHTML: "<div></div>", buttonPrevHTML: "<div></div>", buttonNextEvent: "click", buttonPrevEvent: "click", buttonNextCallback: null, buttonPrevCallback: null, itemFallbackDimension: null}, r = false;
    i(window).bind("load.jcarousel", function () {
        r = true
    });
    i.jcarousel = function (a, c) {
        this.options = i.extend({}, q, c || {});
        this.autoStopped = this.locked = false;
        this.buttonPrevState = this.buttonNextState = this.buttonPrev = this.buttonNext = this.list = this.clip = this.container = null;
        if (!c || c.rtl === undefined)this.options.rtl = (i(a).attr("dir") || i("html").attr("dir") || "").toLowerCase() == "rtl";
        this.wh = !this.options.vertical ? "width" : "height";
        this.lt = !this.options.vertical ? this.options.rtl ? "right" : "left" : "top";
        for (var b = "", d = a.className.split(" "), f = 0; f < d.length; f++)if (d[f].indexOf("jcarousel-skin") != -1) {
            i(a).removeClass(d[f]);
            b = d[f];
            break
        }
        if (a.nodeName.toUpperCase() == "UL" || a.nodeName.toUpperCase() == "OL") {
            this.list = i(a);
            this.container = this.list.parent();
            if (this.container.hasClass("jcarousel-clip")) {
                if (!this.container.parent().hasClass("jcarousel-container"))this.container = this.container.wrap("<div></div>");
                this.container = this.container.parent()
            } else if (!this.container.hasClass("jcarousel-container"))this.container = this.list.wrap("<div></div>").parent()
        } else {
            this.container = i(a);
            this.list = this.container.find("ul,ol").eq(0)
        }
        b !== "" && this.container.parent()[0].className.indexOf("jcarousel-skin") == -1 && this.container.wrap('<div class=" ' + b + '"></div>');
        this.clip = this.list.parent();
        if (!this.clip.length || !this.clip.hasClass("jcarousel-clip"))this.clip = this.list.wrap("<div></div>").parent();
        this.buttonNext = i(".jcarousel-next", this.container);
        if (this.buttonNext.size() === 0 && this.options.buttonNextHTML !== null)this.buttonNext = this.clip.after(this.options.buttonNextHTML).next();
        this.buttonNext.addClass(this.className("jcarousel-next"));
        this.buttonPrev = i(".jcarousel-prev", this.container);
        if (this.buttonPrev.size() === 0 && this.options.buttonPrevHTML !== null)this.buttonPrev = this.clip.after(this.options.buttonPrevHTML).next();
        this.buttonPrev.addClass(this.className("jcarousel-prev"));
        this.clip.addClass(this.className("jcarousel-clip")).css({overflow: "hidden", position: "relative"});
        this.list.addClass(this.className("jcarousel-list")).css({overflow: "hidden", position: "relative", top: 0, margin: 0, padding: 0}).css(this.options.rtl ? "right" : "left", 0);
        this.container.addClass(this.className("jcarousel-container")).css({position: "relative"});
        !this.options.vertical && this.options.rtl && this.container.addClass("jcarousel-direction-rtl").attr("dir", "rtl");
        var j = this.options.visible !== null ? Math.ceil(this.clipping() / this.options.visible) : null;
        b = this.list.children("li");
        var e = this;
        if (b.size() > 0) {
            var g = 0, k = this.options.offset;
            b.each(function () {
                e.format(this, k++);
                g += e.dimension(this, j)
            });
            this.list.css(this.wh, g + 100 + "px");
            if (!c || c.size === undefined)this.options.size = b.size()
        }
        this.container.css("display", "block");
        this.buttonNext.css("display", "block");
        this.buttonPrev.css("display", "block");
        this.funcNext = function () {
            e.next()
        };
        this.funcPrev = function () {
            e.prev()
        };
        this.funcResize = function () {
            e.reload()
        };
        this.options.initCallback !== null && this.options.initCallback(this, "init");
        if (!r && i.browser.safari) {
            this.buttons(false, false);
            i(window).bind("load.jcarousel", function () {
                e.setup()
            })
        } else this.setup()
    };
    var h = i.jcarousel;
    h.fn = h.prototype = {jcarousel: "0.2.7"};
    h.fn.extend = h.extend = i.extend;
    h.fn.extend({setup: function () {
        this.prevLast = this.prevFirst = this.last = this.first = null;
        this.animating = false;
        this.tail = this.timer = null;
        this.inTail = false;
        if (!this.locked) {
            this.list.css(this.lt, this.pos(this.options.offset) + "px");
            var a = this.pos(this.options.start, true);
            this.prevFirst = this.prevLast = null;
            this.animate(a, false);
            i(window).unbind("resize.jcarousel", this.funcResize).bind("resize.jcarousel", this.funcResize)
        }
    }, reset: function () {
        this.list.empty();
        this.list.css(this.lt, "0px");
        this.list.css(this.wh, "10px");
        this.options.initCallback !== null && this.options.initCallback(this, "reset");
        this.setup()
    }, reload: function () {
        this.tail !== null && this.inTail && this.list.css(this.lt, h.intval(this.list.css(this.lt)) + this.tail);
        this.tail = null;
        this.inTail = false;
        this.options.reloadCallback !== null && this.options.reloadCallback(this);
        if (this.options.visible !== null) {
            var a = this, c = Math.ceil(this.clipping() / this.options.visible), b = 0, d = 0;
            this.list.children("li").each(function (f) {
                b += a.dimension(this, c);
                if (f + 1 < a.first)d = b
            });
            this.list.css(this.wh, b + "px");
            this.list.css(this.lt, -d + "px")
        }
        this.scroll(this.first, false)
    }, lock: function () {
        this.locked = true;
        this.buttons()
    }, unlock: function () {
        this.locked = false;
        this.buttons()
    }, size: function (a) {
        if (a !== undefined) {
            this.options.size = a;
            this.locked || this.buttons()
        }
        return this.options.size
    }, has: function (a, c) {
        if (c === undefined || !c)c = a;
        if (this.options.size !== null && c > this.options.size)c = this.options.size;
        for (var b = a; b <= c; b++) {
            var d = this.get(b);
            if (!d.length || d.hasClass("jcarousel-item-placeholder"))return false
        }
        return true
    }, get: function (a) {
        return i(".jcarousel-item-" + a, this.list)
    }, add: function (a, c) {
        var b = this.get(a), d = 0, f = i(c);
        if (b.length === 0) {
            var j, e = h.intval(a);
            for (b = this.create(a); ;) {
                j = this.get(--e);
                if (e <= 0 || j.length) {
                    e <= 0 ? this.list.prepend(b) : j.after(b);
                    break
                }
            }
        } else d = this.dimension(b);
        if (f.get(0).nodeName.toUpperCase() == "LI") {
            b.replaceWith(f);
            b = f
        } else b.empty().append(c);
        this.format(b.removeClass(this.className("jcarousel-item-placeholder")), a);
        f = this.options.visible !== null ? Math.ceil(this.clipping() / this.options.visible) : null;
        d = this.dimension(b, f) - d;
        a > 0 && a < this.first && this.list.css(this.lt, h.intval(this.list.css(this.lt)) - d + "px");
        this.list.css(this.wh, h.intval(this.list.css(this.wh)) + d + "px");
        return b
    }, remove: function (a) {
        var c = this.get(a);
        if (!(!c.length || a >= this.first && a <= this.last)) {
            var b = this.dimension(c);
            a < this.first && this.list.css(this.lt, h.intval(this.list.css(this.lt)) + b + "px");
            c.remove();
            this.list.css(this.wh, h.intval(this.list.css(this.wh)) - b + "px")
        }
    }, next: function () {
        this.tail !== null && !this.inTail ? this.scrollTail(false) : this.scroll((this.options.wrap == "both" || this.options.wrap == "last") && this.options.size !== null && this.last == this.options.size ? 1 : this.first + this.options.scroll)
    }, prev: function () {
        this.tail !== null && this.inTail ? this.scrollTail(true) : this.scroll((this.options.wrap == "both" || this.options.wrap == "first") && this.options.size !== null && this.first == 1 ? this.options.size : this.first - this.options.scroll)
    }, scrollTail: function (a) {
        if (!(this.locked || this.animating || !this.tail)) {
            this.pauseAuto();
            var c = h.intval(this.list.css(this.lt));
            c = !a ? c - this.tail : c + this.tail;
            this.inTail = !a;
            this.prevFirst = this.first;
            this.prevLast = this.last;
            this.animate(c)
        }
    }, scroll: function (a, c) {
        if (!(this.locked || this.animating)) {
            this.pauseAuto();
            this.animate(this.pos(a), c)
        }
    }, pos: function (a, c) {
        var b = h.intval(this.list.css(this.lt));
        if (this.locked || this.animating)return b;
        if (this.options.wrap != "circular")a = a < 1 ? 1 : this.options.size && a > this.options.size ? this.options.size : a;
        for (var d = this.first > a, f = this.options.wrap != "circular" && this.first <= 1 ? 1 : this.first, j = d ? this.get(f) : this.get(this.last), e = d ? f : f - 1, g = null, k = 0, l = false, m = 0; d ? --e >= a : ++e < a;) {
            g = this.get(e);
            l = !g.length;
            if (g.length === 0) {
                g = this.create(e).addClass(this.className("jcarousel-item-placeholder"));
                j[d ? "before" : "after"](g);
                if (this.first !== null && this.options.wrap == "circular" && this.options.size !== null && (e <= 0 || e > this.options.size)) {
                    j = this.get(this.index(e));
                    if (j.length)g = this.add(e, j.clone(true))
                }
            }
            j = g;
            m = this.dimension(g);
            if (l)k += m;
            if (this.first !== null && (this.options.wrap == "circular" || e >= 1 && (this.options.size === null || e <= this.options.size)))b = d ? b + m : b - m
        }
        f = this.clipping();
        var p = [], o = 0, n = 0;
        j = this.get(a - 1);
        for (e = a; ++o;) {
            g = this.get(e);
            l = !g.length;
            if (g.length === 0) {
                g = this.create(e).addClass(this.className("jcarousel-item-placeholder"));
                j.length === 0 ? this.list.prepend(g) : j[d ? "before" : "after"](g);
                if (this.first !== null && this.options.wrap == "circular" && this.options.size !== null && (e <= 0 || e > this.options.size)) {
                    j = this.get(this.index(e));
                    if (j.length)g = this.add(e, j.clone(true))
                }
            }
            j = g;
            m = this.dimension(g);
            if (m === 0)throw Error("jCarousel: No width/height set for items. This will cause an infinite loop. Aborting...");
            if (this.options.wrap != "circular" && this.options.size !== null && e > this.options.size)p.push(g); else if (l)k += m;
            n += m;
            if (n >= f)break;
            e++
        }
        for (g = 0; g < p.length; g++)p[g].remove();
        if (k > 0) {
            this.list.css(this.wh, this.dimension(this.list) + k + "px");
            if (d) {
                b -= k;
                this.list.css(this.lt, h.intval(this.list.css(this.lt)) - k + "px")
            }
        }
        k = a + o - 1;
        if (this.options.wrap != "circular" && this.options.size && k > this.options.size)k = this.options.size;
        if (e > k) {
            o = 0;
            e = k;
            for (n = 0; ++o;) {
                g = this.get(e--);
                if (!g.length)break;
                n += this.dimension(g);
                if (n >= f)break
            }
        }
        e = k - o + 1;
        if (this.options.wrap != "circular" && e < 1)e = 1;
        if (this.inTail && d) {
            b += this.tail;
            this.inTail = false
        }
        this.tail = null;
        if (this.options.wrap != "circular" && k == this.options.size && k - o + 1 >= 1) {
            d = h.margin(this.get(k), !this.options.vertical ? "marginRight" : "marginBottom");
            if (n - d > f)this.tail = n - f - d
        }
        if (c && a === this.options.size && this.tail) {
            b -= this.tail;
            this.inTail = true
        }
        for (; a-- > e;)b += this.dimension(this.get(a));
        this.prevFirst = this.first;
        this.prevLast = this.last;
        this.first = e;
        this.last = k;
        return b
    }, animate: function (a, c) {
        if (!(this.locked || this.animating)) {
            this.animating = true;
            var b = this, d = function () {
                b.animating = false;
                a === 0 && b.list.css(b.lt, 0);
                if (!b.autoStopped && (b.options.wrap == "circular" || b.options.wrap == "both" || b.options.wrap == "last" || b.options.size === null || b.last < b.options.size || b.last == b.options.size && b.tail !== null && !b.inTail))b.startAuto();
                b.buttons();
                b.notify("onAfterAnimation");
                if (b.options.wrap == "circular" && b.options.size !== null)for (var f = b.prevFirst; f <= b.prevLast; f++)if (f !== null && !(f >= b.first && f <= b.last) && (f < 1 || f > b.options.size))b.remove(f)
            };
            this.notify("onBeforeAnimation");
            if (!this.options.animation || c === false) {
                this.list.css(this.lt, a + "px");
                d()
            } else this.list.animate(!this.options.vertical ? this.options.rtl ? {right: a} : {left: a} : {top: a}, this.options.animation, this.options.easing, d)
        }
    }, startAuto: function (a) {
        if (a !== undefined)this.options.auto = a;
        if (this.options.auto === 0)return this.stopAuto();
        if (this.timer === null) {
            this.autoStopped = false;
            var c = this;
            this.timer = window.setTimeout(function () {
                c.next()
            }, this.options.auto * 1E3)
        }
    }, stopAuto: function () {
        this.pauseAuto();
        this.autoStopped = true
    }, pauseAuto: function () {
        if (this.timer !== null) {
            window.clearTimeout(this.timer);
            this.timer = null
        }
    }, buttons: function (a, c) {
        if (a == null) {
            a = !this.locked && this.options.size !== 0 && (this.options.wrap && this.options.wrap != "first" || this.options.size === null || this.last < this.options.size);
            if (!this.locked && (!this.options.wrap || this.options.wrap == "first") && this.options.size !== null && this.last >= this.options.size)a = this.tail !== null && !this.inTail
        }
        if (c == null) {
            c = !this.locked && this.options.size !== 0 && (this.options.wrap && this.options.wrap != "last" || this.first > 1);
            if (!this.locked && (!this.options.wrap || this.options.wrap == "last") && this.options.size !== null && this.first == 1)c = this.tail !== null && this.inTail
        }
        var b = this;
        if (this.buttonNext.size() > 0) {
            this.buttonNext.unbind(this.options.buttonNextEvent + ".jcarousel", this.funcNext);
            a && this.buttonNext.bind(this.options.buttonNextEvent + ".jcarousel", this.funcNext);
            this.buttonNext[a ? "removeClass" : "addClass"](this.className("jcarousel-next-disabled")).attr("disabled", a ? false : true);
            this.options.buttonNextCallback !== null && this.buttonNext.data("jcarouselstate") != a && this.buttonNext.each(function () {
                b.options.buttonNextCallback(b, this, a)
            }).data("jcarouselstate", a)
        } else this.options.buttonNextCallback !== null && this.buttonNextState != a && this.options.buttonNextCallback(b, null, a);
        if (this.buttonPrev.size() > 0) {
            this.buttonPrev.unbind(this.options.buttonPrevEvent + ".jcarousel", this.funcPrev);
            c && this.buttonPrev.bind(this.options.buttonPrevEvent + ".jcarousel", this.funcPrev);
            this.buttonPrev[c ? "removeClass" : "addClass"](this.className("jcarousel-prev-disabled")).attr("disabled", c ? false : true);
            this.options.buttonPrevCallback !== null && this.buttonPrev.data("jcarouselstate") != c && this.buttonPrev.each(function () {
                b.options.buttonPrevCallback(b, this, c)
            }).data("jcarouselstate", c)
        } else this.options.buttonPrevCallback !== null && this.buttonPrevState != c && this.options.buttonPrevCallback(b, null, c);
        this.buttonNextState = a;
        this.buttonPrevState = c
    }, notify: function (a) {
        var c = this.prevFirst === null ? "init" : this.prevFirst < this.first ? "next" : "prev";
        this.callback("itemLoadCallback", a, c);
        if (this.prevFirst !== this.first) {
            this.callback("itemFirstInCallback", a, c, this.first);
            this.callback("itemFirstOutCallback", a, c, this.prevFirst)
        }
        if (this.prevLast !== this.last) {
            this.callback("itemLastInCallback", a, c, this.last);
            this.callback("itemLastOutCallback", a, c, this.prevLast)
        }
        this.callback("itemVisibleInCallback", a, c, this.first, this.last, this.prevFirst, this.prevLast);
        this.callback("itemVisibleOutCallback", a, c, this.prevFirst, this.prevLast, this.first, this.last)
    }, callback: function (a, c, b, d, f, j, e) {
        if (!(this.options[a] == null || typeof this.options[a] != "object" && c != "onAfterAnimation")) {
            var g = typeof this.options[a] == "object" ? this.options[a][c] : this.options[a];
            if (i.isFunction(g)) {
                var k = this;
                if (d === undefined)g(k, b, c); else if (f === undefined)this.get(d).each(function () {
                    g(k, this, d, b, c)
                }); else {
                    a = function (m) {
                        k.get(m).each(function () {
                            g(k, this, m, b, c)
                        })
                    };
                    for (var l = d; l <= f; l++)l !== null && !(l >= j && l <= e) && a(l)
                }
            }
        }
    }, create: function (a) {
        return this.format("<li></li>", a)
    }, format: function (a, c) {
        a = i(a);
        for (var b = a.get(0).className.split(" "), d = 0; d < b.length; d++)b[d].indexOf("jcarousel-") != -1 && a.removeClass(b[d]);
        a.addClass(this.className("jcarousel-item")).addClass(this.className("jcarousel-item-" + c)).css({"float": this.options.rtl ? "right" : "left", "list-style": "none"}).attr("jcarouselindex", c);
        return a
    }, className: function (a) {
        return a + " " + a + (!this.options.vertical ? "-horizontal" : "-vertical")
    }, dimension: function (a, c) {
        var b = a.jquery !== undefined ? a[0] : a, d = !this.options.vertical ? (b.offsetWidth || h.intval(this.options.itemFallbackDimension)) + h.margin(b, "marginLeft") + h.margin(b, "marginRight") : (b.offsetHeight || h.intval(this.options.itemFallbackDimension)) + h.margin(b, "marginTop") + h.margin(b, "marginBottom");
        if (c == null || d == c)return d;
        d = !this.options.vertical ? c - h.margin(b, "marginLeft") - h.margin(b, "marginRight") : c - h.margin(b, "marginTop") - h.margin(b, "marginBottom");
        i(b).css(this.wh, d + "px");
        return this.dimension(b)
    }, clipping: function () {
        return!this.options.vertical ? this.clip[0].offsetWidth - h.intval(this.clip.css("borderLeftWidth")) - h.intval(this.clip.css("borderRightWidth")) : this.clip[0].offsetHeight - h.intval(this.clip.css("borderTopWidth")) - h.intval(this.clip.css("borderBottomWidth"))
    }, index: function (a, c) {
        if (c == null)c = this.options.size;
        return Math.round(((a - 1) / c - Math.floor((a - 1) / c)) * c) + 1
    }});
    h.extend({defaults: function (a) {
        return i.extend(q, a || {})
    }, margin: function (a, c) {
        if (!a)return 0;
        var b = a.jquery !== undefined ? a[0] : a;
        if (c == "marginRight" && i.browser.safari) {
            var d = {display: "block", "float": "none", width: "auto"}, f, j;
            i.swap(b, d, function () {
                f = b.offsetWidth
            });
            d.marginRight = 0;
            i.swap(b, d, function () {
                j = b.offsetWidth
            });
            return j - f
        }
        return h.intval(i.css(b, c))
    }, intval: function (a) {
        a = parseInt(a, 10);
        return isNaN(a) ? 0 : a
    }});
    i.fn.jcarousel = function (a) {
        if (typeof a == "string") {
            var c = i(this).data("jcarousel"), b = Array.prototype.slice.call(arguments, 1);
            return c[a].apply(c, b)
        } else return this.each(function () {
            i(this).data("jcarousel", new h(this, a))
        })
    }
})(jQuery);
jQuery.extend({historyCurrentHash: undefined, historyCallback: undefined, historyIframeSrc: undefined, historyInit: function (callback, src) {
    jQuery.historyCallback = callback;
    if (src)jQuery.historyIframeSrc = src;
    var current_hash = location.hash.replace(/\?.*$/, '');
    jQuery.historyCurrentHash = current_hash;
    if (jQuery.browser.msie) {
        if (jQuery.historyCurrentHash == '') {
            jQuery.historyCurrentHash = '#';
        }
        jQuery("body").prepend('<iframe id="jQuery_history" style="display: none;"' + (jQuery.historyIframeSrc ? ' src="' + jQuery.historyIframeSrc + '"' : '') + '></iframe>');
        var ihistory = jQuery("#jQuery_history")[0];
        var iframe = ihistory.contentWindow.document;
        iframe.open();
        iframe.close();
        iframe.location.hash = current_hash;
    }
    else if (jQuery.browser.safari) {
        jQuery.historyBackStack = [];
        jQuery.historyBackStack.length = history.length;
        jQuery.historyForwardStack = [];
        jQuery.lastHistoryLength = history.length;
        jQuery.isFirst = true;
    }
    if (current_hash)
        jQuery.historyCallback(current_hash.replace(/^#/, ''));
    setInterval(jQuery.historyCheck, 100);
}, historyAddHistory: function (hash) {
    jQuery.historyBackStack.push(hash);
    jQuery.historyForwardStack.length = 0;
    this.isFirst = true;
}, historyCheck: function () {
    if (jQuery.browser.msie) {
        var ihistory = jQuery("#jQuery_history")[0];
        var iframe = ihistory.contentDocument || ihistory.contentWindow.document;
        var current_hash = iframe.location.hash.replace(/\?.*$/, '');
        if (current_hash != jQuery.historyCurrentHash) {
            location.hash = current_hash;
            jQuery.historyCurrentHash = current_hash;
            jQuery.historyCallback(current_hash.replace(/^#/, ''));
        }
    } else if (jQuery.browser.safari) {
        if (jQuery.lastHistoryLength == history.length && jQuery.historyBackStack.length > jQuery.lastHistoryLength) {
            jQuery.historyBackStack.shift();
        }
        if (!jQuery.dontCheck) {
            var historyDelta = history.length - jQuery.historyBackStack.length;
            jQuery.lastHistoryLength = history.length;
            if (historyDelta) {
                jQuery.isFirst = false;
                if (historyDelta < 0) {
                    for (var i = 0; i < Math.abs(historyDelta); i++)jQuery.historyForwardStack.unshift(jQuery.historyBackStack.pop());
                } else {
                    for (var i = 0; i < historyDelta; i++)jQuery.historyBackStack.push(jQuery.historyForwardStack.shift());
                }
                var cachedHash = jQuery.historyBackStack[jQuery.historyBackStack.length - 1];
                if (cachedHash != undefined) {
                    jQuery.historyCurrentHash = location.hash.replace(/\?.*$/, '');
                    jQuery.historyCallback(cachedHash);
                }
            } else if (jQuery.historyBackStack[jQuery.historyBackStack.length - 1] == undefined && !jQuery.isFirst) {
                if (location.hash) {
                    var current_hash = location.hash;
                    jQuery.historyCallback(location.hash.replace(/^#/, ''));
                } else {
                    var current_hash = '';
                    jQuery.historyCallback('');
                }
                jQuery.isFirst = true;
            }
        }
    } else {
        var current_hash = location.hash.replace(/\?.*$/, '');
        if (current_hash != jQuery.historyCurrentHash) {
            jQuery.historyCurrentHash = current_hash;
            jQuery.historyCallback(current_hash.replace(/^#/, ''));
        }
    }
}, historyLoad: function (hash) {
    var newhash;
    hash = decodeURIComponent(hash.replace(/\?.*$/, ''));
    if (jQuery.browser.safari) {
        newhash = hash;
    }
    else {
        newhash = '#' + hash;
        location.hash = newhash;
    }
    jQuery.historyCurrentHash = newhash;
    if (jQuery.browser.msie) {
        var ihistory = jQuery("#jQuery_history")[0];
        var iframe = ihistory.contentWindow.document;
        iframe.open();
        iframe.close();
        iframe.location.hash = newhash;
        jQuery.lastHistoryLength = history.length;
        jQuery.historyCallback(hash);
    }
    else if (jQuery.browser.safari) {
        jQuery.dontCheck = true;
        this.historyAddHistory(hash);
        var fn = function () {
            jQuery.dontCheck = false;
        };
        window.setTimeout(fn, 200);
        jQuery.historyCallback(hash);
        location.hash = newhash;
    }
    else {
        jQuery.historyCallback(hash);
    }
}});
