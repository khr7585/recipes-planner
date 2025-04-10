import { render } from "./utils.js";
document.addEventListener("DOMContentLoaded", ()=>{
    const useParams = new URLSearchParams(window.location.search);
    console.log("params: ", useParams.toString());

    if (!useParams.has("id")){
        window.location.href = "index.html";
        return
    }

    const { renderSpecific } = render;

    const id = useParams.get("id");
    const imgDom = document.querySelector("img");
    const txtDom = document.querySelector(".text");

    renderSpecific(id, imgDom, txtDom);

    document.querySelector(".backBtn").addEventListener("click", ()=>{
        window.location.href="index.html";
        return;
    })
    
})