import { FormEvent, useState } from "react";
import { Plus, X } from "lucide-react";
import { Input } from "@/components/input/Inputs";

import { EGoalType, IGoal, IMatch, ITeam } from "@/types/match.interface";
import { PrimaryCollapsible } from "@/components/Collapsible";

import {
  useCreateGoalMutation,
  useDeleteGoalMutation,
} from "@/services/goals.endpoints";
import { smartToast } from "@/utils/toast";
import { useGetPlayersQuery } from "@/services/player.endpoints";
import SELECT from "@/components/select/Select";
import { TEAM } from "@/data/team";
import RadioButtons from "@/components/input/Radio";
import { cn } from "@/lib/utils";
import { Button } from "@/components/buttons/Button";
import "@/styles/win2k.css";

interface ScoreEventsTabProps {
  opponent?: ITeam;
  match: IMatch;
}

export function ScoreEventsTab({ match }: ScoreEventsTabProps) {
  const { data: playersData } = useGetPlayersQuery("");

  const players = playersData?.data || [];
  const [addGoal, { isLoading }] = useCreateGoalMutation();
  const [form, setForm] = useState({
    scorer: "",
    assist: "",
    minute: "",
    description: "",
    modeOfScore: EGoalType.OPEN_PLAY,
    teamId: TEAM._id,
  });

  const teams = [
    { label: TEAM.alias, value: TEAM._id },
    { label: match.opponent.alias || "Opponent", value: match.opponent._id },
  ];

  const handleAddGoal = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      if (!form.minute)
        return smartToast({
          message: "Please specify the time in minutes, and description",
        });

      const scorer = players.find((p) => p._id === form.scorer);
      const assistBy = form.assist
        ? players.find((p) => p._id === form.assist)
        : undefined;

      const assist = assistBy
        ? {
            _id: assistBy?._id,
            name: [assistBy?.lastName, assistBy?.firstName]
              .filter(Boolean)
              .join(" "),
            avatar: assistBy?.avatar,
            number: assistBy?.number,
          }
        : undefined;

      let newGoal: any = {
        minute: Number.parseInt(form.minute),
        description: `⚽ ${form.description}`,
        modeOfScore: "Open Play Goal",
        match: match?._id,
        teamId: form.teamId,
      };

      if (form.teamId == TEAM._id && scorer) {
        newGoal = {
          ...newGoal,
          scorer: {
            _id: scorer?._id,
            name: `${scorer?.lastName} ${scorer?.firstName}`,
            avatar: scorer?.avatar,
            number: scorer?.number,
          },
        };

        if (form.assist) {
          newGoal = { ...newGoal, assist };
        }
      }

      const results = await addGoal(newGoal).unwrap();

      if (results.success)
        setForm({
          scorer: "",
          assist: "",
          minute: "",
          description: "",
          modeOfScore: EGoalType.OPEN_PLAY,
          teamId: "",
        });
      smartToast(results);
    } catch (error) {
      smartToast({ error });
    }
  };

  return (
    <div className={`win2k ${isLoading ? "pointer-events-none" : ""}`} style={{ padding: 4 }}>
      <div className="win2k-groupbox" role="form" aria-label="Add Goal">
        <legend>Add Goal</legend>

        <form onSubmit={handleAddGoal} style={{ display: "flex", flexDirection: "column", gap: 8, paddingTop: 6 }}>
          <div style={{ borderBottom: "1px solid #808080", paddingBottom: 6, marginBottom: 4 }}>
            <span style={{ fontFamily: "Tahoma, Arial, sans-serif", fontSize: 12, fontWeight: "bold" }}>
              ⚽ Add Goal
            </span>
          </div>

          <SELECT
            label="Team"
            options={match.isHome ? teams : teams.reverse()}
            placeholder="Select Team"
            className="grid mb-3"
            onChange={(id) => setForm((prev) => ({ ...prev, teamId: id }))}
            value={form.teamId}
            required
          />

          <Input
            type="number"
            others={{ min: "0", max: "120" }}
            placeholder="e.g., 45"
            value={form.minute}
            required
            onChange={(e) =>
              setForm((prev) => ({ ...prev, minute: e.target.value }))
            }
            name={"goalMinute"}
            label="Minute"
          />

          <Input
            placeholder="e.g., VAR Review, Penalty Decision, etc."
            value={form.description}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
            name={"goalDescription"}
            label="Comment"
          />

          {form.teamId === TEAM._id && (
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <SELECT
                label="Scorer"
                options={players?.map((p) => ({
                  label: `${p.lastName} ${p?.firstName}(${p?.number ?? p?.number})`,
                  value: p._id,
                }))}
                placeholder="Scored by"
                className="grid"
                onChange={(id) => setForm((prev) => ({ ...prev, scorer: id }))}
                value={form.scorer}
              />

              <SELECT
                label="Assist (Optional)"
                options={players?.map((p) => ({
                  label: `${p.lastName} ${p?.firstName}(${p?.number ?? p?.number})`,
                  value: p._id,
                }))}
                placeholder="Assisted by"
                className="grid"
                onChange={(id) => setForm((prev) => ({ ...prev, assist: id }))}
                value={form.assist}
                disabled={!form.scorer}
              />
            </div>
          )}

          <PrimaryCollapsible
            header={{
              label: `Goal Type (${form.modeOfScore})`,
              className: "win2k-label",
            }}
          >
            <RadioButtons
              defaultValue={EGoalType.OPEN_PLAY}
              setSelectedValue={(value) =>
                setForm((prev) => ({
                  ...prev,
                  modeOfScore: value as EGoalType,
                }))
              }
              values={Object.values(EGoalType)}
              label=""
              wrapperStyles="flex gap-3 items-center flex-wrap"
            />
          </PrimaryCollapsible>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: 6, marginTop: 4 }}>
            <button
              type="submit"
              className={`win2k-btn win2k-btn-primary win2k-btn-default ${isLoading ? "win2k-disabled" : ""}`}
              disabled={isLoading}
            >
              <Plus size={12} />
              {isLoading ? "Adding Goal..." : "Add Goal"}
            </button>
          </div>
        </form>

        {/* Goals list */}
        <div className="win2k-separator" style={{ margin: "10px 0" }} />
        <PrimaryCollapsible
          header={{
            label: "All Goals",
            className: "win2k-label",
          }}
          defaultOpen
        >
          <div
            className={cn(
              "flex items-center gap-2 flex-wrap pt-2",
              isLoading ? "opacity-70 pointer-events-none cursor-wait" : "",
            )}
          >
            {match?.goals?.map((goal) => (
              <Goal goal={goal} key={goal._id} />
            ))}
          </div>
        </PrimaryCollapsible>
      </div>
    </div>
  );
}

function Goal({ goal }: { goal: IGoal }) {
  const [deleteGoal, { isLoading }] = useDeleteGoalMutation();

  const handleRemoveGoal = async (goal: IGoal) => {
    try {
      const result = await deleteGoal(goal?._id as string).unwrap();
      smartToast(result);
    } catch (error) {
      smartToast({ error });
    }
  };

  const isTeamGoal = goal.teamId === TEAM._id;

  return (
    <div
      className="win2k-raised"
      style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        padding: "2px 6px",
        fontFamily: "Tahoma, Arial, sans-serif",
        fontSize: 11,
        color: isTeamGoal ? "#000080" : "#800000",
      }}
      key={goal._id}
    >
      <span style={{ fontFamily: "Courier New, monospace", fontWeight: "bold" }}>
        {goal.minute}&apos;
      </span>
      <span>
        {isTeamGoal
          ? goal.scorer?.name || `${TEAM.alias} Player`
          : "Opponent"}
      </span>
      <Button
        onClick={() => handleRemoveGoal(goal)}
        size="sm"
        variant={"ghost"}
        waiting={isLoading}
        waitingText={"..."}
        style={{ padding: "1px 3px", minWidth: "auto" }}
      >
        <X size={10} />
      </Button>
    </div>
  );
}
