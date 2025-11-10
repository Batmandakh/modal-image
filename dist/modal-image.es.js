import ce, { useState as le, useRef as y, useCallback as j, memo as ue, useEffect as de } from "react";
import { Download as fe, RefreshCcw as he, X as me } from "lucide-react";
var re = { exports: {} }, B = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var oe;
function ge() {
  if (oe) return B;
  oe = 1;
  var h = Symbol.for("react.transitional.element"), R = Symbol.for("react.fragment");
  function _(g, s, f) {
    var m = null;
    if (f !== void 0 && (m = "" + f), s.key !== void 0 && (m = "" + s.key), "key" in s) {
      f = {};
      for (var v in s)
        v !== "key" && (f[v] = s[v]);
    } else f = s;
    return s = f.ref, {
      $$typeof: h,
      type: g,
      key: m,
      ref: s !== void 0 ? s : null,
      props: f
    };
  }
  return B.Fragment = R, B.jsx = _, B.jsxs = _, B;
}
var Z = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ae;
function pe() {
  return ae || (ae = 1, process.env.NODE_ENV !== "production" && (function() {
    function h(e) {
      if (e == null) return null;
      if (typeof e == "function")
        return e.$$typeof === S ? null : e.displayName || e.name || null;
      if (typeof e == "string") return e;
      switch (e) {
        case F:
          return "Fragment";
        case te:
          return "Profiler";
        case I:
          return "StrictMode";
        case W:
          return "Suspense";
        case z:
          return "SuspenseList";
        case o:
          return "Activity";
      }
      if (typeof e == "object")
        switch (typeof e.tag == "number" && console.error(
          "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
        ), e.$$typeof) {
          case $:
            return "Portal";
          case N:
            return e.displayName || "Context";
          case P:
            return (e._context.displayName || "Context") + ".Consumer";
          case q:
            var t = e.render;
            return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
          case U:
            return t = e.displayName || null, t !== null ? t : h(e.type) || "Memo";
          case L:
            t = e._payload, e = e._init;
            try {
              return h(e(t));
            } catch {
            }
        }
      return null;
    }
    function R(e) {
      return "" + e;
    }
    function _(e) {
      try {
        R(e);
        var t = !1;
      } catch {
        t = !0;
      }
      if (t) {
        t = console;
        var a = t.error, l = typeof Symbol == "function" && Symbol.toStringTag && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return a.call(
          t,
          "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
          l
        ), R(e);
      }
    }
    function g(e) {
      if (e === F) return "<>";
      if (typeof e == "object" && e !== null && e.$$typeof === L)
        return "<...>";
      try {
        var t = h(e);
        return t ? "<" + t + ">" : "<...>";
      } catch {
        return "<...>";
      }
    }
    function s() {
      var e = O.A;
      return e === null ? null : e.getOwner();
    }
    function f() {
      return Error("react-stack-top-frame");
    }
    function m(e) {
      if (V.call(e, "key")) {
        var t = Object.getOwnPropertyDescriptor(e, "key").get;
        if (t && t.isReactWarning) return !1;
      }
      return e.key !== void 0;
    }
    function v(e, t) {
      function a() {
        Y || (Y = !0, console.error(
          "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
          t
        ));
      }
      a.isReactWarning = !0, Object.defineProperty(e, "key", {
        get: a,
        configurable: !0
      });
    }
    function k() {
      var e = h(this.type);
      return Q[e] || (Q[e] = !0, console.error(
        "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
      )), e = this.props.ref, e !== void 0 ? e : null;
    }
    function T(e, t, a, l, d, X) {
      var u = a.ref;
      return e = {
        $$typeof: D,
        type: e,
        key: t,
        props: a,
        _owner: l
      }, (u !== void 0 ? u : null) !== null ? Object.defineProperty(e, "ref", {
        enumerable: !1,
        get: k
      }) : Object.defineProperty(e, "ref", { enumerable: !1, value: null }), e._store = {}, Object.defineProperty(e._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: 0
      }), Object.defineProperty(e, "_debugInfo", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: null
      }), Object.defineProperty(e, "_debugStack", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: d
      }), Object.defineProperty(e, "_debugTask", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: X
      }), Object.freeze && (Object.freeze(e.props), Object.freeze(e)), e;
    }
    function x(e, t, a, l, d, X) {
      var u = t.children;
      if (u !== void 0)
        if (l)
          if (p(u)) {
            for (l = 0; l < u.length; l++)
              C(u[l]);
            Object.freeze && Object.freeze(u);
          } else
            console.error(
              "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead."
            );
        else C(u);
      if (V.call(t, "key")) {
        u = h(e);
        var H = Object.keys(t).filter(function(M) {
          return M !== "key";
        });
        l = 0 < H.length ? "{key: someKey, " + H.join(": ..., ") + ": ...}" : "{key: someKey}", G[u + l] || (H = 0 < H.length ? "{" + H.join(": ..., ") + ": ...}" : "{}", console.error(
          `A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`,
          l,
          u,
          H,
          u
        ), G[u + l] = !0);
      }
      if (u = null, a !== void 0 && (_(a), u = "" + a), m(t) && (_(t.key), u = "" + t.key), "key" in t) {
        a = {};
        for (var b in t)
          b !== "key" && (a[b] = t[b]);
      } else a = t;
      return u && v(
        a,
        typeof e == "function" ? e.displayName || e.name || "Unknown" : e
      ), T(
        e,
        u,
        a,
        s(),
        d,
        X
      );
    }
    function C(e) {
      A(e) ? e._store && (e._store.validated = 1) : typeof e == "object" && e !== null && e.$$typeof === L && (e._payload.status === "fulfilled" ? A(e._payload.value) && e._payload.value._store && (e._payload.value._store.validated = 1) : e._store && (e._store.validated = 1));
    }
    function A(e) {
      return typeof e == "object" && e !== null && e.$$typeof === D;
    }
    var E = ce, D = Symbol.for("react.transitional.element"), $ = Symbol.for("react.portal"), F = Symbol.for("react.fragment"), I = Symbol.for("react.strict_mode"), te = Symbol.for("react.profiler"), P = Symbol.for("react.consumer"), N = Symbol.for("react.context"), q = Symbol.for("react.forward_ref"), W = Symbol.for("react.suspense"), z = Symbol.for("react.suspense_list"), U = Symbol.for("react.memo"), L = Symbol.for("react.lazy"), o = Symbol.for("react.activity"), S = Symbol.for("react.client.reference"), O = E.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, V = Object.prototype.hasOwnProperty, p = Array.isArray, J = console.createTask ? console.createTask : function() {
      return null;
    };
    E = {
      react_stack_bottom_frame: function(e) {
        return e();
      }
    };
    var Y, Q = {}, K = E.react_stack_bottom_frame.bind(
      E,
      f
    )(), ee = J(g(f)), G = {};
    Z.Fragment = F, Z.jsx = function(e, t, a) {
      var l = 1e4 > O.recentlyCreatedOwnerStacks++;
      return x(
        e,
        t,
        a,
        !1,
        l ? Error("react-stack-top-frame") : K,
        l ? J(g(e)) : ee
      );
    }, Z.jsxs = function(e, t, a) {
      var l = 1e4 > O.recentlyCreatedOwnerStacks++;
      return x(
        e,
        t,
        a,
        !0,
        l ? Error("react-stack-top-frame") : K,
        l ? J(g(e)) : ee
      );
    };
  })()), Z;
}
var ie;
function we() {
  return ie || (ie = 1, process.env.NODE_ENV === "production" ? re.exports = ge() : re.exports = pe()), re.exports;
}
var w = we();
const ye = (h = 1e3) => {
  const [R, _] = le(!1), g = y(R), s = y(h), f = y(0), m = y(null), v = j(() => {
    m.current !== null && (clearTimeout(m.current), m.current = null);
  }, []), k = j((I) => {
    I ? T() : v(), g.current = I, _(I), s.current = h;
  }, [h]), T = j(() => {
    v(), f.current = Date.now(), m.current = setTimeout(() => {
      k(!1), m.current = null;
    }, s.current);
  }, [s.current]), x = j(() => {
    k(!g.current);
  }, []), C = j(() => {
    k(!0);
  }, []), A = j(() => {
    k(!1);
  }, []), E = j(() => {
    if (m.current !== null) {
      const I = f.current ? Date.now() - f.current : 0;
      s.current = Math.max(s.current - I, 0), v();
    }
  }, []), D = j(() => {
    g.current && s.current > 0 && m.current === null && T();
  }, [T]), $ = j(() => {
    C(), E();
  }, []), F = j(() => {
    x(), g.current && E();
  }, [R]);
  return { visible: g.current, show: C, hide: A, pause: E, resume: D, toggle: x, still: $, toggleStill: F };
}, be = ue(({ src: h, srcSet: R, sizes: _, alt: g, className: s, width: f, height: m, loading: v, crossOrigin: k, ismap: T, useMap: x, referrerPolicy: C, onClick: A, onLoad: E, ref: D, ...$ }) => /* @__PURE__ */ w.jsx(
  "img",
  {
    ref: D,
    src: h,
    srcSet: R,
    sizes: _,
    alt: g,
    className: s,
    width: f,
    height: m,
    loading: v,
    crossOrigin: k,
    ismap: T,
    useMap: x,
    referrerPolicy: C,
    onClick: A,
    onLoad: E,
    ...$
  }
));
function Re({
  src: h,
  srcSet: R,
  sizes: _,
  alt: g,
  className: s,
  width: f,
  height: m,
  loading: v,
  crossOrigin: k,
  ismap: T,
  useMap: x,
  referrerPolicy: C,
  onClick: A,
  noModal: E,
  noPicture: D,
  noFitScreen: $,
  hideRotate: F,
  showDownload: I,
  ...te
}) {
  const P = y(!1);
  let N = y(void 0);
  const q = y(null), W = y(null), z = ye(1500), U = y(z), L = y(""), o = y(null), S = y(void 0), O = y(void 0), V = y(null), p = y(void 0), J = (r) => {
    P.current = r, G();
  }, Y = () => {
    J(!P.current);
  }, Q = () => {
    switch (p.current = p.current ?? M(), p.current.angle) {
      case 0:
        p.current.angle = 270;
        break;
      case 270:
        p.current.angle = 180;
        break;
      case 180:
        p.current.angle = 90;
        break;
      default:
        p.current.angle = 0;
        break;
    }
    e();
  }, K = (r) => {
    (r.key === "Escape" || r.key === "Esc" || r.key === "Enter") && Y();
  }, ee = (r) => {
    r.target !== o.current && r.target !== W.current && !W.current?.contains(r.target) && Y();
  }, G = () => {
    if (p.current = void 0, L.current = "", N.current && N.current.abort(), N.current = new AbortController(), P.current)
      try {
        o.current && (o.current.onclick = U.current.toggleStill), L.current = X(), b(o), o.current && (o.current.style.cssText = ""), window.matchMedia("(max-width: 768px)").matches && ($ ? p.current = M() : p.current = se()), a();
      } finally {
        U.current.show(), document.addEventListener("keydown", K, { signal: N.current.signal }), document.addEventListener("click", ee, { signal: N.current.signal });
      }
    if (!P.current)
      try {
        o.current && (o.current.onclick = Y), o.current && (o.current.style.cssText = L.current), b(o, "replaceClass", s);
      } finally {
        U.current.hide(), N.current && N.current.abort();
      }
    e();
  }, e = () => {
    P.current && (b(document.body, "addClass", "modal-image-body"), b(V, "removeClass", "hide"), b(q, "replaceClass", "modal-image-wrapper"), b(W, "removeClass", "hide"), p.current && (o.current?.style.setProperty("transform", `rotate(${p.current.angle}deg)`), a())), P.current || (b(V, "addClass", "hide"), b(q), b(W, "addClass", "hide"), O.current && o.current && (o.current.style.setProperty("width", O.current.width + "px"), o.current.style.setProperty("height", O.current.height + "px")), o.current?.style.removeProperty("transform"), b(document.body, "removeClass", "modal-image-body"));
  }, t = () => {
    let r = window.screen.orientation ? window.screen.orientation.type.startsWith("portrait") ? "portrait" : "landscape" : void 0;
    return r = void 0, r === void 0 && (window.innerWidth > window.innerHeight ? r = "landscape" : window.innerWidth < window.innerHeight ? r = "portrait" : r = "square"), r;
  }, a = () => {
    o.current && (o.current.style.removeProperty("width"), o.current.style.removeProperty("height"), o.current.style.setProperty("max-width", "none"), o.current.style.setProperty("max-height", "none"));
    const r = S.current?.width ?? o.current?.width ?? 0, i = S.current?.height ?? o.current?.height ?? 0, c = t(), n = M();
    n.type === "portrait" ? (c === "portrait" && (n.angle === 0 || n.angle === 180) && (i / r * window.innerWidth > window.innerHeight ? d("height", window.innerHeight) : d("width", window.innerWidth)), c === "portrait" && (n.angle === 90 || n.angle === 270) && d("height", window.innerWidth), c === "landscape" && (n.angle === 0 || n.angle === 180) && d("height", window.innerHeight), c === "landscape" && (n.angle === 90 || n.angle === 270) && (i / r * window.innerHeight > window.innerWidth ? d("height", window.innerWidth) : d("width", window.innerHeight))) : n.type === "landscape" ? (c === "portrait" && (n.angle === 0 || n.angle === 180) && d("width", window.innerWidth), c === "portrait" && (n.angle === 90 || n.angle === 270) && (window.innerWidth * (r / i) > window.innerHeight ? d("width", window.innerHeight) : d("height", window.innerWidth)), c === "landscape" && (n.angle === 0 || n.angle === 180) && (i / r * window.innerWidth > window.innerHeight ? d("height", window.innerHeight) : d("width", window.innerWidth)), c === "landscape" && (n.angle === 90 || n.angle === 270) && d("width", window.innerHeight)) : c === "portrait" ? d("width", window.innerWidth) : d("height", window.innerHeight);
  }, l = (r) => {
    S.current = {
      width: r.naturalWidth,
      height: r.naturalHeight
    };
    const i = () => getComputedStyle(r).getPropertyValue("width"), c = () => getComputedStyle(r).getPropertyValue("height");
    O.current = {
      width: parseInt(i()),
      height: parseInt(c())
    }, p.current = M();
  }, d = (r, i) => {
    switch (r) {
      case "width":
        o.current?.style.setProperty(r, i + "px"), o.current?.style.setProperty("height", "auto");
        break;
      case "height":
        o.current?.style.setProperty(r, i + "px"), o.current?.style.setProperty("width", "auto");
        break;
    }
  }, X = () => {
    let r = "";
    const i = o.current && getComputedStyle(o.current);
    if (i)
      for (let c = 0; c < i.length; c++) {
        let n = i[c], ne = i.getPropertyValue(n);
        r += n + ": " + ne + "; ";
      }
    return r;
  }, u = () => {
    const r = document.createElement("a");
    r.href = h, r.download = H(h), document.body.appendChild(r), r.click(), document.body.removeChild(r);
  }, H = (r) => {
    let i = r.split("/").pop();
    if (!i) {
      const c = /* @__PURE__ */ new Date(), n = c.getHours();
      i = `${c.toISOString().slice(0, 10)} at ${n}`;
    }
    return i;
  }, b = (r, i, c) => {
    let n;
    switch ("current" in r ? n = r.current : n = r, i) {
      case "add":
        n && (n.className += c ?? "");
        break;
      case "addClass":
        n && n.classList.add(c ?? "");
        break;
      case "removeClass":
        n && n.classList.remove(c ?? "");
        break;
      default:
        n && (n.className = c ?? "");
    }
  }, M = () => {
    let r = p.current ?? { type: void 0, angle: 0 };
    return S.current && (S.current.width > S.current.height ? r.type = "landscape" : S.current.width < S.current.height ? r.type = "portrait" : r.type = "square"), r;
  }, se = () => {
    let r = M();
    const i = t();
    switch (r.type) {
      case "portrait":
        i === "portrait" && (r.angle = 0), i === "landscape" && (r.angle = 270);
        break;
      case "landscape":
        i === "landscape" && (r.angle = 0), i === "portrait" && (r.angle = 90);
        break;
      case "square":
        r.angle = 0;
        break;
    }
    return r;
  };
  return de(() => {
    G();
  }, []), /* @__PURE__ */ w.jsxs(w.Fragment, { children: [
    /* @__PURE__ */ w.jsx("div", { ref: V, style: { width: O.current?.width, height: O.current?.height } }),
    /* @__PURE__ */ w.jsxs("figure", { ref: q, children: [
      /* @__PURE__ */ w.jsx(
        be,
        {
          ref: o,
          src: h,
          srcSet: R,
          sizes: _,
          alt: g,
          className: s,
          width: f,
          height: m,
          loading: v,
          ismap: T,
          crossOrigin: k,
          useMap: x,
          referrerPolicy: C,
          onClick: !T && !x && A ? A : !E && !P.current ? Y : void 0,
          onLoad: (r) => l(r.target),
          ...te
        }
      ),
      /* @__PURE__ */ w.jsxs("div", { ref: W, style: { ...!P.current && { display: "hidden" } }, children: [
        /* @__PURE__ */ w.jsxs("header", { style: { transform: z.visible ? "translateY(0)" : "translateY(-100%)" }, children: [
          I && /* @__PURE__ */ w.jsx("button", { type: "button", id: "orientation", onClick: u, children: /* @__PURE__ */ w.jsx(fe, {}) }),
          !F && /* @__PURE__ */ w.jsx("button", { type: "button", id: "orientation", onClick: Q, children: /* @__PURE__ */ w.jsx(he, {}) }),
          /* @__PURE__ */ w.jsx("button", { type: "button", id: "close", onClick: Y, children: /* @__PURE__ */ w.jsx(me, {}) })
        ] }),
        /* @__PURE__ */ w.jsx("footer", { ref: W, style: { transform: z.visible ? "translateY(0)" : "translateY(100%)" }, children: g })
      ] })
    ] })
  ] });
}
export {
  Re as ModalImage
};
