/**
 * 注册页逻辑（web/js/register.js）
 * 提交用户名 / 邮箱 / 密码 -> POST /api/auth/register -> 保存 access_token -> 跳转个人主页。
 */

import { registerUser } from "./api.js";
import { setToken } from "./auth.js";

const form = document.getElementById("register-form");
const usernameEl = document.getElementById("username");
const emailEl = document.getElementById("email");
const passwordEl = document.getElementById("password");
const submitBtn = document.getElementById("register-btn");
const tipEl = document.getElementById("register-tip");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  tipEl.textContent = "";

  const username = usernameEl.value.trim();
  const email = emailEl.value.trim();
  const password = passwordEl.value;

  if (!username || !email || !password) {
    tipEl.textContent = "请填写完整注册信息";
    return;
  }

  submitBtn.disabled = true;
  try {
    const data = await registerUser({ username, email, password });
    // 注册成功后端直接返回 Token，保存后进入主页
    setToken(data.access_token);
    location.href = "./dashboard.html";
  } catch (error) {
    tipEl.textContent = error instanceof Error ? error.message : "注册失败，请稍后重试";
  } finally {
    submitBtn.disabled = false;
  }
});
