import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./Store";
import { InventoryItem, Reward, RewardsState } from "../types/Types";

const currentDate = new Date();
const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
const formattedDate = currentDate.toLocaleDateString('en-US', options);


export const RewardsSlice = createSlice({
    name: "rewards",
    initialState: {
        totalCoins: 200,
        shop: [{
            name: "Movie",
            price: 100,
            description: "2 hour long",
            id: "124sdfgd23",
            icon: "movie"
        },
        {
            name: "TV Episode",
            price: 50,
            description: "1 hour long",
            id: "124sgshsdfhfd23",
            icon: "movie"
        },
        {
            name: "Have A Cocktail",
            price: 50,
            description: "",
            id: "124sgshsdfasdfsdfhfd23",
            icon: "cocktail"
        },
        {
            name: "Play Video Games",
            price: 100,
            description: "1 hour",
            id: "124sgsaagahsdfhfd23",
            icon: "videoGame"
        },
        {
            name: "Scroll Phone",
            price: 100,
            description: "1 hour",
            id: "12424dgashsdfhfd23",
            icon: "phone"
        }, 
    ],
        inventory: [{
            name: "Movie",
            price: 50,
            description: "2 hour long",
            id: "124sdfgd23",
            icon: "movie",
            quantity: 3
        }],
        usedRewards: [
            {
                name: "Movie",
                price: 50,
                description: "2 hour long",
                id: "124sdfgd23",
                icon: "movie",
                dateUsed: "02/14/2014"
            },
            {
                name: "Movie",
                price: 50,
                description: "2 hour long",
                id: "124sdfgd23",
                icon: "movie",
                dateUsed: "02/14/2014"
            }
        ]
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
            const shopItemIndex = state.shop.findIndex(item => item.id === action.payload.id);
            if (shopItemIndex !== -1) {
                state.shop[shopItemIndex] = action.payload;
            }
            const inventoryItemIndex = state.inventory.findIndex(item => item.id === action.payload.id);
            if (inventoryItemIndex !== -1) {
                state.inventory[inventoryItemIndex].icon = action.payload.icon;
            }

            const usedItemIndex = state.usedRewards.findIndex(item => item.id === action.payload.id);
            if (usedItemIndex !== -1) {
                state.usedRewards = state.usedRewards.map(reward => {
                    if (reward.id === action.payload.id) {
                        return { ...reward, icon: action.payload.icon }
                    }
                    return reward;
                })
            }
        },

        deleteItemFromShop: (state, action: PayloadAction<Reward>) => {
            state.shop = state.shop.filter(item => item.id !== action.payload.id);
        },

        buyItem: (state, action: PayloadAction<Reward>) => {
            const existingItemIndex = state.inventory.findIndex(item => item.id === action.payload.id);
            if (existingItemIndex !== -1) {
                state.inventory[existingItemIndex].quantity += 1;
            } else {
                const itemWithQuantity: InventoryItem = { ...action.payload, quantity: 1 };
                state.inventory.unshift(itemWithQuantity)
            }

            state.totalCoins = state.totalCoins - action.payload.price;
        },

        spendReward: (state, action: PayloadAction<InventoryItem>) => {
            const existingItemIndex = state.inventory.findIndex(item => item.id === action.payload.id);
            if (existingItemIndex !== -1 && state.inventory[existingItemIndex].quantity > 1) {
                state.inventory[existingItemIndex].quantity -= 1;
            } else {
                state.inventory = state.inventory.filter(item => item.id !== action.payload.id);
            }
            state.usedRewards.unshift({
                name: action.payload.name,
                price: action.payload.price,
                description: action.payload.description,
                id: action.payload.id,
                icon: action.payload.icon,
                dateUsed: formattedDate
            });

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