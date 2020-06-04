<template>
    <v-app-bar
            color="pink darken-4"
            dense
            dark
            fixed
    >
        <v-btn icon to="/">
            <v-icon>mdi-home</v-icon>
        </v-btn>
        <v-toolbar-title>Petition Data for petition ID: {{petition_id}}</v-toolbar-title>
    </v-app-bar>
</template>
<script>
    export default {
        name: 'ViewInfoAppBar',
        props: {
            petition_id: {}
        }
    }
</script>