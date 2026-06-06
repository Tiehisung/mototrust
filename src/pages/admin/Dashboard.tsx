import HEADER from "@/components/Element";
import { PrimaryCollapsible } from "@/components/Collapsible";
import { CgPerformance } from "react-icons/cg";
import { MetricsDashboard } from "./MetricsDashboard";

import TopPerformingPlayers from "./players/TopPlayersPerformance";

export default function AdminDashboardPage() {
  return (
    <div className="  ">
      {/* Main Content */}
      <main className="flex-1">
        <HEADER
          className=""
          title={"CLUB MANAGEMENT & CONTROL ADMIN"}
          subtitle="Manage your squad, track performance, insights and analysis"
        ></HEADER>

        {/* Dashboard Content */}
        <div className="py-8 max-w-7xl mx-auto space-y-2.5">
          <PrimaryCollapsible
            header={{
              icon: <CgPerformance size={20} />,
              label: <div className="text-xl font-semibold">Key Metrics</div>,
              className: "ring grow",
            }}
            defaultOpen
          >
            <MetricsDashboard />
          </PrimaryCollapsible>
         

          {/* Top Players */}
          <TopPerformingPlayers />

        </div>
      </main>
    </div>
  );
}
