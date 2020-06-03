<template>
    <v-snackbar
            v-model="modal"
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
            modal: null,
            text: null,
            color: null,
        },
        methods: {
            closeSnackbar() {
                this.$emit('close-snackbar');
            },
        },
    };
</script>
