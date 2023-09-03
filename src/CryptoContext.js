import React, { useContext, createContext, useEffect, useState } from "react";

const crypto = createContext();

export default function CryptoContext({ children }) {
  const [currency, setCurrency] = useState("INR");
  const [symbol, setSymbol] = useState("₹");

  useEffect(() => {
    if (currency === "INR") setSymbol("₹");
    else if (currency === "USD") setSymbol("$");
  }, [currency]);
  return (
    <crypto.Provider value={{ currency, setCurrency, symbol }}>
      {children}
    </crypto.Provider>
  );
}

export const CryptoState = () => {
  return useContext(crypto);
};
