<template>
  <div :class="[
    'v-m-form-radio',
    `${error ? 'v-m-form-radio--error' : ''}`,
    `${success ? 'v-m-form-radio--success' : ''}`,
    `${disabled ? 'v-m-form-radio--disabled' : ''}`
  ]">
    <div class="v-m-form-radio__question">
      <VText v-if="label">
        <template v-if="required">* </template>{{ label }}
      </VText>
    </div>

    <div class="v-m-form-radio__options">
      <div
        v-for="option in options"
        :key="option.value"
        :class="[
          'v-m-form-radio__option',
          `${option.disabled || disabled ? 'v-m-form-radio__option--disabled' : '' }`
        ]"
      >
        <VLabel>
          <VInputRadio
            v-model="selectedValue"
            :value="option.value"
            :checked="disabled ? false : option.checked"
            :disabled="disabled ? disabled : option.disabled"
            :required="required"
          />

          {{ option.label }}
        </VLabel>
      </div>

      <VText v-if="error && errorMessage" size="x-small">{{ errorMessage }}</VText>
    </div>
  </div>
</template>

<script>
import { uid } from '@/helpers'

export default {
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    label: String,
    options: {
      type: Array,
      required: true
    },
    value: {
      type: String,
      default: ''
    },
    errorMessage: String,
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
    success: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    id () {
      return uid()
    }
  },
  watch: {
    selectedValue (newValue) {
      this.$emit('change', newValue)
    }
  },
  data () {
    return {
      selectedValue: this.value
    }
  }
}
</script>

<style lang="scss">
.v-m-form-radio {
  $this: &;

  &__question {
    margin-bottom: 1.5rem;
  }

  &__option {
    margin-bottom: 1.5rem;

    .v-a-input-radio {
      margin-right: .5rem;
    }

    .v-a-label {
      display: inline-flex;
      cursor: pointer;
    }

    &--disabled {
      .v-a-label {
        color: $grey;
        cursor: not-allowed;
      }

      .v-a-input-radio__circle {
        background: $grey-light;
      }
    }
  }

  &--error {
    .v-a-text{
      color: $error
    }
  }

  &--success {
    .v-a-text {
      color: $success
    }
  }

  &--disabled {
    .v-a-text,
    .v-a-label {
      color: $grey
    }
  }
}
</style>