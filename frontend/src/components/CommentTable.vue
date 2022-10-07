<template>
  <q-markup-table>
    <thead>
    <tr>
      <th>Comment</th>
      <th>Author</th>
      <th>Actions</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(comment, index) in comments" v-bind:key="index">
      <td key="comment" class="text-center">{{comment.comment}}</td>
      <td key="author" class="text-center">{{comment.author}}</td>
      <td key="actions" class="text-center">
        <q-btn
          class="q-mr-sm"
          color="primary"
          text-color="white"
          icon="edit"
          @click="updateComment(index)"
        />
        <q-btn
          class="q-ml-sm"
          color="negative"
          text-color="white"
          icon="delete"
          @click="deleteComment(index)"
        />
      </td>
    </tr>
    <tr>
      <td key="comment" class="text-center">
        <q-input
          v-model="newComment"
          label="Comment"
          filled
          dense
        />
      </td>
      <td key="author" class="text-center">
        <q-input
          v-model="userName"
          label="Author"
          :disable="true"
          filled
          dense
        />
      </td>
      <td key="actions" class="text-center">
        <q-btn
          class="q-mr-sm"
          color="primary"
          text-color="white"
          icon="add"
          @click="addComment"
        />
      </td>
    </tr>
    </tbody>
  </q-markup-table>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore} from 'stores/auth.store';
import { useItemsStore } from 'stores/items.store';
import { useJobsStore } from 'stores/jobs.store';
import { useQuasar} from 'quasar';
import {Job} from 'src/types/Job';
import {Item} from 'src/types/Item';

const props = defineProps<{
  object: Job | Item
  isJob: boolean
}>();

const $q = useQuasar();

const userName = ref(useAuthStore().username);
const newComment = ref('');
const comments = ref(props.object.comments);

/**
 * Add a new comment to the object
 */
async function addComment() {
  if (props.isJob) {
    await useJobsStore().updateComment(props.object.id, -1, newComment.value);
  } else {
    await useItemsStore().updateComment(props.object.id, -1, newComment.value);
  }
  newComment.value = '';
}

/**
 * Update a comment
 * @param id
 */
function updateComment(id: number) {
  $q.dialog({
    title: 'Update comment',
    message: 'Enter the new comment',
    prompt: {
      model: '',
      type: 'textarea',
    },
    cancel: true,
    persistent: true,
  }).onOk(async (data: string) => {
    if (props.isJob) {
      await useJobsStore().updateComment(props.object.id, id, data);
    } else {
      await useItemsStore().updateComment(props.object.id, id, data);
    }
  });
}

/**
 * Delete a comment
 * @param id
 */
async function deleteComment(id: number) {
  if (props.isJob) {
    await useJobsStore().deleteComment(props.object.id, id);
  } else {
    await useItemsStore().deleteComment(props.object.id, id);
  }
}

</script>

<style scoped>

</style>
