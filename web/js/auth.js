/**
 * 业务站点 Token 工具（web/js/auth.js）
 *
 * 与测试台的 api_test_access_token 互不干扰；本站统一使用 access_token。
 * Token 是否有效必须通过 GET /api/auth/me 判断，不能只看本地有没有字符串。
 */

const TOKEN_KEY = "access_token";

export function getToken() {
  try {
    return localStorage.getItem(TOKEN_KEY) || "";
  } catch (error) {
    return "";
  }
}

export function setToken(token) {
  try {
    if (token) localStorage.setItem(TOKEN_KEY, token);
    else localStorage.removeItem(TOKEN_KEY);
  } catch (error) {
    /* 隐私模式下 localStorage 可能不可用，忽略 */
  }
}

export function clearToken() {
  setToken("");
}

export function gotoLogin() {
  location.replace("./login.html");
}
