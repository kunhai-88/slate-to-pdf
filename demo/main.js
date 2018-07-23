import React from 'react'
import { Editor } from 'slate-react'
import { State } from 'slate'

const initialState = State.fromJSON({
  document: {
    nodes: [
      {
        kind: 'block',
        type: 'paragraph',
        nodes: [
          {
            kind: 'text',
            ranges: [
              {
                text: 'A line of text in a paragraph.'
              }
            ]
          }
        ]
      }
    ]
  }
})

// 定义我们的应用…
class App extends React.Component {

  // 设置应用创建时的初始状态。
  state = {
    state: initialState
  }

  // 发生变更时，使用新的编辑器状态更新应用的 React 状态。
  onChange = ({ state }) => {
    this.setState({ state })
  }

  // 渲染编辑器。
  render() {
    return (
      <Editor
        state={this.state.state}
        onChange={this.onChange}
      />
    )
  }

}