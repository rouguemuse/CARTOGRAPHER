import { useContext } from 'react';
import { JourneyContext } from '../context/JourneyProvider';

export function useJourneyState() {
  const context = useContext(JourneyContext);
  if (!context) {
    throw new Error('useJourneyState must be used within a JourneyProvider');
  }
  return context;
}
