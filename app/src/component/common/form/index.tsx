import { FormEvent, createContext } from 'react'
import {
  DefaultValues,
  FieldValues,
  SubmitHandler,
  useForm,
} from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { CompoundItem } from '@/app/src/type'
import TextInput from './TextInput'
import TextareaInput from './TextareaInput'
import TagListInput from './TagListInput'
import SubmitButton from './SubmitButton'
import ImageInput from './ImageInput'
import CustomInput from './CustomInput'
import DatePicker from './DatePicker'
import Select from './Select'

type FormProps<T extends FieldValues> = CompoundItem & {
  handleSubmit: SubmitHandler<T>
  schema: z.ZodType<T>
  mode?: 'onBlur' | 'onChange' | 'onSubmit' | 'onTouched' | 'all'
  defaultValues?: DefaultValues<T>
}

/**
 * @TODO: formProvider type 만들기
 */
// type FormProvider<TFieldValues extends FieldValues = FieldValues> = {
//   errors: FieldErrors<TFieldValues>;
//   // reset: UseFormReset<TFieldValues>;
//   register: UseFormRegister<TFieldValues>;
// };

export const FormContext = createContext<any>(null)

export default function Form<Schema extends FieldValues>({
  children,
  className,
  handleSubmit: onSumbit,
  schema,
  mode = 'onSubmit',
  defaultValues,
}: FormProps<Schema>) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    resetField,
    control,
    setValue,
    getValues,
  } = useForm<Schema>({
    resolver: zodResolver(schema),
    mode: mode,
    defaultValues: defaultValues
      ? defaultValues
      : ({} as DefaultValues<Schema>),
  })

  const providerValue = {
    register,
    watch,
    errors,
    resetField,
    control,
    setValue,
    getValues,
    handleSubmit,
    onSumbit,
  }

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    handleSubmit(onSumbit)()
  }

  return (
    <FormContext.Provider value={providerValue}>
      <form onSubmit={handleFormSubmit} className={className}>
        {children}
      </form>
    </FormContext.Provider>
  )
}

Form.TextInput = TextInput
Form.TextareaInput = TextareaInput
Form.TagListInput = TagListInput
Form.ImageInput = ImageInput
Form.CustomInput = CustomInput
Form.DatePicker = DatePicker
Form.Select = Select
Form.SubmitButton = SubmitButton
