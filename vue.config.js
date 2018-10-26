module.exports = {
  devServer: {
    // 打开浏览器
    open: true,
    overlay: {
      warnings: true,
      errors: true
    },
    // 端口号
    port: 8088,
    proxy: {
      '/api': {
        target: 'http://cloudbrain.aicloudata.com/gateway/psi-dev/api',
        ws: true,
        changeOrigin: true
      }
    }
  },
  runtimeCompiler: true
}
