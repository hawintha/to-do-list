(()=>{"use strict";const e=(()=>{const e=e=>{const t=document.querySelectorAll("lord-icon");for(let n of t)n.setAttribute("colors",e)},t=t=>{document.documentElement.className=t,localStorage.setItem("theme",t);const n=document.querySelector(".theme-icon");"dark"===t?(n.checked=!0,e("primary:#3565B0,secondary:#0540A0")):(n.checked=!1,e("primary:#4FDDDE,secondary:#4FAAEF"))};return{setTheme:t,getTheme:()=>{localStorage.getItem("theme"),t(localStorage.getItem("theme"))},toggleSidebar:()=>{document.querySelector("body").classList.toggle("collapsed")},toggleForm:(e,t)=>{document.querySelector(".taskView").classList.add("showingForm"),document.querySelector(".task-form").classList.add("visible"),t?(document.querySelector(".create-task").classList.add("hidden"),document.querySelector(".confirm-edit").classList.remove("hidden"),e.firstElementChild.innerText="Edit Task",document.querySelector(".isImportant").classList.add("hidden")):(document.querySelector(".task-form").reset(),document.querySelector(".create-task").classList.remove("hidden"),document.querySelector(".confirm-edit").classList.add("hidden"),e.firstElementChild.innerText="New Task",document.querySelector(".isImportant").classList.remove("hidden"))},closeForm:()=>{document.querySelector(".taskView").classList.remove("showingForm"),document.querySelector(".task-form").classList.remove("visible")},addTask:(e,t,n)=>{const s=document.createElement("div");s.classList.add("task"),s.id="task-"+t,n.appendChild(s);const i=document.createElement("div");i.classList.add("line"),s.appendChild(i);const d=document.createElement("div");d.classList.add("flex"),i.appendChild(d);const c=document.createElement("span");c.classList.add("finish-icon","material-symbols-outlined"),c.innerText="circle",d.appendChild(c);const r=document.createElement("p");r.innerText=e[t].title,d.appendChild(r);const a=document.createElement("div");a.classList.add("grid"),i.appendChild(a);const o=document.createElement("div");o.classList.add("flex"),a.appendChild(o);const l=document.createElement("span");l.classList.add("expand","material-symbols-outlined"),l.innerText="expand_more",o.appendChild(l);const m=document.createElement("span");m.classList.add("expand","material-symbols-outlined","hidden"),m.innerText="expand_less",o.appendChild(m);const u=document.createElement("lord-icon");u.classList.add("edit-icon"),u.src="https://cdn.lordicon.com/hiqmdfkt.json",u.trigger="loop-on-hover",u.colors="primary:#4FDDDE,secondary:#4FAAEF",u.stroke="100",u.style="width:25px;height:25px",a.appendChild(u);const p=document.createElement("div");p.classList.add("flex"),a.appendChild(p);const h=document.createElement("lord-icon");h.classList.add("star"),h.src="https://cdn.lordicon.com/whttoese.json",h.trigger="morph",h.colors="primary:#4FDDDE,secondary:#4FAAEF",h.stroke="100",h.style="width:25px;height:25px",p.appendChild(h);const g=document.createElement("span");g.classList.add("star","material-symbols-outlined","hidden"),g.innerText="star",p.appendChild(g);const E=document.createElement("lord-icon");E.classList.add("trash-icon"),E.src="https://cdn.lordicon.com/tntmaygd.json",E.trigger="loop-on-hover",E.colors="primary:#4FDDDE,secondary:#4FAAEF",E.stroke="100",E.style="width:25px;height:25px",E.state="hover-empty",a.appendChild(E);const y=document.createElement("div");y.classList.add("details","hidden"),s.appendChild(y);const k=document.createElement("div");k.classList.add("detail-title"),y.appendChild(k);const L=document.createElement("span");L.innerText="Title: ",k.appendChild(L);const S=document.createElement("span");S.innerText=e[t].title,k.appendChild(S);const v=document.createElement("div");v.classList.add("detail-description"),y.appendChild(v);const T=document.createElement("span");T.innerText="Description: ",v.appendChild(T);const q=document.createElement("span");q.innerText=e[t].description,v.appendChild(q);const x=document.createElement("div");x.classList.add("detail-project"),y.appendChild(x);const f=document.createElement("span");f.innerText="Project: ",x.appendChild(f);const b=document.createElement("span");b.innerText=e[t].project,x.appendChild(b);const C=document.createElement("div");C.classList.add("detail-due-date"),y.appendChild(C);const F=document.createElement("span");F.innerText="Due: ",C.appendChild(F);const D=document.createElement("span");D.innerText=e[t].dueDate,C.appendChild(D)},markTask:(e,t)=>{e[t].isImportant&&(document.querySelector(`#task-${t} lord-icon.star`).classList.add("hidden"),document.querySelector(`#task-${t} span.star`).classList.remove("hidden")),e[t].isFinished&&n.toggleFinish(document.querySelector(`#task-${t} .finish-icon`))}}})(),t=(()=>{function t(t){for(let s of t)"true"!==s.getAttribute("listener")&&(s.addEventListener("click",(t=>{s.classList.contains("finish-icon")?n.toggleFinish(t.target,t.target.parentElement.parentElement.parentElement.id):s.classList.contains("expand")?(t.target.classList.toggle("hidden"),"expand_more"===t.target.innerText?s.nextElementSibling.classList.toggle("hidden"):s.previousElementSibling.classList.toggle("hidden"),t.target.parentElement.parentElement.parentElement.nextElementSibling.classList.toggle("hidden")):s.classList.contains("edit-icon")?(e.toggleForm(document.querySelector(".task-form"),!0),n.prepareEdit(t.target.parentElement.parentElement.parentElement)):s.classList.contains("star")?(t.target.classList.toggle("hidden"),n.starTask(t.target,t.target.parentElement.parentElement.parentElement.parentElement.id)):s.classList.contains("trash-icon")&&n.deleteTask(t.target.parentElement.parentElement.parentElement)})),s.setAttribute("listener","true"))}return{addTaskListeners:()=>{t(document.querySelectorAll(".finish-icon")),t(document.querySelectorAll(".expand")),t(document.querySelectorAll(".edit-icon")),t(document.querySelectorAll(".star")),t(document.querySelectorAll(".trash-icon"))}}})(),n=(()=>{const n=document.querySelector("#taskTitle"),s=document.querySelector("#description"),i=document.querySelector("#projectName"),d=document.querySelector("#dueDate"),c=document.querySelector("#isImportant");let r=[];class a{constructor(e,t,n,s,i,d,c){this.title=e,this.description=t,this.project=n,this.dueDate=s,this.isImportant=i,this.isFinished=d,this.isDeleted=c}}return r.push(new a("Add dark mode","Switch toggle on upper right corner","Project 1","2022-10-22",!1,!0)),r.push(new a("Make sidebar menu collapsible","Animation","Project 1","2022-10-31",!1,!1)),r.push(new a("Allow tasks to be categorized","By date and by project","Project 1","2022-11-30",!0,!1)),{loadTasks:()=>{for(let t=0;t<r.length;t++)e.addTask(r,t,document.querySelector(".tasks")),e.markTask(r,t);t.addTaskListeners()},toggleFinish:function(e,t){"circle"===e.innerText?(e.innerText="task_alt",e.classList.add("finished"),e.nextElementSibling.classList.add("finished"),t&&(r[t.substring(5)].isFinished=!0)):(e.innerText="circle",e.classList.remove("finished"),e.nextElementSibling.classList.remove("finished"),t&&(r[t.substring(5)].isFinished=!1))},prepareEdit:function(e){n.value=r[e.id.substring(5)].title,s.value=r[e.id.substring(5)].description,i.value=r[e.id.substring(5)].project,d.value=r[e.id.substring(5)].dueDate,document.querySelector(".editing")&&document.querySelector(".editing").classList.remove("editing"),e.classList.add("editing")},starTask:function(e,t){"LORD-ICON"===e.tagName?(e.nextElementSibling.classList.toggle("hidden"),r[t.substring(5)].isImportant=!0):(e.previousElementSibling.classList.toggle("hidden"),r[t.substring(5)].isImportant=!1)},deleteTask:function(e){r[e.id.substring(5)].isDeleted=!0,e.remove()},createNewTask:function(){!function(e,t,n,s,i){let d=new a(e,t,n,s,i);r.push(d)}(n.value,s.value,i.value,d.value,c.checked),e.addTask(r,r.length-1,document.querySelector(".tasks")),e.markTask(r,r.length-1),t.addTaskListeners(),document.querySelector(".task-form").reset()},editTask:function(){let e=r[document.querySelector(".editing").id.substring(5)];document.querySelector(".editing p").innerText=n.value,e.title=n.value,e.description=s.value,e.project=i.value,e.dueDate=d.value,document.querySelector(".editing .detail-title span:last-child").innerText=n.value,document.querySelector(".editing .detail-description span:last-child").innerText=s.value,document.querySelector(".editing .detail-project span:last-child").innerText=i.value,document.querySelector(".editing .detail-due-date span:last-child").innerText=d.value}}})();n.loadTasks(),function(){e.getTheme();const t=document.querySelector(".theme-icon");t.addEventListener("click",(()=>t.checked?e.setTheme("dark"):e.setTheme("light"))),document.querySelector(".menu-icon").addEventListener("click",(()=>{e.toggleSidebar()})),document.querySelector(".add-task").addEventListener("click",(()=>{e.toggleForm(document.querySelector(".task-form"),!1)})),document.querySelector(".cancel").addEventListener("click",(()=>{e.closeForm()})),document.querySelector(".create-task").addEventListener("click",(()=>{e.closeForm(),n.createNewTask()})),document.querySelector(".confirm-edit").addEventListener("click",(()=>{e.closeForm(),n.editTask()}))}()})();