/**
 * 登录页逻辑（web/js/login.js）
 * 提交账号密码 -> POST /api/auth/login -> 保存 access_token -> 跳转个人主页。
 */

import { loginUser } from "./api.js";
import { setToken } from "./auth.js";

const form = document.getElementById("login-form");
const accountEl = document.getElementById("account");
const passwordEl = document.getElementById("password");
const submitBtn = document.getElementById("login-btn");
const tipEl = document.getElementById("login-tip");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  tipEl.textContent = "";

  const account = accountEl.value.trim();
  const password = passwordEl.value;

  if (!account || !password) {
    tipEl.textContent = "请填写账号和密码";
    return;
  }

  submitBtn.disabled = true;
  try {
    const data = await loginUser({ account, password });
    // 登录成功，保存后端返回的 access_token
    setToken(data.access_token);
    location.href = "./dashboard.html";
  } catch (error) {
    tipEl.textContent = error instanceof Error ? error.message : "登录失败，请稍后重试";
  } finally {
    submitBtn.disabled = false;
  }
});
