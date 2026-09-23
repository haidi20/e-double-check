export interface FeatureAction {
  title: string
  description: string
}

export interface FeatureContent {
  title: string
  subtitle: string
  description: string
  usage: string
  status: string
  actions: FeatureAction[]
}

export interface SummaryCard {
  label?: string
  value?: string
  title?: string
  description: string
  icon?: string
}

export interface DummyDataItem {
  id: number
  code: string
  name: string
  category: string
  owner: string
  status: string
  description: string
}

export interface VehicleRow {
  code: string
  plateNumber: string
  vehicleName: string
  vehicleType: string
  capacity: string
  defaultDriver: string
  depot: string
  documentStatus: string
  availability: string
}

export interface VehicleFormDraft {
  plateNumber: string
  vehicleType: string
  capacity: string
  defaultDriver: string
  depot: string
  documentStatus: string
}

export interface VehiclesView extends FeatureContent {
  mode: 'master'
  headingTitle: string
  primaryActionLabel: string
  dummyData: DummyDataItem[]
  masterCards: SummaryCard[]
  searchPlaceholder: string
  vehicleRows: VehicleRow[]
  formTitle: string
  formSubtitle: string
  formSubmitLabel: string
  formSuccessMessage: string
  isFormModalOpen: boolean
  isFormSubmitted: boolean
  formDraft: VehicleFormDraft
}

export interface VehiclesState extends FeatureContent {
  dummyData: DummyDataItem[]
  view: VehiclesView
}
