/* Schémas d'exercices : petit squelette animé (position A ↔ position B). */
(function(){
const BONE='#e8dcc0', BAND='#c0392b', PROP='#7a6650', FLOOR='#4a3c2e';
const V=(x,y)=>({x,y});
const P=(a)=>Array.isArray(a)?V(a[0],a[1]):a;

function line(a,b,w,c,o){return `<line x1="${a.x}" y1="${a.y}" x2="${b.x}" y2="${b.y}" stroke="${c||BONE}" stroke-width="${w||3.2}" stroke-linecap="round"${o?` opacity="${o}"`:''}/>`}
function dot(a,r,c,o){return `<circle cx="${a.x}" cy="${a.y}" r="${r||2.2}" fill="${c||BONE}"${o?` opacity="${o}"`:''}/>`}
function q(a,c,b,t){const u=1-t;return V(u*u*a.x+2*u*t*c.x+t*t*b.x,u*u*a.y+2*u*t*c.y+t*t*b.y)}

function skeleton(p){
  const g=k=>p[k]?P(p[k]):null; const dir=p.dir??1, o2=.42;
  const H=g('H'),N=g('N'),Pl=g('P'),C=p.C?P(p.C):V((N.x+Pl.x)/2,(N.y+Pl.y)/2);
  let s='';
  const limb=(a,b,c,op)=>{a=g(a);b=g(b);c=g(c);if(!a||!b)return '';let r=line(a,b,3.2,BONE,op)+dot(b,2.3,BONE,op);if(c)r+=line(b,c,2.8,BONE,op)+dot(c,2.4,BONE,op);return r};
  // membres arrière (estompés)
  s+=limb('N','E2','W2',o2)+limb('P','K2','F2',o2);
  if(p.T2)s+=line(g('F2'),g('T2'),2.4,BONE,o2);
  // colonne + côtes
  s+=`<path d="M${N.x} ${N.y} Q${C.x} ${C.y} ${Pl.x} ${Pl.y}" fill="none" stroke="${BONE}" stroke-width="3" stroke-linecap="round"/>`;
  [.14,.28,.42].forEach((t,i)=>{const a=q(N,C,Pl,t),b=q(N,C,Pl,t+.02);let dx=b.x-a.x,dy=b.y-a.y;const L=Math.hypot(dx,dy)||1;dx/=L;dy/=L;const w=6.5-i*.8;
    s+=line(V(a.x-dy*w,a.y+dx*w),V(a.x+dy*w,a.y-dx*w),1.6)});
  s+=`<ellipse cx="${Pl.x}" cy="${Pl.y}" rx="5" ry="3.4" fill="none" stroke="${BONE}" stroke-width="2"/>`;
  // membres avant
  s+=limb('P','K','F')+limb('N','E','W');
  if(p.T)s+=line(g('F'),g('T'),2.4);
  // crâne
  s+=`<circle cx="${H.x}" cy="${H.y}" r="7.2" fill="${BONE}"/>`;
  if(dir===0){s+=dot(V(H.x-2.6,H.y-.6),1.6,'#1a1410')+dot(V(H.x+2.6,H.y-.6),1.6,'#1a1410')+line(V(H.x-2,H.y+4),V(H.x+2,H.y+4),1,'#1a1410')}
  else if(dir==='up'){s+=dot(V(H.x-2.4,H.y-1.5),1.5,'#1a1410')+dot(V(H.x+2.4,H.y-1.5),1.5,'#1a1410')}
  else if(dir==='down'){s+=''}
  else{s+=dot(V(H.x+dir*3.2,H.y-1),1.7,'#1a1410')+dot(V(H.x+dir*6,H.y+.8),.9,'#1a1410')+line(V(H.x+dir*1,H.y+5),V(H.x+dir*5,H.y+4.4),1.1,'#1a1410')}
  // élastique
  (p.band||[]).forEach(([a,b])=>{a=typeof a==='string'?g(a):P(a);b=typeof b==='string'?g(b):P(b);s+=line(a,b,2,BAND)});
  (p.loop||[]).forEach(([a,b])=>{a=g(a);b=g(b);s+=`<ellipse cx="${(a.x+b.x)/2}" cy="${(a.y+b.y)/2}" rx="${Math.abs(a.x-b.x)/2+3}" ry="${Math.abs(a.y-b.y)/2+3}" fill="none" stroke="${BAND}" stroke-width="2"/>`});
  return s;
}

/* Décors */
const floor=(y=110)=>line(V(8,y),V(192,y),1.5,FLOOR);
const mat=`<rect x="14" y="108" width="172" height="4" rx="2" fill="#3a2d22"/>`;
const chair=(h=76)=>`<g stroke="${PROP}" stroke-width="2.5" stroke-linecap="round" fill="none"><line x1="68" y1="${h}" x2="96" y2="${h}"/><line x1="68" y1="${h}" x2="68" y2="${h-34}"/><line x1="70" y1="${h}" x2="70" y2="110"/><line x1="94" y1="${h}" x2="94" y2="110"/></g>`;
const wall=(x=66)=>`<rect x="${x-8}" y="6" width="8" height="104" fill="#2c231b"/>`+line(V(x,6),V(x,110),1.5,PROP);
const post=(x,y)=>`<rect x="${x-3}" y="${y-4}" width="6" height="${110-y+4}" fill="#3a2d22"/>`+dot(V(x,y),3,PROP);
const treadmill=`<g fill="none" stroke="${PROP}" stroke-width="2.5" stroke-linecap="round"><rect x="40" y="110" width="120" height="7" rx="3.5"/><line x1="152" y1="110" x2="160" y2="56"/><line x1="160" y1="56" x2="140" y2="58"/></g>`;
const rower=`<g fill="none" stroke="${PROP}" stroke-width="2.5" stroke-linecap="round"><line x1="22" y1="104" x2="178" y2="104"/><line x1="40" y1="104" x2="40" y2="112"/><line x1="170" y1="104" x2="170" y2="112"/><line x1="150" y1="104" x2="156" y2="86"/><circle cx="170" cy="84" r="13"/></g>`;
const towel=(x,y)=>`<circle cx="${x}" cy="${y}" r="4.5" fill="#6d5a8a"/>`;
const arrow=(a,b)=>{a=P(a);b=P(b);const dx=b.x-a.x,dy=b.y-a.y,L=Math.hypot(dx,dy),ux=dx/L,uy=dy/L;const h1=V(b.x-ux*6-uy*4,b.y-uy*6+ux*4),h2=V(b.x-ux*6+uy*4,b.y-uy*6-ux*4);
  return `<g stroke="var(--gold,#c9a24a)" stroke-width="1.6" fill="none" stroke-linecap="round" opacity=".85"><path d="M${a.x} ${a.y} L${b.x} ${b.y}" stroke-dasharray="3 3"/><path d="M${h1.x} ${h1.y} L${b.x} ${b.y} L${h2.x} ${h2.y}"/></g>`};
const clock=`<g transform="translate(176 18)" stroke="var(--gold,#c9a24a)" fill="none" stroke-width="1.6"><circle r="8"/><path d="M0 -4 V0 L3 2"/></g>`;

/* Postures types */
const lyingBack={H:[28,100],N:[40,103],P:[76,103],dir:'up'};
const quad={H:[46,58],N:[58,64],P:[112,64],E:[58,86],W:[58,107],E2:[60,86],W2:[60,107],K:[114,107],F:[142,107],K2:[116,107],F2:[144,107],dir:-1};
const stand={H:[100,20],N:[100,30],P:[100,63],E:[100,49],W:[101,66],E2:[100,49],W2:[99,66],K:[101,86],F:[101,108],K2:[99,86],F2:[99,108],T:[109,108],T2:[107,108],dir:1};
const M=(base,ch)=>Object.assign({},base,ch);

const FIG={
  tapis:{props:treadmill,a:M(stand,{H:[92,20],N:[92,30],P:[92,63],K:[99,86],F:[106,108],T:[114,108],K2:[87,87],F2:[78,106],T2:[85,108],E:[86,47],W:[84,62],E2:[98,47],W2:[104,61]}),
         b:M(stand,{H:[92,20],N:[92,30],P:[92,63],K2:[99,86],F2:[106,108],T2:[114,108],K:[87,87],F:[78,106],T:[85,108],E2:[86,47],W2:[84,62],E:[98,47],W:[104,61]})},
  rameur:{props:rower,a:{H:[121,46],N:[115,56],P:[100,96],K:[124,74],F:[150,98],K2:[126,75],F2:[152,99],E:[132,66],W:[150,76],E2:[134,67],W2:[150,77],dir:1,band:[['W',[160,84]]]},
          b:{H:[66,49],N:[71,58],P:[78,96],K:[114,93],F:[150,98],K2:[116,94],F2:[152,99],E:[62,80],W:[88,72],E2:[64,81],W2:[88,73],dir:1,band:[['W',[160,84]]]},arrow:[[95,112],[70,112]]},
  quadset:{props:mat+towel(98,104),a:{H:[58,60],N:[60,70],P:[64,102],E:[52,86],W:[46,106],E2:[54,86],W2:[48,106],K:[98,99],F:[134,103],T:[136,95],K2:[98,103],F2:[134,105],dir:1},
           b:{H:[58,60],N:[60,70],P:[64,102],E:[52,86],W:[46,106],E2:[54,86],W2:[48,106],K:[98,101],F:[134,99],T:[137,91],K2:[98,103],F2:[134,105],dir:1},arrow:[[98,86],[98,95]],hold:1},
  slr:{props:mat,a:M(lyingBack,{E:[56,105],W:[72,106],K:[102,103],F:[128,104],T:[131,97],K2:[96,84],F2:[110,106]}),
       b:M(lyingBack,{E:[56,105],W:[72,106],K:[99,90],F:[121,77],T:[127,72],K2:[96,84],F2:[110,106]}),arrow:[[134,100],[130,80]]},
  heelslide:{props:mat,a:M(lyingBack,{E:[56,105],W:[72,106],K:[102,103],F:[128,104],T:[131,97],K2:[102,105],F2:[128,106]}),
             b:M(lyingBack,{E:[56,105],W:[72,106],K:[94,82],F:[106,104],T:[113,103],K2:[102,105],F2:[128,106]}),arrow:[[128,112],[108,112]]},
  pont:{props:mat,a:M(lyingBack,{E:[56,105],W:[72,106],K:[100,82],F:[116,106],T:[123,106],K2:[102,83],F2:[118,107]}),
        b:M(lyingBack,{P:[80,84],C:[60,92],E:[56,105],W:[72,106],K:[104,80],F:[116,106],T:[123,106],K2:[106,81],F2:[118,107]}),arrow:[[62,96],[66,84]]},
  clam:{props:mat,a:{H:[26,94],N:[40,100],P:[78,102],E:[30,104],W:[22,98],K:[96,98],F:[112,104],K2:[96,104],F2:[112,106],dir:0,band:[['K','K2']]},
        b:{H:[26,94],N:[40,100],P:[78,102],E:[30,104],W:[22,98],K:[92,80],F:[112,103],K2:[96,104],F2:[112,106],dir:0,band:[['K','K2']]},arrow:[[104,96],[100,80]]},
  abd:{props:mat,a:{H:[26,94],N:[40,100],P:[78,102],E:[30,104],W:[22,98],K:[104,101],F:[130,101],T:[134,97],K2:[104,104],F2:[130,106],dir:0},
       b:{H:[26,94],N:[40,100],P:[78,102],E:[30,104],W:[22,98],K:[102,90],F:[126,78],T:[131,75],K2:[104,104],F2:[130,106],dir:0},arrow:[[138,96],[134,78]]},
  squat:{props:chair(76),a:{H:[95,38],N:[91,47],P:[84,74],E:[101,58],W:[92,54],E2:[100,58],W2:[91,54],K:[109,79],F:[110,108],T:[118,108],K2:[107,80],F2:[108,108],T2:[116,108],dir:1},
         b:{H:[104,20],N:[103,30],P:[101,63],E:[110,42],W:[101,40],E2:[109,42],W2:[100,40],K:[104,86],F:[110,108],T:[118,108],K2:[102,86],F2:[108,108],T2:[116,108],dir:1},arrow:[[124,78],[124,58]]},
  tke:{props:post(34,86),a:M(stand,{H:[97,22],N:[97,32],P:[95,65],K:[110,86],F:[100,108],T:[108,108],band:[[[34,86],'K']]}),
       b:M(stand,{band:[[[34,86],'K']]}),arrow:[[116,86],[107,86]]},
  lateral:{props:'',a:{H:[100,22],N:[100,32],P:[100,64],E:[90,48],W:[88,64],E2:[110,48],W2:[112,64],K:[110,84],F:[112,108],K2:[90,84],F2:[88,108],dir:0,loop:[['K2','K']]},
           b:{H:[108,22],N:[108,32],P:[108,64],E:[98,48],W:[96,64],E2:[118,48],W2:[120,64],K:[124,84],F:[132,108],K2:[98,84],F2:[92,108],dir:0,loop:[['K2','K']]},arrow:[[120,112],[148,112]]},
  mollet:{props:wall(150),a:M(stand,{W:[118,52],E:[110,48],W2:[118,54],E2:[110,49]}),
          b:M(stand,{H:[100,13],N:[100,23],P:[100,56],E:[110,42],W:[118,46],E2:[110,43],W2:[118,48],K:[101,79],F:[101,101],T:[108,108],K2:[99,79],F2:[99,101],T2:[106,108]}),arrow:[[86,104],[86,92]]},
  mur:{props:wall(66),a:{H:[74,20],N:[73,30],P:[72,63],E:[74,48],W:[76,64],K:[76,86],F:[80,108],T:[88,108],K2:[74,86],F2:[78,108],dir:1},
       b:{H:[74,34],N:[73,44],P:[73,76],E:[76,62],W:[80,76],K:[99,88],F:[102,108],T:[110,108],K2:[97,89],F2:[100,108],dir:1},hold:1},
  equilibre:{props:'',a:M(stand,{K2:[94,84],F2:[86,98],T2:[92,100],E:[90,52],W:[86,66],E2:[110,52],W2:[114,66]}),
             b:M(stand,{K2:[94,84],F2:[86,98],T2:[92,100],E:[88,50],W:[80,58],E2:[112,50],W2:[120,58]}),hold:1},
  chat:{props:mat,a:M(quad,{C:[86,46],H:[48,72],N:[60,66]}),b:M(quad,{C:[86,80],H:[44,52],N:[58,62]}),arrow:[[86,30],[86,40]]},
  birddog:{props:mat,a:quad,b:M(quad,{E:[44,60],W:[24,58],K2:[136,64],F2:[164,64]}),arrow:[[40,48],[20,48]]},
  deadbug:{props:mat,a:M(lyingBack,{E:[42,82],W:[44,62],E2:[44,82],W2:[46,62],K:[78,76],F:[102,76],T:[104,70],K2:[80,77],F2:[104,77]}),
           b:M(lyingBack,{E:[26,90],W:[10,96],E2:[44,82],W2:[46,62],K:[78,76],F:[102,76],T:[104,70],K2:[104,92],F2:[130,100]}),arrow:[[30,70],[14,86]]},
  planche:{props:mat,a:{H:[38,82],N:[48,88],P:[96,94],E:[48,106],W:[30,106],E2:[50,106],W2:[32,106],K:[124,106],F:[146,96],K2:[126,106],F2:[148,97],dir:-1},hold:1},
  lat:{props:mat,a:{H:[36,80],N:[44,88],P:[92,101],E:[44,106],W:[60,107],E2:[60,90],W2:[74,96],K:[118,104],F:[146,106],K2:[118,101],F2:[146,103],dir:0},
       b:{H:[36,80],N:[44,88],P:[92,91],E:[44,106],W:[60,107],E2:[60,84],W2:[74,88],K:[118,98],F:[146,106],K2:[118,95],F2:[146,103],dir:0},arrow:[[92,112],[92,96]],hold:1},
  rowing:{props:post(176,52),a:M(stand,{E:[118,46],W:[138,50],E2:[117,47],W2:[137,51],band:[['W',[176,52]]]}),
          b:M(stand,{E:[86,54],W:[106,50],E2:[87,55],W2:[107,51],band:[['W',[176,52]]]}),arrow:[[140,40],[110,40]]},
  pullapart:{props:'',a:{H:[100,22],N:[100,32],P:[100,64],E:[92,44],W:[96,46],E2:[108,44],W2:[104,46],K:[106,86],F:[108,108],K2:[94,86],F2:[92,108],dir:0,band:[['W','W2']]},
             b:{H:[100,22],N:[100,32],P:[100,64],E:[78,40],W:[58,42],E2:[122,40],W2:[142,42],K:[106,86],F:[108,108],K2:[94,86],F2:[92,108],dir:0,band:[['W','W2']]},arrow:[[90,26],[62,26]]},
  pallof:{props:post(40,48),a:M(stand,{E:[110,52],W:[104,46],E2:[109,53],W2:[103,47],band:[['W',[40,48]]]}),
          b:M(stand,{E:[120,46],W:[138,46],E2:[119,47],W2:[137,47],band:[['W',[40,48]]]}),arrow:[[110,32],[136,32]]},
  superman:{props:mat,a:{H:[28,100],N:[40,104],P:[78,104],E:[22,106],W:[6,106],E2:[24,106],W2:[8,106],K:[104,106],F:[130,106],K2:[104,106],F2:[130,106],dir:'down'},
            b:{H:[28,98],N:[40,103],P:[78,104],E:[22,98],W:[6,92],E2:[24,106],W2:[8,106],K:[104,106],F:[130,106],K2:[104,102],F2:[130,94],dir:'down'},arrow:[[140,104],[140,92]]},
  hinge:{props:'',a:M(stand,{band:[[[101,108],'W']]}),
         b:{H:[134,42],N:[126,46],P:[96,62],E:[124,64],W:[122,80],E2:[123,64],W2:[121,80],K:[102,85],F:[101,108],T:[109,108],K2:[100,85],F2:[99,108],T2:[107,108],dir:1,band:[[[101,108],'W']]},arrow:[[134,30],[148,40]]},
};
FIG.tapisInc={props:`<g transform="rotate(-5 100 110)">${treadmill}</g>`,a:FIG.tapis.a,b:FIG.tapis.b,tilt:-5};
FIG.rameurInt=FIG.rameur;

let uid=0;
window.figureSVG=function(id,opts){
  const f=FIG[id];if(!f)return '';uid++;const k='fg'+uid;
  const tilt=f.tilt?` transform="rotate(${f.tilt} 100 110)"`:'';
  const a=skeleton(f.a), b=f.b?skeleton(f.b):'';
  return `<svg class="fig" viewBox="0 0 200 122" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <style>.${k}a{animation:${k}x 3.2s ease-in-out infinite}.${k}b{animation:${k}y 3.2s ease-in-out infinite}
  @keyframes ${k}x{0%,38%{opacity:1}50%,88%{opacity:0}100%{opacity:1}}@keyframes ${k}y{0%,38%{opacity:0}50%,88%{opacity:1}100%{opacity:0}}
  @media (prefers-reduced-motion:reduce){.${k}a{animation:none}.${k}b{animation:none;opacity:.35}}</style>
  ${floor()}${f.props||''}
  <g${tilt}>${b?`<g class="${k}a">${a}</g><g class="${k}b">${b}</g>`:a}</g>
  ${f.arrow?arrow(...f.arrow):''}${f.hold?clock:''}</svg>`;
};
window.FIGURES=FIG;
})();
