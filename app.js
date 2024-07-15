from = document.getElementsByName("from");

let url = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropDown = document.querySelectorAll(".dropDown select");
const fromCode = document.querySelector(".from select");
const toCode = document.querySelector(".to select");


window.addEventListener("load", ()=>{
    updateExchangeRate();
});

for (let i=0; i<dropDown.length;i++) {
    for (const code in countryList) {
       let newOption = document.createElement("option");
       newOption.innerText = code;
       newOption.value = code;
       if(dropDown[i].name === "from" && code === "USD"){
            newOption.selected = "selected";
       }
       else if(dropDown[i].name === "to" && code === "INR"){
        newOption.selected = "selected";
       }
       dropDown[i].append(newOption);
    }
    dropDown[i].addEventListener("change", (evt)=>{
        updateFlage(evt.target);
        updateExchangeRate();
    })
}

let e;
const updateFlage = (element) => {
    let curCode = element.value;
    let conCode = countryList[curCode];
    let imgUrl = "https://flagsapi.com/"+conCode+"/flat/64.png";
    let img  = element.parentElement.querySelector("img");
    img.src = imgUrl;
};

let button = document.querySelector("button");
button.addEventListener("click",async (evt)=>{
    evt.preventDefault();
    updateExchangeRate();
});

const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amval = amount.value;
    if(amval === "" || amval < 1){
        amval = 1;
        amount.value = 1;
    }
    let finalURL = `${url}/${fromCode.value.toLowerCase()}.json`;
    let responce = await fetch(finalURL);
    let data = await responce.json();
    let rate = data[fromCode.value.toLowerCase()][toCode.value.toLowerCase()]
    let changeString = document.querySelector(".msg");
    changeString.innerText = `${amval} ${fromCode.value} = ${amval*rate} ${toCode.value}`;
};
