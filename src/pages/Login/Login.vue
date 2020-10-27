<template>
  <div>
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="用户名"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { Form, Field,Button } from "vant";
export default {
  components: {
      [Form.name]:Form,
      [Field.name]:Field,
      [Button.name]:Button
  },
  data() {
    return {
        username:'',
        password:''
    };
  },
  created() {},
  methods: {

     async onSubmit(){

       let body = await this.$http.Login.login({phone:this.username,password:this.password})

       console.log(body)

      }
  }
};
</script>

<style  scoped>
</style>
