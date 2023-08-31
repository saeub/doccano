<template>
  <form-create v-slot="slotProps" v-bind.sync="editedItem" :items="items" :type="type">
    <v-btn :disabled="!slotProps.valid" color="primary" class="text-capitalize" @click="save">
      Save
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

  middleware: ['check-auth', 'auth', 'setCurrentProject', 'isProjectAdmin'],

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
        min: 0,
        max: 0,
        step: 0,
        ticks: ''
      } as LabelDTO,
      items: [] as LabelDTO[],
      type: this.$route.query.type
    }
  },

  computed: {
    projectId(): string {
      return this.$route.params.id
    },

    labelId(): string {
      return this.$route.params.label_id
    },

    service(): any {
      const type = this.$route.query.type
      if (type === 'category') {
        return this.$services.categoryType
      } else if (type === 'span') {
        return this.$services.spanType
      } else if (type === 'relation') {
        return this.$services.relationType
      } else {
        return this.$services.ratingType
      }
    }
  },

  async created() {
    this.items = await this.service.list(this.projectId)
    this.editedItem = await this.service.findById(this.projectId, this.labelId)
  },

  methods: {
    async save() {
      await this.service.update(this.projectId, this.editedItem)
      this.$router.push(`/projects/${this.projectId}/labels`)
    }
  }
})
</script>
