'use client'

import { useId, useState } from 'react'

import { CheckIcon, ChevronsUpDownIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList
} from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

import { cn } from '@/lib/utils'

const frameworks = [
  {
    value: '7days',
    label: 'Last 7 Days'
  },
  {
    value: '15days',
    label: 'Last 15 Days'
  },
  {
    value: '30days',
    label: 'Last 30 Days'
  },
  {
    value: 'allTime',
    label: 'All Time'
  }
]
type Props = {
  value: string
  onChange: (value: string) => void
}


const SelectAnalyticsTimeDropdown = ({ value, onChange }: Props) => {
  const id = useId()
  const [open, setOpen] = useState(false)

  return (
    <div className='w-full max-w-xs space-y-2'>
      {/* <Label htmlFor={id}>Combobox menu slide-in from bottom</Label> */}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id={id}
            variant='outline'
            role='combobox'
            aria-expanded={open}
            className='w-full max-w-xs justify-between'
          >
            {value ? frameworks.find(framework => framework.value === value)?.label : 'Select framework...'}
            <ChevronsUpDownIcon className='opacity-50' />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='data-[state=open]:zoom-in-100 data-[state=open]:slide-in-from-bottom-10 p-0 duration-400'>
          <Command>
            <CommandList>
              <CommandGroup>
                {frameworks.map(framework => (
                  <CommandItem
                    key={framework.value}
                    value={framework.value}
                    onSelect={(currentValue: string) => {
                      onChange(currentValue)
                      setOpen(false)
                    }}
                  >
                    {framework.label}
                    <CheckIcon className={cn('ml-auto', value === framework.value ? 'opacity-100' : 'opacity-0')} />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default SelectAnalyticsTimeDropdown
