import React, { createContext, useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { 
  loadAndMigrateJourneyState, 
  startNewJourney, 
  selectJourneyObject, 
  commitAnswer, 
  updateJournalText, 
  completeJourneyEngine,
  generateSnapshotData
} from '../state/journeyEngine';
import { stages, objects } from '../data/storyData';

export const JourneyContext = createContext(null);

const LOCAL_STORAGE_KEY = 'wolves_journey_state';

export function JourneyProvider({ children }) {
  const [state, setState] = useState(() => loadAndMigrateJourneyState());
  const [isInitializing, setIsInitializing] = useState(true);
  const [corruptStateFound, setCorruptStateFound] = useState(false);

  // Keep a ref that always mirrors the latest state so actions can
  // read it synchronously without calling setState as a getter.
  const stateRef = useRef(state);
  useEffect(() => { stateRef.current = state; }, [state]);

  useEffect(() => {
    const corruptBackup = Object.keys(window.localStorage)
      .find(k => k.startsWith(`${LOCAL_STORAGE_KEY}_corrupt_`));
    if (corruptBackup) {
      setCorruptStateFound(true);
    }
    setIsInitializing(false);
  }, []);

  // Atomic persistence wrapper
  const dispatch = useCallback((updater) => {
    setState(prevState => {
      const nextState = typeof updater === 'function' ? updater(prevState) : updater;
      window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(nextState));
      return nextState;
    });
  }, []);

  // Actions — never read state through setState; use stateRef instead.
  const actions = useMemo(() => ({
    startNewJourney: (objectId = null) => {
      const newId = crypto.randomUUID();
      dispatch(prev => startNewJourney(prev, newId, objectId));
      return newId;
    },

    selectObject: (objectId) => {
      const current = stateRef.current;
      const activeId = current.activeJourneyId;
      if (activeId) {
        dispatch(prev => selectJourneyObject(prev, activeId, objectId));
        return activeId;
      } else {
        const newId = crypto.randomUUID();
        dispatch(prev => startNewJourney(prev, newId, objectId));
        return newId;
      }
    },

    commitStageAnswer: (journeyId, stageId, answerId) => {
      dispatch(prev => commitAnswer(prev, journeyId, stageId, answerId));
    },

    updateJournalEntry: (journeyId, stageId, text) => {
      dispatch(prev => updateJournalText(prev, journeyId, stageId, text));
    },

    completeJourney: (journeyId) => {
      const current = stateRef.current;
      const journey = current.journeys[journeyId];
      if (!journey) return null;

      if (journey.status === 'completed' && journey.resultSnapshot) {
        return journey.resultSnapshot;
      }

      const snapshot = generateSnapshotData(journey, { stages, objects });
      dispatch(prev => completeJourneyEngine(prev, journeyId, snapshot));
      return snapshot;
    },

    clearActiveJourney: () => {
      dispatch(prev => ({ ...prev, activeJourneyId: null }));
    },

    dismissCorruptionNotice: () => {
      setCorruptStateFound(false);
    }
  }), [dispatch]);

  // Derived state getters (pure reads, no side effects)
  const getActiveJourney = useCallback(() => {
    return state.activeJourneyId ? state.journeys[state.activeJourneyId] : null;
  }, [state]);

  const getJourney = useCallback((id) => {
    return state.journeys[id] || null;
  }, [state]);

  const getCompletedJourneys = useCallback(() => {
    return state.completedJourneyIds.map(id => state.journeys[id]).filter(Boolean);
  }, [state]);

  // contextValue must be computed BEFORE any early return to satisfy Rules of Hooks.
  const contextValue = useMemo(() => ({
    state,
    ...actions,
    getActiveJourney,
    getJourney,
    getCompletedJourneys,
    corruptStateFound
  }), [state, actions, getActiveJourney, getJourney, getCompletedJourneys, corruptStateFound]);

  if (isInitializing) return null;

  return (
    <JourneyContext.Provider value={contextValue}>
      {corruptStateFound && (
        <div 
          role="status"
          style={{ 
            position: 'fixed', top: 0, width: '100%', 
            background: '#841e29', color: 'white', 
            padding: '1rem', zIndex: 9999, 
            textAlign: 'center', fontSize: '0.9rem' 
          }}
        >
          We detected and safely backed up a corrupted map record on this device. A new map has been started.{' '}
          <button 
            onClick={actions.dismissCorruptionNotice} 
            style={{ 
              marginLeft: '1rem', background: 'transparent', 
              border: '1px solid white', color: 'white', 
              padding: '0.25rem 0.5rem', borderRadius: '4px', cursor: 'pointer' 
            }}
          >
            Dismiss
          </button>
        </div>
      )}
      {children}
    </JourneyContext.Provider>
  );
}
