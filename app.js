/* RED × BLACK liquid glass — interactions, vanilla JS, zero deps */
(function(){"use strict";
function $(s,c){return (c||document).querySelector(s)}
function $all(s,c){return Array.prototype.slice.call((c||document).querySelectorAll(s))}
function store(k,f){try{var v=localStorage.getItem(k);return v?JSON.parse(v):f}catch(e){return f}}
function save(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}
function toast(msg,err){var r=$("#toastRegion");if(!r)return;var d=document.createElement("div");d.className="toast"+(err?" error":"");d.textContent=msg;r.appendChild(d);setTimeout(function(){d.classList.add("out");setTimeout(function(){d.remove()},350)},3600)}
var EMAIL_RE=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* dark theme only (toggle removed) */

/* progress + header + totop */
function initScrollChrome(){var bar=$("#scrollProgress"),top=$("#toTop"),hdr=$("#siteHeader");
function onS(){var h=document.documentElement;var max=h.scrollHeight-h.clientHeight;var p=max>0?(h.scrollTop/max)*100:0;if(bar)bar.style.width=p+"%";if(top){if(h.scrollTop>600){top.hidden=false}else{top.hidden=true}}}
window.addEventListener("scroll",function(){requestAnimationFrame(onS)},{passive:true});onS();
if(top)top.addEventListener("click",function(){window.scrollTo({top:0,behavior:"smooth"})});}

/* nav */
function initNav(){var links=$all(".nav-link");
var obs=new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting){links.forEach(function(l){l.classList.toggle("active",l.getAttribute("href")==="#"+en.target.id)})}})},{rootMargin:"-40% 0px -55% 0px"});
["home","projects","skills","journey","about","contact"].forEach(function(id){var s=document.getElementById(id);if(s)obs.observe(s)});
var mt=$("#mobileToggle"),mm=$("#mobileMenu");
function close(){if(mm)mm.hidden=true;if(mt){mt.setAttribute("aria-expanded","false")}}
if(mt)mt.addEventListener("click",function(){var open=mm.hidden;mm.hidden=!open;mt.setAttribute("aria-expanded",open?"true":"false")});
$all("#mobileMenu a").forEach(function(a){a.addEventListener("click",close)});
$all("[data-goto]").forEach(function(b){b.addEventListener("click",function(){var t=$(b.getAttribute("data-goto"));if(t)t.scrollIntoView({behavior:"smooth"})})});}

/* magnetic + tilt + glow */
function initMotion(){if(!matchMedia("(hover:hover)").matches)return;
$all(".magnetic").forEach(function(el){el.addEventListener("mousemove",function(e){var r=el.getBoundingClientRect();var x=e.clientX-r.left-r.width/2,y=e.clientY-r.top-r.height/2;el.style.transform="translate("+(x*.07)+"px,"+(y*.07)+"px)"});el.addEventListener("mouseleave",function(){el.style.transform=""})});
$all(".tilt").forEach(function(el){el.addEventListener("mousemove",function(e){var r=el.getBoundingClientRect();var px=(e.clientX-r.left)/r.width-.5,py=(e.clientY-r.top)/r.height-.5;el.style.transform="perspective(900px) rotateY("+(px*8)+"deg) rotateX("+(-py*8)+"deg) translateY(-4px)"});el.addEventListener("mouseleave",function(){el.style.transform=""})});
var g=$("#cursorGlow");if(g){document.addEventListener("mousemove",function(e){g.style.transform="translate("+(e.clientX-170)+"px,"+(e.clientY-170)+"px)"},{passive:true})}}

/* counters + reveal + bars */
function initScroll(){var counters=$all("[data-count]");
var co=new IntersectionObserver(function(es){es.forEach(function(en){if(!en.isIntersecting)return;var el=en.target;co.unobserve(el);var t=parseInt(el.getAttribute("data-count"),10)||0;var st=null;function step(ts){if(!st)st=ts;var p=Math.min((ts-st)/1300,1);var e2=1-Math.pow(1-p,3);el.textContent=Math.round(t*e2);if(p<1)requestAnimationFrame(step)}requestAnimationFrame(step)})},{threshold:.5});
counters.forEach(function(e){co.observe(e)});
var ro=new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting){en.target.classList.add("visible");ro.unobserve(en.target)}})},{threshold:.12});
$all(".reveal,.project-card,.t-item").forEach(function(s){s.classList.add("reveal");ro.observe(s)});
var bo=new IntersectionObserver(function(es){es.forEach(function(en){if(!en.isIntersecting)return;var f=en.target;bo.unobserve(f);f.style.width=f.getAttribute("data-width");var card=f.closest(".skill-card");if(card){var pct=card.querySelector(".pct");var target=parseInt((pct&&pct.getAttribute("data-pct"))||f.getAttribute("data-width"),10)||0;var st=null;function s2(ts){if(!st)st=ts;var p=Math.min((ts-st)/1100,1);if(pct)pct.textContent=Math.round(target*p)+"%";if(p<1)requestAnimationFrame(s2)}requestAnimationFrame(s2)}})},{threshold:.4});
$all(".bar-fill").forEach(function(b){bo.observe(b)});}

/* filters */
function initFilters(){var btns=$all(".filter-btn"),cards=$all(".project-card"),empty=$("#emptyMsg");
btns.forEach(function(b){b.addEventListener("click",function(){btns.forEach(function(x){x.classList.remove("active")});b.classList.add("active");
var f=b.getAttribute("data-filter");var n=0;
cards.forEach(function(c){var show=f==="all"||c.getAttribute("data-category")===f;if(show)n++;c.classList.remove("pop");if(show){c.classList.remove("hide");void c.offsetWidth;c.classList.add("pop")}else{c.classList.add("hide")}});
if(empty)empty.hidden=n!==0;save("am-filter",f);})});
var sv=store("am-filter","all");var m=document.querySelector('.filter-btn[data-filter="'+sv+'"]');if(m&&sv!=="all")m.click();}

/* projects modal + likes */
var PROJECTS={
webpage:{t:"Personal Web Page — Resume Project",d:"Responsive personal webpage built from scratch with HTML, CSS and JavaScript, focusing on modern frontend functionality.",r:["Responsive from scratch","Custom user-friendly layout","Demonstrates frontend basics"]},
editing:{t:"Multimedia Editing Portfolio",d:"Edited and rendered video and photo content: audio levels, color correction and custom visuals.",r:["Video editing & rendering","Photo manipulation","Audio + color work"]},
landing:{t:"Landing Layout Practice",d:"Responsive landing practice: semantic HTML with flexbox and grid, mobile-first.",r:["Semantic structure","Flexbox + grid","Mobile-first CSS"]},
interactive:{t:"JavaScript Mini Apps",d:"Small JS exercises live on this site: filters, counters, modals, validation.",r:["DOM + events practice","LocalStorage likes/saves","Validation from scratch"]}};
function initProjects(){var bd=$("#modalBackdrop");
function open(k){var p=PROJECTS[k];if(!p)return;$("#modalTitle").textContent=p.t;$("#modalDesc").textContent=p.d;var ul=$("#modalResults");ul.innerHTML="";p.r.forEach(function(r){var li=document.createElement("li");li.innerHTML='<svg width="18" height="18"><use href="#i-check"/></svg> '+r;ul.appendChild(li)});bd.hidden=false;document.body.style.overflow="hidden";$("#modalClose").focus()}
function close(){if(bd.hidden)return;bd.hidden=true;document.body.style.overflow=""}
$all("[data-open]").forEach(function(b){b.addEventListener("click",function(e){e.stopPropagation();open(b.getAttribute("data-open"))})});
$all(".project-card").forEach(function(c){var n=c.getAttribute("data-project");c.addEventListener("click",function(){open(n)});c.addEventListener("keydown",function(e){if(e.key==="Enter"||e.key===" "){e.preventDefault();open(n)}})});
$("#modalClose").addEventListener("click",close);bd.addEventListener("click",function(e){if(e.target===bd)close()});
document.addEventListener("keydown",function(e){if(e.key==="Escape")close()});
var cta=$("#modalCta");if(cta)cta.addEventListener("click",close);
var likes=store("am-likes",{}),saves=store("am-saves",{});
$all(".like-btn").forEach(function(b){var k=b.getAttribute("data-like");if(likes[k]){b.classList.add("liked");b.setAttribute("aria-pressed","true")}
b.addEventListener("click",function(e){e.stopPropagation();var on=b.classList.toggle("liked");b.setAttribute("aria-pressed",on?"true":"false");if(on)likes[k]=1;else delete likes[k];save("am-likes",likes);var n=b.closest(".project-card").querySelector(".like-count");if(n){var v=parseInt(n.textContent,10)||0;n.textContent=v+(on?1:-1)}})});
$all(".save-btn").forEach(function(b){var k=b.getAttribute("data-save");if(saves[k]){b.classList.add("saved");b.setAttribute("aria-pressed","true")}
b.addEventListener("click",function(e){e.stopPropagation();var on=b.classList.toggle("saved");b.setAttribute("aria-pressed",on?"true":"false");if(on)saves[k]=1;else delete saves[k];save("am-saves",saves);toast(on?"Saved to your list":"Removed from saved")})});}

/* hero actions (resume is a direct file download link) */
function initHero(){var cb=$("#copyEmailBtn");if(cb)cb.addEventListener("click",function(){var em="sakshamsainisaini0@gmail.com";function done(){var l=$("#copyEmailLabel");if(l)l.textContent="Copied!";toast("Email copied to clipboard");setTimeout(function(){if(l)l.textContent=em},2000)}
if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(em).then(done).catch(function(){fb()})}else fb();
function fb(){var ta=document.createElement("textarea");ta.value=em;document.body.appendChild(ta);ta.select();try{document.execCommand("copy");done()}catch(e){toast("Copy failed: "+em,true)}ta.remove()}});}

/* contact */
function initContact(){var f=$("#contactForm");if(!f)return;var nm=$("#cName"),em=$("#cEmail"),ph=$("#cPhone"),ms=$("#cMsg"),badge=$("#submissionBadge");
window.__messageLog=window.__messageLog||[];
function refresh(){var s=store("submissions",[]);if(badge)badge.textContent="You've sent "+s.length+" message"+(s.length===1?"":"s");
try{if(s.length)console.table(s)}catch(e){}}
refresh();
try{console.log("%c Inbox loaded — "+store("submissions",[]).length+" stored message(s). New ones appear below.","color:#ff2233;font-weight:bold")}catch(e){}
function err(input,el,msg){if(!msg){el.hidden=true;input.classList.remove("invalid");return true}el.textContent="⚠ "+msg;el.hidden=false;input.classList.add("invalid");return false}
function vN(){return err(nm,$("#errName"),nm.value.trim()===""?"Name is required.":null)}
function vE(){var v=em.value.trim();if(v==="")return err(em,$("#errEmail"),"Email is required.");if(!EMAIL_RE.test(v))return err(em,$("#errEmail"),"Enter a valid email.");return err(em,$("#errEmail"),null)}
function vM(){var v=ms.value.trim();if(v==="")return err(ms,$("#errMsg"),"Message is required.");if(v.length<10)return err(ms,$("#errMsg"),"Min 10 characters.");return err(ms,$("#errMsg"),null)}
[nm,em,ms].forEach(function(i){i.addEventListener("input",count)});
ph.addEventListener("input",function(){ph.value=ph.value.replace(/[^\d+\s\-()]/g,"").slice(0,18)});
function count(){var c=$("#charCount"),bar=$("#charBar");if(c)c.textContent=ms.value.length+" / 500";if(bar)bar.style.width=Math.min(ms.value.length/500*100,100)+"%"}
count();
f.addEventListener("submit",function(e){e.preventDefault();var a=vN(),b=vE(),c2=vM();if(!(a&&b&&c2)){toast("Fix the highlighted fields",true);var bad=f.querySelector(".invalid");if(bad)bad.focus();return}
var d={name:nm.value.trim(),email:em.value.trim(),phone:ph.value.trim(),message:ms.value.trim(),ts:new Date().toISOString()};
/* 1) console log — every message stored in the console */
try{console.log("%c New portfolio message ","background:#ff2233;color:#fff;font-weight:bold",d);window.__messageLog.push(d)}catch(e){}
/* 2) local backup */
var arr=store("submissions",[]);arr.push(d);save("submissions",arr);refresh();
/* 3) forward details to owner's email via FormSubmit (free, no key) */
var btn=$("#sendBtn"),oldBtn=btn?btn.innerHTML:"";
if(btn){btn.disabled=true;btn.innerHTML="<span>Sending…</span>"}
fetch("https://formsubmit.co/ajax/sakshamsainisaini0@gmail.com",{method:"POST",headers:{"Content-Type":"application/json","Accept":"application/json"},body:JSON.stringify({name:d.name,email:d.email,phone:d.phone||"-",message:d.message,_subject:"New portfolio message from "+d.name,_template:"table"})}).then(function(r){return r.json()}).then(function(){toast("Message sent to Saksham's email — reply soon")}).catch(function(){toast("Saved in this browser, but email forward failed — check connection",true)}).finally(function(){if(btn){btn.disabled=false;btn.innerHTML=oldBtn}});
f.reset();count();});}

/* newsletter */
function initNews(){var f=$("#newsForm");if(!f)return;var inp=$("#newsEmail"),msg=$("#newsMsg");
f.addEventListener("submit",function(e){e.preventDefault();var v=inp.value.trim();
if(!EMAIL_RE.test(v)){msg.textContent="⚠️ Enter a valid email.";msg.className="news-msg error";return}
var list=store("newsletter",[]);if(list.indexOf(v.toLowerCase())!==-1){msg.textContent="Already subscribed — welcome back.";msg.className="news-msg info";return}
list.push(v.toLowerCase());save("newsletter",list);
try{console.log("%c New subscriber ","background:#ff2233;color:#fff;font-weight:bold",{email:v.toLowerCase(),ts:new Date().toISOString()});(window.__messageLog=window.__messageLog||[]).push({type:"subscriber",email:v.toLowerCase()})}catch(e){}
fetch("https://formsubmit.co/ajax/sakshamsainisaini0@gmail.com",{method:"POST",headers:{"Content-Type":"application/json","Accept":"application/json"},body:JSON.stringify({email:v.toLowerCase(),_subject:"New portfolio subscriber",_template:"table"})}).catch(function(){});
msg.textContent="Subscribed — welcome aboard.";msg.className="news-msg success";toast("Subscribed successfully");f.reset()});}

document.addEventListener("DOMContentLoaded",function(){initScrollChrome();initNav();initMotion();initScroll();initFilters();initProjects();initHero();initContact();initNews();
try{console.log("%c> hired? you read consoles. good sign. — Saksham","color:#FF3B4D;font-weight:bold")}catch(e){}
var y=$("#year");if(y)y.textContent=new Date().getFullYear();});
})();
