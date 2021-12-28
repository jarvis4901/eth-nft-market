<template>
  <div class="w-full px-4 py-4 lg:px-8 lg:py-10">
    <div class="w-60 flex justify-center" style="width: 100%">
      <div
        @click="changeCategory('own')"
        :class="{ active: category === 'own' }"
        class="
          chooseBtn
          w-32
          h-10
          cursor-pointer
          flex
          justify-center
          hover:text-indigo-700
        "
      >
        我拥有的
      </div>
      <div
        @click="changeCategory('created')"
        :class="{ active: category === 'created' }"
        class="
          chooseBtn
          w-32
          h-10
          flex
          cursor-pointer
          justify-center
          hover:text-indigo-700
        "
      >
        我发布的
      </div>
    </div>
    <div class="px-4 mx-auto mt-4 lg:mt-8 lg:px-7 lg:w-10/12">
      <template v-if="list.length == 0">
        <div class="flex justify-center flex-col items-center mt-24">
          <img :src="emptyImg" class="w-36" alt="" />
          <span class="text-gray-600">没有数据</span>
        </div>
      </template>
      <template v-else>
        <v3-waterfall
          :key="forUpdate"
          class="w-full mx-auto"
          :list="list"
          srcKey="image"
          :gap="12"
          :colWidth="280"
          :distanceToScroll="200"
          :scrollBodySelector="isLimit ? '.limit-box' : ''"
          :isMounted="isMounted"
          :isLoading="loading"
          :isOver="over"
        >
          <template v-slot:default="slotProp">
            <div
              class="
                rounded
                shadow
                list-item
                shadow-md
                border border-indigo-300
              "
            >
              <a href="">
                <div class="rounded-t image-wrapper p-4">
                  <img :src="slotProp.item.image" class="w-full align-middle" />
                </div>
              </a>

              <div>
                <div class="flex justify-between px-2 mt-2">
                  <div class="text-sm">名称</div>
                  <div class="text-sm text-indigo-700">
                    {{ slotProp.item.name }}
                  </div>
                </div>
                <div class="flex justify-between px-2 mt-2">
                  <div class="text-sm">价格</div>
                  <div class="text-sm text-indigo-700">
                    {{ slotProp.item.price }}
                  </div>
                </div>

                <div class="flex justify-between px-2 mt-2">
                  <div class="text-sm">描述</div>
                  <p class="text-xs text-left text-gray-500">
                    {{ slotProp.item.description }}
                  </p>
                </div>
              </div>
              <div
                class="
                  flex
                  justify-center
                  mt-1
                  cursor-pointer
                  rounded-b
                  py-2
                  font-bold
                  text-white
                  bg-indigo-700
                "
              >
                查看
              </div>
            </div>
          </template>
        </v3-waterfall>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from "vue";
import emptyImg from "@/assets/images/empty.png";
import { fetchMyNFTs, fetchMyCreatedNFTs } from "@/hooks/useWeb3";
import { _fetchData } from "ethers/lib/utils";

const category = ref<string>("own");
const list = ref<unknown[]>([]);
const loading = ref(false);
const over = ref(false);
const isMounted = ref(false);
const forUpdate = ref(0);
const isLimit = ref(false);

async function fetchCreatedNFTs() {
  // todo
  return await fetchMyCreatedNFTs();
}

async function fetchOwnedNFTs() {
  // todo
  return await fetchMyNFTs();
}

onMounted(fetchData);

async function fetchData() {
  if (category.value === "own") {
    list.value = await fetchOwnedNFTs();
  } else {
    list.value = await fetchCreatedNFTs();
  }
  console.log(list.value);
}

function changeCategory(value: string) {
  category.value = value;
  fetchData();
}
</script>

<style lang="less">
.limit-box {
  height: 300px;
  overflow-y: scroll;
}
.list-item {
  list-style-type: none;
  box-sizing: border-box;
  .image-wrapper {
    overflow: hidden;
    background-color: #fff;
  }

  &:hover {
    box-shadow: 5px 5px 5px #ccc;
    .cover {
      animation: scaleImg 0.2s linear forwards;
    }
    @keyframes scaleImg {
      0% {
        transform: scale(1);
      }
      100% {
        transform: scale(1.2);
      }
    }
  }
}
.cover {
  width: 100%;
  vertical-align: middle;
}

.chooseBtn {
  font-size: 1.2rem;
  font-weight: bold;
  line-height: 1.5rem;
  color: #999ca3;
  transition: all 0.1s;
}
.active {
  font-size: 2rem;
  line-height: 2rem;
  color: rgb(67 56 202);
  font-weight: bold;
}
</style>
