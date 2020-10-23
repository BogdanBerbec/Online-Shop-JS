<template>
    <div class="container">
        <h2 class="form-signin-heading">Please login to Bogdan' site</h2>
        <p>
            <label for="email" class="sr-only">Username</label>
            <input v-model="email" type="email" id="email" name="email" class="form-control" placeholder="Username" required="" autofocus="">
        </p>
        <p>
            <label for="password" class="sr-only">Password</label>
            <input v-model="password" type="password" id="password" name="password" class="form-control" placeholder="Password" required="">
        </p>
        <button @click="login" class="btn btn-lg btn-primary btn-block" type="submit">Login</button>
        <div class="signup">
            <p>Don't you have an account?</p>
            <router-link to="/signup">
                <button type="button" class="btn btn-primary">Register</button>
            </router-link>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            email: '',
            password: '',
            failedLogin: false
        }
    },
    methods: {
        login() {
            axios.get(
                'http://localhost:8080/users/login',
                {
                    params: {
                        email: this.email,
                        password: this.password
                    }
                }
            )
            .then(response => {
                this.failedLogin = false
                this.$store.commit('login', response.data)
                this.$router.push('/products')
            })
            .catch(error => {
                this.failedLogin = true
                console.log(error)
            })
        }
    },
}
</script>

<style>
body {
    background-color: #7f7f7f;
    color: white;
}
.container {
    width: 30em;
    margin-top: 10em;
}
.signup {
    margin-top: 3em;
    display: flex;
    justify-content: space-around;
    align-content: center;
}
</style>