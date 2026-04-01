import { IMatch, ITeam } from "@/types/match.interface";
import { checkTeams, checkMatchMetrics } from "@/lib/compute/match";
import { MatchEventsAdmin } from "../live-match/EventsUpdator";
import MatchActions from "./Actions";
import { useParams } from "react-router-dom";
import { useGetMatchQuery } from "@/services/match.endpoints";
import { useGetTeamsQuery } from "@/services/team.endpoints";
import { AVATAR } from "@/components/ui/avatar";
import { useIsMobile } from "@/hooks/use-mobile";
import PageLoader from "@/components/loaders/Page";
import DataErrorAlert from "@/components/error/DataError";
import { getErrorMessage } from "@/lib/error";
import { formatDate } from "@/lib/timeAndDate";
import "@/styles/win2k.css";

function StatusBadge({ status }: { status?: string }) {
  const cls =
    status === "LIVE"
      ? "win2k-badge-live"
      : status === "FT"
        ? "win2k-badge-ft"
        : "win2k-badge-upcoming";
  return <span className={cls}>{status ?? "UPCOMING"}</span>;
}

export default function MatchPage() {
  const slug = useParams().matchSlug;

  const {
    data: matchData,
    isLoading: matchLoading,
    error,
  } = useGetMatchQuery(slug || "");

  const { data: teamsData, isLoading: teamsLoading } = useGetTeamsQuery({});
  const match = matchData?.data;

  const { home, away } = checkTeams(match);
  const matchMetrics = checkMatchMetrics(match);
  const isMobile = useIsMobile();
  const isLoading = matchLoading || teamsLoading;
  const teams = teamsData;

  if (isLoading) {
    return (
      <div className="container mx-auto p-4 _page win2k">
        <div className="flex justify-center items-center min-h-100">
          <PageLoader />
        </div>
      </div>
    );
  }

  if (!match) {
    return (
      <div className="container mx-auto p-4 _page win2k">
        <DataErrorAlert message={getErrorMessage(error)} />
      </div>
    );
  }

  return (
    <div className="win2k" style={{ minHeight: "100%", padding: "8px" }}>
      {/* ── Window chrome ─────────────────────────────── */}
      <div className="win2k-window" style={{ maxWidth: 900, margin: "0 auto" }}>
        {/* Title bar */}
        <div className="win2k-titlebar">
          {/* Soccer ball icon (simple SVG) */}
          <svg
            className="win2k-titlebar-icon"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
          >
            <circle cx="8" cy="8" r="7" fill="#fff" stroke="#ccc" strokeWidth="1" />
            <polygon points="8,3 9.5,6 8,7.5 6.5,6" fill="#222" />
            <polygon points="8,13 9.5,10 8,8.5 6.5,10" fill="#222" />
            <polygon points="3,8 6,6.5 7.5,8 6,9.5" fill="#222" />
            <polygon points="13,8 10,6.5 8.5,8 10,9.5" fill="#222" />
          </svg>
          <span style={{ fontSize: 11, fontWeight: "bold" }}>
            {match?.title} — Match Admin
          </span>
          <div className="win2k-titlebar-buttons">
            <div className="win2k-titlebar-btn" title="Minimize">_</div>
            <div className="win2k-titlebar-btn" title="Maximize">□</div>
            <div className="win2k-titlebar-btn" title="Close" style={{ fontWeight: "bold" }}>✕</div>
          </div>
        </div>

        {/* Menu bar */}
        <div className="win2k-menubar" role="menubar">
          <span className="win2k-menuitem" role="menuitem">
            <u>F</u>ile
          </span>
          <span className="win2k-menuitem" role="menuitem">
            <u>E</u>dit
          </span>
          <span className="win2k-menuitem" role="menuitem">
            <u>V</u>iew
          </span>
          <span className="win2k-menuitem" role="menuitem">
            <u>M</u>atch
          </span>
          <span className="win2k-menuitem" role="menuitem">
            <u>H</u>elp
          </span>
        </div>

        {/* Client area */}
        <div className="win2k-client">
          {/* ── Header info ───────────────────────────── */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 8,
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                fontFamily: "Tahoma, Arial, sans-serif",
                fontSize: 13,
                fontWeight: "bold",
              }}
            >
              {match?.title}
            </span>
            <StatusBadge status={match?.status} />
            <span
              style={{
                fontFamily: "Tahoma, Arial, sans-serif",
                fontSize: 11,
                color: "#444",
                marginLeft: "auto",
              }}
            >
              {formatDate(match?.date)}
            </span>
          </div>

          <div className="win2k-separator" />

          {/* ── Scoreboard panel ──────────────────────── */}
          <div
            className="win2k-groupbox"
            style={{ marginBottom: 10 }}
            role="region"
            aria-label="Match scoreboard"
          >
            <legend>Match Score</legend>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 16,
                padding: "6px 0",
                flexWrap: "wrap",
              }}
            >
              {/* Home team */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 6,
                  flex: 1,
                  minWidth: 80,
                }}
              >
                <div className="win2k-avatar">
                  <AVATAR
                    src={home?.logo as string}
                    alt={home?.name}
                    size={isMobile ? "lg" : "2xl"}
                  />
                </div>
                <p className="win2k-team-name">{home?.name}</p>
              </div>

              {/* Score / VS */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 4,
                  flexShrink: 0,
                }}
              >
                {match?.status === "UPCOMING" ? (
                  <div
                    className="win2k-sunken"
                    style={{
                      fontFamily: "Courier New, Courier, monospace",
                      fontSize: 22,
                      fontWeight: "bold",
                      padding: "6px 18px",
                      letterSpacing: 2,
                    }}
                  >
                    VS
                  </div>
                ) : (
                  <div className="win2k-scoreboard">
                    {matchMetrics?.goals?.home ?? 0}
                    {" - "}
                    {matchMetrics?.goals?.away ?? 0}
                  </div>
                )}
                <StatusBadge status={match?.status} />
              </div>

              {/* Away team */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 6,
                  flex: 1,
                  minWidth: 80,
                }}
              >
                <div className="win2k-avatar">
                  <AVATAR
                    src={away?.logo as string}
                    alt={away?.name}
                    size={isMobile ? "lg" : "2xl"}
                    shape="rounded"
                  />
                </div>
                <p className="win2k-team-name">{away?.name}</p>
              </div>
            </div>
          </div>

          {/* ── Match Actions ──────────────────────────── */}
          <MatchActions match={match} teams={teams?.data as ITeam[]} />

          <div className="win2k-separator" style={{ margin: "10px 0" }} />

          {/* ── Events Logger ─────────────────────────── */}
          {match && (
            <MatchEventsAdmin
              opponent={match?.opponent as ITeam}
              match={match as IMatch}
            />
          )}
        </div>

        {/* Status bar */}
        <div className="win2k-statusbar" role="status">
          <div className="win2k-statusbar-panel">
            Ready
          </div>
          <div className="win2k-statusbar-panel" style={{ maxWidth: 140 }}>
            {match?.status}
          </div>
          <div className="win2k-statusbar-panel" style={{ maxWidth: 180 }}>
            {formatDate(match?.date)}
          </div>
        </div>
      </div>
    </div>
  );
}
