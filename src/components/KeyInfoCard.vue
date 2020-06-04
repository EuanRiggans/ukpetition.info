<template>
    <v-card
            :max-width="card_max_width"
            class="mx-auto"
            shaped
            elevation="5"
    >
        <v-list-item>
            <v-list-item-content>
                <v-list-item-title class="headline">Petition Key Info:</v-list-item-title>
            </v-list-item-content>
        </v-list-item>

        <v-card-text>
            <b>Creator:</b> {{creator}}<br/><br/>
            <b>Action:</b> {{action}}<br/><br/>
            <b>Background:</b> {{background}}<br/><br/>
            <b>Additional Info:</b> {{additional_info}}<br/><br/>
            <b>Total Signatures:</b> {{total_signatures}}<br/><br/>
        </v-card-text>
    </v-card>
</template>
<script>
    export default {
        name: 'KeyInfoCard',
        props: {
            action: {
                type: String,
                default: "Petition Action"
            },
            additional_info: {
                type: String,
                default: "Petition Additional Info"
            },
            background: {
                type: String,
                default: "Petition Background"
            },
            creator: {
                type: String,
                default: "Petition Creator"
            },
            total_signatures: {
                type: String,
                default: "0"
            },
            card_max_width: {
                type: String,
                default: "1800px"
            }
        }
    }
</script>
