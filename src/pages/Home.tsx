import { FormEvent, useContext, useState } from "react";
import { CustomButton } from "../components/generic/CustomButton";
import { CustomInput } from "../components/generic/CustomInput";
import { DataContext } from "../context/DataContext";
import { CustomLoader } from "../components/generic/CustomLoader";

export const Home = () => {
  const { handleLeagueIdChange, isReady } = useContext(DataContext);
  const [newLeagueId, setNewLeagueId] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    await handleLeagueIdChange(newLeagueId);
  };

  return (
    <main>
      {loading && !isReady ? (
        <CustomLoader />
      ) : (
        <form
          style={{
            display: "flex",
            flexFlow: "column nowrap",
            alignItems: "center",
            gap: "1rem",
          }}
          onSubmit={onSubmit}
        >
          <CustomInput
            value={newLeagueId}
            onChange={setNewLeagueId}
            placeholder="Enter league id"
          />
          <CustomButton
            buttonText="Load league info"
            onClickButton={() => {}}
            buttonType="submit"
          />
        </form>
      )}
    </main>
  );
};
