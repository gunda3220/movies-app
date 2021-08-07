import React from 'react';

export const updateScrollPos = (scrollPos) => (dispatch) => {
    dispatch({
        type:"SET_SCROLL_POS",
        payload:scrollPos,
    });
}

export const updateAppHeight = (height) => (dispatch) => {
    dispatch({
        type:"UPDATE_APP_HEIGHT",
        payload:height,
    })
}

