<template>
  <div class="login-form">
    <div class="p-d-flex p-jc-center">
      <Card class="card">
        <template #title>
          <div class="title">
            Login
          </div>
        </template>
        <template #content>
          <form
            @submit.prevent="handleSubmit(!v$.$invalid)"
            class="p-fluid"
          >
            <div class="p-field">
              <div class="p-float-label p-input-icon-right">
                <i class="pi pi-envelope" />
                <InputText
                  id="email"
                  v-model="v$.email.$model"
                  :class="{'p-invalid':v$.email.$invalid && submitted}"
                  aria-describedby="email-error"
                />
                <label
                  for="email"
                  :class="{'p-error':v$.email.$invalid && submitted}"
                >Email</label>
              </div>
              <span v-if="v$.email.$error && submitted">
                <span
                  id="email-error"
                  v-for="(error, index) of v$.email.$errors"
                  :key="index"
                >
                  <small class="p-error">{{ error.$message }}</small>
                </span>
              </span>
              <small
                v-else-if="(v$.email.$invalid && submitted) || v$.email.$pending.$response"
                class="p-error"
              >{{ v$.email.required.$message.replace('Value', 'Email') }}</small>
            </div>
            <div class="p-field">
              <div class="p-float-label">
                <Password
                  id="password"
                  v-model="v$.password.$model"
                  :class="{'p-invalid':v$.password.$invalid && submitted}"
                  toggle-mask
                  :feedback="false"
                />
                <label
                  for="password"
                  :class="{'p-error':v$.password.$invalid && submitted}"
                >Password</label>
              </div>
              <small
                v-if="(v$.password.$invalid && submitted) || v$.password.$pending.$response"
                class="p-error"
              >{{ v$.password.required.$message.replace('Value', 'Password') }}</small>
            </div>
            <Button
              type="submit"
              label="Submit"
              class="p-mt-2"
            />
          </form>
        </template>
      </Card>
    </div>
  </div>
</template>

<script>
import { useMutation } from '@vue/apollo-composable'
import { email, required } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import gql from 'graphql-tag'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
  setup () {
    const router = useRouter()

    const submitted = ref(false)
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
      submitted.value = true
      if (isFormValid) {
        mutate({
          login: {
            email: state.email,
            password: state.password,
          },
        })
      }
    }

    onDone(({ data }) => {
      const token = data.login.access_token
      if (typeof localStorage !== 'undefined' && token) {
        localStorage.setItem('token', token)
      }
      router.push({ name: 'secure' })
    })

    return {
      state,
      v$,
      handleSubmit,
      submitted,
    }
  },
}
</script>

<style lang="scss" scoped>
  .login-form {
    margin-top: 36px;
    .card {
        min-width: 450px;

        .title {
          text-align: center;
        }

        form {
            margin-top: 2rem;
        }

        .p-field {
            margin-bottom: 1.5rem;
        }
    }
  }
</style>
