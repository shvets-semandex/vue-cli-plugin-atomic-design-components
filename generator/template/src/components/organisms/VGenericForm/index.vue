<template>
  <form class="v-o-generic-form" @submit="handleSubmit">
    <div
      :class="[
        'v-o-generic-form__section',
        `v-o-generic-form__section--${field.name}`,
        `${$v.formData[field.name] && $v.formData[field.name].$error ? 'v-o-generic-form__section--error' : ''}`
      ]"
      v-for="field in visibleFields"
      :key="field.name"
    >
      <component
        :is="field.component"
        :type="field.type"
        :label="field.label"
        :name="field.name.toLowerCase()"
        :options="field.options"
        :disabled="field.disabled"
        :checked="field.checked"
        :placeholder="field.placeholder"
        :autocomplete="field.autocomplete"
        :value="formData[field.name]"
        :error="$v.formData[field.name] ? $v.formData[field.name].$error : false"
        :errorMessages="field.errorMessage || $getErrorMessages(field.name, field.visibleValidation)"
        :validations="validations || null"
        @input="value => handleInput(field.name, value)"
        @change="value => handleInput(field.name, value)"
        @blur="$v.formData[field.name] ? $v.formData[field.name].$touch() : () => {}"
      />
    </div>

    <VButton type="submit">Login</VButton>
  </form>
</template>

<script>
import VFormText from 'molecules/VFormText'
import VFormRadio from 'molecules/VFormRadio'
import VFormSelect from 'molecules/VFormSelect'
import VFormCheckbox from 'molecules/VFormCheckbox'
import VFormTel from 'molecules/VFormTel'
import VFormPayment from 'organisms/VFormPayment'
import VButton from 'atoms/VButton'

import validationErrorMessages from '@/mixins/validationErrorMessages'
import scrollTo from '@/mixins/scrollTo'

export default {
  name: 'VGenericForm',
  components: {
    VFormText,
    VFormRadio,
    VFormCheckbox,
    VFormSelect,
    VFormPayment,
    VFormTel,
    VButton
  },
  mixins: [validationErrorMessages, scrollTo],
  props: {
    fields: {
      type: Array,
      required: true
    },
    validations: {
      type: Object
    },
    value: {
      type: Object,
      required: true
    }
  },
  computed: {
    visibleFields () {
      return this.fields.filter(formField => {
        if (formField && formField.conditionalRendering) {
          let { $v } = this
          let { field, operator, value } = formField.conditionalRendering
          let validationField = $v.formData[field]

          if (operator === '==') {
            return validationField.$model === value
          }

          if (operator === '!=') {
            return validationField.$model !== value
          }

          return false
        }

        return true
      })
    }
  },
  data () {
    return {
      formData: this.value
    }
  },
  methods: {
    handleInput (name, value) {
      this.$set(this.formData, name, value)
      this.$emit('input', this.formData)
    },
    handleSubmit (e) {
      e.preventDefault()
      this.$v.formData.$touch()

      if (!this.$v.$invalid) {
        this.$emit('submit', this.formData)
      } else {
        setTimeout(() => this.$scrollTo('.v-o-generic-form__section--error', 400, -20), 100)
      }
    }
  },
  validations () {
    return {
      formData: this.validations
    }
  }
}
</script>

<style lang="scss">
.v-o-generic-form {
  max-width: 60rem;

  &__section {
    margin-bottom: 2rem;

    &:last-child {
      margin: 0;
    }
  }
}
</style>
