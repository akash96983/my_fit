export interface Exercise {
    name: string;
    muscle_group: string;
    equipment: string;
    type: string;
    level: string;
    sets: number;
    reps: string;
}

export interface WorkoutDay {
    day: number;
    exercises: Exercise[];
}

export type WorkoutPlan = WorkoutDay[];

export interface UserPreferences {
    level: 'beginner' | 'intermediate';
    days: number;
    goals: string[];
}
