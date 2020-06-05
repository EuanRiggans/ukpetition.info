<template>
    <ContactDialog :modal_dialog="dialog_modal" :standalone="true"/>
</template>

<script>
    import ContactDialog from '../components/ContactDialog';

    export default {
        name: "ContactPage",
        components: {ContactDialog},
        data() {
            return {
                dialog_modal: true,
            }
        }
    }
</script>

<style scoped>

</style>
