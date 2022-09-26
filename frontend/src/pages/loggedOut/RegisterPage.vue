<template>
  <q-page>
    <q-card>
      <q-card-section>
        <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
          <q-input
            v-model="email"
            label="Email"
            filled
            lazy-rules
            :rules="[val => val && val.length > 0 || 'Please type your email']"
          />
          <q-input
            v-model="password"
            label="Password"
            filled
            lazy-rules
            :rules="[val => val && val.length > 0 || 'Please type your password']"
          />
          <q-input
            v-model="passwordConfirmation"
            label="Password Confirmation"
            filled
            lazy-rules
            :rules="[val => val && val.length > 0 || 'Please type your password confirmation']"
          />
          <q-btn label="Register" type="submit" color="primary" />
          <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
        </q-form>
      </q-card-section>
      <router-link to="login" class="btn btn-link">Login</router-link>
    </q-card>
  </q-page>
</template>

<script>
export default {
  name: 'RegisterPage',
  data () {
    return {
      email: '',
      password: '',
      passwordConfirmation: '',
    }
  },
  methods: {
    onSubmit () {
      this.$store.dispatch('auth/register', {
        email: this.email,
        password: this.password,
        password_confirmation: this.passwordConfirmation,
      })
    },
    onReset () {
      this.email = ''
      this.password = ''
      this.passwordConfirmation = ''
    },
  },
}
</script>

<style scoped>

</style>
