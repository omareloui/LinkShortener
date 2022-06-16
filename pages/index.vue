<script setup lang="ts">
useHead({ title: "Omar Eloui Links" });
</script>

<template>
  <Container>
    <HeaderMain />

    <FormSign />

    <main>
      <section>
        <FormCreateLink />
      </section>

      <PreviewLinks />
    </main>
  </Container>
</template>
