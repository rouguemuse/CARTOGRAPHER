export const objects = [
  {
    id: 'red_coat',
    name: 'The Red Coat',
    image: '/images/red_coat.jpg',
    description: 'It is warm, visible, and heavy with the storms you believed you had to survive for other people.',
    consequence: 'The coat keeps you warm but makes you undeniably visible. You will be expected to endure the weather others refuse to walk through.'
  },
  {
    id: 'red_string',
    name: 'The Red String',
    image: '/images/red_string.jpg',
    description: 'A tether. It either leads you safely out of the maze or keeps you tied to the person who built it.',
    consequence: 'You have chosen connection over freedom. You will always know where you are in relation to them, but you can never wander too far.'
  },
  {
    id: 'red_crane',
    name: 'The Red Crane',
    image: '/images/red_crane.jpg',
    description: 'Folded with sharp intention. It requires a delicate touch and is ruined the moment someone crushes it in their fist.',
    consequence: 'You offer something fragile, hoping the world will be gentle. When it is not, you will have to learn how to unfold the creases.'
  },
  {
    id: 'red_envelope',
    name: 'The Red Envelope',
    image: '/images/red_envelope.jpg',
    description: 'A sealed explanation you never delivered. It contains the exact words that would finally make them understand.',
    consequence: 'You carry the heavy assumption that the right words exist. You will spend your journey waiting for the right moment to open it.'
  }
];

export const stages = [
  {
    id: 'valley',
    title: 'The Valley of Please Understand Me',
    routeProgress: 20,
    narrative: 'The air in this valley is thick with the exhausting hope that the right combination of words will finally make you safe. A figure blocks your path. They look at you, look at what you are carrying, and immediately misinterpret why you are here.',
    question: 'What do you do when someone fundamentally misunderstands you?',
    choices: [
      {
        id: 'c1',
        text: 'I begin explaining myself from the beginning, assuming I just haven’t been clear enough.',
        consequence: 'You surrender your energy to the act of translation, hoping that context is the key to safety. It rarely is.'
      },
      {
        id: 'c2',
        text: 'I agree with their misinterpretation so the tension will pass quickly.',
        consequence: 'You preserve the peace of the valley by sacrificing the truth of your own experience. You are safe, but entirely erased.'
      },
      {
        id: 'c3',
        text: 'I silently collect evidence of my own reality to prove it to myself later.',
        consequence: 'You withdraw into your own mind, becoming the archivist of your own sanity because you cannot trust the room.'
      },
      {
        id: 'c4',
        text: 'I let the misunderstanding stand in the air between us and keep walking.',
        consequence: 'You realize that being understood is not a prerequisite for existence. The silence is terrifying, but it is yours.'
      }
    ]
  },
  {
    id: 'forest',
    title: 'The Forest of Other People’s Weather',
    routeProgress: 40,
    narrative: 'The trees grow dense. Without warning, the sky darkens. The person walking beside you has suddenly become a storm. The temperature drops, the wind picks up, and their sudden, unspoken anger fills the entire forest.',
    question: 'What do you do when another person’s mood changes the entire room?',
    choices: [
      {
        id: 'c1',
        text: 'I immediately try to fix whatever I must have done wrong to cause the rain.',
        consequence: 'You accept responsibility for skies you do not control. You will spend your life apologizing for the clouds.'
      },
      {
        id: 'c2',
        text: 'I make myself very small and quiet, waiting for the weather to pass.',
        consequence: 'You survive the storm by becoming invisible. But when the sun returns, you have forgotten how to cast a shadow.'
      },
      {
        id: 'c3',
        text: 'I become overly useful, offering umbrellas and shelter to appease them.',
        consequence: 'You trade your own comfort for utility. You are valued for the protection you provide, not the person you are.'
      },
      {
        id: 'c4',
        text: 'I observe the rain falling, but recognize that it is not falling on me.',
        consequence: 'You discover the boundary between their weather and your skin. The storm continues, but you are no longer drowning in it.'
      }
    ]
  },
  {
    id: 'bridge',
    title: 'The Bridge of If Only I Were Easier',
    routeProgress: 60,
    narrative: 'A narrow, swaying bridge crosses a terrifying drop. The crossing requires absolute balance. The guide tells you that the bridge is perfectly safe—as long as you are willing to leave behind the parts of yourself that make you "difficult."',
    question: 'What part of yourself do you shrink to preserve the connection?',
    choices: [
      {
        id: 'c1',
        text: 'I drop my anger and my boundaries, presenting only softness.',
        consequence: 'You cross safely, but on the other side, you find you have no armor left to protect what remains.'
      },
      {
        id: 'c2',
        text: 'I swallow my inconvenient needs and pretend I require nothing.',
        consequence: 'You are praised for being low-maintenance, but you arrive starving.'
      },
      {
        id: 'c3',
        text: 'I silence my intuition, agreeing that I am probably just overreacting.',
        consequence: 'The bridge holds, but you lose the ability to trust your own compass. You now rely entirely on their map.'
      },
      {
        id: 'c4',
        text: 'I refuse to shrink. If the bridge cannot hold all of me, I will not cross.',
        consequence: 'The connection breaks. It is a lonely descent into the gorge, but every step you take belongs entirely to you.'
      }
    ]
  },
  {
    id: 'wolves',
    title: 'The Wolves Who Ask Questions',
    routeProgress: 80,
    narrative: 'You reach a clearing. The wolves are waiting. They do not attack with teeth; they attack with curiosity. They ask you endless, circular questions about your choices, your memories, and your right to be here. Every answer you give becomes a new trap.',
    question: 'How do you respond when questions are being used as accusations rather than invitations to understand?',
    choices: [
      {
        id: 'c1',
        text: 'I keep providing more detail, desperately hoping my vulnerability will disarm them.',
        consequence: 'You bleed out in explanations. The wolves do not want to understand you; they only want you to remain on the defensive.'
      },
      {
        id: 'c2',
        text: 'I turn the questions back on them, fighting fire with fire.',
        consequence: 'You survive the encounter, but you adopt the shape of the wolves to do it. The fight leaves you exhausted and cynical.'
      },
      {
        id: 'c3',
        text: 'I carefully monitor their reactions and give them the answers they want to hear.',
        consequence: 'You become a mirror reflecting their expectations. You escape the clearing, but you leave your voice behind.'
      },
      {
        id: 'c4',
        text: 'I stop answering. I recognize the interrogation and walk away mid-sentence.',
        consequence: 'The wolves howl at your back, furious that you withdrew your participation. But their voices cannot stop your feet.'
      }
    ]
  },
  {
    id: 'carnival',
    title: 'The Final Choice',
    routeProgress: 100,
    narrative: 'You have reached the edge of the territory. The exit is open. But right beside the gate, there is a mirror. You know that if you leave now, the people in the valley, the forest, and the clearing will never truly understand who you were or why you walked away.',
    question: 'Can you leave without being understood, or do you return to explain yourself one more time?',
    choices: [
      {
        id: 'c1',
        text: 'I turn back. If I just try one more time, with the right words, they will finally see me.',
        consequence: 'You return to the maze of other people’s weather. The explanation is never finished. The journey begins again.'
      },
      {
        id: 'c2',
        text: 'I write the perfect explanation, leave it at the gate, and walk away.',
        consequence: 'You leave, but a piece of your energy remains tied to whether they ever read it and realize you were right.'
      },
      {
        id: 'c3',
        text: 'I leave quietly, accepting the grief that they will always hold a distorted version of me.',
        consequence: 'You cross the boundary. The grief is heavy, but it is finite. You are finally free to inhabit your own reality.'
      },
      {
        id: 'c4',
        text: 'I smash the mirror on my way out. I no longer need their reflection to know I exist.',
        consequence: 'The glass shatters. You do not need to explain yourself to wolves who are afraid of their own reflection. You are free.'
      }
    ]
  }
];

export const getStageById = (id) => stages.find(s => s.id === id);
