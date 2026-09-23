export type StateWithView = {
  view: Record<string, unknown>
}

type StateViewRegistry = Map<string, Record<string, unknown>>

const stateViewRegistry = ((globalThis as typeof globalThis & { __stateViewRegistry?: StateViewRegistry }).__stateViewRegistry ??= new Map())

export const registerStateHmr = (view: Record<string, unknown>, stateKey: string) => {
  stateViewRegistry.set(stateKey, view)
}

export const syncStateHmr = (stateKey: string, module: unknown, stateExportName: string) => {
  const stateModule = module as Record<string, StateWithView> | undefined
  const nextState = stateModule?.[stateExportName]
  const targetView = stateViewRegistry.get(stateKey)

  if (nextState?.view && targetView) {
    Object.assign(targetView, nextState.view)
  }
}
