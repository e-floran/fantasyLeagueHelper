import { Dispatch, ReactElement, SetStateAction } from "react";

export const TeamSelect = ({
  selectName,
  setTeam,
}: {
  selectName: string;
  setTeam: Dispatch<SetStateAction<string>>;
}): ReactElement => {
  return (
    <select
      name={selectName}
      onChange={(event) => setTeam(event.target.value)}
    ></select>
  );
};
