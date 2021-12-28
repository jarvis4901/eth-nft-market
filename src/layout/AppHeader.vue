<template>
  <header
    class="
      flex
      justify-between
      bg-white
      shadow
      bg-gradient-to-r
      from-indigo-700
      to-indigo-200
    "
  >
    <ul class="flex items-center py-6 pl-3 md:pl-12 xl:pl-48">
      <li
        class="
          h-6
          mr-4
          text-base
          font-bold
          leading-8
          text-white
          transition-all
          cursor-pointer
          md:text-base
          lg:h-8 lg:text-xl
          sm:mr-6
          xl:text-2xl
          hover:text-indigo-800 hover:border-b-indigo-800 hover:border-b-2
        "
      >
        <router-link to="/home" class="block h-6 leading-6">首页</router-link>
      </li>
      <li
        class="
          h-6
          mr-4
          text-base
          font-bold
          leading-6
          text-white
          transition-all
          cursor-pointer
          md:text-base
          lg:h-8 lg:text-xl
          sm:mr-6
          xl:text-2xl
          hover:text-indigo-800 hover:border-b-indigo-800 hover:border-b-2
        "
      >
        <router-link to="/my" class="block h-6 leading-6">
          我的</router-link
        >
      </li>
      <li
        class="
          h-6
          mr-4
          text-base
          font-bold
          leading-8
          text-white
          transition-all
          cursor-pointer
          md:text-base
          lg:h-8 lg:text-xl
          sm:mr-6
          xl:text-2xl
          hover:text-indigo-800 hover:border-b-indigo-800 hover:border-b-2
        "
      >
        <router-link to="/publish" class="block h-6 leading-6"
          >发布</router-link
        >
      </li>
      <li
        class="
          h-6
          mr-4
          text-base
          font-bold
          leading-8
          text-white
          transition-all
          cursor-pointer
          md:text-base
          lg:h-8 lg:text-xl
          sm:mr-6
          xl:text-2xl
          hover:text-indigo-800 hover:border-b-indigo-800 hover:border-b-2
        "
      >
        <router-link to="/gallery" class="block h-6 leading-6">
          NFTs</router-link
        >
      </li>
    </ul>
    <ul class="flex items-center py-3 pr-3 md:pr-12 xl:pr-48">
      <!-- <li class="btn btn-indigo btn-sm sm:btn-md">登录</li> -->
    </ul>
  </header>
</template>

<script setup></script>
