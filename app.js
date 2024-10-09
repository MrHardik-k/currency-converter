from = document.getElementsByName("from");

let api_key = "448b0e77ac6b4475a52a6e772892be68"
let url = `https://api.currencyfreaks.com/v2.0/rates/latest?apikey=${api_key}`;

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
let  data;
const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amval = amount.value;
    if(amval === "" || amval < 1){
        amval = 1;
        amount.value = 1;
    }
    let finalURL = `${url}&symbols=${fromCode.value.toUpperCase()},${toCode.value.toUpperCase()}`;
    let responce = await fetch(finalURL);
    data = await responce.json();
    console.log(finalURL);
    console.log(data);
    let rate = data['rates'][toCode.value.toUpperCase()]/data['rates'][fromCode.value.toUpperCase()]
    let changeString = document.querySelector(".msg");
    changeString.innerText = `${amval} ${fromCode.value} = ${amval*rate} ${toCode.value}`;
};
