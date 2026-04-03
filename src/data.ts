/**
 * Babysential MCP Server — Static data and content
 * Based on Babysential.com knowledge base
 */

// ─── Baby Names Database (sample subset) ─────────────────────────────────────

export interface BabyName {
  name: string;
  gender: "boy" | "girl" | "unisex";
  origin: string;
  meaning: string;
  popularity: number;
  syllables: number;
  themes: string[];
}

export const BABY_NAMES: BabyName[] = [
  // Scandinavian / Norwegian
  { name: "Astrid", gender: "girl", origin: "Scandinavian", meaning: "divinely beautiful", popularity: 88, syllables: 2, themes: ["nature", "nordic", "classic"] },
  { name: "Bjørn", gender: "boy", origin: "Norwegian", meaning: "bear", popularity: 72, syllables: 1, themes: ["nature", "nordic", "strong"] },
  { name: "Freya", gender: "girl", origin: "Norse", meaning: "goddess of love and beauty", popularity: 91, syllables: 2, themes: ["mythology", "nordic", "classic"] },
  { name: "Leif", gender: "boy", origin: "Scandinavian", meaning: "heir, descendant", popularity: 65, syllables: 1, themes: ["nordic", "classic"] },
  { name: "Sigrid", gender: "girl", origin: "Norwegian", meaning: "victorious rider", popularity: 60, syllables: 2, themes: ["nordic", "classic"] },
  { name: "Magnus", gender: "boy", origin: "Latin/Scandinavian", meaning: "great", popularity: 82, syllables: 2, themes: ["classic", "strong"] },
  { name: "Ingrid", gender: "girl", origin: "Scandinavian", meaning: "beautiful", popularity: 78, syllables: 2, themes: ["nordic", "classic"] },
  { name: "Signe", gender: "girl", origin: "Norwegian", meaning: "new victory", popularity: 55, syllables: 2, themes: ["nordic"] },
  { name: "Olav", gender: "boy", origin: "Norwegian", meaning: "ancestor's relic", popularity: 58, syllables: 2, themes: ["nordic", "classic"] },
  { name: "Maja", gender: "girl", origin: "Scandinavian", meaning: "pearl", popularity: 85, syllables: 2, themes: ["nature", "classic"] },

  // International
  { name: "Emma", gender: "girl", origin: "Germanic", meaning: "whole, universal", popularity: 98, syllables: 2, themes: ["classic", "popular"] },
  { name: "Liam", gender: "boy", origin: "Irish", meaning: "strong-willed warrior", popularity: 97, syllables: 1, themes: ["strong", "popular"] },
  { name: "Olivia", gender: "girl", origin: "Latin", meaning: "olive tree", popularity: 96, syllables: 4, themes: ["nature", "classic", "popular"] },
  { name: "Noah", gender: "boy", origin: "Hebrew", meaning: "rest, comfort", popularity: 95, syllables: 2, themes: ["biblical", "classic"] },
  { name: "Ava", gender: "girl", origin: "Latin", meaning: "bird-like, lively", popularity: 93, syllables: 2, themes: ["nature", "short", "popular"] },
  { name: "Elias", gender: "boy", origin: "Hebrew", meaning: "my God is Yahweh", popularity: 87, syllables: 3, themes: ["biblical", "classic"] },
  { name: "Sofia", gender: "girl", origin: "Greek", meaning: "wisdom", popularity: 92, syllables: 3, themes: ["classic", "popular"] },
  { name: "Lucas", gender: "boy", origin: "Latin", meaning: "light", popularity: 90, syllables: 2, themes: ["classic", "popular"] },
  { name: "Nora", gender: "girl", origin: "Irish/Scandinavian", meaning: "honor", popularity: 89, syllables: 2, themes: ["classic", "short"] },
  { name: "Oliver", gender: "boy", origin: "Latin", meaning: "olive tree", popularity: 94, syllables: 3, themes: ["nature", "classic", "popular"] },
  { name: "Luna", gender: "girl", origin: "Latin", meaning: "moon", popularity: 86, syllables: 2, themes: ["nature", "celestial"] },
  { name: "Theo", gender: "boy", origin: "Greek", meaning: "gift of God", popularity: 84, syllables: 2, themes: ["classic", "short"] },
  { name: "Ella", gender: "girl", origin: "Germanic", meaning: "all, completely", popularity: 91, syllables: 2, themes: ["classic", "short", "popular"] },
  { name: "Axel", gender: "boy", origin: "Scandinavian", meaning: "father of peace", popularity: 80, syllables: 2, themes: ["nordic", "strong"] },
  { name: "Mia", gender: "girl", origin: "Scandinavian/Italian", meaning: "mine, bitter", popularity: 88, syllables: 2, themes: ["short", "popular"] },
  { name: "Henrik", gender: "boy", origin: "Scandinavian", meaning: "home ruler", popularity: 76, syllables: 2, themes: ["nordic", "classic"] },
  { name: "Aria", gender: "girl", origin: "Italian", meaning: "air, melody", popularity: 87, syllables: 3, themes: ["music", "elegant"] },
  { name: "Felix", gender: "boy", origin: "Latin", meaning: "happy, fortunate", popularity: 83, syllables: 2, themes: ["classic", "joyful"] },
  { name: "Isla", gender: "girl", origin: "Scottish", meaning: "island", popularity: 85, syllables: 2, themes: ["nature", "short"] },
  { name: "Sebastian", gender: "boy", origin: "Greek", meaning: "venerable, revered", popularity: 88, syllables: 4, themes: ["classic", "elegant"] },
];

// ─── Sleep Guide Data ─────────────────────────────────────────────────────────

export interface SleepGuide {
  age_weeks_min: number;
  age_weeks_max: number;
  label: string;
  total_sleep_hours_min: number;
  total_sleep_hours_max: number;
  naps_per_day_min: number;
  naps_per_day_max: number;
  night_sleep_hours: number;
  wake_window_min_minutes: number;
  wake_window_max_minutes: number;
  tips: string[];
  red_flags: string[];
}

export const SLEEP_GUIDES: SleepGuide[] = [
  {
    age_weeks_min: 0,
    age_weeks_max: 12,
    label: "Newborn (0-3 months)",
    total_sleep_hours_min: 14,
    total_sleep_hours_max: 17,
    naps_per_day_min: 4,
    naps_per_day_max: 6,
    night_sleep_hours: 8,
    wake_window_min_minutes: 30,
    wake_window_max_minutes: 60,
    tips: [
      "Feed on demand — newborns need to eat every 2-3 hours",
      "Watch for sleepy cues: rubbing eyes, yawning, zoning out",
      "Keep wake windows very short (30-60 min) to avoid overtiredness",
      "Swaddling can help newborns feel secure and sleep longer",
      "White noise mimics the womb and can calm fussy babies",
      "Don't worry about a sleep schedule yet — follow baby's lead",
    ],
    red_flags: [
      "Sleeping more than 4 hours without waking to feed (first 2 weeks)",
      "Difficulty waking to feed",
      "Fewer than 6 wet diapers per day",
    ],
  },
  {
    age_weeks_min: 12,
    age_weeks_max: 24,
    label: "3-6 months",
    total_sleep_hours_min: 12,
    total_sleep_hours_max: 16,
    naps_per_day_min: 3,
    naps_per_day_max: 4,
    night_sleep_hours: 10,
    wake_window_min_minutes: 90,
    wake_window_max_minutes: 150,
    tips: [
      "Start to introduce a simple bedtime routine (bath, feed, song, sleep)",
      "Many babies start consolidating sleep at 3-4 months",
      "The 4-month sleep regression is common — wake windows lengthen suddenly",
      "Consider introducing a sleep sack instead of swaddle as baby becomes more active",
      "Aim for 3-4 naps per day, transitioning to 3 around 5-6 months",
    ],
    red_flags: [
      "No periods of sleep longer than 2 hours at night by 4 months",
      "Difficulty falling asleep despite being clearly tired",
    ],
  },
  {
    age_weeks_min: 24,
    age_weeks_max: 40,
    label: "6-9 months",
    total_sleep_hours_min: 12,
    total_sleep_hours_max: 15,
    naps_per_day_min: 2,
    naps_per_day_max: 3,
    night_sleep_hours: 10,
    wake_window_min_minutes: 120,
    wake_window_max_minutes: 180,
    tips: [
      "Transition from 3 naps to 2 naps around 6-8 months",
      "Wake windows extend to 2-3 hours between sleep periods",
      "Object permanence develops around 8 months — expect some separation anxiety",
      "Solid foods beginning — avoid feeding right before sleep to prevent association",
      "Consistent sleep environment helps: same room, same sounds",
    ],
    red_flags: [
      "Still needing more than 3 night feeds after 6 months (if healthy weight)",
      "Unable to link sleep cycles independently",
    ],
  },
  {
    age_weeks_min: 40,
    age_weeks_max: 60,
    label: "9-15 months",
    total_sleep_hours_min: 11,
    total_sleep_hours_max: 14,
    naps_per_day_min: 1,
    naps_per_day_max: 2,
    night_sleep_hours: 10,
    wake_window_min_minutes: 180,
    wake_window_max_minutes: 240,
    tips: [
      "The 2-to-1 nap transition typically happens between 14-18 months",
      "Watch for signs of readiness: taking longer to fall asleep, short naps, early rising",
      "Transition timing: move to one midday nap (11am-1pm window)",
      "Expect 10-12 hours of night sleep plus 1-2 hours of nap time",
      "Separation anxiety peaks at 10-18 months — a comfort object can help",
    ],
    red_flags: [
      "Night waking more than 3 times after 12 months",
      "Napping less than 30 minutes total per day",
    ],
  },
  {
    age_weeks_min: 60,
    age_weeks_max: 130,
    label: "15 months - 2.5 years",
    total_sleep_hours_min: 11,
    total_sleep_hours_max: 14,
    naps_per_day_min: 0,
    naps_per_day_max: 1,
    night_sleep_hours: 11,
    wake_window_min_minutes: 300,
    wake_window_max_minutes: 420,
    tips: [
      "Most toddlers drop the nap between 2.5-3.5 years",
      "A consistent bedtime between 7-8 PM works well for most toddlers",
      "Limit screen time within 1 hour of bedtime",
      "Bedtime battles are common — stay consistent with routine",
      "Quiet time (even without sleep) replaces nap time during transition",
    ],
    red_flags: [
      "Consistently less than 10 hours total sleep",
      "Signs of sleep apnea: loud snoring, gasping, mouth breathing",
    ],
  },
];

// ─── Milestone Data ───────────────────────────────────────────────────────────

export interface Milestone {
  category: "motor" | "language" | "cognitive" | "social";
  milestone: string;
  age_months_min: number;
  age_months_max: number;
  description: string;
  how_to_encourage: string;
}

export const MILESTONES: Milestone[] = [
  // Motor milestones
  { category: "motor", milestone: "Lifts head during tummy time", age_months_min: 1, age_months_max: 2, description: "Baby can briefly lift and turn head when on stomach", how_to_encourage: "Do supervised tummy time for 2-3 minutes several times a day" },
  { category: "motor", milestone: "Holds head steady", age_months_min: 2, age_months_max: 4, description: "Baby holds head up without support when held upright", how_to_encourage: "Hold baby upright against your chest and let them practice" },
  { category: "motor", milestone: "Rolls front to back", age_months_min: 3, age_months_max: 5, description: "Baby rolls from tummy to back", how_to_encourage: "Place toys just out of reach during tummy time" },
  { category: "motor", milestone: "Sits with support", age_months_min: 4, age_months_max: 6, description: "Baby can sit when supported by pillows or caregiver", how_to_encourage: "Prop baby in a supported sitting position during play" },
  { category: "motor", milestone: "Rolls both directions", age_months_min: 5, age_months_max: 7, description: "Baby rolls from back to front and front to back", how_to_encourage: "Give plenty of floor time to practice" },
  { category: "motor", milestone: "Sits without support", age_months_min: 6, age_months_max: 8, description: "Baby sits independently for several seconds", how_to_encourage: "Practice sitting on a firm surface with you nearby" },
  { category: "motor", milestone: "Pulls to stand", age_months_min: 8, age_months_max: 11, description: "Baby pulls themselves to standing position using furniture", how_to_encourage: "Provide low, stable furniture to practice on" },
  { category: "motor", milestone: "Cruises along furniture", age_months_min: 9, age_months_max: 12, description: "Baby walks sideways while holding onto furniture", how_to_encourage: "Arrange safe furniture in a circuit for baby to cruise along" },
  { category: "motor", milestone: "First steps", age_months_min: 10, age_months_max: 15, description: "Baby takes first independent steps", how_to_encourage: "Hold out your hands and encourage baby to walk to you" },
  { category: "motor", milestone: "Walks independently", age_months_min: 12, age_months_max: 18, description: "Baby walks without holding onto anything", how_to_encourage: "Give space and encouragement; minimize shoes indoors" },

  // Language milestones
  { category: "language", milestone: "Social smile", age_months_min: 1, age_months_max: 2, description: "Baby smiles in response to your face and voice", how_to_encourage: "Talk to baby with a warm, animated face" },
  { category: "language", milestone: "Cooing", age_months_min: 2, age_months_max: 3, description: "Baby makes soft vowel sounds like 'ooh' and 'aah'", how_to_encourage: "Have face-to-face conversations, responding to every sound" },
  { category: "language", milestone: "Babbling", age_months_min: 4, age_months_max: 7, description: "Baby makes consonant-vowel sounds like 'ba', 'da', 'ma'", how_to_encourage: "Narrate your day, read books, sing songs" },
  { category: "language", milestone: "Says 'mama' or 'dada'", age_months_min: 8, age_months_max: 12, description: "Baby uses 'mama' or 'dada' with meaning", how_to_encourage: "Respond excitedly when they vocalize; model the words clearly" },
  { category: "language", milestone: "First word", age_months_min: 10, age_months_max: 14, description: "Baby says first intentional word consistently", how_to_encourage: "Name objects during daily routines; read picture books together" },
  { category: "language", milestone: "Two-word phrases", age_months_min: 18, age_months_max: 24, description: "Baby combines two words like 'more milk' or 'daddy go'", how_to_encourage: "Expand on baby's words: if they say 'dog', say 'yes, big dog!'" },
  { category: "language", milestone: "50+ words", age_months_min: 24, age_months_max: 30, description: "Child uses at least 50 words", how_to_encourage: "Read daily, limit screen time, engage in conversation" },

  // Cognitive milestones
  { category: "cognitive", milestone: "Tracks objects with eyes", age_months_min: 1, age_months_max: 2, description: "Baby follows moving objects with eyes", how_to_encourage: "Slowly move a colorful object in front of baby's face" },
  { category: "cognitive", milestone: "Object permanence begins", age_months_min: 6, age_months_max: 9, description: "Baby understands objects exist when out of sight", how_to_encourage: "Play peek-a-boo! Hide toys under a cloth for baby to find" },
  { category: "cognitive", milestone: "Imitates actions", age_months_min: 8, age_months_max: 12, description: "Baby copies simple gestures like waving or clapping", how_to_encourage: "Wave, clap, and pat during play and encourage imitation" },
  { category: "cognitive", milestone: "Simple pretend play", age_months_min: 12, age_months_max: 18, description: "Child engages in simple pretend (feeding a doll, talking on a toy phone)", how_to_encourage: "Provide simple props and model play behaviors" },
  { category: "cognitive", milestone: "Sorts shapes and colors", age_months_min: 18, age_months_max: 24, description: "Child can sort objects by basic shape or color", how_to_encourage: "Use shape sorters, stacking rings, and sorting toys" },

  // Social milestones
  { category: "social", milestone: "Recognizes parents", age_months_min: 1, age_months_max: 3, description: "Baby recognizes and prefers primary caregivers", how_to_encourage: "Spend close face-to-face time, respond consistently to cries" },
  { category: "social", milestone: "Laughs out loud", age_months_min: 3, age_months_max: 5, description: "Baby laughs in response to playful interactions", how_to_encourage: "Play silly games, make funny faces, blow raspberries" },
  { category: "social", milestone: "Separation anxiety", age_months_min: 8, age_months_max: 12, description: "Baby protests when primary caregiver leaves", how_to_encourage: "Always say goodbye and reassure; avoid sneaking away" },
  { category: "social", milestone: "Waves bye-bye", age_months_min: 9, age_months_max: 12, description: "Baby waves in response to goodbyes", how_to_encourage: "Wave and say 'bye-bye' consistently during transitions" },
  { category: "social", milestone: "Points to share interest", age_months_min: 12, age_months_max: 16, description: "Child points to show you something interesting (declarative pointing)", how_to_encourage: "Follow their gaze, name what they're looking at" },
  { category: "social", milestone: "Parallel play", age_months_min: 18, age_months_max: 24, description: "Child plays alongside (not with) other children", how_to_encourage: "Arrange playdates; model sharing and turn-taking" },
];

// ─── Product Recommendations ──────────────────────────────────────────────────

export interface Product {
  name: string;
  category: string;
  price_nok_approx: number;
  description: string;
  pros: string[];
  age_range: string;
  safety_note?: string;
}

export const PRODUCT_RECOMMENDATIONS: Product[] = [
  // Sleep
  { name: "Dockatot Deluxe+", category: "sleep", price_nok_approx: 2500, description: "Snuggle bed/lounger for newborns 0-8 months. Popular in Scandinavia.", pros: ["Portable", "Soft cotton cover", "Easy to clean"], age_range: "0-8 months", safety_note: "Never use for unsupervised sleep or in a crib" },
  { name: "HALO Bassinest", category: "sleep", price_nok_approx: 3200, description: "Swivel sleeper that allows safe bedside sleeping", pros: ["Swivels 360°", "Adjustable height", "Safety certified"], age_range: "0-6 months" },
  { name: "SnüzPod 4", category: "sleep", price_nok_approx: 3800, description: "Bedside crib with breathable mesh sides", pros: ["Open side panel", "Foldable", "Breathable mesh"], age_range: "0-6 months" },

  // Feeding
  { name: "Haakaa Silicone Breast Pump", category: "feeding", price_nok_approx: 350, description: "Simple silicone pump that collects letdown milk passively", pros: ["No batteries", "Easy to clean", "Portable"], age_range: "Newborn+" },
  { name: "Medela Swing Flex", category: "feeding", price_nok_approx: 2200, description: "Single electric breast pump, compact and quiet", pros: ["Quiet motor", "Portable", "2-Phase Expression"], age_range: "Newborn+" },
  { name: "Philips Avent Natural Bottles", category: "feeding", price_nok_approx: 200, description: "Wide-neck bottles designed to ease transition between breast and bottle", pros: ["Anti-colic valve", "Easy latch", "BPA-free"], age_range: "Newborn+" },

  // Carriers
  { name: "Ergobaby Embrace", category: "carrier", price_nok_approx: 1200, description: "Soft structured carrier for newborns — no insert needed", pros: ["No infant insert needed", "Machine washable", "Easy to use"], age_range: "0-12 months" },
  { name: "Stokke Limas", category: "carrier", price_nok_approx: 1500, description: "Norwegian brand, flexible ring carrier with hip-healthy position", pros: ["Hip-friendly position", "Lightweight", "Versatile"], age_range: "0-3 years" },
  { name: "Tula Explore", category: "carrier", price_nok_approx: 2200, description: "Versatile carrier, front and back carry, with infant insert", pros: ["Grows with baby", "Multiple carry positions", "Durable"], age_range: "0-3 years" },

  // Safety
  { name: "Angel Care AC401 Baby Monitor", category: "safety", price_nok_approx: 1800, description: "Video + movement monitor with under-mattress sensor pad", pros: ["Movement detection", "Video", "Temperature sensor"], age_range: "0-2 years" },
  { name: "Stokke Tripp Trapp", category: "highchair", price_nok_approx: 2500, description: "Iconic Norwegian adjustable highchair that grows with child", pros: ["Grows with child", "Solid wood", "Customizable"], age_range: "6 months - adult" },
  { name: "BabyBjörn Bouncer Bliss", category: "bouncer", price_nok_approx: 2000, description: "Ergonomic bouncer with natural baby movement activation", pros: ["No batteries", "Machine washable cover", "Folds flat"], age_range: "0-2 years" },
];
