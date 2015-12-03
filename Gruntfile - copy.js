module.exports = function(grunt){
  grunt.initConfig({
    jade: {
      compile: {
        files: [{
          cwd: 'src',
          src: ['**/*.jade', '!partials/**/*.jade'],
          dest: 'dest',
          expand: true,
          ext: '.html',
        }]
      },
      options: {
        pretty: true,
      }
    },
    less: {
      compile: {
        files: [{
          cwd: 'src/css',
          src: '**/*.less',
          dest: 'dest/css',
          expand: true,
          ext: '.css',
        }]
      }
    },
    postcss: {
      options: {
          map: true,
          processors: [
              require('autoprefixer')({
                  browsers: ['last 2 versions', 'ie 8', 'ie 9']
              })
          ]
      },
      dist: {
          src: 'css/*.css'
      }
    },
    watch: {
      livereload: {
        options: {
          livereload: true
        },
        files: ['dest/**/*'],
      },
      js: {
        files: ['src/js/**/*.js'],
        tasks: ['newer:js'],
      },
      css: {
        files: ['src/css/**/*.css'],
        tasks: ['newer:css'],
      },
      jade: {
        files: ['src/**/*.jade', '!partials/**/*.jade'],
        tasks: ['process'],
      },
      less: {
        files: ['src/css/**/*.less'],
        tasks: ['process'],
      }
    },
    connect: {
      server: {
        options: {
          port: 3000,
          base: 'dest',
        }
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-newer');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('process', [
    'newer:jade',
    'newer:less',
    ]);
  grunt.registerTask('default', [
    'connect',
    'jade',
    'less',
    'watch'
  ]);
};
