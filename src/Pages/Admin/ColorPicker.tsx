import React, { useState } from "react";

interface ColorPickerProps {
  initialColor: string;
  primary: boolean;
}

function validateColor2(color: string): string {
  const tempDiv = document.createElement("div");
  tempDiv.style.color = color;
  document.body.appendChild(tempDiv);
  const computedColor = window.getComputedStyle(tempDiv).color;
  document.body.removeChild(tempDiv);

  const match = computedColor.match(/\d+/g);
  if (match && match.length >= 3) {
    const [r, g, b] = match.map(Number);
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
  }
  return "#000000"; 
}

const ColorPicker: React.FC<ColorPickerProps & { onColorChange: (primary: boolean, newValue: string) => void }> = ({
  initialColor,
  onColorChange,
  primary,
}) => {
  const [color, setColor] = useState(validateColor2(initialColor));

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setColor(newColor);
    onColorChange(primary, newColor);
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