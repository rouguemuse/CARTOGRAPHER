export const objects = [
  {
    id: 'red_coat',
    name: 'The Red Coat',
    image: '/images/the_red_coat_new.jpg',
    description: 'It is warm, visible, and heavy with things you once believed you had to carry.',
    consequence: 'The coat makes you easy to find, but it also means you carry the weight of every storm you have survived.'
  },
  {
    id: 'folded_map',
    name: 'The Folded Map',
    image: '/images/the_folded_map_new.jpg',
    description: 'It contains several roads, including some drawn by people who never traveled them.',
    consequence: 'You will always know where others expected you to go, even if you never arrive there.'
  },
  {
    id: 'lantern',
    name: 'The Lantern',
    image: '/images/the_lantern_new.jpg',
    description: 'It can reveal a path, but it cannot decide whether the path belongs to you.',
    consequence: 'Light is not the same as direction. It only shows you the immediate stones at your feet.'
  },
  {
    id: 'compass',
    name: 'The Compass',
    image: '/images/the_compass_new.jpg',
    description: 'It points steadily even when the surrounding country insists north has moved.',
    consequence: 'You have a private truth that will often disagree with the prevailing weather.'
  },
  {
    id: 'stone',
    name: 'The Stone',
    image: '/images/the_stone_new.jpg',
    description: 'It is small enough for a pocket and heavy enough to remember.',
    consequence: 'It is a reminder of gravity, useful for when you are tempted to float away into someone else’s logic.'
  },
  {
    id: 'bucket',
    name: 'The Bucket',
    image: '/images/the_bucket_new.jpg',
    description: 'You have carried it beneath other people’s leaking weather for so long that it feels like a hand.',
    consequence: 'You are prepared to catch sorrow, though you must eventually ask why the roof was never repaired.'
  }
];

export const stages = [
  {
    id: 'valley',
    title: 'The Valley of Please Understand Me',
    routeProgress: 20,
    narrative: 'You enter a low, wide place where the fog clings to the ground like a plea. This is the Valley of Please Understand Me. The air here is thick with the exhausting hope that the right explanation might finally make you safe. You have brought your reasons, carefully rehearsed, hoping they will serve as currency.',
    question: 'When the shadows demand an account of how you arrived here, what do you offer?',
    choices: [
      {
        id: 'c1',
        text: 'I begin telling the story from the beginning, hoping context will make me safe.',
        consequence: 'You exhaust yourself explaining. The valley listens, but understanding is never granted, only perpetually delayed.'
      },
      {
        id: 'c2',
        text: 'I lower my eyes and offer softness before they can demand it.',
        consequence: 'Your preemptive surrender buys temporary peace, but the valley now expects you to remain small.'
      },
      {
        id: 'c3',
        text: 'I hold their gaze and let my intention arrive without explanation.',
        consequence: 'The silence is uncomfortable, but you realize that being observed is not the same as being known.'
      },
      {
        id: 'c4',
        text: 'I step back far enough to realize the shadows are casting no light of their own.',
        consequence: 'You stop translating yourself. The valley loses its grip when you stop needing its permission.'
      }
    ]
  },
  {
    id: 'forest',
    title: 'The Forest of Other People’s Weather',
    routeProgress: 40,
    narrative: 'The trees grow dense, and the sky changes abruptly. One moment it is calm; the next, a sudden, inexplicable storm arrives. This weather does not belong to you, yet it falls on your shoulders as if you summoned it.',
    question: 'When the forest begins answering in someone else’s weather, what do you do?',
    choices: [
      {
        id: 'c1',
        text: 'I study every change in the air until I can predict what it wants.',
        consequence: 'You become an expert in storms that aren’t yours, constantly adjusting your posture to avoid lightning.'
      },
      {
        id: 'c2',
        text: 'I explain that the storm did not begin with me.',
        consequence: 'The weather does not listen to logic. Arguing with rain only ensures you get wet while talking.'
      },
      {
        id: 'c3',
        text: 'I make myself smaller and wait for the sky to settle.',
        consequence: 'You survive the downpour, but you spend your life waiting for permission to stand up.'
      },
      {
        id: 'c4',
        text: 'I check whether the rain is actually falling on my side of the path.',
        consequence: 'You discover that you can simply step out of the micro-climate. The storm continues, but you are no longer in it.'
      },
      {
        id: 'c5',
        text: 'I keep walking, even without permission from the weather.',
        consequence: 'You are soaked, but you cover ground. You learn that weather is a condition, not a boundary.'
      }
    ]
  },
  {
    id: 'house',
    title: 'The House of Almost Safe',
    routeProgress: 60,
    narrative: 'You arrive at a structure that looks like a sanctuary. It has walls, a roof, and a locked door. But there is a draft, and the locks are arranged so that you are kept in rather than danger being kept out. This is where you rested when stopping felt like dying with better intentions.',
    question: 'How do you occupy a space that protects you while slowly consuming you?',
    choices: [
      {
        id: 'c1',
        text: 'I fortify the walls and try not to look out the window.',
        consequence: 'You trade freedom for an illusion of security. The house remains standing, but it is very quiet.'
      },
      {
        id: 'c2',
        text: 'I sleep near the door, ready to leave if the foundation shifts.',
        consequence: 'You are never fully rested, living in a state of permanent preparation for a collapse.'
      },
      {
        id: 'c3',
        text: 'I invite the wolves inside, hoping familiarity will domesticate them.',
        consequence: 'Danger enters wearing the face of something you love. The house becomes a cage.'
      },
      {
        id: 'c4',
        text: 'I leave the door open and accept that safety is not a location.',
        consequence: 'The draft is cold, but the air is finally yours. You realize a house is not a home if you cannot leave it.'
      }
    ]
  },
  {
    id: 'bridge',
    title: 'The Bridge of If Only I Were Easier',
    routeProgress: 80,
    narrative: 'A narrow crossing over a deep gorge. The bridge sways with every step. There is a toll collector who does not ask for coins, but for pieces of your complexity. They promise the crossing will be steady if you are just a little less difficult to carry.',
    question: 'When asked to reduce yourself for a safer passage, how do you cross?',
    choices: [
      {
        id: 'c1',
        text: 'I hand over my sharp edges and walk across smoothly.',
        consequence: 'You cross without incident, but when you reach the other side, you find you cannot defend yourself.'
      },
      {
        id: 'c2',
        text: 'I try to sneak across while carrying all my heavy truths.',
        consequence: 'The bridge groans. You make it, but the crossing is agonizing and filled with the fear of being caught.'
      },
      {
        id: 'c3',
        text: 'I refuse the toll and look for another way down into the gorge.',
        consequence: 'The descent is treacherous and lonely, but every step belongs entirely to you.'
      },
      {
        id: 'c4',
        text: 'I pay the toll with a counterfeit version of myself.',
        consequence: 'You keep your complexity, but you must remember which version of you was left behind.'
      }
    ]
  },
  {
    id: 'carnival',
    title: 'The Carnival',
    routeProgress: 100,
    narrative: 'The end of the map. The Carnival is loud, chaotic, and filled with mirrors that distort your reflection. Here, people are trading their histories for tickets. The wolves are here, too, sitting at the games of chance, waiting to see if you will finally play by their rules.',
    question: 'The final encounter. The wolves watch you from across the midway. What is your final move?',
    choices: [
      {
        id: 'c1',
        text: 'I play the game, believing this time I can win back what was lost.',
        consequence: 'The house always wins. You remain in the Carnival, forever trying to fix what cannot be repaired.'
      },
      {
        id: 'c2',
        text: 'I watch them play, studying the trick until it loses its magic.',
        consequence: 'You see the wires and the mirrors. The fear dissolves, leaving only a profound, exhausted clarity.'
      },
      {
        id: 'c3',
        text: 'I drop my tickets and walk out of the tent into the quiet night.',
        consequence: 'You leave the spectacle behind. The night is cold, but the silence is the most beautiful thing you have ever heard.'
      },
      {
        id: 'c4',
        text: 'I turn the mirrors toward them so they can see their own teeth.',
        consequence: 'The illusion shatters. You do not need to explain yourself to wolves who are afraid of their own reflection.'
      }
    ]
  }
];

export const getStageById = (id) => stages.find(s => s.id === id);
