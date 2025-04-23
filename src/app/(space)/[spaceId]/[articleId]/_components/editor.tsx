import { PlateEditor } from '@/components/editor/plate-editor';
import { SettingsProvider } from '@/components/editor/settings';
import { ArticleAction } from './article-action';

export default function Editor() {
  return (
    <div>
      <ArticleAction />
      <div className="min-h-[1/2vh] w-full" data-registry="plate">
        <SettingsProvider>
          <PlateEditor />
        </SettingsProvider>
      </div>
    </div>
  );
}
