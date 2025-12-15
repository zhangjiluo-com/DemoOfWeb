/**
 * 这是一个爬取Cookie的学习演示示例
 * 警告：禁止将该项目用于任何违法违规活动，由此造成的一切后果与开发者无关
 * @author zhangjiluo.com
 * 该项目使用MIT协议进行开源
 * @link https://github.com/zhangjiluo-com/cookies-spider-demo
 * @license MIT
 */

import puppeteer from "puppeteer";
import express from "express";

const PORT = 12358;
const PAGE_URL = "https://www.baidu.com";
const COOKIE_URLS = [PAGE_URL, "https://m.baidu.com"];

async function getAllCookies() {
  console.log("开始获取所有Cookies");

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.evaluateOnNewDocument(
    'Object.defineProperty(navigator,"webdriver",{get(){return void 0}})'
  );

  await page.goto(PAGE_URL, {
    waitUntil: "networkidle2",
  });

  // 当需求某个请求响应的Cookies时，在此添加逻辑
  //   await page.waitForResponse(
  //     (response) => response.url() === "" && response.status() === 200
  //   );

  const cookies = await page.cookies(...COOKIE_URLS);

  await browser.close();

  console.log("完成获取所有Cookies");

  return cookies;
}

express()
  .get("/", async (req, res) => {
    console.log("请求来了😂😂😂😂😂😂");
    try {
      const cookies = await getAllCookies();

      res.setHeader("Content-Type", "application/json");
      res.send(cookies);
    } catch (error) {
      res.send(error);
    }

    console.log("请求完成了👌👌👌👌👌👌");
  })
  .listen(PORT, () => {
    console.log("-------------------------------");
    console.log("服务启动在：http://localhost:" + PORT);
    console.log("-------------------------------");
  });
