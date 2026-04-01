import { ConfirmDialog } from "@/components/Confirm-dialog";
import { shortText } from "@/lib";
import { EMatchStatus, IMatch, ITeam } from "@/types/match.interface";
import { UpdateFixtureMatch } from "../CreateFixture";
import { DIALOG } from "@/components/Dialog";
import SquadCard from "../../squad/SquadCard";
import SquadForm from "../../squad/SquadForm";
import {
  useUpdateMatchMutation,
  useDeleteMatchMutation,
} from "@/services/match.endpoints";
import { smartToast } from "@/utils/toast";
import { fireEscape } from "@/hooks/Esc";
import "@/styles/win2k.css";

interface Props {
  match: IMatch;
  teams: ITeam[];
}

const MatchActions = ({ match, teams }: Props) => {
  const status = match?.status;
  const [updateMatch] = useUpdateMatchMutation();
  const [deleteMatch] = useDeleteMatchMutation();

  const handleStatusUpdate = async (newStatus: "LIVE" | "FT") => {
    try {
      const result = await updateMatch({
        _id: match._id,
        status: newStatus as EMatchStatus,
      }).unwrap();

      smartToast(result);
      fireEscape();
    } catch (error) {
      smartToast({ error });
    }
  };

  const handleDelete = async () => {
    try {
      const result = await deleteMatch(match._id).unwrap();
      if (result.success) window.location.href = "/admin/matches";
      smartToast(result);
      fireEscape();
    } catch (error) {
      smartToast({ error });
    }
  };

  return (
    <div className="win2k-groupbox" role="group" aria-label="Match Actions">
      <legend>Match Actions</legend>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          flexWrap: "wrap",
          paddingTop: 4,
        }}
      >
        <UpdateFixtureMatch
          teams={teams}
          fixture={match}
          variant={"outline"}
        />

        {match?.squad ? (
          <DIALOG
            trigger="Squad"
            title=""
            className="min-w-[80vw]"
            variant="outline"
          >
            <SquadCard match={match} />
          </DIALOG>
        ) : (
          <DIALOG
            trigger="Choose Squad"
            variant="ghost"
            size="sm"
            title={`SQUAD for ${match?.title}`}
            className="min-w-[80vw]"
          >
            <SquadForm defaultMatch={match} />
          </DIALOG>
        )}

        {status === "UPCOMING" && (
          <ConfirmDialog
            description={`Are you sure you want this match to go live? \n <i>${
              match?.title ?? ""
            }</i>`}
            onConfirm={() => handleStatusUpdate("LIVE")}
            trigger="▶ Go Live"
            triggerStyles="win2k-btn win2k-btn-primary"
            variant="destructive"
            title={`Start ${match?.title}`}
          />
        )}

        {status === "LIVE" && (
          <ConfirmDialog
            description={`Do you want to finish this match? \n <i>${
              match?.title ?? ""
            }</i>`}
            onConfirm={() => handleStatusUpdate("FT")}
            trigger="■ End Live"
            triggerStyles="win2k-btn win2k-btn-danger"
            variant="destructive"
            title={`End | ${match?.title}`}
          />
        )}

        <ConfirmDialog
          trigger="✕ Delete"
          onConfirm={handleDelete}
          variant="destructive"
          title={shortText(match?.title ?? "Match")}
          description={`Are you sure you want to delete "<b>${shortText(
            match?.title ?? "Match",
            40,
          )}</b>"?`}
        />
      </div>
    </div>
  );
};

export default MatchActions;
