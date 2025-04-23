'use client';

import { type ValueOf } from '@udecode/plate';
import {
  Plate,
  type PlateEditor,
  type WithPlateOptions,
} from '@udecode/plate/react';
import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { SettingsDialog } from '@/components/editor/settings';
import { useCreateEditor } from '@/components/editor/use-create-editor';
import { Editor, EditorContainer } from '@/components/plate-ui/editor';

interface PlateEditorProps {
  value: WithPlateOptions['value'] | null;
  onChange: (value: ValueOf<PlateEditor>, editor: PlateEditor) => void;
}

export function PlateEditor({ value, onChange }: PlateEditorProps) {
  const editor = useCreateEditor({
    value: value || [],
  });

  return (
    <DndProvider backend={HTML5Backend}>
      <Plate editor={editor}>
        <EditorContainer>
          <Editor variant="demo" />
        </EditorContainer>

        <SettingsDialog />
      </Plate>
    </DndProvider>
  );
}
