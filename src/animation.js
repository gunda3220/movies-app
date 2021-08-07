export const pageAnimation = {
    hidden:{
        y:150,
    },
    show:{
        y:0,
        transition:{
            duration:0.5,
            ease:"easeOut",
            staggerChildren:0.15,
        }
    },
    exit:{
        y:150,
        transition:{
            duration:0.5,
        }
    }, 
}

export const fadeIn = {
    hidden:{
        opacity:0,
    },
    show:{
        opacity:1,
        transition:{
            duration:1,
            ease:"easeOut",
        }
    }
}

export const navFadeIn ={
    hidden:{
        x:100,
        opacity:0,
    },
    show:{
        opacity:1,
        x:0,
        transition:{
            duration:0.5,
            ease:"easeOut",
        }
    }
}

export const movieTabAnimation = {
    hidden:{
        opacity:0,
    },
    show:{
        opacity:1,
        transition:{
            duration:0.75,
            ease:"easeOut",
            when:"beforeChildren",
            staggerChildren:0.15,
        },
    }
}

export const titleAnimation = {
    hidden:{
        x:-50,
    },
    show:{
        x:0,
        transition:{
            duration:0.5,
            ease:"easeOut",
        }
    }
}

export const ratingAnimation = (rating) => {
    return(
        {
            hidden:{
                pathLength:0,
            },
            show:{
                pathLength:rating,
                transition:{
                    duration:1.5,
                    ease:"easeOut",
                    delay:1.5,
                }
            },
        }    
    )
   
}