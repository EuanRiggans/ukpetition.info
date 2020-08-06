<template>
    <v-snackbar
            v-model="modal"
    >
        {{ text }}

        <template v-slot:action="{ attrs }">
            <v-btn
                    color="pink"
                    text
                    v-bind="attrs"
                    @click="closeSnackbar"
            >
                Close
            </v-btn>
        </template>
    </v-snackbar>
</template>
<script>
    export default {
        name: 'Snackbar',
        props: {
            modal: {
                type: Boolean,
                default: false,
                required: true
            },
            text: {
                type: String,
                default: "Snackbar Text",
                required: true
            },
            color: {
                type: String,
                default: "blue",
                required: false
            },
            timeout: {
                type: Number,
                default: 6000
            }
        },
        methods: {
            closeSnackbar() {
                this.$emit('close-snackbar');
            },
        },
    };
</script>
