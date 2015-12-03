module.exports = function(grunt){
  grunt.initConfig({
    jade: {
      compile: {
        options: {
          pretty: true
        },
        files: {
          "dest/index.html": ["src/**/*.jade", "!src/include/**/*"]
        }
      }
    },
    less: {
      development: {
          options: {
            paths: ["src/css"]
          },
          files: {
            "dest/css/style.css": "src/css/style.less"
          }
        }
    },
    postcss: {
      options: {
          map: true,
          processors: [
              require('autoprefixer')({
                  browsers: ['last 2 versions', 'ie 9']
              })
          ]
      },
      dist: {
          src: 'dest/css/*.css'
      }
    },
    watch: {
      options: {
        livereload: true
      },
      scripts: {
        files: ['src/**/*']
      },
      jade: {
        files: ['src/**/*.jade', '!src/include/**/*'],
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
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-newer');
  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.registerTask('process', [
    'newer:jade',
    'newer:less',
  ]);

  grunt.registerTask('default', [
    'connect',
    'jade',
    'less',
    'postcss',
    'watch'
  ]);
};
