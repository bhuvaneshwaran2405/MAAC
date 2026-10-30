# Full-View Hero Video Showcase — MAAC Wheels & Accessories

Upgrade the Hero section from a constrained 50/50 split layout to an expansive, high-impact **Full-View Cinematic Video Theater** featuring the uploaded Porsche 911 GT3 drift and accessory rack showcase (`/hero-video.mp4`).

## User Review & Critical Decisions

> [!IMPORTANT]
> - **Full-View Layout**: The video player expands to full width (16:9 cinematic aspect ratio, up to 1440px max-width container), ensuring the drifting visuals, tire smoke, and accessory display rack are showcased with zero clipping or side constriction.
> - **Non-Obstructive Typography**: Brand titles, fitment badges, and CTAs are positioned cleanly above and below the video player so the action is 100% unobstructed.
> - **Playback & Controls**: Autoplays smoothly with sound toggle (browser policy compliant), play/pause, replay, loop toggle, and custom video file uploader button for uploading alternative clips.
> - **Smooth Page Flow**: Removes the restrictive scroll lock so visitors can freely scroll down to inspect the accessory rack and product catalog at any time.

---

## 1. Overview & Core Concept

- **What It Does**: Centers the high-definition Porsche drift and MAAC accessory showcase video as the commanding visual anchor of the homepage in full view.
- **Why It Matters**: The uploaded video showcases a cinematic drift sequence that directly transitions into the custom parts display rack. Placing it in full view delivers an authentic motorsport feel and immediate credibility for performance vehicle owners.

---

## 2. User Experience & Visual Design

### Cinematic Theater Layout

```
┌────────────────────────────────────────────────────────────────────────┐
│                        Top Navigation Bar                              │
└────────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────┐
│                          HERO SECTION                                  │
│                                                                        │
│   [KUMBAKONAM WORKSHOP] · [PORSCHE GT3 SPEC] · [100% BOLT-ON FITMENT]  │
│                                                                        │
│       PRECISION PERFORMANCE. UNCOMPROMISING FITMENT.                   │
│   Watch our bespoke showcase or browse verified parts for your chassis │
│                                                                        │
│   ┌────────────────────────────────────────────────────────────────┐   │
│   │                                                                │   │
│   │                                                                │   │
│   │                 FULL-VIEW CINEMATIC VIDEO                      │   │
│   │                (Porsche Drift & Parts Rack)                    │   │
│   │                                                                │   │
│   │   [Play/Pause] [0:08/0:15] [Progress Bar] [Mute/Unmute] [Full] │   │
│   └────────────────────────────────────────────────────────────────┘   │
│                                                                        │
│   [Explore Accessory Rack ↓]    [Enquire on WhatsApp]    [Upload Clip] │
└────────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────┐
│                     Accessory Display Rack                             │
└────────────────────────────────────────────────────────────────────────┘
```

### Visual Identity & Theme
- **Framing**: Precision hairline border (`border-neutral-800`), ambient red neon undertone (`from-red-600/10 via-transparent to-transparent`), and subtle corner accents.
- **Controls**: Minimalist floating controls bar at the bottom of the video player with hover reveals, smooth scrub bar, time indicators, and audio unmute button.
- **Typography**: Header uses bold `Bebas Neue` with `Montserrat` subtitles, maintaining the 60-30-10 color discipline and zero-pill typography.

---

## 3. Key Technical Changes

### 1. `src/components/HeroSection.tsx`
- Replace the 2-column flex layout (`flex-col md:flex-row`) with a full-width centered theater layout.
- Render the `<video>` element with `w-full aspect-video rounded-xl` container, ensuring the entire frame is visible.
- Provide interactive controls:
  - Play / Pause button
  - Unmute / Mute audio button (with active visual feedback)
  - Time elapsed / duration timer
  - Seekable progress scrubber
  - Fullscreen toggle (`requestFullscreen`)
  - Loop toggle (allowing continuous background drift or single play)
  - Built-in drag-and-drop / file selector to upload custom videos dynamically
- Clean action bar below the video with "Explore Accessory Rack", "Direct WhatsApp Fitment", and "Upload New Video".

### 2. `src/App.tsx`
- Remove artificial `scrollY` clamping so users can smoothly navigate between the full-view video hero, the category display rack, and the static catalog.
