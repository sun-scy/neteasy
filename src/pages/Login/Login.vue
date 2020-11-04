<!--
 * @Author: your name
 * @Date: 2020-10-27 09:55:12
 * @LastEditTime: 2020-10-27 14:09:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \netease\src\pages\Login\Login.vue
-->
<template>
  <div>
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="用户名"
        label="用户名"
        placeholder="用户名"
      />

      <van-field
        v-model="password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>

    <form></form>
    <!-- <Loading></Loading> -->
    <!-- <upload></upload> -->
  </div>
</template>

<script>
import { Form, Field, Button } from "vant";
import Loading from "../../components/Loading/Loading";
import upload from "../../components/upload/upload";
import { mapActions } from "vuex";
import { SAVEUSERINFO } from "../../store/mutation_type";
export default {
  components: {
    Loading,
    upload,
    [Form.name]: Form,
    [Field.name]: Field,
    [Button.name]: Button,
  },
  data() {
    return {
      errors: ["11111"],
      username: "",
      password: "",
    };
  },
  created() {},
  methods: {
    ...mapActions([SAVEUSERINFO]),
    async onSubmit() {
      // let body = await this.$http.Login.login({
      //   phone: this.username,
      //   password: this.password
      // });

      // console.log(body);
      this[SAVEUSERINFO]({ phone: this.username, password: this.password });
    },
  },
};
</script>

<style  scoped>
</style>
