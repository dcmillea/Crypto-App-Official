import { useState, useEffect } from "react";

function useDeviceType() {
  const [deviceType, setDeviceType] = useState(null);

  useEffect(() => {
    function handleResize() {
      const width = window.innerWidth;
      if (width <= 768) {
        setDeviceType("mobile");
      } else {
        setDeviceType("desktop");
      }
    }

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return deviceType;
}

export default useDeviceType;
