import TopPlayers from "./(components)/TopPlayers";
import AdminDashboardChartsSection from "./(components)/ChartsSection";
import { KeyTopStatsCards } from "./(components)/KeyTopStatsCards";
import HEADER from "@/components/Element";

export default function AdminDashboardPage() {
  return (
    <div className="  ">
      {/* Main Content */}
      <main className="flex-1 _page px-4">
        <HEADER
          className="bg-accent"
          title={"CLUB MANAGEMENT & CONTROL ADMIN"}
          subtitle="Manage your squad, track performance, insights and analysis"
        ></HEADER>

        {/* Dashboard Content */}
        <div className="py-8 max-w-7xl mx-auto space-y-2.5">
          <KeyTopStatsCards />

          {/* Top Players */}
          <TopPlayers />

          {/* Charts Section */}
          <AdminDashboardChartsSection />
        </div>
      </main>
    </div>
  );
}
