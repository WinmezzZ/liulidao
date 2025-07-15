'use client';

import * as React from 'react';

import { Plate, usePlateEditor } from 'platejs/react';

import { EditorKit } from '@/components/editor/editor-kit';
import { SettingsDialog } from '@/components/editor/settings-dialog';
import { Editor, EditorContainer } from '@/components/ui/editor';
import { TElement } from 'platejs';

export function PlateEditor(props: { value: TElement[], onChange: (value: TElement[]) => void }) {
  const editor = usePlateEditor({
    plugins: EditorKit,
    value: props.value,
  });

  return (
    <Plate editor={editor} onValueChange={({ value }) => props.onChange(value)}>
      <EditorContainer>
        <Editor variant="demo" />
      </EditorContainer>

      <SettingsDialog />
    </Plate>
  );
}
