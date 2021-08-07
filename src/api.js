const base_url = "https://api.themoviedb.org/3/";
const api_key = process.env.REACT_APP_MOVIES_API_KEY;


var nextDayDate = 0;
var nextDayMonth = 0;
var nextDayYear = 0; 

const getCurrentMonth = () =>{
    const month = new Date().getMonth()+1;
    if(month < 10){
        return `0${month}`;
    }
    else{
        return month;
    }
};

const getCurrentDay = () =>{
    const day = new Date().getDate();
    if(day < 10)
    {
        return `0${day}`;
    }
    else{
        return day;
    }
};

const getNextDay = () =>{
    var nextDay = new Date();
    nextDay.setDate(new Date().getDate()+1);
    nextDayDate = nextDay.getDate();
    if(nextDayDate < 10)
    {
        nextDayDate = `0${nextDayDate}`;
    }
    nextDayMonth = nextDay.getMonth()+1;
    if(nextDayMonth < 10)
    {
        nextDayMonth = `0${nextDayMonth}`;
    }
    nextDayYear = nextDay.getFullYear();
}

getNextDay();

const currentYear = new Date().getFullYear();
const currentMonth = getCurrentMonth();
const currentDay = getCurrentDay();
const nextDay = `${nextDayYear}-${nextDayMonth}-${nextDayDate}`;
const currentDate = `${currentYear}-${currentMonth}-${currentDay}`;

export const recentMoviesUrl = () => `${base_url}discover/movie?api_key=${api_key}&primary_release_date.lte=${currentDate}&vote_count.gte=10&sort_by=primary_release_date.desc`;

export const popularMoviesUrl = () => `${base_url}discover/movie?api_key=${api_key}&vote_count.gte=500&sort_by=vote_average.desc`;

export const upcomingMoviesUrl =() => `${base_url}discover/movie?api_key=${api_key}&primary_release_date.gte=${nextDay}&sort_by=primary_release_date.asc`;

export const searchByNameUrl = (name) => `${base_url}search/movie?api_key=${api_key}&query=${name}`;

export const movieDetailUrl = (id) => `${base_url}movie/${id}?api_key=${api_key}`;

export const castAndCrewUrl = (id) => `${base_url}movie/${id}/credits?api_key=${api_key}`;

export const imagesUrl = (id) => `${base_url}movie/${id}/images?api_key=${api_key}`;

export const videosUrl = (id) => `${base_url}movie/${id}/videos?api_key=${api_key}`;