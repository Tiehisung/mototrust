import { useState } from "react";
import { GeneralEventsTab } from "./(events)/General";
import { ScoreEventsTab } from "./(events)/Goals";
import { Button } from "@/components/buttons/Button";
import { Trash2, Bandage, Info, Crown } from "lucide-react";

import { IMatch, IMatchEvent, ITeam } from "@/types/match.interface";
import { CardForm } from "../../cards/CardForm";
import { InjuryForm } from "../../injuries/InjuryForm";
import { MVPForm } from "../mvps/MvpForm";
import { Separator } from "@/components/ui/separator";
import { smartToast } from "@/utils/toast";
import { useUpdateMatchMutation } from "@/services/match.endpoints";
import { useAuth } from "@/store/hooks/useAuth";
import { getDeadlineInfo } from "@/lib/timeAndDate";
import "@/styles/win2k.css";

const TABS = [
  { label: "General", icon: <Info className="h-3 w-3" /> },
  { label: "⚽ Goal", icon: null },
  { label: "🟨🟥 Card", icon: null },
  { label: "Injury", icon: <Bandage className="h-3 w-3" /> },
  { label: "MoTM", icon: <Crown className="h-3 w-3" /> },
];

interface IProps {
  opponent?: ITeam;
  match: IMatch;
}

export function MatchEventsAdmin({ opponent, match }: IProps) {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState(0);

  const sortedEvents = match?.events
    ? [...match.events].sort(
        (a, b) => Number(b.minute ?? 0) - Number(a.minute ?? 0),
      )
    : [];

  const isLocked =
    user?.role !== "super_admin" &&
    getDeadlineInfo(match?.date as string, 3).isPassed;

  const tabPanels = [
    <GeneralEventsTab match={match} />,
    <ScoreEventsTab opponent={opponent} match={match} />,
    <CardForm match={match} />,
    <InjuryForm match={match} />,
    <MVPForm match={match} />,
  ];

  return (
    <div className="win2k">
      {/* ── Events Logger header ─────────────────────── */}
      <div className="win2k-section-header" role="heading" aria-level={2}>
        EVENTS LOGGER
      </div>

      {isLocked ? (
        <div
          className="win2k-sunken"
          style={{
            padding: "8px 12px",
            fontFamily: "Tahoma, Arial, sans-serif",
            fontSize: 11,
            color: "#800000",
          }}
        >
          ⛔ Match is closed for updates since{" "}
          {getDeadlineInfo(match?.date as string, 3).deadline}
        </div>
      ) : (
        <div>
          {/* Tab strip */}
          <div className="win2k-tabs" role="tablist">
            {TABS.map((tab, i) => (
              <button
                key={tab.label}
                role="tab"
                aria-selected={activeTab === i}
                className={`win2k-tab ${activeTab === i ? "win2k-tab-active" : ""}`}
                onClick={() => setActiveTab(i)}
                style={{ display: "flex", alignItems: "center", gap: 4 }}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab panel */}
          <div
            className="win2k-tab-panel"
            role="tabpanel"
            aria-label={TABS[activeTab]?.label}
          >
            {tabPanels[activeTab]}
          </div>
        </div>
      )}

      <div className="win2k-separator" style={{ margin: "10px 0" }} />

      {/* ── Events list ───────────────────────────────── */}
      <div className="win2k-section-header" role="heading" aria-level={2}>
        MATCH EVENTS
      </div>

      <div
        className="win2k-sunken"
        style={{ padding: 0 }}
        role="list"
        aria-label="Match events log"
      >
        {sortedEvents.length === 0 ? (
          <div
            style={{
              fontFamily: "Tahoma, Arial, sans-serif",
              fontSize: 11,
              color: "#808080",
              padding: "6px 8px",
            }}
          >
            No events recorded yet.
          </div>
        ) : (
          sortedEvents.map((event, index) => (
            <MatchEventCard event={event} key={index} match={match} />
          ))
        )}
      </div>
    </div>
  );
}

function MatchEventCard({
  match,
  event,
}: {
  match: IMatch;
  event: IMatchEvent;
}) {
  const [updateMatch, { isLoading }] = useUpdateMatchMutation();

  const onDelete = async () => {
    try {
      const result = await updateMatch({
        _id: match?._id,
        events: match?.events?.filter(
          (e) => e.description !== event.description,
        ),
      });
      smartToast(result);
    } catch (error) {
      smartToast({ error });
    }
  };

  return (
    <div className="win2k-list-item" role="listitem">
      {/* Minute */}
      <span
        className="win2k-sunken"
        style={{
          fontFamily: "Courier New, monospace",
          fontWeight: "bold",
          fontSize: 11,
          minWidth: 34,
          textAlign: "center",
          padding: "1px 4px",
          flexShrink: 0,
        }}
      >
        {event?.minute}&apos;
      </span>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontWeight: "bold", fontSize: 11 }}>{event?.title}</div>
        <div style={{ fontSize: 10, color: "inherit", opacity: 0.75 }}>
          {event?.description}
        </div>
      </div>

      <Button
        waiting={isLoading}
        waitingText=""
        onClick={onDelete}
        className="ml-auto"
        variant={"ghost"}
        style={{ padding: "1px 4px" }}
      >
        <Trash2 className="h-3 w-3" style={{ color: "#800000" }} />
      </Button>
    </div>
  );
}
