import { XStack, Image as TamaImage, YStack, H3, H4, StackProps } from '@corneflex/ui'
import { Image } from '../../model/Image'

export interface HeaderProps extends StackProps {
  image?: Image
  title?: string
  subtitle?: string
}

export const Header: React.FC<HeaderProps> = ({ image, title, subtitle, ...props }) => {
  return (
    <XStack ai="center" space {...props}>
      <TamaImage
        resizeMode="cover"
        borderRadius={10}
        width={image?.width}
        source={{
          uri: image?.url,
          height: image?.height,
          width: image?.width,
        }}
      ></TamaImage>
      <YStack f={1} maxWidth={200} $gtSm={{ maxWidth: 200 }} $gtMd={{ maxWidth: 300 }}>
        <H3 numberOfLines={2}>{title}</H3>
        <H4 theme={'alt2'}>{subtitle}</H4>
      </YStack>
    </XStack>
  )
}
