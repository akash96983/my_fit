import React, { useState } from 'react';
import {
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
    Paper,
    Chip,
    Stack,
    Container,
    Fade,
    LinearProgress
} from '@mui/material';
import { 
    FitnessCenter, 
    Schedule, 
    Flag,
    DirectionsRun
} from '@mui/icons-material';
import { UserPreferences } from '../types';

interface Props {
    onSubmit: (preferences: UserPreferences) => void;
    disabled?: boolean;
}

const commonGoals = [
    'Build Muscle',
    'Lose Weight',
    'Improve Strength',
    'Increase Flexibility',
    'Better Endurance'
];

export const UserPreferencesForm: React.FC<Props> = ({ onSubmit, disabled = false }) => {
    const [preferences, setPreferences] = useState<UserPreferences>({
        level: 'beginner',
        days: 3,
        goals: []
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(preferences);
    };    return (
        <Container maxWidth="sm">
            <Fade in timeout={1000}>
                <Paper 
                    elevation={6} 
                    sx={{ 
                        p: 4, 
                        mt: 4,
                        borderRadius: 2,
                        background: 'linear-gradient(to right bottom, #ffffff, #f8f9fa)'
                    }}
                >
                    <Box sx={{ mb: 4, textAlign: 'center' }}>
                        <FitnessCenter sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
                        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
                            Workout Planner
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Create your personalized workout plan in seconds
                        </Typography>
                    </Box>

                    <Box component="form" onSubmit={handleSubmit}>
                        <FormControl fullWidth sx={{ mb: 3 }}>
                            <InputLabel>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <DirectionsRun fontSize="small" />
                                    Fitness Level
                                </Box>
                            </InputLabel>
                            <Select
                                value={preferences.level}
                                label={
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <DirectionsRun fontSize="small" />
                                        Fitness Level
                                    </Box>
                                }
                                onChange={(e) => setPreferences({
                                    ...preferences,
                                    level: e.target.value as 'beginner' | 'intermediate'
                                })}
                                sx={{ '& .MuiSelect-select': { display: 'flex', alignItems: 'center', gap: 1 } }}
                            >
                                <MenuItem value="beginner">🌱 Beginner</MenuItem>
                                <MenuItem value="intermediate">💪 Intermediate</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl fullWidth sx={{ mb: 3 }}>
                            <InputLabel>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Schedule fontSize="small" />
                                    Workout Days per Week
                                </Box>
                            </InputLabel>
                            <Select
                                value={preferences.days}
                                label={
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Schedule fontSize="small" />
                                        Workout Days per Week
                                    </Box>
                                }
                                onChange={(e) => setPreferences({
                                    ...preferences,
                                    days: Number(e.target.value)
                                })}
                            >
                                <MenuItem value={3}>3 Days - Beginner Friendly</MenuItem>
                                <MenuItem value={4}>4 Days - Balanced</MenuItem>
                                <MenuItem value={5}>5 Days - Advanced</MenuItem>
                            </Select>
                        </FormControl>

                        <Box sx={{ mb: 3 }}>
                            <Typography variant="subtitle1" sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Flag fontSize="small" />
                                Fitness Goals
                            </Typography>
                            <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 2 }}>
                                {commonGoals.map((goal) => (
                                    <Chip
                                        key={goal}
                                        label={goal}
                                        onClick={() => {
                                            const currentGoals = new Set(preferences.goals);
                                            if (currentGoals.has(goal)) {
                                                currentGoals.delete(goal);
                                            } else {
                                                currentGoals.add(goal);
                                            }
                                            setPreferences({
                                                ...preferences,
                                                goals: Array.from(currentGoals)
                                            });
                                        }}
                                        color={preferences.goals.includes(goal) ? "primary" : "default"}
                                        sx={{ m: 0.5 }}
                                    />
                                ))}
                            </Stack>
                            <TextField
                                fullWidth
                                label="Custom Goals"
                                placeholder="Enter your own goals, separated by commas"
                                size="small"                                onChange={(e) => {
                                    const customGoals = e.target.value.split(',')
                                        .map(g => g.trim())
                                        .filter(g => g && !preferences.goals.includes(g));
                                    setPreferences({
                                        ...preferences,
                                        goals: [...preferences.goals, ...customGoals]
                                    });
                                }}
                            />
                        </Box>

                        {disabled && (
                            <Box sx={{ width: '100%', mb: 2 }}>
                                <LinearProgress />
                            </Box>
                        )}

                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            disabled={disabled}
                            size="large"
                            sx={{ 
                                py: 1.5,
                                textTransform: 'none',
                                fontSize: '1.1rem',
                                fontWeight: 'bold',
                                borderRadius: 2
                            }}
                        >
                            {disabled ? 'Creating Your Perfect Workout Plan...' : 'Generate My Workout Plan'}
                        </Button>
                    </Box>
                </Paper>
            </Fade>
        </Container>
    );
};
