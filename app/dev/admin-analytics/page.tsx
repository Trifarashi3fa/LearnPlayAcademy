import { notFound } from "next/navigation";
import { AdminAnalyticsDashboard } from "@/components/admin/AdminAnalyticsDashboard";
import { isAdminAnalyticsPreviewEnabled } from "@/lib/admin-analytics/access";
import { getAdminAnalyticsService } from "@/lib/admin-analytics/service";

export const metadata = {
  title: "Admin Analytics | LearnPlay Academy",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminAnalyticsPage() {
  if (!isAdminAnalyticsPreviewEnabled()) {
    notFound();
  }

  const service = getAdminAnalyticsService();
  const data = await service.getDashboardData();

  return <AdminAnalyticsDashboard initialData={data} />;
}
