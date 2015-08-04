module.exports = function(grunt){

grunt.initConfig({
	web_server: {
    		options: {
      			cors: true,
      			port: 8080,
		        nevercache: true,
		        logRequests: true
	        },
		server: 'robotSimulator' // For some reason an extra key with a non-object value is necessary 
 	},
});

pkg: grunt.file.readJSON('package.json'),

grunt.loadNpmTasks('grunt-web-server');
//grunt.registerTask('default', ['grunt-web-server']);
}
