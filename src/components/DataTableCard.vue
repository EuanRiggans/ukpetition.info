<template>
    <v-card
            :max-width="card_max_width"
            class="mx-auto"
            shaped
            elevation="5"
    >
        <v-card-title>
            {{table_title}}
            <v-spacer></v-spacer>
            <v-text-field
                    v-model="table_search"
                    append-icon="mdi-magnify"
                    label="Search"
                    single-line
                    hide-details
            ></v-text-field>
        </v-card-title>
        <v-data-table
                :headers="table_headers"
                :items="table_data"
                :search="table_search"
        ></v-data-table>
    </v-card>
</template>
<script>
    export default {
        name: 'DataTableCard',
        data() {
            return {
                table_search: "",
            }
        },
        props: {
            card_max_width: {
                type: String,
                default: "1800px"
            },
            table_title: {
                type: String,
                default: "Table Title",
                required: true
            },
            table_data: {
                type: Array,
                required: true
            },
            table_headers: {
                type: Array,
                required: true
            }
        }
    }
</script>
