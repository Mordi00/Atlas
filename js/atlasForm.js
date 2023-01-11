import { doApiSearch, showLoading } from "./atlasManager.js";


let btn_country = document.querySelectorAll(".btn_country");
let inp_search = document.querySelector("#inp_search");
let id_form = document.querySelector("#id_form");



// A function that activates the country's page according to the search or the button
export const declareEvents = () => {
    btn_country.forEach(country => {
        country.addEventListener('click', () => {
            showLoading();
            doApiSearch(country.innerHTML);
        })
    })
    
    id_form.addEventListener('submit' , (e) => {
        
        if (inp_search.value == "") {
            return alert("The search is empty!")
        }
        
        e.preventDefault();
        
        showLoading();
        doApiSearch(inp_search.value);
        inp_search.value = "";
    })
}