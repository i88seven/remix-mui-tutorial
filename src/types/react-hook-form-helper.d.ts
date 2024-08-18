import type { Control, FieldValues } from 'react-hook-form'

export type FormControlProp<T extends FieldValues = FieldValues> = Control<T>
