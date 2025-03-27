document.addEventListener("DOMContentLoaded",()=>{
    const expenseForm=document.getElementById("expense-form")
    const expAmount=document.getElementById("expense-amount")
    const expName=document.getElementById("expense-name")
    const expenseList=document.getElementById("expense-list")
    const total=document.getElementById("total-amount")
    let totalAmount=0;
    let toDelete;
    let expenses=JSON.parse(localStorage.getItem("list"))||[]
    if(expenses){
        renderExpenses()
        total.textContent=totalAmount;
    }
    expenseForm.addEventListener("submit",()=>{
        if(!expName.value.trim()&&!expAmount.value.trim()) return;
        let data={
            name:expName.value.trim(),
            expAmount:expAmount.value.trim(),
            uuid:Date.now()
        }
        expenses.push(data)
        setExpense(expenses)
    })
    function setExpense(data){
        localStorage.setItem("list",JSON.stringify(data))
    }
    function deleteExpense(toDelete){
        expenses=expenses.filter((item)=>item.uuid==toDelete)
        setExpense(expenses)
    }

    function renderExpenses(){
        expenses.forEach(expense=>{
           
            totalAmount+=parseInt(expense.expAmount);
            const li=document.createElement("li")
            li.innerHTML=`
            <p>${expense.name}     -$${expense.expAmount}</p>
            <button uid="${expense.uuid}">Delete</button>`
            expenseList.appendChild(li)
            li.addEventListener("click",(e)=>{
                if(e.target.tagName="BUTTON"){
                    toDelete=e.target.getAttribute("uuid");
                    deleteExpense(toDelete);
                    renderExpenses()
                }
            })
        })
    }

})