/* eslint-disable react/prop-types */
import { useState, useCallback } from 'react';
import { Slate, Editable, withReact } from 'slate-react';
import { Transforms, Editor, Element as SlateElement } from 'slate';
import { createEditor } from 'slate';

export function TextEditor() {
  const [editor] = useState(() => withReact(createEditor()));

  const initialValue = [
    {
      type: "paragraph",
      children: [{ text: "Hello, This is GraphiteNotes \n This is a MVP." }]
    }
  ];

  const CodeElement = (props) => {
    return (
      <pre {...props.attributes}>
        <code>{props.children}</code>
      </pre>
    );
  };

  const DefaultElement = (props) => {
    return <p {...props.attributes}>{props.children}</p>;
  };

  const renderElement = useCallback((props) => {
    switch (props.element.type) {
      case 'code':
        return <CodeElement {...props} />;
      default:
        return <DefaultElement {...props} />;
    }
  }, []);

  return (
    <div className="App">
      <Slate editor={editor} initialValue={initialValue}>
        <Editable
          renderElement={renderElement}
          onKeyDown={(event) => {
            if (event.key === '&') {
              event.preventDefault();
              editor.insertText('and');
            }

            if (event.ctrlKey && event.key===',' ) {
              event.preventDefault();
              // Determine whether any of the currently selected blocks are code blocks.
              const [match] = Editor.nodes(editor, {
                match: n => n.type === 'code',
                universal: true,
              });

              // Toggle the block type depending on whether there's already a match.
              Transforms.setNodes(
                editor,
                { type: match ? 'paragraph' : 'code' },
                { match: n => SlateElement.isElement(n) && Editor.isBlock(editor, n) }
              );
            }
          }}
        />
      </Slate>
    </div>
  );
}
