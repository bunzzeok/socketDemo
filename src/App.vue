<template>
  <div class="flex flex-col items-start justify-center">
    <button
      :disabled="loading"
      @click="socket.connect"
      class="border rounded-2xl border-solid px-3 py-2 border-gray-400 hover:bg-blue-500 hover:text-white hover:border-blue-500"
    >
      소켓 연결
    </button>

    <div v-if="socketStatus" class="flex items-center">
      보낼 데이터 :
      <input v-model="sendText" class="w-48 border border-solid ml-2" />
    </div>

    <button
      v-if="socketStatus"
      @click="socket.send"
      class="border rounded-2xl border-solid px-3 py-2 border-gray-400 hover:bg-green-500 hover:text-white hover:border-green-500"
    >
      데이터 전송
    </button>

    <button
      v-if="socketStatus"
      @click="socket.close"
      class="border rounded-2xl border-solid px-3 py-2 border-gray-400 hover:bg-red-500 hover:text-white hover:border-red-500"
    >
      소켓 연결 끊기
    </button>

    <div class="flex items-center">
      <span class="mr-2"> 연결 상태 : </span>

      <div v-if="loading">Loading...</div>
      <div v-else>
        <div v-if="!socketStatus" class="rounded-full w-3 h-3 bg-red-500"></div>

        <div v-else class="rounded-full w-3 h-3 bg-green-500"></div>
      </div>
    </div>
    <div class="w-full border-b border-solid border-gray-400">
      <span class="font-bold text-3xl"> 에러 로그 </span>
      <div ref="refErrorlog" class="overflow-auto max-h-[200px] min-h-[200px]">
        <div v-for="(socketError, index) in socketErrorList" :key="index" class="border-b border-solid border-gray-400">
          {{ socketError }}
        </div>
      </div>
    </div>

    <div class="flex w-full">
      <div class="w-[calc(50%)] border-r-4 border-dashed border-gray-400">
        <span class="font-bold text-3xl"> 보낸 데이터 리스트 </span>
        <div ref="refSendData" class="overflow-auto w-full max-h-[500px] min-h-[500px]">
          <div v-for="(socketSendData, index) in socketSendDataList" :key="index" class="border-b border-solid border-gray-400">
            {{ socketSendData }}
          </div>
        </div>
      </div>
      <div class="w-[calc(50%)]">
        <span ref="refGetData" class="font-bold text-3xl"> 받은 데이터 리스트 </span>
        <div class="overflow-auto w-full max-h-[500px] min-h-[500px]">
          <div v-for="(socketGetData, index) in socketGetDataList" :key="index" class="border-b border-solid border-gray-400">
            {{ socketGetData }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive } from "vue";

const socketStatus = ref(false);

const socketInfo = ref(null);

const sendText = ref("");

const socketGetDataList = ref([]);
const socketSendDataList = ref([]);

const socketErrorList = ref([]);

const loading = ref(false);

const url = "ws://localhost:30000/socket";

const refErrorlog = ref(null);
const refSendData = ref(null);
const refGetData = ref(null);

const socket = reactive({
  connect: () => {
    loading.value = true;
    socketInfo.value = new WebSocket(url);

    socketInfo.value.onopen = () => {
      loading.value = false;
      socketStatus.value = true;
    };

    socketInfo.value.onclose = () => {
      loading.value = false;
      socketStatus.value = false;
      socketInfo.value = null;
    };

    socketInfo.value.onerror = (err) => {
      loading.value = false;
      err.message ? socket.setErrorLogData(err.message) : socket.setErrorLogData("failed Connection.");
      socketInfo.value = null;
    };

    socketInfo.value.onmessage = (event) => {
      socketGetDataList.value.push(event.data);
      setTimeout(() => {
        refGetData.value.scrollTop = 9999999;
      });
    };
  },
  setErrorLogData: (err) => {
    socketErrorList.value.push(err);
    setTimeout(() => {
      refErrorlog.value.scrollTop = 9999999;
    });
  },
  close: async () => {
    loading.value = true;
    try {
      await socketInfo.value.close();
    } catch (err) {
      socketErrorList.value.push(err);
    }
    loading.value = false;
  },
  send: () => {
    try {
      console.log(sendText.value);
      socketInfo.value.send(sendText.value);
      socketSendDataList.value.push(sendText.value);
      setTimeout(() => {
        refSendData.value.scrollTop = 9999999;
      });
    } catch (err) {
      socket.setErrorLogData(err);
    }
  },
});
</script>
<style></style>
