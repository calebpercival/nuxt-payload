<script setup>
defineProps({
  label: {
    type: String,
    default: "Search...",
  },
  placeholder: {
    type: String,
  },
  error: {
    type: String,
  },
  modelValue: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: "text",
  },
  multiline: {
    type: Boolean,
    default: false,
  },
  description: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:modelValue"]);

const handleInput = ($event) => {
  emit("update:modelValue", $event.target.value);
};
</script>

<template>
  <div
    class="input-wrapper"
    :class="[`type-${type}`, multiline ? `multiline` : '']"
  >
    <label for="name">
      {{ label }}
      <span class="validation-error">{{ error }}</span>
    </label>
    <span class="description" v-if="description">{{ description }}</span>
    <input
      class="input"
      :type="type"
      :value="modelValue"
      @input="handleInput($event)"
      :placeholder="placeholder"
      v-if="!multiline"
    />
    <textarea
      maxlength="700"
      class="input textarea"
      :value="modelValue"
      @input="handleInput($event)"
      rows="6"
      v-else
    ></textarea>
    <div v-if="$slots.default">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.input-wrapper {
  display: flex;
  flex-direction: column;
  //   &:not(.multiline) {
  //     max-width: 675px;
  //   }
}

textarea.input {
  padding-top: 5px;
  height: 145px;
  resize: none;
}

.input {
  min-height: 48px;
  border: none;
  background-color: #ffffff;
  color: #1b232a;
  padding: 0 15px;
  font-size: 20px;
  width: 100%;
  &:focus {
    outline: none;
  }
}

label {
  font-size: 32px;
  font-style: normal;
  font-weight: 400;
  z-index: 2;
  text-transform: uppercase;
  .validation-error {
    font-weight: 200;
    font-size: 16px;
    color: red;
  }
}

.input[type="checkbox"] {
  min-height: 32px;
  min-width: 32px;
  width: fit-content;
  margin: 0;
}

.type-checkbox {
  flex-direction: row-reverse;
  width: fit-content;
  gap: 20px;
  align-items: flex-start;
  align-items: center;
  align-self: flex-end;
  min-height: 32px;
  width: 100%;
  label {
    font-size: 20px;
    width: 100%;
  }
  // .validation-error {
  //   position: absolute;
  //   top: 50%;
  //   left: 50%;
  // }
}

:not(.type-checkbox) > label {
  margin: 0 0 10px 0;
}

.description {
  font-size: 22px;
  margin-bottom: 10px;
  font-weight: 700;
}

::placeholder {
  color: #242424;
  opacity: 1; /* Firefox */
}

::-ms-input-placeholder {
  /* Edge 12 -18 */
  color: #242424;
}
</style>
