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
    icon: string;
    quantity: number;
}

export interface Reward {
    name: string;
    price: number;
    description: string;
    id: string;
    icon: string;
}

export interface UsedRewards {
    name: string;
    price: number;
    description: string;
    id: string;
    icon: string;
    dateUsed: string;
}



export interface RewardsState {
    totalCoins: number;
    shop: Reward [];
    inventory: InventoryItem [];
    usedRewards: UsedRewards [];
}
