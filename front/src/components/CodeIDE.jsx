import React from 'react'
import Editor from '@monaco-editor/react'


const IDEstyle = {
  backgroundColor: '#1E1E1E',
  display: 'flex',
  justifyContent: 'center',
  flex: '1',
  minWidth: '0',
  padding: '8px',
  margin: '0px',
  borderRadius: '12px'
}

function CodeIDE({ childToParent, code }) {

  return (
    <div style={IDEstyle}>
      <Editor
        onChange={e => childToParent(e)}
        width={'100%'}
        height={'100%'}
        defaultLanguage='javascript'
        defaultValue={code}
        theme='vs-dark'
        options={{
          readOnly: true,
          fontSize: 18,
          minimap: {
            enabled: false
          },
          contextmenu: false
        }}
      />
    </div>
  )
}

export default CodeIDE