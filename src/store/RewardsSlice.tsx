import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./Store";
import { Reward, RewardsState } from "../types/Types";


export const RewardsSlice = createSlice({
    name: "rewards",
    initialState: {
        totalCoins: 0,
        shop: [{
            name: "Movie",
            price: 50,
            description: "",
            id: "12423"
        }],
        inventory: []
    } as RewardsState,

    reducers: {
        addToCoins: (state, action: PayloadAction<number>) => {
            state.totalCoins = state.totalCoins + action.payload;
        },

        subtractCoins: (state, action: PayloadAction<number>) => {
            state.totalCoins = state.totalCoins - action.payload;
        },

        addItemToShop: (state, action: PayloadAction<Reward>) => {
            state.shop.unshift(action.payload);
        }
    }
})

export const {
    addToCoins,
    subtractCoins,
    addItemToShop
} = RewardsSlice.actions;

export const selectTotalCoins = (state: RootState) => state.rewards.totalCoins;
export const selectItemsInShop = (state: RootState) => state.rewards.shop;



export default RewardsSlice.reducer;