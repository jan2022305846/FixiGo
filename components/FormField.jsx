import { Image, View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { icons } from "../constants"
const FormField = ({ title, value, placeholder, handleChangeText, otherStyles, ...props}) => {

  const [showPassword, setshowPassword] = useState (false) 
  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className=" text-base text-white font-pmedium">{title}</Text>
      <View className="border-2 border-blue-200 w-full h-16 px-4 bg-white rounded-2xl focus:border-secondary items-center flex-row">
      <TextInput 
      className="flex-1 text-black font-psemibold text-base"
      value={value}
      placeholder={placeholder}
      placeholderTextColor="black"
      onChangeText={handleChangeText}
      secureTextEntry={title === 'Password' && !showPassword}
      />

      {title=== 'Password' && (
        <TouchableOpacity onPress={() => setshowPassword(!showPassword)}>
          <Image source={!showPassword ? icons.eye : icons.eyeHide}
            className="w-6 h-6 "
            resizeMode='contain'
          /> 
        </TouchableOpacity>
      )}
      </View>
    </View>
  )
}

export default FormField