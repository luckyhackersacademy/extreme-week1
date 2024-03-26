<template>
  <MainContent>
    <template #header>
      <Header email="igor@gmail.com" />
    </template>

    <template #content>
      <slot></slot>
    </template>
  </MainContent>
</template>
