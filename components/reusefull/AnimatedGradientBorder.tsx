'use client'
import React , {useRef , useEffect, CSSProperties } from "react";

export const AnimatedGradientBorder : React.FC<{
    children: React.ReactNode;
    rounded : string;
  }> = ({ children , rounded }) => {
    const boxRef = useRef<HTMLDivElement>(null);
  
    useEffect(() => {
      const boxElement = boxRef.current;
  
      if (!boxElement) {
        return;
      }
  
      const updateAnimation = () => {
        const angle =
          (parseFloat(boxElement.style.getPropertyValue("--angle")) + 0.5) % 360;
        boxElement.style.setProperty("--angle", `${angle}deg`);
        requestAnimationFrame(updateAnimation);
      };
  
      requestAnimationFrame(updateAnimation);
    }, []);
  
    return (
      <div
        ref={boxRef}
        style={
          {
            "--angle": "0deg",
            "--border-color": "linear-gradient(var(--angle), var(--primary) , black )",
            "--bg-color": "linear-gradient(#131219, #131219)",
            borderRadius:rounded ,
          } as CSSProperties
        }
        className="flex border border-[#0000] [background:padding-box_var(--bg-color),border-box_var(--border-color)]"
      >
        {children}
      </div>
    );
  };
  