import { journeyConfig, JOURNEY_SCHEMA_VERSION } from '../data/journeyConfig';

const LOCAL_STORAGE_KEY = 'wolves_journey_state';
const LEGACY_STORAGE_KEY = 'applebanana_journey_state';

// 1. Initial State Creation
export function createInitialState() {
  return {
    version: JOURNEY_SCHEMA_VERSION,
    activeJourneyId: null,
    journeys: {},
    completedJourneyIds: [],
    unlockedEndings: {}
  };
}

export function createJourney(id, objectId) {
  const now = new Date().toISOString();
  return {
    id,
    status: 'active',
    carriedObject: objectId || null,
    currentStage: journeyConfig.firstStageId,
    answers: {},
    journalEntries: {},
    startedAt: now,
    updatedAt: now,
    completedAt: null,
    resultSnapshot: null
  };
}

// 2. Migration Pipeline
export function loadAndMigrateJourneyState() {
  if (typeof window === 'undefined') return createInitialState();

  try {
    const rawState = window.localStorage.getItem(LOCAL_STORAGE_KEY);
    if (rawState) {
      const parsed = JSON.parse(rawState);
      
      // If already v3, return it
      if (parsed.version === JOURNEY_SCHEMA_VERSION) {
        return parsed;
      }

      // If it's v2 or earlier under wolves_journey_state, migrate to v3
      const migrated = migrateV2ToV3(parsed);
      window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(migrated));
      return migrated;
    }

    // No wolves_journey_state, check applebanana_journey_state
    const legacyRaw = window.localStorage.getItem(LEGACY_STORAGE_KEY);
    if (legacyRaw) {
      const parsedLegacy = JSON.parse(legacyRaw);
      const migratedLegacy = migrateAppleBananaToV3(parsedLegacy);
      window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(migratedLegacy));
      window.localStorage.removeItem(LEGACY_STORAGE_KEY);
      return migratedLegacy;
    }
  } catch (error) {
    console.error('Failed to parse or migrate journey state, initializing clean state.', error);
    // Backup corrupt JSON
    const rawState = window.localStorage.getItem(LOCAL_STORAGE_KEY);
    if (rawState) {
      window.localStorage.setItem(`${LOCAL_STORAGE_KEY}_corrupt_${Date.now()}`, rawState);
    }
    // Will return initial state below
  }

  return createInitialState();
}

function migrateV2ToV3(v2State) {
  const v3State = createInitialState();
  if (!v2State || typeof v2State !== 'object') return v3State;

  // Preserve unlocked endings
  if (Array.isArray(v2State.unlockedEndings)) {
    // Array format -> Object format
    v2State.unlockedEndings.forEach(endingId => {
      v3State.unlockedEndings[endingId] = {
        endingId,
        firstUnlockedAt: new Date().toISOString(),
        latestUnlockedAt: new Date().toISOString(),
        journeyIds: [] // We might not know which journeys unlocked this in v1/v2
      };
    });
  } else if (typeof v2State.unlockedEndings === 'object' && v2State.unlockedEndings !== null) {
    // Object format (v2 late stage) -> v3 shape
    Object.entries(v2State.unlockedEndings).forEach(([endingId, data]) => {
      v3State.unlockedEndings[endingId] = {
        endingId,
        firstUnlockedAt: data.firstUnlockedAt || new Date().toISOString(),
        latestUnlockedAt: data.latestUnlockedAt || new Date().toISOString(),
        journeyIds: Array.isArray(data.journeyIds) ? data.journeyIds : []
      };
    });
  }

  // Migrate journeys
  if (v2State.journeys && typeof v2State.journeys === 'object') {
    Object.entries(v2State.journeys).forEach(([journeyId, v2Journey]) => {
      // Validate object ID
      const objectId = journeyConfig.isValidObjectId(v2Journey.carriedObject) ? v2Journey.carriedObject : null;
      
      const v3Journey = {
        id: journeyId,
        status: v2Journey.completedAt ? 'completed' : 'active',
        carriedObject: objectId,
        currentStage: journeyConfig.isValidStageId(v2Journey.currentStage) ? v2Journey.currentStage : journeyConfig.firstStageId,
        answers: {},
        journalEntries: {},
        startedAt: v2Journey.startedAt || new Date().toISOString(),
        updatedAt: v2Journey.updatedAt || new Date().toISOString(),
        completedAt: v2Journey.completedAt || null,
        resultSnapshot: v2Journey.resultSnapshot || null
      };

      // Port selectedChoices -> answers
      if (v2Journey.selectedChoices) {
        Object.entries(v2Journey.selectedChoices).forEach(([stageId, choiceData]) => {
          if (journeyConfig.isValidStageId(stageId)) {
            v3Journey.answers[stageId] = {
              answerId: choiceData.choiceId,
              committedAt: new Date().toISOString()
            };
          }
        });
      }

      // Port journalEntries from root to this journey
      if (v2State.journalEntries && v2State.journalEntries[journeyId]) {
        Object.entries(v2State.journalEntries[journeyId]).forEach(([stageId, entryData]) => {
          if (journeyConfig.isValidStageId(stageId)) {
            v3Journey.journalEntries[stageId] = {
              stageId,
              answerId: entryData.choiceId || (v3Journey.answers[stageId]?.answerId),
              text: entryData.reflection || '',
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString()
            };
          }
        });
      }

      v3State.journeys[journeyId] = v3Journey;
      if (v3Journey.status === 'completed') {
        v3State.completedJourneyIds.push(journeyId);
      }
    });
  }

  v3State.activeJourneyId = v2State.activeJourneyId || null;
  // Make sure active journey exists
  if (v3State.activeJourneyId && !v3State.journeys[v3State.activeJourneyId]) {
    v3State.activeJourneyId = null;
  }

  // Remove duplicates from completedJourneyIds
  v3State.completedJourneyIds = [...new Set(v3State.completedJourneyIds)];

  return v3State;
}

function migrateAppleBananaToV3(legacyState) {
  const v3State = createInitialState();
  if (!legacyState || typeof legacyState !== 'object') return v3State;

  const objectId = legacyState.object || null;
  const stageId = legacyState.stage || journeyConfig.firstStageId;

  // We only migrate if there's an object or stage
  if (objectId || stageId) {
    const journeyId = crypto.randomUUID();
    const journey = createJourney(journeyId, journeyConfig.isValidObjectId(objectId) ? objectId : null);
    
    // Convert old answers
    const answers = legacyState.answers || {};
    Object.entries(answers).forEach(([sId, choiceId]) => {
      if (journeyConfig.isValidStageId(sId)) {
        journey.answers[sId] = {
          answerId: choiceId,
          committedAt: new Date().toISOString()
        };
      }
    });

    journey.currentStage = journeyConfig.isValidStageId(stageId) ? stageId : journeyConfig.firstStageId;
    
    // If it reached result
    if (stageId === 'result') {
      journey.status = 'completed';
      journey.completedAt = new Date().toISOString();
      v3State.completedJourneyIds.push(journeyId);
    } else {
      v3State.activeJourneyId = journeyId;
    }
    
    v3State.journeys[journeyId] = journey;
  }

  return v3State;
}

// 3. Engine Operations (Pure state transformers)

export function startNewJourney(state, journeyId, objectId) {
  // If there's an active journey, it gets abandoned (overwritten)
  const newState = { ...state };
  const journey = createJourney(journeyId, objectId);
  newState.journeys = { ...newState.journeys, [journeyId]: journey };
  newState.activeJourneyId = journeyId;
  return newState;
}

export function selectJourneyObject(state, journeyId, objectId) {
  const newState = { ...state };
  const journey = newState.journeys[journeyId];
  if (!journey) return newState;

  newState.journeys = {
    ...newState.journeys,
    [journeyId]: {
      ...journey,
      carriedObject: objectId,
      updatedAt: new Date().toISOString()
    }
  };
  return newState;
}

export function commitAnswer(state, journeyId, stageId, answerId) {
  const newState = { ...state };
  const journey = newState.journeys[journeyId];
  if (!journey || journey.status === 'completed') return newState;

  // Invalidate any answers after this stage
  const updatedJourney = invalidateProgressAfterStage(journey, stageId);

  // Commit the new answer
  updatedJourney.answers = {
    ...updatedJourney.answers,
    [stageId]: {
      answerId,
      committedAt: new Date().toISOString()
    }
  };

  updatedJourney.currentStage = journeyConfig.getNextStageId(stageId) || stageId;
  updatedJourney.updatedAt = new Date().toISOString();

  newState.journeys = {
    ...newState.journeys,
    [journeyId]: updatedJourney
  };

  return newState;
}

export function updateJournalText(state, journeyId, stageId, text) {
  const newState = { ...state };
  const journey = newState.journeys[journeyId];
  if (!journey) return newState;

  const now = new Date().toISOString();
  const existingEntry = journey.journalEntries[stageId] || { 
    stageId, 
    answerId: journey.answers[stageId]?.answerId, 
    createdAt: now 
  };

  newState.journeys = {
    ...newState.journeys,
    [journeyId]: {
      ...journey,
      journalEntries: {
        ...journey.journalEntries,
        [stageId]: {
          ...existingEntry,
          text,
          updatedAt: now
        }
      },
      updatedAt: now
    }
  };

  return newState;
}

function invalidateProgressAfterStage(journey, stageId) {
  const stageIndex = journeyConfig.getStageIndex(stageId);
  if (stageIndex === -1) return journey;

  const laterStageIds = journeyConfig.stages.slice(stageIndex + 1);
  const newAnswers = { ...journey.answers };
  const newJournalEntries = { ...journey.journalEntries };

  laterStageIds.forEach(id => {
    delete newAnswers[id];
    delete newJournalEntries[id];
  });

  return {
    ...journey,
    answers: newAnswers,
    journalEntries: newJournalEntries
  };
}

export function completeJourneyEngine(state, journeyId, snapshot) {
  const newState = { ...state };
  const journey = newState.journeys[journeyId];
  if (!journey || journey.status === 'completed') return newState;

  const now = new Date().toISOString();
  
  // 1. Mark journey as completed
  const completedJourney = {
    ...journey,
    status: 'completed',
    completedAt: now,
    updatedAt: now,
    resultSnapshot: snapshot
  };
  newState.journeys = {
    ...newState.journeys,
    [journeyId]: completedJourney
  };

  // 2. Add to completed IDs
  if (!newState.completedJourneyIds.includes(journeyId)) {
    newState.completedJourneyIds = [...newState.completedJourneyIds, journeyId];
  }

  // 3. Unlock Ending
  const endingId = snapshot.routeName.toLowerCase().replace(/\s+/g, '-');
  const existingEnding = newState.unlockedEndings[endingId];
  
  newState.unlockedEndings = {
    ...newState.unlockedEndings,
    [endingId]: {
      endingId,
      firstUnlockedAt: existingEnding ? existingEnding.firstUnlockedAt : now,
      latestUnlockedAt: now,
      journeyIds: existingEnding ? [...new Set([...existingEnding.journeyIds, journeyId])] : [journeyId]
    }
  };

  // 4. Clear active journey
  if (newState.activeJourneyId === journeyId) {
    newState.activeJourneyId = null;
  }

  return newState;
}

export function generateSnapshotData(journey, storyData) {
  // Pure function to generate a snapshot (decoupled from time/randomness inside state)
  const choices = journey.answers || {};
  const carried = storyData.objects.find(o => o.id === journey.carriedObject) || { name: 'Unknown', consequence: 'Nothing carried.' };

  let observation = "This route wandered through uncertain territory.";
  let routeName = "The Unnamed Route";
  let tension = "The tension between staying and leaving.";
  let invitation = "An invitation to rest.";
  let closingText = "The map expands, but the territory remains untamed.";

  if (choices['valley']?.answerId === 'c4' || choices['valley']?.answerId === 'c3') {
    observation = "This route repeatedly returned to the realization that not every observer deserves an explanation.";
    routeName = "The Route of Quiet Boundaries";
    tension = "The tension between the desire to be known and the safety of remaining illegible.";
    invitation = "An invitation to let misunderstandings exist without rushing to correct them.";
  } else if (choices['carnival']?.answerId === 'c4') {
    observation = "This route revealed a deep exhaustion with the performance of self-justification.";
    routeName = "The Route of the Dropped Mask";
    tension = "The tension of disappointing others to save yourself.";
    invitation = "An invitation to exist without an audience.";
  } else {
    observation = "This route was marked by a persistent attempt to translate the self into a language the weather will understand.";
    routeName = "The Route of Endless Translation";
    tension = "The tension of hoping the right words will finally bridge the gap.";
    invitation = "An invitation to ask whether the gap is yours to close.";
  }

  const timeline = Object.entries(choices).map(([stageId, data]) => {
    const stage = storyData.stages.find(s => s.id === stageId);
    const choiceText = stage?.choices.find(c => c.id === data.answerId)?.consequence || "Unknown path";
    return {
      stageId,
      label: `Passed through ${stage ? stage.title : stageId}`,
      consequence: choiceText
    };
  });

  return {
    routeName,
    observation,
    tension,
    invitation,
    closingText,
    objectInterpretation: carried.consequence,
    timeline
  };
}
