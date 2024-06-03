<template>
  <div class="wrap-404">
    <!-- 문구 -->
    <div class="wrap-content">
      <img src="@/assets/images/warn.png" alt="warn" class="warn" />
      <p class="text1">원하시는 페이지를 찾을 수 없습니다.</p>
      <p class="text2">
        잘못된 경로로 접근하셨습니다.<br />
        경로를 다시 확인하시고 올바른 경로를 통하여<br />
        해당 서비스를 이용해 주십시오.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "404",
};
</script>

<style scoped>
.wrap-404 {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  height: 100vh;
  padding: 62px 0;
  background-color: var(--clr-f9f9f9);
}

/* 문구 */
.wrap-content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.warn {
  width: 177px;
  margin-bottom: 38px;
}

.text1 {
  font-size: 35px;
  font-weight: var(--fw-700);
  color: var(--clr-e14246);
  text-align: center;
  margin-bottom: 44px;
}

.text2 {
  font-size: 24px;
  color: var(--clr-525252);
  text-align: center;
}
</style>
