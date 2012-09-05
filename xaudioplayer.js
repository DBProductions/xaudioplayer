function XAudioPlayer(path, sounds) {
	this.path = path || '';
    this.channelSrc = sounds || [];
    this.channelSrcLength = this.channelSrc.length;    
    // create audio tag and set attributes
	for (var i = 0; i < this.channelSrcLength; i++) {		
		var audioTag = document.createElement('audio');
		audioTag.setAttribute("id", sounds[i]);
		audioTag.setAttribute("preload", "auto");
		audioTag.setAttribute("autobuffer", "true");
		// depending of browser or check by .canPlayType(), currently write all
		if (!!audioTag.canPlayType && "" != audioTag.canPlayType('audio/ogg; codecs="vorbis"')) {
		    var sourceTagOgg = document.createElement('source');
		    sourceTagOgg.setAttribute("src", this.path + sounds[i] + '.ogg');
		    audioTag.appendChild(sourceTagOgg);
		}		
		if (!!audioTag.canPlayType && "" != audioTag.canPlayType('audio/mpeg')) {		
		    var sourceTagMp3 = document.createElement('source');
		    sourceTagMp3.setAttribute("src", this.path + sounds[i] + '.mp3');
		    audioTag.appendChild(sourceTagMp3);
		}		
		// IE need it like this
		var embedTag = document.createElement('embed');
		embedTag.setAttribute("src", this.path + sounds[i] + '.ogg');
		audioTag.appendChild(embedTag);
		document.body.appendChild(audioTag);						
	}    
    this.audiochannels = [];
    for (var a = 0; a < this.channelSrcLength; a++) {
        this.audiochannels[a] = [];
        // create a new audio object        
        this.audiochannels[a]['channel'] = document.getElementById(this.channelSrc[a]);
		/*this.audiochannels[a]['channel'] = new Audio();
		this.audiochannels[a]['channel'].src = this.channelSrc[a] + '.ogg';*/
        // expected end time for this channel
        this.audiochannels[a]['finished'] = -1;
    }   
}

XAudioPlayer.prototype.playSound = function playSound(soundIndex) {
    for (var a = 0; a < this.channelSrcLength; a++) {    		
        thistime = new Date();
        duration = 1.5;
        if (this.audiochannels[a] != undefined) {         
            if (this.audiochannels[a]['finished'] < thistime.getTime()) {                    
                this.audiochannels[a]['finished'] = thistime.getTime() + duration * 1000;
                this.audiochannels[a]['channel'] = this.audiochannels[soundIndex]['channel'];
                this.audiochannels[a]['channel'].load();
                this.audiochannels[a]['channel'].play();
                break;
            }
        }
    }
}