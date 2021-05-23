<template>
    <div class="">
        <p v-if="errors.length">
            <b>Please correct the following error(s):</b>
            <ul>
                <li v-for="error in errors" :key="error">{{ error }}</li>
            </ul>
        </p>
        <form @submit="checkForm" method="post">
            <h3>Sign Up</h3>
            <div class="form-group">
                <label>Full Name</label>
                <input type="text" name="full_name" v-model="input.full_name" placeholder="Full name" class="form-control form-control-lg"/>
            </div>
            <div class="form-group">
                <label>Email address</label>
                <input type="email" name="email" v-model="input.email" placeholder="Email" class="form-control form-control-lg" />
            </div>
            <div class="form-group">
                <label>Password</label>
                <input type="password" name="password" v-model="input.password" placeholder="Password" class="form-control form-control-lg" />
            </div>
            <div class="form-group">
                <label>Password Confirmation</label>
                <input type="password" name="password" v-model="input.password_confirmation" placeholder="Password Confirmation" class="form-control form-control-lg" />
            </div>
            <button type="button" class="btn btn-dark btn-lg btn-block" v-on:click="register()">Sign Up</button>
            <p class="forgot-password text-right">
                Already registered 
                <router-link :to="{name: 'login'}">sign in?</router-link>
            </p>
        </form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                errors:[],
                input: {
                    full_name:"",
                    email: "",
                    password: "",
                    password_confirmation : "",
                }
            }
        },
        methods: {
            checkForm:function(e) {
                alert('call this');
                if(this.full_name && this.email && this.password && this.password_confirmation) return true;
                this.errors = [];
                if(!this.full_name) this.errors.push("Full name required.");
                if(!this.email) this.errors.push("Email required.");
                if(!this.password) this.errors.push("Password required.");
                if(!this.password_confirmation) this.errors.push("Confirmation password required.");
                e.preventDefault();
            },
            register() {
                if(this.input.email != "" && this.input.password != "") {
                    const options = {
                        url: 'http://127.0.0.1:8000/api/auth/register',
                        method: 'POST',
                        data: {
                            name: this.input.full_name,
                            email: this.input.email,
                            password: this.input.password,
                            password_confirmation: this.input.password_confirmation
                        },
                    }
                    this.$axios(options)
                    .then((res) => {
                        this.$emit("authenticated", true);
                        localStorage.setItem('token', res.data.access_token);
                        localStorage.setItem('authenticated', true);
                        this.$router.push({path: '/home'});
                    })
                    .catch((err) => {
                        console.log(err);
                        console.error('register failed.');
                    })
                } else {
                    alert('Please enter all fiedlds');
                }
            }
        }    
    }
</script>