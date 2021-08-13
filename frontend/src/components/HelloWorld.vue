<template>
  <div class="login">
    <div class="card">
      <h2>Login</h2>
      <form
        @submit.prevent="handleSubmit(!v$.$invalid)"
        class="p-fluid"
      >
        <div class="p-field p-grid">
          <label
            for="email"
            :class="{'p-error':v$.email.$invalid}"
          >Email*</label>
          <div class="p-col">
            <InputText
              id="email"
              v-model="v$.email.$model"
              :class="{'p-invalid':v$.email.$invalid}"
            />
          </div>
        </div>
        <div class="p-field p-grid">
          <label
            for="password"
            :class="{'p-error':v$.password.$invalid}"
          >Password*</label>
          <div class="p-col">
            <InputText
              id="password"
              type="password"
              v-model="password"
              :class="{'p-error':v$.password.$invalid}"
            />
          </div>
        </div>
        <Button
          type="submit"
          label="Submit"
          class="p-mt-2"
        />
      </form>
    </div>
    <p>
      {{ token }}
    </p>
  </div>
</template>

<script>
import { useMutation } from '@vue/apollo-composable'
import { email, required } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import gql from 'graphql-tag'
import { reactive, ref } from 'vue'
export default {
  setup () {
    const token = ref('')
    const state = reactive({
      email: '',
      password: '',
    })

    const rules = {
      email: { required, email },
      password: { required },
    }

    const v$ = useVuelidate(rules, state)

    const LOGIN_MUTATION = gql`
      mutation login($login: LoginInput!) {
        login(login: $login) {
          access_token
        }
      }
    `
    const { mutate, onDone } = useMutation(LOGIN_MUTATION)

    const handleSubmit = (isFormValid) => {
      console.log(isFormValid)
      if (isFormValid) {
        mutate({
          login: {
            email: state.email,
            password: state.password,
          },
        })
      }
    }

    onDone(result => {
      token.value = result.data.login.access_token
      state.email.value = ''
      state.password.value = ''
    })

    return {
      state,
      v$,
      handleSubmit,
      token,
    }
  },
}
</script>

<style lang="scss" scoped>
  .login {
    align-content: center;
    text-align: center;
    width: 50%;
  }
</style>
