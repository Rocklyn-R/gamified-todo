export interface Task {
    name: string;
    notes: string;
    coinReward: number;
    id: string;
}

export interface TasksState {
    tasks: Task[];
    completedTasks: Task[];
}

export interface InventoryItem {
    name: string;
    price: number;
    description: string;
    id: string;
    quantity: number;
}

export interface Reward {
    name: string;
    price: number;
    description: string;
    id: string;
}



export interface RewardsState {
    totalCoins: number;
    shop: Reward [];
    inventory: Reward [];
    usedRewards: Reward [];
}
