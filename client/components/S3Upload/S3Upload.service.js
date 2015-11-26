  'use strict';

  angular.module('tdpharmaClientApp')
    .service('S3Upload', function ($q, toastr, $filter) {
    	var Upload = {
    		upload: upload
    	}

    	return Upload;

    	/*
    	 * Only perform call on sucess
       */
  	  function upload(config, photo, filename) {		
        var defer = $q.defer();
        // Configure The S3 Object
        AWS.config.update({accessKeyId: config.aws_access_key_id, secretAccessKey: config.aws_secret_access_key});
        AWS.config.region = config.aws_region;
        var bucket = new AWS.S3();

        if (photo) {
          var accepted_types = ['image/jpg', 'image/jpeg', 'image/png'];
          if (_.contains(accepted_types, photo.type)) {
            toastr.info($filter('translate')('UPLOADING_IMAGE'));
            var params = {
              Key: filename,              
              Body: photo,                            
              ContentType: photo.type,
              Bucket: config.bucket_name              
            };            
            bucket.upload(params, function (err, data) {
              if (err) {
                // There Was An Error With Your S3 Config
                toastr.error(err.message);
                defer.reject({error: err.message});                
              } else {
                // Success!
                defer.resolve(data.Location);                                                
              }
            }).on('httpUploadProgress', function (progress) {
              // Log Progress Information
              console.log(Math.round(progress.loaded / progress.total * 100) + '% done');
            });
          } else {
            var accepted_file_types = ['jpg', 'jpeg', 'png'];
            var message = $filter('translate')('SUPPORT_IMAGE_FILE') + accepted_file_types.join(', ') + '.';
            defer.reject({error: message});            
          }
        } else {
          defer.resolve(null);
        } 
        return defer.promise;
      }  	

    });
