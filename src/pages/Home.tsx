import { useState } from "react";
import { CustomButton } from "../components/generic/CustomButton";
import { CustomInput } from "../components/generic/CustomInput";

export const Home = () => {
  const [leagueId, setLeagueId] = useState("");
  return (
    <main>
      <form
        style={{
          display: "flex",
          flexFlow: "column nowrap",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <CustomInput
          value={leagueId}
          onChange={setLeagueId}
          placeholder="Enter league id"
        />
        <CustomButton buttonText="Load league info" onClickButton={() => {}} />
      </form>
    </main>
  );
};
