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
            <b>Creator:</b> {{creator === null ? "No creator name found" : creator }}<br/><br/>
            <b>Petition Created:</b> {{created_date}}<br/><br/>
            <b>Petition Opened:</b> {{opened_date}}<br/><br/>
            <b>Action:</b> {{action}}<br/><br/>
            <b>Background:</b> {{background}}<br/><br/>
            <b>Additional Info:</b> {{additional_info}}<br/><br/>
            <b>Total Signatures:</b> {{total_signatures}}<br/><br/>
            <div v-for="department in departments" v-bind:key="department.acronym"><b>Responsible Department(s):</b>
                {{department.name}} ({{department.acronym}})<br/><br/></div>
            <div v-if="government_response === false"><b>Government Response:</b> The government has not yet responded to this
                petition.<br/><br/></div>
            <b>Petition State:</b> {{status}}<br/><br/>
            <div v-if="status === 'closed'"><b>Petition Close Date:</b> {{petition_close_date}}<br/><br/></div>
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
            created_date: {
                default: "00/00/0000"
            },
            opened_date: {
                default: "00/00/0000"
            },
            total_signatures: {
                type: String,
                default: "0"
            },
            status: {
                type: String,
                default: "Unknown"
            },
            petition_close_date: {
                type: String,
            },
            departments: {
                type: Array,
            },
            government_response: {
                type: Boolean,
            },
            card_max_width: {
                type: String,
                default: "1800px"
            }
        }
    }
</script>
