const data = [
  {
    tags: ["tag1", "tag2", "tag3"],
    imageUrl:
      "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg9.51tietu.net%2Fpic%2F2019-091120%2Frtiytxkunhwrtiytxkunhw.jpg&refer=http%3A%2F%2Fimg9.51tietu.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1642733474&t=e37871a3c89d7de397aa4fe696865a5f",
    outline: "test0",
    userAddress: "0x68b3465833fb72a",
    title: "test0",
    tokenValue: 20.6,
  },
  {
    tags: ["小程序", ""],
    imageUrl:
      "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.jj20.com%2Fup%2Fallimg%2F1114%2F0GH0132U2%2F200GG32U2-12-1200.jpg&refer=http%3A%2F%2Fimg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1642733474&t=df7fff73464e06f00ed33cc688c05d18",
    outline: "test1",
    userAddress: "0x9c80830bec5890",
    title: "test1",
    tokenValue: 10.2,
  },
  {
    tags: ["vue", "webpack", "npm"],
    imageUrl:
      "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.jj20.com%2Fup%2Fallimg%2F4k%2Fs%2F02%2F2109242259192W5-0-lp.jpg&refer=http%3A%2F%2Fimg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1642733474&t=f1849ae9eaa316a589808d1ac6b1f2ed",
    outline: "test2",
    userAddress: "0xb4e9123bd3ef4df17",
    title: "test3",
    tokenValue: 0.9,
  },
  {
    tags: ["本站", "typescript", ""],
    imageUrl:
      "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F201205%2F11%2F20120511142238_wuydQ.thumb.400_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1642733474&t=7e8141ff3c73e4ab0d5d735b2e357613",
    outline: "test4",
    userAddress: "0xdf09092bae5c265",
    title: "test4",
    tokenValue: 5.6,
  },
  {
    tags: ["promise", "js"],
    imageUrl: "",
    outline: " test5",
    userAddress: "0xdf09092bae5c265e40",
    title: "test5",
    tokenValue: 4.3,
  },
  {
    tags: ["vue", "es6", "typescript", ""],
    imageUrl:
      "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F2019-08-28%2F5d6649239aed2.jpg&refer=http%3A%2F%2Fpic1.win4000.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1642733474&t=026bf360422b271949bdeff03389dba1",
    outline: "test6",
    userAddress: "0xdf09092bae5c265e40",
    title: "test6",
    tokenValue: 9.1,
  },
  {
    tags: ["jenkins", "docker", "CI/CD"],
    imageUrl:
      "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F22d4513ec314686b001cc306ec50ec5c2fd8ebea2730d-1zeeHQ_fw658&refer=http%3A%2F%2Fhbimg.b0.upaiyun.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1642733474&t=9dd992cf4152760080d790daa63863f7",
    outline: "test7",
    userAddress: "0xdf09092bae5c265",
    title: "test7",
    tokenValue: 6.5,
  },
  {
    tags: ["vue", "es6", "typescript", ""],
    imageUrl:
      "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.jj20.com%2Fup%2Fallimg%2F611%2F031213123016%2F130312123016-3-1200.jpg&refer=http%3A%2F%2Fimg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1642733473&t=e0ec4b20676b6bb36df02edab3c40add",
    outline: "test8",
    userAddress: "0xb4e9123bd3ef4df17f8c",
    title: "test8",
    tokenValue: 8.1,
  },
  {
    tags: ["demo", "test"],
    imageUrl: "http://image.gkshi.com/not-exist-imageUrl.png",
    outline: "test9。",
    userAddress: "",
    title: "test9",
    tokenValue: 9.2,
  },
  {
    tags: ["es6", "javascript"],
    imageUrl: "",
    outline: "test10",
    userAddress: "0xdf09092bae5c265e",
    title: "test10",
    tokenValue: 4.3,
  },
  {
    tags: ["es6", ""],
    imageUrl: "",
    outline: "test11",
    userAddress: "0x45a36a8e118c37",
    title: "test11",
    price: 3.3,
  },
];

export async function getData(): Promise<unknown[]> {
  return new Promise((resolve, reject) => {
    const ret = [...data, ...data];
    setTimeout(() => {
      resolve(ret);
    }, 1000);
  });
}
