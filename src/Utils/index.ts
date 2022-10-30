import { Dimensions, PixelRatio } from 'react-native'

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')

const widthBaseScale = SCREEN_WIDTH / 375
const heightBaseScale = SCREEN_HEIGHT / 812

export function normalize(size: number, based = 'width') {
  const newSize =
    based === 'height' ? size * heightBaseScale : size * widthBaseScale
  return Math.round(PixelRatio.roundToNearestPixel(newSize))
}

//for width  pixel
const wp = (size: number) => {
  return normalize(size, 'width')
}
//for height  pixel
const hp = (size: number) => {
  return normalize(size, 'height')
}
//for font  pixel
const fp = (size: number) => {
  return hp(size)
}
//for Margin and Padding vertical pixel
const pv = (size: number) => {
  return hp(size)
}
//for Margin and Padding horizontal pixel
const ph = (size: number) => {
  return wp(size)
}

export { hp, wp, SCREEN_WIDTH, SCREEN_HEIGHT, ph, pv, fp }
