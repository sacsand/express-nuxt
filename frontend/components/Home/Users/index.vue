<template>
  <div>
    <ul>
      <li v-for="(user, index) in users" :key="index">
        {{ user }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: []
    };
  },
  computed: {
    getUserInfo() {
      return this.$store.getters.getUserInfo;
    }
  },
  mounted() {
    this.getUsers();
  },
  methods: {
    async getUsers() {
      try {
        const data = await this.$axios.$post("/api/auth/users");
        this.users = data.users;
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>

<style></style>
