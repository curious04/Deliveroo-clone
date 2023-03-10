import { View, Text, Image} from 'react-native'
import React from 'react'
import { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import CurrencyFormat from 'react-currency-format'
import { MinusCircleIcon, PlusCircleIcon } from 'react-native-heroicons/solid'
import { urlFor } from '../sanity'

export default function DishRow({ id, name, desc, price, image }) {

    const [isPressed, setIsPressed] = useState(false)
  return (
    <>
    <TouchableOpacity
        onPress={() => {
          setIsPressed(!isPressed)
        }}
        className={`bg-white border p-4 border-gray-200 ${
          isPressed && `border-b-0`
        }`}
      >
        <View className="flex-row">
          <View className="flex-1 pr-2">
            <Text className="text-lg mb-1">{name}</Text>
            <Text className="text-gray-400">{desc}</Text>
            <CurrencyFormat
              value={price}
              displayType={'text'}
              thousandSeparator={true}
              prefix={'₹'}
              renderText={value => <Text>{value}</Text>}
            />
          </View>
          <View>
            <Image
              style={{ borderWidth: 1, borderColor: '#F3F3F4' }}
              source={{ uri: urlFor(image).url() }}
              className="h-20 w-20 bg-gray-300 p-4"
            />
          </View>
        </View>
      </TouchableOpacity>
      {isPressed && (
        <View className="bg-white px-4">
          <View className="flex-row items-center space-x-2 pb-3">
            <TouchableOpacity
            >
              <MinusCircleIcon
                color= '#00CCBB' 
                size={40}
              />
            </TouchableOpacity>
            <Text>0</Text>
            <TouchableOpacity>
              <PlusCircleIcon color="#00CCBB" size={40} />
            </TouchableOpacity>
          </View>
        </View>
      )}
  </>
  )
}