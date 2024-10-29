import { CircleDot } from "lucide-react";
import { useTranslation } from "react-i18next";

export const ColorLegend = () => {
  const { t } = useTranslation();
  
  return (
    <div className="flex gap-4 text-xs text-gray-600 items-center">
      <div className="flex items-center gap-1">
        <CircleDot className="w-3 h-3 text-teal-500 fill-teal-500" />
        <span>{t("correctPosition")}</span>
      </div>
      <div className="flex items-center gap-1">
        <CircleDot className="w-3 h-3 text-amber-500 fill-amber-500" />
        <span>{t("wrongPosition")}</span>
      </div>
    </div>
  );
};