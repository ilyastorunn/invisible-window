import React from 'react';
import GhostOverlay from './components/GhostOverlay';
import Controls from './components/Controls';
import { useBroadcastSync } from './hooks/useBroadcastSync';

const App: React.FC = () => {
  const { filter, setFilter } = useBroadcastSync();

  return (
    <div className="relative min-h-screen font-sans antialiased selection:bg-white/30 selection:text-white">
      {/* 
        The GhostOverlay is the "background" of our app.
        It sits fixed behind everything and adjusts its internal video position
        to match the physical screen.
      */}
      <GhostOverlay filter={filter} />

      {/* 
        Foreground Content
        We can put anything here. Since the background is "transparent" (webcam),
        UI elements will look like floating holograms.
      */}
      <Controls currentFilter={filter} onFilterChange={setFilter} />

      {/* 
        Instructional Overlay (fades out after a few seconds purely via CSS animation usually, 
        but we'll keep it simple and static or part of Controls)
      */}
    </div>
  );
};

export default App;