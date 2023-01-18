const saveInput=document.getElementById("input-btn")
const delInput=document.getElementById("delete-btn")
let myLeads=`[]`
myLeads=JSON.parse(myLeads)
let leadsFromLocalStore=JSON.parse(localStorage.getItem("myLeads"))
const inputEl=document.getElementById("input-el")
const ulEl=document.getElementById("ul-el")
const saveTab=document.getElementById("save-btn")
if(leadsFromLocalStore){
    for(let i=0;i<leadsFromLocalStore.length;i++){
        myLeads[i]=leadsFromLocalStore[i];
    }
    render(myLeads)
}
saveInput.addEventListener("click", function(){
    myLeads.push(inputEl.value)
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    inputEl.value=""
    render(myLeads)
})
function render(leads){
    let listItems=""
    for(let i=0;i<leads.length;i++){
        listItems+=`
            <li>
                <a href="${leads[i]}" target="_blank">
                    ${leads[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML=listItems
}
delInput.addEventListener("dblclick", function(){
    myLeads=[]
    localStorage.clear()
    ulEl.textContent=""
})
saveTab.addEventListener("click", function(){
    chrome.tabs.query({active:true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    })
})

