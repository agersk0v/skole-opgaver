<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const todo = ref(null)
const loading = ref(false)
const error = ref('')
const retry = ref(0)

watch([() => route.params.id, retry], async ([id], _, onCleanup) => {
  const controller = new AbortController()
  onCleanup(() => controller.abort())
  todo.value = null
  error.value = ''
  loading.value = true
  try {
    if (!/^[1-9]\d*$/.test(id)) {
      error.value = 'Todo not found.'
      return
    }
    const { data } = await axios.get(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      timeout: 15000,
      signal: controller.signal,
    })
    todo.value = data
  } catch (cause) {
    if (controller.signal.aborted) return
    error.value = cause.response?.status === 404
      ? 'Todo not found.'
      : 'Unable to load this todo. Please check your connection and try again.'
  } finally {
    if (!controller.signal.aborted) loading.value = false
  }
}, { immediate: true })
</script>

<template>
  <section class="panel" aria-label="Todo details">
    <RouterLink class="back-link" to="/">← Back to todos</RouterLink>
    <p v-if="loading" role="status">Loading todo…</p>
    <div v-else-if="error" class="error" role="alert">
      <p>{{ error }}</p>
      <button v-if="error !== 'Todo not found.'" type="button" @click="retry++">Try again</button>
    </div>
    <article v-else-if="todo">
      <p class="eyebrow">TODO #{{ todo.id }}</p>
      <h2 class="detail-title">{{ todo.title }}</h2>
      <dl class="details">
        <div><dt>Todo ID</dt><dd>{{ todo.id }}</dd></div>
        <div><dt>User ID</dt><dd>{{ todo.userId }}</dd></div>
        <div>
          <dt>Status</dt>
          <dd><span class="badge" :class="{ completed: todo.completed }">{{ todo.completed ? 'Completed' : 'Pending' }}</span></dd>
        </div>
      </dl>
    </article>
  </section>
</template>
