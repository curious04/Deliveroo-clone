import { View, Text } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import CategoryCard from './CategoryCard'
import sanityClient, { urlFor } from '../sanity'
import { useState } from 'react'
import { useEffect } from 'react'

const Categories = () => {

  const [categories, setCategories] = useState([])

  useEffect(() => {
    sanityClient
      .fetch(
        `
    *[_type == "category"]
    `
      )
      .then(data => setCategories(data))
  }, [])

  return (
    <ScrollView
        contentContainerStyle={{
            paddingHorizontal: 15,
            paddingTop: 10,
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
    >
       {categories.map(category => (
        <CategoryCard
          key={category._id}
          imgUrl={urlFor(category.image).url()}
          title={category.name}
        />
      ))}
    </ScrollView>
  )
}

export default Categories