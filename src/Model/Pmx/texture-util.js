(function() {
    function a(a) {
        throw a
    }
    function Na(b) {
        eval.call(pa, b)
    }
    function Wa(a) {
        if (Xa == 1) return 1;
        var b = {
            "%i1": 1,
            "%i8": 1,
            "%i16": 2,
            "%i32": 4,
            "%i64": 8,
            "%float": 4,
            "%double": 8
        } ["%" + a];
        return b || (a[a.length - 1] == "*" ? b = Xa: a[0] == "i" && (a = parseInt(a.substr(1)), Ya(a % 8 == 0), b = a / 8)),
            b
    }
    function cb(a) {
        var b = q;
        return q += a,
            q = q + 3 >> 2 << 2,
            b
    }
    function db(a) {
        var b = eb;
        eb += a,
            eb = eb + 3 >> 2 << 2;
        if (eb >= fb) {
            for (; fb <= eb;) fb = 2 * fb + 4095 >> 12 << 12;
            var a = v,
                c = new ArrayBuffer(fb);
            v = new Int8Array(c),
                gb = new Int16Array(c),
                y = new Int32Array(c),
                z = new Uint8Array(c),
                A = new Uint16Array(c),
                C = new Uint32Array(c),
                lb = new Float32Array(c),
                mb = new Float64Array(c),
                v.set(a)
        }
        return b
    }
    function wb(b) {
        print(b + ":\n" + Error().stack),
            a("Assertion: " + b)
    }
    function Ya(a, b) {
        a || wb("Assertion failed: " + b)
    }
    function Wb(a, b, c) {
        c = c || "i8",
        c[c.length - 1] === "*" && (c = "i32");
        switch (c) {
            case "i1":
                v[a] = b;
                break;
            case "i8":
                v[a] = b;
                break;
            case "i16":
                gb[a >> 1] = b;
                break;
            case "i32":
                y[a >> 2] = b;
                break;
            case "i64":
                y[a >> 2] = b;
                break;
            case "float":
                lb[a >> 2] = b;
                break;
            case "double":
                Yb[0] = b,
                    y[a >> 2] = Zb[0],
                    y[a + 4 >> 2] = Zb[1];
                break;
            default:
                wb("invalid type for setValue: " + c)
        }
    }
    function G(a, b, c) {
        var d, e;
        typeof a == "number" ? (d = l, e = a) : (d = n, e = a.length);
        var f = typeof b == "string" ? b: pa,
            c = [ac, cb, db][c === aa ? D: c](Math.max(e, f ? 1 : b.length));
        if (d) return bc(c, 0, e),
            c;
        d = 0;
        for (var g; d < e;) {
            var h = a[d];
            typeof h == "function" && (h = ub.xa(h)),
                g = f || b[d],
                g === 0 ? d++:(g == "i64" && (g = "i32"), Wb(c + d, h, g), d += Wa(g))
        }
        return c
    }
    function Vb(a, b) {
        for (var c = typeof b == "undefined",
                 d = "",
                 e = 0,
                 f, g = String.fromCharCode(0);;) {
            f = String.fromCharCode(z[a + e]);
            if (c && f == g) break;
            d += f,
                e += 1;
            if (!c && e == b) break
        }
        return d
    }
    function nc(a) {
        for (; a.length > 0;) {
            var b = a.shift(),
                c = b.r;
            typeof c == "number" && (c = dc[c]),
                c(b.da === aa ? pa: b.da)
        }
    }
    function rc(a, b) {
        return Array.prototype.slice.call(v.subarray(a, a + b))
    }
    function sc(a) {
        for (var b = 0; v[a + b];) b++;
        return b
    }
    function tc(a, b) {
        var c = sc(a);
        b && c++;
        var d = rc(a, c);
        return b && (d[c - 1] = 0),
            d
    }
    function jc(a, b) {
        for (var c = [], d = 0; d < a.length;) {
            var e = a.charCodeAt(d);
            e > 255 && (e &= 255),
                c.push(e),
                d += 1
        }
        return b || c.push(0),
            c
    }
    function Nb(a, b, c) {
        for (var d = 0; d < a.length;) {
            var e = a.charCodeAt(d);
            e > 255 && (e &= 255),
                v[b + d] = e,
                d += 1
        }
        c || (v[b + d] = 0)
    }
    function uc(a, b) {
        return a >= 0 ? a: b <= 32 ? 2 * Math.abs(1 << b - 1) + a: Math.pow(2, b) + a
    }
    function vc(a, b) {
        if (a <= 0) return a;
        var c = b <= 32 ? Math.abs(1 << b - 1) : Math.pow(2, b - 1);
        return a >= c && (b <= 32 || a > c) && (a = -2 * c + a),
            a
    }
    function wc(a) {
        return a = a - 1 | 0,
            a = a >>> 16 | a,
            a = a >>> 8 | a,
            a = a >>> 4 | a,
            a = a >>> 2 | a,
        (a >>> 1 | a) + 1 | 0
    }
    function xc(a, b) {
        var c = M.O | 0,
            d = q;
        q += 512;
        for (var e = d | 0,
                 c = (vb = q, q += 12, y[vb >> 2] = c, y[vb + 4 >> 2] = b, y[vb + 8 >> 2] = a, vb), c = yc(M.G | 0, c), f = c.length, g = 0; g < f; g++) v[e + g] = c[g];
        v[e + g] = 0,
            f = (vb = q, q += 1, q = q + 3 >> 2 << 2, y[vb >> 2] = 0, vb),
            c = y[zc >> 2],
            g = yc(e, f),
            e = q,
            f = G(g, "i8", $b),
            g = g.length * 1,
        g != 0 && Dc(c, f, g) == -1 && Ec[c] && (Ec[c].error = l),
            q = e,
            q = d
    }
    function Fc(a, b, c, d, e) {
        var f, g, h = q;
        q += 4;
        var i = a + 4 | 0;
        g = (a + 8 | 0) >> 2,
        C[i >> 2] >>> 0 > C[g] >>> 0 && xc(M.H | 0, 2121),
        Math.floor(2147418112 / (d >>> 0)) >>> 0 > b >>> 0 || xc(M.T | 0, 2122);
        var j = C[g],
            k = j >>> 0 < b >>> 0;
        do {
            if (k) {
                var l = c ? ((b | 0) == 0 ? 0 : (b - 1 & b | 0) == 0) ? b: wc(b) : b; (l | 0) != 0 & l >>> 0 > j >>> 0 || xc(M.Y | 0, 2131);
                var m = l * d | 0;
                if ((e | 0) == 0) {
                    f = a | 0;
                    var n, o = y[f >> 2],
                        p = m,
                        r = h;
                    n = q,
                        q += 4,
                        (o & 7 | 0) == 0 ? p >>> 0 > 2147418112 ? (xc(M.m | 0, 2500), r = 0) : (y[n >> 2] = p, o = dc[y[Gc >> 2]](o, p, n, 1, y[Hc >> 2]), (r | 0) != 0 && (y[r >> 2] = y[n >> 2]), (o & 7 | 0) != 0 && xc(M.n | 0, 2552), r = o) : (xc(M.J | 0, 2500), r = 0),
                        q = n,
                        n = r;
                    if ((n | 0) == 0) {
                        l = 0;
                        break
                    }
                    y[f >> 2] = n
                } else {
                    n = Ic(m, h);
                    if ((n | 0) == 0) {
                        l = 0;
                        break
                    }
                    f = (a | 0) >> 2,
                        dc[e](n, y[f], y[i >> 2]),
                        r = y[f],
                    (r | 0) != 0 && Jc(r),
                        y[f] = n
                }
                f = C[h >> 2],
                    y[g] = f >>> 0 > m >>> 0 ? Math.floor((f >>> 0) / (d >>> 0)) : l
            }
            l = 1
        } while ( 0 );
        return q = h,
            l
    }
    function Ic(a, b) {
        var c = q;
        q += 4;
        var d = a + 3 & -4,
            d = (d | 0) == 0 ? 4 : d;
        if (d >>> 0 > 2147418112) xc(M.m | 0, 2500),
            d = 0;
        else {
            y[c >> 2] = d;
            var e = dc[y[Gc >> 2]](0, d, c, 1, y[Hc >> 2]),
                f = C[c >> 2]; (b | 0) != 0 && (y[b >> 2] = f),
                (e | 0) == 0 | f >>> 0 < d >>> 0 ? (xc(M.I | 0, 2500), d = 0) : ((e & 7 | 0) != 0 && xc(M.n | 0, 2527), d = e)
        }
        return q = c,
            d
    }
    function Jc(a) { (a | 0) != 0 && ((a & 7 | 0) == 0 ? dc[y[Gc >> 2]](a, 0, 0, 1, y[Hc >> 2]) : xc(M.K | 0, 2500))
    }
    function Kc(a, b, c, d) {
        var e, f, g, h, i = a >> 2,
            j = q;
        q += 200;
        var k;
        h = j >> 2;
        var l = j + 64;
        g = l >> 2;
        var m = j + 132,
            n = (b | 0) == 0 | d >>> 0 > 11;
        a: do
            if (n) var o = 0;
            else {
                y[i] = b,
                    bc(l, 0, 68);
                for (var p = 0;;) {
                    var r = z[c + p | 0];
                    if (r << 24 >> 24 != 0) {
                        var s = ((r & 255) << 2) + l | 0;
                        y[s >> 2] = y[s >> 2] + 1 | 0
                    }
                    var t = p + 1 | 0;
                    if ((t | 0) == (b | 0)) {
                        var u = 1,
                            w = -1,
                            x = 0,
                            B = 0,
                            D = 0;
                        break
                    }
                    p = t
                }
                for (;;) {
                    var E = C[(u << 2 >> 2) + g];
                    if ((E | 0) == 0) {
                        y[((u - 1 << 2) + 28 >> 2) + i] = 0;
                        var F = D,
                            G = B,
                            H = x,
                            I = w
                    } else {
                        var J = w >>> 0 < u >>> 0 ? w: u,
                            K = x >>> 0 > u >>> 0 ? x: u,
                            L = u - 1 | 0;
                        y[(L << 2 >> 2) + h] = D;
                        var N = E + D | 0,
                            O = 16 - u | 0;
                        y[((L << 2) + 28 >> 2) + i] = (N - 1 << O | (1 << O) - 1) + 1 | 0,
                            y[((L << 2) + 96 >> 2) + i] = B,
                            y[m + (u << 2) >> 2] = B,
                            F = N,
                            G = E + B | 0,
                            H = K,
                            I = J
                    }
                    var P = u + 1 | 0;
                    if ((P | 0) == 17) break;
                    u = P,
                        w = I,
                        x = H,
                        B = G,
                        D = F << 1
                }
                y[i + 1] = G,
                    f = (a + 172 | 0) >> 2;
                if (G >>> 0 > C[f] >>> 0) {
                    var Q = ((G | 0) == 0 ? 0 : (G - 1 & G | 0) == 0) ? G: b >>> 0 < wc(G) >>> 0 ? b: wc(G);
                    y[f] = Q;
                    var R = a + 176 | 0,
                        S = y[R >> 2];
                    if ((S | 0) == 0) var T = Q;
                    else Lc(S),
                        T = y[f];
                    var U, V = (T | 0) == 0 ? 1 : T,
                        W = Ic((V << 1) + 8 | 0, 0);
                    if ((W | 0) == 0) var X = 0;
                    else {
                        var Y = W + 8 | 0;
                        y[W + 4 >> 2] = V,
                            y[W >> 2] = V ^ -1,
                            X = Y
                    }
                    U = X,
                        y[R >> 2] = U;
                    if ((U | 0) == 0) {
                        o = 0;
                        break
                    }
                    var Z = R
                } else Z = a + 176 | 0;
                var $ = a + 24 | 0;
                v[$] = I & 255,
                    v[a + 25 | 0] = H & 255;
                for (var _ = 0;;) {
                    var ab = z[c + _ | 0],
                        bb = ab & 255;
                    if (ab << 24 >> 24 != 0) { (y[(bb << 2 >> 2) + g] | 0) == 0 && xc(M.Z | 0, 2274);
                        var cb = (bb << 2) + m | 0,
                            db = C[cb >> 2];
                        y[cb >> 2] = db + 1 | 0,
                        db >>> 0 < G >>> 0 || xc(M.$ | 0, 2278),
                            gb[y[Z >> 2] + (db << 1) >> 1] = _ & 65535
                    }
                    var eb = _ + 1 | 0;
                    if ((eb | 0) == (b | 0)) break;
                    _ = eb
                }
                var fb = z[$],
                    hb = (fb & 255) >>> 0 < d >>> 0 ? d: 0,
                    ib = a + 8 | 0;
                y[ib >> 2] = hb;
                var jb = (hb | 0) != 0;
                if (jb) {
                    var kb = 1 << hb,
                        lb = a + 164 | 0,
                        mb = kb >>> 0 > C[lb >> 2] >>> 0;
                    do
                        if (mb) {
                            y[lb >> 2] = kb;
                            var nb = a + 168 | 0,
                                ob = y[nb >> 2]; (ob | 0) != 0 && Mc(ob);
                            var pb, qb = (kb | 0) == 0 ? 1 : kb,
                                rb = Ic((qb << 2) + 8 | 0, 0);
                            if ((rb | 0) == 0) var sb = 0;
                            else {
                                var tb = rb + 8 | 0;
                                y[rb + 4 >> 2] = qb,
                                    y[rb >> 2] = qb ^ -1,
                                    sb = tb
                            }
                            pb = sb,
                                y[nb >> 2] = pb;
                            if ((pb | 0) == 0) {
                                o = 0;
                                break a
                            }
                            bc(pb, -1, kb << 2),
                                (hb | 0) == 0 ? k = 26 : (vb = nb, k = 34)
                        } else {
                            var ub = a + 168 | 0;
                            bc(y[ub >> 2], -1, kb << 2);
                            var vb = ub;
                            k = 34
                        }
                    while (0);
                    b: do
                        if (k == 34) for (var wb = 1;;) {
                            var xb = (y[(wb << 2 >> 2) + g] | 0) == 0;
                            c: do
                                if (!xb) {
                                    var yb = hb - wb | 0,
                                        zb = 1 << yb,
                                        Ab = wb - 1 | 0,
                                        Bb = C[(Ab << 2 >> 2) + h],
                                        Cb,
                                        Db = a,
                                        Eb = wb; (Eb | 0) != 0 & Eb >>> 0 < 17 || xc(M.W | 0, 1954);
                                    var Fb = y[Db + (Eb - 1 << 2) + 28 >> 2];
                                    Cb = (Fb | 0) == 0 ? -1 : (Fb - 1 | 0) >>> ((16 - Eb | 0) >>> 0);
                                    if (Bb >>> 0 <= Cb >>> 0) for (var Gb = y[((Ab << 2) + 96 >> 2) + i] - Bb | 0, Hb = wb << 16, Ib = Bb;;) {
                                        var Jb = A[y[Z >> 2] + (Gb + Ib << 1) >> 1] & 65535; (z[c + Jb | 0] & 255 | 0) != (wb | 0) && xc(M.aa | 0, 2320);
                                        for (var Kb = Ib << yb,
                                                 Lb = Jb | Hb,
                                                 Mb = 0;;) {
                                            var Nb = Mb + Kb | 0;
                                            Nb >>> 0 < kb >>> 0 || xc(M.ba | 0, 2326);
                                            var Ob = C[vb >> 2];
                                            if ((y[Ob + (Nb << 2) >> 2] | 0) == -1) var Pb = Ob;
                                            else xc(M.ca | 0, 2328),
                                                Pb = y[vb >> 2];
                                            y[Pb + (Nb << 2) >> 2] = Lb;
                                            var Qb = Mb + 1 | 0;
                                            if (Qb >>> 0 >= zb >>> 0) break;
                                            Mb = Qb
                                        }
                                        var Rb = Ib + 1 | 0;
                                        if (Rb >>> 0 > Cb >>> 0) break c;
                                        Ib = Rb
                                    }
                                }
                            while (0);
                            var Sb = wb + 1 | 0;
                            if (Sb >>> 0 > hb >>> 0) break b;
                            wb = Sb
                        }
                    while (0);
                    var Tb = v[$]
                } else Tb = fb;
                var Ub = a + 96 | 0;
                y[Ub >> 2] = y[Ub >> 2] - y[h] | 0;
                var Vb = a + 100 | 0;
                y[Vb >> 2] = y[Vb >> 2] - y[h + 1] | 0;
                var Wb = a + 104 | 0;
                y[Wb >> 2] = y[Wb >> 2] - y[h + 2] | 0;
                var Xb = a + 108 | 0;
                y[Xb >> 2] = y[Xb >> 2] - y[h + 3] | 0;
                var Yb = a + 112 | 0;
                y[Yb >> 2] = y[Yb >> 2] - y[h + 4] | 0;
                var Zb = a + 116 | 0;
                y[Zb >> 2] = y[Zb >> 2] - y[h + 5] | 0;
                var $b = a + 120 | 0;
                y[$b >> 2] = y[$b >> 2] - y[h + 6] | 0;
                var _b = a + 124 | 0;
                y[_b >> 2] = y[_b >> 2] - y[h + 7] | 0;
                var ac = a + 128 | 0;
                y[ac >> 2] = y[ac >> 2] - y[h + 8] | 0;
                var cc = a + 132 | 0;
                y[cc >> 2] = y[cc >> 2] - y[h + 9] | 0;
                var dc = a + 136 | 0;
                y[dc >> 2] = y[dc >> 2] - y[h + 10] | 0;
                var ec = a + 140 | 0;
                y[ec >> 2] = y[ec >> 2] - y[h + 11] | 0;
                var fc = a + 144 | 0;
                y[fc >> 2] = y[fc >> 2] - y[h + 12] | 0;
                var gc = a + 148 | 0;
                y[gc >> 2] = y[gc >> 2] - y[h + 13] | 0;
                var hc = a + 152 | 0;
                y[hc >> 2] = y[hc >> 2] - y[h + 14] | 0;
                var ic = a + 156 | 0;
                y[ic >> 2] = y[ic >> 2] - y[h + 15] | 0;
                var jc = a + 16 | 0;
                y[jc >> 2] = 0,
                    e = (a + 20 | 0) >> 2,
                    y[e] = Tb & 255;
                b: do
                    if (jb) {
                        for (var kc = hb;;) {
                            if ((kc | 0) == 0) break b;
                            var lc = kc - 1 | 0;
                            if ((y[(kc << 2 >> 2) + g] | 0) != 0) break;
                            kc = lc
                        }
                        y[jc >> 2] = y[((lc << 2) + 28 >> 2) + i];
                        for (var mc = hb + 1 | 0,
                                 nc = y[e] = mc;;) {
                            if (nc >>> 0 > H >>> 0) break b;
                            if ((y[(nc << 2 >> 2) + g] | 0) != 0) break;
                            nc = nc + 1 | 0
                        }
                        y[e] = nc
                    }
                while (0);
                y[i + 23] = -1,
                    y[i + 40] = 1048575,
                    y[i + 3] = 32 - y[ib >> 2] | 0,
                    o = 1
            }
        while (0);
        return q = j,
            o
    }
    function Lc(a) {
        var b; (a | 0) != 0 && (b = y[a - 4 >> 2], a = a - 8 | 0, b = (b | 0) == 0 ? 4 : (b | 0) == (y[a >> 2] ^ -1 | 0) ? 5 : 4, b == 4 && xc(M.p | 0, 645), Jc(a))
    }
    function Mc(a) {
        var b; (a | 0) != 0 && (b = y[a - 4 >> 2], a = a - 8 | 0, b = (b | 0) == 0 ? 4 : (b | 0) == (y[a >> 2] ^ -1 | 0) ? 5 : 4, b == 4 && xc(M.p | 0, 645), Jc(a))
    }
    function Nc(a) {
        return (z[a | 0] & 255) << 8 | z[a + 1 | 0] & 255
    }
    function Oc(a) {
        return (z[a + 1 | 0] & 255) << 16 | (z[a | 0] & 255) << 24 | z[a + 3 | 0] & 255 | (z[a + 2 | 0] & 255) << 8
    }
    function Pc(a) {
        return z[a | 0] & 255
    }
    function Qc(a) {
        return z[a + 2 | 0] & 255 | (z[a | 0] & 255) << 16 | (z[a + 1 | 0] & 255) << 8
    }
    function Rc(a, b) {
        if (a == 0 && b == 0 || a == 9 && b == 0) var c = 4;
        else a == 1 && b == 0 || a == 2 && b == 0 || a == 7 && b == 0 || a == 8 && b == 0 || a == 3 && b == 0 || a == 4 && b == 0 || a == 5 && b == 0 || a == 6 && b == 0 ? c = 8 : (xc(M.M | 0, 2664), c = 0);
        return c
    }
    function Sc(a, b) {
        return (a | 0) == 0 | b >>> 0 < 74 ? 0 : (Nc(a) | 0) != 18552 ? 0 : Nc(a + 2 | 0) >>> 0 < 74 ? 0 : Oc(a + 6 | 0) >>> 0 > b >>> 0 ? 0 : a
    }
    function Tc(a, b, c) {
        var d = c >> 2;
        return (a | 0) == 0 | b >>> 0 < 74 | (c | 0) == 0 ? d = 0 : (y[d] | 0) != 40 ? d = 0 : (a = Sc(a, b), (a | 0) == 0 ? d = 0 : (y[d + 1] = Nc(a + 12 | 0), y[d + 2] = Nc(a + 14 | 0), y[d + 3] = Pc(a + 16 | 0), y[d + 4] = Pc(a + 17 | 0), b = a + 18 | 0, c = c + 32 | 0, y[c >> 2] = Pc(b), y[c + 4 >> 2] = 0, c = Pc(b), y[d + 5] = (c | 0) == 0 ? 8 : (c | 0) == 9 ? 8 : 16, y[d + 6] = Oc(a + 25 | 0), y[d + 7] = Oc(a + 29 | 0), d = 1)),
            d
    }
    function Uc(a) {
        y[a >> 2] = 0;
        var b = a + 4 | 0;
        y[b >> 2] = 0,
            y[b + 4 >> 2] = 0,
            y[b + 8 >> 2] = 0,
            v[b + 12 | 0] = 0,
            y[a + 20 >> 2] = 0
    }
    function Vc(a) {
        var b = y[a + 20 >> 2]; (b | 0) != 0 && (b | 0) != 0 && (Wc(b), Jc(b)),
            Xc(a + 4 | 0)
    }
    function Xc(a) {
        var b = a | 0,
            c = y[b >> 2];
        if ((c | 0) != 0) {
            var d = a + 4 | 0;
            Jc(c),
                y[b >> 2] = 0,
                y[d >> 2] = 0,
                y[a + 8 >> 2] = 0
        }
        v[a + 12 | 0] = 0
    }
    function Yc(a, b) {
        var c;
        c = (a + 4 | 0) >> 2;
        var d = C[c],
            e = (d | 0) == (b | 0);
        do
            if (e) var f = 1;
            else {
                if (d >>> 0 <= b >>> 0) {
                    if (C[a + 8 >> 2] >>> 0 < b >>> 0) {
                        f = a,
                            Fc(f, b, (d + 1 | 0) == (b | 0), 1, 0) ? f = 1 : (v[f + 12 | 0] = 1, f = 0);
                        if (!f) {
                            f = 0;
                            break
                        }
                        f = y[c]
                    } else f = d;
                    bc(y[a >> 2] + f | 0, 0, b - f | 0)
                }
                y[c] = b,
                    f = 1
            }
        while (0);
        return f
    }
    function Zc(a, b) {
        return C[a + 4 >> 2] >>> 0 > b >>> 0 || xc(M.g | 0, 904),
        y[a >> 2] + b | 0
    }
    function $c(a) {
        var b = a + 4 | 0,
            c = y[b + 4 >> 2]; (c | 0) != 0 & c >>> 0 < 8193 || xc(M.N | 0, 2998);
        var d = a | 0;
        y[d >> 2] = c;
        var e = a + 20 | 0,
            f = C[e >> 2]; (f | 0) == 0 ? (c = Ic(180, 0), (c | 0) == 0 ? c = 0 : (c | 0) == 0 ? c = 0 : (y[c + 164 >> 2] = 0, y[c + 168 >> 2] = 0, y[c + 172 >> 2] = 0, y[c + 176 >> 2] = 0), e = y[e >> 2] = c, d = y[d >> 2]) : (e = f, d = c);
        var b = Zc(b, 0),
            a = C[a >> 2],
            g;
        if (a >>> 0 > 16) {
            c = a >>> 0 > 1;
            a: do
                if (c) for (var h = 0,
                                f = a;;) {
                    h = h + 1 | 0;
                    if (f >>> 0 <= 3) {
                        g = h;
                        break a
                    }
                    f >>>= 1
                } else g = 0;
            while (0);
            g = (g | 0) == 32 ? 32 : (1 << g >>> 0 < a >>> 0 & 1) + g | 0,
                g = ((g + 1 | 0) >>> 0 < 11 ? g + 1 | 0 : 11) & 255
        } else g = 0;
        return Kc(e, d, b, g)
    }
    function ad(a, b) {
        if ((b | 0) == 0) var c = 0;
        else if (b >>> 0 > 16) var c = bd(a, b - 16 | 0),
            d = bd(a, 16),
            c = c << 16 | d;
        else c = bd(a, b);
        return c
    }
    function R(a, b) {
        var c, d, e, f;
        e = C[b + 20 >> 2] >> 2,
            d = (a + 20 | 0) >> 2;
        var g = C[d];
        if ((g | 0) < 24) {
            c = (a + 4 | 0) >> 2;
            var h = C[c],
                i = C[a + 8 >> 2];
            f = h >>> 0 < i >>> 0,
                (g | 0) < 16 ? (f ? (f = h + 1 | 0, h = (z[h] & 255) << 8) : (f = h, h = 0), f >>> 0 < i >>> 0 ? (i = f + 1 | 0, f = z[f] & 255) : (i = f, f = 0), y[c] = i, y[d] = g + 16 | 0, c = a + 16 | 0, g = (f | h) << 16 - g | y[c >> 2]) : (f ? (y[c] = h + 1 | 0, h = z[h] & 255) : h = 0, y[d] = g + 8 | 0, c = a + 16 | 0, g = h << 24 - g | y[c >> 2]),
                y[c >> 2] = g
        } else g = y[a + 16 >> 2];
        c = a + 16 | 0,
            h = (g >>> 16) + 1 | 0,
            i = h >>> 0 > C[e + 4] >>> 0;
        do
            if (i) {
                f = C[e + 5];
                var j = f - 1 | 0,
                    k = h >>> 0 > C[((j << 2) + 28 >> 2) + e] >>> 0;
                a: do
                    if (k) for (var l = f;;) {
                        var m = l + 1 | 0;
                        if (h >>> 0 <= C[((l << 2) + 28 >> 2) + e] >>> 0) {
                            var n = m,
                                o = l;
                            break a
                        }
                        l = m
                    } else n = f,
                        o = j;
                while (0);
                f = (g >>> ((32 - n | 0) >>> 0)) + y[((o << 2) + 96 >> 2) + e] | 0;
                if (f >>> 0 < C[b >> 2] >>> 0) q = n,
                    r = A[y[e + 44] + (f << 1) >> 1] & 65535,
                    f = 22;
                else {
                    xc(M.o | 0, 3267);
                    var p = 0;
                    f = 23
                }
            } else {
                q = C[y[e + 42] + (g >>> ((32 - y[e + 2] | 0) >>> 0) << 2) >> 2],
                (q | 0) == -1 && xc(M.R | 0, 3245),
                    r = q & 65535,
                    q >>>= 16,
                    f = b + 4 | 0,
                    j = r,
                C[f + 4 >> 2] >>> 0 > j >>> 0 || xc(M.g | 0, 903);
                if ((z[y[f >> 2] + j | 0] & 255 | 0) == (q | 0)) var q = q,
                    r = r;
                else xc(M.S | 0, 3249);
                f = 22
            }
        while (0);
        return f == 22 && (y[c >> 2] = y[c >> 2] << q, y[d] = y[d] - q | 0, p = r),
            p
    }
    function cd(a, b, c) {
        return (c | 0) == 0 ? a = 0 : (y[a >> 2] = b, y[a + 4 >> 2] = b, y[a + 12 >> 2] = c, y[a + 8 >> 2] = b + c | 0, y[a + 16 >> 2] = 0, y[a + 20 >> 2] = 0, a = 1),
            a
    }
    function bd(a, b) {
        var c;
        b >>> 0 < 33 || xc(M.P | 0, 3191),
            c = (a + 20 | 0) >> 2;
        var d = C[c],
            e = (d | 0) < (b | 0);
        a: do
            if (e) for (var f = a + 4 | 0,
                            g = a + 8 | 0,
                            h = a + 16 | 0,
                            i = d;;) {
                var j = y[f >> 2]; (j | 0) == (y[g >> 2] | 0) ? j = 0 : (y[f >> 2] = j + 1 | 0, j = z[j] & 255),
                    i = i + 8 | 0,
                    y[c] = i,
                (i | 0) >= 33 && (xc(M.Q | 0, 3200), i = y[c]),
                    j = j << 32 - i | y[h >> 2],
                    y[h >> 2] = j;
                if ((i | 0) >= (b | 0)) {
                    var k = i,
                        l = j;
                    break a
                }
            } else k = d,
                l = y[a + 16 >> 2];
        while (0);
        return y[a + 16 >> 2] = l << b,
            y[c] = k - b | 0,
        l >>> ((32 - b | 0) >>> 0)
    }
    function dd(a, b) {
        var c, d = q;
        q += 24;
        a: do
            for (var e = 0,
                     f = 8192;;) {
                f >>>= 1,
                    e = e + 1 | 0;
                if ((f | 0) == 0) {
                    c = e;
                    break a
                }
            }
        while (0);
        c = ad(a, c),
            e = (c | 0) == 0;
        do
            if (e) {
                f = b,
                    y[f >> 2] = 0,
                    Xc(f + 4 | 0);
                var f = f + 20 | 0,
                    g = y[f >> 2]; (g | 0) != 0 && ((g | 0) != 0 && (Wc(g), Jc(g)), y[f >> 2] = 0),
                    f = 1
            } else {
                f = b + 4 | 0;
                if (Yc(f, c)) {
                    g = Zc(f, 0),
                        bc(g, 0, c),
                        g = ad(a, 5);
                    if ((g | 0) == 0 | g >>> 0 > 21) f = 0;
                    else {
                        Uc(d);
                        var h = d + 4 | 0,
                            i = Yc(h, 21);
                        a: do
                            if (i) {
                                for (var j = 0;;) {
                                    var k = ad(a, 3),
                                        l = Zc(h, z[M.C + j | 0] & 255);
                                    v[l] = k & 255,
                                        j = j + 1 | 0;
                                    if ((j | 0) == (g | 0)) break
                                }
                                if ($c(d)) {
                                    j = 0;
                                    b: for (;;) {
                                        for (var l = j >>> 0 < c >>> 0,
                                                 k = c - j | 0,
                                                 m = (j | 0) == 0, n = j - 1 | 0;;) {
                                            if (!l) {
                                                if ((j | 0) != (c | 0)) {
                                                    t = 0;
                                                    break a
                                                }
                                                t = $c(b);
                                                break a
                                            }
                                            var o = R(a, d);
                                            if (o >>> 0 < 17) {
                                                k = Zc(f, j),
                                                    v[k] = o & 255,
                                                    j = j + 1 | 0;
                                                continue b
                                            }
                                            if ((o | 0) == 17) {
                                                l = ad(a, 3) + 3 | 0;
                                                if (l >>> 0 > k >>> 0) {
                                                    t = 0;
                                                    break a
                                                }
                                                j = l + j | 0;
                                                continue b
                                            }
                                            if ((o | 0) == 18) {
                                                l = ad(a, 7) + 11 | 0;
                                                if (l >>> 0 > k >>> 0) {
                                                    t = 0;
                                                    break a
                                                }
                                                j = l + j | 0;
                                                continue b
                                            }
                                            if ((o - 19 | 0) >>> 0 >= 2) {
                                                xc(M.o | 0, 3141),
                                                    t = 0;
                                                break a
                                            }
                                            o = (o | 0) == 19 ? ad(a, 2) + 3 | 0 : ad(a, 6) + 7 | 0;
                                            if (m | o >>> 0 > k >>> 0) {
                                                t = 0;
                                                break a
                                            }
                                            var p = Zc(f, n),
                                                p = z[p];
                                            if (p << 24 >> 24 == 0) {
                                                t = 0;
                                                break a
                                            }
                                            var r = o + j | 0;
                                            if (j >>> 0 < r >>> 0) {
                                                var s = j;
                                                break
                                            }
                                        }
                                        for (;;) {
                                            k = Zc(f, s),
                                                l = s + 1 | 0,
                                                v[k] = p;
                                            if ((l | 0) == (r | 0)) {
                                                j = r;
                                                continue b
                                            }
                                            s = l
                                        }
                                    }
                                } else var t = 0
                            } else t = 0;
                        while (0);
                        Vc(d),
                            f = t
                    }
                } else f = 0
            }
        while (0);
        return q = d,
            f
    }
    function ed(a, b, c, d, e, f, g) {
        var h = a + 88 | 0,
            i = C[h >> 2],
            j = ((Nc(i + 12 | 0) >>> (g >>> 0) >>> 0 > 1 ? Nc(i + 12 | 0) >>> (g >>> 0) : 1) + 3 | 0) >>> 2,
            g = ((Nc(i + 14 | 0) >>> (g >>> 0) >>> 0 > 1 ? Nc(i + 14 | 0) >>> (g >>> 0) : 1) + 3 | 0) >>> 2,
            i = Pc(i + 18 | 0),
            i = ((i | 0) == 0 ? 8 : (i | 0) == 9 ? 8 : 16) * j | 0;
        if ((f | 0) == 0) var k = i,
            f = 5;
        else if (i >>> 0 <= f >>> 0 & (f & 3 | 0) == 0) k = f,
            f = 5;
        else var l = 0,
                f = 12;
        return f == 5 && ((k * g | 0) >>> 0 > e >>> 0 ? l = 0 : (e = (j + 1 | 0) >>> 1, l = (g + 1 | 0) >>> 1, cd(a + 92 | 0, b, c) ? (b = Pc(y[h >> 2] + 18 | 0), (b | 0) == 0 ? (fd(a, d, 0, k, j, g, e, l), l = 1) : (b | 0) == 2 || (b | 0) == 3 || (b | 0) == 5 || (b | 0) == 6 || (b | 0) == 4 ? (gd(a, d, 0, k, j, g, e, l), l = 1) : (b | 0) == 9 ? (hd(a, d, 0, k, j, g, e, l), l = 1) : (b | 0) == 7 || (b | 0) == 8 ? (id(a, d, 0, k, j, g, e, l), l = 1) : l = 0) : l = 0)),
            l
    }
    function ld(a) {
        y[a >> 2] = 0,
            y[a + 4 >> 2] = 0,
            y[a + 8 >> 2] = 0,
            v[a + 12 | 0] = 0
    }
    function kd(a) {
        y[a >> 2] = 0,
            y[a + 4 >> 2] = 0,
            y[a + 8 >> 2] = 0,
            v[a + 12 | 0] = 0
    }
    function jd(a) {
        y[a >> 2] = 40
    }
    function rd(a) {
        var b = a | 0,
            c = y[b >> 2];
        if ((c | 0) != 0) {
            var d = a + 4 | 0;
            Jc(c),
                y[b >> 2] = 0,
                y[d >> 2] = 0,
                y[a + 8 >> 2] = 0
        }
        v[a + 12 | 0] = 0
    }
    function sd(a) {
        var b = a | 0,
            c = y[b >> 2];
        if ((c | 0) != 0) {
            var d = a + 4 | 0;
            Jc(c),
                y[b >> 2] = 0,
                y[d >> 2] = 0,
                y[a + 8 >> 2] = 0
        }
        v[a + 12 | 0] = 0
    }
    function Wc(a) {
        var b = y[a + 168 >> 2]; (b | 0) != 0 && Mc(b),
            a = y[a + 176 >> 2],
        (a | 0) != 0 && Lc(a)
    }
    function fd(a, b, c, d, e, f, g, h) {
        var i, j, k, l, m, n = q;
        q += 24,
            m = n >> 2;
        var o = n + 4;
        l = o >> 2;
        var c = n + 8 >> 2,
            p = a + 236 | 0,
            r = y[p + 4 >> 2],
            s = a + 252 | 0,
            t = y[s + 4 >> 2];
        y[m] = 0,
            y[l] = 0;
        var u = Pc(y[a + 88 >> 2] + 17 | 0),
            v = d >>> 2,
            w = (u | 0) == 0;
        a: do
            if (!w) for (var x = (h | 0) == 0, A = h - 1 | 0, B = (f & 1 | 0) != 0, D = d << 1, E = a + 92 | 0, F = a + 116 | 0, G = a + 188 | 0, H = v + 1 | 0, I = v + 2 | 0, J = v + 3 | 0, K = g - 1 | 0, L = a + 140 | 0, N = K << 4, O = (e & 1 | 0) != 0, P = 0, Q = 1;;) {
                b: do
                    if (x) var S = Q;
                    else for (var T = y[b + (P << 2) >> 2], U = 0, V = Q;;) {
                        if ((U & 1 | 0) == 0) var W = T,
                            X = 16,
                            Y = 1,
                            Z = g,
                            $ = 0;
                        else W = T + N | 0,
                            X = -16,
                            Z = Y = -1,
                            $ = K;
                        var _ = (U | 0) == (A | 0),
                            ab = _ & B,
                            bb = ($ | 0) == (Z | 0);
                        c: do
                            if (bb) var cb = V;
                            else {
                                var db = _ & B ^ 1,
                                    eb = V,
                                    fb = W;
                                k = fb >> 2;
                                for (var gb = $;;) {
                                    var hb = (eb | 0) == 1 ? R(E, F) | 512 : eb,
                                        eb = hb & 7,
                                        hb = hb >>> 3;
                                    j = z[M.f + eb | 0] & 255;
                                    for (var ib = 0,
                                             jb = y[m];;) {
                                        var kb = R(E, L);
                                        y[m] = jb + kb | 0,
                                            td(n, r),
                                            jb = C[m],
                                            kb = ud(p, jb),
                                            y[(ib << 2 >> 2) + c] = y[kb >> 2],
                                            ib = ib + 1 | 0;
                                        if (ib >>> 0 >= j >>> 0) break
                                    }
                                    ib = (gb | 0) == (K | 0) & O,
                                        j = fb >> 2,
                                        jb = ab | ib;
                                    d: do
                                        if (jb) for (kb = 0;;) {
                                            var lb = kb * d | 0;
                                            i = lb >> 2;
                                            var mb = fb + lb | 0,
                                                nb = (kb | 0) == 0 | db,
                                                ob = kb << 1,
                                                pb = R(E, G);
                                            y[l] = y[l] + pb | 0,
                                                td(o, t),
                                                ib ? (nb && (y[mb >> 2] = y[((z[(eb << 2) + vd + ob | 0] & 255) << 2 >> 2) + c], ob = ud(s, y[l]), y[i + (k + 1)] = y[ob >> 2]), i = R(E, G), y[l] = y[l] + i | 0, td(o, t)) : nb ? (y[mb >> 2] = y[((z[(eb << 2) + vd + ob | 0] & 255) << 2 >> 2) + c], mb = ud(s, y[l]), y[i + (k + 1)] = y[mb >> 2], lb = lb + (fb + 8) | 0, mb = R(E, G), y[l] = y[l] + mb | 0, td(o, t), y[lb >> 2] = y[((z[(eb << 2) + vd + (ob | 1) | 0] & 255) << 2 >> 2) + c], ob = ud(s, y[l]), y[i + (k + 3)] = y[ob >> 2]) : (i = R(E, G), y[l] = y[l] + i | 0, td(o, t)),
                                                kb = kb + 1 | 0;
                                            if ((kb | 0) == 2) break d
                                        } else y[j] = y[((z[(eb << 2) + vd | 0] & 255) << 2 >> 2) + c],
                                            kb = R(E, G),
                                            y[l] = y[l] + kb | 0,
                                            td(o, t),
                                            kb = ud(s, y[l]),
                                            y[k + 1] = y[kb >> 2],
                                            y[k + 2] = y[((z[(eb << 2) + vd + 1 | 0] & 255) << 2 >> 2) + c],
                                            kb = R(E, G),
                                            y[l] = y[l] + kb | 0,
                                            td(o, t),
                                            kb = ud(s, y[l]),
                                            y[k + 3] = y[kb >> 2],
                                            y[(v << 2 >> 2) + j] = y[((z[(eb << 2) + vd + 2 | 0] & 255) << 2 >> 2) + c],
                                            kb = R(E, G),
                                            y[l] = y[l] + kb | 0,
                                            td(o, t),
                                            kb = ud(s, y[l]),
                                            y[(H << 2 >> 2) + j] = y[kb >> 2],
                                            y[(I << 2 >> 2) + j] = y[((z[(eb << 2) + vd + 3 | 0] & 255) << 2 >> 2) + c],
                                            kb = R(E, G),
                                            y[l] = y[l] + kb | 0,
                                            td(o, t),
                                            kb = ud(s, y[l]),
                                            y[(J << 2 >> 2) + j] = y[kb >> 2];
                                    while (0);
                                    gb = gb + Y | 0;
                                    if ((gb | 0) == (Z | 0)) {
                                        cb = hb;
                                        break c
                                    }
                                    eb = hb,
                                        fb = fb + X | 0,
                                        k = fb >> 2
                                }
                            }
                        while (0);
                        k = U + 1 | 0;
                        if ((k | 0) == (h | 0)) {
                            S = cb;
                            break b
                        }
                        T = T + D | 0,
                            U = k,
                            V = cb
                    }
                while (0);
                P = P + 1 | 0;
                if ((P | 0) == (u | 0)) break a;
                Q = S
            }
        while (0);
        return q = n,
            1
    }
    function qd(a) {
        y[a >> 2] = 0,
            sd(a + 284 | 0),
            sd(a + 268 | 0),
            rd(a + 252 | 0),
            rd(a + 236 | 0);
        var b = a + 188 | 0;
        Vc(a + 212 | 0),
            Vc(b),
            b = a + 140 | 0,
            Vc(a + 164 | 0),
            Vc(b),
            Vc(a + 116 | 0)
    }
    function td(a, b) {
        var c = y[a >> 2],
            d = c - b | 0,
            e = d >> 31;
        y[a >> 2] = e & c | d & (e ^ -1)
    }
    function gd(a, b, c, d, e, f, g, h) {
        var i, j, k, l, m, n, o, p, r = q;
        q += 48,
            p = r >> 2;
        var s = r + 4;
        o = s >> 2;
        var t = r + 8;
        n = t >> 2;
        var u = r + 12;
        m = u >> 2,
            l = r + 16 >> 2;
        var c = r + 32 >> 2,
            v = a + 236 | 0,
            w = y[v + 4 >> 2],
            x = a + 252 | 0,
            B = y[x + 4 >> 2],
            D = a + 268 | 0,
            E = y[D + 4 >> 2],
            F = y[a + 88 >> 2],
            G = Nc(F + 63 | 0);
        y[p] = 0,
            y[o] = 0,
            y[n] = 0,
            y[m] = 0;
        var F = Pc(F + 17 | 0),
            H = (F | 0) == 0;
        a: do
            if (!H) for (var I = (h | 0) == 0, J = h - 1 | 0, K = (f & 1 | 0) == 0, L = d << 1, N = a + 92 | 0, O = a + 116 | 0, P = a + 212 | 0, Q = a + 188 | 0, S = a + 284 | 0, T = a + 140 | 0, U = a + 164 | 0, V = g - 1 | 0, W = V << 5, X = (e & 1 | 0) != 0, Y = 0, Z = 1;;) {
                b: do
                    if (I) var $ = Z;
                    else for (var _ = y[b + (Y << 2) >> 2], ab = 0, bb = Z;;) {
                        if ((ab & 1 | 0) == 0) var cb = _,
                            db = 32,
                            eb = 1,
                            fb = g,
                            gb = 0;
                        else cb = _ + W | 0,
                            db = -32,
                            fb = eb = -1,
                            gb = V;
                        var hb = K | (ab | 0) != (J | 0),
                            ib = (gb | 0) == (fb | 0);
                        c: do
                            if (ib) var jb = bb;
                            else for (var kb = bb,
                                          lb = cb,
                                          mb = gb;;) {
                                var nb = (kb | 0) == 1 ? R(N, O) | 512 : kb,
                                    kb = nb & 7,
                                    nb = nb >>> 3;
                                k = z[M.f + kb | 0] & 255;
                                for (var ob = 0,
                                         pb = y[n];;) {
                                    var qb = R(N, U);
                                    y[n] = pb + qb | 0,
                                        td(t, E),
                                        pb = C[n],
                                        qb = wd(D, pb),
                                        y[(ob << 2 >> 2) + c] = A[qb >> 1] & 65535,
                                        ob = ob + 1 | 0;
                                    if (ob >>> 0 >= k >>> 0) break
                                }
                                ob = 0;
                                for (pb = y[p];;) {
                                    qb = R(N, T),
                                        y[p] = pb + qb | 0,
                                        td(r, w),
                                        pb = C[p],
                                        qb = ud(v, pb),
                                        y[(ob << 2 >> 2) + l] = y[qb >> 2],
                                        ob = ob + 1 | 0;
                                    if (ob >>> 0 >= k >>> 0) break
                                }
                                ob = (mb | 0) == (V | 0) & X,
                                    pb = lb,
                                    k = pb >> 2;
                                for (qb = 0;;) {
                                    var rb = (qb | 0) == 0 | hb;
                                    i = qb << 1,
                                        j = R(N, P),
                                        y[m] = y[m] + j | 0,
                                        td(u, G),
                                        j = R(N, Q),
                                        y[o] = y[o] + j | 0,
                                        td(s, B);
                                    if (rb) {
                                        var sb = pb,
                                            tb = z[(kb << 2) + vd + i | 0] & 255;
                                        j = wd(S, y[m] * 3 | 0) >> 1,
                                            y[sb >> 2] = (A[j] & 65535) << 16 | y[(tb << 2 >> 2) + c],
                                            y[k + 1] = (A[j + 2] & 65535) << 16 | A[j + 1] & 65535,
                                            y[k + 2] = y[(tb << 2 >> 2) + l],
                                            j = ud(x, y[o]),
                                            y[k + 3] = y[j >> 2]
                                    }
                                    j = R(N, P),
                                        y[m] = y[m] + j | 0,
                                        td(u, G),
                                        j = R(N, Q),
                                        y[o] = y[o] + j | 0,
                                        td(s, B),
                                    ob | rb ^ 1 || (rb = pb + 16 | 0, j = z[(kb << 2) + vd + (i | 1) | 0] & 255, i = wd(S, y[m] * 3 | 0) >> 1, y[rb >> 2] = (A[i] & 65535) << 16 | y[(j << 2 >> 2) + c], y[k + 5] = (A[i + 2] & 65535) << 16 | A[i + 1] & 65535, y[k + 6] = y[(j << 2 >> 2) + l], i = ud(x, y[o]), y[k + 7] = y[i >> 2]),
                                        qb = qb + 1 | 0;
                                    if ((qb | 0) == 2) break;
                                    pb = pb + d | 0,
                                        k = pb >> 2
                                }
                                mb = mb + eb | 0;
                                if ((mb | 0) == (fb | 0)) {
                                    jb = nb;
                                    break c
                                }
                                kb = nb,
                                    lb = lb + db | 0
                            }
                        while (0);
                        ab = ab + 1 | 0;
                        if ((ab | 0) == (h | 0)) {
                            $ = jb;
                            break b
                        }
                        _ = _ + L | 0,
                            bb = jb
                    }
                while (0);
                Y = Y + 1 | 0;
                if ((Y | 0) == (F | 0)) break a;
                Z = $
            }
        while (0);
        return q = r,
            1
    }
    function hd(a, b, c, d, e, f, g, h) {
        var i, j, k, l, m, n = q;
        q += 24,
            m = n >> 2;
        var o = n + 4;
        l = o >> 2;
        var c = n + 8 >> 2,
            p = a + 268 | 0,
            r = y[p + 4 >> 2],
            s = y[a + 88 >> 2],
            t = Nc(s + 63 | 0);
        y[m] = 0,
            y[l] = 0;
        var s = Pc(s + 17 | 0),
            u = (s | 0) == 0;
        a: do
            if (!u) for (var v = (h | 0) == 0, w = h - 1 | 0, x = (f & 1 | 0) == 0, B = d << 1, D = a + 92 | 0, E = a + 116 | 0, F = (e & 1 | 0) == 0, G = a + 164 | 0, H = a + 212 | 0, I = a + 284 | 0, J = g - 1 | 0, K = J << 4, L = 0, N = 1;;) {
                b: do
                    if (v) var O = N;
                    else for (var P = y[b + (L << 2) >> 2], Q = 0, S = N;;) {
                        if ((Q & 1 | 0) == 0) var T = P,
                            U = 16,
                            V = 1,
                            W = g,
                            X = 0;
                        else T = P + K | 0,
                            U = -16,
                            W = V = -1,
                            X = J;
                        var Y = x | (Q | 0) != (w | 0),
                            Z = (X | 0) == (W | 0);
                        c: do
                            if (Z) var $ = S;
                            else for (var _ = S,
                                          ab = T,
                                          bb = X;;) {
                                var cb = (_ | 0) == 1 ? R(D, E) | 512 : _,
                                    _ = cb & 7,
                                    cb = cb >>> 3,
                                    db = z[M.f + _ | 0] & 255,
                                    eb = F | (bb | 0) != (J | 0);
                                i = 0;
                                for (j = y[m];;) {
                                    var fb = R(D, G);
                                    y[m] = j + fb | 0,
                                        td(n, r),
                                        j = C[m],
                                        fb = wd(p, j),
                                        y[(i << 2 >> 2) + c] = A[fb >> 1] & 65535,
                                        i = i + 1 | 0;
                                    if (i >>> 0 >= db >>> 0) {
                                        var gb = ab;
                                        k = gb >> 2;
                                        var hb = 0;
                                        break
                                    }
                                }
                                for (;;) {
                                    db = gb,
                                        j = (hb | 0) == 0 | Y,
                                        i = hb << 1,
                                        fb = R(D, H),
                                        y[l] = y[l] + fb | 0,
                                        td(o, t),
                                        eb ? j ? (fb = z[(_ << 2) + vd + i | 0] & 255, j = wd(I, y[l] * 3 | 0) >> 1, y[db >> 2] = (A[j] & 65535) << 16 | y[(fb << 2 >> 2) + c], y[k + 1] = (A[j + 2] & 65535) << 16 | A[j + 1] & 65535, db = gb + 8 | 0, j = R(D, H), y[l] = y[l] + j | 0, td(o, t), j = z[(_ << 2) + vd + (i | 1) | 0] & 255, i = wd(I, y[l] * 3 | 0) >> 1, y[db >> 2] = (A[i] & 65535) << 16 | y[(j << 2 >> 2) + c], y[k + 3] = (A[i + 2] & 65535) << 16 | A[i + 1] & 65535) : (db = R(D, H), y[l] = y[l] + db | 0, td(o, t)) : (j && (j = z[(_ << 2) + vd + i | 0] & 255, i = wd(I, y[l] * 3 | 0) >> 1, y[db >> 2] = (A[i] & 65535) << 16 | y[(j << 2 >> 2) + c], y[k + 1] = (A[i + 2] & 65535) << 16 | A[i + 1] & 65535), db = R(D, H), y[l] = y[l] + db | 0, td(o, t)),
                                        db = hb + 1 | 0;
                                    if ((db | 0) == 2) break;
                                    gb = gb + d | 0,
                                        k = gb >> 2,
                                        hb = db
                                }
                                bb = bb + V | 0;
                                if ((bb | 0) == (W | 0)) {
                                    $ = cb;
                                    break c
                                }
                                _ = cb,
                                    ab = ab + U | 0
                            }
                        while (0);
                        Q = Q + 1 | 0;
                        if ((Q | 0) == (h | 0)) {
                            O = $;
                            break b
                        }
                        P = P + B | 0,
                            S = $
                    }
                while (0);
                L = L + 1 | 0;
                if ((L | 0) == (s | 0)) break a;
                N = O
            }
        while (0);
        return q = n,
            1
    }
    function id(a, b, c, d, e, f, g, h) {
        var i, j, k, l, m, n, o, p, r, s = q;
        q += 48,
            r = s >> 2;
        var t = s + 4;
        p = t >> 2;
        var u = s + 8;
        o = u >> 2;
        var v = s + 12;
        n = v >> 2,
            m = s + 16 >> 2;
        var c = s + 32 >> 2,
            w = a + 268 | 0,
            x = y[w + 4 >> 2],
            B = y[a + 88 >> 2],
            D = Nc(B + 63 | 0);
        y[r] = 0,
            y[p] = 0,
            y[o] = 0,
            y[n] = 0;
        var B = Pc(B + 17 | 0),
            E = (B | 0) == 0;
        a: do
            if (!E) for (var F = (h | 0) == 0, G = h - 1 | 0, H = (f & 1 | 0) == 0, I = d << 1, J = a + 92 | 0, K = a + 116 | 0, L = a + 212 | 0, N = a + 284 | 0, O = a + 164 | 0, P = g - 1 | 0, Q = P << 5, S = (e & 1 | 0) != 0, T = 0, U = 1;;) {
                b: do
                    if (F) var V = U;
                    else for (var W = y[b + (T << 2) >> 2], X = 0, Y = U;;) {
                        if ((X & 1 | 0) == 0) var Z = W,
                            $ = 32,
                            _ = 1,
                            ab = g,
                            bb = 0;
                        else Z = W + Q | 0,
                            $ = -32,
                            ab = _ = -1,
                            bb = P;
                        var cb = H | (X | 0) != (G | 0),
                            db = (bb | 0) == (ab | 0);
                        c: do
                            if (db) var eb = Y;
                            else for (var fb = Y,
                                          gb = Z,
                                          hb = bb;;) {
                                var ib = (fb | 0) == 1 ? R(J, K) | 512 : fb,
                                    fb = ib & 7,
                                    ib = ib >>> 3;
                                l = z[M.f + fb | 0] & 255;
                                for (var jb = 0,
                                         kb = y[r];;) {
                                    var lb = R(J, O);
                                    y[r] = kb + lb | 0,
                                        td(s, x),
                                        kb = C[r],
                                        lb = wd(w, kb),
                                        y[(jb << 2 >> 2) + m] = A[lb >> 1] & 65535,
                                        jb = jb + 1 | 0;
                                    if (jb >>> 0 >= l >>> 0) break
                                }
                                jb = 0;
                                for (kb = y[o];;) {
                                    lb = R(J, O),
                                        y[o] = kb + lb | 0,
                                        td(u, x),
                                        kb = C[o],
                                        lb = wd(w, kb),
                                        y[(jb << 2 >> 2) + c] = A[lb >> 1] & 65535,
                                        jb = jb + 1 | 0;
                                    if (jb >>> 0 >= l >>> 0) break
                                }
                                jb = (hb | 0) == (P | 0) & S,
                                    kb = gb,
                                    l = kb >> 2;
                                for (lb = 0;;) {
                                    var mb = (lb | 0) == 0 | cb;
                                    i = lb << 1,
                                        j = R(J, L),
                                        y[p] = y[p] + j | 0,
                                        td(t, D),
                                        j = R(J, L),
                                        y[n] = y[n] + j | 0,
                                        td(v, D);
                                    if (mb) {
                                        var nb = kb,
                                            ob = z[(fb << 2) + vd + i | 0] & 255;
                                        k = wd(N, y[p] * 3 | 0) >> 1,
                                            j = wd(N, y[n] * 3 | 0) >> 1,
                                            y[nb >> 2] = (A[k] & 65535) << 16 | y[(ob << 2 >> 2) + m],
                                            y[l + 1] = (A[k + 2] & 65535) << 16 | A[k + 1] & 65535,
                                            y[l + 2] = (A[j] & 65535) << 16 | y[(ob << 2 >> 2) + c],
                                            y[l + 3] = (A[j + 2] & 65535) << 16 | A[j + 1] & 65535
                                    }
                                    j = R(J, L),
                                        y[p] = y[p] + j | 0,
                                        td(t, D),
                                        j = R(J, L),
                                        y[n] = y[n] + j | 0,
                                        td(v, D),
                                    jb | mb ^ 1 || (mb = kb + 16 | 0, k = z[(fb << 2) + vd + (i | 1) | 0] & 255, j = wd(N, y[p] * 3 | 0) >> 1, i = wd(N, y[n] * 3 | 0) >> 1, y[mb >> 2] = (A[j] & 65535) << 16 | y[(k << 2 >> 2) + m], y[l + 5] = (A[j + 2] & 65535) << 16 | A[j + 1] & 65535, y[l + 6] = (A[i] & 65535) << 16 | y[(k << 2 >> 2) + c], y[l + 7] = (A[i + 2] & 65535) << 16 | A[i + 1] & 65535),
                                        lb = lb + 1 | 0;
                                    if ((lb | 0) == 2) break;
                                    kb = kb + d | 0,
                                        l = kb >> 2
                                }
                                hb = hb + _ | 0;
                                if ((hb | 0) == (ab | 0)) {
                                    eb = ib;
                                    break c
                                }
                                fb = ib,
                                    gb = gb + $ | 0
                            }
                        while (0);
                        X = X + 1 | 0;
                        if ((X | 0) == (h | 0)) {
                            V = eb;
                            break b
                        }
                        W = W + I | 0,
                            Y = eb
                    }
                while (0);
                T = T + 1 | 0;
                if ((T | 0) == (B | 0)) break a;
                U = V
            }
        while (0);
        return q = s,
            1
    }
    function wd(a, b) {
        return C[a + 4 >> 2] >>> 0 > b >>> 0 || xc(M.g | 0, 904),
        (b << 1) + y[a >> 2] | 0
    }
    function ud(a, b) {
        return C[a + 4 >> 2] >>> 0 > b >>> 0 || xc(M.g | 0, 904),
        (b << 2) + y[a >> 2] | 0
    }
    function xd(a, b) {
        var c;
        c = (a + 4 | 0) >> 2;
        var d = C[c],
            e = (d | 0) == (b | 0);
        do
            if (e) var f = 1;
            else {
                if (d >>> 0 <= b >>> 0) {
                    if (C[a + 8 >> 2] >>> 0 < b >>> 0) {
                        f = a,
                            Fc(f, b, (d + 1 | 0) == (b | 0), 2, 0) ? f = 1 : (v[f + 12 | 0] = 1, f = 0);
                        if (!f) {
                            f = 0;
                            break
                        }
                        f = y[c]
                    } else f = d;
                    bc((f << 1) + y[a >> 2] | 0, 0, (b - f | 0) << 1)
                }
                y[c] = b,
                    f = 1
            }
        while (0);
        return f
    }
    function yd(a, b) {
        var c;
        c = (a + 4 | 0) >> 2;
        var d = C[c],
            e = (d | 0) == (b | 0);
        do
            if (e) var f = 1;
            else {
                if (d >>> 0 <= b >>> 0) {
                    if (C[a + 8 >> 2] >>> 0 < b >>> 0) {
                        f = a,
                            Fc(f, b, (d + 1 | 0) == (b | 0), 4, 0) ? f = 1 : (v[f + 12 | 0] = 1, f = 0);
                        if (!f) {
                            f = 0;
                            break
                        }
                        f = y[c]
                    } else f = d;
                    bc((f << 2) + y[a >> 2] | 0, 0, (b - f | 0) << 2)
                }
                y[c] = b,
                    f = 1
            }
        while (0);
        return f
    }
    function md(a) {
        var b = q;
        q += 48;
        var c, d = a + 88 | 0,
            e = Nc(y[d >> 2] + 39 | 0),
            f = a + 236 | 0,
            g = yd(f, e);
        do
            if (g) {
                var h = a + 92 | 0,
                    i = y[d >> 2];
                if (cd(h, y[a + 4 >> 2] + Qc(i + 33 | 0) | 0, Qc(i + 36 | 0))) {
                    i = b | 0,
                        Uc(i);
                    var j = b + 24 | 0;
                    Uc(j);
                    for (var k = 0;;) {
                        if (k >>> 0 >= 2) {
                            c = 9;
                            break
                        }
                        if (!dd(h, b + k * 24 | 0)) {
                            var l = 0;
                            c = 11;
                            break
                        }
                        k = k + 1 | 0
                    }
                    a: do
                        if (c == 9) {
                            var m = ud(f, 0);
                            if ((e | 0) == 0) l = 1;
                            else for (var n = k = 0,
                                          o = 0,
                                          p = 0,
                                          r = 0,
                                          s = 0,
                                          t = 0;;) {
                                var s = R(h, i) + s & 31,
                                    r = R(h, j) + r & 63,
                                    p = R(h, i) + p & 31,
                                    u = R(h, i) + o | 0,
                                    o = u & 31,
                                    n = R(h, j) + n & 63,
                                    k = R(h, i) + k & 31;
                                y[m >> 2] = r << 5 | s << 11 | p | u << 27 | n << 21 | k << 16,
                                    t = t + 1 | 0;
                                if ((t | 0) == (e | 0)) {
                                    l = 1;
                                    break a
                                }
                                m = m + 4 | 0
                            }
                        }
                    while (0);
                    Vc(j),
                        Vc(i),
                        h = l
                } else h = 0
            } else h = 0;
        while (0);
        return q = b,
            h
    }
    function nd(a) {
        var b = q;
        q += 480;
        var c = b + 24,
            d = b + 220,
            e = b + 416,
            f = y[a + 88 >> 2],
            g = Nc(f + 47 | 0),
            h = a + 92 | 0;
        if (cd(h, y[a + 4 >> 2] + Qc(f + 41 | 0) | 0, Qc(f + 44 | 0))) {
            Uc(b),
                f = dd(h, b);
            a: do
                if (f) {
                    for (var i = -3,
                             j = -3,
                             k = 0;;) {
                        y[c + (k << 2) >> 2] = i,
                            y[d + (k << 2) >> 2] = j;
                        var i = i + 1 | 0,
                            l = (i | 0) > 3,
                            j = (l & 1) + j | 0,
                            k = k + 1 | 0;
                        if ((k | 0) == 49) break;
                        i = l ? -3 : i
                    }
                    bc(e, 0, 64),
                        j = a + 252 | 0;
                    if (yd(j, g)) {
                        var m = ud(j, 0);
                        if ((g | 0) == 0) H = 1;
                        else for (var j = e | 0,
                                      k = e + 4 | 0,
                                      i = e + 8 | 0,
                                      l = e + 12 | 0,
                                      n = e + 16 | 0,
                                      o = e + 20 | 0,
                                      p = e + 24 | 0,
                                      r = e + 28 | 0,
                                      s = e + 32 | 0,
                                      t = e + 36 | 0,
                                      u = e + 40 | 0,
                                      v = e + 44 | 0,
                                      w = e + 48 | 0,
                                      x = e + 52 | 0,
                                      A = e + 56 | 0,
                                      B = e + 60 | 0,
                                      C = 0;;) {
                            for (var D = 0;;) {
                                var E = R(h, b),
                                    F = D << 1,
                                    G = (F << 2) + e | 0;
                                y[G >> 2] = y[G >> 2] + y[c + (E << 2) >> 2] & 3,
                                    F = ((F | 1) << 2) + e | 0,
                                    y[F >> 2] = y[F >> 2] + y[d + (E << 2) >> 2] & 3,
                                    D = D + 1 | 0;
                                if ((D | 0) == 8) break
                            }
                            y[m >> 2] = (z[M.b + y[k >> 2] | 0] & 255) << 2 | z[M.b + y[j >> 2] | 0] & 255 | (z[M.b + y[i >> 2] | 0] & 255) << 4 | (z[M.b + y[l >> 2] | 0] & 255) << 6 | (z[M.b + y[n >> 2] | 0] & 255) << 8 | (z[M.b + y[o >> 2] | 0] & 255) << 10 | (z[M.b + y[p >> 2] | 0] & 255) << 12 | (z[M.b + y[r >> 2] | 0] & 255) << 14 | (z[M.b + y[s >> 2] | 0] & 255) << 16 | (z[M.b + y[t >> 2] | 0] & 255) << 18 | (z[M.b + y[u >> 2] | 0] & 255) << 20 | (z[M.b + y[v >> 2] | 0] & 255) << 22 | (z[M.b + y[w >> 2] | 0] & 255) << 24 | (z[M.b + y[x >> 2] | 0] & 255) << 26 | (z[M.b + y[A >> 2] | 0] & 255) << 28 | (z[M.b + y[B >> 2] | 0] & 255) << 30,
                                C = C + 1 | 0;
                            if ((C | 0) == (g | 0)) {
                                H = 1;
                                break a
                            }
                            m = m + 4 | 0
                        }
                    } else var H = 0
                } else H = 0;
            while (0);
            Vc(b),
                a = H
        } else a = 0;
        return q = b,
            a
    }
    function od(a) {
        var b = q;
        q += 24;
        var c = y[a + 88 >> 2],
            d = Nc(c + 55 | 0),
            e = a + 92 | 0;
        if (cd(e, y[a + 4 >> 2] + Qc(c + 49 | 0) | 0, Qc(c + 52 | 0))) {
            Uc(b),
                c = dd(e, b);
            a: do
                if (c) {
                    var f = a + 268 | 0;
                    if (xd(f, d)) {
                        f = wd(f, 0);
                        if ((d | 0) == 0) l = 1;
                        else for (var g = 0,
                                      h = 0,
                                      i = 0;;) {
                            var j = R(e, b),
                                k = R(e, b),
                                g = j + g & 255,
                                h = k + h & 255;
                            gb[f >> 1] = (h << 8 | g) & 65535,
                                i = i + 1 | 0;
                            if ((i | 0) == (d | 0)) {
                                l = 1;
                                break a
                            }
                            f = f + 2 | 0
                        }
                    } else var l = 0
                } else l = 0;
            while (0);
            Vc(b),
                a = l
        } else a = 0;
        return q = b,
            a
    }
    function pd(a) {
        var b, c = q;
        q += 1888;
        var d = c + 24,
            e = c + 924,
            f = c + 1824,
            g = y[a + 88 >> 2],
            h = Nc(g + 63 | 0),
            i = a + 92 | 0;
        if (cd(i, y[a + 4 >> 2] + Qc(g + 57 | 0) | 0, Qc(g + 60 | 0))) {
            Uc(c),
                g = dd(i, c);
            a: do
                if (g) {
                    for (var j = -7,
                             k = -7,
                             l = 0;;) {
                        y[d + (l << 2) >> 2] = j,
                            y[e + (l << 2) >> 2] = k;
                        var j = j + 1 | 0,
                            m = (j | 0) > 7,
                            k = (m & 1) + k | 0,
                            l = l + 1 | 0;
                        if ((l | 0) == 225) break;
                        j = m ? -7 : j
                    }
                    bc(f, 0, 64),
                        k = a + 284 | 0;
                    if (xd(k, h * 3 | 0)) {
                        b = wd(k, 0);
                        if ((h | 0) == 0) I = 1;
                        else {
                            var k = f | 0,
                                l = f + 4 | 0,
                                j = f + 8 | 0,
                                m = f + 12 | 0,
                                n = f + 16 | 0,
                                o = f + 20 | 0,
                                p = f + 24 | 0,
                                r = f + 28 | 0,
                                s = f + 32 | 0,
                                t = f + 36 | 0,
                                u = f + 40 | 0,
                                v = f + 44 | 0,
                                w = f + 48 | 0,
                                x = f + 52 | 0,
                                A = f + 56 | 0,
                                B = f + 60 | 0,
                                C = b;
                            b = C >> 1;
                            for (var D = 0;;) {
                                for (var E = 0;;) {
                                    var F = R(i, c),
                                        G = E << 1,
                                        H = (G << 2) + f | 0;
                                    y[H >> 2] = y[H >> 2] + y[d + (F << 2) >> 2] & 7,
                                        G = ((G | 1) << 2) + f | 0,
                                        y[G >> 2] = y[G >> 2] + y[e + (F << 2) >> 2] & 7,
                                        E = E + 1 | 0;
                                    if ((E | 0) == 8) break
                                }
                                gb[b] = (z[M.a + y[l >> 2] | 0] & 255) << 3 | z[M.a + y[k >> 2] | 0] & 255 | (z[M.a + y[j >> 2] | 0] & 255) << 6 | (z[M.a + y[m >> 2] | 0] & 255) << 9 | (z[M.a + y[n >> 2] | 0] & 255) << 12 | (z[M.a + y[o >> 2] | 0] & 255) << 15,
                                    gb[b + 1] = (z[M.a + y[p >> 2] | 0] & 255) << 2 | (z[M.a + y[o >> 2] | 0] & 255) >>> 1 | (z[M.a + y[r >> 2] | 0] & 255) << 5 | (z[M.a + y[s >> 2] | 0] & 255) << 8 | (z[M.a + y[t >> 2] | 0] & 255) << 11 | (z[M.a + y[u >> 2] | 0] & 255) << 14,
                                    gb[b + 2] = (z[M.a + y[v >> 2] | 0] & 255) << 1 | (z[M.a + y[u >> 2] | 0] & 255) >>> 2 | (z[M.a + y[w >> 2] | 0] & 255) << 4 | (z[M.a + y[x >> 2] | 0] & 255) << 7 | (z[M.a + y[A >> 2] | 0] & 255) << 10 | (z[M.a + y[B >> 2] | 0] & 255) << 13,
                                    D = D + 1 | 0;
                                if ((D | 0) == (h | 0)) {
                                    I = 1;
                                    break a
                                }
                                C = C + 6 | 0,
                                    b = C >> 1
                            }
                        }
                    } else var I = 0
                } else I = 0;
            while (0);
            Vc(c),
                a = I
        } else a = 0;
        return q = c,
            a
    }
    function ac(b) {
        if (b >>> 0 < 245) {
            var c = b >>> 0 < 11 ? 16 : b + 11 & -8,
                d = c >>> 3,
                b = C[X >> 2],
                e = b >>> (d >>> 0);
            if ((e & 3 | 0) != 0) {
                var f = (e & 1 ^ 1) + d | 0,
                    c = f << 1,
                    d = (c << 2) + X + 40 | 0,
                    g = (c + 2 << 2) + X + 40 | 0,
                    e = C[g >> 2],
                    c = e + 8 | 0,
                    h = C[c >> 2]; (d | 0) == (h | 0) ? y[X >> 2] = b & (1 << f ^ -1) : (h >>> 0 < C[X + 16 >> 2] >>> 0 && ($(), a("Reached an unreachable!")), y[g >> 2] = h, y[h + 12 >> 2] = d),
                    b = f << 3,
                    y[e + 4 >> 2] = b | 3,
                    b = e + (b | 4) | 0,
                    y[b >> 2] = y[b >> 2] | 1,
                    f = c,
                    b = 38
            } else if (c >>> 0 > C[X + 8 >> 2] >>> 0) if ((e | 0) != 0) {
                var f = 2 << d,
                    f = e << d & (f | -f),
                    d = (f & -f) - 1 | 0,
                    f = d >>> 12 & 16,
                    e = d >>> (f >>> 0),
                    d = e >>> 5 & 8,
                    g = e >>> (d >>> 0),
                    e = g >>> 2 & 4,
                    h = g >>> (e >>> 0),
                    g = h >>> 1 & 2,
                    h = h >>> (g >>> 0),
                    i = h >>> 1 & 1,
                    d = (d | f | e | g | i) + (h >>> (i >>> 0)) | 0,
                    f = d << 1,
                    g = (f << 2) + X + 40 | 0,
                    h = (f + 2 << 2) + X + 40 | 0,
                    e = C[h >> 2],
                    f = e + 8 | 0,
                    i = C[f >> 2]; (g | 0) == (i | 0) ? y[X >> 2] = b & (1 << d ^ -1) : (i >>> 0 < C[X + 16 >> 2] >>> 0 && ($(), a("Reached an unreachable!")), y[h >> 2] = i, y[i + 12 >> 2] = g),
                    g = d << 3,
                    b = g - c | 0,
                    y[e + 4 >> 2] = c | 3,
                    d = e + c | 0,
                    y[e + (c | 4) >> 2] = b | 1,
                    y[e + g >> 2] = b,
                    i = C[X + 8 >> 2],
                (i | 0) != 0 && (c = y[X + 20 >> 2], g = i >>> 2 & 1073741822, e = (g << 2) + X + 40 | 0, h = C[X >> 2], i = 1 << (i >>> 3), (h & i | 0) == 0 ? (y[X >> 2] = h | i, h = e, g = (g + 2 << 2) + X + 40 | 0) : (g = (g + 2 << 2) + X + 40 | 0, h = C[g >> 2], h >>> 0 < C[X + 16 >> 2] >>> 0 && ($(), a("Reached an unreachable!"))), y[g >> 2] = c, y[h + 12 >> 2] = c, y[(c + 8 | 0) >> 2] = h, y[(c + 12 | 0) >> 2] = e),
                    y[X + 8 >> 2] = b,
                    y[X + 20 >> 2] = d,
                    b = 38
            } else(y[X + 4 >> 2] | 0) == 0 ? (j = c, b = 30) : (b = zd(c), (b | 0) == 0 ? (j = c, b = 30) : (f = b, b = 38));
            else var j = c,
                    b = 30
        } else b >>> 0 > 4294967231 ? (j = -1, b = 30) : (b = b + 11 & -8, (y[X + 4 >> 2] | 0) == 0 ? (j = b, b = 30) : (c = Ad(b), (c | 0) == 0 ? (j = b, b = 30) : (f = c, b = 38)));
        return b == 30 && (c = C[X + 8 >> 2], j >>> 0 > c >>> 0 ? (b = C[X + 12 >> 2], j >>> 0 < b >>> 0 ? (b = b - j | 0, y[X + 12 >> 2] = b, c = C[X + 24 >> 2], y[X + 24 >> 2] = c + j | 0, y[j + (c + 4) >> 2] = b | 1, y[c + 4 >> 2] = j | 3, f = c + 8 | 0) : f = Bd(j)) : (f = c - j | 0, b = C[X + 20 >> 2], f >>> 0 > 15 ? (y[X + 20 >> 2] = b + j | 0, y[X + 8 >> 2] = f, y[j + (b + 4) >> 2] = f | 1, y[b + c >> 2] = f, y[b + 4 >> 2] = j | 3) : (y[X + 8 >> 2] = 0, y[X + 20 >> 2] = 0, y[b + 4 >> 2] = c | 3, j = c + (b + 4) | 0, y[j >> 2] = y[j >> 2] | 1), f = b + 8 | 0)),
            f
    }
    function zd(b) {
        var c, d, e = y[X + 4 >> 2],
            f = (e & -e) - 1 | 0,
            e = f >>> 12 & 16,
            g = f >>> (e >>> 0),
            f = g >>> 5 & 8;
        d = g >>> (f >>> 0);
        var g = d >>> 2 & 4,
            h = d >>> (g >>> 0);
        d = h >>> 1 & 2;
        var h = h >>> (d >>> 0),
            i = h >>> 1 & 1,
            e = f = C[X + ((f | e | g | d | i) + (h >>> (i >>> 0)) << 2) + 304 >> 2];
        d = e >> 2,
            f = (y[f + 4 >> 2] & -8) - b | 0;
        a: for (;;) for (g = e;;) {
            h = y[g + 16 >> 2];
            if ((h | 0) == 0) {
                g = y[g + 20 >> 2];
                if ((g | 0) == 0) break a
            } else g = h;
            h = (y[g + 4 >> 2] & -8) - b | 0;
            if (h >>> 0 < f >>> 0) {
                e = g,
                    d = e >> 2,
                    f = h;
                continue a
            }
        }
        var h = e,
            j = C[X + 16 >> 2],
            i = h >>> 0 < j >>> 0;
        do
            if (!i) {
                var k = h + b | 0,
                    g = k;
                if (h >>> 0 < k >>> 0) {
                    var i = C[d + 6],
                        k = C[d + 3],
                        l = (k | 0) == (e | 0);
                    do {
                        if (l) {
                            c = e + 20 | 0;
                            var m = y[c >> 2];
                            if ((m | 0) == 0) {
                                c = e + 16 | 0,
                                    m = y[c >> 2];
                                if ((m | 0) == 0) {
                                    m = 0,
                                        c = m >> 2;
                                    break
                                }
                            }
                            for (;;) {
                                var n = m + 20 | 0,
                                    o = y[n >> 2];
                                if ((o | 0) == 0) {
                                    n = m + 16 | 0,
                                        o = C[n >> 2];
                                    if ((o | 0) == 0) break
                                }
                                c = n,
                                    m = o
                            }
                            c >>> 0 < j >>> 0 && ($(), a("Reached an unreachable!")),
                                y[c >> 2] = 0
                        } else c = C[d + 2], c >>> 0 < j >>> 0 && ($(), a("Reached an unreachable!")), y[c + 12 >> 2] = k, y[k + 8 >> 2] = c, m = k;
                        c = m >> 2
                    } while ( 0 );
                    j = (i | 0) == 0;
                    a: do
                        if (!j) {
                            k = e + 28 | 0,
                                l = (y[k >> 2] << 2) + X + 304 | 0,
                                n = (e | 0) == (y[l >> 2] | 0);
                            do {
                                if (n) {
                                    y[l >> 2] = m;
                                    if ((m | 0) != 0) break;
                                    y[X + 4 >> 2] = y[X + 4 >> 2] & (1 << y[k >> 2] ^ -1);
                                    break a
                                }
                                i >>> 0 < C[X + 16 >> 2] >>> 0 && ($(), a("Reached an unreachable!")), o = i + 16 | 0, (y[o >> 2] | 0) == (e | 0) ? y[o >> 2] = m: y[i + 20 >> 2] = m;
                                if ((m | 0) == 0) break a
                            } while ( 0 );
                            m >>> 0 < C[X + 16 >> 2] >>> 0 && ($(), a("Reached an unreachable!")),
                                y[c + 6] = i,
                                k = C[d + 4],
                            (k | 0) != 0 && (k >>> 0 < C[X + 16 >> 2] >>> 0 && ($(), a("Reached an unreachable!")), y[c + 4] = k, y[k + 24 >> 2] = m),
                                k = C[d + 5],
                            (k | 0) != 0 && (k >>> 0 < C[X + 16 >> 2] >>> 0 && ($(), a("Reached an unreachable!")), y[c + 5] = k, y[k + 24 >> 2] = m)
                        }
                    while (0);
                    return f >>> 0 < 16 ? (b = f + b | 0, y[d + 1] = b | 3, b = b + (h + 4) | 0, y[b >> 2] = y[b >> 2] | 1) : (y[d + 1] = b | 3, y[b + (h + 4) >> 2] = f | 1, y[h + f + b >> 2] = f, j = C[X + 8 >> 2], (j | 0) != 0 && (b = C[X + 20 >> 2], h = j >>> 2 & 1073741822, d = (h << 2) + X + 40 | 0, i = C[X >> 2], j = 1 << (j >>> 3), (i & j | 0) == 0 ? (y[X >> 2] = i | j, i = d, h = (h + 2 << 2) + X + 40 | 0) : (h = (h + 2 << 2) + X + 40 | 0, i = C[h >> 2], i >>> 0 < C[X + 16 >> 2] >>> 0 && ($(), a("Reached an unreachable!"))), y[h >> 2] = b, y[i + 12 >> 2] = b, y[b + 8 >> 2] = i, y[b + 12 >> 2] = d), y[X + 8 >> 2] = f, y[X + 20 >> 2] = g),
                    e + 8 | 0
                }
            }
        while (0);
        $(),
            a("Reached an unreachable!")
    }
    function Bd(a) {
        var b, c; (y[Cd >> 2] | 0) == 0 && Dd();
        var d = (y[X + 440 >> 2] & 4 | 0) == 0;
        do {
            if (d) {
                c = y[X + 24 >> 2];
                if ((c | 0) == 0) c = 6;
                else {
                    c = Ed(c);
                    if ((c | 0) == 0) c = 6;
                    else {
                        var e = y[Cd + 8 >> 2],
                            e = a + 47 - y[X + 12 >> 2] + e & -e;
                        if (e >>> 0 < 2147483647) {
                            var f = Fd(e);
                            if ((f | 0) == (y[c >> 2] + y[c + 4 >> 2] | 0)) {
                                var g = f,
                                    h = e;
                                b = f,
                                    c = 13
                            } else {
                                var i = f,
                                    j = e;
                                c = 15
                            }
                        } else c = 14
                    }
                }
                if (c == 6) {
                    c = Fd(0);
                    if ((c | 0) == -1) c = 14;
                    else {
                        var e = y[Cd + 8 >> 2],
                            e = e + (a + 47) & -e,
                            f = c,
                            k = y[Cd + 4 >> 2],
                            l = k - 1 | 0,
                            e = (l & f | 0) == 0 ? e: e - f + (l + f & -k) | 0;
                        e >>> 0 < 2147483647 ? (f = Fd(e), (f | 0) == (c | 0) ? (g = c, h = e, b = f, c = 13) : (i = f, j = e, c = 15)) : c = 14
                    }
                }
                if (c == 13) {
                    if ((g | 0) != -1) {
                        var m = h,
                            n = g;
                        c = 26;
                        break
                    }
                    i = b,
                        j = h
                } else if (c == 14) {
                    y[X + 440 >> 2] = y[X + 440 >> 2] | 4,
                        c = 23;
                    break
                }
                c = -j | 0;
                if ((i | 0) != -1 & j >>> 0 < 2147483647) if (j >>> 0 < (a + 48 | 0) >>> 0) e = y[Cd + 8 >> 2],
                    e = a + 47 - j + e & -e,
                    e >>> 0 < 2147483647 ? (Fd(e) | 0) == -1 ? (Fd(c), c = 22) : (o = e + j | 0, c = 21) : (o = j, c = 21);
                else {
                    var o = j;
                    c = 21
                } else o = j,
                    c = 21;
                if (c == 21 && (i | 0) != -1) {
                    m = o,
                        n = i,
                        c = 26;
                    break
                }
                y[X + 440 >> 2] = y[X + 440 >> 2] | 4
            }
            c = 23
        } while ( 0 );
        c == 23 && (d = y[Cd + 8 >> 2], d = d + (a + 47) & -d, d >>> 0 < 2147483647 ? (d = Fd(d), g = Fd(0), (g | 0) != -1 & (d | 0) != -1 & d >>> 0 < g >>> 0 ? (g = g - d | 0, g >>> 0 <= (a + 40 | 0) >>> 0 | (d | 0) == -1 ? c = 49 : (m = g, n = d, c = 26)) : c = 49) : c = 49);
        a: do
            if (c == 26) {
                d = y[X + 432 >> 2] + m | 0,
                    y[X + 432 >> 2] = d,
                d >>> 0 > C[X + 436 >> 2] >>> 0 && (y[X + 436 >> 2] = d),
                    d = C[X + 24 >> 2],
                    g = (d | 0) == 0;
                b: do
                    if (g) {
                        h = C[X + 16 >> 2],
                        (h | 0) == 0 | n >>> 0 < h >>> 0 && (y[X + 16 >> 2] = n),
                            y[X + 444 >> 2] = n,
                            y[X + 448 >> 2] = m,
                            y[X + 456 >> 2] = 0,
                            y[X + 36 >> 2] = y[Cd >> 2],
                            y[X + 32 >> 2] = -1;
                        for (h = 0;;) {
                            b = h << 1,
                                i = (b << 2) + X + 40 | 0,
                                y[X + (b + 3 << 2) + 40 >> 2] = i,
                                y[X + (b + 2 << 2) + 40 >> 2] = i,
                                h = h + 1 | 0;
                            if ((h | 0) == 32) break
                        }
                        Gd(n, m - 40 | 0)
                    } else {
                        i = X + 444 | 0;
                        for (b = i >> 2;;) {
                            if ((i | 0) == 0) break;
                            h = C[b],
                                i = i + 4 | 0,
                                j = C[i >> 2],
                                o = h + j | 0;
                            if ((n | 0) == (o | 0)) {
                                if ((y[b + 3] & 8 | 0) != 0) break;
                                b = d;
                                if (! (b >>> 0 >= h >>> 0 & b >>> 0 < o >>> 0)) break;
                                y[i >> 2] = j + m | 0,
                                    Gd(y[X + 24 >> 2], y[X + 12 >> 2] + m | 0);
                                break b
                            }
                            i = y[b + 2],
                                b = i >> 2
                        }
                        n >>> 0 < C[X + 16 >> 2] >>> 0 && (y[X + 16 >> 2] = n),
                            b = n + m | 0;
                        for (i = X + 444 | 0;;) {
                            if ((i | 0) == 0) break;
                            j = i | 0,
                                h = C[j >> 2];
                            if ((h | 0) == (b | 0)) {
                                if ((y[i + 12 >> 2] & 8 | 0) != 0) break;
                                y[j >> 2] = n;
                                var p = i + 4 | 0;
                                y[p >> 2] = y[p >> 2] + m | 0,
                                    p = Hd(n, h, a),
                                    c = 50;
                                break a
                            }
                            i = y[i + 8 >> 2]
                        }
                        Id(n, m)
                    }
                while (0);
                d = C[X + 12 >> 2],
                    d >>> 0 > a >>> 0 ? (p = d - a | 0, y[X + 12 >> 2] = p, g = d = C[X + 24 >> 2], y[X + 24 >> 2] = g + a | 0, y[a + (g + 4) >> 2] = p | 1, y[d + 4 >> 2] = a | 3, p = d + 8 | 0, c = 50) : c = 49
            }
        while (0);
        return c == 49 && (y[Jd >> 2] = 12, p = 0),
            p
    }
    function Ad(b) {
        var c, d, e, f, g, h = b >> 2,
            i = -b | 0,
            j = b >>> 8;
        if ((j | 0) == 0) var k = 0;
        else if (b >>> 0 > 16777215) k = 31;
        else var l = (j + 1048320 | 0) >>> 16 & 8,
                m = j << l,
                n = (m + 520192 | 0) >>> 16 & 4,
                o = m << n,
                p = (o + 245760 | 0) >>> 16 & 2,
                q = 14 - (n | l | p) + (o << p >>> 15) | 0,
                k = b >>> ((q + 7 | 0) >>> 0) & 1 | q << 1;
        var r = C[X + (k << 2) + 304 >> 2],
            s = (r | 0) == 0;
        a: do
            if (s) var t = 0,
                u = i,
                v = 0;
            else {
                var w = (k | 0) == 31 ? 0 : 25 - (k >>> 1) | 0,
                    x = 0,
                    z = i,
                    A = r;
                g = A >> 2;
                for (var B = b << w,
                         D = 0;;) {
                    var E = y[g + 1] & -8,
                        F = E - b | 0;
                    if (F >>> 0 < z >>> 0) {
                        if ((E | 0) == (b | 0)) {
                            t = A,
                                u = F,
                                v = A;
                            break a
                        }
                        var G = A,
                            H = F
                    } else G = x,
                        H = z;
                    var I = C[g + 5],
                        J = C[((B >>> 31 << 2) + 16 >> 2) + g],
                        K = (I | 0) == 0 | (I | 0) == (J | 0) ? D: I;
                    if ((J | 0) == 0) {
                        t = G,
                            u = H,
                            v = K;
                        break a
                    }
                    x = G,
                        z = H,
                        A = J,
                        g = A >> 2,
                        B <<= 1,
                        D = K
                }
            }
        while (0);
        if ((v | 0) == 0 & (t | 0) == 0) {
            var L = 2 << k,
                M = y[X + 4 >> 2] & (L | -L);
            if ((M | 0) == 0) var N = v;
            else var O = (M & -M) - 1 | 0,
                P = O >>> 12 & 16,
                Q = O >>> (P >>> 0),
                R = Q >>> 5 & 8,
                S = Q >>> (R >>> 0),
                T = S >>> 2 & 4,
                U = S >>> (T >>> 0),
                V = U >>> 1 & 2,
                W = U >>> (V >>> 0),
                Y = W >>> 1 & 1,
                N = y[X + ((R | P | T | V | Y) + (W >>> (Y >>> 0)) << 2) + 304 >> 2]
        } else N = v;
        var Z = (N | 0) == 0;
        a: do
            if (Z) {
                var _ = u,
                    ab = t;
                f = ab >> 2
            } else {
                var bb = N;
                e = bb >> 2;
                for (var cb = u,
                         db = t;;) {
                    var eb = (y[e + 1] & -8) - b | 0,
                        fb = eb >>> 0 < cb >>> 0,
                        gb = fb ? eb: cb,
                        hb = fb ? bb: db,
                        ib = C[e + 4];
                    if ((ib | 0) != 0) bb = ib;
                    else {
                        var jb = C[e + 5];
                        if ((jb | 0) == 0) {
                            _ = gb,
                                ab = hb,
                                f = ab >> 2;
                            break a
                        }
                        bb = jb
                    }
                    e = bb >> 2,
                        cb = gb,
                        db = hb
                }
            }
        while (0);
        var kb = (ab | 0) == 0;
        a: do
            if (kb) var lb = 0;
            else {
                if (_ >>> 0 < (y[X + 8 >> 2] - b | 0) >>> 0) {
                    var mb = ab;
                    d = mb >> 2;
                    var nb = C[X + 16 >> 2],
                        ob = mb >>> 0 < nb >>> 0;
                    do
                        if (!ob) {
                            var pb = mb + b | 0,
                                qb = pb;
                            if (mb >>> 0 < pb >>> 0) {
                                var rb = C[f + 6],
                                    sb = C[f + 3],
                                    tb = (sb | 0) == (ab | 0);
                                do {
                                    if (tb) {
                                        var ub = ab + 20 | 0,
                                            vb = y[ub >> 2];
                                        if ((vb | 0) == 0) {
                                            var wb = ab + 16 | 0,
                                                xb = y[wb >> 2];
                                            if ((xb | 0) == 0) {
                                                var yb = 0;
                                                c = yb >> 2;
                                                break
                                            }
                                            var zb = wb,
                                                Ab = xb
                                        } else zb = ub,
                                            Ab = vb;
                                        for (;;) {
                                            var Bb = Ab + 20 | 0,
                                                Cb = y[Bb >> 2];
                                            if ((Cb | 0) != 0) zb = Bb,
                                                Ab = Cb;
                                            else {
                                                var Db = Ab + 16 | 0,
                                                    Eb = C[Db >> 2];
                                                if ((Eb | 0) == 0) break;
                                                zb = Db,
                                                    Ab = Eb
                                            }
                                        }
                                        zb >>> 0 < nb >>> 0 && ($(), a("Reached an unreachable!")),
                                            y[zb >> 2] = 0,
                                            yb = Ab
                                    } else {
                                        var Fb = C[f + 2];
                                        Fb >>> 0 < nb >>> 0 && ($(), a("Reached an unreachable!")),
                                            y[Fb + 12 >> 2] = sb,
                                            y[sb + 8 >> 2] = Fb,
                                            yb = sb
                                    }
                                    c = yb >> 2
                                } while ( 0 );
                                var Gb = (rb | 0) == 0;
                                b: do
                                    if (!Gb) {
                                        var Hb = ab + 28 | 0,
                                            Ib = (y[Hb >> 2] << 2) + X + 304 | 0,
                                            Jb = (ab | 0) == (y[Ib >> 2] | 0);
                                        do {
                                            if (Jb) {
                                                y[Ib >> 2] = yb;
                                                if ((yb | 0) != 0) break;
                                                y[X + 4 >> 2] = y[X + 4 >> 2] & (1 << y[Hb >> 2] ^ -1);
                                                break b
                                            }
                                            rb >>> 0 < C[X + 16 >> 2] >>> 0 && ($(), a("Reached an unreachable!"));
                                            var Kb = rb + 16 | 0; (y[Kb >> 2] | 0) == (ab | 0) ? y[Kb >> 2] = yb: y[rb + 20 >> 2] = yb;
                                            if ((yb | 0) == 0) break b
                                        } while ( 0 );
                                        yb >>> 0 < C[X + 16 >> 2] >>> 0 && ($(), a("Reached an unreachable!")),
                                            y[c + 6] = rb;
                                        var Lb = C[f + 4]; (Lb | 0) != 0 && (Lb >>> 0 < C[X + 16 >> 2] >>> 0 && ($(), a("Reached an unreachable!")), y[c + 4] = Lb, y[Lb + 24 >> 2] = yb);
                                        var Mb = C[f + 5]; (Mb | 0) != 0 && (Mb >>> 0 < C[X + 16 >> 2] >>> 0 && ($(), a("Reached an unreachable!")), y[c + 5] = Mb, y[Mb + 24 >> 2] = yb)
                                    }
                                while (0);
                                var Nb = _ >>> 0 < 16;
                                b: do
                                    if (Nb) {
                                        var Ob = _ + b | 0;
                                        y[f + 1] = Ob | 3;
                                        var Pb = Ob + (mb + 4) | 0;
                                        y[Pb >> 2] = y[Pb >> 2] | 1
                                    } else {
                                        y[f + 1] = b | 3,
                                            y[h + (d + 1)] = _ | 1,
                                            y[(_ >> 2) + d + h] = _;
                                        if (_ >>> 0 < 256) {
                                            var Qb = _ >>> 2 & 1073741822,
                                                Rb = (Qb << 2) + X + 40 | 0,
                                                Sb = C[X >> 2],
                                                Tb = 1 << (_ >>> 3);
                                            if ((Sb & Tb | 0) == 0) {
                                                y[X >> 2] = Sb | Tb;
                                                var Ub = Rb,
                                                    Vb = (Qb + 2 << 2) + X + 40 | 0
                                            } else {
                                                var Wb = (Qb + 2 << 2) + X + 40 | 0,
                                                    Xb = C[Wb >> 2];
                                                Xb >>> 0 < C[X + 16 >> 2] >>> 0 && ($(), a("Reached an unreachable!")),
                                                    Ub = Xb,
                                                    Vb = Wb
                                            }
                                            y[Vb >> 2] = qb,
                                                y[Ub + 12 >> 2] = qb,
                                                y[h + (d + 2)] = Ub,
                                                y[h + (d + 3)] = Rb
                                        } else {
                                            var Yb = pb,
                                                Zb = _ >>> 8;
                                            if ((Zb | 0) == 0) var $b = 0;
                                            else if (_ >>> 0 > 16777215) $b = 31;
                                            else var _b = (Zb + 1048320 | 0) >>> 16 & 8,
                                                    ac = Zb << _b,
                                                    bc = (ac + 520192 | 0) >>> 16 & 4,
                                                    cc = ac << bc,
                                                    dc = (cc + 245760 | 0) >>> 16 & 2,
                                                    ec = 14 - (bc | _b | dc) + (cc << dc >>> 15) | 0,
                                                    $b = _ >>> ((ec + 7 | 0) >>> 0) & 1 | ec << 1;
                                            var fc = ($b << 2) + X + 304 | 0;
                                            y[h + (d + 7)] = $b;
                                            var gc = b + (mb + 16) | 0;
                                            y[h + (d + 5)] = 0,
                                                y[gc >> 2] = 0;
                                            var hc = y[X + 4 >> 2],
                                                ic = 1 << $b;
                                            if ((hc & ic | 0) == 0) y[X + 4 >> 2] = hc | ic,
                                                y[fc >> 2] = Yb,
                                                y[h + (d + 6)] = fc,
                                                y[h + (d + 3)] = Yb,
                                                y[h + (d + 2)] = Yb;
                                            else for (var jc = _ << (($b | 0) == 31 ? 0 : 25 - ($b >>> 1) | 0), kc = y[fc >> 2];;) {
                                                if ((y[kc + 4 >> 2] & -8 | 0) == (_ | 0)) {
                                                    var lc = kc + 8 | 0,
                                                        mc = C[lc >> 2],
                                                        nc = C[X + 16 >> 2],
                                                        oc = kc >>> 0 < nc >>> 0;
                                                    do
                                                        if (!oc && mc >>> 0 >= nc >>> 0) {
                                                            y[mc + 12 >> 2] = Yb,
                                                                y[lc >> 2] = Yb,
                                                                y[h + (d + 2)] = mc,
                                                                y[h + (d + 3)] = kc,
                                                                y[h + (d + 6)] = 0;
                                                            break b
                                                        }
                                                    while (0);
                                                    $(),
                                                        a("Reached an unreachable!")
                                                }
                                                var pc = (jc >>> 31 << 2) + kc + 16 | 0,
                                                    qc = C[pc >> 2];
                                                if ((qc | 0) == 0) {
                                                    if (pc >>> 0 >= C[X + 16 >> 2] >>> 0) {
                                                        y[pc >> 2] = Yb,
                                                            y[h + (d + 6)] = kc,
                                                            y[h + (d + 3)] = Yb,
                                                            y[h + (d + 2)] = Yb;
                                                        break b
                                                    }
                                                    $(),
                                                        a("Reached an unreachable!")
                                                }
                                                jc <<= 1,
                                                    kc = qc
                                            }
                                        }
                                    }
                                while (0);
                                lb = ab + 8 | 0;
                                break a
                            }
                        }
                    while (0);
                    $(),
                        a("Reached an unreachable!")
                }
                lb = 0
            }
        while (0);
        return lb
    }
    function Kd(a) {
        var b; (y[Cd >> 2] | 0) == 0 && Dd();
        var c = a >>> 0 < 4294967232;
        a: do {
            if (c) {
                var d = C[X + 24 >> 2];
                if ((d | 0) != 0) {
                    var e = C[X + 12 >> 2],
                        f = e >>> 0 > (a + 40 | 0) >>> 0;
                    do
                        if (f) {
                            var g = C[Cd + 8 >> 2],
                                h = (Math.floor((( - 40 - a - 1 + e + g | 0) >>> 0) / (g >>> 0)) - 1) * g | 0,
                                i = Ed(d);
                            if ((y[i + 12 >> 2] & 8 | 0) == 0) {
                                var j = Fd(0);
                                b = (i + 4 | 0) >> 2;
                                if ((j | 0) == (y[i >> 2] + y[b] | 0)) {
                                    h = Fd( - (h >>> 0 > 2147483646 ? -2147483648 - g | 0 : h) | 0),
                                        g = Fd(0);
                                    if ((h | 0) != -1 & g >>> 0 < j >>> 0) {
                                        h = j - g | 0;
                                        if ((j | 0) != (g | 0)) {
                                            y[b] = y[b] - h | 0,
                                                y[X + 432 >> 2] = y[X + 432 >> 2] - h | 0,
                                                Gd(y[X + 24 >> 2], y[X + 12 >> 2] - h | 0),
                                                b = (j | 0) != (g | 0);
                                            break a
                                        }
                                    }
                                }
                            }
                        }
                    while (0);
                    C[X + 12 >> 2] >>> 0 > C[X + 28 >> 2] >>> 0 && (y[X + 28 >> 2] = -1)
                }
            }
            b = 0
        } while ( 0 );
        return b & 1
    }
    function Ld(b) {
        var c, d, e, f, g, h, i = b >> 2,
            j, k = (b | 0) == 0;
        a: do
            if (!k) {
                var l = b - 8 | 0,
                    m = l,
                    n = C[X + 16 >> 2],
                    o = l >>> 0 < n >>> 0;
                b: do
                    if (!o) {
                        var p = C[b - 4 >> 2],
                            q = p & 3;
                        if ((q | 0) != 1) {
                            var r = p & -8;
                            h = r >> 2;
                            var s = b + (r - 8) | 0,
                                t = s,
                                u = (p & 1 | 0) == 0;
                            c: do
                                if (u) {
                                    var v = C[l >> 2];
                                    if ((q | 0) == 0) break a;
                                    var w = -8 - v | 0;
                                    g = w >> 2;
                                    var x = b + w | 0,
                                        z = x,
                                        A = v + r | 0;
                                    if (x >>> 0 < n >>> 0) break b;
                                    if ((z | 0) == (y[X + 20 >> 2] | 0)) {
                                        f = (b + (r - 4) | 0) >> 2;
                                        if ((y[f] & 3 | 0) != 3) {
                                            var B = z;
                                            e = B >> 2;
                                            var D = A;
                                            break
                                        }
                                        y[X + 8 >> 2] = A,
                                            y[f] = y[f] & -2,
                                            y[g + (i + 1)] = A | 1,
                                            y[s >> 2] = A;
                                        break a
                                    }
                                    if (v >>> 0 < 256) {
                                        var E = C[g + (i + 2)],
                                            F = C[g + (i + 3)];
                                        if ((E | 0) == (F | 0)) y[X >> 2] = y[X >> 2] & (1 << (v >>> 3) ^ -1),
                                            B = z,
                                            e = B >> 2,
                                            D = A;
                                        else {
                                            var G = ((v >>> 2 & 1073741822) << 2) + X + 40 | 0,
                                                H = (E | 0) != (G | 0) & E >>> 0 < n >>> 0;
                                            do
                                                if (!H && (F | 0) == (G | 0) | F >>> 0 >= n >>> 0) {
                                                    y[E + 12 >> 2] = F,
                                                        y[F + 8 >> 2] = E,
                                                        B = z,
                                                        e = B >> 2,
                                                        D = A;
                                                    break c
                                                }
                                            while (0);
                                            $(),
                                                a("Reached an unreachable!")
                                        }
                                    } else {
                                        var I = x,
                                            J = C[g + (i + 6)],
                                            K = C[g + (i + 3)],
                                            L = (K | 0) == (I | 0);
                                        do {
                                            if (L) {
                                                var M = w + (b + 20) | 0,
                                                    N = y[M >> 2];
                                                if ((N | 0) == 0) {
                                                    var O = w + (b + 16) | 0,
                                                        P = y[O >> 2];
                                                    if ((P | 0) == 0) {
                                                        var Q = 0;
                                                        d = Q >> 2;
                                                        break
                                                    }
                                                    var R = O,
                                                        S = P
                                                } else R = M,
                                                    S = N,
                                                    j = 21;
                                                for (;;) {
                                                    var T = S + 20 | 0,
                                                        U = y[T >> 2];
                                                    if ((U | 0) != 0) R = T,
                                                        S = U;
                                                    else {
                                                        var V = S + 16 | 0,
                                                            W = C[V >> 2];
                                                        if ((W | 0) == 0) break;
                                                        R = V,
                                                            S = W
                                                    }
                                                }
                                                R >>> 0 < n >>> 0 && ($(), a("Reached an unreachable!")),
                                                    y[R >> 2] = 0,
                                                    Q = S
                                            } else {
                                                var Y = C[g + (i + 2)];
                                                Y >>> 0 < n >>> 0 && ($(), a("Reached an unreachable!")),
                                                    y[Y + 12 >> 2] = K,
                                                    y[K + 8 >> 2] = Y,
                                                    Q = K
                                            }
                                            d = Q >> 2
                                        } while ( 0 );
                                        if ((J | 0) != 0) {
                                            var Z = w + (b + 28) | 0,
                                                _ = (y[Z >> 2] << 2) + X + 304 | 0,
                                                ab = (I | 0) == (y[_ >> 2] | 0);
                                            do {
                                                if (ab) {
                                                    y[_ >> 2] = Q;
                                                    if ((Q | 0) != 0) break;
                                                    y[X + 4 >> 2] = y[X + 4 >> 2] & (1 << y[Z >> 2] ^ -1),
                                                        B = z,
                                                        e = B >> 2,
                                                        D = A;
                                                    break c
                                                }
                                                J >>> 0 < C[X + 16 >> 2] >>> 0 && ($(), a("Reached an unreachable!"));
                                                var bb = J + 16 | 0; (y[bb >> 2] | 0) == (I | 0) ? y[bb >> 2] = Q: y[J + 20 >> 2] = Q;
                                                if ((Q | 0) == 0) {
                                                    B = z,
                                                        e = B >> 2,
                                                        D = A;
                                                    break c
                                                }
                                            } while ( 0 );
                                            Q >>> 0 < C[X + 16 >> 2] >>> 0 && ($(), a("Reached an unreachable!")),
                                                y[d + 6] = J;
                                            var cb = C[g + (i + 4)]; (cb | 0) != 0 && (cb >>> 0 < C[X + 16 >> 2] >>> 0 && ($(), a("Reached an unreachable!")), y[d + 4] = cb, y[cb + 24 >> 2] = Q);
                                            var db = C[g + (i + 5)]; (db | 0) != 0 && (db >>> 0 < C[X + 16 >> 2] >>> 0 && ($(), a("Reached an unreachable!")), y[d + 5] = db, y[db + 24 >> 2] = Q)
                                        }
                                        B = z,
                                            e = B >> 2,
                                            D = A
                                    }
                                } else B = m,
                                    e = B >> 2,
                                    D = r;
                            while (0);
                            var eb = B;
                            if (eb >>> 0 < s >>> 0) {
                                var fb = b + (r - 4) | 0,
                                    gb = C[fb >> 2];
                                if ((gb & 1 | 0) != 0) {
                                    var hb = (gb & 2 | 0) == 0;
                                    do
                                        if (hb) {
                                            if ((t | 0) == (y[X + 24 >> 2] | 0)) {
                                                var ib = y[X + 12 >> 2] + D | 0;
                                                y[X + 12 >> 2] = ib,
                                                    y[X + 24 >> 2] = B,
                                                    y[e + 1] = ib | 1,
                                                (B | 0) == (y[X + 20 >> 2] | 0) && (y[X + 20 >> 2] = 0, y[X + 8 >> 2] = 0);
                                                if (ib >>> 0 <= C[X + 28 >> 2] >>> 0) break a;
                                                Kd(0);
                                                break a
                                            }
                                            if ((t | 0) == (y[X + 20 >> 2] | 0)) {
                                                var jb = y[X + 8 >> 2] + D | 0;
                                                y[X + 8 >> 2] = jb,
                                                    y[X + 20 >> 2] = B,
                                                    y[e + 1] = jb | 1,
                                                    y[(eb + jb | 0) >> 2] = jb;
                                                break a
                                            }
                                            var kb = (gb & -8) + D | 0,
                                                lb = gb >>> 3,
                                                mb = gb >>> 0 < 256;
                                            c: do
                                                if (mb) {
                                                    var nb = C[i + h],
                                                        ob = C[((r | 4) >> 2) + i];
                                                    if ((nb | 0) == (ob | 0)) y[X >> 2] = y[X >> 2] & (1 << lb ^ -1);
                                                    else {
                                                        var pb = ((gb >>> 2 & 1073741822) << 2) + X + 40 | 0;
                                                        j = (nb | 0) == (pb | 0) ? 63 : nb >>> 0 < C[X + 16 >> 2] >>> 0 ? 66 : 63;
                                                        do
                                                            if (j == 63 && !((ob | 0) != (pb | 0) && ob >>> 0 < C[X + 16 >> 2] >>> 0)) {
                                                                y[nb + 12 >> 2] = ob,
                                                                    y[ob + 8 >> 2] = nb;
                                                                break c
                                                            }
                                                        while (0);
                                                        $(),
                                                            a("Reached an unreachable!")
                                                    }
                                                } else {
                                                    var qb = s,
                                                        rb = C[h + (i + 4)],
                                                        sb = C[((r | 4) >> 2) + i],
                                                        tb = (sb | 0) == (qb | 0);
                                                    do {
                                                        if (tb) {
                                                            var ub = r + (b + 12) | 0,
                                                                vb = y[ub >> 2];
                                                            if ((vb | 0) == 0) {
                                                                var wb = r + (b + 8) | 0,
                                                                    xb = y[wb >> 2];
                                                                if ((xb | 0) == 0) {
                                                                    var yb = 0;
                                                                    c = yb >> 2;
                                                                    break
                                                                }
                                                                var zb = wb,
                                                                    Ab = xb
                                                            } else zb = ub,
                                                                Ab = vb,
                                                                j = 73;
                                                            for (;;) {
                                                                var Bb = Ab + 20 | 0,
                                                                    Cb = y[Bb >> 2];
                                                                if ((Cb | 0) != 0) zb = Bb,
                                                                    Ab = Cb;
                                                                else {
                                                                    var Db = Ab + 16 | 0,
                                                                        Eb = C[Db >> 2];
                                                                    if ((Eb | 0) == 0) break;
                                                                    zb = Db,
                                                                        Ab = Eb
                                                                }
                                                            }
                                                            zb >>> 0 < C[X + 16 >> 2] >>> 0 && ($(), a("Reached an unreachable!")),
                                                                y[zb >> 2] = 0,
                                                                yb = Ab
                                                        } else {
                                                            var Fb = C[i + h];
                                                            Fb >>> 0 < C[X + 16 >> 2] >>> 0 && ($(), a("Reached an unreachable!")),
                                                                y[Fb + 12 >> 2] = sb,
                                                                y[sb + 8 >> 2] = Fb,
                                                                yb = sb
                                                        }
                                                        c = yb >> 2
                                                    } while ( 0 );
                                                    if ((rb | 0) != 0) {
                                                        var Gb = r + (b + 20) | 0,
                                                            Hb = (y[Gb >> 2] << 2) + X + 304 | 0,
                                                            Ib = (qb | 0) == (y[Hb >> 2] | 0);
                                                        do {
                                                            if (Ib) {
                                                                y[Hb >> 2] = yb;
                                                                if ((yb | 0) != 0) break;
                                                                y[X + 4 >> 2] = y[X + 4 >> 2] & (1 << y[Gb >> 2] ^ -1);
                                                                break c
                                                            }
                                                            rb >>> 0 < C[X + 16 >> 2] >>> 0 && ($(), a("Reached an unreachable!"));
                                                            var Jb = rb + 16 | 0; (y[Jb >> 2] | 0) == (qb | 0) ? y[Jb >> 2] = yb: y[rb + 20 >> 2] = yb;
                                                            if ((yb | 0) == 0) break c
                                                        } while ( 0 );
                                                        yb >>> 0 < C[X + 16 >> 2] >>> 0 && ($(), a("Reached an unreachable!")),
                                                            y[c + 6] = rb;
                                                        var Kb = C[h + (i + 2)]; (Kb | 0) != 0 && (Kb >>> 0 < C[X + 16 >> 2] >>> 0 && ($(), a("Reached an unreachable!")), y[c + 4] = Kb, y[Kb + 24 >> 2] = yb);
                                                        var Lb = C[h + (i + 3)]; (Lb | 0) != 0 && (Lb >>> 0 < C[X + 16 >> 2] >>> 0 && ($(), a("Reached an unreachable!")), y[c + 5] = Lb, y[Lb + 24 >> 2] = yb)
                                                    }
                                                }
                                            while (0);
                                            y[e + 1] = kb | 1,
                                                y[eb + kb >> 2] = kb;
                                            if ((B | 0) == (y[X + 20 >> 2] | 0)) {
                                                y[X + 8 >> 2] = kb;
                                                break a
                                            }
                                            var Mb = kb
                                        } else y[fb >> 2] = gb & -2,
                                            y[e + 1] = D | 1,
                                            Mb = y[eb + D >> 2] = D;
                                    while (0);
                                    if (Mb >>> 0 < 256) {
                                        var Nb = Mb >>> 2 & 1073741822,
                                            Ob = (Nb << 2) + X + 40 | 0,
                                            Pb = C[X >> 2],
                                            Qb = 1 << (Mb >>> 3);
                                        if ((Pb & Qb | 0) == 0) {
                                            y[X >> 2] = Pb | Qb;
                                            var Rb = Ob,
                                                Sb = (Nb + 2 << 2) + X + 40 | 0
                                        } else {
                                            var Tb = (Nb + 2 << 2) + X + 40 | 0,
                                                Ub = C[Tb >> 2];
                                            Ub >>> 0 < C[X + 16 >> 2] >>> 0 && ($(), a("Reached an unreachable!")),
                                                Rb = Ub,
                                                Sb = Tb
                                        }
                                        y[Sb >> 2] = B,
                                            y[Rb + 12 >> 2] = B,
                                            y[e + 2] = Rb,
                                            y[e + 3] = Ob;
                                        break a
                                    }
                                    var Vb = B,
                                        Wb = Mb >>> 8;
                                    if ((Wb | 0) == 0) var Xb = 0;
                                    else if (Mb >>> 0 > 16777215) Xb = 31;
                                    else var Yb = (Wb + 1048320 | 0) >>> 16 & 8,
                                            Zb = Wb << Yb,
                                            $b = (Zb + 520192 | 0) >>> 16 & 4,
                                            _b = Zb << $b,
                                            ac = (_b + 245760 | 0) >>> 16 & 2,
                                            bc = 14 - ($b | Yb | ac) + (_b << ac >>> 15) | 0,
                                            Xb = Mb >>> ((bc + 7 | 0) >>> 0) & 1 | bc << 1;
                                    var cc = (Xb << 2) + X + 304 | 0;
                                    y[e + 7] = Xb,
                                        y[e + 5] = 0,
                                        y[e + 4] = 0;
                                    var dc = y[X + 4 >> 2],
                                        ec = 1 << Xb,
                                        fc = (dc & ec | 0) == 0;
                                    c: do
                                        if (fc) y[X + 4 >> 2] = dc | ec,
                                            y[cc >> 2] = Vb,
                                            y[e + 6] = cc,
                                            y[e + 3] = B,
                                            y[e + 2] = B;
                                        else for (var gc = Mb << ((Xb | 0) == 31 ? 0 : 25 - (Xb >>> 1) | 0), hc = y[cc >> 2];;) {
                                            if ((y[hc + 4 >> 2] & -8 | 0) == (Mb | 0)) {
                                                var ic = hc + 8 | 0,
                                                    jc = C[ic >> 2],
                                                    kc = C[X + 16 >> 2],
                                                    lc = hc >>> 0 < kc >>> 0;
                                                do
                                                    if (!lc && jc >>> 0 >= kc >>> 0) {
                                                        y[jc + 12 >> 2] = Vb,
                                                            y[ic >> 2] = Vb,
                                                            y[e + 2] = jc,
                                                            y[e + 3] = hc,
                                                            y[e + 6] = 0;
                                                        break c
                                                    }
                                                while (0);
                                                $(),
                                                    a("Reached an unreachable!")
                                            }
                                            var mc = (gc >>> 31 << 2) + hc + 16 | 0,
                                                nc = C[mc >> 2];
                                            if ((nc | 0) == 0) {
                                                if (mc >>> 0 >= C[X + 16 >> 2] >>> 0) {
                                                    y[mc >> 2] = Vb,
                                                        y[e + 6] = hc,
                                                        y[e + 3] = B,
                                                        y[e + 2] = B;
                                                    break c
                                                }
                                                $(),
                                                    a("Reached an unreachable!")
                                            }
                                            gc <<= 1,
                                                hc = nc
                                        }
                                    while (0);
                                    var oc = y[X + 32 >> 2] - 1 | 0;
                                    y[X + 32 >> 2] = oc;
                                    if ((oc | 0) != 0) break a;
                                    var pc = y[X + 452 >> 2],
                                        qc = (pc | 0) == 0;
                                    c: do
                                        if (!qc) for (var rc = pc;;) {
                                            var sc = y[rc + 8 >> 2];
                                            if ((sc | 0) == 0) break c;
                                            rc = sc
                                        }
                                    while (0);
                                    y[X + 32 >> 2] = -1;
                                    break a
                                }
                            }
                        }
                    }
                while (0);
                $(),
                    a("Reached an unreachable!")
            }
        while (0)
    }
    function Md(b, c) {
        var d, e, f, g = c >>> 0 > 4294967231;
        a: do
            if (g) {
                y[Jd >> 2] = 12;
                var h = 0
            } else {
                f = d = b - 8 | 0,
                    e = (b - 4 | 0) >> 2;
                var i = C[e],
                    j = i & -8,
                    k = j - 8 | 0,
                    l = b + k | 0,
                    m = d >>> 0 < C[X + 16 >> 2] >>> 0;
                do
                    if (!m) {
                        var n = i & 3;
                        if ((n | 0) != 1 & (k | 0) > -8) {
                            d = (b + (j - 4) | 0) >> 2;
                            if ((y[d] & 1 | 0) != 0) {
                                g = c >>> 0 < 11 ? 16 : c + 11 & -8;
                                if ((n | 0) == 0) {
                                    var o = 0,
                                        p, i = y[f + 4 >> 2] & -8;
                                    p = g >>> 0 < 256 ? 0 : i >>> 0 >= (g + 4 | 0) >>> 0 && (i - g | 0) >>> 0 <= y[Cd + 8 >> 2] << 1 >>> 0 ? f: 0,
                                        f = 17
                                } else j >>> 0 < g >>> 0 ? (l | 0) != (y[X + 24 >> 2] | 0) ? f = 21 : (d = y[X + 12 >> 2] + j | 0, d >>> 0 > g >>> 0 ? (o = d - g | 0, p = b + (g - 8) | 0, y[e] = g | i & 1 | 2, y[b + (g - 4) >> 2] = o | 1, y[X + 24 >> 2] = p, y[X + 12 >> 2] = o, o = 0, p = f, f = 17) : f = 21) : (o = j - g | 0, o >>> 0 > 15 ? (y[e] = g | i & 1 | 2, y[b + (g - 4) >> 2] = o | 3, y[d] = y[d] | 1, o = b + g | 0) : o = 0, p = f, f = 17);
                                do
                                    if (f == 17 && (p | 0) != 0) { (o | 0) != 0 && Ld(o),
                                        h = p + 8 | 0;
                                        break a
                                    }
                                while (0);
                                f = ac(c);
                                if ((f | 0) == 0) {
                                    h = 0;
                                    break a
                                }
                                e = j - ((y[e] & 3 | 0) == 0 ? 8 : 4) | 0,
                                    j = f,
                                    i = b,
                                    e = e >>> 0 < c >>> 0 ? e: c;
                                if (e >= 20 && i % 2 == j % 2) if (i % 4 == j % 4) {
                                    for (e = i + e; i % 4;) v[j++] = v[i++];
                                    i >>= 2,
                                        j >>= 2;
                                    for (o = e >> 2; i < o;) y[j++] = y[i++];
                                    i <<= 2;
                                    for (j <<= 2; i < e;) v[j++] = v[i++]
                                } else {
                                    e = i + e,
                                    i % 2 && (v[j++] = v[i++]),
                                        i >>= 1,
                                        j >>= 1;
                                    for (o = e >> 1; i < o;) gb[j++] = gb[i++];
                                    i <<= 1,
                                        j <<= 1,
                                    i < e && (v[j++] = v[i++])
                                } else for (; e--;) v[j++] = v[i++];
                                Ld(b),
                                    h = f;
                                break a
                            }
                        }
                    }
                while (0);
                $(),
                    a("Reached an unreachable!")
            }
        while (0);
        return h
    }
    function Dd() {
        if ((y[Cd >> 2] | 0) == 0) {
            var b = Nd(); (b - 1 & b | 0) == 0 ? (y[Cd + 8 >> 2] = b, y[Cd + 4 >> 2] = b, y[Cd + 12 >> 2] = -1, y[Cd + 16 >> 2] = 2097152, y[Cd + 20 >> 2] = 0, y[X + 440 >> 2] = 0, y[Cd >> 2] = Math.floor(Date.now() / 1e3) & -16 ^ 1431655768) : ($(), a("Reached an unreachable!"))
        }
    }
    function Od(a) {
        if ((a | 0) == 0) a = 0;
        else var a = y[a - 4 >> 2],
            b = a & 3,
            a = (b | 0) == 1 ? 0 : (a & -8) - ((b | 0) == 0 ? 8 : 4) | 0;
        return a
    }
    function Ed(a) {
        var b, c = X + 444 | 0;
        for (b = c >> 2;;) {
            var d = C[b];
            if (d >>> 0 <= a >>> 0 && (d + y[b + 1] | 0) >>> 0 > a >>> 0) {
                var e = c;
                break
            }
            b = C[b + 2];
            if ((b | 0) == 0) {
                e = 0;
                break
            }
            c = b,
                b = c >> 2
        }
        return e
    }
    function Gd(a, b) {
        var c = a + 8 | 0,
            c = (c & 7 | 0) == 0 ? 0 : -c & 7,
            d = b - c | 0;
        y[X + 24 >> 2] = a + c | 0,
            y[X + 12 >> 2] = d,
            y[c + (a + 4) >> 2] = d | 1,
            y[b + (a + 4) >> 2] = 40,
            y[X + 28 >> 2] = y[Cd + 16 >> 2]
    }
    function Hd(b, c, d) {
        var e, f, g, h = c >> 2,
            i = b >> 2,
            j, k = b + 8 | 0,
            k = (k & 7 | 0) == 0 ? 0 : -k & 7;
        f = c + 8 | 0;
        var l = (f & 7 | 0) == 0 ? 0 : -f & 7;
        g = l >> 2;
        var m = c + l | 0,
            n = k + d | 0;
        f = n >> 2;
        var o = b + n | 0,
            p = m - (b + k) - d | 0;
        y[(k + 4 >> 2) + i] = d | 3,
            d = (m | 0) == (y[X + 24 >> 2] | 0);
        a: do
            if (d) {
                var q = y[X + 12 >> 2] + p | 0;
                y[X + 12 >> 2] = q,
                    y[X + 24 >> 2] = o,
                    y[f + (i + 1)] = q | 1
            } else if ((m | 0) == (y[X + 20 >> 2] | 0)) q = y[X + 8 >> 2] + p | 0,
                y[X + 8 >> 2] = q,
                y[X + 20 >> 2] = o,
                y[f + (i + 1)] = q | 1,
                y[(b + q + n | 0) >> 2] = q;
            else {
                var r = C[g + (h + 1)];
                if ((r & 3 | 0) == 1) {
                    var q = r & -8,
                        s = r >>> 3,
                        t = r >>> 0 < 256;
                    b: do
                        if (t) {
                            var u = C[((l | 8) >> 2) + h],
                                v = C[g + (h + 3)];
                            if ((u | 0) == (v | 0)) y[X >> 2] = y[X >> 2] & (1 << s ^ -1);
                            else {
                                var w = ((r >>> 2 & 1073741822) << 2) + X + 40 | 0;
                                j = (u | 0) == (w | 0) ? 15 : u >>> 0 < C[X + 16 >> 2] >>> 0 ? 18 : 15;
                                do
                                    if (j == 15 && !((v | 0) != (w | 0) && v >>> 0 < C[X + 16 >> 2] >>> 0)) {
                                        y[u + 12 >> 2] = v,
                                            y[v + 8 >> 2] = u;
                                        break b
                                    }
                                while (0);
                                $(),
                                    a("Reached an unreachable!")
                            }
                        } else {
                            j = m,
                                u = C[((l | 24) >> 2) + h],
                                v = C[g + (h + 3)],
                                w = (v | 0) == (j | 0);
                            do {
                                if (w) {
                                    e = l | 16;
                                    var x = e + (c + 4) | 0,
                                        z = y[x >> 2];
                                    if ((z | 0) == 0) {
                                        e = c + e | 0,
                                            z = y[e >> 2];
                                        if ((z | 0) == 0) {
                                            z = 0,
                                                e = z >> 2;
                                            break
                                        }
                                    } else e = x;
                                    for (;;) {
                                        var x = z + 20 | 0,
                                            A = y[x >> 2];
                                        if ((A | 0) == 0) {
                                            x = z + 16 | 0,
                                                A = C[x >> 2];
                                            if ((A | 0) == 0) break
                                        }
                                        e = x,
                                            z = A
                                    }
                                    e >>> 0 < C[X + 16 >> 2] >>> 0 && ($(), a("Reached an unreachable!")),
                                        y[e >> 2] = 0
                                } else e = C[((l | 8) >> 2) + h], e >>> 0 < C[X + 16 >> 2] >>> 0 && ($(), a("Reached an unreachable!")), y[e + 12 >> 2] = v, y[v + 8 >> 2] = e, z = v;
                                e = z >> 2
                            } while ( 0 );
                            if ((u | 0) != 0) {
                                v = l + (c + 28) | 0,
                                    w = (y[v >> 2] << 2) + X + 304 | 0,
                                    x = (j | 0) == (y[w >> 2] | 0);
                                do {
                                    if (x) {
                                        y[w >> 2] = z;
                                        if ((z | 0) != 0) break;
                                        y[X + 4 >> 2] = y[X + 4 >> 2] & (1 << y[v >> 2] ^ -1);
                                        break b
                                    }
                                    u >>> 0 < C[X + 16 >> 2] >>> 0 && ($(), a("Reached an unreachable!")), A = u + 16 | 0, (y[A >> 2] | 0) == (j | 0) ? y[A >> 2] = z: y[u + 20 >> 2] = z;
                                    if ((z | 0) == 0) break b
                                } while ( 0 );
                                z >>> 0 < C[X + 16 >> 2] >>> 0 && ($(), a("Reached an unreachable!")),
                                    y[e + 6] = u,
                                    j = l | 16,
                                    u = C[(j >> 2) + h],
                                (u | 0) != 0 && (u >>> 0 < C[X + 16 >> 2] >>> 0 && ($(), a("Reached an unreachable!")), y[e + 4] = u, y[u + 24 >> 2] = z),
                                    j = C[(j + 4 >> 2) + h],
                                (j | 0) != 0 && (j >>> 0 < C[X + 16 >> 2] >>> 0 && ($(), a("Reached an unreachable!")), y[e + 5] = j, y[j + 24 >> 2] = z)
                            }
                        }
                    while (0);
                    r = c + (q | l) | 0,
                        q = q + p | 0
                } else r = m,
                    q = p;
                r = r + 4 | 0,
                    y[r >> 2] = y[r >> 2] & -2,
                    y[f + (i + 1)] = q | 1,
                    y[(q >> 2) + i + f] = q;
                if (q >>> 0 < 256) s = q >>> 2 & 1073741822,
                    r = (s << 2) + X + 40 | 0,
                    t = C[X >> 2],
                    q = 1 << (q >>> 3),
                    (t & q | 0) == 0 ? (y[X >> 2] = t | q, q = r, s = (s + 2 << 2) + X + 40 | 0) : (s = (s + 2 << 2) + X + 40 | 0, q = C[s >> 2], q >>> 0 < C[X + 16 >> 2] >>> 0 && ($(), a("Reached an unreachable!"))),
                    y[s >> 2] = o,
                    y[q + 12 >> 2] = o,
                    y[f + (i + 2)] = q,
                    y[f + (i + 3)] = r;
                else {
                    r = o,
                        t = q >>> 8,
                        (t | 0) == 0 ? s = 0 : q >>> 0 > 16777215 ? s = 31 : (s = (t + 1048320 | 0) >>> 16 & 8, j = t << s, t = (j + 520192 | 0) >>> 16 & 4, j <<= t, u = (j + 245760 | 0) >>> 16 & 2, s = 14 - (t | s | u) + (j << u >>> 15) | 0, s = q >>> ((s + 7 | 0) >>> 0) & 1 | s << 1),
                        t = (s << 2) + X + 304 | 0,
                        y[f + (i + 7)] = s,
                        j = n + (b + 16) | 0,
                        y[f + (i + 5)] = 0,
                        y[j >> 2] = 0,
                        j = y[X + 4 >> 2],
                        u = 1 << s;
                    if ((j & u | 0) == 0) y[X + 4 >> 2] = j | u,
                        y[t >> 2] = r,
                        y[f + (i + 6)] = t,
                        y[f + (i + 3)] = r,
                        y[f + (i + 2)] = r;
                    else {
                        s = q << ((s | 0) == 31 ? 0 : 25 - (s >>> 1) | 0);
                        for (t = y[t >> 2];;) {
                            if ((y[t + 4 >> 2] & -8 | 0) == (q | 0)) {
                                j = t + 8 | 0,
                                    u = C[j >> 2],
                                    v = C[X + 16 >> 2],
                                    w = t >>> 0 < v >>> 0;
                                do
                                    if (!w && u >>> 0 >= v >>> 0) {
                                        y[u + 12 >> 2] = r,
                                            y[j >> 2] = r,
                                            y[f + (i + 2)] = u,
                                            y[f + (i + 3)] = t,
                                            y[f + (i + 6)] = 0;
                                        break a
                                    }
                                while (0);
                                $(),
                                    a("Reached an unreachable!")
                            }
                            j = (s >>> 31 << 2) + t + 16 | 0,
                                u = C[j >> 2];
                            if ((u | 0) == 0) {
                                if (j >>> 0 >= C[X + 16 >> 2] >>> 0) {
                                    y[j >> 2] = r,
                                        y[f + (i + 6)] = t,
                                        y[f + (i + 3)] = r,
                                        y[f + (i + 2)] = r;
                                    break a
                                }
                                $(),
                                    a("Reached an unreachable!")
                            }
                            s <<= 1,
                                t = u
                        }
                    }
                }
            }
        while (0);
        return b + (k | 8) | 0
    }
    function Id(b, c) {
        var d, e, f = C[X + 24 >> 2];
        e = f >> 2;
        var g = Ed(f),
            h = y[g >> 2];
        d = y[g + 4 >> 2];
        var g = h + d | 0,
            i = h + (d - 39) | 0,
            h = h + (d - 47) + ((i & 7 | 0) == 0 ? 0 : -i & 7) | 0,
            h = h >>> 0 < (f + 16 | 0) >>> 0 ? f: h,
            i = h + 8 | 0;
        d = i >> 2,
            Gd(b, c - 40 | 0),
            y[(h + 4 | 0) >> 2] = 27,
            y[d] = y[X + 444 >> 2],
            y[d + 1] = y[X + 448 >> 2],
            y[d + 2] = y[X + 452 >> 2],
            y[d + 3] = y[X + 456 >> 2],
            y[X + 444 >> 2] = b,
            y[X + 448 >> 2] = c,
            y[X + 456 >> 2] = 0,
            y[X + 452 >> 2] = i,
            d = h + 28 | 0,
            y[d >> 2] = 7,
            i = (h + 32 | 0) >>> 0 < g >>> 0;
        a: do
            if (i) for (var j = d;;) {
                var k = j + 4 | 0;
                y[k >> 2] = 7;
                if ((j + 8 | 0) >>> 0 >= g >>> 0) break a;
                j = k
            }
        while (0);
        g = (h | 0) == (f | 0);
        a: do
            if (!g) {
                d = h - f | 0,
                    i = f + d | 0,
                    j = d + (f + 4) | 0,
                    y[j >> 2] = y[j >> 2] & -2,
                    y[e + 1] = d | 1,
                    y[i >> 2] = d;
                if (d >>> 0 < 256) j = d >>> 2 & 1073741822,
                    i = (j << 2) + X + 40 | 0,
                    k = C[X >> 2],
                    d = 1 << (d >>> 3),
                    (k & d | 0) == 0 ? (y[X >> 2] = k | d, d = i, j = (j + 2 << 2) + X + 40 | 0) : (j = (j + 2 << 2) + X + 40 | 0, d = C[j >> 2], d >>> 0 < C[X + 16 >> 2] >>> 0 && ($(), a("Reached an unreachable!"))),
                    y[j >> 2] = f,
                    y[d + 12 >> 2] = f,
                    y[e + 2] = d,
                    y[e + 3] = i;
                else {
                    i = f,
                        k = d >>> 8;
                    if ((k | 0) == 0) j = 0;
                    else if (d >>> 0 > 16777215) j = 31;
                    else var j = (k + 1048320 | 0) >>> 16 & 8,
                            l = k << j,
                            k = (l + 520192 | 0) >>> 16 & 4,
                            l = l << k,
                            m = (l + 245760 | 0) >>> 16 & 2,
                            j = 14 - (k | j | m) + (l << m >>> 15) | 0,
                            j = d >>> ((j + 7 | 0) >>> 0) & 1 | j << 1;
                    k = (j << 2) + X + 304 | 0,
                        y[e + 7] = j,
                        y[e + 5] = 0,
                        y[e + 4] = 0,
                        l = y[X + 4 >> 2],
                        m = 1 << j;
                    if ((l & m | 0) == 0) y[X + 4 >> 2] = l | m,
                        y[k >> 2] = i,
                        y[e + 6] = k,
                        y[e + 3] = f,
                        y[e + 2] = f;
                    else {
                        j = d << ((j | 0) == 31 ? 0 : 25 - (j >>> 1) | 0);
                        for (k = y[k >> 2];;) {
                            if ((y[k + 4 >> 2] & -8 | 0) == (d | 0)) {
                                var l = k + 8 | 0,
                                    m = C[l >> 2],
                                    n = C[X + 16 >> 2],
                                    o = k >>> 0 < n >>> 0;
                                do
                                    if (!o && m >>> 0 >= n >>> 0) {
                                        y[m + 12 >> 2] = i,
                                            y[l >> 2] = i,
                                            y[e + 2] = m,
                                            y[e + 3] = k,
                                            y[e + 6] = 0;
                                        break a
                                    }
                                while (0);
                                $(),
                                    a("Reached an unreachable!")
                            }
                            l = (j >>> 31 << 2) + k + 16 | 0,
                                m = C[l >> 2];
                            if ((m | 0) == 0) {
                                if (l >>> 0 >= C[X + 16 >> 2] >>> 0) {
                                    y[l >> 2] = i,
                                        y[e + 6] = k,
                                        y[e + 3] = f,
                                        y[e + 2] = f;
                                    break a
                                }
                                $(),
                                    a("Reached an unreachable!")
                            }
                            j <<= 1,
                                k = m
                        }
                    }
                }
            }
        while (0)
    }
    function yc(a, b) {
        function c(a) {
            var c;
            return a === "double" ? c = (Zb[0] = y[b + e >> 2], Zb[1] = y[b + e + 4 >> 2], Yb[0]) : a == "i64" ? c = [y[b + e >> 2], y[b + e + 4 >> 2]] : (a = "i32", c = y[b + e >> 2]),
                e += Math.max(Wa(a), Xa),
                c
        }
        for (var d = a,
                 e = 0,
                 f = [], g, h;;) {
            var i = d;
            g = v[d];
            if (g === 0) break;
            h = v[d + 1];
            if (g == 37) {
                var j = n,
                    k = n,
                    m = n,
                    o = n;
                a: for (;;) {
                    switch (h) {
                        case 43:
                            j = l;
                            break;
                        case 45:
                            k = l;
                            break;
                        case 35:
                            m = l;
                            break;
                        case 48:
                            if (o) break a;
                            o = l;
                            break;
                        default:
                            break a
                    }
                    d++,
                        h = v[d + 1]
                }
                var p = 0;
                if (h == 42) p = c("i32"),
                    d++,
                    h = v[d + 1];
                else for (; h >= 48 && h <= 57;) p = p * 10 + (h - 48),
                    d++,
                    h = v[d + 1];
                var q = n;
                if (h == 46) {
                    var r = 0,
                        q = l;
                    d++,
                        h = v[d + 1];
                    if (h == 42) r = c("i32"),
                        d++;
                    else for (;;) {
                        h = v[d + 1];
                        if (h < 48 || h > 57) break;
                        r = r * 10 + (h - 48),
                            d++
                    }
                    h = v[d + 1]
                } else r = 6;
                var s;
                switch (String.fromCharCode(h)) {
                    case "h":
                        h = v[d + 2],
                            h == 104 ? (d++, s = 1) : s = 2;
                        break;
                    case "l":
                        h = v[d + 2],
                            h == 108 ? (d++, s = 8) : s = 4;
                        break;
                    case "L":
                    case "q":
                    case "j":
                        s = 8;
                        break;
                    case "z":
                    case "t":
                    case "I":
                        s = 4;
                        break;
                    default:
                        s = pa
                }
                s && d++,
                    h = v[d + 1];
                if (["d", "i", "u", "o", "x", "X", "p"].indexOf(String.fromCharCode(h)) != -1) {
                    i = h == 100 || h == 105,
                        s = s || 4,
                        g = c("i" + s * 8),
                    s == 8 && (g = h == 117 ? (g[0] >>> 0) + (g[1] >>> 0) * 4294967296 : (g[0] >>> 0) + (g[1] | 0) * 4294967296),
                    s <= 4 && (g = (i ? vc: uc)(g & Math.pow(256, s) - 1, s * 8));
                    var t = Math.abs(g),
                        u,
                        i = "";
                    if (h == 100 || h == 105) u = vc(g, 8 * s).toString(10);
                    else if (h == 117) u = uc(g, 8 * s).toString(10),
                        g = Math.abs(g);
                    else if (h == 111) u = (m ? "0": "") + t.toString(8);
                    else if (h == 120 || h == 88) {
                        i = m ? "0x": "";
                        if (g < 0) {
                            g = -g,
                                u = (t - 1).toString(16),
                                m = [];
                            for (t = 0; t < u.length; t++) m.push((15 - parseInt(u[t], 16)).toString(16));
                            for (u = m.join(""); u.length < s * 2;) u = "f" + u
                        } else u = t.toString(16);
                        h == 88 && (i = i.toUpperCase(), u = u.toUpperCase())
                    } else h == 112 && (t === 0 ? u = "(nil)": (i = "0x", u = t.toString(16)));
                    if (q) for (; u.length < r;) u = "0" + u;
                    for (j && (i = g < 0 ? "-" + i: "+" + i); i.length + u.length < p;) k ? u += " ": o ? u = "0" + u: i = " " + i;
                    u = i + u,
                        u.split("").forEach(function(a) {
                            f.push(a.charCodeAt(0))
                        })
                } else if (["f", "F", "e", "E", "g", "G"].indexOf(String.fromCharCode(h)) != -1) {
                    g = c("double");
                    if (isNaN(g)) u = "nan",
                        o = n;
                    else if (isFinite(g)) {
                        q = n,
                            s = Math.min(r, 20);
                        if (h == 103 || h == 71) q = l,
                            r = r || 1,
                            s = parseInt(g.toExponential(s).split("e")[1], 10),
                            r > s && s >= -4 ? (h = (h == 103 ? "f": "F").charCodeAt(0), r -= s + 1) : (h = (h == 103 ? "e": "E").charCodeAt(0), r--),
                            s = Math.min(r, 20);
                        if (h == 101 || h == 69) u = g.toExponential(s),
                        /[eE][-+]\d$/.test(u) && (u = u.slice(0, -1) + "0" + u.slice( - 1));
                        else if (h == 102 || h == 70) u = g.toFixed(s);
                        i = u.split("e");
                        if (q && !m) for (; i[0].length > 1 && i[0].indexOf(".") != -1 && (i[0].slice( - 1) == "0" || i[0].slice( - 1) == ".");) i[0] = i[0].slice(0, -1);
                        else for (m && u.indexOf(".") == -1 && (i[0] = i[0] + "."); r > s++;) i[0] = i[0] + "0";
                        u = i[0] + (i.length > 1 ? "e" + i[1] : ""),
                        h == 69 && (u = u.toUpperCase()),
                        j && g >= 0 && (u = "+" + u)
                    } else u = (g < 0 ? "-": "") + "inf",
                        o = n;
                    for (; u.length < p;) u = k ? u + " ": !o || u[0] != "-" && u[0] != "+" ? (o ? "0": " ") + u: u[0] + "0" + u.slice(1);
                    h < 97 && (u = u.toUpperCase()),
                        u.split("").forEach(function(a) {
                            f.push(a.charCodeAt(0))
                        })
                } else if (h == 115) { (j = c("i8*")) ? (j = tc(j), q && j.length > r && (j = j.slice(0, r))) : j = jc("(null)", l);
                    if (!k) for (; j.length < p--;) f.push(32);
                    f = f.concat(j);
                    if (k) for (; j.length < p--;) f.push(32)
                } else if (h == 99) {
                    for (k && f.push(c("i8")); --p > 0;) f.push(32);
                    k || f.push(c("i8"))
                } else if (h == 110) k = c("i32*"),
                    y[k >> 2] = f.length;
                else if (h == 37) f.push(g);
                else for (t = i; t < d + 2; t++) f.push(v[t]);
                d += 2
            } else f.push(g),
                d += 1
        }
        return f
    }
    function Xd(a) {
        Jd || (Jd = G([0], "i32", D)),
            y[Jd >> 2] = a
    }
    function be(a, b) {
        if (typeof a != "string") return pa;
        b === aa && (b = "/"),
        a && a[0] == "/" && (b = "");
        for (var c = (b + "/" + a).split("/").reverse(), d = [""]; c.length;) {
            var e = c.pop();
            e == "" || e == "." || (e == ".." ? d.length > 1 && d.pop() : d.push(e))
        }
        return d.length == 1 ? "/": d.join("/")
    }
    function ce(a, b, c) {
        var d = {
                ga: n,
                l: n,
                error: 0,
                name: pa,
                path: pa,
                object: pa,
                v: n,
                z: pa,
                w: pa
            },
            a = be(a);
        if (a == "/") d.ga = l,
            d.l = d.v = l,
            d.name = "/",
            d.path = d.z = "/",
            d.object = d.w = de;
        else if (a !== pa) for (var c = c || 0,
                                    a = a.slice(1).split("/"), e = de, f = [""]; a.length;) {
            a.length == 1 && e.d && (d.v = l, d.z = f.length == 1 ? "/": f.join("/"), d.w = e, d.name = a[0]);
            var g = a.shift();
            if (!e.d) {
                d.error = 20;
                break
            }
            if (!e.A) {
                d.error = Pd;
                break
            }
            if (!e.c.hasOwnProperty(g)) {
                d.error = 2;
                break
            }
            e = e.c[g];
            if (e.link && (!b || a.length != 0)) {
                if (c > 40) {
                    d.error = 40;
                    break
                }
                return d = be(e.link, f.join("/")),
                    ce([d].concat(a).join("/"), b, c + 1)
            }
            f.push(g),
            a.length == 0 && (d.l = l, d.path = f.join("/"), d.object = e)
        }
        return d
    }
    function ee(a) {
        return fe(),
            a = ce(a, aa),
            a.l ? a.object: (Xd(a.error), pa)
    }
    function ge(b, c, d, e, f) {
        b || (b = "/"),
        typeof b == "string" && (b = ee(b)),
        b || (Xd(Pd), a(Error("Parent path must exist."))),
        b.d || (Xd(20), a(Error("Parent must be a folder."))),
        !b.write && !ae && (Xd(Pd), a(Error("Parent folder must be writeable.")));
        if (!c || c == "." || c == "..") Xd(2),
            a(Error("Name must not be empty."));
        b.c.hasOwnProperty(c) && (Xd(17), a(Error("Can't overwrite object."))),
            b.c[c] = {
                A: e === aa ? l: e,
                write: f === aa ? n: f,
                timestamp: Date.now(),
                fa: $d++
            };
        for (var g in d) d.hasOwnProperty(g) && (b.c[c][g] = d[g]);
        return b.c[c]
    }
    function he(a, b) {
        return ge(a, b, {
                d: l,
                h: n,
                c: {}
            },
            l, l)
    }
    function ie() {
        var b = "dev/shm/tmp",
            c = ee("/");
        c === pa && a(Error("Invalid parent."));
        for (b = b.split("/").reverse(); b.length;) {
            var d = b.pop();
            d && (c.c.hasOwnProperty(d) || he(c, d), c = c.c[d])
        }
    }
    function je(b, c, d, e) { ! d && !e && a(Error("A device must have at least one callback defined."));
        var f = {
            h: l,
            input: d,
            e: e
        };
        return f.d = n,
            ge(b, c, f, Boolean(d), Boolean(e))
    }
    function fe() {
        de || (de = {
            A: l,
            write: l,
            d: l,
            h: n,
            timestamp: Date.now(),
            fa: 1,
            c: {}
        })
    }
    function ke() {
        function d(a) {
            a === pa || a === 10 ? (b.j(b.buffer.join("")), b.buffer = []) : b.buffer.push(String.fromCharCode(a))
        }
        var a, b, c;
        Ya(!le, "FS.init was previously called. If you want to initialize later with custom parameters, remove any earlier calls (note that one is automatically added to the generated code)"),
            le = l,
            fe(),
            a = a || Module.stdin,
            b = b || Module.stdout,
            c = c || Module.stderr;
        var e = l,
            f = l,
            g = l;
        a || (e = n, a = function() {
            if (!a.k || !a.k.length) {
                var b;
                typeof window != "undefined" && typeof window.prompt == "function" ? b = window.prompt("Input: ") : typeof readline == "function" && (b = readline()),
                b || (b = ""),
                    a.k = jc(b + "\n", l)
            }
            return a.k.shift()
        }),
        b || (f = n, b = d),
        b.j || (b.j = print),
        b.buffer || (b.buffer = []),
        c || (g = n, c = d),
        c.j || (c.j = print),
        c.buffer || (c.buffer = []),
            he("/", "tmp");
        var h = he("/", "dev"),
            i = je(h, "stdin", a),
            j = je(h, "stdout", pa, b);
        c = je(h, "stderr", pa, c),
            je(h, "tty", a, b),
            Ec[1] = {
                path: "/dev/stdin",
                object: i,
                position: 0,
                t: l,
                i: n,
                s: n,
                u: !e,
                error: n,
                q: n,
                B: []
            },
            Ec[2] = {
                path: "/dev/stdout",
                object: j,
                position: 0,
                t: n,
                i: l,
                s: n,
                u: !f,
                error: n,
                q: n,
                B: []
            },
            Ec[3] = {
                path: "/dev/stderr",
                object: c,
                position: 0,
                t: n,
                i: l,
                s: n,
                u: !g,
                error: n,
                q: n,
                B: []
            },
            Yd = G([1], "void*", D),
            zc = G([2], "void*", D),
            Zd = G([3], "void*", D),
            ie(),
            Ec[Yd] = Ec[1],
            Ec[zc] = Ec[2],
            Ec[Zd] = Ec[3],
            G([G([0, 0, 0, 0, Yd, 0, 0, 0, zc, 0, 0, 0, Zd, 0, 0, 0], "void*", D)], "void*", D)
    }
    function Dc(a, b, c) {
        var d = Ec[a];
        if (d) {
            if (d.i) {
                if (c < 0) return Xd(Rd),
                    -1;
                if (d.object.h) {
                    if (d.object.e) {
                        for (var e = 0; e < c; e++) try {
                            d.object.e(v[b + e])
                        } catch(f) {
                            return Xd(Sd),
                                -1
                        }
                        return d.object.timestamp = Date.now(),
                            e
                    }
                    return Xd(Wd),
                        -1
                }
                e = d.position,
                    a = Ec[a];
                if (!a || a.object.h) Xd(Qd),
                    b = -1;
                else if (a.i) if (a.object.d) Xd(Vd),
                    b = -1;
                else if (c < 0 || e < 0) Xd(Rd),
                    b = -1;
                else {
                    for (var g = a.object.c; g.length < e;) g.push(0);
                    for (var h = 0; h < c; h++) g[e + h] = z[b + h];
                    a.object.timestamp = Date.now(),
                        b = h
                } else Xd(Pd),
                    b = -1;
                return b != -1 && (d.position = d.position + b),
                    b
            }
            return Xd(Pd),
                -1
        }
        return Xd(Qd),
            -1
    }
    function bc(a, b, c) {
        if (c >= 20) {
            for (c = a + c; a % 4;) v[a++] = b;
            b < 0 && (b += 256);
            for (var a = a >> 2,
                     d = c >> 2,
                     e = b | b << 8 | b << 16 | b << 24; a < d;) y[a++] = e;
            for (a <<= 2; a < c;) v[a++] = b
        } else for (; c--;) v[a++] = b
    }
    function $() {
        a("ABORT: undefined, at " + Error().stack)
    }
    function Nd() {
        switch (8) {
            case 8:
                return ec;
            case 54:
            case 56:
            case 21:
            case 61:
            case 63:
            case 22:
            case 67:
            case 23:
            case 24:
            case 25:
            case 26:
            case 27:
            case 69:
            case 28:
            case 101:
            case 70:
            case 71:
            case 29:
            case 30:
            case 199:
            case 75:
            case 76:
            case 32:
            case 43:
            case 44:
            case 80:
            case 46:
            case 47:
            case 45:
            case 48:
            case 49:
            case 42:
            case 82:
            case 33:
            case 7:
            case 108:
            case 109:
            case 107:
            case 112:
            case 119:
            case 121:
                return 200809;
            case 13:
            case 104:
            case 94:
            case 95:
            case 34:
            case 35:
            case 77:
            case 81:
            case 83:
            case 84:
            case 85:
            case 86:
            case 87:
            case 88:
            case 89:
            case 90:
            case 91:
            case 94:
            case 95:
            case 110:
            case 111:
            case 113:
            case 114:
            case 115:
            case 116:
            case 117:
            case 118:
            case 120:
            case 40:
            case 16:
            case 79:
            case 19:
                return - 1;
            case 92:
            case 93:
            case 5:
            case 72:
            case 6:
            case 74:
            case 92:
            case 93:
            case 96:
            case 97:
            case 98:
            case 99:
            case 102:
            case 103:
            case 105:
                return 1;
            case 38:
            case 66:
            case 50:
            case 51:
            case 4:
                return 1024;
            case 15:
            case 64:
            case 41:
                return 32;
            case 55:
            case 37:
            case 17:
                return 2147483647;
            case 18:
            case 1:
                return 47839;
            case 59:
            case 57:
                return 99;
            case 68:
            case 58:
                return 2048;
            case 0:
                return 2097152;
            case 3:
                return 65536;
            case 14:
                return 32768;
            case 73:
                return 32767;
            case 39:
                return 16384;
            case 60:
                return 1e3;
            case 106:
                return 700;
            case 52:
                return 256;
            case 62:
                return 255;
            case 2:
                return 100;
            case 65:
                return 64;
            case 36:
                return 20;
            case 100:
                return 16;
            case 20:
                return 6;
            case 53:
                return 4
        }
        return Xd(Rd),
            -1
    }
    function Fd(a) {
        me || (eb = eb + 4095 >> 12 << 12, me = l);
        var b = eb;
        return a != 0 && db(a),
            b
    }
    function se(a) {
        a = a || Module.arguments,
            nc(pc);
        var b = pa;
        return Module._main && (b = Module.ea(a), Module.noExitRuntime || nc(qc)),
            b
    }
    var requirejs, require, define; (function(a) {
        function g(a, b) {
            if (a && a.charAt(0) === "." && b) {
                b = b.split("/"),
                    b = b.slice(0, b.length - 1),
                    a = b.concat(a.split("/"));
                var c, d;
                for (c = 0; d = a[c]; c++) if (d === ".") a.splice(c, 1),
                    c -= 1;
                else if (d === "..") {
                    if (c === 1 && (a[2] === ".." || a[0] === "..")) break;
                    c > 0 && (a.splice(c - 1, 2), c -= 2)
                }
                a = a.join("/")
            }
            return a
        }
        function h(b, c) {
            return function() {
                return f.apply(a, d.call(arguments, 0).concat([b, c]))
            }
        }
        function i(a) {
            return function(b) {
                return g(b, a)
            }
        }
        function j(a) {
            return function(c) {
                b[a] = c
            }
        }
        function k(d) {
            if (c.hasOwnProperty(d)) {
                var f = c[d];
                delete c[d],
                    e.apply(a, f)
            }
            return b[d]
        }
        function l(a, b) {
            var c, d, e = a.indexOf("!");
            return e !== -1 ? (c = g(a.slice(0, e), b), a = a.slice(e + 1), d = k(c), d && d.normalize ? a = d.normalize(a, i(b)) : a = g(a, b)) : a = g(a, b),
                {
                    f: c ? c + "!" + a: a,
                    n: a,
                    p: d
                }
        }
        var b = {},
            c = {},
            d = [].slice,
            e,
            f;
        if (typeof define == "function") return;
        e = function(d, e, f, g) {
            var i = [],
                m,
                n,
                o,
                p,
                q,
                r;
            g || (g = d);
            if (typeof f == "function") { ! e.length && f.length && (e = ["require", "exports", "module"]);
                for (p = 0; p < e.length; p++) {
                    r = l(e[p], g),
                        o = r.f;
                    if (o === "require") i[p] = h(d);
                    else if (o === "exports") i[p] = b[d] = {},
                        m = !0;
                    else if (o === "module") n = i[p] = {
                        id: d,
                        uri: "",
                        exports: b[d]
                    };
                    else if (b.hasOwnProperty(o) || c.hasOwnProperty(o)) i[p] = k(o);
                    else {
                        if (!r.p) throw d + " missing " + o;
                        r.p.load(r.n, h(g, !0), j(o), {}),
                            i[p] = b[o]
                    }
                }
                q = f.apply(b[d], i),
                d && (n && n.exports !== a ? b[d] = n.exports: m || (b[d] = q))
            } else d && (b[d] = f)
        },
            requirejs = f = function(b, c, d, g) {
                return typeof b == "string" ? k(l(b, c).f) : (b.splice || (c.splice ? (b = c, c = arguments[2]) : b = []), g ? e(a, b, c, d) : setTimeout(function() {
                        e(a, b, c, d)
                    },
                    15), f)
            },
            f.config = function() {
                return f
            },
        require || (require = f),
            define = function(a, b, d) {
                b.splice || (d = b, b = []),
                    define.unordered ? c[a] = [a, b, d] : e(a, b, d)
            },
            define.amd = {
                jQuery: !0
            }
    })(),
        define("requirejs/almond.js",
            function() {}),
        define("texture-util/native-img", [],
            function() {
                function h(a) {
                    var d;
                    e.length ? (d = e.shift(), a.loadTexture(d.gl, d.src, d.texture, d.generateMipmaps, d.callback)) : b[c++] = a
                }
                function i(a, i, j, k, l) {
                    var m;
                    c ? (m = b[--c], m.loadTexture(a, i, j, k, l)) : d ? (m = new f(h), m.loadTexture(a, i, j, k, l), --d) : e.push(new g(a, i, j, k, l))
                }
                function j(a, b, c) {
                    var d = a.createTexture();
                    return i(a, b, d, !0, c),
                        d
                }
                var a = 16,
                    b = new Array(a),
                    c = 0,
                    d = a,
                    e = [],
                    f = function(a) {
                        var b = this;
                        this.gl = null,
                            this.texture = null,
                            this.callback = null,
                            this.generateMipmaps = !0,
                            this.image = new Image,
                            this.image.addEventListener("load",
                                function() {
                                    var c = b.gl;
                                    c.bindTexture(c.TEXTURE_2D, b.texture),
                                        c.texImage2D(c.TEXTURE_2D, 0, c.RGBA, c.RGBA, c.UNSIGNED_BYTE, b.image),
                                        c.texParameteri(c.TEXTURE_2D, c.TEXTURE_MAG_FILTER, c.LINEAR),
                                        c.texParameteri(c.TEXTURE_2D, c.TEXTURE_MIN_FILTER, b.generateMipmaps > 1 ? c.LINEAR_MIPMAP_LINEAR: c.LINEAR),
                                    b.generateMipmaps && c.generateMipmap(c.TEXTURE_2D),
                                        a(b),
                                    b.callback && b.callback(b.texture, b.image.width, b.image.height)
                                })
                    };
                f.prototype.loadTexture = function(a, b, c, d, e) {
                    this.gl = a,
                        this.texture = c,
                        this.generateMipmaps = d !== !1,
                        this.callback = e,
                        this.image.src = b
                };
                var g = function(a, b, c, d, e) {
                    this.gl = a,
                        this.src = b,
                        this.texture = c,
                        this.generateMipmaps = d !== !1,
                        this.callback = e
                };
                return {
                    loadIMGTextureEx: i,
                    loadIMGTexture: j
                }
            }),
        define("texture-util/dds", [],
            function() {
                function A(a) {
                    return a.charCodeAt(0) + (a.charCodeAt(1) << 8) + (a.charCodeAt(2) << 16) + (a.charCodeAt(3) << 24)
                }
                function B(a) {
                    return String.fromCharCode(a & 255, a >> 8 & 255, a >> 16 & 255, a >> 24 & 255)
                }
                function O(a, b, c, d) {
                    var e = new Uint16Array(4),
                        f = new Uint16Array(c * d),
                        g = c * d / 4,
                        h = 0,
                        i = 0,
                        j = 0,
                        k = 0,
                        l = 0,
                        m = 0,
                        n = 0,
                        o = 0,
                        p = 0,
                        q = c / 4,
                        r = d / 4;
                    for (var s = 0; s < r; s++) for (var t = 0; t < q; t++) j = b + 4 * (s * q + t),
                        e[0] = a[j],
                        e[1] = a[j + 1],
                        k = e[0] & 31,
                        l = e[0] & 2016,
                        m = e[0] & 63488,
                        n = e[1] & 31,
                        o = e[1] & 2016,
                        p = e[1] & 63488,
                        e[2] = 5 * k + 3 * n >> 3 | 5 * l + 3 * o >> 3 & 2016 | 5 * m + 3 * p >> 3 & 63488,
                        e[3] = 5 * n + 3 * k >> 3 | 5 * o + 3 * l >> 3 & 2016 | 5 * p + 3 * m >> 3 & 63488,
                        h = a[j + 2],
                        i = s * 4 * c + t * 4,
                        f[i] = e[h & 3],
                        f[i + 1] = e[h >> 2 & 3],
                        f[i + 2] = e[h >> 4 & 3],
                        f[i + 3] = e[h >> 6 & 3],
                        i += c,
                        f[i] = e[h >> 8 & 3],
                        f[i + 1] = e[h >> 10 & 3],
                        f[i + 2] = e[h >> 12 & 3],
                        f[i + 3] = e[h >> 14],
                        h = a[j + 3],
                        i += c,
                        f[i] = e[h & 3],
                        f[i + 1] = e[h >> 2 & 3],
                        f[i + 2] = e[h >> 4 & 3],
                        f[i + 3] = e[h >> 6 & 3],
                        i += c,
                        f[i] = e[h >> 8 & 3],
                        f[i + 1] = e[h >> 10 & 3],
                        f[i + 2] = e[h >> 12 & 3],
                        f[i + 3] = e[h >> 14];
                    return f
                }
                function P(b, c, d, e) {
                    var f = new Int32Array(d, 0, F),
                        h,
                        i,
                        j,
                        k,
                        l,
                        m,
                        n,
                        o,
                        p,
                        q,
                        r;
                    if (f[G] != a) return console.error("Invalid magic number in DDS header"),
                        0;
                    if (!f[M] & w) return console.error("Unsupported format, must contain a FourCC code"),
                        0;
                    h = f[N];
                    switch (h) {
                        case C:
                            i = 8,
                                j = c ? c.COMPRESSED_RGB_S3TC_DXT1_EXT: null;
                            break;
                        case D:
                            i = 16,
                                j = c ? c.COMPRESSED_RGBA_S3TC_DXT3_EXT: null;
                            break;
                        case E:
                            i = 16,
                                j = c ? c.COMPRESSED_RGBA_S3TC_DXT5_EXT: null;
                            break;
                        default:
                            return console.error("Unsupported FourCC code:", B(h)),
                                {
                                    mipmaps: 0,
                                    width: 0,
                                    height: 0
                                }
                    }
                    q = 1,
                    f[I] & g && e !== !1 && (q = Math.max(1, f[L])),
                        k = f[K],
                        l = f[J],
                        n = f[H] + 4;
                    var s = k,
                        t = l;
                    if (c) for (r = 0; r < q; ++r) m = Math.max(4, k) / 4 * Math.max(4, l) / 4 * i,
                        p = new Uint8Array(d, n, m),
                        b.compressedTexImage2D(b.TEXTURE_2D, r, j, k, l, 0, p),
                        n += m,
                        k *= .5,
                        l *= .5;
                    else {
                        if (h != C) return console.error("No manual decoder for", B(h), "and no native support"),
                            {
                                mipmaps: 0,
                                width: 0,
                                height: 0
                            };
                        m = Math.max(4, k) / 4 * Math.max(4, l) / 4 * i,
                            p = new Uint16Array(d),
                            o = O(p, n / 2, k, l),
                            b.texImage2D(b.TEXTURE_2D, 0, b.RGB, k, l, 0, b.RGB, b.UNSIGNED_SHORT_5_6_5, o),
                        e && b.generateMipmap(b.TEXTURE_2D)
                    }
                    return {
                        mipmaps: q,
                        width: s,
                        height: t
                    }
                }
                function Q(a, b, c, d, e, f) {
                    var g = new XMLHttpRequest;
                    return g.open("GET", c, !0),
                        g.responseType = "arraybuffer",
                        g.onload = function() {
                            if (this.status == 200) {
                                a.bindTexture(a.TEXTURE_2D, d);
                                var c = P(a, b, this.response, e);
                                a.texParameteri(a.TEXTURE_2D, a.TEXTURE_MAG_FILTER, a.LINEAR),
                                    a.texParameteri(a.TEXTURE_2D, a.TEXTURE_MIN_FILTER, c.mipmaps > 1 ? a.LINEAR_MIPMAP_LINEAR: a.LINEAR)
                            }
                            f && f(d, c.width, c.height)
                        },
                        g.send(null),
                        d
                }
                function R(a, b, c, d) {
                    var e = a.createTexture();
                    return Q(a, c, e, !0, d),
                        e
                }
                var a = 542327876,
                    b = 1,
                    c = 2,
                    d = 4,
                    e = 8,
                    f = 4096,
                    g = 131072,
                    h = 524288,
                    i = 8388608,
                    j = 8,
                    k = 4194304,
                    l = 4096,
                    m = 512,
                    n = 1024,
                    o = 2048,
                    p = 4096,
                    q = 8192,
                    r = 16384,
                    s = 32768,
                    t = 2097152,
                    u = 1,
                    v = 2,
                    w = 4,
                    x = 64,
                    y = 512,
                    z = 131072,
                    C = A("DXT1"),
                    D = A("DXT3"),
                    E = A("DXT5"),
                    F = 31,
                    G = 0,
                    H = 1,
                    I = 2,
                    J = 3,
                    K = 4,
                    L = 7,
                    M = 20,
                    N = 21;
                return {
                    dxtToRgb565: O,
                    uploadDDSLevels: P,
                    loadDDSTextureEx: Q,
                    loadDDSTexture: R
                }
            });
    var aa = void 0,
        l = !0,
        pa = null,
        n = !1,
        za = [],
        Da = "object" == typeof process,
        Ea = "object" == typeof window,
        Fa = "function" == typeof importScripts,
        Ja = !Ea && !Da && !Fa;
    if (Da) {
        print = function(a) {
            process.stdout.write(a + "\n")
        },
            printErr = function(a) {
                process.stderr.write(a + "\n")
            };
        var Ma = require("fs");
        read = function(a) {
            var b = Ma.readFileSync(a).toString();
            return ! b && "/" != a[0] && (a = __dirname.split("/").slice(0, -1).join("/") + "/src/" + a, b = Ma.readFileSync(a).toString()),
                b
        },
            load = function(a) {
                Na(read(a))
            },
            za = process.argv.slice(2)
    } else Ja ? (this.read || (this.read = function(a) {
        snarf(a)
    }), "undefined" != typeof scriptArgs ? za = scriptArgs: "undefined" != typeof arguments && (za = arguments)) : Ea ? (this.print = printErr = function(a) {
        console.log(a)
    },
        this.read = function(a) {
            var b = new XMLHttpRequest;
            return b.open("GET", a, n),
                b.send(pa),
                b.responseText
        },
    this.arguments && (za = arguments)) : Fa ? this.load = importScripts: a("Unknown runtime environment. Where are we?");
    "undefined" == typeof load && "undefined" != typeof read && (this.load = function(a) {
        Na(read(a))
    }),
    "undefined" == typeof printErr && (this.printErr = function() {}),
    "undefined" == typeof print && (this.print = printErr);
    try {
        this.Module = Module
    } catch(Qa) {
        this.Module = Module = {}
    }
    Module.arguments || (Module.arguments = za),
    Module.print && (print = Module.print);
    var Xa = 4,
        ub = {},
        vb, Mb = this;
    Module.ccall = function(b, c, d, e) {
        try {
            var g = eval("_" + b)
        } catch(h) {
            try {
                g = Mb.Module["_" + b]
            } catch(j) {}
        }
        Ya(g, "Cannot call unknown function " + b + " (perhaps LLVM optimizations or closure removed it?)");
        var i = 0,
            b = e ? e.map(function(a) {
                if (d[i++] == "string") {
                    var b = q;
                    cb(a.length + 1),
                        Nb(a, b),
                        a = b
                }
                return a
            }) : [];
        return function(a, b) {
            return b == "string" ? Vb(a) : a
        } (g.apply(pa, b), c)
    },
        Module.setValue = Wb,
        Module.getValue = function(a, b) {
            b = b || "i8",
            b[b.length - 1] === "*" && (b = "i32");
            switch (b) {
                case "i1":
                    return v[a];
                case "i8":
                    return v[a];
                case "i16":
                    return gb[a >> 1];
                case "i32":
                    return y[a >> 2];
                case "i64":
                    return y[a >> 2];
                case "float":
                    return lb[a >> 2];
                case "double":
                    return Zb[0] = y[a >> 2],
                        Zb[1] = y[a + 4 >> 2],
                        Yb[0];
                default:
                    wb("invalid type for setValue: " + b)
            }
            return pa
        };
    var $b = 1,
        D = 2;
    Module.ALLOC_NORMAL = 0,
        Module.ALLOC_STACK = $b,
        Module.ALLOC_STATIC = D,
        Module.allocate = G,
        Module.Pointer_stringify = Vb,
        Module.Array_stringify = function(a) {
            for (var b = "",
                     c = 0; c < a.length; c++) b += String.fromCharCode(a[c]);
            return b
        };
    var dc, ec = 4096,
        v, z, gb, A, y, C, lb, mb, q, fc, eb, hc = Module.TOTAL_STACK || 5242880,
        fb = Module.TOTAL_MEMORY || 10485760;
    Ya( !! Int32Array && !!Float64Array && !!(new Int32Array(1)).subarray && !!(new Int32Array(1)).set, "Cannot fallback to non-typed array case: Code is too specialized");
    var ic = new ArrayBuffer(fb);
    v = new Int8Array(ic),
        gb = new Int16Array(ic),
        y = new Int32Array(ic),
        z = new Uint8Array(ic),
        A = new Uint16Array(ic),
        C = new Uint32Array(ic),
        lb = new Float32Array(ic),
        mb = new Float64Array(ic),
        y[0] = 255,
        Ya(255 === z[0] && 0 === z[3], "Typed arrays 2 must be run on a little-endian system");
    var kc = jc("(null)");
    eb = kc.length;
    for (var lc = 0; lc < kc.length; lc++) v[lc] = kc[lc];
    Module.HEAP = aa,
        Module.HEAP8 = v,
        Module.HEAP16 = gb,
        Module.HEAP32 = y,
        Module.HEAPU8 = z,
        Module.HEAPU16 = A,
        Module.HEAPU32 = C,
        Module.HEAPF32 = lb,
        Module.HEAPF64 = mb,
        fc = (q = 4 * Math.ceil(eb / 4)) + hc;
    var mc = 8 * Math.ceil(fc / 8);
    v.subarray(mc);
    var Zb = y.subarray(mc >> 2);
    lb.subarray(mc >> 2);
    var Yb = mb.subarray(mc >> 3);
    fc = mc + 8,
        eb = fc + 4095 >> 12 << 12;
    var pc = [],
        qc = [];
    Module.Array_copy = rc,
        Module.TypedArray_copy = function(a, b) {
            for (var c = new Uint8Array(b), d = 0; d < b; ++d) c[d] = v[a + d];
            return c.buffer
        },
        Module.String_len = sc,
        Module.String_copy = tc,
        Module.intArrayFromString = jc,
        Module.intArrayToString = function(a) {
            for (var b = [], c = 0; c < a.length; c++) {
                var d = a[c];
                d > 255 && (d &= 255),
                    b.push(String.fromCharCode(d))
            }
            return b.join("")
        },
        Module.writeStringToMemory = Nb;
    var M = [];
    Fc.X = 1,
        Kc.X = 1,
        Tc.X = 1,
        R.X = 1,
        bd.X = 1,
        dd.X = 1,
        ed.X = 1,
        Module._crn_get_width = function(a, b) {
            var c = q;
            q += 40,
                jd(c),
                Tc(a, b, c);
            var d = y[c + 4 >> 2];
            return q = c,
                d
        },
        Module._crn_get_height = function(a, b) {
            var c = q;
            q += 40,
                jd(c),
                Tc(a, b, c);
            var d = y[c + 8 >> 2];
            return q = c,
                d
        },
        Module._crn_get_levels = function(a, b) {
            var c = q;
            q += 40,
                jd(c),
                Tc(a, b, c);
            var d = y[c + 12 >> 2];
            return q = c,
                d
        },
        Module._crn_get_dxt_format = function(a, b) {
            var c = q;
            q += 40,
                jd(c),
                Tc(a, b, c);
            var d = y[(c + 32 | 0) >> 2];
            return q = c,
                d
        },
        Module._crn_get_uncompressed_size = function(a, b, c) {
            var d = q;
            return q += 40,
                jd(d),
                Tc(a, b, d),
                a = ((C[d + 4 >> 2] >>> (c >>> 0)) + 3 | 0) >>> 2,
                c = ((C[d + 8 >> 2] >>> (c >>> 0)) + 3 | 0) >>> 2,
                b = d + 32 | 0,
                b = Rc(y[b >> 2], y[b + 4 >> 2]) << 1 & 536870910,
                q = d,
            a * b * c | 0
        },
        Module._crn_decompress = function(a, b, c, d, e) {
            var f = q;
            q += 44;
            var g = f + 40;
            jd(f),
                Tc(a, b, f);
            var h = ((C[f + 4 >> 2] >>> (e >>> 0)) + 3 | 0) >>> 2,
                i = f + 32 | 0,
                i = Rc(y[i >> 2], y[i + 4 >> 2]) << 1 & 536870910,
                h = h * i | 0,
                j;
            if ((a | 0) == 0 | b >>> 0 < 62) j = 0;
            else {
                i = Ic(300, 0);
                if ((i | 0) == 0) i = 0;
                else if ((i | 0) == 0) i = 0;
                else {
                    y[i >> 2] = 519686845,
                        y[i + 4 >> 2] = 0,
                        y[i + 8 >> 2] = 0,
                        y[i + 88 >> 2] = 0;
                    var k = (i + 92 | 0) >> 2;
                    y[k] = 0,
                        y[k + 1] = 0,
                        y[k + 2] = 0,
                        y[k + 3] = 0,
                        y[k + 4] = 0,
                        y[k + 5] = 0,
                        Uc(i + 116 | 0),
                        Uc(i + 140 | 0),
                        Uc(i + 164 | 0),
                        Uc(i + 188 | 0),
                        Uc(i + 212 | 0),
                        kd(i + 236 | 0),
                        kd(i + 252 | 0),
                        ld(i + 268 | 0),
                        ld(i + 284 | 0)
                }
                if ((i | 0) == 0) j = 0;
                else {
                    k = Sc(a, b),
                        y[i + 88 >> 2] = k;
                    if ((k | 0) == 0) j = 0;
                    else {
                        y[i + 4 >> 2] = a,
                            y[i + 8 >> 2] = b;
                        var b = i + 92 | 0,
                            k = y[i + 4 >> 2],
                            a = (i + 88 | 0) >> 2,
                            l = y[a],
                            k = cd(b, k + Qc(l + 67 | 0) | 0, Nc(l + 65 | 0));
                        do
                            if (k) if (dd(b, i + 116 | 0)) {
                                l = y[a];
                                if ((Nc(l + 39 | 0) | 0) == 0) {
                                    if ((Nc(l + 55 | 0) | 0) == 0) {
                                        l = 0;
                                        break
                                    }
                                } else {
                                    if (!dd(b, i + 140 | 0)) {
                                        l = 0;
                                        break
                                    }
                                    if (!dd(b, i + 188 | 0)) {
                                        l = 0;
                                        break
                                    }
                                    l = y[a]
                                }
                                if ((Nc(l + 55 | 0) | 0) != 0) {
                                    if (!dd(b, i + 164 | 0)) {
                                        l = 0;
                                        break
                                    }
                                    if (!dd(b, i + 212 | 0)) {
                                        l = 0;
                                        break
                                    }
                                }
                                l = 1
                            } else l = 0;
                            else l = 0;
                        while (0);
                        if (l) {
                            a = i + 88 | 0,
                                b = y[a >> 2];
                            if ((Nc(b + 39 | 0) | 0) == 0) j = b,
                                a = 5;
                            else if (md(i)) nd(i) ? (j = y[a >> 2], a = 5) : (m = 0, a = 9);
                            else var m = 0,
                                    a = 9;
                            do
                                if (a == 5) {
                                    if ((Nc(j + 55 | 0) | 0) != 0) {
                                        if (!od(i)) {
                                            m = 0;
                                            break
                                        }
                                        if (!pd(i)) {
                                            m = 0;
                                            break
                                        }
                                    }
                                    m = 1
                                }
                            while (0);
                            j = m
                        } else j = 0
                    }
                    j ? j = i: ((i | 0) != 0 && (qd(i), Jc(i)), j = 0)
                }
            }
            g |= 0,
                y[g >> 2] = c,
            !((j | 0) == 0 | (g | 0) == 0 | d >>> 0 < 8 | e >>> 0 > 15) && (y[j >> 2] | 0) == 519686845 && (m = C[j + 88 >> 2], c = Oc((e << 2) + m + 70 | 0), i = y[j + 8 >> 2], a = e + 1 | 0, m = a >>> 0 < Pc(m + 16 | 0) >>> 0 ? Oc((a << 2) + m + 70 | 0) : i, m >>> 0 > c >>> 0 || xc(M.U | 0, 3705), ed(j, y[j + 4 >> 2] + c | 0, m - c | 0, g, d, h, e)),
            (j | 0) != 0 && (y[j >> 2] | 0) == 519686845 && (j | 0) != 0 && (qd(j), Jc(j)),
                q = f
        },
        fd.X = 1,
        qd.X = 1,
        gd.X = 1,
        hd.X = 1,
        id.X = 1,
        md.X = 1,
        nd.X = 1,
        od.X = 1,
        pd.X = 1,
        Module._malloc = ac,
        ac.X = 1,
        zd.X = 1,
        Bd.X = 1,
        Ad.X = 1,
        Kd.X = 1,
        Module._free = Ld,
        Ld.X = 1,
        Md.X = 1,
        Hd.X = 1,
        Id.X = 1;
    var Pd = 13,
        Qd = 9,
        Rd = 22,
        Sd = 5,
        Vd = 21,
        Wd = 6,
        Jd, Yd = 0,
        zc = 0,
        Zd = 0,
        $d = 2,
        Ec = [pa],
        ae = l,
        le,
        de,
        me;
    pc.unshift({
        r: function() {
            ae = n,
            le || ke()
        }
    }),
        qc.push({
            r: function() {
                le && (Ec[2] && Ec[2].object.e.buffer.length > 0 && Ec[2].object.e(10), Ec[3] && Ec[3].object.e.buffer.length > 0 && Ec[3].object.e(10))
            }
        }),
        Xd(0),
        G(12, "void*", D),
        Module.ea = function(a) {
            function b() {
                for (var a = 0; a < 3; a++) d.push(0)
            }
            var c = a.length + 1,
                d = [G(jc("/bin/this.program"), "i8", D)];
            b();
            for (var e = 0; e < c - 1; e += 1) d.push(G(jc(a[e]), "i8", D)),
                b();
            return d.push(0),
                d = G(d, "i32", D),
                _main(c, d, 0)
        };
    var Gc, Hc, vd, X, Cd, ne, oe, pe, qe, re;
    M.G = G([37, 115, 40, 37, 117, 41, 58, 32, 65, 115, 115, 101, 114, 116, 105, 111, 110, 32, 102, 97, 105, 108, 117, 114, 101, 58, 32, 34, 37, 115, 34, 10, 0], "i8", D),
        M.H = G([109, 95, 115, 105, 122, 101, 32, 60, 61, 32, 109, 95, 99, 97, 112, 97, 99, 105, 116, 121, 0], "i8", D),
        M.O = G([46, 47, 99, 114, 110, 95, 100, 101, 99, 111, 109, 112, 46, 104, 0], "i8", D),
        M.T = G([109, 105, 110, 95, 110, 101, 119, 95, 99, 97, 112, 97, 99, 105, 116, 121, 32, 60, 32, 40, 48, 120, 55, 70, 70, 70, 48, 48, 48, 48, 85, 32, 47, 32, 101, 108, 101, 109, 101, 110, 116, 95, 115, 105, 122, 101, 41, 0], "i8", D),
        M.Y = G([110, 101, 119, 95, 99, 97, 112, 97, 99, 105, 116, 121, 32, 38, 38, 32, 40, 110, 101, 119, 95, 99, 97, 112, 97, 99, 105, 116, 121, 32, 62, 32, 109, 95, 99, 97, 112, 97, 99, 105, 116, 121, 41, 0], "i8", D),
        M.Z = G([110, 117, 109, 95, 99, 111, 100, 101, 115, 91, 99, 93, 0], "i8", D),
        M.$ = G([115, 111, 114, 116, 101, 100, 95, 112, 111, 115, 32, 60, 32, 116, 111, 116, 97, 108, 95, 117, 115, 101, 100, 95, 115, 121, 109, 115, 0], "i8", D),
        M.aa = G([112, 67, 111, 100, 101, 115, 105, 122, 101, 115, 91, 115, 121, 109, 95, 105, 110, 100, 101, 120, 93, 32, 61, 61, 32, 99, 111, 100, 101, 115, 105, 122, 101, 0], "i8", D),
        M.ba = G([116, 32, 60, 32, 40, 49, 85, 32, 60, 60, 32, 116, 97, 98, 108, 101, 95, 98, 105, 116, 115, 41, 0], "i8", D),
        M.ca = G([109, 95, 108, 111, 111, 107, 117, 112, 91, 116, 93, 32, 61, 61, 32, 99, 85, 73, 78, 84, 51, 50, 95, 77, 65, 88, 0], "i8", D),
        Gc = G([2], ["i8* (i8*, i32, i32*, i1, i8*)*", 0, 0, 0, 0], D),
        G([4], ["i32 (i8*, i8*)*", 0, 0, 0, 0], D),
        Hc = G(1, "i8*", D),
        M.m = G([99, 114, 110, 100, 95, 109, 97, 108, 108, 111, 99, 58, 32, 115, 105, 122, 101, 32, 116, 111, 111, 32, 98, 105, 103, 0], "i8", D),
        M.I = G([99, 114, 110, 100, 95, 109, 97, 108, 108, 111, 99, 58, 32, 111, 117, 116, 32, 111, 102, 32, 109, 101, 109, 111, 114, 121, 0], "i8", D),
        M.n = G([40, 40, 117, 105, 110, 116, 51, 50, 41, 112, 95, 110, 101, 119, 32, 38, 32, 40, 67, 82, 78, 68, 95, 77, 73, 78, 95, 65, 76, 76, 79, 67, 95, 65, 76, 73, 71, 78, 77, 69, 78, 84, 32, 45, 32, 49, 41, 41, 32, 61, 61, 32, 48, 0], "i8", D),
        M.J = G([99, 114, 110, 100, 95, 114, 101, 97, 108, 108, 111, 99, 58, 32, 98, 97, 100, 32, 112, 116, 114, 0], "i8", D),
        M.K = G([99, 114, 110, 100, 95, 102, 114, 101, 101, 58, 32, 98, 97, 100, 32, 112, 116, 114, 0], "i8", D),
        M.ma = G([99, 114, 110, 100, 95, 109, 115, 105, 122, 101, 58, 32, 98, 97, 100, 32, 112, 116, 114, 0], "i8", D),
        G([1, 0, 0, 0, 2, 0, 0, 0, 4, 0, 0, 0, 8, 0, 0, 0, 16, 0, 0, 0, 32, 0, 0, 0, 64, 0, 0, 0, 128, 0, 0, 0, 256, 0, 0, 0, 512, 0, 0, 0, 1024, 0, 0, 0, 2048, 0, 0, 0, 4096, 0, 0, 0, 8192, 0, 0, 0, 16384, 0, 0, 0, 32768, 0, 0, 0, 65536, 0, 0, 0, 131072, 0, 0, 0, 262144, 0, 0, 0, 524288, 0, 0, 0, 1048576, 0, 0, 0, 2097152, 0, 0, 0, 4194304, 0, 0, 0, 8388608, 0, 0, 0, 16777216, 0, 0, 0, 33554432, 0, 0, 0, 67108864, 0, 0, 0, 134217728, 0, 0, 0, 268435456, 0, 0, 0, 536870912, 0, 0, 0, 1073741824, 0, 0, 0, -2147483648, 0, 0, 0], ["i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0], D),
        M.M = G([102, 97, 108, 115, 101, 0], "i8", D),
        M.na = G([99, 114, 110, 100, 95, 118, 97, 108, 105, 100, 97, 116, 101, 95, 102, 105, 108, 101, 40, 38, 110, 101, 119, 95, 104, 101, 97, 100, 101, 114, 44, 32, 97, 99, 116, 117, 97, 108, 95, 98, 97, 115, 101, 95, 100, 97, 116, 97, 95, 115, 105, 122, 101, 44, 32, 78, 85, 76, 76, 41, 0], "i8", D),
        M.oa = G([40, 116, 111, 116, 97, 108, 95, 115, 121, 109, 115, 32, 62, 61, 32, 49, 41, 32, 38, 38, 32, 40, 116, 111, 116, 97, 108, 95, 115, 121, 109, 115, 32, 60, 61, 32, 112, 114, 101, 102, 105, 120, 95, 99, 111, 100, 105, 110, 103, 58, 58, 99, 77, 97, 120, 83, 117, 112, 112, 111, 114, 116, 101, 100, 83, 121, 109, 115, 41, 32, 38, 38, 32, 40, 99, 111, 100, 101, 95, 115, 105, 122, 101, 95, 108, 105, 109, 105, 116, 32, 62, 61, 32, 49, 41, 0], "i8", D),
        M.N = G([40, 116, 111, 116, 97, 108, 95, 115, 121, 109, 115, 32, 62, 61, 32, 49, 41, 32, 38, 38, 32, 40, 116, 111, 116, 97, 108, 95, 115, 121, 109, 115, 32, 60, 61, 32, 112, 114, 101, 102, 105, 120, 95, 99, 111, 100, 105, 110, 103, 58, 58, 99, 77, 97, 120, 83, 117, 112, 112, 111, 114, 116, 101, 100, 83, 121, 109, 115, 41, 0], "i8", D),
        M.C = G([17, 18, 19, 20, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15, 16], "i8", D),
        M.o = G([48, 0], "i8", D),
        M.P = G([110, 117, 109, 95, 98, 105, 116, 115, 32, 60, 61, 32, 51, 50, 85, 0], "i8", D),
        M.Q = G([109, 95, 98, 105, 116, 95, 99, 111, 117, 110, 116, 32, 60, 61, 32, 99, 66, 105, 116, 66, 117, 102, 83, 105, 122, 101, 0], "i8", D),
        M.R = G([116, 32, 33, 61, 32, 99, 85, 73, 78, 84, 51, 50, 95, 77, 65, 88, 0], "i8", D),
        M.S = G([109, 111, 100, 101, 108, 46, 109, 95, 99, 111, 100, 101, 95, 115, 105, 122, 101, 115, 91, 115, 121, 109, 93, 32, 61, 61, 32, 108, 101, 110, 0], "i8", D),
        G([1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 4, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 8, 0, 0, 0, 4, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 8, 0, 0, 0, 3, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 8, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 4, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 7, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 8, 0, 0, 0, 4, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 5, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 8, 0, 0, 0, 3, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 6, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 8, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 5, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 7, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 8, 0, 0, 0], ["i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0], D),
        G([0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 4, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 8, 0, 0, 0, 4, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 8, 0, 0, 0, 3, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 8, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 5, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 7, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 8, 0, 0, 0], ["i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0], D),
        M.ha = G([0, 3, 1, 2], "i8", D),
        M.b = G([0, 2, 3, 1], "i8", D),
        M.ia = G([0, 7, 1, 2, 3, 4, 5, 6], "i8", D),
        M.a = G([0, 2, 3, 4, 5, 6, 7, 1], "i8", D),
        M.ja = G([1, 0, 5, 4, 3, 2, 6, 7], "i8", D),
        M.ka = G([1, 0, 7, 6, 5, 4, 3, 2], "i8", D),
        M.qa = G([105, 110, 100, 101, 120, 32, 60, 32, 50, 0], "i8", D),
        M.ra = G([40, 108, 111, 32, 60, 61, 32, 48, 120, 70, 70, 70, 70, 85, 41, 32, 38, 38, 32, 40, 104, 105, 32, 60, 61, 32, 48, 120, 70, 70, 70, 70, 85, 41, 0], "i8", D),
        M.sa = G([40, 120, 32, 60, 32, 99, 68, 88, 84, 66, 108, 111, 99, 107, 83, 105, 122, 101, 41, 32, 38, 38, 32, 40, 121, 32, 60, 32, 99, 68, 88, 84, 66, 108, 111, 99, 107, 83, 105, 122, 101, 41, 0], "i8", D),
        M.ta = G([118, 97, 108, 117, 101, 32, 60, 61, 32, 48, 120, 70, 70, 0], "i8", D),
        M.ua = G([118, 97, 108, 117, 101, 32, 60, 61, 32, 48, 120, 70, 0], "i8", D),
        M.va = G([40, 108, 111, 32, 60, 61, 32, 48, 120, 70, 70, 41, 32, 38, 38, 32, 40, 104, 105, 32, 60, 61, 32, 48, 120, 70, 70, 41, 0], "i8", D),
        M.g = G([105, 32, 60, 32, 109, 95, 115, 105, 122, 101, 0], "i8", D),
        M.p = G([110, 117, 109, 32, 38, 38, 32, 40, 110, 117, 109, 32, 61, 61, 32, 126, 110, 117, 109, 95, 99, 104, 101, 99, 107, 41, 0], "i8", D),
        M.f = G([1, 2, 2, 3, 3, 3, 3, 4], "i8", D),
        vd = G([0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 1, 0, 0, 1, 2, 1, 2, 0, 0, 0, 1, 0, 2, 1, 0, 2, 0, 0, 1, 2, 3], "i8", D),
        M.U = G([110, 101, 120, 116, 95, 108, 101, 118, 101, 108, 95, 111, 102, 115, 32, 62, 32, 99, 117, 114, 95, 108, 101, 118, 101, 108, 95, 111, 102, 115, 0], "i8", D),
        M.W = G([40, 108, 101, 110, 32, 62, 61, 32, 49, 41, 32, 38, 38, 32, 40, 108, 101, 110, 32, 60, 61, 32, 99, 77, 97, 120, 69, 120, 112, 101, 99, 116, 101, 100, 67, 111, 100, 101, 83, 105, 122, 101, 41, 0], "i8", D),
        X = G(468, ["i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "*", 0, 0, 0, "i32", 0, 0, 0, "*", 0, 0, 0, "i32", 0, 0, 0, "*", 0, 0, 0, "i32", 0, 0, 0], D),
        Cd = G(24, "i32", D),
        M.wa = G([109, 97, 120, 32, 115, 121, 115, 116, 101, 109, 32, 98, 121, 116, 101, 115, 32, 61, 32, 37, 49, 48, 108, 117, 10, 0], "i8", D),
        M.la = G([115, 121, 115, 116, 101, 109, 32, 98, 121, 116, 101, 115, 32, 32, 32, 32, 32, 61, 32, 37, 49, 48, 108, 117, 10, 0], "i8", D),
        M.pa = G([105, 110, 32, 117, 115, 101, 32, 98, 121, 116, 101, 115, 32, 32, 32, 32, 32, 61, 32, 37, 49, 48, 108, 117, 10, 0], "i8", D),
        G([0], "i8", D),
        G(1, "void ()*", D),
        ne = G([0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 8, 0, 0, 0, 10, 0, 0, 0], ["*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0], D),
        G(1, "void*", D),
        M.V = G([115, 116, 100, 58, 58, 98, 97, 100, 95, 97, 108, 108, 111, 99, 0], "i8", D),
        oe = G([0, 0, 0, 0, 0, 0, 0, 0, 12, 0, 0, 0, 14, 0, 0, 0, 16, 0, 0, 0], ["*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0], D),
        G(1, "void*", D),
        M.L = G([98, 97, 100, 95, 97, 114, 114, 97, 121, 95, 110, 101, 119, 95, 108, 101, 110, 103, 116, 104, 0], "i8", D),
        M.F = G([83, 116, 57, 98, 97, 100, 95, 97, 108, 108, 111, 99, 0], "i8", D),
        qe = G(12, "*", D),
        M.D = G([83, 116, 50, 48, 98, 97, 100, 95, 97, 114, 114, 97, 121, 95, 110, 101, 119, 95, 108, 101, 110, 103, 116, 104, 0], "i8", D),
        re = G(12, "*", D),
        y[ne + 4 >> 2] = qe,
        y[oe + 4 >> 2] = re,
        pe = G([2, 0, 0, 0, 0], ["i8*", 0, 0, 0, 0], D),
        y[qe >> 2] = pe + 8 | 0,
        y[qe + 4 >> 2] = M.F | 0,
        y[qe + 8 >> 2] = aa,
        y[re >> 2] = pe + 8 | 0,
        y[re + 4 >> 2] = M.D | 0,
        y[re + 8 >> 2] = qe,
        dc = [0, 0,
            function(a, b, c, d) {
                if ((a | 0) == 0) a = ac(b),
                (c | 0) != 0 && (y[c >> 2] = (a | 0) == 0 ? 0 : Od(a)),
                    c = a;
                else if ((b | 0) == 0) Ld(a),
                (c | 0) != 0 && (y[c >> 2] = 0),
                    c = 0;
                else {
                    var e = (a | 0) == 0 ? ac(b) : Md(a, b),
                        f = (e | 0) != 0,
                        g = f ? e: a;
                    f | d ^ 1 ? a = g: (e = (a | 0) == 0 ? ac(b) : Md(a, b), (e | 0) == 0 ? e = 0 : a = e),
                    (c | 0) != 0 && (y[c >> 2] = Od(a)),
                        c = e
                }
                return c
            },
            0,
            function(a) {
                return (a | 0) == 0 ? 0 : Od(a)
            },
            0,
            function(a) {
                aa(a | 0)
            },
            0,
            function(a) {
                aa(a | 0),
                (a | 0) != 0 && Ld(a)
            },
            0,
            function() {
                return M.V | 0
            },
            0,
            function(a) {
                aa(a | 0)
            },
            0,
            function(a) {
                aa(a | 0),
                (a | 0) != 0 && Ld(a)
            },
            0,
            function() {
                return M.L | 0
            },
            0],
        Module.FUNCTION_TABLE = dc,
        Module.run = se,
    Module.preRun && Module.preRun(),
    Module.noInitialRun || se(),
    Module.postRun && Module.postRun(),
        define("texture-util/crn_decomp.js",
            function() {}),
        define("texture-util/crunch", ["texture-util/dds", "texture-util/crn_decomp.js"],
            function(a) {
                function n(a, b, c, d) {
                    var e = c / 4,
                        f = d % 4,
                        g = new Uint32Array(a.buffer, 0, (d - f) / 4),
                        h = new Uint32Array(b.buffer),
                        i;
                    for (i = 0; i < g.length; i++) h[e + i] = g[i];
                    for (i = d - f; i < d; i++) b[c + i] = a[i]
                }
                function o(b, c, g, h) {
                    var i = new Uint8Array(g),
                        j = g.byteLength,
                        k = Module._malloc(j),
                        l,
                        m,
                        o,
                        p,
                        q,
                        r,
                        s,
                        t,
                        u,
                        v;
                    n(i, Module.HEAPU8, k, j),
                        l = Module._crn_get_dxt_format(k, j);
                    switch (l) {
                        case d:
                            m = c ? c.COMPRESSED_RGB_S3TC_DXT1_EXT: null;
                            break;
                        case e:
                            m = c ? c.COMPRESSED_RGBA_S3TC_DXT3_EXT: null;
                            break;
                        case f:
                            m = c ? c.COMPRESSED_RGBA_S3TC_DXT5_EXT: null;
                            break;
                        default:
                            return console.error("Unsupported image format"),
                                {
                                    mipmaps: 0,
                                    width: 0,
                                    height: 0
                                }
                    }
                    q = Module._crn_get_width(k, j),
                        r = Module._crn_get_height(k, j),
                        s = Module._crn_get_levels(k, j),
                        p = Module._crn_get_uncompressed_size(k, j, 0),
                        o = Module._malloc(p);
                    var w = q,
                        x = r;
                    if (c) for (v = 0; v < s; ++v) v && (p = Module._crn_get_uncompressed_size(k, j, v)),
                        Module._crn_decompress(k, j, o, p, v),
                        t = new Uint8Array(Module.HEAPU8.buffer, o, p),
                        b.compressedTexImage2D(b.TEXTURE_2D, v, m, q, r, 0, t),
                        q *= .5,
                        r *= .5;
                    else {
                        if (l != d) return console.error("No manual decoder for format and no native support"),
                            {
                                mipmaps: 0,
                                width: 0,
                                height: 0
                            };
                        Module._crn_decompress(k, j, o, p, 0),
                            u = a.dxtToRgb565(Module.HEAPU16, o / 2, q, r),
                            b.texImage2D(b.TEXTURE_2D, 0, b.RGB, q, r, 0, b.RGB, b.UNSIGNED_SHORT_5_6_5, u),
                        h && b.generateMipmap(b.TEXTURE_2D)
                    }
                    return Module._free(k),
                        Module._free(o),
                        {
                            mipmaps: 1,
                            width: w,
                            height: x
                        }
                }
                function q(a, b, c, d) {
                    var e = a.createTexture();
                    return p(a, b, c, e, !0, d),
                        e
                }
                var b = !1,
                    c = -1,
                    d = 0,
                    e = 1,
                    f = 2,
                    g = 3,
                    h = 4,
                    i = 5,
                    j = 6,
                    k = 7,
                    l = 8,
                    m = 9,
                    p;
                return b ? p = function() {
                    var a = function(a, b, c, d) {
                            this.gl = a,
                                this.ext = b,
                                this.texture = c,
                                this.callback = d
                        },
                        b = {},
                        c = new Worker("texture-util/crunch-worker.js");
                    return c.onmessage = function(a) {
                        var c = a.data,
                            g = b[c.src];
                        c.error && (console.error("Error in Crunch worker:", c.error), g.callback && g.callback(g.texture), delete b[c.src]);
                        var h = g.gl,
                            i = g.ext,
                            j;
                        switch (c.format) {
                            case d:
                                j = i ? i.COMPRESSED_RGB_S3TC_DXT1_EXT: null;
                                break;
                            case e:
                                j = i ? i.COMPRESSED_RGBA_S3TC_DXT3_EXT: null;
                                break;
                            case f:
                                j = i ? i.COMPRESSED_RGBA_S3TC_DXT5_EXT: null;
                                break;
                            default:
                                console.error("Unsupported image format");
                                return
                        }
                        h.bindTexture(h.TEXTURE_2D, g.texture),
                            i ? h.compressedTexImage2D(h.TEXTURE_2D, c.level, j, c.width, c.height, 0, c.dxtData) : (h.texImage2D(h.TEXTURE_2D, c.level, h.RGB, c.width, c.height, 0, h.RGB, h.UNSIGNED_SHORT_5_6_5, c.dxtData), c.completed && c.levels && h.generateMipmap(h.TEXTURE_2D)),
                        c.completed && (h.texParameteri(h.TEXTURE_2D, h.TEXTURE_MAG_FILTER, h.LINEAR), h.texParameteri(h.TEXTURE_2D, h.TEXTURE_MIN_FILTER, c.levels > 1 ? h.LINEAR_MIPMAP_LINEAR: h.LINEAR), g.callback && g.callback(g.texture, c.width, c.height), delete b[c.src])
                    },
                        function(d, e, f, g, h, i) {
                            b[f] = new a(d, e, g, i),
                                c.postMessage({
                                    src: f,
                                    ddsSupported: !!e,
                                    loadMipmaps: h
                                })
                        }
                } () : p = function(a, b, c, d, e, f) {
                    var g = new XMLHttpRequest;
                    g.open("GET", c, !0),
                        g.responseType = "arraybuffer",
                        g.onload = function() {
                            if (this.status == 200) {
                                a.bindTexture(a.TEXTURE_2D, d);
                                var c = o(a, b, this.response, e);
                                a.texParameteri(a.TEXTURE_2D, a.TEXTURE_MAG_FILTER, a.LINEAR),
                                    a.texParameteri(a.TEXTURE_2D, a.TEXTURE_MIN_FILTER, c.mipmaps > 1 ? a.LINEAR_MIPMAP_LINEAR: a.LINEAR)
                            }
                            f && f(d, c.width, c.height)
                        },
                        g.send(null)
                },
                    {
                        uploadCRNLevels: o,
                        loadCRNTextureEx: p,
                        loadCRNTexture: q
                    }
            }),
        define("texture-util/tga", [],
            function() {
                function a(a) {
                    var b = new Uint8Array(a),
                        c = 18 + b[0],
                        d = b[2],
                        e = b[12] + (b[13] << 8),
                        f = b[14] + (b[15] << 8),
                        g = b[16],
                        h = g / 8,
                        i = e * 4,
                        j,
                        k,
                        l,
                        m,
                        n;
                    if (!e || !f) return console.error("Invalid dimensions"),
                        null;
                    if (d != 2) return console.error("Unsupported TGA format:", d),
                        null;
                    j = new Uint8Array(e * f * 4),
                        k = c;
                    for (n = f - 1; n >= 0; --n) for (m = 0; m < e; ++m, k += h) l = m * 4 + n * i,
                        j[l] = b[k + 2],
                        j[l + 1] = b[k + 1],
                        j[l + 2] = b[k + 0],
                        j[l + 3] = g === 32 ? b[k + 3] : 255;
                    return {
                        width: e,
                        height: f,
                        data: j
                    }
                }
                function b(b, c, d, e, f) {
                    var g = new XMLHttpRequest;
                    g.open("GET", c, !0),
                        g.responseType = "arraybuffer",
                        g.onload = function() {
                            if (this.status == 200) {
                                var c = a(this.response);
                                c && (b.bindTexture(b.TEXTURE_2D, d), b.texImage2D(b.TEXTURE_2D, 0, b.RGBA, c.width, c.height, 0, b.RGBA, b.UNSIGNED_BYTE, c.data), b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MAG_FILTER, b.LINEAR), b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MIN_FILTER, e > 1 ? b.LINEAR_MIPMAP_LINEAR: b.LINEAR), e && b.generateMipmap(b.TEXTURE_2D))
                            }
                            f && f(d, c.width, c.height)
                        },
                        g.send(null)
                }
                function c(a, c, d, e) {
                    var f = a.createTexture();
                    return b(a, d, f, !0, e),
                        f
                }
                return {
                    decodeTGA: a,
                    loadTGATextureEx: b,
                    loadTGATexture: c
                }
            }),
        define("texture-util/loader", ["texture-util/native-img", "texture-util/dds", "texture-util/crunch", "texture-util/tga"],
            function(a, b, c, d) {
                function f(a, b) {
                    var c, d;
                    for (c in e) {
                        d = a.getExtension(e[c] + b);
                        if (d) return d
                    }
                    return null
                }
                function g(a) {
                    this.gl = a,
                        this.s3tc = f(a, "WEBGL_compressed_texture_s3tc")
                }
                var e = ["", "WEBKIT_", "MOZ_"];
                return g.prototype.loadEx = function(e, f, g, h, i) {
                    var j;
                    i || (j = e.lastIndexOf("."), i = e.substring(j + 1)),
                        i = i.toLowerCase();
                    switch (i) {
                        case "jpg":
                        case "jpeg":
                        case "png":
                        case "gif":
                        case "bmp":
                            a.loadIMGTextureEx(this.gl, e, f, g, h);
                            break;
                        case "dds":
                            b.loadDDSTextureEx(this.gl, this.s3tc, e, f, g, h);
                            break;
                        case "crn":
                            c.loadCRNTextureEx(this.gl, this.s3tc, e, f, g, h);
                            break;
                        case "tga":
                            d.loadTGATextureEx(this.gl, e, f, g, h);
                            break;
                        default:
                            console.error("Unknown image type:", i)
                    }
                },
                    g.prototype.load = function(a, b, c) {
                        var d = this.gl.createTexture();
                        return this.loadEx(a, d, !0, b),
                            d
                    },
                    {
                        TextureLoader: g,
                        nativeImg: a,
                        dds: b,
                        crunch: c,
                        tga: d
                    }
            }),
        require(["texture-util/loader"],
            function(a) {
                window.TextureUtil = a
            },
            "export", !0),
        define("texture-util/export",
            function() {})
})()