import React from 'react';
import {
    Box,
    Paper,
    Typography,
    List,
    ListItem,
    ListItemText,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Chip,
    Divider,
    Container,
    Fade
} from '@mui/material';
import {
    ExpandMore as ExpandMoreIcon,
    FitnessCenter,
    Timer,
    Repeat,
    SportsMartialArts
} from '@mui/icons-material';
import { WorkoutDay } from '../types';

interface Props {
    plan: WorkoutDay[];
}

export const WorkoutPlan: React.FC<Props> = ({ plan }) => {    const getExerciseIcon = (type: string) => {
        switch (type) {
            case 'warmup':
                return <Timer fontSize="small" color="info" />;
            case 'main':
                return <FitnessCenter fontSize="small" color="primary" />;
            case 'core':
                return <SportsMartialArts fontSize="small" color="secondary" />;
            case 'cooldown':
                return <Repeat fontSize="small" color="success" />;
            default:
                return <FitnessCenter fontSize="small" />;
        }
    };

    const getExerciseTypeColor = (type: string) => {
        switch (type) {
            case 'warmup':
                return 'info';
            case 'main':
                return 'primary';
            case 'core':
                return 'secondary';
            case 'cooldown':
                return 'success';
            default:
                return 'default';
        }
    };

    return (
        <Container maxWidth="md">
            <Fade in timeout={1000}>
                <Box sx={{ mt: 4, mb: 4 }}>
                    <Typography variant="h4" gutterBottom textAlign="center" sx={{ fontWeight: 'bold', mb: 3 }}>
                        Your Personalized Workout Plan
                    </Typography>
                    
                    {plan.map((day) => (
                        <Accordion 
                            key={day.day} 
                            sx={{ 
                                mb: 2,
                                '&:before': {
                                    display: 'none',
                                },
                                boxShadow: 2,
                                borderRadius: '8px !important',
                                overflow: 'hidden'
                            }}
                        >
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                sx={{
                                    background: (theme) => 
                                        `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                                    color: 'white',
                                }}
                            >
                                <Typography variant="h6">Day {day.day}</Typography>
                            </AccordionSummary>
                            <AccordionDetails sx={{ p: 0 }}>
                                <List disablePadding>
                                    {day.exercises.map((exercise, index) => (
                                        <React.Fragment key={index}>
                                            {index > 0 && <Divider />}
                                            <ListItem
                                                sx={{
                                                    py: 2,
                                                    '&:hover': {
                                                        backgroundColor: 'action.hover',
                                                    },
                                                }}
                                            >
                                                <Box sx={{ mr: 2 }}>
                                                    {getExerciseIcon(exercise.type)}
                                                </Box>
                                                <ListItemText
                                                    primary={
                                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                            <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>
                                                                {exercise.name}
                                                            </Typography>
                                                            <Chip
                                                                label={exercise.type}
                                                                size="small"
                                                                color={getExerciseTypeColor(exercise.type) as any}
                                                                sx={{ ml: 1 }}
                                                            />
                                                        </Box>
                                                    }
                                                    secondary={
                                                        <Box sx={{ mt: 0.5 }}>
                                                            <Typography variant="body2" color="text.secondary">
                                                                {exercise.sets} sets × {exercise.reps}
                                                                {exercise.equipment !== 'none' && 
                                                                    ` • Equipment: ${exercise.equipment}`}
                                                            </Typography>
                                                        </Box>
                                                    }
                                                />
                                            </ListItem>
                                        </React.Fragment>
                                    ))}
                                </List>
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </Box>
            </Fade>
        </Container>
    );
};
