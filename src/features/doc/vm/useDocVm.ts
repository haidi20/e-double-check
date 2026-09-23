import type { DocCardRect, DocConnectionInfo, DocConnectionSide, DocStepInfo } from '@/features/doc/type/docTypes'
import { docConnections, docMenuItems, docRoles, docRules, docSteps, sbmOutlets } from '@/features/doc/vm/docState'

const cardWidth = 220
const cardHeight = 80
const laneLeft = 20
const laneWidth = 300
const laneCardCenter = 130
const firstLineY = 210
const lineGap = 125

const iconPaths: Record<string, string> = {
  shoppingBag: 'M6 8h12l-1 12H7L6 8Zm3 0a3 3 0 0 1 6 0M9 12h.01M15 12h.01',
  inbox: 'M4 4h16v16H4V4Zm0 10h4l2 3h4l2-3h4M8 8h8M8 11h8',
  layers: 'M12 3 3 8l9 5 9-5-9-5Zm-7 9 7 4 7-4M5 16l7 4 7-4',
  fileSpreadsheet: 'M6 3h8l4 4v14H6V3Zm8 0v5h5M8 12h8M8 15h8M11 9v10M14 9v10',
  uploadCloud: 'M16 16l-4-4-4 4M12 12v9M20 16.5A4.5 4.5 0 0 0 15.7 10 6 6 0 0 0 4.4 12.2 4 4 0 0 0 5 20h2',
  package: 'M4 7.5 12 3l8 4.5v9L12 21l-8-4.5v-9Zm8 4.5 8-4.5M12 12 4 7.5M12 12v9',
  truck: 'M3 7h11v9H3V7Zm11 3h4l3 4v2h-7v-6ZM7 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm10 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z',
  signature: 'M4 18h16M5 14c3-5 5-8 7-8 1.5 0 2 1.2 1 2.6L9 14c-.8 1.1-.1 2.4 1.2 1.6L16 12c1-.6 2 .1 1.5 1.2-.5 1-1.5 2.1-3.5 3.8',
  database: 'M5 6c0-1.7 3.1-3 7-3s7 1.3 7 3-3.1 3-7 3-7-1.3-7-3Zm0 0v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6',
  refresh: 'M20 6v5h-5M4 18v-5h5M18 11a6 6 0 0 0-10.5-3.8L4 11M6 13a6 6 0 0 0 10.5 3.8L20 13'
}

const getCardRect = (col: number, line: number): DocCardRect => {
  const cx = laneLeft + (col - 1) * laneWidth + laneCardCenter
  const cy = firstLineY + (line - 1) * lineGap + 42

  return {
    cx,
    cy,
    left: cx - cardWidth / 2,
    right: cx + cardWidth / 2,
    top: cy - cardHeight / 2,
    bottom: cy + cardHeight / 2
  }
}

const getPoint = (rect: DocCardRect, side: DocConnectionSide) => {
  if (side === 'top') return { x: rect.cx, y: rect.top }
  if (side === 'bottom') return { x: rect.cx, y: rect.bottom }
  if (side === 'left') return { x: rect.left, y: rect.cy }
  return { x: rect.right, y: rect.cy }
}

const getPathDef = (conn: DocConnectionInfo, steps: DocStepInfo[]) => {
  const fromNode = steps.find((step) => step.id === conn.from)
  const toNode = steps.find((step) => step.id === conn.to)

  if (!fromNode || !toNode) return ''

  const start = getPoint(getCardRect(fromNode.col, fromNode.line), conn.fromSide)
  const end = getPoint(getCardRect(toNode.col, toNode.line), conn.toSide)

  if (
    (conn.fromSide === 'right' && conn.toSide === 'left') ||
    (conn.fromSide === 'left' && conn.toSide === 'right')
  ) {
    const controlX = (start.x + end.x) / 2
    return `M ${start.x} ${start.y} C ${controlX} ${start.y}, ${controlX} ${end.y}, ${end.x} ${end.y}`
  }

  if (conn.fromSide === 'bottom' && conn.toSide === 'top') {
    const controlY = (start.y + end.y) / 2
    return `M ${start.x} ${start.y} C ${start.x} ${controlY}, ${end.x} ${controlY}, ${end.x} ${end.y}`
  }

  if (conn.fromSide === 'right' && conn.toSide === 'top') {
    return `M ${start.x} ${start.y} Q ${end.x} ${start.y}, ${end.x} ${end.y}`
  }

  return `M ${start.x} ${start.y} L ${end.x} ${end.y}`
}

export const useDocVm = () => {
  const roles = Object.values(docRoles)
  const steps = docSteps.map((step) => ({
      ...step,
      rect: getCardRect(step.col, step.line),
      role: docRoles[step.roleId],
      iconPath: iconPaths[step.icon] ?? iconPaths.layers
    }))
  const connections = docConnections.map((connection) => ({
      ...connection,
      markerId: `doc-arrow-${connection.color.replace('#', '')}`,
      path: getPathDef(connection, docSteps)
    }))
  const arrowColors = [...new Set(docConnections.map((connection) => connection.color))]

  return {
    roles,
    steps,
    docRules,
    connections,
    arrowColors,
    menuItems: docMenuItems,
    outlets: sbmOutlets,
    viewBox: '0 0 1220 1400'
  }
}
