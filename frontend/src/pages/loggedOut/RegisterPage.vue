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
            :type="isPwd ? 'password' : 'text'"
            lazy-rules
            :rules="[val => val && val.length > 0 || 'Please type your password',
                     val => val.length > 7 || 'Password must be at least 8 characters']">
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
          <q-input
            v-model="passwordConfirmation"
            label="Password Confirmation"
            filled
            :type="isPwd ? 'password' : 'text'"
            lazy-rules
            :rules="[val => val && val.length > 0 || 'Please type your password confirmation',
                     val => val.length > 7 || 'Password must be at least 8 characters']">
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
          <q-btn label="Register" type="submit" color="primary" />
          <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
        </q-form>
      </q-card-section>
      <router-link to="login" class="btn btn-link">Login</router-link>
    </q-card>
  </q-page>
</template>

<script>
import { ref } from 'vue';
import { useAuth } from '../../stores/auth.store';

export default {
  name: 'RegisterPage',
  data () {
    return {
      isPwd: ref(true),
      email: '',
      password: '',
      passwordConfirmation: '',
    }
  },
  methods: {
    onSubmit () {
      const auth = useAuth();
      if (this.password !== this.passwordConfirmation) {
        alert('Password and password confirmation do not match');
      } else {
        auth.register(this.email, this.password);
      }
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
