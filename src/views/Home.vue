<template>
  <div
    class="
      w-full
      min-h-screen
      mx-auto
      bg-gray-50
      lg:pt-8
      bg-gradient-to-r
      from-indigo-700
      to-indigo-200
    "
  >
    <div
      class="
        max-w-screen-xl
        px-4
        py-12
        mx-auto
        sm:px-6
        lg:py-16 lg:px-32 lg:flex lg:items-center lg:justify-between lg:mt-12
        flex-col
      "
    >
      <h2
        class="
          text-3xl
          font-extrabold
          leading-9
          tracking-tight
          text-white
          sm:text-4xl sm:leading-10
        "
      >
        基于以太坊和IPFS搭建的NFT DApp Demo
      </h2>
      <br />
      <p class="mt-12 text-2xl text-white">合约：Solidity</p>
      <p class="mt-2 text-2xl text-white">DApp开发环境：Hardhat</p>
      <p class="mt-2 text-2xl text-white">IPFS：Pinata</p>
      <p class="mt-2 text-2xl text-white">其它：web3Modal、ethers等</p>
      <!-- <p class="my-2 text-2xl text-white">服务端：Koa2+Mongodb</p> -->
      <p class="mt-2 text-2xl text-white">前端：Vue3+Vite+Tailwindcss</p>
    </div>
    <!-- <div
      class="
        flex
        justify-center
        max-w-screen-xl
        px-8
        mx-auto
        lg:justify-start lg:px-32
      "
    >
      <div class="btn btn-white" @click="test">浏览</div>
    </div> -->
  </div>
</template>

<script setup>
import { ethers } from "ethers";
import { onMounted } from "vue";
import Web3Modal from "web3modal";

async function test() {
  const web3Modal = new Web3Modal();
  const connection = await web3Modal.connect();
  const provider = new ethers.providers.Web3Provider(connection);
  const signer = provider.getSigner();
  console.log(signer);
}
</script>
