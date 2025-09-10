import { cn } from "@/lib/utils";
import { useLanguage } from '../hooks/useLanguage';

// Empty component
export default function Empty() {
  const { t } = useLanguage();
  
  return (
    <div className={cn("flex h-full items-center justify-center")}>
      <div className="text-center">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">{t('emptyTitle')}</h2>
        <p className="text-gray-500">{t('emptyDescription')}</p>
      </div>
    </div>
  );
}