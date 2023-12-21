import { createSlice } from '@reduxjs/toolkit'

const rootSlice = createSlice({
    name: "root",
    initialState: {
        tequila_name: "Tequila Name",
        type: "Type",
        abv: "ABV",
        region: "Region",
    },
    reducers: {
        chooseTequila: (state, action) => { state.tequila_name = action.payload},
        chooseType: (state, action) => { state.type = action.payload},
        chooseAbv: (state, action) => { state.abv = action.payload},
        chooseRegion: (state, action) => { state.region = action.payload},
    }
})

export const reducer = rootSlice.reducer;
export const { chooseTequila, chooseType, chooseAbv, chooseRegion} = rootSlice.actions