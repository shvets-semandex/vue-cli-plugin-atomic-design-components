import { storiesOf } from '@storybook/vue'
import VueInfoAddon from 'storybook-addon-vue-info'
import VHeading from '.'

const wrapper = {
  components: { VHeading },
  propsDescription: {
    level: `VHeading level. Options[1, 2, 3, 4]. For example '1' will result in a <h1> tag`
  }
}

storiesOf('Atom - VHeading', module)
  .addDecorator(VueInfoAddon)
  .add('level', () => ({
    ...wrapper,
    template: `
      <div>
        <VHeading :level="1">Heading 1</VHeading>
        <VHeading :level="2">Heading 2</VHeading>
        <VHeading :level="3">Heading 3</VHeading>
        <VHeading :level="4">Heading 4</VHeading>
      </div>
    `
  }))
