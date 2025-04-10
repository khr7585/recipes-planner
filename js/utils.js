import { useFetchRandom, useFetchID, useFetchSearch } from "./api.js"

const renderRecipesHOC=()=>{

    //elements
    const Card = (imgSrc, id, name)=>
    `
    <div id=${id} class="card">
        <div class="cardimage">
            <img src=${imgSrc} alt=${name}/>
        </div>
        <div class="cardtext">
            <p>${name}</p>
            <div class="buttoncard">
                <button type="button" class="preparationBtn" >preparation</button>
            </div>
        </div>
    </div> 
    `
    const errorElement=msg=>(
        `<div class="error">${msg}</div>`
    )

    const LoadingElemenet="<div class='loading'>Loading.....</div>"



    // api helpers fn
    // render reciepeies
    const renderRandom= async (num=10, insertDom, errorDom,)=>{
        if (num>35){
            alert("the elements exceeds the limit");
            return
        }
        insertDom.innerHTML= LoadingElemenet;
        let data=[];
        let error="";
        try{
            await useFetchRandom(num, e=>{
                data = e
                console.log("fetched data: ", data);
            })
        }catch(err){
            error = err.message; 
        }

        if(error){
            errorDom.innerHTML = errorElement(error);
            return;
        }

        const elements = data.map(e=>{
            const { name, image, id } = e;
            return Card(image, id, name);
        })

        insertDom.innerHTML=""

        elements.forEach(e=>{
            insertDom.innerHTML+=e;
        })

        return
    }

    // renderBy id

    const renderSpecific= async (id, imgDom, contentDom)=>{
        imgDom.src="https://placehold.co/600x400";
        imgDom.alt="loading..."
        contentDom.innerHTML = LoadingElemenet;
        let data="";
        let error="";
        
        try{
            await useFetchID(id, e=>{
                data = e
                console.log("dta", data)
            })
        }catch(err){
            error = err.message;
        }

        if (error){
            console.log(error);
            return
        }
        
        imgDom.src = data.image,
        imgDom.alt = data.name,
        contentDom.innerHTML="",
        contentDom.textContent = data.instructions
        
        return
    }

    //saerch
    const renderBySearch=async (searchQuery, insertDom, errorLoadingDom)=>{
        insertDom.innerHTML = LoadingElemenet;
        let data=[];
        let errors="";
        try{
            await useFetchSearch(searchQuery, e=>{
                data = e;
            })
        }catch(err){
            errors = err.message;
            console.log("error :", errors)
        }

        if (errors){
            errorLoadingDom.innerHTML = errorElement(errors)
            return
        }
        const elements = data.map(e=>{
            const { name, image, id } = e;
            return Card(image, id, name);
        })

        insertDom.innerHTML="";
        elements.forEach(e=>{
            insertDom.innerHTML+=e;
        })
        return
    }
    

    return { renderRandom, renderSpecific, renderBySearch };
}

const render = renderRecipesHOC();

// debouncer

const useDebounceHOC=()=>{
    let timer;
    return function (callback, delay=3000){
        timer && clearTimeout(timer);
        timer = setTimeout(callback, delay);
    }
}

const useDebounce = useDebounceHOC();

export { render, useDebounce }