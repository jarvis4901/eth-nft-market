<template>
  <div
    class="
      w-full
      pb-8
      min-h-screen
      pt-28
      mx-auto
      bg-gray-50
      lg:pt-46
      bg-gradient-to-r
      from-indigo-700
      to-indigo-200
    "
  >
    <h1
      class="text-2xl font-bold text-center text-white md:text-3xl xl:text-5xl"
    >
      发布你的NFT作品
    </h1>
    <p
      class="
        px-2
        mt-8
        text-xs
        font-bold
        text-center text-white
        md:text-lg
        xl:text-base
      "
    >
      因为是demo作品 目前只支持图片相关（jpg,jpeg,png,webp）和txt格式的文件
    </p>
    <p
      class="
        px-2
        mt-1
        text-xs
        font-bold
        text-center text-white
        md:text-lg
        xl:text-base
      "
    >
      只支持200kb以内大小的文件上传，文件过大请压缩后再尝试发布
      <a href="https://tinypng.com/" target="_blank" class="text-blue-200">
        熊猫压缩
      </a>
    </p>
    <div
      v-show="!uploadFile"
      @click="uploadClick"
      class="
        mt-8
        cursor-pointer
        w-40
        h-40
        border border-dashed border-gray-200
        mx-auto
        flex
        justify-center
        items-center
      "
    >
      <img :src="plusImg" class="w-10 h-10 block" />
    </div>
    <div
      class="w-48 h-72 min mx-auto mt-2 flex flex-col items-center"
      v-show="uploadFile && imgBase64"
    >
      <img :src="imgBase64" class="w-full max-h-72 block mx-auto" alt="" />
      <div
        class="btn btn-sm bg-indigo-200 mt-2 text-indigo-700"
        @click="resetFile"
      >
        撤销
      </div>
    </div>

    <div class="flex flex-col justify-center mt-12">
      <div class="mb-6 w-80 lg:w-96 mx-auto box flex flex-col">
        <input
          v-model="name"
          placeholder="输入名称"
          class="
            bg-white
            rounded
            text-sm
            border-none
            text-grey-darkest
            flex-1
            w-full
            px-2
            py-3
            focus:ring-0
            outline-none
          "
        />
        <input
          v-model="price"
          placeholder="输入价格：ether,整数"
          class="
            bg-white
            rounded
            text-sm
            border-none
            text-grey-darkest
            flex-1
            w-full
            px-2
            mt-2
            py-3
            focus:ring-0
            outline-none
          "
        />
        <textarea
          v-model="description"
          placeholder="输入一些描述"
          rows="4"
          class="
            bg-white
            rounded
            w-full
            text-sm
            border-none
            text-grey-darkest
            flex-1
            mt-2
            px-2
            pt-2
            focus:ring-0
          "
          name="tt"
        ></textarea>
      </div>

      <div class="mx-auto btn bg-indigo-800 btn-md" @click="submit">发布</div>
      <!-- <p class="mx-auto text-white" v-if="file">
        {{ file.name }} <span @click="resetFile">x</span>
      </p> -->
    </div>

    <input
      type="file"
      class="hidden"
      ref="fileInput"
      @click="(e:Event)=>{
    (e.target as HTMLInputElement).value = ''}"
      @change="chooseFile"
      accept="image/*,.txt"
    />
  </div>
</template>

<script lang="ts" setup>
import plusImg from "@/assets/images/plus.png";
import { onMounted, ref, unref } from "vue";
import { ipfsUrl } from "../../pinata.config";
import { isImage, isTxt, isSizeValid, fileToBase64 } from "@/utils/file";
import { isStringNumber } from "@/utils/is";
import { useStore } from "vuex";
import { pinFileToIPFS, pinJSONToIPFS } from "@/hooks/useIpfs";
import { createNFT } from "@/hooks/useWeb3";

const fileInput = ref<HTMLElement | null>(null);
const uploadFile = ref<File | null>(null);
const imgBase64 = ref<string>("");

const store = useStore();

function uploadClick(): void {
  fileInput.value?.dispatchEvent(new MouseEvent("click"));
}
async function chooseFile(e: Event): Promise<void> {
  const el = e.target as HTMLInputElement;
  const files = el.files as FileList;

  if (files.length > 0) {
    // 必须是文本或图片且大小不超过200kb
    if (!isImage(files[0])) {
      alert("只支持200kb以内的图片格式的文件");
      return;
    }

    if (!isSizeValid(files[0], 1024 * 200)) {
      alert("文件大小不能超过200kb");
      return;
    }
    uploadFile.value = files[0];
    // web3.test();
    imgBase64.value = await fileToBase64(uploadFile.value);
  }
}

/**
 * 撤销动作
 */
function resetFile(): void {
  uploadFile.value = null;
  imgBase64.value = "";
  console.log();
}

const name = ref<string>("");
const price = ref<string>("");
const description = ref<string>("");

// 提交 发布商品成为NFT
async function submit(): Promise<void> {
  if (!name.value) {
    alert("名称不能为空");
    return;
  }
  // 描述的内容字数也得限制
  if (description.value.length > 100) {
    alert("描述文字太长了，不超过100字");
    return;
  }
  console.log(isStringNumber(price.value));
  if (!price.value || !isStringNumber(price.value)) {
    alert("请输入合法的价格,必须为整数");
    return;
  }
  if (uploadFile.value) {
    store.dispatch("startLoading");
    try {
      // 文件先上传至ipfs
      let result = await pinFileToIPFS(uploadFile.value);
      console.log(result);

      if (result.statusText === "OK") {
        const ipfsHash = result.data.IpfsHash;
        const url = `${ipfsUrl}${ipfsHash}`;
        // const data = JSON.stringify({
        //   name: unref(name),
        //   description: unref(description),
        //   image: url,
        // });
        const data = {
          name: unref(name),
          description: unref(description),
          image: url,
        };
        console.log(data);
        // 将json通过pinata上传到IPFS
        result = await pinJSONToIPFS(data);
        if (result.statusText === "OK") {
          const jsonIpfsUrl = `${ipfsUrl}${result.data.IpfsHash}`;
          console.log("上传json到pinata json的ipfs地址：", jsonIpfsUrl);
          const isSuccess = await createNFT(jsonIpfsUrl, price.value);
          isSuccess && alert("发布成功");
        }
      } else {
        alert(result.statusText);
      }
    } catch (e) {
      console.error(e);
      alert("请求失败");
    } finally {
      store.dispatch("closeLoading");
    }
  }
  //
}
</script>
