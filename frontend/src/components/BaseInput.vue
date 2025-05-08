<template>
  <input
    :id="id"
    :type="type"
    :placeholder="placeholder"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    class="base-input"
  />
</template>

<script setup>
defineProps({
  id: String,
  type: {
    type: String,
    default: "text",
  },
  placeholder: String,
  modelValue: String,
});

defineEmits(["update:modelValue"]);
</script>

<style scoped>
.base-input {
  background-color: #f5f5f5;
  font-family: "Cal Sans", sans-serif;
  color: #2c2a29;
  height: 40px;
  width: 240px;
  text-align: center;
  border-radius: 6px;
  border: none;
  box-shadow: inset 5px 3px 3px #776b5d;
  padding: 0 12px;
}
</style>
