export const SECTION_IDS = [
  "top",
  "about",
  "programs",
  "coaches",
  "schedule",
  "membership",
  "join",
] as const;

export const NAV = [
  { href: "#about", label: "Gym" },
  { href: "#programs", label: "Programs" },
  { href: "#coaches", label: "Coaches" },
  { href: "#schedule", label: "Schedule" },
  { href: "#membership", label: "Membership" },
];

export const STATS = [
  { value: "24/7", label: "Floor access for members" },
  { value: "12,000", label: "Square feet of training space" },
  { value: "1,400", label: "Pounds of bumper plates on the racks" },
  { value: "18", label: "Certified coaches" },
];

export const PROGRAMS = [
  {
    name: "Strength",
    plate: "25 kg",
    body: "Squat, bench, deadlift and press on a written progression. Your coach sets the weight, you move the bar.",
    meta: "4 days a week · Barbell",
  },
  {
    name: "Conditioning",
    plate: "20 kg",
    body: "Intervals on sleds, rowers and bikes. Forty minutes, scaled to your heart rate and your day.",
    meta: "45 min · All levels",
  },
  {
    name: "Hypertrophy",
    plate: "15 kg",
    body: "Higher reps, controlled tempo and a split built around the muscle you want to grow.",
    meta: "5 day split · Dumbbell and cable",
  },
  {
    name: "Mobility",
    plate: "10 kg",
    body: "Joint prep, loaded stretching and breath work. The session that keeps the other three going.",
    meta: "30 min · Floor and bands",
  },
];

export const COACHES = [
  {
    name: "Marcus Vale",
    role: "Head coach, strength",
    bio: "Former national powerlifter. Twelve years coaching first-time lifters to their first 200 kg total.",
    initials: "MV",
  },
  {
    name: "Priya Nair",
    role: "Conditioning and mobility",
    bio: "Physiotherapy background. Builds sessions that make you faster without wrecking your knees.",
    initials: "PN",
  },
  {
    name: "Diego Ramos",
    role: "Hypertrophy and nutrition",
    bio: "Competition bodybuilder and sports nutritionist. Writes the plans, then reads your food log.",
    initials: "DR",
  },
];

export type ClassSlot = { time: string; name: string; coach: string; spots: number };

export const SCHEDULE: Record<string, ClassSlot[]> = {
  Mon: [
    { time: "06:00", name: "Strength", coach: "Marcus", spots: 4 },
    { time: "12:30", name: "Conditioning", coach: "Priya", spots: 9 },
    { time: "18:30", name: "Hypertrophy", coach: "Diego", spots: 2 },
  ],
  Tue: [
    { time: "06:30", name: "Mobility", coach: "Priya", spots: 10 },
    { time: "17:30", name: "Strength", coach: "Marcus", spots: 6 },
    { time: "19:00", name: "Conditioning", coach: "Priya", spots: 5 },
  ],
  Wed: [
    { time: "06:00", name: "Hypertrophy", coach: "Diego", spots: 7 },
    { time: "12:30", name: "Strength", coach: "Marcus", spots: 3 },
    { time: "18:30", name: "Conditioning", coach: "Priya", spots: 8 },
  ],
  Thu: [
    { time: "06:30", name: "Strength", coach: "Marcus", spots: 5 },
    { time: "17:30", name: "Hypertrophy", coach: "Diego", spots: 4 },
    { time: "19:00", name: "Mobility", coach: "Priya", spots: 12 },
  ],
  Fri: [
    { time: "06:00", name: "Conditioning", coach: "Priya", spots: 6 },
    { time: "12:30", name: "Strength", coach: "Marcus", spots: 1 },
    { time: "18:00", name: "Hypertrophy", coach: "Diego", spots: 9 },
  ],
  Sat: [
    { time: "08:00", name: "Strength", coach: "Marcus", spots: 8 },
    { time: "10:00", name: "Conditioning", coach: "Priya", spots: 11 },
  ],
  Sun: [{ time: "09:00", name: "Mobility", coach: "Priya", spots: 14 }],
};

export const PLANS = [
  {
    name: "Floor",
    monthly: 39,
    blurb: "Open gym access, any hour.",
    features: ["24/7 floor access", "Locker and showers", "Free orientation session"],
    plate: "var(--plate-green)",
  },
  {
    name: "Classes",
    monthly: 69,
    blurb: "The floor plus every coached session.",
    features: ["Everything in Floor", "Unlimited coached classes", "Monthly body scan"],
    plate: "var(--plate-blue)",
    featured: true,
  },
  {
    name: "Personal",
    monthly: 149,
    blurb: "Your own coach and a written plan.",
    features: ["Everything in Classes", "4 one-to-one sessions a month", "Nutrition plan and check-ins"],
    plate: "var(--plate-red)",
  },
];

export const QUOTES = [
  { text: "I walked in unable to squat my own bodyweight. Eight months later I pulled 160 kg.", who: "Aditi, member since 2024" },
  { text: "Nobody here is performing for an audience. You show up, you lift, you leave stronger.", who: "Rohan, member since 2023" },
];
