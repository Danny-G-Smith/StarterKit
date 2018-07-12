/**
 * UpGulp - Gulp tasks runtime configuration script
 *
 * @package     UpGulp
 * @since       1.0.2
 * @author      hellofromTonya
 * @link        https://KnowTheCode.io
 * @license     GNU-2.0+
 */

module.exports = function( moduleRoot ) {

   /************************************
    * Module Settings
    *
    * ACTION:
    * You need to change these settings
    * to fit your project.
    ***********************************/

   let moduleSettings = {
      package: 'StarterKit',
      domain: 'StarterKit.test',
      // If this is for a theme, set to `true`; else, set to `false`.
      isTheme: false,
      i18n: {
         textdomain: 'campfirepixels',
         languageFilename: 'campfirepixels.pot',
         bugReport: 'http://campfirepixels.com',
         lastTranslator: 'dgs <dgs@campfirepixels.com>',
         team: 'dgs <dgs@campfirepixels.com>'
      }
   };


   /************************************
    * Folder Structure
    ***********************************/

   /**
    * Assets folder - path to the location of all the app,
    * i.e. images, Sass, scripts, styles, etc.
    *
    * @type {String}
    */
   let appDir = moduleRoot + 'app/'; // TLD

   /**
    * gulp folder - path to where the gulp utils and
    * tasks are located.
    *
    * @type {String}
    */
   let gulpDir = appDir + 'gulp/';

   /**
    * Distribution folder - path to where the final build, distribution
    * files will be located.
    *
    * @type {String}
    */
   let distDir = moduleRoot + 'dist/';

   /**
    * Assets folder - path to where the raw files are located.
    *
    * @type {Object}
    */
   let appSubDirs = {
      css: appDir + 'css/',
      fonts: appDir + 'fonts/',
      icons: appDir + 'icons/',
      images: appDir + 'images/',
      sass: appDir + 'sass/',
      scripts: appDir + 'js/'
   };

   /**
    * Paths
    *
    * @type {Object}
    */
   let paths = {
      css: [ './*.css', '!*.min.css' ],
      icons: appSubDirs.images + 'svg-icons/*.svg',
      images: [ appSubDirs.images + '*', '!' + appSubDirs.images + '*.svg' ],
      php: [ moduleRoot + '*.php', moduleRoot + '**/*.php' ],
      sass: appSubDirs.sass + '**/*.scss',
      concatScripts: appSubDirs.scripts + '*.js',
      scripts: [ appSubDirs.scripts + '*.js', '!' + appSubDirs.scripts + '*.min.js' ],
      sprites: appSubDirs.images + 'sprites/*.png'
   };

   let path = {
      css: [ './*.css', '!*.min.css' ],
      icons: appSubDirs.images + 'svg-icons/*.svg',
      images: [ appSubDirs.images + '*', '!' + appSubDirs.images + '*.svg' ],
      php: [ moduleRoot + '*.php', moduleRoot + '**/*.php' ],
      sass: appSubDirs.sass + '**/*.scss',
      concatScripts: appSubDirs.scripts + '*.js',
      scripts: [ appSubDirs.scripts + '*.js', '!' + appSubDirs.scripts + '*.min.js' ],
      sprites: appSubDirs.images + 'sprites/*.png'
   };

   /**
    * Distribution folder - path to where the final build, distribution
    * files will be located.
    *
    * @type {Object}
    */
   let distDirs = {
      root: moduleRoot,
      css: distDir + 'css/',
      finalCSS: moduleSettings.isTheme ? moduleRoot : distDir + 'css/',
      scripts: distDir + 'js/'
   };

   let distFilenames = {
      concatScripts: 'app.js'
   };

   /************************************
    * Theme Settings
    ***********************************/

   let stylesSettings = {
      clean: {
         src: [ distDirs.css + '*.*', moduleRoot + 'style.css', moduleRoot + 'style.min.css' ]
      },
      postcss: {
         src: [ appSubDirs.sass + '*.scss' ],
         dest: distDirs.css,
         autoprefixer: {
            browsers: [
               'last 2 versions',
               'ie 9',
               'ios 6',
               'android 4'
            ]
         }
      },
      cssnano: {
         src: distDirs.css + '*.css',
         dest: distDirs.css,
      },
      cssfinalize: {
         // Fix for Issue #1 - v1.0.3 11.July.2017
         run: moduleSettings.isTheme ? true : false,
         src: [ distDirs.css + 'style.css', distDirs.css + 'style.min.css' ],
         dest: distDirs.finalCSS,
      },
      concatenated: {
         src: moduleRoot + '/**/*.min.css',
         dest: distDirs.css,
         file: 'Styles.min.css'
      },
      sassLint: {
         src: [ distDirs.css + '/**/*.min.css', distDirs.css + '/**/*.css' ],
         dest: distDirs.css
      }
   };

   let scriptsSettings = {
      clean: {
         src: [ distDirs.scripts + '*.*' ]
      },
      concat: {
         src: paths.concatScripts,
         dest: distDirs.scripts,
         concatSrc: distFilenames.concatScripts,
      },
      uglify: {
         src: distDirs.scripts + '**/*.js',
         dest: distDirs.scripts,
      },
      lebab: {
         src: distDirs.scripts + '**/*.js',
         dest: distDirs.scripts
      }
   };

   let i18nSettings = {
      clean: {
         src: [ moduleRoot + 'languages/' + moduleSettings.i18n.languageFilename ]
      },
      pot: {
         src: paths.php,
         wppot: {
            domain: moduleSettings.i18n.textdomain,
            destFile: moduleSettings.i18n.languageFilename,
            package: moduleSettings.package,
            bugReport: moduleSettings.i18n.bugReport,
            lastTranslator: moduleSettings.i18n.lastTranslator,
            team: moduleSettings.i18n.team
         },
         dest: moduleRoot + 'languages/'
      }
   };

   let iconsSettings = {
      clean: {
         src: [ appSubDirs.images + 'svg-icons.svg' ]
      },
      svg: {
         src: paths.icons,
         desc: appSubDirs.images
      }
   };

   let spriteSettings = {
      clean: {
         src: [ appSubDirs.images + 'sprites.png' ]
      },
      spritesmith: {
         src: paths.sprites,
         dest: appSubDirs.images
      }
   };

   let imageminSettings = {
      src: paths.images,
      dest: appSubDirs.images
   };

   let watchSettings = {
      browserSync: {
         open: true,             // Open project in a new tab?
         https: false,
         injectChanges: true,     // Auto inject changes instead of full reload
         proxy: moduleSettings.domain,  // Use http://domainname.tld:3000 to use BrowserSync
         watchOptions: {
            debounceDelay: 1000  // Wait 1 second before injecting
         }
      }
   };


   /************************************
    * Do not touch below this line.
    *
    * The following code assembles up the
    * configuration object that is returned
    * to gulpfile.js.
    ***********************************/

   return {
      moduleRoot: moduleRoot,
      appDir: appDir,
      appSubDirs: appSubDirs,
      dist: distDirs,
      distDir: distDir,
      gulpDir: gulpDir,
      paths: paths,

      i18n: i18nSettings,
      icons: iconsSettings,
      images: imageminSettings,
      scripts: scriptsSettings,
      sprites: spriteSettings,
      styles: stylesSettings,
      watch: watchSettings
   };
};