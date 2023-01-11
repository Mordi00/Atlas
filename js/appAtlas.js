import { declareEvents } from "./atlasForm.js";
import { doApi } from "./atlasManager.js";


// A main function that activates the other functions
const init = () =>{
    
    doApi("israel");
    declareEvents();
}



init();