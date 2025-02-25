import { useEffect } from "react";

const ElfsightChat = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://static.elfsight.com/platform/platform.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div
      className="elfsight-app-fca1658e-8c9f-4073-ab00-1538e76150ad"
      data-elfsight-app-lazy
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        zIndex: 9999, // Ensures it's above other elements
      }}
    ></div>
  );
};

export default ElfsightChat;
