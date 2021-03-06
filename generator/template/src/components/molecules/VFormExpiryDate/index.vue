<template>
  <div :class="[
    'v-m-form-expiry-date u-form-field',
    `${error ? 'u-form-field--error' : ''}`,
    `${disabled ? 'u-form-field--disabled' : ''}`
  ]">
    <div class="u-form-field__label">
      <VLabel
        v-if="label"
        :htmlFor="`#${id}`"
      >
        <template v-if="required">* </template>{{ label }}
      </VLabel>
    </div>

    <div class="u-form-field__input">
      <VInputText
        v-model="formattedExpiry"
        type="text"
        pattern="[0-9/]+"
        inputmode="numeric"
        :id="id"
        :required="required"
        :placeholder="placeholder"
        :disabled="disabled"
        :name="name"
        :autocomplete="autocomplete"
        @focus="$emit('focus', $event)"
        @blur="$emit('blur', $event)"
        @keypress="format"
        @change="handleChange"
        @paste="onPaste"
      />
    </div>

    <div class="u-form-field__validation-messages">
      <VValidationMessages :error="error" :errorMessages="errorMessages" />
    </div>
  </div>
</template>

<script>
import VValidationMessages from 'molecules/VValidationMessages'
import VInputText from 'atoms/VInputText'
import VLabel from 'atoms/VLabel'

import isNumberKey from '@/helpers/is-number-key'
import onlyDigits from '@/helpers/only-digits'
import limitLength from '@/helpers/limit-length'
import uid from '@/helpers/uid'

export default {
  name: 'VFormExpiryDate',
  components: {
    VValidationMessages,
    VInputText,
    VLabel
  },
  props: {
    name: String,
    value: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: 'MM/YY'
    },
    errorMessages: [String, Array],
    error: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    autocomplete: {
      type: String,
      default: 'cc-exp'
    }
  },
  data () {
    return {
      expiry: this.value ? onlyDigits(this.value).slice(0, 4) : '',
      lastDate: ''
    }
  },
  computed: {
    id () {
      return uid()
    },
    formattedExpiry: {
      get () {
        return this.formatDate(this.expiry)
      },
      set (newVal) {
        this.lastDate = this.expiry
        if (newVal.length === 1 && newVal > 1) newVal = `0${newVal}`
        this.expiry = this.lastDate.length >= newVal.length ? '' : onlyDigits(newVal).slice(0, 4)
        this.$emit('input', this.expiry)
      }
    }
  },
  watch: {
    'value' (newValue) {
      this.expiry = onlyDigits(newValue).slice(0, 4)
    }
  },
  methods: {
    handleChange (e) {
      let { value } = e.target
      this.expiry = onlyDigits(value).slice(0, 4)
    },
    format (e) {
      limitLength(e, 5)
      isNumberKey(e)
    },
    onPaste (e) {
      let clipboardData = e.clipboardData || window.clipboardData
      let pastedData = clipboardData.getData('Text')
      let isNumber = pastedData.match(/^[0-9/]+$/g)

      if (isNumber) {
        this.expiry = onlyDigits(pastedData).slice(0, 4)
      } else {
        e.preventDefault()
      }
    },
    formatDate (date) {
      if (date.length > 2) {
        let month = date.slice(0, 2)
        let year = date.slice(2, 4)
        return `${month}/${year}`
      }
      return date
    }
  }
}
</script>
