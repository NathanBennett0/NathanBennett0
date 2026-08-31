import { motion } from "motion/react";
import { useRef } from "react";
import Event from "./Event";
import './Timeline.css';

type Milestone = {
  title: string;
  description: string;
  month: string; // "YYYY-MM"
};

const milestoneData: Milestone[] = [
  { title: "2018", description: "testa", month: "2018-01" },
  { title: "2019", description: "testb", month: "2019-01" },
  { title: "2020", description: "testc", month: "2020-01" },
  { title: "2021", description: "testd", month: "2021-01" },
  { title: "2022", description: "teste", month: "2022-01" },
  { title: "2023", description: "testf", month: "2023-01" },
  { title: "2024", description: "testg", month: "2024-01" },
  { title: "2025", description: "testh", month: "2025-01" },
  { title: "2026", description: "testi", month: "2026-01" },
  { title: "Now", description: "testj", month: "2026-11" },
];

// How many months fit across the visible viewport width.
const MONTHS_PER_VIEWPORT = 24;

function monthsToWidth(months: number): string {
  return `calc(${months} * 100cqw / ${MONTHS_PER_VIEWPORT})`;
}

const MONTH_WIDTH_EXPR = monthsToWidth(1);

function Timeline() {
  const viewportRef = useRef<HTMLDivElement>(null);

  const startMonth = new Date(
    `${milestoneData.reduce((min, milestone) =>
      milestone.month < min ? milestone.month : min, milestoneData[0].month)}-01T00:00:00Z`
  );
  const endMonth = new Date(
    `${milestoneData.reduce((max, milestone) =>
      milestone.month > max ? milestone.month : max, milestoneData[0].month)}-01T00:00:00Z`
  );

  const monthEntries: string[] = [];
  const start = new Date(Date.UTC(startMonth.getUTCFullYear(), startMonth.getUTCMonth(), 1));
  const end = new Date(Date.UTC(endMonth.getUTCFullYear(), endMonth.getUTCMonth(), 1));

  for (
    let current = new Date(start);
    current <= end;
    current = new Date(Date.UTC(current.getUTCFullYear(), current.getUTCMonth() + 1, 1))
  ) {
    monthEntries.push(current.toISOString().slice(0, 7));
  }

  const monthsWithMilestones = new Map<string, Milestone[]>();
  milestoneData.forEach((milestone) => {
    const existing = monthsWithMilestones.get(milestone.month) ?? [];
    existing.push(milestone);
    monthsWithMilestones.set(milestone.month, existing);
  });

  const totalTrackWidthExpr = monthsToWidth(monthEntries.length);

  return (
    <div
      ref={viewportRef}
      className="timeline-viewport"
      aria-label="Draggable career timeline"
    >
      <motion.div
        className="timeline-track"
        drag="x"
        dragConstraints={viewportRef}
        dragElastic={0.25}
        dragMomentum={true}
        whileTap={{ cursor: "grabbing" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{ width: totalTrackWidthExpr, minWidth: totalTrackWidthExpr }}
      >
        <div className="timeline-line" aria-hidden="true" />
        {monthEntries.map((month) => {
          const milestonesForMonth = monthsWithMilestones.get(month) ?? [];

          return (
            <div
              className="timeline-month"
              key={month}
              style={{ width: MONTH_WIDTH_EXPR, flex: `0 0 ${MONTH_WIDTH_EXPR}` }}
            >
              {milestonesForMonth.map((milestone) => (
                <div className="timeline-point" key={`${month}-${milestone.title}`}>
                  <span className="timeline-marker" aria-hidden="true" />
                  <Event title={milestone.title} description={milestone.description} />
                </div>
              ))}
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}

export default Timeline;