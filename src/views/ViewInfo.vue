<template>
    <div>
        <h1 class="text-center">Petition info for ID: {{petition_id}}</h1>
    <v-container fluid>
        <v-card
                max-width="75%"
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
                <b>Creator:</b> {{creator}} <br/><br/>
                <b>Action:</b> {{action}} <br/><br/>
                <b>Background:</b> {{background}} <br/><br/>
                <b>Additional Info:</b> {{additional_info}} <br/><br/>
                <b>Total Signatures:</b> {{total_signatures}} <br/><br/>
            </v-card-text>
        </v-card>
        <br/>
        <hr>
        <br/>
        <v-card>
            <v-card-title>
                Constituency Data
                <v-spacer></v-spacer>
                <v-text-field
                        v-model="constituency_search"
                        append-icon="mdi-magnify"
                        label="Search"
                        single-line
                        hide-details
                ></v-text-field>
            </v-card-title>
            <v-data-table
                    :headers="constituency_headers"
                    :items="constituency_data"
                    :search="constituency_search"
            ></v-data-table>
        </v-card>
    </v-container>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: "ViewInfo",
        data() {
            return {
                action: null,
                background: null,
                additional_info: null,
                creator: null,
                total_signatures: null,
                status: null,
                constituency_search: '',
                constituency_headers: [
                    {
                        text: 'Constituency',
                        align: 'start',
                        sortable: false,
                        value: 'constituency_name',
                    },
                    { text: 'ONS Code', value: 'ons_code' },
                    { text: 'Constituency MP', value: 'mp' },
                    { text: 'Signatures', value: 'signatures' },
                    { text: 'Signatures (% of total)', value: 'percentage_of_total_signatures' }
                ],
                constituency_data: [],
            }
        },
        props: {
            petition_id: {
                type: String,
                default: "308733"
            }
        },
        async mounted() {
            console.log("[DEBUG] Petition ID is: " + this.petition_id);
            await axios
                .get('https://petition.parliament.uk/petitions/' + this.petition_id + '.json')
                .then((response) => {
                    const parsed = JSON.parse(JSON.stringify(response.data));
                    this.action = parsed.data.attributes.action;
                    this.background = parsed.data.attributes.background;
                    this.additional_info = parsed.data.attributes.additional_details;
                    this.creator = parsed.data.attributes.creator_name;
                    this.total_signatures = parsed.data.attributes.signature_count;
                    this.status = parsed.data.attributes.state;
                    const constituency_data = parsed.data.attributes.signatures_by_constituency;
                    for(let constituency in constituency_data) {
                        let constituencies = {
                            constituency_name: "",
                            ons_code: "",
                            mp: "",
                            signatures: "",
                            percentage_of_total_signatures: ""
                        }
                        constituencies.constituency_name = constituency_data[constituency].name;
                        constituencies.ons_code = constituency_data[constituency].ons_code;
                        constituencies.mp = constituency_data[constituency].mp;
                        constituencies.signatures = constituency_data[constituency].signature_count;
                        constituencies.percentage_of_total_signatures = (constituency_data[constituency].signature_count / this.total_signatures) * 100;
                        this.constituency_data.push(constituencies);
                    }
                });
        }
    }
</script>

<style scoped>

</style>
