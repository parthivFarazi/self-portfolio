import { QuickViewDashboard } from '@/components/quick-view/QuickView';

export default function QuickRoute({
  onOpenWorld,
  onBackHome,
}: {
  onOpenWorld: () => void;
  onBackHome: () => void;
}) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#efeae0]">
      <QuickViewDashboard onOpenWorld={onOpenWorld} onBackHome={onBackHome} />
    </div>
  );
}
