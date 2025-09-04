import { type ReactNode } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { type Activity } from './contribution-graph';

export function ContributionItem({
  activity,
  node,
}: {
  activity: Activity;
  node: ReactNode;
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>{node}</TooltipTrigger>
      <TooltipContent>
        <p className="font-semibold">{activity.date}</p>
        <p>{activity.count} 个提交</p>
      </TooltipContent>
    </Tooltip>
  );
}
