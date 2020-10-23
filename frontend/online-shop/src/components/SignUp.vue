<template>
    <div class="container">
        <form class="form-signin" method="post" action="/login">
            <h2 class="form-signin-heading">Please login to Bogdan' site</h2>
            <p>
                <label for="username" class="sr-only">Username</label>
                <input v-model="username" type="text" id="username" name="username" class="form-control" placeholder="Username" required="" >
            </p>
            <p>
                <label for="email" class="sr-only">Username</label>
                <input v-model="email" type="email" id="email" name="email" class="form-control" placeholder="e.g. john.willima@gmail.com" required="" >
            </p>
            <p>
                <label for="password" class="sr-only">Password</label>
                <input v-model="password" type="password" id="password" name="password" class="form-control" placeholder="Password" required="">
            </p>
            <button @click="signup" class="btn btn-lg btn-primary btn-block" type="submit">Sign up</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            username: '',
            email: '',
            password: ''
        }
    },
    methods: {
        signup() {
            axios.post(
                'http://localhost:8080/users',
                {
                    username: this.username,
                    email: this.email,
                    password: this.password
                }
            )
            .then(this.$router.push('/login'))
            .catch(error => console.log(error))
        }
    },
}
</script>

<style>
.container {
    background-color: #7f7f7f;
    color: white;
}
</style>