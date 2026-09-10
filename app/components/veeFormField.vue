<template>
  <div>
    <Field
        v-if="type === 'text'"
        v-slot="{ field, errors }"
        v-model="fieldValue"
        :name="name"
        :rules="rules"
        color="primary"
    >
      <v-text-field
          v-bind="field"
          v-model="fieldValue"
          :autofocus="autoFocus"
          :disabled="disabled"
          :label="name"
          :error-messages="errors"
          :maxlength="maxLength"
          :hint="hint"
          :persistent-hint="persistentHint"
          :density="density"
      />
    </Field>
    <Field
        v-if="type === 'textarea'"
        v-slot="{ field, errors }"
        v-model="fieldValue"
        :name="name"
        :rules="rules"
        color="primary"
    >
      <v-textarea
          v-bind="field"
          v-model="fieldValue"
          :autofocus="autoFocus"
          :disabled="disabled"
          :label="name"
          :error-messages="errors"
          :hint="hint"
          :persistent-hint="persistentHint"
          :density="density"
      />
    </Field>
    <Field
        v-if="type === 'password'"
        v-slot="{ field, errors }"
        v-model="fieldValue"
        :name="name"
        :rules="rules"
        color="primary"
    >
      <v-text-field
          v-bind="field"
          v-model="fieldValue"
          :autofocus="autoFocus"
          :disabled="disabled"
          :label="name"
          :error-messages="errors"
          :maxlength="maxLength"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPassword ? 'text' : 'password'"
          :hint="hint"
          :persistent-hint="persistentHint"
          :density="density"
          autocomplete="off"
          @click:append="showPassword = !showPassword"
      />
    </Field>
    <Field
        v-if="type === 'checkbox'"
        v-slot="{ field, errors }"
        v-model="fieldValue"
        :name="name"
        :rules="rules"
        color="primary"
    >
      <v-checkbox
          v-bind="field"
          v-model="fieldValue"
          :autofocus="autoFocus"
          :disabled="disabled"
          :label="name"
          :error-messages="errors"
          :hint="hint"
          :persistent-hint="persistentHint"
          :density="density"
      />
    </Field>
    <Field
        v-if="type === 'switch'"
        v-slot="{ field, errors }"
        v-model="fieldValue"
        :name="name"
        :rules="rules"
        color="primary"
    >
      <v-switch
          v-bind="field"
          v-model="fieldValue"
          :autofocus="autoFocus"
          :disabled="disabled"
          :label="name"
          :error-messages="errors"
          :hint="hint"
          :persistent-hint="persistentHint"
          :density="density"
      />
    </Field>
    <Field
        v-if="type === 'radio'"
        v-slot="{ field, errors }"
        v-model="fieldValue"
        :name="name"
        :rules="rules"
        color="primary"
    >
      <v-radio-group
          v-bind="field"
          v-model="fieldValue"
          :autofocus="autoFocus"
          :disabled="disabled"
          :error-messages="errors"
          :hint="hint"
          :persistent-hint="persistentHint"
          :density="density"
          inline
      >
        <v-radio
            v-for="item in selectItems"
            :key="item.label"
            :label="item.label"
            :value="item.value"/>
      </v-radio-group>
    </Field>
    <Field
        v-if="type === 'number'"
        v-slot="{ field, errors }"
        v-model="fieldValue"
        :name="name"
        :rules="rules"
        color="primary"
    >
      <v-text-field
          v-bind="field"
          v-model="fieldValue"
          :autofocus="autoFocus"
          :disabled="disabled"
          :label="name"
          :error-messages="errors"
          :maxlength="maxLength"
          type="number"
          :hint="hint"
          :persistent-hint="persistentHint"
          :density="density"
      />
    </Field>
    <Field
        v-if="type === 'select'"
        v-slot="{ field, errors }"
        v-model="fieldValue"
        :name="name"
        :rules="rules"
        color="primary"
    >
      <v-select
          v-bind="field"
          v-model="fieldValue"
          :menu-props="{ auto: true}"
          :items="selectItems"
          :item-title="optionText"
          :item-value="selectValue"
          :autofocus="autoFocus"
          :disabled="disabled"
          :label="name"
          :error-messages="errors"
          :hint="hint"
          :persistent-hint="persistentHint"
          :density="density"
      />
    </Field>
    <Field
        v-if="type === 'autocomplete'"
        v-slot="{ field, errors }"
        v-model="fieldValue"
        :name="name"
        :rules="rules"
        color="primary"
    >
      <v-autocomplete
          v-bind="field"
          v-model="fieldValue"
          :menu-props="{ auto: true}"
          :items="selectItems"
          :item-text="optionText"
          :item-value="selectValue"
          :autofocus="autoFocus"
          :disabled="disabled"
          :label="name"
          :error-messages="errors"
          :hint="hint"
          :persistent-hint="persistentHint"
          :density="density"
      />
    </Field>
    <Field
        v-if="type === 'money'"
        v-slot="{ field, errors }"
        v-model="fieldValue"
        :name="name"
        :rules="rules"
        color="primary"
    >
      <v-text-field
          v-bind="field"
          v-model="fieldValue"
          :autofocus="autoFocus"
          :disabled="disabled"
          :label="name"
          :error-messages="errors"
          :maxlength="maxLength"
          type="number"
          :hint="hint"
          :persistent-hint="persistentHint"
          :density="density"
          prefix="$"
      />
    </Field>
    <Field
        v-if="type === 'date'"
        v-slot="{ field, errors }"
        v-model="fieldValue"
        :name="name"
        :rules="rules"
        color="primary"
    >
      <date-picker
          v-bind="field"
          v-model="fieldValue"
          v-model:date-prop="fieldValue"
          :autofocus="autoFocus"
          :disabled="disabled"
          :label="name"
          :error-messages="errors"
          :maxlength="maxLength"
          :hint="hint"
          :persistent-hint="persistentHint"
          autocomplete="off"
          :density="density"
          @change="changeEvent"
      />
    </Field>
    <Field
        v-if="type === 'file'"
        v-slot="{ errors }"
        v-model="fieldValue"
        :name="name"
        :rules="rules"
        color="primary"
    >
      <v-file-input
          v-model="fieldValue"
          :autofocus="autoFocus"
          :disabled="disabled"
          :label="name"
          :error-messages="errors"
          :hint="hint"
          :persistent-hint="persistentHint"
          outlined
          :density="density"
          @change="changeEvent"
      />
    </Field>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Field } from 'vee-validate'

const props = defineProps({
  type: String,
  name: String,
  rules: String,
  value: [String, Date, Boolean, Number],
  autoFocus: {
    default: false,
    type: Boolean
  },
  disabled: Boolean,
  maxLength: {
    default: 25,
    type: Number
  },
  hint: String,
  persistentHint: Boolean,
  selectItems: Array,
  selectValue: String,
  selectText: String,
  selectTextAppend: String,
  density: String
})

const showPassword = ref(false)

const fieldValue = defineModel()
const emit = defineEmits(['change'])

function optionText (item) {
  if (props.selectTextAppend == null) {
    return `${item[props.selectText]}`
  }
  return `${item[props.selectText]} - ${item[props.selectTextAppend]}`
}

function changeEvent () {
  emit('change')
}

</script>

<style scoped>

</style>
