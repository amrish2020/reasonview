<template>
  <div class="vue-tempalte">
    <!-- Navigation -->
    <nav class="navbar shadow bg-white rounded justify-content-between">
      <div class="container">
        <a class="navbar-brand float-left" href="#" target="_blank">
           Weather App
        </a>
        <ul class="nav navbar-nav flex-row float-right" v-if="this.authvar">
          <li class="nav-item">
            <p>Welcome User</p>
            <router-link  to="/login" v-on:click.native="logout()" replace>Logout</router-link>
          </li>
        </ul>
        <ul class="nav navbar-nav flex-row float-right" v-if="!this.authvar">
          <li class="nav-item">
            <router-link class="nav-link pr-3" to="/login">Sign in</router-link>
          </li>
          <li class="nav-item">
            <router-link class="btn btn-outline-primary" to="/">Sign up</router-link>
          </li>
        </ul>
      </div>
    </nav>

    <!-- Main -->
    <div class="App">
      <div class="vertical-center">
        <div class="inner-block">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
    export default {
        data() {
            return {
                authvar: false,
            }
        },
        mounted() {
            var authvar = localStorage.getItem('authenticated');
            this.authvar = authvar;
            if(!authvar) {
                this.$router.replace({ name: "login" });
            }
        },
        methods: {
            logout() {
                this.authvar = false;
                
                const options = {
                    url: 'http://127.0.0.1:8000/api/auth/logout',
                    method: 'POST',
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem("token")
                    }
                };
                this.$axios(options)
                .then((res) => {
                    console.log(res);
                })
                .catch((err) => {
                    console.log(err);
                    console.error('logout failed.');
                });
                localStorage.removeItem('authenticated');
                localStorage.removeItem('token');

            },
        }
        
    }
</script>
