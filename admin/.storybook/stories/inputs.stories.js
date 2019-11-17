import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'

// import '../../src/assets/css/main.css'
import Input from './Components/Input.vue'
import Checkbox from './Components/Checkbox.vue'
import CheckList from './Components/CheckList.vue'

storiesOf('Inputs', module)
  .add('Text', () => ({
    components: { Input },
    data: function() {
      return {
        data: ''
      }
    },
    template: `
    <Input
      :type="'email'"
      :name="'input-primary'"
      :placeholder="'Input something'"
      :label="'Primary Input'"
      :variant="'primary'"
      v-model="data"
      @input="action"
      >
    </Input>
  `,
    methods: {
      action: function(value) {
        action('Inputted')
      }
    }
  }))
  .add('Checkbox', () => ({
    components: { Checkbox },
    data: function() {
      return {
        selected: true
      }
    },
    template: `
      <div>
        <Checkbox :label="'Hello'" v-model="selected"></Checkbox>
        Selected: {{ selected }}
      </div>
    `
  }))
  .add('Check List', () => ({
    components: { CheckList },
    data: function() {
      return {
        label: 'Check List',
        list: [
          { label: '1', value: 1 },
          { label: '2', value: 2 },
          { label: 'None', value: 0 }
        ],
        selected: []
      }
    },
    template: `
      <div>
        <CheckList :label="label" :list="list" v-model="selected"></CheckList>
        Selected: {{ selected }}
      </div>
    `
  }))
