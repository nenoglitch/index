/**
 * 登录后主页逻辑（web/js/dashboard.js）
 *
 * 页面加载（含刷新）时：
 * 1. 读取本地 access_token；没有 Token 直接跳回登录页。
 * 2. 调用 GET /api/auth/me 获取当前用户，用户名必须来自该接口，不写死。
 * 3. /api/auth/me 返回 401（Token 缺失 / 伪造 / 过期）时清除本地 Token 并跳回登录页。
 * 4. 退出登录：清除本地 Token，回到登录页。
 */

import { getCurrentUser } from "./api.js";
import { getToken, clearToken, gotoLogin } from "./auth.js";

const statusEl = document.getElementById("status");
const panelEl = document.getElementById("user-panel");
const avatarEl = document.getElementById("avatar");
const usernameEl = document.getElementById("username");
const emailEl = document.getElementById("email");
const logoutBtn = document.getElementById("logout-btn");

function renderUser(user) {
  statusEl.hidden = true;
  panelEl.hidden = false;
  logoutBtn.hidden = false;

  usernameEl.textContent = user.username;
  emailEl.textContent = user.email;
  avatarEl.textContent = (user.username || "?").charAt(0).toUpperCase();
}

async function loadCurrentUser() {
  const token = getToken();

  // 无 Token：直接跳回登录页
  if (!token) {
    gotoLogin();
    return;
  }

  try {
    // 用户名必须由 GET /api/auth/me 获取
    const me = await getCurrentUser(token);
    renderUser(me);
  } catch (error) {
    // 401：Token 无效或过期，清除本地 Token 并跳回登录页
    if (error && error.status === 401) {
      clearToken();
      gotoLogin();
      return;
    }
    statusEl.textContent = "加载用户信息失败，请稍后重试。";
  }
}

// 退出登录：清除本地 Token，回到登录页
logoutBtn.addEventListener("click", () => {
  clearToken();
  gotoLogin();
});

// 页面加载（含刷新）时自动校验并重新拉取用户名
window.addEventListener("DOMContentLoaded", loadCurrentUser);
