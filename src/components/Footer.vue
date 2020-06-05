<template>
    <v-footer
            class="pa-0"
    >
        <v-card
                flat
                tile
                dark
                width="100%"
                class="text-center"
        >
            <v-card-text>
                <v-btn
                        class="mx-3 white--text"
                        icon
                        v-on:click="openDialog"
                >
                    <v-icon size="24px">mdi-email</v-icon>
                </v-btn>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-text class="white--text">
                <a v-on:click="openDialog">Get in touch with me</a>
            </v-card-text>
        </v-card>
    </v-footer>
</template>
<script>
    export default {
        name: 'PageFooter',
        props: {
            contact_dialog: {
                type: Boolean,
                default: false,
                required: true
            }
        },
        methods: {
            openDialog() {
                this.$emit('open-dialog');
            }
        }
    }
</script>
