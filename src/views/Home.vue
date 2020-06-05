<template>
    <div class="home">
        <PetitionIDInputDialog/>
        <ContactDialog :modal_dialog="contact_dialog" v-on:close-dialog="contact_dialog = false"/>
        <PageFooter :contact_dialog="contact_dialog" v-on:open-dialog="contact_dialog = true"/>
    </div>
</template>

<script>
    import PetitionIDInputDialog from "../components/PetitionIDInputDialog";
    import ContactDialog from '../components/ContactDialog';
    import PageFooter from "../components/Footer";

    export default {
        name: 'Home',
        components: {
            PageFooter,
            PetitionIDInputDialog,
            ContactDialog
        },
        data() {
            return {
                contact_dialog: false,
            }
        }
    }
</script>
