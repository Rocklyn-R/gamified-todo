import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./Store";
import { Reward, RewardsState } from "../types/Types";


export const RewardsSlice = createSlice({
    name: "rewards",
    initialState: {
        totalCoins: 100,
        shop: [{
            name: "Movie",
            price: 50,
            description: "",
            id: "12423",
            icon: "gift"
        }],
        inventory: [],
        usedRewards: []
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
        },

        editItemInShop: (state, action: PayloadAction<Reward>) => {
            const index = state.shop.findIndex(item => item.id === action.payload.id);
            if (index !== -1) {
                state.shop[index] = action.payload;
            }
        },

        deleteItemFromShop: (state, action: PayloadAction<Reward>) => {
            state.shop = state.shop.filter(item => item.id !== action.payload.id);
        },

        buyItem: (state, action: PayloadAction<Reward>) => {
            state.inventory.unshift(action.payload);
            state.totalCoins = state.totalCoins - action.payload.price;
        },

        spendReward: (state, action: PayloadAction<Reward>) => {
            state.inventory = state.inventory.filter(item => item.id !== action.payload.id);
            state.usedRewards.unshift(action.payload);
        }
    }
})

export const {
    addToCoins,
    subtractCoins,
    addItemToShop,
    editItemInShop,
    deleteItemFromShop,
    buyItem,
    spendReward
} = RewardsSlice.actions;

export const selectTotalCoins = (state: RootState) => state.rewards.totalCoins;
export const selectItemsInShop = (state: RootState) => state.rewards.shop;
export const selectInventory = (state: RootState) => state.rewards.inventory;
export const selectUsedRewards = (state: RootState) => state.rewards.usedRewards;



export default RewardsSlice.reducer;