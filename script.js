const $=s=>document.querySelector(s), $$=s=>document.querySelectorAll(s);

function clock(zone){
  return new Intl.DateTimeFormat("en-GB",{timeZone:zone,hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:false}).format(new Date());
}
function date(zone){
  return new Intl.DateTimeFormat("en-US",{timeZone:zone,weekday:"long",month:"long",day:"2-digit",year:"numeric"}).format(new Date()).toUpperCase().replace(","," ·").replace(",","");
}
function update(){
  const now=new Date(), zone="Europe/Amsterdam";
  $("#heroTime").textContent=clock(zone);
  $("#mainTime").textContent=clock(zone);
  $("#heroDate").textContent=date(zone);
  $("#mainDate").textContent=date(zone);
  $("#utc").textContent=clock("UTC");
  $$("[data-zone]").forEach(e=>e.textContent=clock(e.dataset.zone).slice(0,5));
  $$("[data-date-zone]").forEach(e=>e.textContent=date(e.dataset.dateZone).replace(/,.*$/,""));
  const parts=new Intl.DateTimeFormat("en",{timeZone:zone,timeZoneName:"longOffset"}).formatToParts(now);
  const off=parts.find(p=>p.type==="timeZoneName")?.value?.replace("GMT","")||"+02:00";
  $("#heroOffset").textContent=off.replace(":00","");
}
update();setInterval(update,1000);

$("#ambientBtn").addEventListener("click",()=>{
  document.documentElement.classList.toggle("ambient-mode");
  const active=document.documentElement.classList.contains("ambient-mode");
  $("#ambientBtn").innerHTML=active?"<span>◉</span> Exit Ambient":"<span>◉</span> Ambient Mode";
});

const observer=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("show")});
},{threshold:.12});
$$(".port,.display,.map,.about-copy").forEach(e=>{e.style.opacity="0";e.style.transform="translateY(18px)";e.style.transition="opacity .8s ease,transform .8s ease";observer.observe(e)});
document.addEventListener("DOMContentLoaded",()=>$$(".show").forEach(e=>{e.style.opacity="1";e.style.transform="none"}));
