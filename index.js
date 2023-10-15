const billAmountInput = document.getElementById("bill");
const numberOfPeopleInput = document.getElementById("numofpeople");

const tipAmountPerPersonSpan = document.querySelector(".tip-amount__per-person");
const totalBillPerPersonSpan = document.querySelector(".total-tip__per-person");

const tipOptions = document.querySelectorAll(".tips");
const customTip = document.querySelector(".custom-tip");

const resetButton = document.querySelector(".reset-btn");
const warning = document.querySelector(".warning");


let prevButton;
let desiredTip;
let totalTipPerPerson;
let totalBillPerPerson;


    
tipOptions.forEach(tip => {
    
    tip.addEventListener("click", (e) => {

        if(numberOfPeopleInput.value === "0" || numberOfPeopleInput.value === ""){
            warning.style.opacity = "100";
        }else{
            warning.style.opacity = "0";
        }
        
    
        e.target.classList.add("btn-active");
    
        if (prevButton !== null) {
            prevButton?.classList.remove("btn-active");
        }
    
        prevButton = e.target;
    
        desiredTip = Number(e.target.dataset.tip);

        calculate();
    
    });
    
});

customTip.addEventListener("input", (e) => {

    if(numberOfPeopleInput.value === "0" || numberOfPeopleInput.value === ""){
        warning.style.opacity = "100";
    }else{
        warning.style.opacity = "0";
    }
    


    if (document.activeElement.classList.contains("custom-tip")) {
        tipOptions.forEach(tip => {
            tip.classList.remove("btn-active");
        })
    }
    
    desiredTip = Number(e.target.value);
    
});

document.addEventListener("keyup", (e) => {

    if(numberOfPeopleInput.value === "0" || numberOfPeopleInput.value === ""){
        warning.style.opacity = "100";
    }else{
        warning.style.opacity = "0";
    }
    

    if(desiredTip !== 0)
        calculate();
    
    return;
});

resetButton.addEventListener("click", reset);



function calculate(){


    totalTipPerPerson = ((billAmountInput.value / numberOfPeopleInput.value) * (desiredTip / 100)).toFixed(2);
    totalBillPerPerson = (Number(totalTipPerPerson) + (billAmountInput.value / numberOfPeopleInput.value)).toFixed(2);

    
    
    if(isNaN(totalBillPerPerson) || !isFinite(totalBillPerPerson) || totalBillPerPerson === 0){
        totalBillPerPersonSpan.textContent = "0.00";
        tipAmountPerPersonSpan.textContent = "0.00";
        
        
    }

    else{
        totalBillPerPersonSpan.textContent = totalBillPerPerson;
        tipAmountPerPersonSpan.textContent = totalTipPerPerson;
        resetButton.classList.add("btn-active") 
    }

};

function reset(){
    
        resetButton.classList.remove("btn-active")
        warning.style.opacity = "0";
        totalBillPerPersonSpan.textContent = "0.00";
        tipAmountPerPersonSpan.textContent = "0.00";

        billAmountInput.value = '';
        numberOfPeopleInput.value = '';

        customTip.value = '';
        desiredTip = 0;

        tipOptions.forEach(tip => {
            tip.classList.remove("btn-active");
        });   

};