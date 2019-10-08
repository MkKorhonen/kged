// action creators

import { fetchRooms, fetchFurnitures } from 'api'

// thunk
export function loadRooms() {
    return function(dispatch, getState) {
        const rooms = fetchRooms()
        dispatch({
            type: 'GET_ROOMS',
            payload: {
                rooms
            }
        })
    }
}

export const addRoom = (room) => ({
    type: 'ADD_ROOM',
    payload: {
        room: room
    }
})

export const updateRoom = (room) => ({
    type: 'UPDATE_ROOM',
    payload: {
        room: room
    }
})

export const deleteRoom = (room) => ({
    type: 'DELETE_ROOM',
    payload: {
        room: room
    }
})

export const setActiveRoom = (room) => ({
    type: 'SET_ACTIVE_ROOM',
    payload: {
        room: room
    }
})





export function loadFurnitures() {
    return function(dispatch, getState) {
        const furnitures = fetchFurnitures()
        dispatch({
            type: 'GET_FURNITURES',
            payload: {
                furnitures
            }
        })
    }
}

export const addFurniture = (furniture) => ({
    type: 'ADD_FURNITURE',
    payload: {
        furniture: furniture
    }
})

export const updateFurniture = (furniture) => ({
    type: 'UPDATE_FURNITURE',
    payload: {
        furniture: furniture
    }
})

export const deleteFurniture = (furniture) => ({
    type: 'DELETE_FURNITURE',
    payload: {
        furniture: furniture
    }
})

export const setActiveFurniture = (furniture) => ({
    type: 'SET_ACTIVE_FURNITURE',
    payload: {
        furniture: furniture
    }
})
