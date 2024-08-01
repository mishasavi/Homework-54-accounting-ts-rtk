import { createAsyncThunk } from "@reduxjs/toolkit"
import { BASE_URL } from "../../utils/constants"
import type { UserRequest } from "../../utils/interfaces"
import type {User} from "../../utils/interfaces"

interface UpdatePasswordPayload {
  token: string;
  newPassword: string;
}

interface UpdateUserPayload {
  token: string;
  user: {
    firstName: string,
    lastName: string
  };
}

export const registerFetch = createAsyncThunk(
  "account/registerFetch",
  async (registerUser: UserRequest, thunkAPI) => {
    try {
      const response = await fetch(`${BASE_URL}/user`, {
        method: "POST",
        body: JSON.stringify(registerUser),
        headers: {
          "Content-Type": "application/json"
        }
      })
      if (!response.ok) {
        throw new Error(response.status + ", status")
      }
      const data = await response.json()
      return data
    } catch (e) {
      console.log(e)
      throw e
    }
  }
)

export const logInFetch = createAsyncThunk(
  "account/logInFetch",
  async (token: string, thunkAPI) => {
    const response = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Authorization": token
      }
    })
    if (!response.ok) {
      throw new Error(`Status: ${response.status}`);
    }

    return await response.json();
  }
)

export const updatePasswordFetch = createAsyncThunk (
  "account/updatePasswordFetch",
  async ({token, newPassword}: UpdatePasswordPayload,
         thunkAPI) => {
    const response = await fetch(`${BASE_URL}/user/password`, {
      method: "PUT",
      headers: {
        "Authorization": token,
        "X-Password": newPassword
      }
    })
      // .then(response => response.text())
      // .then(result => console.log(result))
      .catch(error => console.log('error', error));

  });

export const updateUserFetch = createAsyncThunk(
  "account/updateUserFetch",
  async ({ token, user }: UpdateUserPayload, thunkAPI) => {
    const response = await fetch(`${BASE_URL}/user`, {
      method: "PUT",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      }
    });

    if (!response.ok) {
      throw new Error(`Status: ${response.status}`);
    }

    return await response.json() as User; // Ensure the response is typed correctly
  }
);
