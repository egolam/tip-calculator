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
    
        e.target.classList.add("btn-active");
    
        if (prevButton !== null) {
            prevButton?.classList.remove("btn-active");
        }
    
        prevButton = e.target;
    
        desiredTip = Number(e.target.dataset.tip);
    
    });
    
});

customTip.addEventListener("input", (e) => {


    if (document.activeElement.classList.contains("custom-tip")) {
        tipOptions.forEach(tip => {
            tip.classList.remove("btn-active");
        })
    }
    
    desiredTip = Number(e.target.value);
    
});

document.addEventListener("keyup", (e) => {

    if(numberOfPeopleInput.value === 0 || numberOfPeopleInput.value === ''){
        warning.style.opacity = "100";
    }
    else{
        warning.style.opacity = "0";
        calculate();

    };

    if(desiredTip !== 0)
        calculate();
    
    return;
});

document.addEventListener("click", (e) => {
    
    if(numberOfPeopleInput.value === 0 || numberOfPeopleInput.value === ''){
        warning.style.opacity = "100";
    }
    else{
        warning.style.opacity = "0";
        calculate();

    };

    if(resetButton.activeElement = true && resetButton.classList.contains("btn-active")){
        reset();
    }

});

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
    }

    if(totalBillPerPerson > 0 && totalTipPerPerson > 0){
        resetButton.classList.add("btn-active");
    }

    else{
        resetButton.classList.remove("btn-active"); 
    }



};

function reset(){

    resetButton.addEventListener("click", (e) =>{

        if(resetButton.classList.contains("btn-active")){
            totalBillPerPersonSpan.textContent = "0.00";
            tipAmountPerPersonSpan.textContent = "0.00";

            billAmountInput.value = '';
            numberOfPeopleInput.value = '';

            customTip.value = '';
            desiredTip = 0;

            tipOptions.forEach(tip => {
                tip.classList.remove("btn-active");
            })
        }

        
    });

};
