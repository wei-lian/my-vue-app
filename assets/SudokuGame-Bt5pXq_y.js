import{_ as V}from"./_plugin-vue_export-helper-DlAUqK2U.js";import{g as m,h as T,l as U,m as j,c as i,b as c,F as p,d as k,t as b,o as f,p as M}from"./index-B7osa4I5.js";const q={class:"game-container"},H={class:"game-header"},J={class:"game-controls"},K={class:"difficulty-selector"},O=["onClick"],Q={class:"game-status"},W={class:"status-box"},X={class:"value"},Y={class:"board-wrapper"},Z={class:"sudoku-grid"},ee=["onClick"],te={class:"number-pad"},le=["onClick"],oe={__name:"SudokuGame",setup(se){const h=m("easy"),u=m(Array(9).fill().map(()=>Array(9).fill(0))),v=m(Array(9).fill().map(()=>Array(9).fill(!1))),n=m({row:-1,col:-1}),d=m(0);let y=null;const S={easy:"简单",medium:"中等",hard:"困难"},g=e=>S[e],x=T(()=>{const e=Math.floor(d.value/60),t=d.value%60;return`${e.toString().padStart(2,"0")}:${t.toString().padStart(2,"0")}`}),B=e=>{d.value>0?confirm("确定要开始新游戏吗？")&&(h.value=e,_()):(h.value=e,_())},A=()=>{const e=Array(9).fill().map(()=>Array(9).fill(0));for(let t=0;t<9;t+=3)I(e,t,t);return w(e),e},I=(e,t,l)=>{const o=[1,2,3,4,5,6,7,8,9];for(let a=0;a<3;a++)for(let s=0;s<3;s++){const r=Math.floor(Math.random()*o.length);e[t+a][l+s]=o[r],o.splice(r,1)}},w=e=>{const t=N(e);if(!t)return!0;const[l,o]=t;for(let a=1;a<=9;a++)if($(e,l,o,a)){if(e[l][o]=a,w(e))return!0;e[l][o]=0}return!1},N=e=>{for(let t=0;t<9;t++)for(let l=0;l<9;l++)if(e[t][l]===0)return[t,l];return null},$=(e,t,l,o)=>{for(let r=0;r<9;r++)if(e[t][r]===o)return!1;for(let r=0;r<9;r++)if(e[r][l]===o)return!1;const a=Math.floor(t/3)*3,s=Math.floor(l/3)*3;for(let r=0;r<3;r++)for(let C=0;C<3;C++)if(e[a+r][s+C]===o)return!1;return!0},_=()=>{clearInterval(y),d.value=0,R(),y=setInterval(()=>{d.value++},1e3)},R=()=>{const e=A(),t={easy:40,medium:50,hard:60};u.value=e.map(o=>[...o]),v.value=u.value.map(o=>o.map(a=>a!==0));let l=t[h.value];for(;l>0;){const o=Math.floor(Math.random()*9),a=Math.floor(Math.random()*9);u.value[o][a]!==0&&(u.value[o][a]=0,v.value[o][a]=!1,l--)}},z=(e,t)=>{v.value[e][t]||(n.value={row:e,col:t})},D=e=>{const{row:t,col:l}=n.value;t===-1||l===-1||v.value[t][l]||(u.value[t][l]=e)},E=()=>{const{row:e,col:t}=n.value;e===-1||t===-1||v.value[e][t]||(u.value[e][t]=0)},F=(e,t)=>{const l=u.value[e][t];if(l===0)return!1;for(let s=0;s<9;s++)if(s!==t&&u.value[e][s]===l)return!0;for(let s=0;s<9;s++)if(s!==e&&u.value[s][t]===l)return!0;const o=Math.floor(e/3)*3,a=Math.floor(t/3)*3;for(let s=o;s<o+3;s++)for(let r=a;r<a+3;r++)if(s!==e&&r!==t&&u.value[s][r]===l)return!0;return!1},G=(e,t)=>{if(n.value.row===-1||n.value.col===-1)return!1;const l=u.value[n.value.row][n.value.col];return l!==0&&u.value[e][t]===l},L=(e,t)=>{if(n.value.row===-1||n.value.col===-1)return!1;const l=Math.floor(e/3),o=Math.floor(t/3),a=Math.floor(n.value.row/3),s=Math.floor(n.value.col/3);return l===a&&o===s},P=e=>n.value.row===-1||n.value.col===-1?!1:u.value[n.value.row][n.value.col]===e;return U(()=>{_()}),j(()=>{clearInterval(y)}),(e,t)=>(f(),i("div",q,[c("div",H,[t[1]||(t[1]=c("h2",null,"数独",-1)),c("div",J,[c("div",K,[(f(),i(p,null,k(["easy","medium","hard"],l=>c("button",{key:l,class:M({active:h.value===l}),onClick:o=>B(l)},b(g(l)),11,O)),64))]),c("div",Q,[c("div",W,[t[0]||(t[0]=c("span",{class:"icon"},"⏱️",-1)),c("span",X,b(x.value),1)]),c("button",{class:"new-game-btn",onClick:_},"新游戏")])])]),c("div",Y,[c("div",Z,[(f(!0),i(p,null,k(u.value,(l,o)=>(f(),i("div",{key:o,class:"row"},[(f(!0),i(p,null,k(l,(a,s)=>(f(),i("div",{key:s,class:M(["cell",{fixed:v.value[o][s],selected:n.value.row===o&&n.value.col===s,error:F(o,s),"same-number":G(o,s),"same-block":L(o,s)}]),onClick:r=>z(o,s)},b(a||""),11,ee))),128))]))),128))]),c("div",te,[(f(),i(p,null,k(9,l=>c("button",{key:l,class:M({active:P(l)}),onClick:o=>D(l)},b(l),11,le)),64)),c("button",{class:"clear-btn",onClick:E},"清除")])])]))}},ne=V(oe,[["__scopeId","data-v-65b2ddb6"]]);export{ne as default};
