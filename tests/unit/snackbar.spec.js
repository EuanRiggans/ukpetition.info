import {shallowMount} from '@vue/test-utils'
import Snackbar from '@/components/Snackbar.vue'
import Vuetify from 'vuetify'
import Vue from 'vue'

Vue.use(Vuetify)

describe('Snackbar.vue', () => {

    const wrapper = shallowMount(Snackbar, {
        propsData: {
            color: 'pink',
            modal: false,
            text: 'Snackbar test message',
            timeout: 5000
        }
    })

    it('sets the correct data when passed as props', () => {
        console.log(wrapper.findAll('v-btn'))
        expect(wrapper.vm.color).toMatch('pink')
        expect(wrapper.vm.modal).toBeFalsy()
        expect(wrapper.vm.text).toMatch('Snackbar test message')
        expect(wrapper.vm.timeout).toBe(5000)
    })
})
