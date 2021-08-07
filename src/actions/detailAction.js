import {castAndCrewUrl, movieDetailUrl,imagesUrl,videosUrl} from "../api";

export const loadMovieDetails = (id) => async(dispatch) => {

    dispatch({
        type:"LOADING_DETAILS",
    });

    let response = await fetch(movieDetailUrl(id));
    response = await response.json();
    let castAndCrewData = await fetch(castAndCrewUrl(id));
    castAndCrewData = await castAndCrewData.json();
    let crew = [];
    let images = await fetch(imagesUrl(id));
    images = await images.json();
    let videos = await fetch(videosUrl(id));
    videos = await videos.json();
    castAndCrewData.crew.forEach((item,index) => { 
        if(index < 30)
        {
            let match = false;
            crew.forEach((fItem,fIndex) => {
                if(item.name === fItem.name)
                {
                    fItem.job = fItem.job+", "+item.job;
                    match = true;
                }
                if(fIndex === crew.length -1 && !match ){ 
                    crew.push(item);
                }                   
            }) 
            if(index < 1)
            {
                crew.push(item);
            } 
        }             
    })
    castAndCrewData.crew = crew;
    dispatch({
        type:"GET_DETAILS",
        payload:response,
        castAndCrewData:castAndCrewData,
        images:images,
        videos:videos,
    });
}

export const clearDetails = () => (dispatch) =>{
    dispatch({
        type:"CLEAR_DETAILS",
    });
}