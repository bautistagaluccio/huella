// Who is behind Huella: the two co-founders, as introduced in the collaboration one-pagers.
// Keep this copy in line with the one-pagers so every place tells the same story.

import bautistaPhoto from "@/assets/founder-bautista.jpg";
import juliePhoto from "@/assets/founder-julie.jpg";

export const foundersIntro =
  "For years, Bautista built things that had to work, and Julie created moments people never forget. We always wondered what would happen if we did both at once. Huella is where our worlds meet.";

export const founders = [
  {
    id: "bautista",
    firstName: "Bautista",
    name: "Bautista Galuccio",
    role: "Start-up, Operations & Sport",
    bio: "8+ years in fast-paced start-ups — the operational drive that makes things happen, on the ground and on the slopes.",
    photo: bautistaPhoto,
  },
  {
    id: "julie",
    firstName: "Julie",
    name: "Julie Loiseau",
    role: "Client Experience, Events & Wellness",
    bio: "8+ years creating exclusive experiences for a luxury house and teaching pilates — hospitality, energy and an eye for detail.",
    photo: juliePhoto,
  },
] as const;
