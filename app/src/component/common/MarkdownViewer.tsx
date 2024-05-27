'use client'
import MDEditor from '@uiw/react-md-editor'

export default function MarkdownView({ content }: { content: string }) {
  return (
    <div>
      <MDEditor.Markdown source={content} />
    </div>
  )
}
