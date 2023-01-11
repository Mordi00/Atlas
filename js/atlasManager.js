import { objNamesByCodes } from "./objs.js";

let id_main = document.querySelector("#id_main");


// A function that pulls the API and collects the information from there
export const doApi = async () => {

    try {
        showLoading();
        let url = "https://restcountries.com/v3.1/name/israel";
        let resp = await fetch(url);
        let data = await resp.json();
        console.log(data);
        createFill(data);
    }
    catch (err) {
        console.log(err);
        alert("There is a problem, come back later");
    }
}


// A function that performs a search in the API
export const doApiSearch = async (_searchQ) => {
    if (!(_searchQ == "Palestine" || _searchQ == "palestine")) {
        try {
            showLoading();
            let url = `https://restcountries.com/v3.1/name/${_searchQ}`;
            let resp = await axios.get(url);
            console.log(resp.data);
            createFill(resp.data);
        }
        catch (err) {
            console.log(err);
            alert("There problem, come back later");
        }
    }
    else {
        alert("There is no such country called Palestine!!!")
    }
}


// A function that creates the page
export const createFill = (_arr) => {

    id_main.innerHTML = "";
    id_main.innerHTML += `
    <div class="info col-lg-5 h-100 d-flex flex-column justify-content-evenly mb-5 mb-lg-0">
            <h1 id="id_name">${_arr[0].name.common}</h1>
            <div class="w-75">
                <img class="w-100" id="id_flag" src="${_arr[0].flags.png}" alt="${_arr[0].name.common}">
            </div>
            <h3>capital: <span id="span_capital">${_arr[0].capital[0]}</span></h3>
            <h3>population: <span id="span_pop">${_arr[0].population.toLocaleString()}</span></h3>
            <h3>region: <span id="span_region">${_arr[0].region}</span></h3>
            <h3>coin: <span id="span_coin">${Object.keys(_arr[0].currencies) + " \"" + Object.values(_arr[0].currencies)[0].symbol + "\"" + " (" + Object.values(_arr[0].currencies)[0].name + ")"}</span></h3>
            <div id="id_row" class="row justify-content-around">

            </div>
        </div>
    `
    createMap(_arr[0].latlng[0], _arr[0].latlng[1]);
    
 
    let id_row = id_main.querySelector("#id_row");
    
    if (_arr[0].borders) {
        id_row.innerHTML = "";
        _arr[0].borders.forEach(item => {
            if (!(objNamesByCodes(item) == "Palestine")) {
                let borderState = document.createElement("button");
                borderState.className = "btn btn-primary col me-2 mb-2 p-1 "
                borderState.innerHTML = objNamesByCodes(item);
                id_row.append(borderState);
                
                borderState.addEventListener('click', () => {
                    doApiSearch(borderState.innerHTML);
                })
            }
        })
       
    }
    else {
        id_row.innerHTML = `<h5 class="mt-5 text-danger fw-bolder" >There are no countries bordering the country!!!</h5> `;
    }
   
}


// A function that creates the map
const createMap = (_longitude, _Latitude) => {

    id_main.innerHTML +=`
    <div class="col-lg-6 h-100 opacity-75">
        <iframe id="id_map" class="col-12 m-0 p-0 h-100" src="https://maps.google.com/maps?q=${_longitude},${_Latitude}&z=5&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0"
            marginwidth="0"></iframe>
    </div>
    `
}


// A function that creates a loading page until the page is loaded
export const showLoading = () => {
    id_main.innerHTML = `
    <div class="m-auto my-0">
      <img src="images/loading.gif" height="87%" alt="loading" >
    </div>
    `
}