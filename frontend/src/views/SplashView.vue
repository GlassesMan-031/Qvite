<template>
    <div class="splash-background">
    <div class="intro">
        <h1 class="calsans-text">Welcome to QVITE</h1>
        <p class="introText darkerG-Light">the sleek finance tracker</p>
      </div>
    </div>
    </template>
    
    <script setup>
    import { ref } from 'vue'
    </script>
    
    <style scoped>
    
    .splash-background {
        background-image: url('/bg.png');
        background-size: cover;
        /* background-position: center; */
        background-repeat: no-repeat;
        min-height: 100vh;
        width: 100%;
        display:flex;
        place-items: center;
        justify-content: center;
        }

    body {
      background-color: #ebe3d5;
      color: #b0a695;
    }
     
    .introText {
      margin-top: -14px;
    }
    .calsans-text {
      font-family: "Cal Sans", sans-serif;
      font-weight: 400;
      font-style: normal;
      color: #b0a695;
    }
     
    .darkerG-Bold {
      font-family: "Darker Grotesque", sans-serif;
      font-optical-sizing: auto;
      font-weight: bold;
      font-style: normal;
    }
     
    .darkerG-Light {
      font-family: "Darker Grotesque", sans-serif;
      font-optical-sizing: auto;
      font-weight: 600;
      font-style: normal;
      color: #b0a695;
    }
     
    .darkerG-Normal {
      font-family: "Darker Grotesque", sans-serif;
      font-optical-sizing: auto;
      font-weight: normal;
      font-style: normal;
    }
     
    </style>
    