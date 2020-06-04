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
            <br>
            <v-spacer/>
            <br>
            <v-card
                    max-width="75%"
                    class="mx-auto"
                    shaped
                    elevation="5"
            >
                <v-card-title>
                    Signature Constituency Data
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
            <br>
            <v-spacer/>
            <br>
            <v-card
                    max-width="75%"
                    class="mx-auto"
                    shaped
                    elevation="5"
            >
                <v-card-title>
                    Signature Region Data
                    <v-spacer></v-spacer>
                    <v-text-field
                            v-model="region_search"
                            append-icon="mdi-magnify"
                            label="Search"
                            single-line
                            hide-details
                    ></v-text-field>
                </v-card-title>
                <v-data-table
                        :headers="region_headers"
                        :items="region_data"
                        :search="region_search"
                ></v-data-table>
            </v-card>
            <br>
            <v-spacer/>
            <br>
            <v-card
                    max-width="75%"
                    class="mx-auto"
                    shaped
                    elevation="5"
            >
                <v-card-title>
                    Signature Country Data
                    <v-spacer></v-spacer>
                    <v-text-field
                            v-model="country_search"
                            append-icon="mdi-magnify"
                            label="Search"
                            single-line
                            hide-details
                    ></v-text-field>
                </v-card-title>
                <v-data-table
                        :headers="country_headers"
                        :items="country_data"
                        :search="country_search"
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
                region_search: '',
                country_search: '',
                constituency_headers: [
                    {
                        text: 'Constituency',
                        align: 'start',
                        value: 'constituency_name',
                    },
                    {text: 'ONS Code', value: 'ons_code'},
                    {text: 'Constituency MP', value: 'mp'},
                    {text: 'Signatures', value: 'signatures'},
                    {text: 'Signatures (% of total)', value: 'percentage_of_total_signatures'}
                ],
                constituency_data: [],
                region_headers: [
                    {
                        text: 'Region',
                        align: 'start',
                        value: 'region_name',
                    },
                    {text: 'ONS Code', value: 'ons_code'},
                    {text: 'Signatures', value: 'signatures'},
                    {text: 'Signatures (% of total)', value: 'percentage_of_total_signatures'}
                ],
                region_data: [],
                country_headers: [
                    {
                        text: 'Country',
                        align: 'start',
                        value: 'country_name',
                    },
                    {text: 'Country code', value: 'country_code'},
                    {text: 'Signatures', value: 'signatures'}
                ],
                country_data: [],
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
                    this.getKeyInfo(parsed);
                    this.getConstituencyInfo(parsed);
                    this.getRegionInfo(parsed);
                    this.getCountryInfo(parsed);
                });
        },
        methods: {
            getKeyInfo(parsed) {
                this.action = parsed.data.attributes.action;
                this.background = parsed.data.attributes.background;
                this.additional_info = parsed.data.attributes.additional_details;
                this.creator = parsed.data.attributes.creator_name;
                this.total_signatures = parsed.data.attributes.signature_count;
                this.status = parsed.data.attributes.state;
            },
            getConstituencyInfo(parsed) {
                const constituencyData = parsed.data.attributes.signatures_by_constituency;
                for (let constituency in constituencyData) {
                    let constituencies = {
                        constituency_name: "",
                        ons_code: "",
                        mp: "",
                        signatures: "",
                        percentage_of_total_signatures: ""
                    }
                    constituencies.constituency_name = constituencyData[constituency].name;
                    constituencies.ons_code = constituencyData[constituency].ons_code;
                    constituencies.mp = constituencyData[constituency].mp;
                    constituencies.signatures = constituencyData[constituency].signature_count;
                    constituencies.percentage_of_total_signatures = (constituencyData[constituency].signature_count / this.total_signatures) * 100;
                    this.constituency_data.push(constituencies);
                }
            },
            getRegionInfo(parsed) {
                const regionData = parsed.data.attributes.signatures_by_region;
                for (let region in regionData) {
                    let regionInfo = {
                        region_name: "",
                        ons_code: "",
                        signatures: "",
                        percentage_of_total_signatures: ""
                    }
                    regionInfo.region_name = regionData[region].name;
                    regionInfo.ons_code = regionData[region].ons_code;
                    regionInfo.signatures = regionData[region].signature_count;
                    regionInfo.percentage_of_total_signatures = (regionData[region].signature_count / this.total_signatures) * 100;
                    this.region_data.push(regionInfo);
                }
            },
            getCountryInfo(parsed) {
                const countryData = parsed.data.attributes.signatures_by_country;
                for (let country in countryData) {
                    let countryInfo = {
                        country_name: "",
                        country_code: "",
                        signatures: ""
                    }
                    countryInfo.country_name = countryData[country].name;
                    countryInfo.country_code = countryData[country].code;
                    countryInfo.signatures = countryData[country].signature_count;
                    // countryInfo.percentage_of_total_signatures = (countryData[country].signature_count / this.total_signatures) * 100;
                    this.country_data.push(countryInfo);
                }
            }
        }
    }
</script>

<style scoped>

</style>
