import { useContext, useState } from "react";
import { CustomButton } from "../components/generic/CustomButton";
import { CustomInput } from "../components/generic/CustomInput";
import { DataContext } from "../context/DataContext";
import { leagueInit } from "../scripts/leagueInit";

export const Home = () => {
  const { leagueId, handleLeagueIdChange } = useContext(DataContext);
  const [newLeagueId, setNewLeagueId] = useState("");
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
          value={newLeagueId}
          onChange={setNewLeagueId}
          placeholder="Enter league id"
        />
        <CustomButton
          buttonText="Load league info"
          onClickButton={() => {
            handleLeagueIdChange(newLeagueId);
          }}
        />
      </form>
      <CustomButton
        buttonText="Init test"
        onClickButton={() => leagueInit(leagueId)}
      />
    </main>
  );
};
