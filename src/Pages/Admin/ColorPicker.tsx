import React, { useState } from "react";
import { validateColor } from "./Admin";

interface ColorPickerProps {
  initialColor: string;
  primary: boolean;
}

const ColorPicker: React.FC<ColorPickerProps & { onColorChange: (primary: boolean, newValue: string) => void}> = ({
  initialColor,
  onColorChange,
  primary,
}) => {
  const [color, setColor] = useState(validateColor(initialColor));

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value);
    onColorChange(primary, e.target.value); 
  };

  return (
    <div className="w-[100%] h-[100%]" style={{ position: "relative" }}>
      <input
        type="color"
        value={color}
        onChange={handleColorChange}
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          opacity: 0, 
          width: "100%",
          height: "100%",
          cursor: "pointer",
          border: "1px solid #ccc", 
        }}
      />

      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: color, 
          border: "1px solid #ccc",
          cursor: "pointer",
        }}
        onClick={() => {
          const colorInput = document.querySelector('input[type="color"]') as HTMLInputElement;
          colorInput?.click();
        }}
      />
    </div>
  );
};

export default ColorPicker;