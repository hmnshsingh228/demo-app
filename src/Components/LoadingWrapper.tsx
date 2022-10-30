/* eslint-disable react/require-default-props */
/* eslint-disable react/no-unused-prop-types */
/*
 * Project: alautun
 * Created Date: Saturday, January 8th 2022
 * Author: Sourav Jangra
 * -----
 * Last Modified: Friday, January 14th 2022 12:07:17 pm
 * Modified By: Himanshu Singh
 * -----
 * Copyright (c) 2022 Radiansys Inc
 */

import { useTheme } from '@/Hooks'
import React from 'react'
import { ActivityIndicator, View } from 'react-native'

interface LoadingWrapperProps {
  children?: React.ReactNode
  loading?: boolean
}

function LoadingWrapper(props: LoadingWrapperProps) {
  const { Layout } = useTheme()
  const { children, loading } = props
  return (
    <View>
      {loading ? (
        <View style={[Layout.fullSize, Layout.center]}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        children
      )}
    </View>
  )
}

export default LoadingWrapper
