const port = 8088

module.exports = {
  baseUrl: '',
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
    },
    hotOnly: true,
    // 打开浏览器
    open: true,
    overlay: {
      warnings: true,
      errors: true
    },
    public: `localhost:${port}`,
    // 端口号
    port: port,
    proxy: {
      '/api': {
        changeOrigin: true,
        target: 'http://cloudbrain.aicloudata.com/gateway/psi-dev/api',
        ws: true
      }
    }
  }
}
