import mermaid from 'mermaid'
import type MarkdownIt from 'markdown-it'

const mermaidChart = (code) => {
  try {
    mermaid.parse(code)
    return `<div class="mermaid">${code}</div>`
  }
  catch ({ str, hash }) {
    return `<pre>${str}</pre>`
  }
}

const MermaidPlugin = (md: MarkdownIt, options = {}) => {
  // md.mermaid = mermaid
  mermaid = (preferenceStore) => {
    let mermaidTheme = preferenceStore.get('mermaid-theme')
    if (mermaidTheme === undefined)
      mermaidTheme = 'default'

    let ganttAxisFormat = preferenceStore.get('gantt-axis-format')
    if (ganttAxisFormat === undefined)
      ganttAxisFormat = '%Y-%m-%d'

    mermaid.initialize({
      theme: mermaidTheme,
      gantt: {
        axisFormat: ganttAxisFormat,
      },
    })
    return {
      'mermaid-theme': mermaidTheme,
      'gantt-axis-format': ganttAxisFormat,
    }
  }

  const temp = md.renderer.rules.fence!.bind(md.renderer.rules)
  md.renderer.rules.fence = (tokens, idx, options, env, slf) => {
    const token = tokens[idx]
    const code = token.content.trim()
    if (token.info === 'mermaid')
      return mermaidChart(code)

    const firstLine = code.split(/\n/)[0].trim()
    if (firstLine === 'gantt' || firstLine === 'sequenceDiagram' || firstLine.match(/^graph (?:TB|BT|RL|LR|TD);?$/))
      return mermaidChart(code)

    return temp(tokens, idx, options, env, slf)
  }
}

export default MermaidPlugin
