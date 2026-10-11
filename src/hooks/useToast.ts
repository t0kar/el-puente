import { useRef, useState } from "react";

/** const toast = useToast(); toast.show("…"); <Toast msg={toast.msg} /> */
export const useToast = () => {
  const [msg, setMsg] = useState<string | null>(null);
  const t = useRef<number>();
  const show = (m: string) => {
    setMsg(m);
    window.clearTimeout(t.current);
    t.current = window.setTimeout(() => setMsg(null), 2200);
  };
  return { msg, show };
};
