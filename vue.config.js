module.exports = {
    devServer: {
        open: process.platform === 'darwin',
        host: '0.0.0.0',
        port: 5174, // CHANGE YOUR PORT HERE!
        https: true,
        hotOnly: false,
    },
}