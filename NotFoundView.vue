<template>
  <div class="min-h-[70vh] flex items-center justify-center px-6">
    <div class="max-w-md w-full text-center space-y-6 bg-card/50 border border-outline/60 p-10 rounded-2xl backdrop-blur-md">
      <div class="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 border border-primary/30 text-primary text-3xl font-bold">
        404
      </div>
      <h1 class="text-3xl font-semibold text-main">Page Not Found</h1>
      <p class="text-muted text-sm">
        The route you are looking for doesn't exist or has been moved.
      </p>
      <div>
        <router-link
          to="/"
          class="inline-block bg-primary hover:bg-secondary text-white font-semibold px-6 py-3 rounded-xl text-sm transition-all shadow-lg shadow-primary/20"
        >
          Return to Home &rarr;
        </router-link>
      </div>
    </div>
  </div>
</template>
