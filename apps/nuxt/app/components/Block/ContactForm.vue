<script setup>
const props = defineProps({
  submitButton: {
    type: String,
  },
  confirmationMessage: {
    type: String,
  },
});

const name = ref("");
const email = ref("");
const message = ref("");

const nameError = ref("");
const emailError = ref("");
const messageError = ref("");

const successMessage = ref(false);

const inputValidation = () => {
  let valid = true;

  emailError.value = "";
  nameError.value = "";
  messageError.value = "";

  if (!name.value) {
    nameError.value = "* Required";
    valid = false;
  }

  if (!message.value) {
    messageError.value = "* Required";
    valid = false;
  }

  if (!email.value) {
    emailError.value = "* Required";
    valid = false;
  } else if (!validateEmail(email.value)) {
    emailError.value = "* Invalid email";
    valid = false;
  }
  return valid;
};

const submitForm = async () => {
  if (!inputValidation()) {
    console.log("Invalid inputs");
    return;
  }

  const validationResponse = await $fetch("/api/validateTurnstile", {
    method: "POST",
    body: {
      token: token.value,
    },
  });

  if (!validationResponse.success) {
    console.log("Captcha failed");
    return;
  }

  const response = await $fetch(`/api/sendgrid/sendMail`, {
    method: "POST",
    body: {
      name: name.value,
      email: email.value,
      message: message.value,
    },
  });

  if (response.statusCode === 202) {
    name.value = "";
    email.value = "";
    message.value = "";
    successMessage.value = true;
  }
};
</script>

<template>
  <div class="form-wrapper" v-if="!successMessage">
    <SubInput
      v-model="name"
      label="Your name"
      placeholder="Your name"
      :error="nameError"
    />
    <SubInput
      v-model="email"
      label="Email"
      placeholder="Email"
      :error="emailError"
    />

    <SubInput
      v-model="message"
      label="Message"
      placeholder="Message"
      class="message"
      :error="messageError"
      textarea
      multiline
    />
    <NuxtTurnstile ref="turnstile" v-model="token" class="turnstile" />
    <BlockButton alignment="left" @click="submitForm" class="submit">{{
      submitButton
    }}</BlockButton>
  </div>
  <div v-else class="successMessage">
    <p>{{ confirmationMessage }}</p>
  </div>
</template>

<style lang="scss" scoped>
@use "~/assets/scss/breakpoints.scss" as *;

.form-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  .message {
    grid-column: 1 / 3;
  }
  .submit {
    grid-column: 1;
  }
}

@include mobile() {
  .form-wrapper {
    grid-template-columns: 1fr;

    .message {
      grid-column: 1;
    }
  }
}
</style>
