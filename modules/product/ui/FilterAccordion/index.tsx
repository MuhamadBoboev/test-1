'use client'
import { ICategory, ISubcategory } from '@modules/catalog'
import { IProvider } from '@modules/provider'
import { FilterAccordionItem } from '@modules/product/ui/FilterAccordionItem'
import { FilterCheckbox } from '@modules/product/ui/FilterCheckbox'
import { ParseProductRequestParamsReturnType } from '@modules/product/model/ParseProductRequestParamsReturnType'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

interface Props {
  params: ParseProductRequestParamsReturnType
  categories: ICategory[]
  providers: IProvider[]
  selectedCategories: number[]
  setSelectedCategories: Dispatch<SetStateAction<number[]>>
  selectedSubcategories: number[]
  setSelectedSubcategories: Dispatch<SetStateAction<number[]>>
  selectedProviders: number[]
  setSelectedProviders: Dispatch<SetStateAction<number[]>>
  viewType: 'products' | 'collections'
}

function FilterAccordion({
                           categories,
                           providers,
                           selectedProviders,
                           setSelectedProviders,
                           setSelectedCategories,
                           setSelectedSubcategories,
                           selectedSubcategories,
                           selectedCategories,
                         }: Props) {
  const [filteredSubcategories, setFilteredSubcategories] = useState<ISubcategory[]>([])
  const [filteredProviders, setFilteredProviders] = useState<IProvider[]>([])

  const toggleCategory = (selectedId: number) => {
    if (selectedCategories.includes(selectedId)) {
      setSelectedCategories(selectedCategories.filter(id => id !== selectedId))
      setSelectedProviders([])
      setSelectedSubcategories([])
    } else {
      setSelectedCategories([...selectedCategories, selectedId])
    }
  }

  const toggleSubcategory = (selectedId: number) => {
    if (selectedSubcategories.includes(selectedId)) {
      setSelectedSubcategories(selectedSubcategories.filter(id => id !== selectedId))
      setSelectedProviders([])
    } else {
      setSelectedSubcategories([...selectedSubcategories, selectedId])
      setSelectedProviders([])
    }
  }

  const toggleProvider = (selectedId: number) => {
    if (selectedProviders.includes(selectedId)) {
      setSelectedProviders(selectedProviders.filter(id => id !== selectedId))
    } else {
      setSelectedProviders([...selectedProviders, selectedId])
    }
  }

  useEffect(() => {
    const subcategories: ISubcategory[] = []
    const filteredCategories = categories.filter(({id}) => selectedCategories.includes(id))
    filteredCategories.forEach((category) => subcategories.push(...category.subcategories))
    setFilteredSubcategories(subcategories)
  }, [selectedCategories])

  useEffect(() => {
    let filtered = providers
      .filter(({categories}) => categories.find(({id}) => selectedCategories.includes(id)))
    if (selectedSubcategories.length > 0) {
      filtered = filtered.filter(({subcategories}) => subcategories.find(({id}) => selectedSubcategories.includes(id)))
    }
    setFilteredProviders(filtered)
  }, [selectedCategories, selectedSubcategories])

  const subcategoriesDisabled = selectedCategories.length === 0 || filteredSubcategories.length === 0
  const providersDisabled = selectedCategories.length === 0 || filteredProviders.length === 0

  return (
    <>
      <FilterAccordionItem title="Категории" defaultOpen>
        {categories.map(({id, name}) => (
          <FilterCheckbox
            key={id}
            value={id}
            checked={selectedCategories.includes(id)}
            onChange={() => {
              toggleCategory(id)
            }}
          >
            {name}
          </FilterCheckbox>
        ))}
      </FilterAccordionItem>
      <FilterAccordionItem
        title="Подкатегории"
        disabled={subcategoriesDisabled}
        defaultOpen={selectedSubcategories.length > 0}
      >
        {filteredSubcategories.map(({id, name}) => (
          <FilterCheckbox
            key={id}
            value={id}
            checked={selectedSubcategories.includes(id)}
            onChange={() => {
              toggleSubcategory(id)
            }}
          >
            {name}
          </FilterCheckbox>
        ))}
      </FilterAccordionItem>
      <FilterAccordionItem
        title="Поставщики"
        disabled={providersDisabled}
        defaultOpen={selectedProviders.length > 0}
      >
        {filteredProviders.map(({id, name}) => (
          <FilterCheckbox
            key={id}
            value={id}
            checked={selectedProviders.includes(id)}
            onChange={() => {
              toggleProvider(id)
            }}
          >
            {name}
          </FilterCheckbox>
        ))}
      </FilterAccordionItem>
    </>
  )
}

export { FilterAccordion }
