# Invisible Window

A webcam-based augmented reality experiment that creates a transparent window illusion. This React app uses your device's camera to make the browser window appear transparent, with UI elements floating like holograms over the camera feed.

![Invisible Window Demo](https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6)

## How It Works

The transparency illusion is created through clever positioning mathematics:

1. **Video Size = Screen Size**: The webcam feed is sized to match your physical monitor dimensions
2. **Video Position = Negative Window Position**: The video is offset by the inverse of the browser window's screen coordinates
3. **Result**: As you move the window around, the video stays fixed relative to your screen, creating the illusion you're looking through glass

### Multi-Window Sync

Open multiple windows and they'll all sync their visual filters in real-time using the `BroadcastChannel` API. Change a filter in one window, and all windows update simultaneously.

## Features

- Real-time transparent window effect using webcam
- Multiple visual filters (Grayscale, Sepia, Invert, Blur, Contrast)
- Cross-window synchronization via BroadcastChannel
- High-performance rendering with requestAnimationFrame
- GPU-accelerated positioning
- Collapsible floating control panel

## Getting Started

**Prerequisites:** Node.js

1. Clone the repository:
   ```bash
   git clone https://github.com/ilyastorunn/invisible-window.git
   cd invisible-window
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file and add your Gemini API key:
   ```
   GEMINI_API_KEY=your_api_key_here
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open `http://localhost:3000` in your browser and allow camera permissions

6. **Try opening multiple windows** to see the filter sync in action!

## Available Commands

- `npm run dev` - Start development server (runs on port 3000)
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **BroadcastChannel API** - Cross-window communication
- **MediaDevices API** - Camera access

## Browser Compatibility

Requires a modern browser with support for:
- `getUserMedia` (camera access)
- `BroadcastChannel` (multi-window sync)
- CSS filters

Tested on Chrome, Edge, and Safari.

## License

MIT

## Credits

Built with [Claude Code](https://claude.com/claude-code)
