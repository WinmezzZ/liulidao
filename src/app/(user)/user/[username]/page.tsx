// 示例：过去 30 天的活动
import { eachDayOfInterval, endOfYear, formatISO, startOfYear } from 'date-fns';
import {
  type Activity,
  ContributionGraph,
} from '../../components/contribution-graph';
import { ContributionItem } from '../../components/contribution-item';

const maxCount = 20;
const maxLevel = 4;
const now = new Date();
const days = eachDayOfInterval({
  start: startOfYear(now),
  end: endOfYear(now),
});

const data: Activity[] = days.map((date) => {
  const c = Math.round(
    Math.random() * maxCount - Math.random() * (0.8 * maxCount)
  );
  const count = Math.max(0, c);
  const level = Math.ceil((count / maxCount) * maxLevel);
  return {
    date: formatISO(date, { representation: 'date' }),
    count,
    level,
  };
});

export default async function Page(props: PageProps<'/user/[username]'>) {
  const params = await props.params;
  return (
    <main className="p-8">
      <h1 className="mb-4 text-xl font-bold">贡献度图</h1>
      <ContributionGraph
        data={data}
        className="rounded-lg border p-4 pt-8!"
        renderItem={(activity, node) => {
          return <ContributionItem activity={activity} node={node} />;
        }}
      />
    </main>
  );
}
