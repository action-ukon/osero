(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{2562:function(e,o,i){"use strict";i.r(o);var n=i(7294),t=i(9163),r=i(5893),c=t.ZP.div.withConfig({displayName:"pages__Container",componentId:"sc-eccczk-0"})(["display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;min-height:100vh;padding:0 0.5rem;background-color:green;"]),a=t.ZP.div.withConfig({displayName:"pages__Board",componentId:"sc-eccczk-1"})(["width:480px;height:480px;background-color:white;"]),d=t.ZP.div.withConfig({displayName:"pages__Cell",componentId:"sc-eccczk-2"})(["width:60px;height:60px;border:solid;border-color:black;float:left;border-width:1px;position:relative;"]),s=t.ZP.div.withConfig({displayName:"pages__BlackStone",componentId:"sc-eccczk-3"})(["width:80%;height:80%;border:solid;border-color:black;background-color:black;border-radius:60px;position:absolute;top:10%;left:10%;"]),l=t.ZP.div.withConfig({displayName:"pages__WhiteStone",componentId:"sc-eccczk-4"})(["width:80%;height:80%;border:solid;border-color:black;background-color:white;border-radius:60px;position:absolute;top:10%;left:10%;"]);o.default=function(){var e=(0,n.useState)([[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,1,2,0,0,0],[0,0,0,2,1,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0]]),o=e[0],i=e[1],t=(0,n.useState)(1),p=t[0],h=t[1];return(0,r.jsx)(c,{children:(0,r.jsx)(a,{children:o.map((function(e,n){return e.map((function(e,t){return(0,r.jsxs)(d,{onClick:function(){return function(e,n,t){if(0===t){var r=JSON.parse(JSON.stringify(o));r[n][e]=p;for(var c=[],a=[[0,1],[1,1],[1,0],[1,-1],[0,-1],[-1,-1],[-1,0],[-1,1]],d=0;d<a.length;d++)for(var s=[],l=1;l<8;l++){var u=l*a[d][0]+e,f=l*a[d][1]+n;if(u<=0||8<=u||f<=0||8<=f||0===o[f][u])break;if(r[n][e]!==o[f][u]){var g={x:u,y:f};s.push(g)}else if(r[n][e]===o[f][u]){c.push.apply(c,s);break}}if(0!==c.length){for(var b=0;c.length-b>0;b++){var _=c[b].x,k=c[b].y;0!==o[k][_]&&(r[k][_]=p,i(r))}h(3-p)}}}(t,n,e)},children:[1===e&&(0,r.jsx)(s,{}),2===e&&(0,r.jsx)(l,{})]},"".concat(n,"-").concat(t))}))}))})})}},5301:function(e,o,i){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return i(2562)}])}},function(e){e.O(0,[163,774,888,179],(function(){return o=5301,e(e.s=o);var o}));var o=e.O();_N_E=o}]);