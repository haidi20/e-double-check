export type DocRoleId = 'OUTLET' | 'ADMIN' | 'GUDANG' | 'LOGISTIK'
export type DocStepId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
export type DocRuleId = 1 | 2 | 3 | 4
export type DocConnectionSide = 'top' | 'right' | 'bottom' | 'left'

export interface DocRoleInfo {
  id: DocRoleId
  title: string
  subtitle: string
  color: string
  borderColor: string
  bgColor: string
  accentColor: string
  textColor: string
  darkBg: string
  description: string
}

export interface DocStepInfo {
  id: DocStepId
  title: string
  copy: string
  roleId: DocRoleId
  icon: string
  col: number
  line: number
  isRetur?: boolean
}

export interface DocRuleInfo {
  id: DocRuleId
  title: string
  copy: string
  color: string
}

export interface DocConnectionInfo {
  from: DocStepId
  to: DocStepId
  fromSide: DocConnectionSide
  toSide: DocConnectionSide
  color: string
  dashed?: boolean
  label?: string
}

export interface DocMenuItem {
  id: string
  name: string
  category: string
  price: number
  unit: string
  stock: number
}

export interface DocCardRect {
  cx: number
  cy: number
  left: number
  right: number
  top: number
  bottom: number
}
