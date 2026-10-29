import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
  { title: "Wellness", description: "Make room for your wellbeing through mindful movement, breathing and restorative downtime, away from the demands of your usual routine." },
  { title: "Introspection", description: "Step back, listen to yourself and reflect. Quiet moments between shared experiences leave space to reconnect with what matters to you." },
  { title: "Networking", description: "Connect naturally with a small circle of fellow travellers through shared practices, meals and conversations that have time to unfold." },
];

const food = [
  { title: "Breakfast & lunch", description: "Breakfast and lunch anchor the retreat’s shared rhythm, bringing the group together around the table between practices and time to unwind." },
  { title: "Dinner, together", description: "The itinerary brings together a welcome dinner, dinner outside, a home dinner and a special dinner by the host — a mix of meals at the villa and time out together." },
  { title: "A farewell table", description: "A farewell lunch closes the experience with one more shared meal and time to reflect on the retreat." },
];

const sections = [
  { value: "experience", label: "Experience", heading: "What you take with you", intro: "A little more balance. A deeper connection to yourself. A circle of new connections.", items: experience },
  { value: "daily", label: "Daily practice", heading: "Movement, breath & stillness", intro: "The core practices that shape the retreat’s rhythm.", items: dailyPractice },
  { value: "optional", label: "Optional activities", heading: "Follow your curiosity", intro: "Additional experiences to choose from, with room to enjoy your own pace.", items: optionalActivities },
  { value: "food", label: "Food", heading: "Around the table", intro: "Shared meals are part of the experience — a chance to slow down and connect.", items: food },
];

const indicatorPositions: Record<string, string> = {
  experience: "translate-x-0",
  daily: "translate-x-full",
  optional: "translate-x-[200%]",
  food: "translate-x-[300%]",
};

export function BaliRetreatDetails() {
  const [selected, setSelected] = useState("experience");

  return (
    <Tabs value={selected} onValueChange={setSelected} className="min-w-0">
      <div className="retreat-calendar overflow-x-auto">
        <div className="relative min-w-[520px] border-b border-ink/15">
          <TabsList aria-label="Retreat details" className="grid h-auto w-full grid-cols-4 rounded-none bg-transparent p-0">
            {sections.map((section) => (
              <TabsTrigger key={section.value} value={section.value} className="min-h-14 rounded-none px-2 py-4 text-[12px] text-ink/55 transition-colors data-[state=active]:bg-transparent data-[state=active]:text-clay data-[state=active]:shadow-none">
                {section.label}
              </TabsTrigger>
            ))}
          </TabsList>
          <span aria-hidden="true" className={`pointer-events-none absolute bottom-0 left-0 h-0.5 w-1/4 bg-clay transition-transform duration-300 motion-reduce:transition-none ${indicatorPositions[selected] ?? "translate-x-0"}`} />
        </div>
      </div>
      {sections.map((section) => (
        <TabsContent key={section.value} value={section.value} className="mt-8 min-h-[460px]">
          <h2 className="font-display text-[28px] leading-tight font-medium">{section.heading}</h2>
          <p className="mt-3 max-w-[60ch] text-[14px] leading-relaxed text-ink/65">{section.intro}</p>
          <div className={`mt-8 grid gap-x-8 gap-y-7 ${section.value === "experience" || section.value === "food" ? "grid-cols-1" : "sm:grid-cols-2"}`}>
            {section.items.map((item) => (
              <div key={item.title} className="border-t border-ink/10 pt-4">
                <h3 className="font-display text-[21px] font-medium">{item.title}</h3>
                <p className="mt-2 max-w-[65ch] text-[14px] leading-relaxed text-pretty text-ink/70">{item.description}</p>
              </div>
            ))}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}