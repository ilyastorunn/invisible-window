# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Invisible Window is a webcam-based augmented reality experiment that creates a transparent window illusion. The app uses the device's camera to display the background, making the browser window appear transparent. UI elements appear as floating holograms over the camera feed.

## Development Commands

**Start dev server:**
```bash
npm run dev
```
Server runs on `http://localhost:3000` (configured in vite.config.ts)

**Build for production:**
```bash
npm run build
```

**Preview production build:**
```bash
npm run preview
```

**Setup:**
1. `npm install`
2. Set `GEMINI_API_KEY` in `.env.local` (required for the app, though currently unused in the codebase)

## Core Architecture

### The Transparency Illusion

The app creates a "transparent window" effect through mathematical positioning:

1. **Video Size = Screen Size**: The video element is sized to match the physical monitor dimensions (`window.screen.width` × `window.screen.height`)
2. **Video Position = Negative Window Position**: The video is offset by `-window.screenX` and `-window.screenY` to align with the monitor's top-left corner
3. **Result**: As you move the browser window, the video stays fixed relative to the screen, creating the illusion that you're looking through the window

This is implemented in `GhostOverlay.tsx:48-84` using `requestAnimationFrame` for smooth, high-performance position updates.

### Component Structure

**App.tsx** - Root component
- `GhostOverlay` (z-index: -1) - The transparent background video layer
- `Controls` (z-index: 50) - Floating control panel UI

**GhostOverlay.tsx** - The core transparency component
- Requests camera with ideal resolution matching screen size (line 20-26)
- Runs a `requestAnimationFrame` loop to continuously update video position based on `window.screenX/Y` (line 48-84)
- Applies CSS filters for visual effects
- Uses `translate3d` for GPU-accelerated positioning (line 73)

**Controls.tsx** - Interactive control panel
- Collapsible UI for filter selection
- Broadcasts filter changes via `useBroadcastSync` hook
- Shows instructional info about screen coordinate syncing

### Multi-Window Synchronization

**useBroadcastSync.ts** - Cross-window state synchronization
- Uses `BroadcastChannel` API to sync filter state across multiple browser windows/tabs
- Channel name: `'invisible_window_sync'`
- When filter changes in one window, all windows receive the update via `bc.onmessage`
- This allows multiple "transparent windows" to have synchronized visual effects

**types.ts** - Shared types
- `VideoFilter` enum defines available CSS filters
- `SyncMessage` interface for BroadcastChannel messages

## Technical Notes

- **Camera permissions required**: The app requests `video` with high resolution (screen dimensions) and 60fps frame rate
- **GPU acceleration**: Uses `translate3d` and `will-change` for performance
- **Tailwind CSS**: Uses utility classes for styling (no separate CSS files)
- **React 19**: Uses latest React with hooks
- **Vite**: Dev server with HMR, configured to expose `GEMINI_API_KEY` as `process.env.API_KEY` and `process.env.GEMINI_API_KEY`

## Key Files

- `GhostOverlay.tsx` - Core transparency illusion logic
- `useBroadcastSync.ts` - Multi-window synchronization
- `types.ts` - Filter definitions and messaging types
- `vite.config.ts` - Dev server (port 3000) and environment variable configuration
- `metadata.json` - Declares camera permissions requirement
