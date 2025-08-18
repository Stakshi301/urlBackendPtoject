import React from "react";
import RatingForm from "./RatingForm";

export default function StoreList({ stores, ratings, onRate }) {
  return (
    <div>
      <h2>Stores</h2>
      {stores.map(store => (
        <div key={store.id} className="store-card">
          <h3>{store.name}</h3>
          <p>{store.address}</p>
          <p>Overall Rating: {store.rating}</p>
          <p>Your Rating: {ratings[store.id] || "Not rated yet"}</p>
          <RatingForm
            value={ratings[store.id] || ""}
            onChange={value => onRate(store.id, value)}
          />
        </div>
      ))}
    </div>
  );
}
