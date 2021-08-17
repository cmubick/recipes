<template>
  <div class="signup-form">
    <div class="p-d-flex p-jc-center">
      <Card class="card">
        <template #title>
          <div class="title">
            Sign up
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
                  :class="{ 'p-invalid': v$.email.$invalid && submitted }"
                  aria-describedby="email-error"
                />
                <label
                  for="email"
                  :class="{ 'p-error': v$.email.$invalid && submitted }"
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
                v-else-if="
                  (v$.email.$invalid && submitted) ||
                    v$.email.$pending.$response
                "
                class="p-error"
              >{{
                v$.email.required.$message.replace("Value", "Email")
              }}</small>
            </div>
            <div class="p-field">
              <div class="p-float-label p-input-icon-right">
                <i class="pi pi-user" />
                <InputText
                  id="fullName"
                  v-model="v$.fullName.$model"
                  :class="{ 'p-invalid': v$.fullName.$invalid && submitted }"
                  aria-describedby="fullName-error"
                />
                <label
                  for="fullName"
                  :class="{ 'p-error': v$.fullName.$invalid && submitted }"
                >Full name</label>
              </div>
              <span v-if="v$.fullName.$error && submitted">
                <span
                  id="fullName-error"
                  v-for="(error, index) of v$.fullName.$errors"
                  :key="index"
                >
                  <small class="p-error">{{ error.$message }}</small>
                </span>
              </span>
              <small
                v-else-if="
                  (v$.fullName.$invalid && submitted) ||
                    v$.fullName.$pending.$response
                "
                class="p-error"
              >{{
                v$.fullName.required.$message.replace("Value", "Full name")
              }}</small>
            </div>
            <div class="p-field">
              <div class="p-float-label">
                <Password
                  id="password"
                  v-model="v$.password.$model"
                  :class="{ 'p-invalid': v$.password.$invalid && submitted }"
                  toggle-mask
                  :feedback="true"
                />
                <label
                  for="password"
                  :class="{ 'p-error': v$.password.$invalid && submitted }"
                >Password</label>
              </div>
              <small
                v-if="
                  (v$.password.$invalid && submitted) ||
                    v$.password.$pending.$response
                "
                class="p-error"
              >{{
                v$.password.required.$message.replace("Value", "Password")
              }}</small>
            </div>
            <div class="p-field">
              <div class="p-float-label">
                <Password
                  id="confirmPassword"
                  v-model="v$.confirmPassword.$model"
                  :class="{
                    'p-invalid': v$.confirmPassword.$invalid && submitted,
                  }"
                  toggle-mask
                  :feedback="false"
                />
                <label
                  for="confirmPassword"
                  :class="{
                    'p-error': v$.confirmPassword.$invalid && submitted,
                  }"
                >Confirm password</label>
              </div>
              <small
                v-if="v$.confirmPassword.sameAsPassword.$invalid && submitted"
                class="p-error"
              >Passwords must match.</small>
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
import { email, required, sameAs } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import gql from 'graphql-tag'
import { reactive, ref, computed } from 'vue'
import { useRouter } from 'vue-router'

export default {
  setup () {
    const router = useRouter()

    const submitted = ref(false)
    const state = reactive({
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
    })

    const rules = computed(() => ({
      fullName: { required },
      email: { required, email },
      password: { required },
      confirmPassword: {
        required,
        sameAsPassword: sameAs(state.password),
      },
    }))

    const v$ = useVuelidate(rules, state)

    const SIGN_UP_MUTATION = gql`
      mutation signUp($signUp: ProfileInput!) {
        signUp(signUp: $signUp) {
          access_token
        }
      }
    `
    const { mutate, onDone } = useMutation(SIGN_UP_MUTATION)

    const handleSubmit = (isFormValid) => {
      submitted.value = true
      if (isFormValid) {
        mutate({
          signUp: {
            fullName: state.fullName,
            email: state.email,
            password: state.password,
          },
        })
      }
    }

    onDone(({ data }) => {
      const token = data.signUp.access_token
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
  .signup-form {
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
