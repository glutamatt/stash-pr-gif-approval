(function(){

var parse = (new String(document.location.href)).split('/');

if(parse[0] == 'https:' && !parse[1] && parse[3] == 'projects' && parse[5] == 'repos' && parse[7] == 'pull-requests') {

	var params = {project:parse[4], repos:parse[6], prid:parse[8]};

	if(typeof params.prid == 'undefined') return ; 

	(function($, stashparams){

		if (!$) return ;

		$(function(){

			var stashPost = function(endPath, dataPost, onSuccess, onError) {

				$.ajax({
			  			url:'/rest/api/1.0/projects/'+stashparams.project
			  				+'/repos/'+stashparams.repos
			  				+'/pull-requests/' 
			  				+ stashparams.prid + '/' + endPath,
			  			type:'POST', 
			  			data: dataPost,
			  			contentType:'application/json; charset=utf-8',
			  			dataType:'json',
			  			success: onSuccess,
			  			error:onError
			  		});

			} ;

			var intRand = function(maxx){
				return Math.floor(Math.random()*(maxx+1));
			};

			var words = ['approved', 'approval', 'applause', 'thumbs-up', 'awesome', 'agree'];

			$.getJSON( 'http://api.giphy.com/v1/gifs/search?q='
				+ words[intRand(words.length-1)] +
				'&api_key=dc6zaTOxFJmzC&limit=50', function(d) {

			  if(d.hasOwnProperty('data') && d.data instanceof Array) {
			  	try {
			  		var imgUrl = d.data[intRand(d.data.length-1)].images.original.url;
			  		stashPost('comments', JSON.stringify({text: '![Alt text]('+imgUrl+')'}), function(){
			  			var onapproved = function(){window.location.reload(false);};
			  			stashPost('approve', '', onapproved, onapproved);
			  		}, function(){});
			  	} catch (e) {} 
			  }
			});
		})
		;

	})('jQuery' in window ? jQuery : false , params );
};})();