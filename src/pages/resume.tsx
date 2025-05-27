import React, { useState } from 'react';
// Read PIN code from .env via VITE_PIN_CODE
const PIN_CODE = import.meta.env.VITE_PIN_CODE;
import DefaultLayout from '@/layouts/default';

export default function ResumePage() {
  const [pin, setPin] = useState('');
  const [authenticated, setAuthenticated] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === PIN_CODE) {
      setAuthenticated(true);
    } else {
      alert('Invalid PIN');
    }
  };

  return (
    <DefaultLayout>
      {authenticated ? (
        <div>
          {/* TODO: Resume content */}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <label htmlFor="pin">Enter PIN to view resume:</label>
          <input
            id="pin"
            type="password"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            className="border p-2 rounded"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded mt-2"
          >
            Submit
          </button>
        </form>
      )}
    </DefaultLayout>
  );
}
