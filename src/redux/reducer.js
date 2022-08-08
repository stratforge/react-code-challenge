import { createSlice } from '@reduxjs/toolkit'

const initialState={
    loader: false
};

export const counterSlice = createSlice({
  name: 'spaceX',
  initialState,
  reducers: {
    deleteLane: (state=initialState, action) => {
        const key = action.payload.key
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
     delete state[key];
     return state;
    },
    addLane: (state=initialState , action)=> {

        return{
      ...state,
      ...action.payload
        }
    },
    addItem: (state, action) => {
        const lane = action.payload.lane;
        const item = action.payload.item;
        const lanedata = state[lane];
        const laneItems = lanedata.items;

       laneItems.push(item);
       return state;
    },

    setLoader: (state, action) => {
        const newState = {
            ...state, loader: action.payload
        }
       return newState
    },

    setSearchValue:(state, action) => {
      const {payload}= action;
      const searchObj = {...payload};
      const newState ={
        ... state,
        searchObj
      }
      return newState
        
      
    }
  }
})

// Action creators are generated for each case reducer function
export const { deleteLane, addLane, addItem, setLoader , setSearchValue} = counterSlice.actions

export default counterSlice.reducer