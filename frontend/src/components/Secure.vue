<template>
  <div>
    <Menubar
      class="p-menubar"
    >
      <template #start>
        <Button
          type="button"
          class="p-button-text"
          @click="() => this.$router.push({ name: 'secure' })"
        >
          <img
            alt="logo"
            src="https://www.merchantsmarket.com/wp-content/uploads/2018/04/recipe-icon.png"
            height="40"
            class="p-mr-2"
          >
        </Button>
      </template>
      <template #end>
        <Button
          @click="logout"
          icon="pi pi-power-off"
          label="Sign Out"
          class="p-button-text"
        />
      </template>
    </Menubar>
    <router-view />
  </div>
</template>

<script>

export default {
  methods: {
    logout () {
      if (typeof localStorage !== 'undefined') {
        localStorage.removeItem('token')
      }
      this.$router.push({ name: 'login' })
    },
  },
}
</script>
