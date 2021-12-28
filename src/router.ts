import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    meta: { title: "Home" },
    component: () => import("./views/Home.vue"),
  },
  {
    path: "/my",
    meta: { title: "MyNFTs" },
    component: () => import("./views/MyNFT.vue"),
  },
  {
    path: "/gallery",
    meta: { title: "Gallery" },
    component: () => import("./views/Gallery.vue"),
  },
  {
    path: "/publish",
    meta: { title: "Publish" },
    component: () => import("./views/PublishNft.vue"),
  },
  { path: "/:path(.*)", component: () => import("./views/NotFound.vue") },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
