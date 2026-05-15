import { Scene } from './components/world/Scene';
import { HUD } from './components/ui/HUD';
import { InteractPrompt } from './components/ui/InteractPrompt';
import { BuildingDialog } from './components/ui/BuildingDialog';

export default function App() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#efeae0]">
      <Scene />
      <HUD />
      <InteractPrompt />
      <BuildingDialog />
    </div>
  );
}
