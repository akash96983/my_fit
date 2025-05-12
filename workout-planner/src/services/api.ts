import axios from 'axios';
import { Exercise, WorkoutPlan, UserPreferences } from '../types';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

export const api = {
    getAllExercises: async (): Promise<Exercise[]> => {
        const response = await axios.get(`${API_URL}/exercises`);
        return response.data;
    },

    getExercisesByMuscle: async (muscleGroup: string): Promise<Exercise[]> => {
        const response = await axios.get(`${API_URL}/exercises/muscle/${muscleGroup}`);
        return response.data;
    },

    generateWorkoutPlan: async (preferences: UserPreferences): Promise<WorkoutPlan> => {
        const response = await axios.post(`${API_URL}/generate-plan`, preferences);
        return response.data;
    }
};
