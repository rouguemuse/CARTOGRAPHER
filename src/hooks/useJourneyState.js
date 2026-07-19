import { useState, useEffect } from 'react';

const STORAGE_KEY = 'wolves_journey_state';
const LEGACY_BACKUP_KEY = 'wolves_journey_legacy_backup';

const getInitialState = () => ({
  schemaVersion: 2,
  activeJourneyId: null,
  journeys: {},
  journalEntries: {},
  unlockedEndings: {}
});

function generateId() {
  return Math.random().toString(36).substring(2, 9);
}

function migrateLegacyJourneyState(savedState) {
  if (savedState && savedState.schemaVersion === 2) {
    return savedState;
  }
  localStorage.setItem(LEGACY_BACKUP_KEY, JSON.stringify(savedState));
  const newState = getInitialState();
  if (savedState && (savedState.objectSelected || savedState.currentStageId)) {
    const legacyJourneyId = generateId();
    newState.journeys[legacyJourneyId] = {
      id: legacyJourneyId,
      startedAt: new Date().toISOString(),
      completedAt: savedState.completed ? new Date().toISOString() : null,
      carriedObject: savedState.objectSelected,
      currentStage: savedState.currentStageId,
      selectedChoices: savedState.choices || {},
      routeTags: [],
      resultSnapshot: savedState.resultSnapshot || null
    };
    if (!savedState.completed) {
      newState.activeJourneyId = legacyJourneyId;
    }
    if (savedState.journalEntries) {
      newState.journalEntries[legacyJourneyId] = savedState.journalEntries;
    }
    if (savedState.completed) {
      newState.unlockedEndings['legacy-ending'] = {
        id: 'legacy-ending',
        count: 1,
        lastReachedAt: new Date().toISOString(),
        resultSnapshot: savedState.resultSnapshot || {
          routeName: "Legacy Route",
          observation: "An observation from a past journey.",
          tension: "The tension of moving forward.",
          invitation: "To continue mapping.",
          closingText: "The map expands.",
          objectInterpretation: "An object was carried.",
          timeline: []
        }
      };
    }
  }
  return newState;
}

export function useJourneyState() {
  const [state, setState] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.schemaVersion === 2) {
          return parsed;
        } else {
          return migrateLegacyJourneyState(parsed);
        }
      } catch (e) {
        console.error('Failed to parse saved journey state', e);
      }
    }
    return getInitialState();
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const startNewJourney = () => {
    const newId = generateId();
    setState(prev => ({
      ...prev,
      activeJourneyId: newId,
      journeys: {
        ...prev.journeys,
        [newId]: {
          id: newId,
          startedAt: new Date().toISOString(),
          completedAt: null,
          carriedObject: null,
          currentStage: null,
          selectedChoices: {},
          routeTags: [],
          resultSnapshot: null
        }
      }
    }));
    return newId;
  };

  const getActiveJourney = () => {
    if (!state.activeJourneyId) return null;
    return state.journeys[state.activeJourneyId];
  };

  const selectObject = (objectId) => {
    let journeyId = state.activeJourneyId;
    if (!journeyId) {
      journeyId = generateId();
    }
    setState((prev) => {
      const activeId = journeyId;
      const journey = prev.journeys[activeId] || {
        id: activeId,
        startedAt: new Date().toISOString(),
        completedAt: null,
        currentStage: null,
        selectedChoices: {},
        routeTags: [],
        resultSnapshot: null
      };
      return {
        ...prev,
        activeJourneyId: activeId,
        journeys: {
          ...prev.journeys,
          [activeId]: { ...journey, carriedObject: objectId }
        }
      };
    });
  };

  const makeChoice = (stageId, choiceId, consequence) => {
    if (!state.activeJourneyId) return;
    setState((prev) => {
      const activeId = prev.activeJourneyId;
      const journey = prev.journeys[activeId];
      return {
        ...prev,
        journeys: {
          ...prev.journeys,
          [activeId]: {
            ...journey,
            currentStage: stageId,
            selectedChoices: {
              ...journey.selectedChoices,
              [stageId]: { choiceId, consequence }
            }
          }
        }
      };
    });
  };

  const updateJournal = (journeyId, stageId, entry) => {
    setState((prev) => {
      const currentJourneyEntries = prev.journalEntries[journeyId] || {};
      return {
        ...prev,
        journalEntries: {
          ...prev.journalEntries,
          [journeyId]: {
            ...currentJourneyEntries,
            [stageId]: entry
          }
        }
      };
    });
  };

  const setCompleted = (resultSnapshot, endingId = 'unmapped-ending') => {
    if (!state.activeJourneyId) return;
    setState((prev) => {
      const activeId = prev.activeJourneyId;
      const journey = prev.journeys[activeId];
      const completedJourney = {
        ...journey,
        completedAt: new Date().toISOString(),
        resultSnapshot: resultSnapshot
      };
      const existingEnding = prev.unlockedEndings[endingId];
      const updatedEndings = { ...prev.unlockedEndings };
      if (existingEnding) {
        updatedEndings[endingId] = {
          ...existingEnding,
          count: (existingEnding.count || 1) + 1,
          lastReachedAt: new Date().toISOString()
        };
      } else {
        updatedEndings[endingId] = {
          id: endingId,
          count: 1,
          lastReachedAt: new Date().toISOString(),
          resultSnapshot: resultSnapshot
        };
      }
      return {
        ...prev,
        journeys: {
          ...prev.journeys,
          [activeId]: completedJourney
        },
        unlockedEndings: updatedEndings
      };
    });
  };

  const clearAllData = () => {
    setState(getInitialState());
    localStorage.removeItem(STORAGE_KEY);
  };

  const resumeJourney = (journeyId) => {
    setState(prev => ({
      ...prev,
      activeJourneyId: journeyId
    }));
  };

  return {
    state,
    getActiveJourney,
    startNewJourney,
    resumeJourney,
    selectObject,
    makeChoice,
    updateJournal,
    setCompleted,
    clearAllData
  };
}
