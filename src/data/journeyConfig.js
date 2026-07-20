import { stages, objects } from './storyData';

export const JOURNEY_SCHEMA_VERSION = 3;

// Derive configuration from the existing storyData
export const orderedStageIds = stages.map(s => s.id);
export const validObjectIds = objects.map(o => o.id);

export const journeyConfig = {
  version: JOURNEY_SCHEMA_VERSION,
  firstStageId: orderedStageIds[0],
  finalStageId: orderedStageIds[orderedStageIds.length - 1],
  stages: orderedStageIds,
  objects: validObjectIds,
  
  // Helpers
  getNextStageId: (currentStageId) => {
    const currentIndex = orderedStageIds.indexOf(currentStageId);
    if (currentIndex === -1 || currentIndex === orderedStageIds.length - 1) return null;
    return orderedStageIds[currentIndex + 1];
  },
  
  getStageIndex: (stageId) => orderedStageIds.indexOf(stageId),

  isValidStageId: (id) => orderedStageIds.includes(id),
  isValidObjectId: (id) => validObjectIds.includes(id),
  
  getObjectName: (id) => {
    const obj = objects.find(o => o.id === id);
    return obj ? obj.name : 'Unknown Object';
  },

  getStageTitle: (id) => {
    const stage = stages.find(s => s.id === id);
    return stage ? stage.title : `Stage ${id}`;
  }
};
