/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect, useLayoutEffect } from 'react'
import {
  StatusBar,
  FlatList,
  RefreshControl,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native'
import LoadingWrapper from '@/Components/LoadingWrapper'
import { navigate, RootStackParamList } from '@/Navigators/utils'
import { useGetCityQuery } from '@/Services/city'
import { Record } from '@/Interface/city'
import { Routes } from '@/Utils/routes'
import { Colors } from '@/Theme/Variables'
import { TextInput } from 'react-native-gesture-handler'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useTheme } from '@/Hooks'

const SearchSceen = () => {
  const { Gutters, Fonts } = useTheme()
  const navigation = useNavigation()
  const route = useRoute()
  const [cityList, setCityList] = useState([])
  const [searchText, setSearchText] = useState('')
  const [pageNumber, setPageNumber] = useState(1)

  useLayoutEffect(() => {
    navigation?.setOptions({
      title: route.params?.item ? 'Change City' : 'Select City',
    })
  }, [navigation, route])

  const {
    data: cityData,
    isLoading,
    isFetching,
    refetch,
    isSuccess,
  } = useGetCityQuery({
    params: {
      page: pageNumber,
      search: searchText.toLowerCase(),
    },
  })

  useEffect(() => {
    let data = cityData?.data
    if (data) {
      if (data?.currentPage === 1) {
        setCityList(data?.Record)
      } else {
        setCityList(cityList?.concat(data?.Record))
      }
    }
  }, [cityData, isSuccess])

  const renderItems = (props: { item: Record }) => {
    const { item } = props

    return (
      <TouchableOpacity
        onPress={() =>
          navigate(Routes.Weather as keyof RootStackParamList, { item })
        }
        activeOpacity={0.8}
        style={[Gutters.smallVPadding, Gutters.smallHPadding]}
      >
        <Text style={[Fonts.textBold, Fonts.textSmall]}>{item?.name}</Text>
        <Text>{item?.country}</Text>
      </TouchableOpacity>
    )
  }

  const renderItemSeperator = () => {
    return <View style={Style.itemSeperator} />
  }

  const onEndReached = () => {
    if (
      !isLoading &&
      !isFetching &&
      cityData?.data?.currentPage &&
      cityData?.data?.currentPage < cityData?.data?.totalPages
    ) {
      setPageNumber(cityData?.data?.currentPage + 1)
    }
  }

  return (
    <View style={Style.container}>
      <StatusBar barStyle={'light-content'} translucent />

      <TextInput
        placeholder="Search"
        placeholderTextColor={'gray'}
        onChangeText={text => {
          setSearchText(text)
          setPageNumber(1)
        }}
        value={searchText}
        style={[
          Style.search,
          {
            borderColor: searchText.length > 0 ? Colors.blue : 'gray',
          },
        ]}
      />
      <LoadingWrapper loading={isLoading}>
        <FlatList
          showsVerticalScrollIndicator={false}
          style={{
            width: '100%',
            backgroundColor: Colors.light_blue,
          }}
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={() => {
                setPageNumber(1)
                refetch()
              }}
            />
          }
          data={cityList}
          renderItem={renderItems}
          ItemSeparatorComponent={renderItemSeperator}
          onEndReached={onEndReached}
          keyExtractor={(_item, index) => index.toString()}
          contentContainerStyle={{
            flexGrow: 1,
            marginHorizontal: 16,
          }}
        />
      </LoadingWrapper>
    </View>
  )
}

export const Style = StyleSheet.create({
  container: {
    backgroundColor: Colors.light_blue,
    flex: 1,
  },
  itemSeperator: {
    borderWidth: 1,
    width: '100%',
    borderColor: Colors.border,
  },
  search: {
    borderRadius: 5,
    color: 'black',
    marginHorizontal: 16,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
    height: 42,
    padding: 4,
  },
})

export default SearchSceen
