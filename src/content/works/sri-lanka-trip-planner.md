---
title: "Sri Lanka Travel Chatbot"
description: "My chatbot contribution to an existing travel platform: catalog-grounded itinerary generation, validated listing cards, persistent trip preferences, and consistent PDF and inquiry handoff."
order: 50
bg: "bg-[#111111]"
cover: "/projects/sri-lanka-trip-planner.svg"
tags: ["React", "TypeScript", "Supabase", "Gemini", "Zod", "Structured Output"]
year: 2026
---

## My contribution

I developed the travel chatbot within the existing Air Travels Sri Lanka platform. This case study covers the assistant’s frontend, trip-planning function, catalog grounding, itinerary presentation, and export/inquiry flow. The surrounding travel website, administration tools, and booking platform are outside my claimed contribution here.

The implementation was reviewed from the supplied local project source. A public repository or live chatbot URL has not been provided for this version.

## From preferences to a day-by-day plan

The React widget collects trip duration, travel interests, messages, optional location, and selected catalog items. Quick-start trips cover three, five, and seven days; the backend accepts durations from one to fourteen days.

Guests can edit a plan conversationally, select individual places, save all suggested places, and request an updated itinerary around their selection. Preferences, the current plan, and selected items persist in browser storage.

## Catalog-grounded generation

A Supabase Edge Function reads the anonymous, row-level-security-filtered tours, villas, and experiences catalogs, then includes a compact version in the model context. It retrieves up to 150 records per category. This implementation uses direct catalog retrieval and prompt grounding; it does not show a vector-search index or embedding-based retrieval pipeline.

The reviewed function calls a Gemini model through the configured AI gateway and requests structured JSON matching an itinerary schema. The prompt asks for realistic route planning and exact catalog IDs, while keeping general advice separate from bookable recommendations.

## Validation and catalog hydration

The server validates requests and parses the generated plan with Zod. It then hydrates recommended IDs against the catalog records it already retrieved. Unknown IDs do not produce bookable cards; displayed names, prices, images, and ratings come from matching catalog rows rather than invented model fields.

Output hydration renumbers days, caps the plan at fourteen days, limits activities, and bounds attached listings. This protects the listing-card boundary, though narrative feasibility and the quality of general travel advice still need review.

## A usable chat experience

The widget presents the itinerary as a timeline, with distinct plan and selected-trip views. It includes editable preferences, loading states, errors with a contact fallback, reset controls, and a guard against overlapping requests.

The backend consumes the model’s streamed response internally and returns a validated plan to the frontend. The client displays a loading state until the complete plan is returned; it does not render token-by-token assistant text.

## Consistent exports and handoff

Shared TypeScript trip types and formatting helpers keep chat, PDF, WhatsApp sharing, and quote inquiries aligned around the same plan. PDF generation uses jsPDF, with day-by-day activities and selected listings.

The quote dialog validates guest inputs and submits the itinerary and selected items to the inquiry flow. The chatbot suggests a trip and supports a human quote handoff; it does not itself confirm availability, final pricing, or bookings.

## Implementation boundaries

The assistant’s theme is scoped to its container so it can sit within the existing site. Source review confirms the client/server behavior described here; no live model, catalog, or booking request was made for this portfolio update.

The catalog limit, route feasibility, malformed-response handling, and the consistency of exports are useful areas for further testing. My focus was connecting a useful conversational interface to validated application data and a clear next step for the guest.

## Skills demonstrated

React state management, TypeScript data contracts, server-side validation, structured LLM output, catalog-grounded generation, browser persistence, document exports, and integration into an existing product.
