<template>
    <v-card
            :max-width="card_max_width"
            class="mx-auto"
            shaped
            elevation="5"
    >
        <v-list-item>
            <v-list-item-content>
                <v-list-item-title class="headline">Government Response:</v-list-item-title>
            </v-list-item-content>
        </v-list-item>

        <v-card-text>
            <b>Summary:</b> {{response_summary}}<br/><br/>
            <b>Entire Response:</b> <br/><br/> <span style="white-space: pre-wrap;">{{response}}</span><br/><br/>
            <b>Response Date:</b> {{response_date}}<br/><br/>
        </v-card-text>
    </v-card>
</template>
<script>
    export default {
        name: 'GovernmentResponseCard',
        props: {
            response_summary: {
                type: String,
                default: "Government Response Summary"
            },
            response: {
                type: String,
                default: "Government Response"
            },
            response_date: {
                default: "00/00/0000"
            },
            card_max_width: {
                type: String,
                default: "1800px"
            }
        }
    }
</script>
