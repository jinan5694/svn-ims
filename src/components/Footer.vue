<template>
  <div class="footer">
    Copyright© 2018 上海睿谋信息技术有限公司<a href="http://www.miitbeian.gov.cn/">沪ICP备17038562号</a>
  </div>
</template>

<script>
export default {

}
</script>

<style lang='scss' scoped>
$color: #999;
.footer {
  padding: 0 0 16px;
  text-align: center;
  font-size: 12px;
  color: $color;
  a {
    padding: 0 5px;
    color: $color;
    text-decoration: none;
    &:hover {
      color: darken($color, 10%);
    }
  }
}
</style>
