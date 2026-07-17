"use client";

import { useMemo, useState } from "react";
import {
  MvpInsetSurface,
  MvpMetricCard,
  MvpProgressBar,
  MvpSelect,
  MvpStatusPill,
  MvpSurface,
  mvpMutedText,
} from "@/components/mvp/MvpUi";
import {
  defaultAnalyticsFilters,
  deriveExecutiveSummary,
  filterAdminAnalyticsData,
  getAvailableSubjectOptions,
  getQuestionRiskLabel,
} from "@/lib/admin-analytics/filters";
import type {
  AdminAnalyticsDashboardData,
  AnalyticsDateRange,
  AnalyticsFilters,
  AnalyticsSubjectId,
  BuildInformation,
  ContentQaRecord,
  ImportHistoryRecord,
  LevelPerformanceRecord,
  QuestionPerformanceRecord,
  SubjectPerformanceRecord,
  SystemHealthRecord,
} from "@/lib/admin-analytics/types";

const dateRangeOptions: { id: AnalyticsDateRange; label: string }[] = [
  { id: "7d", label: "Last 7 days" },
  { id: "30d", label: "Last 30 days" },
  { id: "90d", label: "Last 90 days" },
  { id: "all", label: "All demo data" },
];

function numberFormat(value: number) {
  return new Intl.NumberFormat("en-US").format(value);
}

function percent(value: number) {
  return `${Math.round(value)}%`;
}

function ChartBar({ value, label }: { value: number; label: string }) {
  const safeValue = Math.max(0, Math.min(100, value));
  return (
    <div className="grid gap-2">
      <div className="flex items-center justify-between gap-3 text-sm font-black text-[#082B80]">
        <span>{label}</span>
        <span>{safeValue}%</span>
      </div>
      <MvpProgressBar value={safeValue} label={label} />
    </div>
  );
}

function SectionHeader({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <div>
      <p className="text-xs font-black uppercase tracking-wide text-[#FF4FA0]">{eyebrow}</p>
      <h2 className="mt-1 text-2xl font-black text-[#082B80]">{title}</h2>
      <p className={`mt-2 max-w-3xl ${mvpMutedText}`}>{description}</p>
    </div>
  );
}

function EmptyRows({ label }: { label: string }) {
  return <p className="rounded-2xl bg-[#F8FBFF] p-4 text-sm font-bold text-[#5B6B94]">No {label} in this mock filter.</p>;
}

function SubjectPerformance({ records }: { records: SubjectPerformanceRecord[] }) {
  return (
    <MvpSurface>
      <SectionHeader eyebrow="Subject Performance" title="Subject Performance" description="Mock subject-level adoption and learning health. English is staging-only." />
      <div className="mt-5 grid gap-4 lg:grid-cols-3">
        {records.length === 0 ? <EmptyRows label="subject rows" /> : records.map((record) => (
          <MvpInsetSurface key={record.id} className="grid gap-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-lg font-black text-[#082B80]">{record.subjectName}</h3>
                <p className="text-sm font-bold text-[#5B6B94]">{record.activeLearners} active learners</p>
              </div>
              <MvpStatusPill tone={record.status === "active" ? "green" : record.status === "staging" ? "yellow" : "blue"}>{record.status}</MvpStatusPill>
            </div>
            <ChartBar label="Accuracy" value={record.averageAccuracy} />
            <ChartBar label="Completion" value={record.completionRate} />
            <p className="text-sm font-bold text-[#5B6B94]">Sessions: {numberFormat(record.sessions)}</p>
          </MvpInsetSurface>
        ))}
      </div>
    </MvpSurface>
  );
}

function LevelPerformanceTable({ records }: { records: LevelPerformanceRecord[] }) {
  return (
    <MvpSurface>
      <SectionHeader eyebrow="Level Performance" title="Level Performance" description="Mock level completion and accuracy trends for package monitoring." />
      <div className="mt-5 overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="text-xs uppercase text-[#5B6B94]">
            <tr>
              <th className="px-3 py-2">Subject</th>
              <th className="px-3 py-2">Level</th>
              <th className="px-3 py-2">Title</th>
              <th className="px-3 py-2">Attempts</th>
              <th className="px-3 py-2">Completions</th>
              <th className="px-3 py-2">Accuracy</th>
            </tr>
          </thead>
          <tbody>
            {records.length === 0 ? (
              <tr><td className="px-3 py-4 font-bold text-[#5B6B94]" colSpan={6}>No level rows in this mock filter.</td></tr>
            ) : records.map((record) => (
              <tr key={record.id} className="border-t border-[#DDE8F5] font-bold text-[#24406F]">
                <td className="px-3 py-3 capitalize">{record.subject}</td>
                <td className="px-3 py-3">L{record.level}</td>
                <td className="px-3 py-3 text-[#082B80]">{record.title}</td>
                <td className="px-3 py-3">{record.attempts}</td>
                <td className="px-3 py-3">{record.completions}</td>
                <td className="px-3 py-3">{percent(record.averageAccuracy)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </MvpSurface>
  );
}

function QuestionPerformanceTable({ records }: { records: QuestionPerformanceRecord[] }) {
  return (
    <MvpSurface>
      <SectionHeader eyebrow="Question Performance" title="Question Performance" description="Mock item-level signals for future educator/content review." />
      <div className="mt-5 grid gap-3">
        {records.length === 0 ? <EmptyRows label="question rows" /> : records.map((record) => (
          <div key={record.id} className="rounded-[1.25rem] border border-[#DDE8F5] bg-white p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-xs font-black uppercase text-[#5B6B94]">{record.questionId} - L{record.level}</p>
                <h3 className="mt-1 text-base font-black text-[#082B80]">{record.prompt}</h3>
                <p className="mt-1 text-sm font-bold text-[#5B6B94]">Attempts: {record.attempts}</p>
              </div>
              <MvpStatusPill tone={record.flagged ? "yellow" : "green"}>{getQuestionRiskLabel(record.correctRate)}</MvpStatusPill>
            </div>
            <div className="mt-4">
              <ChartBar label="Correct rate" value={record.correctRate} />
            </div>
          </div>
        ))}
      </div>
    </MvpSurface>
  );
}

function ContentQa({ records }: { records: ContentQaRecord[] }) {
  return (
    <MvpSurface>
      <SectionHeader eyebrow="Content QA" title="Content QA" description="Content status signals from the approved/review source workflow." />
      <div className="mt-5 grid gap-4 lg:grid-cols-3">
        {records.length === 0 ? <EmptyRows label="content QA rows" /> : records.map((record) => (
          <MvpInsetSurface key={record.id} className="grid gap-3">
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-black text-[#082B80]">{record.packageName}</h3>
              <MvpStatusPill tone={record.status === "ready" ? "green" : record.status === "review" ? "yellow" : "red"}>{record.status}</MvpStatusPill>
            </div>
            <p className="text-sm font-bold text-[#5B6B94]">Approved: {record.approvedRows} - Review: {record.reviewRows}</p>
            <p className="text-sm font-bold text-[#5B6B94]">Warnings: {record.warnings} - Duplicate groups: {record.duplicateGroups}</p>
          </MvpInsetSurface>
        ))}
      </div>
    </MvpSurface>
  );
}

function ImportHistory({ records }: { records: ImportHistoryRecord[] }) {
  return (
    <MvpSurface>
      <SectionHeader eyebrow="Import History" title="Import History" description="Mock history for content imports and future audit trails." />
      <div className="mt-5 overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="text-xs uppercase text-[#5B6B94]">
            <tr>
              <th className="px-3 py-2">Date</th>
              <th className="px-3 py-2">Subject</th>
              <th className="px-3 py-2">File</th>
              <th className="px-3 py-2">Rows</th>
              <th className="px-3 py-2">Imported</th>
              <th className="px-3 py-2">Skipped</th>
              <th className="px-3 py-2">Result</th>
            </tr>
          </thead>
          <tbody>
            {records.length === 0 ? (
              <tr><td className="px-3 py-4 font-bold text-[#5B6B94]" colSpan={7}>No imports in this mock filter.</td></tr>
            ) : records.map((record) => (
              <tr key={record.id} className="border-t border-[#DDE8F5] font-bold text-[#24406F]">
                <td className="px-3 py-3">{record.date}</td>
                <td className="px-3 py-3 capitalize">{record.subject}</td>
                <td className="px-3 py-3 text-[#082B80]">{record.fileName}</td>
                <td className="px-3 py-3">{record.rows}</td>
                <td className="px-3 py-3">{record.importedRows}</td>
                <td className="px-3 py-3">{record.skippedRows}</td>
                <td className="px-3 py-3"><MvpStatusPill tone={record.result === "passed" ? "green" : record.result === "warning" ? "yellow" : "red"}>{record.result}</MvpStatusPill></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </MvpSurface>
  );
}

function BuildInformationCard({ buildInformation }: { buildInformation: BuildInformation }) {
  return (
    <MvpSurface>
      <SectionHeader eyebrow="Build Information" title="Build Information" description="Mock release/build status summary. This does not read production telemetry." />
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <MvpInsetSurface>
          <p className="text-xs font-black uppercase text-[#5B6B94]">Version</p>
          <p className="mt-1 text-2xl font-black text-[#082B80]">{buildInformation.appVersion}</p>
          <p className="mt-2 text-sm font-bold text-[#5B6B94]">{buildInformation.buildTarget}</p>
        </MvpInsetSurface>
        <MvpInsetSurface>
          <p className="text-xs font-black uppercase text-[#5B6B94]">Last build</p>
          <div className="mt-2"><MvpStatusPill tone={buildInformation.lastBuildStatus === "passed" ? "green" : buildInformation.lastBuildStatus === "warning" ? "yellow" : "red"}>{buildInformation.lastBuildStatus}</MvpStatusPill></div>
          <p className="mt-2 text-sm font-bold text-[#5B6B94]">{buildInformation.lastBuildAt}</p>
        </MvpInsetSurface>
      </div>
      <ul className="mt-4 grid gap-2 text-sm font-bold text-[#5B6B94]">
        {buildInformation.notes.map((note) => <li key={note}>- {note}</li>)}
      </ul>
    </MvpSurface>
  );
}

function SystemHealth({ records }: { records: SystemHealthRecord[] }) {
  return (
    <MvpSurface>
      <SectionHeader eyebrow="System Health" title="System Health" description="Internal readiness checks for future analytics integrations." />
      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        {records.map((record) => (
          <MvpInsetSurface key={record.id} className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h3 className="font-black text-[#082B80]">{record.label}</h3>
              <p className="mt-1 text-sm font-bold text-[#5B6B94]">{record.detail}</p>
              <p className="mt-2 text-xs font-black uppercase text-[#5B6B94]">Checked {record.lastCheckedAt}</p>
            </div>
            <MvpStatusPill tone={record.status === "healthy" ? "green" : record.status === "warning" ? "yellow" : "red"}>{record.status}</MvpStatusPill>
          </MvpInsetSurface>
        ))}
      </div>
    </MvpSurface>
  );
}

export function AdminAnalyticsDashboard({ initialData }: { initialData: AdminAnalyticsDashboardData }) {
  const [filters, setFilters] = useState<AnalyticsFilters>(defaultAnalyticsFilters);
  const subjectOptions = useMemo(() => getAvailableSubjectOptions(initialData), [initialData]);
  const filteredData = useMemo(() => filterAdminAnalyticsData(initialData, filters), [initialData, filters]);
  const summary = useMemo(() => deriveExecutiveSummary(filteredData), [filteredData]);
  const totalQuestionsAnswered = filteredData.learningMetrics.reduce((total, record) => total + record.questionsAnswered, 0);
  const totalSessions = filteredData.learningMetrics.reduce((total, record) => total + record.sessions, 0);

  return (
    <main className="min-h-screen bg-[#F7FAFF] px-4 py-6 text-[#082B80] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="rounded-[2rem] border border-[#DDE8F5] bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-[#FF4FA0]">Internal Admin - Mock Data</p>
              <h1 className="mt-2 text-3xl font-black text-[#082B80] sm:text-4xl">LearnPlay Analytics Dashboard</h1>
              <p className={`mt-3 max-w-3xl ${mvpMutedText}`}>Development-only analytics workspace for product, content, and system readiness. No production analytics provider is connected yet.</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:min-w-[25rem]">
              <label className="grid gap-2 text-sm font-black text-[#082B80]">
                Date range
                <MvpSelect value={filters.dateRange} onChange={(event) => setFilters((current) => ({ ...current, dateRange: event.target.value as AnalyticsDateRange }))} aria-label="Analytics date range">
                  {dateRangeOptions.map((option) => <option key={option.id} value={option.id}>{option.label}</option>)}
                </MvpSelect>
              </label>
              <label className="grid gap-2 text-sm font-black text-[#082B80]">
                Subject
                <MvpSelect value={filters.subject} onChange={(event) => setFilters((current) => ({ ...current, subject: event.target.value as AnalyticsSubjectId }))} aria-label="Analytics subject filter">
                  {subjectOptions.map((option) => <option key={option.id} value={option.id}>{option.label}</option>)}
                </MvpSelect>
              </label>
            </div>
          </div>
        </header>

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5" aria-label="Executive Summary">
          {summary.map((metric) => (
            <div key={metric.id} className="rounded-[1.5rem] border border-[#DDE8F5] bg-white p-1 shadow-sm">
              <MvpMetricCard label={metric.label} value={metric.value} tone={metric.tone === "red" ? "pink" : metric.tone} />
              <p className="px-5 pb-4 text-xs font-black uppercase text-[#5B6B94]">{metric.change}</p>
            </div>
          ))}
        </section>

        <section className="grid gap-4 lg:grid-cols-2" aria-label="User and Learning Metrics">
          <MvpSurface>
            <SectionHeader eyebrow="User Metrics" title="User Metrics" description="Mock parent and child-profile activity for beta planning." />
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <MvpInsetSurface><p className="text-xs font-black uppercase text-[#5B6B94]">Active parent rows</p><p className="mt-2 text-3xl font-black">{filteredData.userMetrics.length}</p></MvpInsetSurface>
              <MvpInsetSurface><p className="text-xs font-black uppercase text-[#5B6B94]">Returning families</p><p className="mt-2 text-3xl font-black">{numberFormat(filteredData.userMetrics.reduce((total, record) => total + record.returningFamilies, 0))}</p></MvpInsetSurface>
            </div>
          </MvpSurface>
          <MvpSurface>
            <SectionHeader eyebrow="Learning Metrics" title="Learning Metrics" description="Mock session volume, question answers, and completion trend." />
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <MvpInsetSurface><p className="text-xs font-black uppercase text-[#5B6B94]">Sessions</p><p className="mt-2 text-3xl font-black">{numberFormat(totalSessions)}</p></MvpInsetSurface>
              <MvpInsetSurface><p className="text-xs font-black uppercase text-[#5B6B94]">Answers</p><p className="mt-2 text-3xl font-black">{numberFormat(totalQuestionsAnswered)}</p></MvpInsetSurface>
            </div>
          </MvpSurface>
        </section>

        <SubjectPerformance records={filteredData.subjectPerformance} />
        <LevelPerformanceTable records={filteredData.levelPerformance} />
        <QuestionPerformanceTable records={filteredData.questionPerformance} />
        <ContentQa records={filteredData.contentQa} />
        <ImportHistory records={filteredData.importHistory} />
        <div className="grid gap-6 xl:grid-cols-2">
          <BuildInformationCard buildInformation={filteredData.buildInformation} />
          <SystemHealth records={filteredData.systemHealth} />
        </div>
      </div>
    </main>
  );
}

