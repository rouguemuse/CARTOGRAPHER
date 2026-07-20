import { test, expect } from '@playwright/test';

test.describe('Journey Engine Acceptance Tests (v3)', () => {
  
  test('1. Clean Installation — Object Selection renders', async ({ page }) => {
    await page.goto('/journey/carry');
    await page.evaluate(() => window.localStorage.clear());
    await page.reload();

    // Object buttons should be visible
    await expect(page.locator('button:has-text("The Red Coat")')).toBeVisible();
    await expect(page.locator('button:has-text("The Compass")')).toBeVisible();
    await expect(page.locator('button:has-text("The Lantern")')).toBeVisible();
    
    // Select an object and begin
    await page.locator('button:has-text("The Red Coat")').click();
    await page.locator('button:has-text("Begin the Journey")').click();

    // Should navigate to valley
    await expect(page).toHaveURL(/.*\/journey\/stage\/valley/);

    // State should now be persisted
    const state = await page.evaluate(() => JSON.parse(window.localStorage.getItem('wolves_journey_state')));
    expect(state).not.toBeNull();
    expect(state.version).toBe(3);
    expect(state.activeJourneyId).not.toBeNull();
    expect(Object.keys(state.journeys).length).toBe(1);
    
    const journey = state.journeys[state.activeJourneyId];
    expect(journey.carriedObject).toBe('red_coat');
    expect(journey.status).toBe('active');
  });

  test('2. Legacy Migration from applebanana_journey_state', async ({ page }) => {
    // Go to page first, clear and set legacy key
    await page.goto('/');
    await page.evaluate(() => {
      window.localStorage.clear();
      window.localStorage.setItem('applebanana_journey_state', JSON.stringify({
        object: 'red_coat',
        stage: 'forest',
        answers: {
          valley: 'c4'
        }
      }));
    });
    
    // Now navigate to /journey which will trigger controller and migration
    await page.goto('/journey');
    await page.waitForTimeout(500);
    
    const state = await page.evaluate(() => JSON.parse(window.localStorage.getItem('wolves_journey_state')));
    expect(state).not.toBeNull();
    expect(state.version).toBe(3);
    expect(state.activeJourneyId).not.toBeNull();
    
    const journey = state.journeys[state.activeJourneyId];
    expect(journey.carriedObject).toBe('red_coat');
    expect(journey.currentStage).toBe('forest');
    expect(journey.answers['valley'].answerId).toBe('c4');
    
    // Legacy key should be removed
    const legacy = await page.evaluate(() => window.localStorage.getItem('applebanana_journey_state'));
    expect(legacy).toBeNull();
  });

  test('3. Migration from v2 schema', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => {
      window.localStorage.clear();
      window.localStorage.setItem('wolves_journey_state', JSON.stringify({
        schemaVersion: 2,
        activeJourneyId: 'test-v2-123',
        unlockedEndings: {
          'the-route-of-quiet-boundaries': { firstUnlockedAt: '2023-01-01' }
        },
        journeys: {
          'test-v2-123': {
            id: 'test-v2-123',
            carriedObject: 'red_string',
            currentStage: 'bridge',
            selectedChoices: {
              'valley': { choiceId: 'c1' },
              'forest': { choiceId: 'c2' }
            }
          }
        },
        journalEntries: {
          'test-v2-123': {
            'valley': { reflection: 'Testing note from v2' }
          }
        }
      }));
    });

    await page.goto('/journey');
    await page.waitForTimeout(500);
    
    const state = await page.evaluate(() => JSON.parse(window.localStorage.getItem('wolves_journey_state')));
    expect(state).not.toBeNull();
    expect(state.version).toBe(3);
    
    const journey = state.journeys['test-v2-123'];
    expect(journey).not.toBeUndefined();
    expect(journey.carriedObject).toBe('red_string');
    expect(journey.answers['valley'].answerId).toBe('c1');
    expect(journey.answers['forest'].answerId).toBe('c2');
    expect(journey.journalEntries['valley'].text).toBe('Testing note from v2');
  });

  test('4. Corrupted state recovery', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => {
      window.localStorage.clear();
      window.localStorage.setItem('wolves_journey_state', '{ broken json %%%');
    });

    await page.goto('/journey/carry');
    
    // The corruption banner should be visible
    await expect(page.getByText('safely backed up a corrupted map')).toBeVisible({ timeout: 5000 });
    
    // Backup key should exist
    const backupKeys = await page.evaluate(() => 
      Object.keys(window.localStorage).filter(k => k.startsWith('wolves_journey_state_corrupt_'))
    );
    expect(backupKeys.length).toBe(1);
  });

  test('5. Full Journey Traversal', async ({ page }) => {
    await page.goto('/journey/carry');
    await page.evaluate(() => window.localStorage.clear());
    await page.reload();
    
    // Select object
    await page.locator('button:has-text("The Red Coat")').click();
    await page.locator('button:has-text("Begin the Journey")').click();

    // Valley stage
    await expect(page).toHaveURL(/.*\/journey\/stage\/valley/);
    const valleyChoices = page.locator('label.choice-label');
    await valleyChoices.first().click();
    await page.locator('button:has-text("Continue Journey")').click();

    // Forest stage
    await expect(page).toHaveURL(/.*\/journey\/stage\/forest/);
    const forestChoices = page.locator('label.choice-label');
    await forestChoices.first().click();
    await page.locator('button:has-text("Continue Journey")').click();

    // Verify mid-flight state
    const midState = await page.evaluate(() => JSON.parse(window.localStorage.getItem('wolves_journey_state')));
    const id = midState.activeJourneyId;
    expect(midState.journeys[id].answers['valley']).toBeDefined();
    expect(midState.journeys[id].answers['forest']).toBeDefined();
  });

  test('6. Object change with progress shows dialog', async ({ page }) => {
    await page.goto('/journey/carry');
    await page.evaluate(() => window.localStorage.clear());
    await page.reload();
    
    // Start with Red Thread
    await page.locator('button:has-text("The Red Thread")').click();
    await page.locator('button:has-text("Begin the Journey")').click();

    await expect(page).toHaveURL(/.*\/journey\/stage\/valley/);
    
    // Make a choice
    const choices = page.locator('label.choice-label');
    await choices.first().click();
    await page.locator('button:has-text("Continue Journey")').click();

    // Go back to carry and pick a different object
    await page.goto('/journey/carry');
    await page.locator('button:has-text("The Red Letter")').click();
    await page.locator('button:has-text("Begin the Journey")').click();
    
    // Confirmation dialog should appear
    const dialog = page.locator('dialog.confirmation-dialog');
    await expect(dialog).toBeVisible({ timeout: 5000 });
    
    // Confirm abandonment
    await page.locator('button:has-text("Discard this route and begin again")').click();
    
    // Should navigate to valley with new object
    await expect(page).toHaveURL(/.*\/journey\/stage\/valley/);
    
    const state = await page.evaluate(() => JSON.parse(window.localStorage.getItem('wolves_journey_state')));
    const newId = state.activeJourneyId;
    expect(state.journeys[newId].carriedObject).toBe('red_envelope');
  });

  test('7. Route Guards Prevent Skipping', async ({ page }) => {
    await page.goto('/journey/carry');
    await page.evaluate(() => window.localStorage.clear());
    await page.reload();
    
    await page.locator('button:has-text("The Red Coat")').click();
    await page.locator('button:has-text("Begin the Journey")').click();

    await expect(page).toHaveURL(/.*\/journey\/stage\/valley/);
    
    // Try to skip ahead to wolves
    await page.goto('/journey/stage/wolves');
    
    // Should be redirected back to valley
    await expect(page).toHaveURL(/.*\/journey\/stage\/valley/);
  });
});
