import React, { useState } from "react";

// Read PIN code from .env via VITE_PIN_CODE
const PIN_CODE = import.meta.env.VITE_PIN_CODE;

import DefaultLayout from "@/layouts/default";

export default function ResumePage() {
  const [pin, setPin] = useState("");
  const [authenticated, setAuthenticated] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === PIN_CODE) {
      setAuthenticated(true);
    } else {
      alert("Invalid PIN");
    }
  };

  return (
    <DefaultLayout>
      {authenticated ? (
        <div>{/* TODO: Resume content */}</div>
      ) : (
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
          <label htmlFor="pin">Enter PIN to view resume:</label>
          <input
            className="border p-2 rounded"
            id="pin"
            type="password"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white p-2 rounded mt-2"
            type="submit"
          >
            Submit
          </button>
        </form>
      )}
    </DefaultLayout>
  );
}
