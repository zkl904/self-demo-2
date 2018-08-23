<template>
	<div class="contain">
		<div style="width:500px;padding:50px 0; border:1px solid #f2f2f2;text-align:center;">
			<img id="image" src="" width="131" />
			<br/>
			<form>
				<input type="file" id="file" name="file" @change="upload"/>
			</form>
			<br/><br/>
			<span id="upfile" style="border:1px solid #ccc; background:#f2f2f2; font-size:14px; text-align:center;padding:3px 5px;" @click="upfile">上传</span>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {

    }
  },
	methods: {
    upload() {
      this.$nextTick(()=>{
        let FileReader = window.FileReader;
        var clip = document.getElementById('image')
	      var path = document.getElementById('image')
        if (FileReader) { //chrome浏览器处理
          var reader = new FileReader()
          var file = document.getElementById('file').files[0]
          reader.onload = function(e) {
            path = e.target.result;
            console.log('c', path);
            console.log(clip)
            // clip.attr("src", path); //这里是把图片转成64位数据存入<img>中的src里
            clip.setAttribute("src", path); //这里是把图片转成64位数据存入<img>中的src里
          };
          reader.readAsDataURL(file);
        }
      })
    },
    upfile() {
      var form = document.forms[0];
      var formData = new FormData(form); //这里连带form里的其他参数也一起提交了,如果不需要提交其他参数可以直接FormData无参数的构造函数
	    console.log(formData)
      this.$http.post('/auth/upfile', formData)
	      .then((res)=>{
	        console.log('imgurl', res)
	      })
    }
	}
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
