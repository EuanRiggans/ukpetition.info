<template>
    <div>
        <ViewInfoAppBar :petition_id="petition_id"/>
        <v-container class="mt-12" fluid>
            <KeyInfoCard :action="action" :additional_info="additional_info" :background="background"
                         :creator="creator" :created_date="created_date" :opened_date="opened_date"
                         :total_signatures="total_signatures.toLocaleString()" :status="status"
                         :departments="departments" :government_response="government_responded"
                         :petition_close_date="close_date"
                         card_max_width="1800px"/>
            <CardSpacer/>
            <GovernmentResponseCard v-if="government_responded" :response_summary="government_response_summary"
                                    :response="government_response_text" :response_date="government_response_date"/>
            <CardSpacer v-if="government_responded"/>
            <DataTableCard card_max_width="1800px" table_title="Signature Constituency Data"
                           :table_data="constituency_data" :table_headers="constituency_headers"/>
            <CardSpacer/>
            <DataTableCard card_max_width="1800px" table_title="Signature Region Data" :table_data="region_data"
                           :table_headers="region_headers"/>
            <CardSpacer/>
            <DataTableCard card_max_width="1800px" table_title="Signature Country Data" :table_data="country_data"
                           :table_headers="country_headers"/>
        </v-container>
        <ContactDialog :modal_dialog="contact_dialog" v-on:close-dialog="contact_dialog = false"/>
        <Snackbar :modal="archived_petition_snackbar" color="pink"
                  text="Please note, this petition is archived, so data may be missing or incomplete."
                  v-bind:timeout="0"
                  v-on:close-snackbar="closeArchivedPetitionSnackbar"/>
        <Snackbar :modal="axios_error_snackbar" color="pink"
                  text="Error when loading petition data. Please ensure your petition ID is correct."
                  v-bind:timeout="0"
                  v-on:close-snackbar="closeAxiosErrorSnackbar"/>
        <PageFooter :contact_dialog="contact_dialog" v-on:open-dialog="contact_dialog = true"/>
    </div>
</template>

<script>
    import axios from 'axios'
    import ContactDialog from '../components/ContactDialog';
    import Snackbar from '../components/Snackbar.vue';
    import KeyInfoCard from "../components/KeyInfoCard";
    import CardSpacer from "../components/CardSpacer";
    import DataTableCard from "../components/DataTableCard";
    import ViewInfoAppBar from "../components/ViewInfoAppBar";
    import GovernmentResponseCard from "../components/GovernmentResponseCard";
    import PageFooter from "../components/Footer";

    export default {
        name: "ViewInfo",
        components: {
            PageFooter,
            GovernmentResponseCard,
            ViewInfoAppBar,
            DataTableCard,
            CardSpacer,
            KeyInfoCard,
            Snackbar,
            ContactDialog
        },
        data() {
            return {
                contact_dialog: false,
                archived_petition_snackbar: false,
                axios_error_snackbar: false,
                action: "",
                background: "",
                additional_info: "",
                creator: "",
                created_date: "",
                opened_date: "",
                close_date: "",
                total_signatures: 0,
                status: "",
                departments: [],
                government_responded: false,
                government_response_summary: "",
                government_response_text: "",
                government_response_date: "",
                constituency_headers: [
                    {
                        text: 'Constituency',
                        align: 'start',
                        value: 'constituency_name',
                    },
                    {
                        text: 'ONS Code',
                        value: 'ons_code'
                    },
                    {
                        text: 'Constituency MP',
                        value: 'mp'
                    },
                    {
                        text: 'Signatures',
                        value: 'signatures'
                    },
                    {
                        text: 'Signatures (% of total)',
                        value: 'percentage_of_total_signatures'
                    }
                ],
                constituency_data: [],
                region_headers: [
                    {
                        text: 'Region',
                        align: 'start',
                        value: 'region_name',
                    },
                    {
                        text: 'ONS Code',
                        value: 'ons_code'
                    },
                    {
                        text: 'Signatures',
                        value: 'signatures'
                    },
                    {
                        text: 'Signatures (% of total)',
                        value: 'percentage_of_total_signatures'
                    }
                ],
                region_data: [],
                country_headers: [
                    {
                        text: 'Country',
                        align: 'start',
                        value: 'country_name',
                    },
                    {
                        text: 'Country code',
                        value: 'country_code'
                    },
                    {
                        text: 'Signatures',
                        value: 'signatures'
                    }
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
            await axios
                .get('https://petition.parliament.uk/petitions/' + this.petition_id + '.json')
                .then((response) => {
                    const parsed = JSON.parse(JSON.stringify(response.data));
                    if (parsed.data.type === "archived-petition") {
                        this.archived_petition_snackbar = true;
                    }
                    this.getKeyInfo(parsed);
                    this.getGovernmentResponse(parsed);
                    this.getConstituencyInfo(parsed);
                    this.getRegionInfo(parsed);
                    this.getCountryInfo(parsed);
                }).catch(error => {
                    this.axios_error_snackbar = true;
                    console.log(error);
                });
        },
        methods: {
            getKeyInfo(parsed) {
                this.action = parsed.data.attributes.action;
                this.background = parsed.data.attributes.background;
                this.additional_info = parsed.data.attributes.additional_details;
                this.creator = parsed.data.attributes.creator_name;
                this.created_date = new Date(Date.parse(parsed.data.attributes.created_at));
                this.opened_date = new Date(Date.parse(parsed.data.attributes.opened_at));
                this.total_signatures = parsed.data.attributes.signature_count;
                this.status = parsed.data.attributes.state;
                this.departments = parsed.data.attributes.departments;
                this.close_date = parsed.data.attributes.closed_at;
            },
            getGovernmentResponse(parsed) {
                if (parsed.data.attributes.government_response !== null) {
                    this.government_responded = true;
                    this.government_response_summary = parsed.data.attributes.government_response.summary;
                    this.government_response_text = parsed.data.attributes.government_response.details;
                    this.government_response_date = new Date(Date.parse(parsed.data.attributes.government_response.responded_on));
                }
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
            },
            closeArchivedPetitionSnackbar() {
                this.archived_petition_snackbar = false;
            },
            closeAxiosErrorSnackbar() {
                this.axios_error_snackbar = false;
            },
        }
    }
</script>

