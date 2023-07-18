<template>
  <form-create v-slot="slotProps" v-bind.sync="editedItem" :items="items" :type="type">
    <v-btn :disabled="!slotProps.valid" color="primary" class="text-capitalize" @click="save">
      Save
    </v-btn>

    <v-btn
      :disabled="!slotProps.valid"
      color="primary"
      style="text-transform: none"
      outlined
      @click="saveAndAnother"
    >
      Save and add another
    </v-btn>
  </form-create>
</template>

<script lang="ts">
import Vue from 'vue'
import FormCreate from '~/components/label/FormCreate.vue'
import { Project } from '~/domain/models/project/project'
import { LabelDTO } from '~/services/application/label/labelData'

export default Vue.extend({
  components: {
    FormCreate
  },

  layout: 'project',

  middleware: ['check-auth', 'auth', 'setCurrentProject'],

  validate({ params, query, store }) {
    if (!['category', 'span', 'relation', 'rating'].includes(query.type as string)) {
      return false
    }
    if (/^\d+$/.test(params.id)) {
      const project = store.getters['projects/project'] as Project
      return project.canDefineLabel
    }
    return false
  },

  data() {
    return {
      editedItem: {
        text: '',
        prefixKey: null,
        suffixKey: null,
        backgroundColor: '#73D8FF',
        textColor: '#ffffff',
        min: 1,
        max: 5,
        step: 1,
        ticks: ''
      } as LabelDTO,
      defaultItem: {
        text: '',
        prefixKey: null,
        suffixKey: null,
        backgroundColor: '#73D8FF',
        textColor: '#ffffff',
        min: 1,
        max: 5,
        step: 1,
        ticks: ''
      } as LabelDTO,
      items: [] as LabelDTO[]
    }
  },

  computed: {
    projectId(): string {
      return this.$route.params.id
    },

    type(): string {
      return this.$route.query.type as string
    },

    service(): any {
      const type = this.$route.query.type
      if (type === 'category') {
        return this.$services.categoryType
      } else if (type === 'span') {
        return this.$services.spanType
      } else if (type === 'relation') {
        return this.$services.relationType
      } else if (type === 'rating') {
        return this.$services.ratingType
      } else {
        throw new Error('Unknown type')
      }
    }
  },

  async created() {
    this.items = await this.service.list(this.projectId)
  },

  methods: {
    async save() {
      await this.service.create(this.projectId, this.editedItem)
      this.$router.push(`/projects/${this.projectId}/labels`)
    },

    async saveAndAnother() {
      await this.service.create(this.projectId, this.editedItem)
      this.editedItem = Object.assign({}, this.defaultItem)
      this.items = await this.service.list(this.projectId)
    }
  }
})
</script>
