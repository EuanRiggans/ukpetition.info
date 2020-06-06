<template>
    <v-snackbar
            v-model="modal"
            :timeout="timeout"
    >
        {{ text }}
        <v-btn
                :color="color"
                text
                @click="closeSnackbar"
        >
            Close
        </v-btn>
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
