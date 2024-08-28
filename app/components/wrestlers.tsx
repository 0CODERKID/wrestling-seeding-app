// pages/wrestlers.tsx
import React, { useState, useEffect } from "react";
import { getWrestlers } from "../api/wrestler.controller";

async function getWrestlers() {
  const wrestlers = await getWrestlers();
  return wrestlers;
}

function Wrestlers() {
  const [wrestlers, setWrestlers] = useState([]);

  useEffect(() => {
    getWrestlers().then((wrestlers) => setWrestlers(wrestlers));
  }, []);

  return (
    <div>
      <h1>Wrestlers</h1>
      <ul>
        {wrestlers.map((wrestler) => (
          <li key={wrestler._id}>{wrestler.fullName}</li>
        ))}
      </ul>
    </div>
  );
}

export default Wrestlers;