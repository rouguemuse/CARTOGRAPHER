import { useState, useEffect } from 'react';

const STORAGE_KEY = 'wolves_journey_state';

const initialState = {
  currentStageId: null,
  objectSelected: null,
  choices: {},
  journalEntries: {},
  completed: false,
};

export function useJourneyState() {
  const [state, setState] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved journey state', e);
      }
    }
    return initialState;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const selectObject = (objectId) => {
    setState((prev) => ({ ...prev, objectSelected: objectId }));
  };

  const makeChoice = (stageId, choiceId, consequence) => {
    setState((prev) => ({
      ...prev,
      choices: {
        ...prev.choices,
        [stageId]: { choiceId, consequence }
      }
    }));
  };

  const updateJournal = (stageId, entry) => {
    setState((prev) => ({
      ...prev,
      journalEntries: {
        ...prev.journalEntries,
        [stageId]: entry
      }
    }));
  };

  const setCompleted = () => {
    setState((prev) => ({ ...prev, completed: true }));
  };

  const clearJourney = () => {
    setState(initialState);
    localStorage.removeItem(STORAGE_KEY);
  };

  return {
    state,
    selectObject,
    makeChoice,
    updateJournal,
    setCompleted,
    clearJourney
  };
}
