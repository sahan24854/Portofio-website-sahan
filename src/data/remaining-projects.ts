export const mathResults = [
 { name:'GSM8K', base:5, tuned:8, baseParseable:75, tunedParseable:95 },
 { name:'SVAMP', base:20, tuned:12, baseParseable:84, tunedParseable:98 },
 { name:'Arithmetic', base:4, tuned:54, baseParseable:23, tunedParseable:97 },
];
export const ecgResults = [
 {key:'CD',name:'Conduction disturbance',base:.6433,tuned:.6726,support:362},
 {key:'HYP',name:'Hypertrophy',base:.4377,tuned:.4083,support:158},
 {key:'MI',name:'Myocardial infarction',base:.6597,tuned:.7012,support:399},
 {key:'NORM',name:'Normal',base:.8630,tuned:.8722,support:930},
 {key:'STTC',name:'ST/T changes',base:.4167,tuned:.4516,support:21},
];
export const chatStages = [
 {name:'Retrieve',title:'Read the application’s catalog',description:'The Edge Function retrieves tours, villas, and experiences using the anonymous, RLS-filtered Supabase client, then sends compact catalog records with the trip preferences.'},
 {name:'Generate',title:'Request a structured itinerary',description:'Gemini receives duration, interests, conversation context, selected items, and catalog records. A JSON schema defines the expected day-by-day output.'},
 {name:'Validate',title:'Check the shape and hydrate IDs',description:'Zod parses the returned plan. Only IDs matching the retrieved catalog become listing cards, with names, prices, and images taken from application records.'},
 {name:'Present',title:'Keep the plan useful beyond chat',description:'The client renders a timeline and saved places. Shared plan types and text helpers support PDF exports, WhatsApp sharing, and a human quote handoff.'},
];
