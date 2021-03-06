import { storiesOf } from '@storybook/vue'
import VueInfoAddon from 'storybook-addon-vue-info'
import VFormSelect from '.'

const wrapper = {
  components: { VFormSelect },
  propsDescription: {
    label: 'Label text for the field',
    required: 'Whether the field is required',
    error: 'Whether select value is invalid',
    value: 'Value of the select',
    name: 'name attribute for select',
    errorMessages: 'The error messages shown if the input validation is failed',
    options: 'Available options for the select. A single option format is: { label: String, value: String, disabled: Boolean }',
    disabled: 'Disabled attribute for the select',
    errorMessage: 'The error message shown if the select validation is failed',
    autocomplete: 'Autocomplete attribute used for browser autocomplete',
    emptyValueLabel: 'Placeholder text for first item in the select'
  }
}

const options = [
  {
    label: 'Option A',
    value: 'a'
  },
  {
    label: 'Option B',
    value: 'b'
  },
  {
    label: 'Option C',
    value: 'c'
  },
  {
    label: 'Option D',
    value: 'd',
    disabled: true
  }
]

storiesOf('Molecule - VFormSelect', module)
  .addDecorator(VueInfoAddon)
  .add('default', () => ({
    ...wrapper,
    template: `
      <div>
        <VFormSelect
          label="Choose your country"
          emptyValueLabel="Please select a country"
          v-model="frieldValue"
          :options="options"
        />

        <br/><br/>

        Field value is: {{ frieldValue }}
      </div>
    `,
    data () {
      return {
        frieldValue: 'c',
        options
      }
    }
  }))
  .add('invalid', () => ({
    ...wrapper,
    template: `
      <VFormSelect
        label="Choose your country"
        v-model="frieldValue"
        :options="options"
        error
        errorMessage="Please choose one of the options"
      />
    `,
    data () {
      return {
        frieldValue: '',
        options
      }
    }
  }))
  .add('required', () => ({
    ...wrapper,
    template: `
      <VFormSelect
        label="Choose your country"
        v-model="frieldValue"
        :options="options"
        required
      />
    `,
    data () {
      return {
        frieldValue: '',
        options
      }
    }
  }))
  .add('disabled', () => ({
    ...wrapper,
    template: `
      <VFormSelect
        label="Choose your country"
        disabled
        v-model="frieldValue"
        :options="options"
      />
    `,
    data () {
      return {
        frieldValue: '',
        options
      }
    }
  }))
