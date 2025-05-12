import React, { useState } from 'react';
import { Box, Container, CssBaseline, ThemeProvider, createTheme, Typography, LinearProgress, Paper } from '@mui/material';
import { UserPreferencesForm } from './components/UserPreferencesForm';
import { WorkoutPlan } from './components/WorkoutPlan';
import { api } from './services/api';
import { UserPreferences, WorkoutDay } from './types';
import './App.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2196f3',
      dark: '#1976d2',
      light: '#64b5f6',
    },
    secondary: {
      main: '#f50057',
      dark: '#c51162',
      light: '#ff4081',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    }
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 500,
    },
    h6: {
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        rounded: {
          borderRadius: 8,
        },
      },
    },
  },
});

function App() {
  const [workoutPlan, setWorkoutPlan] = useState<WorkoutDay[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePreferencesSubmit = async (preferences: UserPreferences) => {
    try {
      setIsLoading(true);
      setError(null);
      const plan = await api.generateWorkoutPlan(preferences);
      setWorkoutPlan(plan);
    } catch (error) {
      console.error('Error generating workout plan:', error);
      setError('Failed to generate workout plan. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box 
        sx={{ 
          minHeight: '100vh',
          py: 4,
          background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
        }}
      >
        <Container>
          <Typography 
            variant="h3" 
            align="center" 
            gutterBottom 
            sx={{ 
              mb: 4, 
              fontWeight: 'bold',
              background: 'linear-gradient(45deg, #2196f3, #1976d2)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            FitPlanner Pro
          </Typography>
          <UserPreferencesForm onSubmit={handlePreferencesSubmit} disabled={isLoading} />
          {isLoading && (
            <Box sx={{ textAlign: 'center', mt: 4 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Creating your personalized workout plan...
              </Typography>
              <LinearProgress sx={{ maxWidth: 400, mx: 'auto' }} />
            </Box>
          )}
          {error && (
            <Paper 
              elevation={0} 
              sx={{ 
                p: 2, 
                mt: 4, 
                bgcolor: '#ffebee',
                border: '1px solid #ef5350',
                borderRadius: 2,
                maxWidth: 400,
                mx: 'auto'
              }}
            >
              <Typography color="error" align="center">
                {error}
              </Typography>
            </Paper>
          )}
          {workoutPlan && <WorkoutPlan plan={workoutPlan} />}
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
