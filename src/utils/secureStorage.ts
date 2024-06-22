"use client";

import { openDB, IDBPDatabase } from "idb";
import CryptoJS from "crypto-js";

const SECRET_KEY = "your-secret-key";

interface UserData {
  username: string;
  email: string;
  password: string;
}

interface MyDB {
  users: {
    key: string;
    value: string;
  };
}

let dbPromise: Promise<IDBPDatabase<MyDB>> | null = null;

function getDbPromise() {
  if (!dbPromise) {
    dbPromise = openDB<MyDB>("UserStore", 1, {
      upgrade(db) {
        db.createObjectStore("users");
      },
    });
  }
  return dbPromise;
}

export async function setUser(
  username: string,
  userData: UserData
): Promise<void> {
  if (typeof window === "undefined") return;
  const db = await getDbPromise();
  const encryptedData = CryptoJS.AES.encrypt(
    JSON.stringify(userData),
    SECRET_KEY
  ).toString();
  await db.put("users", encryptedData, username);
}

export async function getUser(username: string): Promise<UserData | null> {
  if (typeof window === "undefined") return null;
  const db = await getDbPromise();
  const encryptedData = await db.get("users", username);
  if (encryptedData) {
    const decryptedBytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
    return JSON.parse(decryptedBytes.toString(CryptoJS.enc.Utf8)) as UserData;
  }
  return null;
}

export async function getAllUsers(): Promise<UserData[]> {
  if (typeof window === "undefined") return [];
  const db = await getDbPromise();
  const encryptedUsers = await db.getAll("users");
  return encryptedUsers.map((encryptedData: string) => {
    const decryptedBytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
    return JSON.parse(decryptedBytes.toString(CryptoJS.enc.Utf8)) as UserData;
  });
}
