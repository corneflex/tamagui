import { ProductCard } from 'app/features/products/components/ProductCard'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/Button',
  component: ProductCard,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
}

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary = {
  args: {
    primary: true,
    label: 'Button',
    product: {
      id: 1,
      name: 'Product 1',
      image: {
        thumb: {
          url: 'https://images.openfoodfacts.org/images/products/301/762/042/2003/front_fr.594.200.jpg',
          height: 200,
          width: 150,
        },
      },
      nutriscore: 'a',
      ecoscore: 'a',
      novaGroup: 1,
    },
  },
}

export const Secondary = {
  args: {
    label: 'Button',
    width: 100,
    height: 100,
  },
}

export const Large = {
  args: {
    size: 'large',
    label: 'Button',
  },
}

export const Small = {
  args: {
    size: 'small',
    label: 'Button',
  },
}
