import React from "react";

export default function RatingForm({ value, onChange }) {
  return (
    <div>
      <input
        type="number"
        min="1"
        max="5"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="Rate 1-5"
      />
    </div>
  );
}
