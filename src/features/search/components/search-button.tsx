"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { useTranslations } from "next-intl";
import { SearchDialog } from "@/features/search/components/search-dialog";

export function SearchButton() {
  const [open, setOpen] = useState(false);
  const t = useTranslations("nav");

  return (
    <>
      <button
        type="button"
        aria-label={t("search")}
        onClick={() => setOpen(true)}
        className="flex size-9 items-center justify-center rounded-lg hover:bg-muted"
      >
        <Search className="size-4" aria-hidden="true" />
      </button>
      {open && <SearchDialog onClose={() => setOpen(false)} />}
    </>
  );
}
