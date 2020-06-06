// test/CardSpacer.spec.js

// Libraries
import Vue from 'vue'
import Vuetify from 'vuetify'

// Components
import CardSpacer from '@/components/CardSpacer'

// Utilities
import {
    mount,
    createLocalVue
} from '@vue/test-utils'

const localVue = createLocalVue()
Vue.use(Vuetify)

describe('CardSpacer.vue', () => {
    let vuetify

    beforeEach(() => {
        vuetify = new Vuetify()
    })

    it('should have a custom title and match snapshot', () => {
        const wrapper = mount(CardSpacer, {
            localVue,
            vuetify,
        })

        // With jest we can create snapshot files of the HTML output
        expect(wrapper.html()).toMatchSnapshot()
    })
})
