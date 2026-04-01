// ============================================================================
// FILE: src/App.tsx
// DESCRIPTION: Adaptive Portfolio System — view router with AnimatePresence
// ============================================================================

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import './styles/global.scss';

import IdentitySelector from './views/IdentitySelector';
import VCView from './views/VCView';
import CTOView from './views/CTOView';
import ClientView from './views/ClientView';
import AmbassadorView from './views/AmbassadorView';
import EventView from './views/EventView';

import type { ViewId } from './data/portfolio';

const viewMap: Record<ViewId, React.ComponentType<{ onBack: () => void }>> = {
  vc: VCView,
  cto: CTOView,
  client: ClientView,
  ambassador: AmbassadorView,
  event: EventView,
};

const transition = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] },
};

function App() {
  const [view, setView] = useState<ViewId | null>(null);
  const CurrentView = view ? viewMap[view] : null;

  return (
    <AnimatePresence mode="wait">
      {CurrentView ? (
        <motion.div key={view} {...transition}>
          <CurrentView onBack={() => setView(null)} />
        </motion.div>
      ) : (
        <motion.div key="selector" {...transition}>
          <IdentitySelector onSelect={setView} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default App;
