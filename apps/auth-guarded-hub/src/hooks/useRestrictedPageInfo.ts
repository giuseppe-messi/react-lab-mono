import { useEffect, useState } from "react";
import axios from "axios";

type Block = {
  payload: any;
  minTier: number;
};
type PagePayload = { slug: string; blocks: Block[] };

type Status = "loading" | "ok" | "error";

export const useRestrictedPageInfo = (slug: string) => {
  const [data, setData] = useState<PagePayload | null>(null);
  const [status, setStatus] = useState<Status>("loading");

  useEffect(() => {
    let mounted = true;
    setStatus("loading");
    axios
      .get<PagePayload>("/api/restrictedPageInfo", { params: { slug } })
      .then((r) => {
        if (mounted) {
          setData(r.data);
          setStatus("ok");
        }
      })
      .catch(() => {
        setStatus("error");
      });
    return () => {
      mounted = false;
    };
  }, [slug]);

  return { data, status };
};
