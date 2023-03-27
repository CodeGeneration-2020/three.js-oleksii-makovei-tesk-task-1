import { useEffect, useRef } from "react";

function useArrowKeys(callback: (value: any) => any) {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    function handleKeyDown(event: any) {
      if (
        event.code === "ArrowUp" ||
        event.code === "ArrowDown" ||
        event.code === "ArrowLeft" ||
        event.code === "ArrowRight"
      ) {
        callbackRef.current(event.code);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
}

export default useArrowKeys;
