const useFetchRandom = async (count=10, callback=false)=>{
    try{
        let data=[];
        for (let i=0;i<count;i++){
            let res = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
            if (!res.ok) throw new Error ("bad response");
            let parsed = await res.json();
            data.push({
                name: parsed.meals[0]["strMeal"],
                id: parsed.meals[0]["idMeal"],
                image: parsed.meals[0]["strMealThumb"]
            })
        }
        callback && callback(data)
    }catch(error){
        console.warn("error occured: ", error.message)
    }
}

const useFetchSearch = async (search, callback=false)=>{
    try{
        let data=[];
        let res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`);
        if (!res.ok) throw new Error ("bad response");
        let parsed = await res.json();
        parsed.meals.forEach(e=>{
            data.push({
                name: e["strMeal"],
                id: e["idMeal"],
                image: e["strMealThumb"]
            })
        }) 
        callback && callback(data)
    }catch(error){
        console.warn("error occured: ", error.message)
    }
}

const useFetchID= async (id, callback=false)=>{
    try{
        let res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        if (!res.ok) throw new Error ("bad response");
        let parsed = await res.json();
        let data = {
            name: parsed.meals[0]["strMeal"],
            instructions: parsed.meals[0]["strInstructions"],
            image: parsed.meals[0]["strMealThumb"],
            youtube: parsed.meals[0]["strYoutube"],
        }
        callback && callback(data)
    }catch(error){
        console.warn("error occured: ", error.messsage)
    }
}

export { useFetchRandom, useFetchSearch, useFetchID }