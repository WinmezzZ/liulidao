import type { Day as WeekDay } from 'date-fns';
import {
  differenceInCalendarDays,
  eachDayOfInterval,
  formatISO,
  getDay,
  getMonth,
  nextDay,
  parseISO,
  subWeeks,
} from 'date-fns';
import { Fragment, type JSX, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

// -------------------- 数据结构 --------------------
export type Activity = { date: string; count: number; level: number };
type Week = Array<Activity>;

export type Labels = {
  months?: string[];
  legend?: { less?: string; more?: string };
};

const DEFAULT_MONTH_LABELS = [
  '1月',
  '2月',
  '3月',
  '4月',
  '5月',
  '6月',
  '7月',
  '8月',
  '9月',
  '10月',
  '11月',
  '12月',
];
const DEFAULT_LABELS: Labels = {
  months: DEFAULT_MONTH_LABELS,
  legend: { less: '更少', more: '更多' },
};

// -------------------- 工具函数 --------------------
const fillHoles = (activities: Activity[]): Activity[] => {
  if (activities.length === 0) return [];
  const sorted = [...activities].sort((a, b) => a.date.localeCompare(b.date));
  const calendar = new Map(sorted.map((a) => [a.date, a]));
  const first = sorted[0]!;
  const last = sorted.at(-1)!;
  return eachDayOfInterval({
    start: parseISO(first.date),
    end: parseISO(last.date),
  }).map((day) => {
    const date = formatISO(day, { representation: 'date' });
    return calendar.get(date) ?? { date, count: 0, level: 0 };
  });
};

const groupByWeeks = (
  activities: Activity[],
  weekStart: WeekDay = 0
): Week[] => {
  if (activities.length === 0) return [];
  const normalized = fillHoles(activities);
  const firstDate = parseISO(normalized[0]!.date);
  const firstCalendarDate =
    getDay(firstDate) === weekStart
      ? firstDate
      : subWeeks(nextDay(firstDate, weekStart), 1);
  const padded = [
    ...(new Array(differenceInCalendarDays(firstDate, firstCalendarDate)).fill(
      undefined
    ) as Activity[]),
    ...normalized,
  ];
  const numberOfWeeks = Math.ceil(padded.length / 7);
  return Array.from({ length: numberOfWeeks }, (_, i) =>
    padded.slice(i * 7, i * 7 + 7)
  );
};

const getMonthLabels = (
  weeks: Week[],
  monthNames: string[] = DEFAULT_MONTH_LABELS
) => {
  return weeks.reduce<{ weekIndex: number; label: string }[]>(
    (labels, week, weekIndex) => {
      const first = week.find(Boolean);
      if (!first) return labels;
      const month = monthNames[getMonth(parseISO(first.date))];
      if (weekIndex === 0 || labels.at(-1)?.label !== month) {
        labels.push({ weekIndex, label: month });
      }
      return labels;
    },
    []
  );
};

// -------------------- Graph 主体 --------------------
export function ContributionGraph({
  data,
  blockMargin = 4,
  blockRadius = 2,
  blockSize = 12,
  labels: labelsProp,
  maxLevel = 4,
  weekStart = 0,
  className,
  renderItem,
}: {
  data: Activity[];
  blockMargin?: number;
  blockRadius?: number;
  blockSize?: number;
  labels?: Labels;
  maxLevel?: number;
  weekStart?: WeekDay;
  className?: string;
  renderItem?: (activity: Activity, node: ReactNode) => JSX.Element;
}) {
  if (data.length === 0) return null;

  const weeks = groupByWeeks(data, weekStart);
  const labels = { ...DEFAULT_LABELS, ...labelsProp };

  return (
    <div className={cn('flex w-max flex-col gap-2', className)}>
      <ContributionGraphCalendar
        weeks={weeks}
        blockSize={blockSize}
        blockMargin={blockMargin}
        blockRadius={blockRadius}
        labels={labels}
        renderItem={renderItem}
      />
      <ContributionGraphLegend
        maxLevel={maxLevel}
        blockSize={blockSize}
        blockRadius={blockRadius}
        labels={labels}
        data={data}
      />
    </div>
  );
}

// -------------------- Calendar --------------------
export function ContributionGraphCalendar({
  weeks,
  blockSize,
  blockMargin,
  blockRadius,
  labels,
  hideMonthLabels = false,
  renderItem,
}: {
  weeks: Week[];
  blockSize: number;
  blockMargin: number;
  blockRadius: number;
  labels: Labels;
  hideMonthLabels?: boolean;
  renderItem?: (activity: Activity, node: ReactNode) => JSX.Element;
}) {
  const labelHeight = 16;
  const width = weeks.length * (blockSize + blockMargin) - blockMargin;
  const height = labelHeight + (blockSize + blockMargin) * 7 - blockMargin;
  const monthLabels = getMonthLabels(weeks, labels.months);

  return (
    <svg
      className="text-14 block overflow-visible"
      height={height}
      width={width}
    >
      {!hideMonthLabels && (
        <g className="fill-current">
          {monthLabels.map(({ label, weekIndex }) => (
            <text
              className="text-14"
              key={weekIndex}
              x={(blockSize + blockMargin) * weekIndex}
            >
              {label}
            </text>
          ))}
        </g>
      )}
      {weeks.map((week, wi) =>
        week.map((activity, di) => {
          if (!activity) return null;
          const item = (
            <rect
              data-level={activity.level}
              className={cn(
                'data-[level="0"]:fill-[#ebedf0] dark:data-[level="0"]:fill-[#161b22]',
                'data-[level="1"]:fill-[#9be9a8] dark:data-[level="1"]:fill-[#0e4429]',
                'data-[level="2"]:fill-[#40c463] dark:data-[level="2"]:fill-[#006d32]',
                'data-[level="3"]:fill-[#30a14e] dark:data-[level="3"]:fill-[#26a641]',
                'data-[level="4"]:fill-[#216e39] dark:data-[level="4"]:fill-[#39d353]'
              )}
              width={blockSize}
              height={blockSize}
              rx={blockRadius}
              ry={blockRadius}
              x={(blockSize + blockMargin) * wi}
              y={labelHeight + (blockSize + blockMargin) * di}
            />
          );
          return (
            <Fragment key={`${wi}-${di}`}>
              {renderItem ? renderItem(activity, item) : item}
            </Fragment>
          );
        })
      )}
    </svg>
  );
}

// -------------------- Legend --------------------
export function ContributionGraphLegend({
  maxLevel,
  blockSize,
  blockRadius,
  labels,
  data,
}: {
  maxLevel: number;
  blockSize: number;
  blockRadius: number;
  labels: Labels;
  data: Activity[];
}) {
  const totalCount = data.reduce((sum, a) => sum + a.count, 0);
  return (
    <div className="flex items-center justify-between text-sm">
      <div className="text-muted-foreground">
        过去一年里一共有 {totalCount} 次提交
      </div>
      <div className="ml-auto flex items-center gap-1">
        <span className="text-muted-foreground mr-1">
          {labels.legend?.less}
        </span>
        {Array.from({ length: maxLevel + 1 }).map((_, level) => (
          <svg key={level} width={blockSize} height={blockSize}>
            <rect
              data-level={level}
              className={cn(
                'data-[level="0"]:fill-[#ebedf0] dark:data-[level="0"]:fill-[#161b22]',
                'data-[level="1"]:fill-[#9be9a8] dark:data-[level="1"]:fill-[#0e4429]',
                'data-[level="2"]:fill-[#40c463] dark:data-[level="2"]:fill-[#006d32]',
                'data-[level="3"]:fill-[#30a14e] dark:data-[level="3"]:fill-[#26a641]',
                'data-[level="4"]:fill-[#216e39] dark:data-[level="4"]:fill-[#39d353]'
              )}
              width={blockSize}
              height={blockSize}
              rx={blockRadius}
              ry={blockRadius}
            />
          </svg>
        ))}
        <span className="text-muted-foreground ml-1">
          {labels.legend?.more}
        </span>
      </div>
    </div>
  );
}
