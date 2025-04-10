import { useFetchRandom } from "./api.js";
import { render, useDebounce } from "./utils.js"

document.addEventListener("DOMContentLoaded", ()=>{
    const { renderRandom, renderBySearch } = render;

    const gridParent = document.querySelector(".grid-parent");
    const gridContainer = document.querySelector(".grid-container");

    renderRandom(15, gridParent, gridContainer);

    const useParams = new URLSearchParams(window.location.search);
    
    gridParent.addEventListener("click",(e)=>{
        if (e.target.classList.contains("preparationBtn")){
            const parentDom = e.target.parentElement.parentElement.parentElement;
            useParams.append("id", parentDom.id);
            window.location.href="preparation.html?"+useParams.toString();
        }
    })
    
    console.log("params: " ,useParams.toString())
    
    document.querySelector("input").addEventListener("input",(e)=>{

        useDebounce(()=>{
            console.log("search query: ", e.target.value.trim());
            if (e.target.value.trim()===""){
                renderRandom(15, gridParent, gridContainer);
                return
            }else{
                renderBySearch(e.target.value.trim(), gridParent, gridContainer);
            }
        }, 1000)
    })
    
})
