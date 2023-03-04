export type WithOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

export type EffectType = 'view' | 'edit' | 'delete' | null
