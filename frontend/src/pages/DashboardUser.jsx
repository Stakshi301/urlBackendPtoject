import { useEffect, useState } from "react";
import axios from "axios";

function DashboardUser() {
  const [stores, setStores] = useState([]);
  const [ratings, setRatings] = useState({}); // { storeId: { avgRating, userRating } }
  const token = localStorage.getItem("token");

  // Fetch stores
  useEffect(() => {
    const fetchStores = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/stores", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStores(data);

        // For each store, fetch ratings
        data.forEach((store) => fetchStoreRatings(store._id));
      } catch (error) {
        console.error("Error fetching stores:", error);
      }
    };

    fetchStores();
  }, [token]);

  // Fetch store ratings
  const fetchStoreRatings = async (storeId) => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/stores/${storeId}/ratings`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Find if current user has rated
      const userId = JSON.parse(atob(token.split(".")[1])).userId; // decode JWT payload
      const userRating = data.ratings.find((r) => r.user._id === userId);

      setRatings((prev) => ({
        ...prev,
        [storeId]: {
          avgRating: data.avgRating,
          userRating: userRating ? userRating.rating : null,
        },
      }));
    } catch (error) {
      console.error("Error fetching ratings:", error);
    }
  };

  // Submit rating
  const handleRate = async (storeId, rating) => {
  try {
    await axios.post(
      `http://localhost:5000/stores/${storeId}/rating`,
      { rating }, // <-- use the argument
      { headers: { Authorization: `Bearer ${token}` } }
    );

    fetchStoreRatings(storeId); // refresh after submit
  } catch (error) {
    console.error("Error submitting rating:", error.response?.data || error.message);
  }
};


  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Available Stores</h2>
      <div className="grid gap-4">
        {stores.map((store) => (
          <div
            key={store._id}
            className="border p-4 rounded shadow-md flex flex-col gap-2"
          >
            <h3 className="font-semibold">{store.name}</h3>
            <p>{store.address}</p>
            <p>
              ⭐ Average Rating:{" "}
              {ratings[store._id]?.avgRating
                ? ratings[store._id].avgRating.toFixed(1)
                : "No ratings yet"}
            </p>
            <div className="flex items-center gap-2">
              <select
                value={ratings[store._id]?.userRating || ""}
                onChange={(e) => handleRate(store._id, Number(e.target.value))}
                className="border p-1 rounded"
              >
                <option value="">Rate this store</option>
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>
                    {num} ⭐
                  </option>
                ))}
              </select>
              {ratings[store._id]?.userRating && (
                <span className="text-sm text-green-600">
                  Your rating: {ratings[store._id].userRating} ⭐
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DashboardUser;
