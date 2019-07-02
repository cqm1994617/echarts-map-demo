var gulp = require('gulp')
var GulpSSH = require('gulp-ssh')

const config = {
  version: '1.0.0',
  ssh: {
    host: '47.110.151.199',
    port: 22,
    username: 'xiaoyan',
    password: '86163169'
  },
  remoteDir: '/home/xiaoyan/web/preview/map-demo',
  commands: [
    // 删除现有文件
    `rm -rf /home/xiaoyan/web/preview/map-demo/*`
  ]
}

let sshConfig = config.ssh
// 打开ssh通道
let gulpSSH = new GulpSSH({
  ignoreErrors: false,
  sshConfig: sshConfig
})

gulp.task('remove', (done) => {
  console.log('删除...')

  gulpSSH.shell(config.commands, {
    filePath: 'commands.log'
  }).pipe(gulp.dest('logs'))
  done()
})

gulp.task('upload', (done) => {
  setTimeout(() => {
    gulp.src(['./build/**', '!**/node_modules/**']).pipe(gulpSSH.dest(config.remoteDir))
    done()
  }, 3000)
})

gulp.task('default', gulp.series('upload'))
