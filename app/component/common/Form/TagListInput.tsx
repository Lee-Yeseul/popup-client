import { FormContext } from '.'
import Tag from '../Tag'
import { KeyboardEvent, useContext, useState } from 'react'

type TagListInputProps = {
  className: string
  name: string
  placeholder: string
  type?: string
  label?: boolean | string
}

export default function TagListInput({
  className,
  name,
  placeholder,
  type,
  label,
}: TagListInputProps) {
  const [inputValue, setInputValue] = useState('')
  const { errors, setValue, getValues } = useContext(FormContext)
  const [currentTagList, setCurrentTagList] = useState<string[]>(
    getValues(name) || [],
  )

  const onClickClearButton = () => {
    if (!inputValue) return
    setInputValue('')
  }
  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter' || !inputValue) return
    const isPresent = currentTagList.find((tag: string) => tag === inputValue)
    if (!isPresent) {
      setValue(name, [...currentTagList, inputValue])
      setCurrentTagList((prev) => [...prev, inputValue])
    }

    setInputValue('')
  }

  const handleClickRemoveButton = (selectedTag: string) => {
    const filteredTagList = currentTagList.filter((tag) => tag !== selectedTag)
    setValue(name, [...filteredTagList])
    setCurrentTagList([...filteredTagList])
  }
  return (
    <div>
      {label && (
        <label htmlFor={name} className="text-sm font-semibold">
          {typeof label === 'string' ? label : name}
        </label>
      )}
      <div className="relative">
        <input
          value={inputValue}
          className={`${
            errors[name] ? 'border-red-500' : ''
          } mt-1 border-1 border-solid focus:border-1 focus:border-gray-400 focus:outline-none ${className}`}
          placeholder={placeholder}
          type={type ?? 'text'}
          onChange={(e) => setInputValue(e.currentTarget.value)}
          onKeyDown={onKeyDown}
        />
        {inputValue && (
          <button
            type="button"
            className="absolute inset-y-0 right-3 text-sm text-gray-300 hover:text-gray-500"
            onClick={onClickClearButton}
          >
            ✕
          </button>
        )}
      </div>
      <div className="my-2 flex gap-2">
        {currentTagList.map((tag) => (
          <Tag
            key={tag}
            value={tag}
            removable={true}
            onClickRemoveButton={() => handleClickRemoveButton(tag)}
            className=" w-fit bg-lime-100 text-sm/6 text-green-600"
          />
        ))}
      </div>
    </div>
  )
}
