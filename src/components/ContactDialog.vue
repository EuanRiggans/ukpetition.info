<template>
    <div>
        <v-dialog v-model="modal_dialog" persistent max-width="600px">
            <v-card>
                <v-card-title>
                    <span class="headline">Contact Webmaster</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <form id="contact-form" action="https://formspree.io/mnqgdgdz" method="POST">
                            <v-row>
                                <v-col cols="12">
                                    <v-text-field label="Your Name" name="_username" v-model="contact_name" filled
                                                  required></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12">
                                    <v-text-field label="Your email" type="email" name="_replyto"
                                                  v-model="contact_email" filled
                                                  required></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12">
                                    <v-textarea label="Your Message" name="message" v-model="contact_message" filled
                                                required></v-textarea>
                                </v-col>
                            </v-row>
                        </form>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-btn v-if="standalone === false" color="red darken-1" v-on:click="closeDialog">Close</v-btn>
                    <v-btn v-if="standalone === true" color="red darken-1" to="/">Close</v-btn>
                    <div class="flex-grow-1"></div>
                    <v-btn color="blue darken-1" v-on:click="submitForm">Submit</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <Snackbar :modal="thanks_snackbar" color="pink"
                  text="Thanks for getting in touch!"
                  v-on:close-snackbar="closeThanksSnackbar"/>
    </div>
</template>

<script>
    import Snackbar from '../components/Snackbar.vue';

    export default {
        name: 'ContactDialog',
        components: {Snackbar},
        data() {
            return {
                contact_name: "",
                contact_email: "",
                contact_message: "",
                thanks_snackbar: false,
            };
        },
        props: {
            modal_dialog: {
                type: Boolean,
                default: false,
                required: true
            },
            standalone: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            submitForm() {
                document.getElementById('contact-form').submit();
            },
            closeDialog() {
                this.$emit('close-dialog');
            },
            closeThanksSnackbar() {
                this.thanks_snackbar = false;
            }
        },
    };
</script>

<style scoped>
</style>
