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