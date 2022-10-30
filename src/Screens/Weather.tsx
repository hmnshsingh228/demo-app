/* eslint-disable react-native/no-inline-styles */
import React, { useRef } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@/Hooks'
import { useAppDispatch } from '@/Store'
import LinearGradient from 'react-native-linear-gradient'
import { SafeAreaView } from 'react-native-safe-area-context'
import { hp, pv, wp } from '@/Utils'
import { Colors } from '@/Theme/Variables'
import moment from 'moment'
import Icon from '@/Assets/Icons'
import { navigate, RootStackParamList } from '@/Navigators/utils'
import { Routes } from '@/Utils/routes'
import { useGetWeatherQuery } from '@/Services/weather'
import { Config } from '@/Config'
import { Record } from '@/Interface/city'
import { useRoute } from '@react-navigation/native'

const WeatherSceen = () => {
  const { t } = useTranslation()
  const { Gutters, Layout, Fonts, Images } = useTheme()
  const dispatch = useAppDispatch()
  const ref = useRef(null)
  const route = useRoute()

  const cityData = route?.params?.item as Record

  const { data, isLoading, isFetching } = useGetWeatherQuery({
    params: {
      lat: cityData?.coord?.lat,
      lon: cityData?.coord?.lon,
      appid: Config.APP_ID,
      units: 'metric',
      exclude: 'current,minutely,hourly,alerts',
    },
  })

  const weatherView = (weather: string) => {
    return (
      <View>
        <Image
          style={Style.iconView}
          resizeMode="contain"
          source={weather === 'Clear' ? Images.sun : Images.cloud}
        />
        <Text style={[Fonts.textBold, { color: 'white' }, Gutters.tinyRMargin]}>
          {weather}
        </Text>
      </View>
    )
  }

  const renderCity = () => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigate(Routes.Search as keyof RootStackParamList, {
            item: cityData,
          })
        }
        style={[Layout.row, Layout.alignItemsCenter, Gutters.tinyTMargin]}
      >
        <Text style={[Fonts.textBold, { color: 'white' }, Gutters.tinyRMargin]}>
          {cityData?.name}
        </Text>
        <Icon
          name={'ChevronDown'}
          width={wp(15)}
          height={wp(15)}
          viewBox="0 0 20 20"
          style={{
            transform: [{ rotate: '-90deg' }],
            marginTop: pv(-8),
          }}
        />
      </TouchableOpacity>
    )
  }

  const renderWeather = () => {
    return (
      <View
        style={[
          Layout.row,
          Layout.alignItemsCenter,
          Layout.justifyContentBetween,
        ]}
      >
        <View>
          <Text style={[Fonts.textSmall, Fonts.textBold, { color: 'white' }]}>
            Current Weather
          </Text>
          {renderCity()}
        </View>
        <View style={[Layout.row, Layout.alignItemsCenter]}>
          <Text
            style={[
              Fonts.textBold,
              Gutters.smallRMargin,
              { color: 'white', fontSize: 19 },
            ]}
          >
            {Math.round(data?.daily?.[0]?.temp?.min ?? 0)}°
          </Text>
          {weatherView(data?.daily?.[0]?.weather?.[0]?.main)}
        </View>
        {renderDate()}
      </View>
    )
  }

  const renderDate = () => {
    return (
      <View
        style={[Style.dateWrapper, Gutters.smallHPadding, Gutters.tinyVPadding]}
      >
        <View
          style={[
            Layout.row,
            Layout.alignItemsCenter,
            Layout.justifyContentBetween,
          ]}
        >
          <Text
            style={[Fonts.textBold, Fonts.textSmall, { color: Colors.blue }]}
          >
            {moment().format('DD')}
          </Text>
          <Image
            style={[Style.iconView]}
            resizeMode="contain"
            source={Images.cal}
          />
        </View>
        <Text style={[Fonts.textBold, { fontSize: 10 }]}>
          {moment().format('dddd').substring(0, 3) + moment().format(', YYYY')}
        </Text>
      </View>
    )
  }

  const renderList = () => {
    return (
      <View style={[Layout.row, Gutters.regularTMargin]}>
        {data?.daily?.map((item, index) => {
          if (index !== 0) {
            return (
              <View style={{ flex: 0.14 }}>
                {weatherView(item?.weather?.[0]?.main)}
              </View>
            )
          }
        })}
      </View>
    )
  }

  return (
    <View>
      <LinearGradient colors={['#33CCCF', '#33CCCC', '#4DD0E1']}>
        <View
          style={[
            Gutters.regularHPadding,
            Gutters.smallTPadding,
            Gutters.regularBPadding,
          ]}
        >
          {renderWeather()}
          {renderList()}
        </View>
      </LinearGradient>
    </View>
  )
}

export const Style = StyleSheet.create({
  container: {
    backgroundColor: Colors.light_blue,
  },
  itemSeperator: {
    borderWidth: 1,
    width: '100%',
    borderColor: Colors.border,
  },
  iconView: {
    height: hp(20),
    width: wp(20),
  },
  dateWrapper: {
    borderRadius: 10,
    backgroundColor: Colors.white,
  },
})

export default WeatherSceen
