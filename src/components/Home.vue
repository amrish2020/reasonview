<template>
    <div class="vue-tempalte">
        <div id="app">
            <div id="nav">
                <h3>Search Weather</h3>
                <input type="text" class="form-control form-control-lg"  name="search" v-model="search" placeholder="Search Location" />
                <button type="button" class="btn btn-dark btn-lg btn-block" v-on:click="searchit()">Search</button>
                <br/>
                <router-link  to="/login" v-on:click.native="logout()" replace>Logout</router-link>
            </div>
            <router-view @authvar="setAuthenticated" />
        </div>
        <div class="row">
                <div v-for="res in resdata" :key="res.id" class="col-md-3 float-left">
                    <b>Applicable date : {{res.applicable_date}}</b>
                    <br/>
                    <img class="img-responsive"  :src="'https://www.metaweather.com/static/img/weather/ico/'+res.weather_state_abbr+'.ico'" alt=""/>
                    <br/>
                    Min temp : {{res.min_temp.toFixed(2)}}
                    <br/>
                    Max temp : {{res.max_temp.toFixed(2)}}
                    <br/>
                    Wind Speed : {{res.wind_speed.toFixed(2)}}MPH
                    <br/><br/>
                </div>    
        </div>    
    </div>
    
</template>

<script>
    export default {
        name: 'App',
        data() {
            return {
                resdata:{},
                search:"",
                authvar: false,
            }
        },
        mounted() {
            var authvar = localStorage.getItem('authenticated');
            if(!authvar) {
                this.$router.replace({ name: "login" });
            }
        },
        methods: {
            setAuthenticated(status) {
                this.authvar = status;
            },
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
            searchit(){
                console.log(localStorage.getItem("token"));

                const options = {
                    url: 'http://127.0.0.1:8000/api/auth/getweather?q='+this.search,
                    method: 'GET',
                    //withCredentials:true,
                    headers: {
                        // Accept: 'application/json',
                        "Authorization": "Bearer " + localStorage.getItem("token")
                    }
                };

                this.$axios(options)
                .then((res) => {
                    
                    this.resdata = res.data.weatherdata.consolidated_weather;
                    console.log(this.resdata);
                })
                .catch((err) => {
                    console.log(err);
                    console.error('get weather failed.');
                })
            },
        }
    }
</script>
