<script lang="ts">
export default defineComponent({ inheritAttrs: false });
</script>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    name: string;
    modelValue: string;
    label: string;
    identifier?: string;
    isLarge?: boolean;
    notRequired?: boolean;
    type?: string;
    error?: { message: string; field: string; clear: () => void };
  }>(),
  { isLarge: false, notRequired: false, type: "text" }
);

const emit = defineEmits(["update:modelValue", "clearError"]);
const content = useModelWrapper(props, emit);

const hasError = computed(
  () => props.error?.message && props.error.field === props.name
);

function onInput() {
  if (hasError) props.error?.clear();
}
</script>

<template>
  <div class="input-field" :class="{ 'input-field--has-error': hasError }">
    <label :for="identifier || name">{{ label }}</label>
    <div class="input-field__input-container">
      <InputBase
        :id="identifier || name"
        :name="name"
        :type="type"
        v-bind="$attrs"
        v-model="content"
        :required="!notRequired"
        @input="onInput"
      />
      <span v-if="!notRequired" class="input-field__required-patch"></span>
    </div>
    <div v-if="error && hasError" class="input-field__error">
      {{ error.message }}
    </div>
  </div>
</template>

<style scoped lang="sass">
@use "~~/assets/styles/mixins" as *

.input-field
  label
    +mb(4px)
    +block
    +fw-semibold
    +fs-lg


  +e(input-container)
    +pos-r

  +e(required-patch)
    +center-v
    right: 15px

    +clr-bg(danger)
    +size(8px)
    +br-cr

  +e(error)
    +clr-txt(input-error)
    +block
    +tran
    +fw-medium
    +fs-sm

  +m(has-error)
    ::v-deep(input)
      +clr-bg(input-error, 0.4)
</style>
