import { describe, it, expect } from 'vitest';
import { getByPath, setByPath, validateReflections } from '../types/cartographySchema.js';

describe('Cartography Schema & Path Mutation Safety', () => {

  it('should safely retrieve values along deep paths using getByPath', () => {
    const state = {
      reflections: {
        maps_given: {
          l1: 'In my first home...',
          depthMode: 'lantern'
        }
      }
    };

    expect(getByPath(state, 'reflections.maps_given.l1')).toBe('In my first home...');
    expect(getByPath(state, 'reflections.maps_given.depthMode')).toBe('lantern');
    expect(getByPath(state, 'reflections.non_existent.key', 'default')).toBe('default');
  });

  it('should immutably update values along deep paths using setByPath without mutating original object', () => {
    const initialState = {
      user: {
        profile: {
          name: 'Jayme'
        }
      }
    };

    const newState = setByPath(initialState, 'user.profile.name', 'Jayme Volstad');

    expect(newState.user.profile.name).toBe('Jayme Volstad');
    expect(initialState.user.profile.name).toBe('Jayme'); // Immutability check
  });

  it('should validate reflection payload objects', () => {
    const validPayload = {
      maps_given: { l1: 'test', depthMode: 'lantern' },
      code_of_lines: { l1: 'boundary' }
    };

    const result = validateReflections(validPayload);
    expect(result.valid).toBe(true);
    expect(result.errors.length).toBe(0);
  });
});
