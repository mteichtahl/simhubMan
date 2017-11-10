/* raphael-svg-import-classic - v0.3.1 - 2015-11-03 */
if (!Raphael && require) var Raphael = require("raphael"); Raphael.fn.importSVG = function (a, b) { "use strict"; var c = this.set(), d = {}, e = { "text-anchor": "start" }, f = function (a) { return a.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "") }, g = Function.prototype.bind && Array.prototype.forEach ? Function.prototype.call.bind(Array.prototype.forEach) : function (a, b) { for (var c = 0, d = a.length; d > c; c++)b(a[c], c, a) }; this.parseElement = function (a) { if (3 !== a.nodeType) { var g, h, i, j, k = { stroke: "none", "stroke-width": 1, fill: "black" }, l = a.nodeName; if (a.attributes) for (g = 0, h = a.attributes.length; h > g; g++)k[a.attributes[g].name] = a.attributes[g].value; switch (l) { case "svg": case "g": var m = a.getAttribute("id"), n = a.getAttribute("class"); if (m || n) { var o = a.childNodes; for (g = 0, h = o.length; h > g; g++){ var p = o[g]; 3 !== p.nodeType && (m && p.setAttribute("data-svg-group", m), n && p.setAttribute("class", (p.getAttribute("class") || "") + " " + n)) } } var q = this.set(); for (g = 0, h = a.childNodes.length; h > g; g++)q.push(this.parseElement(a.childNodes.item(g))); if (k.transform) { var r = /translate\(([^,]+),([^,]+)\)/.exec(k.transform); 3 == r.length && q.translate(r[1], r[2]) } return "none" === k.display && q.hide(), void (m && a.childNodes.length && (d[m] = q)); case "rect": k.rx && k.ry ? (k.r = (+(k.rx || 0) + +(k.ry || 0)) / 2, delete k.rx, delete k.ry) : (k.r = k.rx || k.ry || 0, delete k.rx, delete k.ry); case "circle": case "ellipse": j = this[l](); break; case "path": j = this.path(k.d), delete k.d; break; case "polygon": j = this.polygon(k); break; case "polyline": j = this.polyline(k); break; case "line": j = this.line(k); break; case "image": j = this.image(); break; case "text": for (i in e) !k[i] && e.hasOwnProperty(i) && (k[i] = e[i]); j = this.text(k.x, k.y, a.text || a.textContent || a.innerText || a.outerText); break; default: var s = a.getElementsByTagName("svg"); return void (s.length && (s[0].normalize(), this.parseElement(s[0]))) }var t = k.transform; if (t) { t = t.substring(7, t.length - 1).split(" "); for (var u in t) t[u] = parseFloat(t[u]); var v = j.matrix; v.add.apply(v, t), j.transform(v.toTransformString()), delete k.transform } if (k.style) { var w, x = k.style.split(";"); for (g = 0; g < x.length; g++)w = x[g].split(":"), i = f(w[0]), i && (k[i] = f(w[1])) } j.attr(k); for (var y = 0; y < a.attributes.length; y++){ var z = a.attributes[y]; 0 === z.name.indexOf("data-") && j.data(z.name.replace(/data-/, ""), z.value) } var A = a.getAttribute("class"); A && j.node.setAttribute("class", (j.node.getAttribute("class") || "") + " " + A), j.node.setAttribute("data-svg", l); var B = a.getAttribute("data-svg-group"); B && j.node.setAttribute("data-svg-group", B); var C = a.getAttribute("id"); return C && (j.node.id = C), b && b.parseElement && (j = b.parseElement(j, a)), j && c.push(j), j } }, this.parseElement(a); var h = this; g(a.getElementsByTagName("style"), function (a) { var b = document.createElement("style"), c = a.textContent || a.text; b.type = "text/css", document.head.appendChild(b); var d; b.styleSheet ? (b.styleSheet.cssText = c, d = b.styleSheet.rules) : (b.appendChild(document.createTextNode(c)), d = b.sheet.cssRules), g(d, function (a) { var b = a.style, c = document.querySelectorAll(a.selectorText), d = {}; for (var e in Raphael._availableAttrs) { var f = b[e]; f && (d[e] = "number" == typeof Raphael._availableAttrs[e] ? parseFloat(f) : f) } g(c, function (a) { h.getById(a.raphaelid).attr(d) }) }) }); var i, j = !1; for (i in d) { j = !0; break } return j && (c.groups = d), c }, Raphael.fn.line = function (a) { var b = ["M", a.x1, a.y1, "L", a.x2, a.y2, "Z"]; return delete a.x1, delete a.y1, delete a.x2, delete a.y2, this.path(b) }, Raphael.fn.polygon = function (a) { for (var b = a.points, c = ["M"], d = b.split(" "), e = 0; e < d.length; e++){ for (var f = d[e].split(","), g = 0; g < f.length; g++){ var h = parseFloat(f[g]); isNaN(h) || c.push(h) } 0 === e && c.push("L") } return c.push("Z"), delete a.points, this.path(c) }, Raphael.fn.polyline = function (a) { for (var b = a.points, c = ["M"], d = b.split(" "), e = 0; e < d.length; e++){ for (var f = d[e].split(","), g = 0; g < f.length; g++){ var h = parseFloat(f[g]); isNaN(h) || c.push(h) } 0 === e && c.push("L") } return delete a.points, this.path(c) };