// Text and partner logos for the Bali retreat page, shared by every departure.
import partnerKynd from "@/assets/partner-kynd.png";
import partnerLoft from "@/assets/partner-loft.png";
import partnerN from "@/assets/partner-n.png";
import partnerOurs from "@/assets/partner-ours.webp";

const dailyPractice = [
  { title: "Stretching", description: "Gentle, guided stretches to release tension, improve mobility and reconnect with your body." },
  { title: "Pilates", description: "Mat-based movement focused on core strength, posture and control, balancing strength with flexibility." },
  { title: "Yoga", description: "A grounding practice combining movement and stillness, with space to find your own pace." },
  { title: "Breathing", description: "Guided breathwork to slow down, bring attention inward and create a sense of calm." },
  { title: "Sound healing", description: "An immersive listening practice, resting with sound and vibration for a quiet moment of release." },
];

const optionalActivities = [
  { title: "Surf & beach club", description: "Time by the ocean, whether you choose to surf or unwind at the beach club." },
  { title: "Run club", description: "An easy-paced beach run, sharing movement and sea air with the group." },
  { title: "Massage", description: "Hands-on bodywork for relaxation and easing muscle tension, giving your body space to rest." },
  { title: "Cupping & acupuncture", description: "Traditional bodywork practices offering a different approach to personal wellbeing." },
  { title: "Ice bath & sauna", description: "A contrast of cold immersion and warming sauna, with time to pause between the two." },
  { title: "Cooking session", description: "A shared cooking experience, exploring food together and enjoying the process of preparing a meal." },
  { title: "Water pilates", description: "Pilates-inspired movement in the pool, using the water’s support and resistance." },
  { title: "Tarot reading", description: "A reflective card reading for those curious to explore a new perspective." },
];

const experience = [
  { title: "Wellness", description: "Make room for your wellbeing through mindful movement, breathing, nutrition and restorative downtime, away from the demands of your usual routine." },
  { title: "Introspection", description: "Step back, listen to yourself and reflect. Quiet moments between shared experiences leave space to reconnect with what matters to you." },
  { title: "Networking", description: "Connect naturally with a small circle of fellow travellers through shared practices, meals and conversations that have time to unfold." },
];

// Wellness inside & out: sport looks after the outside; connection and nutrition the inside.
const food = [
  { title: "Unprocessed, always", description: "Whole, fresh ingredients with nothing ultra-processed — food that supports the work you do on the mat." },
  { title: "Made to measure", description: "Meals shaped around you — dietary needs, allergies and preferences are planned in before you arrive." },
  { title: "Prepared daily by local partners", description: "Our partner restaurant cooks for the group every day, working with local producers wherever we can." },
  { title: "No waste", description: "Portions planned to avoid waste and packaging kept to a minimum, as part of our commitment to the island that hosts us." },
];

// Logos come on white or tinted squares; multiply blends them into the cream page.
export const partnerRestaurants = [
  { src: partnerN, name: "N.", className: "h-16" },
  { src: partnerOurs, name: "ours.", className: "h-10" },
  { src: partnerKynd, name: "KYND", className: "h-9" },
  { src: partnerLoft, name: "LOFT", className: "h-16" },
];

export const baliSections = [
  { value: "experience", label: "Experience", heading: "What you take home with you", intro: "A little more balance. A deeper connection to yourself. A circle of new connections.", items: experience },
  { value: "daily", label: "Daily practice", heading: "Movement, breath & stillness", intro: "The core practices that shape the retreat’s rhythm.", items: dailyPractice },
  { value: "optional", label: "Optional activities", heading: "Follow your curiosity", intro: "Additional experiences to choose from, with room to enjoy at your own pace.", items: optionalActivities },
  { value: "food", label: "Nutrition", heading: "Nourished from the inside", intro: "Wellness inside and out: movement looks after the outside, while connection and nutrition look after the inside. Shared meals are a chance to slow down and connect.", items: food },
] as const;
