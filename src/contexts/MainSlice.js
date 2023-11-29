import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { message } from "antd";

const getToken = createAsyncThunk(
  "main/getAPIToken",
  async (_, { getState }) => {
    const { main } = getState();
    const response = await fetch(`${main.URL}/search`);
    return response.json();
  },
);
const getTikets = createAsyncThunk(
  "main/getTikets",
  async (_, { getState }) => {
    const { main } = getState();
    const response = await fetch(`${main.URL}/tickets?searchId=${main.token}`);
    return response.json();
  },
);
const initialState = {
  options: [
    { text: "Без пересадки", name: "without-transfer" },
    { text: "1 пересадка", name: "one-transfer" },
    { text: "2 пересадки", name: "two-transfers" },
    { text: "3 пересадки", name: "three-transfers" },
  ],
  navigation: ["Самый дешёвый", "Самый быстрый", "Оптимальный"],
  transfers: [
    {
      name: "no-transfer",
      status: true,
    },
    {
      name: "1-transfer",
      status: true,
    },
    {
      name: "2-transfers",
      status: true,
    },
    {
      name: "3-transfer",
      status: true,
    },
  ],
  ticketsFromServer: [],
  isSelectedAllTransfers: true,
  tabActive: 0,
  token: null,
  URL: "https://aviasales-test-api.kata.academy",
  stop: false,
  pending: false,
};
const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    setTab(state, action) {
      state.tabActive = action.payload;
    },
    setTransferStatus(state, action) {
      state.transfers[action.payload]["status"] =
        !state.transfers[action.payload].status;
      state.transfers = [...state.transfers];
      if (state.transfers.every((el) => el.status))
        state.isSelectedAllTransfers = true;
    },
    setTransferStatusAll(state) {
      if (state.transfers.some((el) => !el.status)) {
        state.transfers = state.transfers.map((transfer) => {
          return { ...transfer, status: true };
        });
        state.isSelectedAllTransfers = true;
      } else {
        state.transfers = state.transfers.map((transfer) => {
          return { ...transfer, status: false };
        });
        state.isSelectedAllTransfers = false;
      }
    },
    getAppToken(state, action) {
      state.token = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getToken.pending, (state) => {
        state.error = null;
      })
      .addCase(getToken.fulfilled, (state, action) => {
        state.token = action.payload.searchId;
      })
      .addCase(getTikets.pending, (state) => {
        state.error = null;
        state.pending = true;
      })
      .addCase(getTikets.fulfilled, (state, action) => {
        state.ticketsFromServer = [
          ...JSON.parse(JSON.stringify(state.ticketsFromServer)),
          ...JSON.parse(JSON.stringify(action.payload.tickets)),
        ];
        state.stop = action.payload.stop;
        state.pending = false;
        if (action.payload.stop) {
          message.open({
            type: "success",
            content: `Offers(${state.ticketsFromServer.length}) upload has been successfully completed!`,
            duration: 3,
          });
        }
      })
      .addCase(getTikets.rejected, (state) => {
        message.open({
          type: "error",
          content:
            "One of request was denied by the server with code 500.Fetch error by server. Don't worry, the download continues!",
          duration: 5,
        });
        state.pending = false;
      });
  },
});
export const { setTab, setTransferStatus, setTransferStatusAll, getAppToken } =
  mainSlice.actions;
export { getToken, getTikets };

export default mainSlice.reducer;
