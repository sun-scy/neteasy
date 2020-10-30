<!--
 * @Author: your name
 * @Date: 2020-10-27 15:44:28
 * @LastEditTime: 2020-10-29 11:20:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \netease\src\components\upload\upload.vue
-->
<template>
  <div class="upload">
    <div class="file_wrap">
      <input
        type="file"
        multiple
        :accept="accept"
        @change="onUpfile"
        class="file"
        ref="files"
      />
    </div>
    <div v-if="fileList" class="wrap">
      <img :src="item.url" v-for="(item, index) in fileList" :key="index" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    limit: Number, //上传个数
    accept: String, //上传的文件类型
    size: Number //规定上传文件的大小
  },
  data() {
    return {
      fileList: [] //已上传的文件列表
    };
  },
  created() {},
  methods: {
    //上传文件的回调
    onUpfile(e) {
      let _this = this;
      var formData = new FormData();
      var fileData = this.$refs.files.files;
      fileData.forEach((item, index) => {
        var reader = new FileReader();
        formData.append("file", item);
        reader.readAsDataURL(item);
        reader.onload = function(e) {
          _this.fileList.push({ url: e.target.result });
        };
        

      });
    }
  }
};
</script>

<style  scoped lang='stylus'>
.upload {
  display: flex;

  .file_wrap {
    width: 176px;
    height: 176px;
    background-color: rgb(245, 245, 245);
  }

  .file {
    opacity: 0;
    width: 100%;
    height: 100%;
  }

  .wrap {
    height: 176px;
    overflow: hidden;
    display: flex;

    >img {
      width: 176px;
      height: 100%;
      display: inline-block;
      object-fit: cover;
    }
  }
}
</style>
