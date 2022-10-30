import React, { SVGProps } from 'react'
import SvgIcon from 'react-native-svg-icon'
import svgs from './icons'

function Icon(props: SVGProps<any>) {
  return <SvgIcon {...props} svgs={svgs()} />
}

export default Icon
