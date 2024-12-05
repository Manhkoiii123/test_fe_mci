"use client";

import { User } from "@/app/types/auth";

export const localStorageEventTarget = new EventTarget();

export const setAccessTokenFromLs = (accessToken: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("access_token", accessToken);
  }
};
export const setRefreshTokenFromLs = (refresh_token: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("refresh_token", refresh_token);
  }
};

export const clearLocalStorage = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("access_token");
    localStorage.removeItem("profile");
    // localStorage.removeItem("testUser");
    // localStorage.removeItem("generateQuestion");
    const clearLocalStorageEvent = new Event("clearLocalStorage");
    localStorageEventTarget.dispatchEvent(clearLocalStorageEvent);
  }
};

export const getAccessTokenFromLS = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("access_token") || "";
  }
  return "";
};

export const getProfileFromLS = () => {
  if (typeof window !== "undefined") {
    const result = localStorage.getItem("profile");
    return result ? JSON.parse(result) : null;
  }
  return null;
};
export const getUserTestFromLS = () => {
  if (typeof window !== "undefined") {
    const result = localStorage.getItem("testUser");
    return result ? JSON.parse(result) : null;
  }
  return null;
};
export const getQuestionFromLS = () => {
  if (typeof window !== "undefined") {
    const result = localStorage.getItem("generateQuestion");
    return result ? JSON.parse(result) : null;
  }
  return null;
};

export const setProfileFromLS = (profile: User) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("profile", JSON.stringify(profile));
  }
};
