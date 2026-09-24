export interface DashboardMobilePriorityItem {
  id: string
  title: string
  description: string
  icon: string
}

export interface DashboardMobileCategoryItem {
  id: string
  name: string
  questionCount: number
  icon: string
  routePath: string
}

export interface DashboardMobileView {
  profileName: string
  outletName: string
  eyebrow: string
  title: string
  subtitle: string
  progressLabel: string
  primaryActionLabel: string
  primaryActionPath: string
  secondaryActionLabel: string
  secondaryActionPath: string
  priorityDescription: string
}

export interface DashboardMobileState {
  view: DashboardMobileView
  priorityItems: DashboardMobilePriorityItem[]
}
