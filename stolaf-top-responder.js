lodash: (function(){function q(e,t,n){var r=(n||0)-1,i=e?e.length:0;while(++r<i){if(e[r]===t){return r}}return-1}function R(e,t){var n=typeof t;e=e.cache;if(n=="boolean"||t==null){return e[t]?0:-1}if(n!="number"&&n!="string"){n="object"}var r=n=="number"?t:i+t;e=(e=e[n])&&e[r];return n=="object"?e&&q(e,t)>-1?0:-1:e?0:-1}function U(e){var t=this.cache,n=typeof e;if(n=="boolean"||e==null){t[e]=true}else{if(n!="number"&&n!="string"){n="object"}var r=n=="number"?e:i+e,s=t[n]||(t[n]={});if(n=="object"){(s[r]||(s[r]=[])).push(e)}else{s[r]=true}}}function z(e){return e.charCodeAt(0)}function W(e,t){var n=e.criteria,r=t.criteria,i=-1,s=n.length;while(++i<s){var o=n[i],u=r[i];if(o!==u){if(o>u||typeof o=="undefined"){return 1}if(o<u||typeof u=="undefined"){return-1}}}return e.index-t.index}function X(e){var t=-1,n=e.length,r=e[0],i=e[n/2|0],s=e[n-1];if(r&&typeof r=="object"&&i&&typeof i=="object"&&s&&typeof s=="object"){return false}var o=J();o["false"]=o["null"]=o["true"]=o["undefined"]=false;var u=J();u.array=e;u.cache=o;u.push=U;while(++t<n){u.push(e[t])}return u}function V(e){return"\\"+P[e]}function $(){return t.pop()||[]}function J(){return n.pop()||{array:null,cache:null,criteria:null,"false":false,index:0,"null":false,number:null,object:null,push:null,string:null,"true":false,"undefined":false,value:null}}function K(e){e.length=0;if(t.length<o){t.push(e)}}function Q(e){var t=e.cache;if(t){Q(t)}e.array=e.cache=e.criteria=e.object=e.number=e.string=e.value=null;if(n.length<o){n.push(e)}}function G(e,t,n){t||(t=0);if(typeof n=="undefined"){n=e?e.length:0}var r=-1,i=n-t||0,s=Array(i<0?0:i);while(++r<i){s[r]=e[t+r]}return s}function Y(t){function Lt(e){return e&&typeof e=="object"&&!Gt(e)&&ht.call(e,"__wrapped__")?e:new At(e)}function At(e,t){this.__chain__=!!t;this.__wrapped__=e}function Mt(e){function i(){if(n){var e=G(n);pt.apply(e,arguments)}if(this instanceof i){var s=Dt(t.prototype),o=t.apply(s,e||arguments);return Cn(o)?o:s}return t.apply(r,e||arguments)}var t=e[0],n=e[2],r=e[4];$t(i,e);return i}function _t(e,t,n,r,i){if(n){var s=n(e);if(typeof s!="undefined"){return s}}var o=Cn(e);if(o){var u=st.call(e);if(!O[u]){return e}var a=kt[u];switch(u){case x:case T:return new a(+e);case C:case A:return new a(e);case L:s=a(e.source,h.exec(e));s.lastIndex=e.lastIndex;return s}}else{return e}var f=Gt(e);if(t){var l=!r;r||(r=$());i||(i=$());var c=r.length;while(c--){if(r[c]==e){return i[c]}}s=f?a(e.length):{}}else{s=f?G(e):sn({},e)}if(f){if(ht.call(e,"index")){s.index=e.index}if(ht.call(e,"input")){s.input=e.input}}if(!t){return s}r.push(e);i.push(s);(f?Jn:dn)(e,function(e,o){s[o]=_t(e,t,n,r,i)});if(l){K(r);K(i)}return s}function Dt(e,t){return Cn(e)?yt(e):{}}function Pt(e,t,n){if(typeof e!="function"){return Zr}if(typeof t=="undefined"||!("prototype"in e)){return e}var r=e.__bindData__;if(typeof r=="undefined"){if(Ot.funcNames){r=!e.name}r=r||!Ot.funcDecomp;if(!r){var i=lt.call(e);if(!Ot.funcNames){r=!p.test(i)}if(!r){r=g.test(i);$t(e,r)}}}if(r===false||r!==true&&r[1]&1){return e}switch(n){case 1:return function(n){return e.call(t,n)};case 2:return function(n,r){return e.call(t,n,r)};case 3:return function(n,r,i){return e.call(t,n,r,i)};case 4:return function(n,r,i,s){return e.call(t,n,r,i,s)}}return Br(e,t)}function Ht(e){function h(){var e=u?s:this;if(r){var p=G(r);pt.apply(p,arguments)}if(i||f){p||(p=G(arguments));if(i){pt.apply(p,i)}if(f&&p.length<o){n|=16&~32;return Ht([t,l?n:n&~3,p,null,s,o])}}p||(p=arguments);if(a){t=e[c]}if(this instanceof h){e=Dt(t.prototype);var d=t.apply(e,p);return Cn(d)?d:e}return t.apply(e,p)}var t=e[0],n=e[1],r=e[2],i=e[3],s=e[4],o=e[5];var u=n&1,a=n&2,f=n&4,l=n&8,c=t;$t(h,e);return h}function Bt(e,t){var n=-1,r=Xt(),i=e?e.length:0,o=i>=s&&r===q,u=[];if(o){var a=X(t);if(a){r=R;t=a}else{o=false}}while(++n<i){var f=e[n];if(r(t,f)<0){u.push(f)}}if(o){Q(t)}return u}function jt(e,t,n,r){var i=(r||0)-1,s=e?e.length:0,o=[];while(++i<s){var u=e[i];if(u&&typeof u=="object"&&typeof u.length=="number"&&(Gt(u)||Qt(u))){if(!t){u=jt(u,t,n)}var a=-1,f=u.length,l=o.length;o.length+=f;while(++a<f){o[l++]=u[a]}}else if(!n){o.push(u)}}return o}function Ft(e,t,n,r,i,s){if(n){var o=n(e,t);if(typeof o!="undefined"){return!!o}}if(e===t){return e!==0||1/e==1/t}var u=typeof e,a=typeof t;if(e===e&&!(e&&D[u])&&!(t&&D[a])){return false}if(e==null||t==null){return e===t}var f=st.call(e),l=st.call(t);if(f==E){f=k}if(l==E){l=k}if(f!=l){return false}switch(f){case x:case T:return+e==+t;case C:return e!=+e?t!=+t:e==0?1/e==1/t:e==+t;case L:case A:return e==et(t)}var c=f==S;if(!c){var h=ht.call(e,"__wrapped__"),p=ht.call(t,"__wrapped__");if(h||p){return Ft(h?e.__wrapped__:e,p?t.__wrapped__:t,n,r,i,s)}if(f!=k){return false}var d=e.constructor,v=t.constructor;if(d!=v&&!(Nn(d)&&d instanceof d&&Nn(v)&&v instanceof v)&&"constructor"in e&&"constructor"in t){return false}}var m=!i;i||(i=$());s||(s=$());var g=i.length;while(g--){if(i[g]==e){return s[g]==t}}var y=0;o=true;i.push(e);s.push(t);if(c){g=e.length;y=t.length;o=y==g;if(o||r){while(y--){var b=g,w=t[y];if(r){while(b--){if(o=Ft(e[b],w,n,r,i,s)){break}}}else if(!(o=Ft(e[y],w,n,r,i,s))){break}}}}else{hn(t,function(t,u,a){if(ht.call(a,u)){y++;return o=ht.call(e,u)&&Ft(e[u],t,n,r,i,s)}});if(o&&!r){hn(e,function(e,t,n){if(ht.call(n,t)){return o=--y>-1}})}}i.pop();s.pop();if(m){K(i);K(s)}return o}function It(e,t,n,r,i){(Gt(t)?Jn:dn)(t,function(t,s){var o,u,a=t,f=e[s];if(t&&((u=Gt(t))||On(t))){var l=r.length;while(l--){if(o=r[l]==t){f=i[l];break}}if(!o){var c;if(n){a=n(f,t);if(c=typeof a!="undefined"){f=a}}if(!c){f=u?Gt(f)?f:[]:On(f)?f:{}}r.push(t);i.push(f);if(!c){It(f,t,n,r,i)}}}else{if(n){a=n(f,t);if(typeof a=="undefined"){a=t}}if(typeof a!="undefined"){f=a}}e[s]=f})}function qt(e,t){return e+ft(Ct()*(t-e+1))}function Rt(e,t,n){var r=-1,i=Xt(),o=e?e.length:0,u=[];var a=!t&&o>=s&&i===q,f=n||a?$():u;if(a){var l=X(f);i=R;f=l}while(++r<o){var c=e[r],h=n?n(c,r,e):c;if(t?!r||f[f.length-1]!==h:i(f,h)<0){if(n||a){f.push(h)}u.push(c)}}if(a){K(f.array);Q(f)}else if(n){K(f)}return u}function Ut(e){return function(t,n,r){var i={};n=Lt.createCallback(n,r,3);var s=-1,o=t?t.length:0;if(typeof o=="number"){while(++s<o){var u=t[s];e(i,u,n(u,s,t),t)}}else{dn(t,function(t,r,s){e(i,t,n(t,r,s),s)})}return i}}function zt(e,t,n,r,i,s){var o=t&1,u=t&2,a=t&4,f=t&8,l=t&16,c=t&32;if(!u&&!Nn(e)){throw new tt}if(l&&!n.length){t&=~16;l=n=false}if(c&&!r.length){t&=~32;c=r=false}var h=e&&e.__bindData__;if(h&&h!==true){h=G(h);if(h[2]){h[2]=G(h[2])}if(h[3]){h[3]=G(h[3])}if(o&&!(h[1]&1)){h[4]=i}if(!o&&h[1]&1){t|=8}if(a&&!(h[1]&4)){h[5]=s}if(l){pt.apply(h[2]||(h[2]=[]),n)}if(c){mt.apply(h[3]||(h[3]=[]),r)}h[1]|=t;return zt.apply(null,h)}var p=t==1||t===17?Mt:Ht;return p([e,t,n,r,i,s])}function Wt(e){return en[e]}function Xt(){var e=(e=Lt.indexOf)===br?q:e;return e}function Vt(e){return typeof e=="function"&&ot.test(e)}function Jt(e){var t,n;if(!(e&&st.call(e)==k)||(t=e.constructor,Nn(t)&&!(t instanceof t))){return false}hn(e,function(e,t){n=t});return typeof n=="undefined"||ht.call(e,n)}function Kt(e){return tn[e]}function Qt(e){return e&&typeof e=="object"&&typeof e.length=="number"&&st.call(e)==E||false}function on(e,t,n,r){if(typeof t!="boolean"&&t!=null){r=n;n=t;t=false}return _t(e,t,typeof n=="function"&&Pt(n,r,1))}function un(e,t,n){return _t(e,true,typeof t=="function"&&Pt(t,n,1))}function an(e,t){var n=Dt(e);return t?sn(n,t):n}function ln(e,t,n){var r;t=Lt.createCallback(t,n,3);dn(e,function(e,n,i){if(t(e,n,i)){r=n;return false}});return r}function cn(e,t,n){var r;t=Lt.createCallback(t,n,3);vn(e,function(e,n,i){if(t(e,n,i)){r=n;return false}});return r}function pn(e,t,n){var r=[];hn(e,function(e,t){r.push(t,e)});var i=r.length;t=Pt(t,n,3);while(i--){if(t(r[i--],r[i],e)===false){break}}return e}function vn(e,t,n){var r=Zt(e),i=r.length;t=Pt(t,n,3);while(i--){var s=r[i];if(t(e[s],s,e)===false){break}}return e}function mn(e){var t=[];hn(e,function(e,n){if(Nn(e)){t.push(n)}});return t.sort()}function gn(e,t){return e?ht.call(e,t):false}function yn(e){var t=-1,n=Zt(e),r=n.length,i={};while(++t<r){var s=n[t];i[e[s]]=s}return i}function bn(e){return e===true||e===false||e&&typeof e=="object"&&st.call(e)==x||false}function wn(e){return e&&typeof e=="object"&&st.call(e)==T||false}function En(e){return e&&e.nodeType===1||false}function Sn(e){var t=true;if(!e){return t}var n=st.call(e),r=e.length;if(n==S||n==A||n==E||n==k&&typeof r=="number"&&Nn(e.splice)){return!r}dn(e,function(){return t=false});return t}function xn(e,t,n,r){return Ft(e,t,typeof n=="function"&&Pt(n,r,2))}function Tn(e){return wt(e)&&!Et(parseFloat(e))}function Nn(e){return typeof e=="function"}function Cn(e){return!!(e&&D[typeof e])}function kn(e){return An(e)&&e!=+e}function Ln(e){return e===null}function An(e){return typeof e=="number"||e&&typeof e=="object"&&st.call(e)==C||false}function Mn(e){return e&&typeof e=="object"&&st.call(e)==L||false}function _n(e){return typeof e=="string"||e&&typeof e=="object"&&st.call(e)==A||false}function Dn(e){return typeof e=="undefined"}function Pn(e,t,n){var r={};t=Lt.createCallback(t,n,3);dn(e,function(e,n,i){r[n]=t(e,n,i)});return r}function Hn(e){var t=arguments,n=2;if(!Cn(e)){return e}if(typeof t[2]!="number"){n=t.length}if(n>3&&typeof t[n-2]=="function"){var r=Pt(t[--n-1],t[n--],2)}else if(n>2&&typeof t[n-1]=="function"){r=t[--n]}var i=G(arguments,1,n),s=-1,o=$(),u=$();while(++s<n){It(e,i[s],r,o,u)}K(o);K(u);return e}function Bn(e,t,n){var r={};if(typeof t!="function"){var i=[];hn(e,function(e,t){i.push(t)});i=Bt(i,jt(arguments,true,false,1));var s=-1,o=i.length;while(++s<o){var u=i[s];r[u]=e[u]}}else{t=Lt.createCallback(t,n,3);hn(e,function(e,n,i){if(!t(e,n,i)){r[n]=e}})}return r}function jn(e){var t=-1,r=Zt(e),i=r.length,s=n(i);while(++t<i){var o=r[t];s[t]=[o,e[o]]}return s}function Fn(e,t,n){var r={};if(typeof t!="function"){var i=-1,s=jt(arguments,true,false,1),o=Cn(e)?s.length:0;while(++i<o){var u=s[i];if(u in e){r[u]=e[u]}}}else{t=Lt.createCallback(t,n,3);hn(e,function(e,n,i){if(t(e,n,i)){r[n]=e}})}return r}function In(e,t,n,r){var i=Gt(e);if(n==null){if(i){n=[]}else{var s=e&&e.constructor,o=s&&s.prototype;n=Dt(o)}}if(t){t=Lt.createCallback(t,r,4);(i?Jn:dn)(e,function(e,r,i){return t(n,e,r,i)})}return n}function qn(e){var t=-1,r=Zt(e),i=r.length,s=n(i);while(++t<i){s[t]=e[r[t]]}return s}function Rn(e){var t=arguments,r=-1,i=jt(t,true,false,1),s=t[2]&&t[2][t[1]]===e?1:i.length,o=n(s);while(++r<s){o[r]=e[i[r]]}return o}function Un(e,t,n){var r=-1,i=Xt(),s=e?e.length:0,o=false;n=(n<0?xt(0,s+n):n)||0;if(Gt(e)){o=i(e,t,n)>-1}else if(typeof s=="number"){o=(_n(e)?e.indexOf(t,n):i(e,t,n))>-1}else{dn(e,function(e){if(++r>=n){return!(o=e===t)}})}return o}function Wn(e,t,n){var r=true;t=Lt.createCallback(t,n,3);var i=-1,s=e?e.length:0;if(typeof s=="number"){while(++i<s){if(!(r=!!t(e[i],i,e))){break}}}else{dn(e,function(e,n,i){return r=!!t(e,n,i)})}return r}function Xn(e,t,n){var r=[];t=Lt.createCallback(t,n,3);var i=-1,s=e?e.length:0;if(typeof s=="number"){while(++i<s){var o=e[i];if(t(o,i,e)){r.push(o)}}}else{dn(e,function(e,n,i){if(t(e,n,i)){r.push(e)}})}return r}function Vn(e,t,n){t=Lt.createCallback(t,n,3);var r=-1,i=e?e.length:0;if(typeof i=="number"){while(++r<i){var s=e[r];if(t(s,r,e)){return s}}}else{var o;dn(e,function(e,n,r){if(t(e,n,r)){o=e;return false}});return o}}function $n(e,t,n){var r;t=Lt.createCallback(t,n,3);Kn(e,function(e,n,i){if(t(e,n,i)){r=e;return false}});return r}function Jn(e,t,n){var r=-1,i=e?e.length:0;t=t&&typeof n=="undefined"?t:Pt(t,n,3);if(typeof i=="number"){while(++r<i){if(t(e[r],r,e)===false){break}}}else{dn(e,t)}return e}function Kn(e,t,n){var r=e?e.length:0;t=t&&typeof n=="undefined"?t:Pt(t,n,3);if(typeof r=="number"){while(r--){if(t(e[r],r,e)===false){break}}}else{var i=Zt(e);r=i.length;dn(e,function(e,n,s){n=i?i[--r]:--r;return t(s[n],n,s)})}return e}function Yn(e,t){var r=G(arguments,2),i=-1,s=typeof t=="function",o=e?e.length:0,u=n(typeof o=="number"?o:0);Jn(e,function(e){u[++i]=(s?t:e[t]).apply(e,r)});return u}function Zn(e,t,r){var i=-1,s=e?e.length:0;t=Lt.createCallback(t,r,3);if(typeof s=="number"){var o=n(s);while(++i<s){o[i]=t(e[i],i,e)}}else{o=[];dn(e,function(e,n,r){o[++i]=t(e,n,r)})}return o}function er(e,t,n){var r=-Infinity,i=r;if(typeof t!="function"&&n&&n[t]===e){t=null}if(t==null&&Gt(e)){var s=-1,o=e.length;while(++s<o){var u=e[s];if(u>i){i=u}}}else{t=t==null&&_n(e)?z:Lt.createCallback(t,n,3);Jn(e,function(e,n,s){var o=t(e,n,s);if(o>r){r=o;i=e}})}return i}function tr(e,t,n){var r=Infinity,i=r;if(typeof t!="function"&&n&&n[t]===e){t=null}if(t==null&&Gt(e)){var s=-1,o=e.length;while(++s<o){var u=e[s];if(u<i){i=u}}}else{t=t==null&&_n(e)?z:Lt.createCallback(t,n,3);Jn(e,function(e,n,s){var o=t(e,n,s);if(o<r){r=o;i=e}})}return i}function rr(e,t,n,r){if(!e)return n;var i=arguments.length<3;t=Lt.createCallback(t,r,4);var s=-1,o=e.length;if(typeof o=="number"){if(i){n=e[++s]}while(++s<o){n=t(n,e[s],s,e)}}else{dn(e,function(e,r,s){n=i?(i=false,e):t(n,e,r,s)})}return n}function ir(e,t,n,r){var i=arguments.length<3;t=Lt.createCallback(t,r,4);Kn(e,function(e,r,s){n=i?(i=false,e):t(n,e,r,s)});return n}function sr(e,t,n){t=Lt.createCallback(t,n,3);return Xn(e,function(e,n,r){return!t(e,n,r)})}function or(t,n,r){if(t&&typeof t.length!="number"){t=qn(t)}if(n==null||r){return t?t[qt(0,t.length-1)]:e}var i=ur(t);i.length=Tt(xt(0,n),i.length);return i}function ur(e){var t=-1,r=e?e.length:0,i=n(typeof r=="number"?r:0);Jn(e,function(e){var n=qt(0,++t);i[t]=i[n];i[n]=e});return i}function ar(e){var t=e?e.length:0;return typeof t=="number"?t:Zt(e).length}function fr(e,t,n){var r;t=Lt.createCallback(t,n,3);var i=-1,s=e?e.length:0;if(typeof s=="number"){while(++i<s){if(r=t(e[i],i,e)){break}}}else{dn(e,function(e,n,i){return!(r=t(e,n,i))})}return!!r}function lr(e,t,r){var i=-1,s=Gt(t),o=e?e.length:0,u=n(typeof o=="number"?o:0);if(!s){t=Lt.createCallback(t,r,3)}Jn(e,function(e,n,r){var o=u[++i]=J();if(s){o.criteria=Zn(t,function(t){return e[t]})}else{(o.criteria=$())[0]=t(e,n,r)}o.index=i;o.value=e});o=u.length;u.sort(W);while(o--){var a=u[o];u[o]=a.value;if(!s){K(a.criteria)}Q(a)}return u}function cr(e){if(e&&typeof e.length=="number"){return G(e)}return qn(e)}function pr(e){var t=-1,n=e?e.length:0,r=[];while(++t<n){var i=e[t];if(i){r.push(i)}}return r}function dr(e){return Bt(e,jt(arguments,true,true,1))}function vr(e,t,n){var r=-1,i=e?e.length:0;t=Lt.createCallback(t,n,3);while(++r<i){if(t(e[r],r,e)){return r}}return-1}function mr(e,t,n){var r=e?e.length:0;t=Lt.createCallback(t,n,3);while(r--){if(t(e[r],r,e)){return r}}return-1}function gr(t,n,r){var i=0,s=t?t.length:0;if(typeof n!="number"&&n!=null){var o=-1;n=Lt.createCallback(n,r,3);while(++o<s&&n(t[o],o,t)){i++}}else{i=n;if(i==null||r){return t?t[0]:e}}return G(t,0,Tt(xt(0,i),s))}function yr(e,t,n,r){if(typeof t!="boolean"&&t!=null){r=n;n=typeof t!="function"&&r&&r[t]===e?null:t;t=false}if(n!=null){e=Zn(e,n,r)}return jt(e,t)}function br(e,t,n){if(typeof n=="number"){var r=e?e.length:0;n=n<0?xt(0,r+n):n||0}else if(n){var i=Lr(e,t);return e[i]===t?i:-1}return q(e,t,n)}function wr(e,t,n){var r=0,i=e?e.length:0;if(typeof t!="number"&&t!=null){var s=i;t=Lt.createCallback(t,n,3);while(s--&&t(e[s],s,e)){r++}}else{r=t==null||n?1:t||r}return G(e,0,Tt(xt(0,i-r),i))}function Er(){var e=[],t=-1,n=arguments.length,r=$(),i=Xt(),o=i===q,u=$();while(++t<n){var a=arguments[t];if(Gt(a)||Qt(a)){e.push(a);r.push(o&&a.length>=s&&X(t?e[t]:u))}}var f=e[0],l=-1,c=f?f.length:0,h=[];e:while(++l<c){var p=r[0];a=f[l];if((p?R(p,a):i(u,a))<0){t=n;(p||u).push(a);while(--t){p=r[t];if((p?R(p,a):i(e[t],a))<0){continue e}}h.push(a)}}while(n--){p=r[n];if(p){Q(p)}}K(r);K(u);return h}function Sr(t,n,r){var i=0,s=t?t.length:0;if(typeof n!="number"&&n!=null){var o=s;n=Lt.createCallback(n,r,3);while(o--&&n(t[o],o,t)){i++}}else{i=n;if(i==null||r){return t?t[s-1]:e}}return G(t,xt(0,s-i))}function xr(e,t,n){var r=e?e.length:0;if(typeof n=="number"){r=(n<0?xt(0,r+n):Tt(n,r-1))+1}while(r--){if(e[r]===t){return r}}return-1}function Tr(e){var t=arguments,n=0,r=t.length,i=e?e.length:0;while(++n<r){var s=-1,o=t[n];while(++s<i){if(e[s]===o){vt.call(e,s--,1);i--}}}return e}function Nr(e,t,r){e=+e||0;r=typeof r=="number"?r:+r||1;if(t==null){t=e;e=0}var i=-1,s=xt(0,ut((t-e)/(r||1))),o=n(s);while(++i<s){o[i]=e;e+=r}return o}function Cr(e,t,n){var r=-1,i=e?e.length:0,s=[];t=Lt.createCallback(t,n,3);while(++r<i){var o=e[r];if(t(o,r,e)){s.push(o);vt.call(e,r--,1);i--}}return s}function kr(e,t,n){if(typeof t!="number"&&t!=null){var r=0,i=-1,s=e?e.length:0;t=Lt.createCallback(t,n,3);while(++i<s&&t(e[i],i,e)){r++}}else{r=t==null||n?1:xt(0,t)}return G(e,r)}function Lr(e,t,n,r){var i=0,s=e?e.length:i;n=n?Lt.createCallback(n,r,1):Zr;t=n(t);while(i<s){var o=i+s>>>1;n(e[o])<t?i=o+1:s=o}return i}function Ar(){return Rt(jt(arguments,true,true))}function Or(e,t,n,r){if(typeof t!="boolean"&&t!=null){r=n;n=typeof t!="function"&&r&&r[t]===e?null:t;t=false}if(n!=null){n=Lt.createCallback(n,r,3)}return Rt(e,t,n)}function Mr(e){return Bt(e,G(arguments,1))}function _r(){var e=-1,t=arguments.length;while(++e<t){var n=arguments[e];if(Gt(n)||Qt(n)){var r=r?Rt(Bt(r,n).concat(Bt(n,r))):n}}return r||[]}function Dr(){var e=arguments.length>1?arguments:arguments[0],t=-1,r=e?er(nr(e,"length")):0,i=n(r<0?0:r);while(++t<r){i[t]=nr(e,t)}return i}function Pr(e,t){var n=-1,r=e?e.length:0,i={};if(!t&&r&&!Gt(e[0])){t=[]}while(++n<r){var s=e[n];if(t){i[s]=t[n]}else if(s){i[s[0]]=s[1]}}return i}function Hr(e,t){if(!Nn(t)){throw new tt}return function(){if(--e<1){return t.apply(this,arguments)}}}function Br(e,t){return arguments.length>2?zt(e,17,G(arguments,2),null,t):zt(e,1,null,null,t)}function jr(e){var t=arguments.length>1?jt(arguments,true,false,1):mn(e),n=-1,r=t.length;while(++n<r){var i=t[n];e[i]=zt(e[i],1,null,null,e)}return e}function Fr(e,t){return arguments.length>2?zt(t,19,G(arguments,2),null,e):zt(t,3,null,null,e)}function Ir(){var e=arguments,t=e.length;while(t--){if(!Nn(e[t])){throw new tt}}return function(){var t=arguments,n=e.length;while(n--){t=[e[n].apply(this,t)]}return t[0]}}function qr(e,t){t=typeof t=="number"?t:+t||e.length;return zt(e,4,null,null,null,t)}function Rr(t,n,r){var i,s,o,u,a,f,l,c=0,h=false,p=true;if(!Nn(t)){throw new tt}n=xt(0,n)||0;if(r===true){var d=true;p=false}else if(Cn(r)){d=r.leading;h="maxWait"in r&&(xt(n,r.maxWait)||0);p="trailing"in r?r.trailing:p}var v=function(){var r=n-(ri()-u);if(r<=0){if(s){at(s)}var h=l;s=f=l=e;if(h){c=ri();o=t.apply(a,i);if(!f&&!s){i=a=null}}}else{f=dt(v,r)}};var m=function(){if(f){at(f)}s=f=l=e;if(p||h!==n){c=ri();o=t.apply(a,i);if(!f&&!s){i=a=null}}};return function(){i=arguments;u=ri();a=this;l=p&&(f||!d);if(h===false){var e=d&&!f}else{if(!s&&!d){c=u}var r=h-(u-c),g=r<=0;if(g){if(s){s=at(s)}c=u;o=t.apply(a,i)}else if(!s){s=dt(m,r)}}if(g&&f){f=at(f)}else if(!f&&n!==h){f=dt(v,n)}if(e){g=true;o=t.apply(a,i)}if(g&&!f&&!s){i=a=null}return o}}function Ur(t){if(!Nn(t)){throw new tt}var n=G(arguments,1);return dt(function(){t.apply(e,n)},1)}function zr(t,n){if(!Nn(t)){throw new tt}var r=G(arguments,2);return dt(function(){t.apply(e,r)},n)}function Wr(e,t){if(!Nn(e)){throw new tt}var n=function(){var r=n.cache,s=t?t.apply(this,arguments):i+arguments[0];return ht.call(r,s)?r[s]:r[s]=e.apply(this,arguments)};n.cache={};return n}function Xr(e){var t,n;if(!Nn(e)){throw new tt}return function(){if(t){return n}t=true;n=e.apply(this,arguments);e=null;return n}}function Vr(e){return zt(e,16,G(arguments,1))}function $r(e){return zt(e,32,null,G(arguments,1))}function Jr(e,t,n){var r=true,i=true;if(!Nn(e)){throw new tt}if(n===false){r=false}else if(Cn(n)){r="leading"in n?n.leading:r;i="trailing"in n?n.trailing:i}M.leading=r;M.maxWait=t;M.trailing=i;return Rr(e,t,M)}function Kr(e,t){return zt(t,16,[e])}function Qr(e){return function(){return e}}function Gr(e,t,n){var r=typeof e;if(e==null||r=="function"){return Pt(e,t,n)}if(r!="object"){return si(e)}var i=Zt(e),s=i[0],o=e[s];if(i.length==1&&o===o&&!Cn(o)){return function(e){var t=e[s];return o===t&&(o!==0||1/o==1/t)}}return function(t){var n=i.length,r=false;while(n--){if(!(r=Ft(t[i[n]],e[i[n]],null,true))){break}}return r}}function Yr(e){return e==null?"":et(e).replace(rn,Wt)}function Zr(e){return e}function ei(e,t,n){var r=true,i=t&&mn(t);if(!t||!n&&!i.length){if(n==null){n=t}s=At;t=e;e=Lt;i=mn(t)}if(n===false){r=false}else if(Cn(n)&&"chain"in n){r=n.chain}var s=e,o=Nn(s);Jn(i,function(n){var i=e[n]=t[n];if(o){s.prototype[n]=function(){var t=this.__chain__,n=this.__wrapped__,o=[n];pt.apply(o,arguments);var u=i.apply(e,o);if(r||t){if(n===u&&Cn(u)){return this}u=new s(u);u.__chain__=t}return u}}})}function ti(){t._=it;return this}function ni(){}function si(e){return function(t){return t[e]}}function oi(e,t,n){var r=e==null,i=t==null;if(n==null){if(typeof e=="boolean"&&i){n=e;e=1}else if(!i&&typeof t=="boolean"){n=t;i=true}}if(r&&i){t=1}e=+e||0;if(i){t=e;e=0}else{t=+t||0}if(n||e%1||t%1){var s=Ct();return Tt(e+s*(t-e+parseFloat("1e-"+((s+"").length-1))),t)}return qt(e,t)}function ui(e,t){if(e){var n=e[t];return Nn(n)?e[t]():n}}function ai(t,n,r){var i=Lt.templateSettings;t=et(t||"");r=fn({},r,i);var s=fn({},r.imports,i.imports),o=Zt(s),u=qn(s);var h,p=0,v=r.interpolate||m,g="__p += '";var b=U((r.escape||m).source+"|"+v.source+"|"+(v===d?c:m).source+"|"+(r.evaluate||m).source+"|$","g");t.replace(b,function(e,n,r,i,s,o){r||(r=i);g+=t.slice(p,o).replace(y,V);if(n){g+="' +\n__e("+n+") +\n'"}if(s){h=true;g+="';\n"+s+";\n__p += '"}if(r){g+="' +\n((__t = ("+r+")) == null ? '' : __t) +\n'"}p=o+e.length;return e});g+="';\n";var E=r.variable,S=E;if(!S){E="obj";g="with ("+E+") {\n"+g+"\n}\n"}g=(h?g.replace(a,""):g).replace(f,"$1").replace(l,"$1;");g="function("+E+") {\n"+(S?"":E+" || ("+E+" = {});\n")+"var __t, __p = '', __e = _.escape"+(h?", __j = Array.prototype.join;\n"+"function print() { __p += __j.call(arguments, '') }\n":";\n")+g+"return __p\n}";var x="\n/*\n//# sourceURL="+(r.sourceURL||"/lodash/template/source["+w++ +"]")+"\n*/";try{var T=B(o,"return "+g+x).apply(e,u)}catch(N){N.source=g;throw N}if(n){return T(n)}T.source=g;return T}function fi(e,t,r){e=(e=+e)>-1?e:0;var i=-1,s=n(e);t=Pt(t,r,1);while(++i<e){s[i]=t(i)}return s}function li(e){return e==null?"":et(e).replace(nn,Kt)}function ci(e){var t=++r;return et(e==null?"":e)+t}function hi(e){e=new At(e);e.__chain__=true;return e}function pi(e,t){t(e);return e}function di(){this.__chain__=true;return this}function vi(){return et(this.__wrapped__)}function mi(){return this.__wrapped__}t=t?Z.defaults(H.Object(),t,Z.pick(H,b)):H;var n=t.Array,o=t.Boolean,P=t.Date,B=t.Function,j=t.Math,F=t.Number,I=t.Object,U=t.RegExp,et=t.String,tt=t.TypeError;var nt=[];var rt=I.prototype;var it=t._;var st=rt.toString;var ot=U("^"+et(st).replace(/[.*+?^${}()|[\]\\]/g,"\\$&").replace(/toString| for [^\]]+/g,".*?")+"$");var ut=j.ceil,at=t.clearTimeout,ft=j.floor,lt=B.prototype.toString,ct=Vt(ct=I.getPrototypeOf)&&ct,ht=rt.hasOwnProperty,pt=nt.push,dt=t.setTimeout,vt=nt.splice,mt=nt.unshift;var gt=function(){try{var e={},t=Vt(t=I.defineProperty)&&t,n=t(e,e,e)&&t}catch(r){}return n}();var yt=Vt(yt=I.create)&&yt,bt=Vt(bt=n.isArray)&&bt,wt=t.isFinite,Et=t.isNaN,St=Vt(St=I.keys)&&St,xt=j.max,Tt=j.min,Nt=t.parseInt,Ct=j.random;var kt={};kt[S]=n;kt[x]=o;kt[T]=P;kt[N]=B;kt[k]=I;kt[C]=F;kt[L]=U;kt[A]=et;At.prototype=Lt.prototype;var Ot=Lt.support={};Ot.funcDecomp=!Vt(t.WinRTError)&&g.test(Y);Ot.funcNames=typeof B.name=="string";Lt.templateSettings={escape:/<%-([\s\S]+?)%>/g,evaluate:/<%([\s\S]+?)%>/g,interpolate:d,variable:"",imports:{_:Lt}};if(!yt){Dt=function(){function e(){}return function(n){if(Cn(n)){e.prototype=n;var r=new e;e.prototype=null}return r||t.Object()}}()}var $t=!gt?ni:function(e,t){_.value=t;gt(e,"__bindData__",_)};var Gt=bt||function(e){return e&&typeof e=="object"&&typeof e.length=="number"&&st.call(e)==S||false};var Yt=function(e){var t,n=e,r=[];if(!n)return r;if(!D[typeof e])return r;for(t in n){if(ht.call(n,t)){r.push(t)}}return r};var Zt=!St?Yt:function(e){if(!Cn(e)){return[]}return St(e)};var en={"&":"&","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"};var tn=yn(en);var nn=U("("+Zt(tn).join("|")+")","g"),rn=U("["+Zt(en).join("")+"]","g");var sn=function(e,t,n){var r,i=e,s=i;if(!i)return s;var o=arguments,u=0,a=typeof n=="number"?2:o.length;if(a>3&&typeof o[a-2]=="function"){var f=Pt(o[--a-1],o[a--],2)}else if(a>2&&typeof o[a-1]=="function"){f=o[--a]}while(++u<a){i=o[u];if(i&&D[typeof i]){var l=-1,c=D[typeof i]&&Zt(i),h=c?c.length:0;while(++l<h){r=c[l];s[r]=f?f(s[r],i[r]):i[r]}}}return s};var fn=function(e,t,n){var r,i=e,s=i;if(!i)return s;var o=arguments,u=0,a=typeof n=="number"?2:o.length;while(++u<a){i=o[u];if(i&&D[typeof i]){var f=-1,l=D[typeof i]&&Zt(i),c=l?l.length:0;while(++f<c){r=l[f];if(typeof s[r]=="undefined")s[r]=i[r]}}}return s};var hn=function(e,t,n){var r,i=e,s=i;if(!i)return s;if(!D[typeof i])return s;t=t&&typeof n=="undefined"?t:Pt(t,n,3);for(r in i){if(t(i[r],r,e)===false)return s}return s};var dn=function(e,t,n){var r,i=e,s=i;if(!i)return s;if(!D[typeof i])return s;t=t&&typeof n=="undefined"?t:Pt(t,n,3);var o=-1,u=D[typeof i]&&Zt(i),a=u?u.length:0;while(++o<a){r=u[o];if(t(i[r],r,e)===false)return s}return s};var On=!ct?Jt:function(e){if(!(e&&st.call(e)==k)){return false}var t=e.valueOf,n=Vt(t)&&(n=ct(t))&&ct(n);return n?e==n||ct(e)==n:Jt(e)};var zn=Ut(function(e,t,n){ht.call(e,n)?e[n]++:e[n]=1});var Qn=Ut(function(e,t,n){(ht.call(e,n)?e[n]:e[n]=[]).push(t)});var Gn=Ut(function(e,t,n){e[n]=t});var nr=Zn;var hr=Xn;var ri=Vt(ri=P.now)&&ri||function(){return(new P).getTime()};var ii=Nt(u+"08")==8?Nt:function(e,t){return Nt(_n(e)?e.replace(v,""):e,t||0)};Lt.after=Hr;Lt.assign=sn;Lt.at=Rn;Lt.bind=Br;Lt.bindAll=jr;Lt.bindKey=Fr;Lt.chain=hi;Lt.compact=pr;Lt.compose=Ir;Lt.constant=Qr;Lt.countBy=zn;Lt.create=an;Lt.createCallback=Gr;Lt.curry=qr;Lt.debounce=Rr;Lt.defaults=fn;Lt.defer=Ur;Lt.delay=zr;Lt.difference=dr;Lt.filter=Xn;Lt.flatten=yr;Lt.forEach=Jn;Lt.forEachRight=Kn;Lt.forIn=hn;Lt.forInRight=pn;Lt.forOwn=dn;Lt.forOwnRight=vn;Lt.functions=mn;Lt.groupBy=Qn;Lt.indexBy=Gn;Lt.initial=wr;Lt.intersection=Er;Lt.invert=yn;Lt.invoke=Yn;Lt.keys=Zt;Lt.map=Zn;Lt.mapValues=Pn;Lt.max=er;Lt.memoize=Wr;Lt.merge=Hn;Lt.min=tr;Lt.omit=Bn;Lt.once=Xr;Lt.pairs=jn;Lt.partial=Vr;Lt.partialRight=$r;Lt.pick=Fn;Lt.pluck=nr;Lt.property=si;Lt.pull=Tr;Lt.range=Nr;Lt.reject=sr;Lt.remove=Cr;Lt.rest=kr;Lt.shuffle=ur;Lt.sortBy=lr;Lt.tap=pi;Lt.throttle=Jr;Lt.times=fi;Lt.toArray=cr;Lt.transform=In;Lt.union=Ar;Lt.uniq=Or;Lt.values=qn;Lt.where=hr;Lt.without=Mr;Lt.wrap=Kr;Lt.xor=_r;Lt.zip=Dr;Lt.zipObject=Pr;Lt.collect=Zn;Lt.drop=kr;Lt.each=Jn;Lt.eachRight=Kn;Lt.extend=sn;Lt.methods=mn;Lt.object=Pr;Lt.select=Xn;Lt.tail=kr;Lt.unique=Or;Lt.unzip=Dr;ei(Lt);Lt.clone=on;Lt.cloneDeep=un;Lt.contains=Un;Lt.escape=Yr;Lt.every=Wn;Lt.find=Vn;Lt.findIndex=vr;Lt.findKey=ln;Lt.findLast=$n;Lt.findLastIndex=mr;Lt.findLastKey=cn;Lt.has=gn;Lt.identity=Zr;Lt.indexOf=br;Lt.isArguments=Qt;Lt.isArray=Gt;Lt.isBoolean=bn;Lt.isDate=wn;Lt.isElement=En;Lt.isEmpty=Sn;Lt.isEqual=xn;Lt.isFinite=Tn;Lt.isFunction=Nn;Lt.isNaN=kn;Lt.isNull=Ln;Lt.isNumber=An;Lt.isObject=Cn;Lt.isPlainObject=On;Lt.isRegExp=Mn;Lt.isString=_n;Lt.isUndefined=Dn;Lt.lastIndexOf=xr;Lt.mixin=ei;Lt.noConflict=ti;Lt.noop=ni;Lt.now=ri;Lt.parseInt=ii;Lt.random=oi;Lt.reduce=rr;Lt.reduceRight=ir;Lt.result=ui;Lt.runInContext=Y;Lt.size=ar;Lt.some=fr;Lt.sortedIndex=Lr;Lt.template=ai;Lt.unescape=li;Lt.uniqueId=ci;Lt.all=Wn;Lt.any=fr;Lt.detect=Vn;Lt.findWhere=Vn;Lt.foldl=rr;Lt.foldr=ir;Lt.include=Un;Lt.inject=rr;ei(function(){var e={};dn(Lt,function(t,n){if(!Lt.prototype[n]){e[n]=t}});return e}(),false);Lt.first=gr;Lt.last=Sr;Lt.sample=or;Lt.take=gr;Lt.head=gr;dn(Lt,function(e,t){var n=t!=="sample";if(!Lt.prototype[t]){Lt.prototype[t]=function(t,r){var i=this.__chain__,s=e(this.__wrapped__,t,r);return!i&&(t==null||r&&!(n&&typeof t=="function"))?s:new At(s,i)}}});Lt.VERSION="2.4.1";Lt.prototype.chain=di;Lt.prototype.toString=vi;Lt.prototype.value=mi;Lt.prototype.valueOf=mi;Jn(["join","pop","shift"],function(e){var t=nt[e];Lt.prototype[e]=function(){var e=this.__chain__,n=t.apply(this.__wrapped__,arguments);return e?new At(n,e):n}});Jn(["push","reverse","sort","unshift"],function(e){var t=nt[e];Lt.prototype[e]=function(){t.apply(this.__wrapped__,arguments);return this}});Jn(["concat","slice","splice"],function(e){var t=nt[e];Lt.prototype[e]=function(){return new At(t.apply(this.__wrapped__,arguments),this.__chain__)}});return Lt}var e;var t=[],n=[];var r=0;var i=+(new Date)+"";var s=75;var o=40;var u=" 	\f ﻿"+"\n\r\u2028\u2029"+" ᠎             　";var a=/\b__p \+= '';/g,f=/\b(__p \+=) '' \+/g,l=/(__e\(.*?\)|\b__t\)) \+\n'';/g;var c=/\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g;var h=/\w*$/;var p=/^\s*function[ \n\r\t]+\w/;var d=/<%=([\s\S]+?)%>/g;var v=RegExp("^["+u+"]*0+(?=.$)");var m=/($^)/;var g=/\bthis\b/;var y=/['\n\r\t\u2028\u2029\\]/g;var b=["Array","Boolean","Date","Function","Math","Number","Object","RegExp","String","_","attachEvent","clearTimeout","isFinite","isNaN","parseInt","setTimeout"];var w=0;var E="[object Arguments]",S="[object Array]",x="[object Boolean]",T="[object Date]",N="[object Function]",C="[object Number]",k="[object Object]",L="[object RegExp]",A="[object String]";var O={};O[N]=false;O[E]=O[S]=O[x]=O[T]=O[C]=O[k]=O[L]=O[A]=true;var M={leading:false,maxWait:0,trailing:false};var _={configurable:false,enumerable:false,value:null,writable:false};var D={"boolean":false,"function":true,object:true,number:false,string:false,"undefined":false};var P={"\\":"\\","'":"'","\n":"n","\r":"r","	":"t","\u2028":"u2028","\u2029":"u2029"};var H=D[typeof window]&&window||this;var B=D[typeof exports]&&exports&&!exports.nodeType&&exports;var j=D[typeof module]&&module&&!module.nodeType&&module;var F=j&&j.exports===B&&B;var I=D[typeof global]&&global;if(I&&(I.global===I||I.window===I)){H=I}var Z=Y();return Z}),

command: [
	'echo "[";',
	'curl --silent "https://help.stolaf.edu/helpdesk/WebObjects/Helpdesk.woa/ra/Tickets?style=details&qualifier=%28statustype.statusTypeName%3D%27Open%27%29&limit=25&apiKey=***REMOVED***" || echo "null";',
	'echo ",";',
	'curl --silent "https://help.stolaf.edu/helpdesk/WebObjects/Helpdesk.woa/ra/Tickets?style=details&qualifier=(statustype.statusTypeName%20%3D%20%27Closed%27)&limit=25&apiKey=***REMOVED***" || echo "null";',
	'echo "]";',
].join(''),
refreshFrequency: 60000,

style: [
	"top: 50px",
	"right: 50px",
	"width: 450px",

	"font-family: Avenir Next",

	"color: rgb(255, 255, 255)",
	"background-color: rgba(0, 0, 0, 0.6)",

	"text-align: center",

	"box-sizing: border-box",

	"*, *::before, *::after",
	"	box-sizing: inherit",

	".wrapper",
	"	display: -webkit-flex",
	"	-webkit-flex-direction: column",
	"	-webkit-justify-content: space-between",

	".wrapper > *",
	"	padding: 0.5rem 2rem",
	".wrapper > *:first-child",
	"	padding-top: 2rem",
	".wrapper > *:last-child",
	"	padding-bottom: 1rem",

	".danger",
	"	color: rgb(255,  48,   0)",
	".success",
	"	color: rgb(  0, 186,   0)",

	".title, .details",
	"	display: -webkit-flex;",
	"	-webkit-flex-direction: column;",
	"	-webkit-justify-content: center;",
	"	-webkit-align-items: center;",

	".title",
	"	font-family: Avenir Next Condensed",
	"	font-weight: 300",
	"	text-transform: uppercase",
	"	margin: 0",
	"	font-size: 1.5em",
	"	color: rgb(128, 128, 128)",
	"	-webkit-flex: 1",

	".details",
	"	font-size: 2em",
	"	-webkit-flex: 1",
	"	line-height: 1.35",

	"table",
	"	color: white",
	"	border-collapse: separate;",
	"	border-spacing: 0.5em",

	"td:first-child",
	"	text-align: left",

	".high td:nth-child(1)",
	"	background: rgb(255, 48,  0)",
	".high td:nth-child(2)",
	"	color: rgb(255, 48,  0)",

	".medium td:nth-child(1)",
	"	background: rgb(255, 198,  0)",
	".medium td:nth-child(2)",
	"	color: rgb(255, 198,  0)",

	".low td:nth-child(1)",
	"	background: rgb(174, 183, 188)",
	".low td:nth-child(2)",
	"	color: rgb(174, 183, 188)",

	".bubbles .total td",
	"	border-top: solid 1px white",
	"	border-radius: 0",

	".yellow",
	"	color: rgb(255, 198,   0)",
	".green",
	"	color: rgb(  0, 186,   0)",
	".red",
	"	color: rgb(255,  48,   0)",
	".purple",
	"	color: rgb(155,   0, 194)",
	".blue",
	"	color: rgb(  0, 108, 230)",
	".pink",
	"	color: rgb(252,  88, 181)",
	".aqua",
	"	color: rgb(  0, 159, 153)",
	".orange",
	"	color: rgb(252, 107,   0)",
	".silver",
	"	color: rgb(174, 183, 188)",
].join('\n'),

render: function(output) {
	return [
		'<div class="wrapper">',
			'<div class="details"></div>',
			'<h1 class="title">Top Responders</h1>',
		'</div>',
	].join('')
},

update: function(output, domEl) {
	var _ = this.lodash();
	var wrapper = domEl.querySelector('.wrapper');
	var details = domEl.querySelector('.details');

	var tickets = _.flatten(JSON.parse(output));

	var colors = [
		'red',
		'orange',
		'yellow',
		'green',
		'blue',
		'purple',
		'pink',
		'aqua',
		'silver',
	]

	var staff = [
		// 'Mike Sjulstad',
		// 'Phinehas Bynum',
		// 'Nhia Lee',
		// 'Jennie Moberg',
		// 'Michael Domingues',
	]

	function hasTechNote(note) {
		return (
			    note.isTechNote
			&& !note.isHidden
			&&  note.mobileNoteText.length > 10
		)
	}

	function isStaffMember(note) {
		return _.contains(staff, responderName(note));
	}

	function responderName(note) {
		return note.prettyUpdatedString.replace(/.*<strong>(.+)<\/strong>.*/gm, "$1")
	}

	var topResponders = _.chain(tickets)
		.reject({notes: []})
		.pluck('notes')
		.flatten()
		.filter(hasTechNote)
		.reject(isStaffMember)
		.groupBy(responderName)
		.mapValues(_.size)
		.pairs()
		.sortBy(function(item) {
			return item[1]
		})
		.reverse()
		.first(9)
		.value();

	var contentTable = document.createElement('table');
	contentTable.classList.add('colorful');

	_.each(topResponders, function(pair, index) {
		var row = document.createElement('tr');
		var nameCell = document.createElement('td');
		var numberCell = document.createElement('td');

		row.classList.add(colors[index]);

		nameCell.textContent = pair[0];
		numberCell.textContent = pair[1];

		row.appendChild(nameCell);
		row.appendChild(numberCell);

		contentTable.appendChild(row);
	})

	details.innerHTML = contentTable.outerHTML;
},
