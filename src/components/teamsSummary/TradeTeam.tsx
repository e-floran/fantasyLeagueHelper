import {
  CSSProperties,
  Dispatch,
  ReactElement,
  SetStateAction,
  useMemo,
  useState,
} from "react";
import { createStyles } from "../../utils/style";
import { TeamDetailsData } from "../../utils/types";

interface TradeTeamProps {
  dataByTeamId: Map<number, TeamDetailsData>;
  setTeam: Dispatch<SetStateAction<number>>;
  teamId: number;
}

export const TradeTeam = ({
  dataByTeamId,
  setTeam,
  teamId,
}: TradeTeamProps): ReactElement => {
  const styles = createStyles<CSSProperties>()({
    article: {
      width: "50%",
      display: "flex",
      flexFlow: "column nowrap",
      justifyContent: "start",
      alignItems: "center",
    },
  });
  const [selectedPlayers, setSleectedPlayers] = useState<number[]>([]);

  const selectOptionsRendering = () => {
    const options: ReactElement[] = [
      <option key="0" value="0">
        Choisissez
      </option>,
    ];
    dataByTeamId.forEach((value) => {
      const option = (
        <option key={value.team.id} value={value.team.id}>
          {value.team.name}
        </option>
      );
      options.push(option);
    });
    return options;
  };

  const activeTeamPlayers = useMemo(() => {
    return dataByTeamId.get(teamId)?.team.roster;
  }, [dataByTeamId, teamId]);

  const handleCheckboxClick = (playerId: number) => {
    if (selectedPlayers.includes(playerId)) {
      setSleectedPlayers((prev) => prev.filter((id) => id !== playerId));
    } else if (selectedPlayers.length < 6) {
      setSleectedPlayers((prev) => [...prev, playerId]);
    }
  };

  return (
    <article style={styles.article}>
      <h2>Équipe 1</h2>
      <select
        name="equipe_1"
        onChange={(event) => setTeam(Number(event.target.value))}
        value={teamId}
      >
        {selectOptionsRendering()}
      </select>
      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Salaire</th>
            <th>Choisir</th>
          </tr>
        </thead>
        <tbody>
          {activeTeamPlayers?.map((player) => {
            return (
              <tr>
                <td>{player.fullName}</td>
                <td>{player.keeperValue}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedPlayers.includes(player.id)}
                    onChange={() => handleCheckboxClick(player.id)}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </article>
  );
};
