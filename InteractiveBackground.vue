<template>
  <div class="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
    <!-- Interactive Background Canvas -->
    <canvas ref="canvasRef" class="fixed inset-0 pointer-events-auto z-[-2]"></canvas>

    <!-- Multi-Layered Ambient Glowing Aurora Mesh Blobs -->
    <div class="fixed top-[-10%] right-[-5%] w-[700px] h-[700px] bg-primary/30 rounded-full blur-[140px] pointer-events-none -z-10 animate-pulse-slow"></div>
    <div class="fixed bottom-[-10%] left-[-5%] w-[750px] h-[750px] bg-indigo-600/25 rounded-full blur-[160px] pointer-events-none -z-10 animate-float-slow"></div>
    <div class="fixed top-[40%] left-[15%] w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-[180px] pointer-events-none -z-10 animate-drift"></div>
    <div class="fixed top-[20%] right-[15%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[150px] pointer-events-none -z-10 animate-float-reverse"></div>
    <div class="fixed bottom-[30%] right-[5%] w-[550px] h-[550px] bg-cyan-500/15 rounded-full blur-[170px] pointer-events-none -z-10 animate-pulse-cyan"></div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useBackgroundController } from '../controllers/useBackgroundController'

const canvasRef = ref(null)
useBackgroundController(canvasRef)
</script>
