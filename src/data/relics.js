export const relics = [
  {
    id: 'red_coat',
    title: 'The Red Coat',
    name: 'The Red Coat',
    catNum: 'CAT-OBJ-001',
    image: '/media/objects/red-coat.png',
    description: 'An oversized red wool coat, heavy enough to keep out winter and hide whatever you are carrying beneath it.',
    alt: 'A worn red wool coat resting on an archive table.',
    consequence: 'You chose warmth and protection over lightness, taking on weight to stay safe.'
  },
  {
    id: 'red_string',
    title: 'The Red Thread',
    name: 'The Red Thread',
    catNum: 'CAT-OBJ-002',
    image: '/media/objects/red-thread.png',
    description: 'A length of crimson thread, frayed at the ends, used for mapping connections or tying things together so they do not get lost.',
    alt: 'A spool of red thread unwinding across a weathered map.',
    consequence: 'You chose connection over isolation, binding yourself to the trail left behind.'
  },
  {
    id: 'red_crane',
    title: 'The Red Crane',
    name: 'The Red Crane',
    catNum: 'CAT-OBJ-003',
    image: '/media/objects/red-crane.png',
    description: 'A delicate paper crane folded from red parchment, carrying a written message hidden inside its wings.',
    alt: 'A single red paper crane resting on a map.',
    consequence: 'You chose delicate hope over heavy armor, trusting fragile shapes in dangerous places.'
  },
  {
    id: 'red_envelope',
    title: 'The Red Letter',
    name: 'The Red Letter',
    catNum: 'CAT-OBJ-004',
    image: '/media/objects/red-letter.png',
    description: 'A sealed letter bound in thick red wax, containing words written after the room was already empty.',
    alt: 'A red wax-sealed letter.',
    consequence: 'You chose unsaid words over silence, carrying correspondence meant for a past self.'
  },
  {
    id: 'compass',
    title: 'The Compass',
    name: 'The Compass',
    catNum: 'CAT-OBJ-005',
    image: '/media/objects/compass.png',
    description: 'An antique brass compass that always points to the truth, even when it is inconvenient.',
    alt: 'An antique brass compass.',
    consequence: 'You sought direction over comfort, preparing for a path that may not exist.'
  },
  {
    id: 'lantern',
    title: 'The Lantern',
    name: 'The Lantern',
    catNum: 'CAT-OBJ-006',
    image: '/media/objects/lantern.png',
    description: 'An elegant antique iron lantern to cut through the fog and cast light on what is hidden.',
    alt: 'A small antique iron lantern glowing softly.',
    consequence: 'You chose light over obscurity, casting illumination ahead into unmapped territory.'
  }
];

export const getRelicById = (id) => relics.find(r => r.id === id);
