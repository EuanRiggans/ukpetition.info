<template>
    <div>
        <v-layout class="project-card mt-12 mb-12">
            <v-flex xs12 sm6 offset-sm3>
                <v-card>
                    <v-card-title>
                        <span class="headline">UK Petition Info</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col cols="12">
                                    <v-text-field label="Petition ID" v-model="petition_id" filled
                                                  required></v-text-field>
                                </v-col>
                            </v-row>
                        </v-container>
                        <small>Petition ID is numbers at end of URL: i.e.
                            https://petition.parliament.uk/petitions/<b>308733</b></small><br/>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn color="blue darken-1" text to="/contact">Contact Me</v-btn>
                        <div class="flex-grow-1"></div>
                        <v-btn color="blue darken-1" v-on:click="loadPetitionInfo">Load petition info</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
        <Snackbar :modal="loading_snackbar" color="pink"
                  text="Loading petition info..."
                  v-on:close-snackbar="closeLoadingSnackbar"/>
        <Snackbar :modal="not_number_error_snackbar" color="pink"
                  text="Please enter a number."
                  v-on:close-snackbar="closeNotNumberSnackbar"/>
        <Snackbar :modal="general_error_snackbar" color="pink"
                  text="An unexpected error has occurred. Please refresh the page and try again."
                  v-on:close-snackbar="closeGeneralErrorSnackbar"/>
    </div>
</template>

<script>
    import Snackbar from '../components/Snackbar.vue';

    export default {
        name: 'PetitionIDInputDialog',
        components: {Snackbar},
        data() {
            return {
                dialog: true,
                petition_id: 0,
                loading_snackbar: false,
                general_error_snackbar: false,
                not_number_error_snackbar: false
            };
        },
        methods: {
            loadPetitionInfo() {
                let notNumber = false;
                !isNaN(this.petition_id) ? this.petition_id = parseInt(this.petition_id) : notNumber = true;
                if (notNumber) {
                    this.not_number_error_snackbar = true;
                    return;
                }
                this.loading_snackbar = true;
                this.$router.push('/view-info/' + this.petition_id);
            },
            closeLoadingSnackbar() {
                this.loading_snackbar = false;
            },
            closeNotNumberSnackbar() {
                this.not_number_error_snackbar = false;
            },
            closeGeneralErrorSnackbar() {
                this.general_error_snackbar = false;
            }
        },
    };
</script>

<style scoped>
</style>
