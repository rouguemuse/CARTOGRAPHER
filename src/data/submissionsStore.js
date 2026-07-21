// UNIFIED SUBMISSIONS STORE & LOCAL BACKEND FOR CARTOGRAPHER
// Manages Dear Red letters, Wall of Things Unsaid, and General Submissions

const STORAGE_KEY = 'wolves_unified_submissions_v1';

const INITIAL_SEED_SUBMISSIONS = [
  // 1. Dear Red Letters
  {
    id: 'dr-001',
    submission_type: 'dear_red',
    title: 'The Map You Left Behind',
    body: 'Dear Red,\n\nI kept the compass you left on the kitchen table the night you decided to stop explaining yourself. For years I thought you forgot it. Only now do I realize it was the only direction you could give me without using words.\n\nI don’t look for you in the weather anymore, but when the storm rolls over the ridge, I still leave the lantern burning.',
    published_body: 'Dear Red,\n\nI kept the compass you left on the kitchen table the night you decided to stop explaining yourself. For years I thought you forgot it. Only now do I realize it was the only direction you could give me without using words.\n\nI don’t look for you in the weather anymore, but when the storm rolls over the ridge, I still leave the lantern burning.',
    alias: 'The Cartographer’s Apprentice',
    legal_name: '',
    email: 'private@example.com',
    recipient: 'To Red',
    category: '',
    consent_publication: 'May be published anonymously after editing',
    consent_editing: true,
    publication_identity: 'alias',
    status: 'published',
    moderator_notes: 'Approved for public archive reading.',
    editor_note: 'Anonymized and published with submitter permission.',
    content_warning: '',
    created_at: '2026-07-15T14:20:00Z',
    reviewed_at: '2026-07-16T10:00:00Z',
    published_at: '2026-07-17T09:00:00Z',
    public_slug: 'the-map-you-left-behind',
    reactions: { feltThis: 14, survivedThis: 9, wishISaidThis: 22 }
  },
  {
    id: 'dr-002',
    submission_type: 'dear_red',
    title: 'Borrowed Weather',
    body: 'Dear Red,\n\nI apologized for the rain for three years before realizing I hadn’t brought the clouds into the house. I was just the only one standing in the living room holding an open umbrella.',
    published_body: 'Dear Red,\n\nI apologized for the rain for three years before realizing I hadn’t brought the clouds into the house. I was just the only one standing in the living room holding an open umbrella.',
    alias: 'Anonymous',
    legal_name: '',
    email: '',
    recipient: 'To the storm',
    category: '',
    consent_publication: 'May be published anonymously after editing',
    consent_editing: true,
    publication_identity: 'anonymous',
    status: 'published',
    moderator_notes: 'Short, clean, highly resonate.',
    editor_note: '',
    content_warning: '',
    created_at: '2026-07-18T11:15:00Z',
    reviewed_at: '2026-07-19T08:30:00Z',
    published_at: '2026-07-19T12:00:00Z',
    public_slug: 'borrowed-weather',
    reactions: { feltThis: 31, survivedThis: 18, wishISaidThis: 27 }
  },

  // 2. Wall of Things Unsaid
  {
    id: 'tu-101',
    submission_type: 'things_unsaid',
    title: '',
    body: 'I kept making myself smaller so you wouldn’t have to admit how large the room had become.',
    published_body: 'I kept making myself smaller so you wouldn’t have to admit how large the room had become.',
    alias: 'A Quiet Witness',
    legal_name: '',
    email: '',
    recipient: '',
    category: 'Leaving',
    consent_publication: 'true',
    consent_editing: true,
    publication_identity: 'alias',
    status: 'published',
    moderator_notes: 'Approved.',
    editor_note: '',
    content_warning: '',
    created_at: '2026-07-20T09:00:00Z',
    reviewed_at: '2026-07-20T10:00:00Z',
    published_at: '2026-07-20T10:05:00Z',
    public_slug: 'smaller-room',
    reactions: { feltThis: 48, survivedThis: 35, wishISaidThis: 19 }
  },
  {
    id: 'tu-102',
    submission_type: 'things_unsaid',
    title: '',
    body: 'The wolves didn’t eat me. I just stayed in the clearing until I learned their dialect.',
    published_body: 'The wolves didn’t eat me. I just stayed in the clearing until I learned their dialect.',
    alias: 'Survivor',
    legal_name: '',
    email: '',
    recipient: '',
    category: 'Survival',
    consent_publication: 'true',
    consent_editing: true,
    publication_identity: 'alias',
    status: 'published',
    moderator_notes: 'Approved.',
    editor_note: '',
    content_warning: '',
    created_at: '2026-07-20T14:30:00Z',
    reviewed_at: '2026-07-20T15:00:00Z',
    published_at: '2026-07-20T15:10:00Z',
    public_slug: 'learned-their-dialect',
    reactions: { feltThis: 62, survivedThis: 54, wishISaidThis: 41 }
  },
  {
    id: 'tu-103',
    submission_type: 'things_unsaid',
    title: '',
    body: 'I forgave you on a Tuesday when the sun hit the cedar floorboards, but I never told you because you preferred the argument.',
    published_body: 'I forgave you on a Tuesday when the sun hit the cedar floorboards, but I never told you because you preferred the argument.',
    alias: 'Anonymous',
    legal_name: '',
    email: '',
    recipient: '',
    category: 'Forgiveness',
    consent_publication: 'true',
    consent_editing: true,
    publication_identity: 'anonymous',
    status: 'published',
    moderator_notes: 'Approved.',
    editor_note: '',
    content_warning: '',
    created_at: '2026-07-21T07:12:00Z',
    reviewed_at: '2026-07-21T08:00:00Z',
    published_at: '2026-07-21T08:05:00Z',
    public_slug: 'preferred-the-argument',
    reactions: { feltThis: 29, survivedThis: 16, wishISaidThis: 38 }
  }
];

export function getSubmissionsStore() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.warn('LocalStorage error in getSubmissionsStore:', e);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_SEED_SUBMISSIONS));
  return INITIAL_SEED_SUBMISSIONS;
}

export function saveSubmissionsStore(submissions) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(submissions));
  } catch (e) {
    console.error('LocalStorage save error:', e);
  }
}

export function addSubmission(submissionData) {
  const store = getSubmissionsStore();
  const slug = (submissionData.title || submissionData.alias || 'submission')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '') + '-' + Date.now().toString(36);

  const newRecord = {
    id: 'sub-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4),
    submission_type: submissionData.submission_type || 'general',
    title: submissionData.title || '',
    body: submissionData.body || '',
    published_body: submissionData.body || '',
    alias: submissionData.alias || '',
    legal_name: submissionData.legal_name || '',
    email: submissionData.email || '',
    recipient: submissionData.recipient || '',
    category: submissionData.category || '',
    consent_publication: submissionData.consent_publication || 'private',
    consent_editing: submissionData.consent_editing ?? true,
    publication_identity: submissionData.publication_identity || 'anonymous',
    status: 'new', // ALL NEW SUBMISSIONS START IN NEW QUEUE
    moderator_notes: '',
    editor_note: '',
    content_warning: submissionData.content_warning || '',
    created_at: new Date().toISOString(),
    reviewed_at: null,
    published_at: null,
    public_slug: slug,
    reactions: { feltThis: 0, survivedThis: 0, wishISaidThis: 0 }
  };

  store.unshift(newRecord);
  saveSubmissionsStore(store);
  return newRecord;
}

export function updateSubmissionStatus(id, newStatus, moderatorNotes = '', publishedBody = null, editorNote = null) {
  const store = getSubmissionsStore();
  const index = store.findIndex(item => item.id === id);
  if (index !== -1) {
    store[index].status = newStatus;
    if (moderatorNotes !== null) store[index].moderator_notes = moderatorNotes;
    if (publishedBody !== null) store[index].published_body = publishedBody;
    if (editorNote !== null) store[index].editor_note = editorNote;
    store[index].reviewed_at = new Date().toISOString();
    if (newStatus === 'published' && !store[index].published_at) {
      store[index].published_at = new Date().toISOString();
    }
    saveSubmissionsStore(store);
    return store[index];
  }
  return null;
}

export function toggleSubmissionReaction(id, reactionType) {
  const store = getSubmissionsStore();
  const item = store.find(s => s.id === id);
  if (item) {
    if (!item.reactions) item.reactions = { feltThis: 0, survivedThis: 0, wishISaidThis: 0 };
    if (reactionType in item.reactions) {
      item.reactions[reactionType] += 1;
      saveSubmissionsStore(store);
      return item.reactions;
    }
  }
  return null;
}

export function getPublishedDearRedLetters() {
  const store = getSubmissionsStore();
  return store.filter(s => s.submission_type === 'dear_red' && s.status === 'published');
}

export function getPublishedWallStatements() {
  const store = getSubmissionsStore();
  return store.filter(s => s.submission_type === 'things_unsaid' && s.status === 'published');
}

export function getDearRedBySlug(slug) {
  const store = getSubmissionsStore();
  return store.find(s => s.submission_type === 'dear_red' && s.public_slug === slug && s.status === 'published');
}

export function exportSubmissionsJSON() {
  const store = getSubmissionsStore();
  return JSON.stringify(store, null, 2);
}

export function exportSubmissionsCSV() {
  const store = getSubmissionsStore();
  if (!store.length) return '';
  const headers = ['id', 'submission_type', 'status', 'title', 'alias', 'email', 'created_at', 'body'];
  const rows = store.map(s => [
    s.id,
    s.submission_type,
    s.status,
    `"${(s.title || '').replace(/"/g, '""')}"`,
    `"${(s.alias || '').replace(/"/g, '""')}"`,
    `"${(s.email || '').replace(/"/g, '""')}"`,
    s.created_at,
    `"${(s.body || '').replace(/"/g, '""')}"`
  ].join(','));
  return [headers.join(','), ...rows].join('\n');
}
