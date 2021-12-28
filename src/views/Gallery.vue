<template>
  <div class="w-full mx-auto lg:pt-8">
    <h1
      class="
        px-4
        mx-auto
        mt-4
        text-3xl
        font-bold
        text-center
        lg:px-7 lg:w-10/12
        text-indigo-600
      "
    >
      NFT列表(未售)
    </h1>
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

              <div class="px-2">
                <div class="flex justify-between mt-1 items-center">
                  <div class="text-sm">名称</div>
                  <div class="text-xs text-indigo-600">
                    {{ slotProp.item.name }}
                  </div>
                </div>
                <div class="flex justify-between mt-1 items-center">
                  <div class="text-sm">价格</div>
                  <div class="text-xs text-indigo-700">
                    {{ slotProp.item.price }}
                  </div>
                </div>
                <div class="flex justify-between mt-1 items-center">
                  <div class="text-sm">拥有者</div>
                  <div class="text-xs text-gray-500">
                    {{ $filters.shortHexAddress(slotProp.item.owner) }}
                  </div>
                </div>

                <div class="flex justify-between mt-1 items-center">
                  <div class="text-sm">售卖者</div>
                  <div class="text-xs text-gray-500">
                    {{ $filters.shortHexAddress(slotProp.item.seller) }}
                  </div>
                </div>
                <div class="flex justify-between mt-1 items-center">
                  <div class="text-sm">描述</div>
                  <p class="text-xs text-left text-gray-500">
                    {{ slotProp.item.description }}
                  </p>
                </div>
              </div>
              <div
                @click="buy(slotProp.item)"
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
                购买
              </div>
            </div>
          </template>
        </v3-waterfall>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { _image } from "@/components/waterfall/composable/errorImgBase64";
import { reactive, ref, onMounted } from "vue";
// import { getData } from "@/mock/waterfall";
import { fetchAllNFTs, buyNFT } from "@/hooks/useWeb3";
import emptyImg from "@/assets/images/empty.png";

const list = ref<unknown[]>([]);
const loading = ref<boolean>(false);
const over = ref<boolean>(false);
const isMounted = ref<boolean>(false);
const forUpdate = ref<number>(0);
const isLimit = ref<boolean>(false);

async function fetchNFTs() {
  const items = await fetchAllNFTs();
  return items;
}

onMounted(async () => {
  list.value = await fetchNFTs();
  console.log(list.value);
});

/**
 * 购买NFT
 */
async function buy(nft: any) {
  const isSuccess = await buyNFT(nft);
  isSuccess && alert("购买成功");
}

// const over = ref(false);
// const fetchList = async (): Promise<void> => {
//   loading.value = true;
//   // const newList = await getData();
//   const newList = await fetchNFTs();

//   loading.value = false;
//   list.value = list.value.concat(newList);
//   if (list.value.length > 120) over.value = true;
// };
// onMounted(fetchList);
// let isLoad = false;
// const getNext: () => Promise<void> = async (): Promise<void> => {
//   if (isLoad) return;
//   isLoad = true;
//   await fetchList();
//   isLoad = false;
// };
// const isMounted = ref(false);
// const forUpdate = ref(0);
// const isLimit = ref(false);

// const nfts = reactive(arr);
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
</style>
