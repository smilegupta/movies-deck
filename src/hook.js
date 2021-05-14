/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";

export default function useIntersectionObserver({
  target,
  onIntersect,
  enabled = true,
}) {
  useEffect(() => {
    if (!enabled) {
      return;
    }

    const observer = new IntersectionObserver((entries) =>
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          onIntersect();
        }
      })
    );

    const el = target && target.current;

    if (!el) {
      return;
    }

    observer.observe(el);
    return () => {
      observer.unobserve(el);
    };
  }, [target.current, enabled]);
}
