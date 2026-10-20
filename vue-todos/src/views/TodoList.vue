<script setup>
import { computed, onMounted, ref } from 'vue'
import axios from 'axios'

const todos = ref([])
const loading = ref(false)
const error = ref('')
const filter = ref('all')
const visibleTodos = computed(() => todos.value.filter(todo =>
  filter.value === 'all' || todo.completed === (filter.value === 'completed'),
))
const completedCount = computed(() => todos.value.filter(todo => todo.completed).length)

async function loadTodos() {
  loading.value = true
  error.value = ''
  try {
    const { data } = await axios.get('https://jsonplaceholder.typicode.com/todos', {
      timeout: 15000,
    })
    todos.value = data
  } catch {
    error.value = 'Unable to load todos. Please check your connection and try again.'
  } finally {
    loading.value = false
  }
}

onMounted(loadTodos)
</script>

<template>
    <section class="panel" aria-label="Todos">
      <div class="toolbar">
        <div>
          <h2>Todos</h2>
          <p v-if="!loading && !error">{{ todos.length }} total · {{ completedCount }} completed</p>
        </div>
        <button type="button" :disabled="loading" @click="loadTodos">{{ loading ? 'Loading…' : 'Refresh' }}</button>
      </div>

      <p v-if="loading" role="status">Loading todos…</p>
      <div v-else-if="error" role="alert" class="error">
        <p>{{ error }}</p>
        <button type="button" @click="loadTodos">Try again</button>
      </div>
      <template v-else>
        <label class="filter">
          Show
          <select v-model="filter">
            <option value="all">All todos</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </label>
        <ul v-if="visibleTodos.length">
          <li v-for="todo in visibleTodos" :key="todo.id">
            <RouterLink class="todo-link" :to="`/todos/${todo.id}`">
              <span class="number">#{{ todo.id }}</span>
              <span class="title">{{ todo.title }}</span>
              <span class="badge" :class="{ completed: todo.completed }">{{ todo.completed ? 'Completed' : 'Pending' }}</span>
            </RouterLink>
          </li>
        </ul>
        <p v-else>No todos to show.</p>
      </template>
    </section>
</template>
