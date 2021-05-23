<template>
    <div id="login" class="vue-tempalte">
        <h1>Login</h1>
        <input type="text" class="form-control form-control-lg" name="email" v-model="input.email" placeholder="Email" />
        <input type="password" class="form-control form-control-lg" name="password" v-model="input.password" placeholder="Password" />
        <button type="button" class="btn btn-dark btn-lg btn-block" v-on:click="login()">Login</button>
    </div>
</template>

<script>
    export default {
        name: 'Login',
        data() {
            return {
                input: {
                    email: "",
                    password: ""
                }
            }
        },
        methods: {
            login() {
                if(this.input.email != "" && this.input.password != "") {
                    const options = {
                        url: 'http://127.0.0.1:8000/api/auth/login',
                        method: 'POST',
                        data: {
                            email: this.input.email,
                            password: this.input.password
                        }
                    }
                    this.$axios(options)
                    .then((res) => {
                        localStorage.setItem('token', res.data.access_token);
                        localStorage.setItem('authenticated', true);
                        this.$router.push({path: '/home'});
                    })
                    .catch((err) => {
                        console.log(err);
                        alert('Login failed.');
                    })
                } else {
                    alert('Please enter email and password');
                }
            }
        }
    }
</script>