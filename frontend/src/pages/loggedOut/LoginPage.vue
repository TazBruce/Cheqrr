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
          <q-btn label="Login" type="submit" color="primary" />
          <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
        </q-form>
      </q-card-section>
      <router-link to="register" class="btn btn-link">Register</router-link>
    </q-card>
  </q-page>
</template>

<script>
export default {
  name: 'LoginPage',
  data () {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    onSubmit () {
      this.$store.dispatch('auth/login', {
        email: this.email,
        password: this.password,
      })
    },
    onReset () {
      this.email = ''
      this.password = ''
    },
  },
}
</script>

<style scoped>

</style>
