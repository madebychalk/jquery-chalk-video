(function(factory) {
  if(typeof define === 'function' && define.amd) {
    define(['jquery'], factory);
  } else {
    factory(jQuery);
  }
})(function($, global, undefined){
  'use strict';

  var BackgroundVideo = function(jqo, options) {
    if( !options.playlist.length ) throw "You must define a playlist!"
    
    this.$el = jqo;
    this.options = options;
    this.videos = $();
    this.playlist_total = this.options.playlist.length;
    this.current_video = -1;

    this.container = $('<div></div>')
                        .addClass(options.container_class)
                        .prependTo(this.$el); 

    for(var i = 0; i < this.playlist_total; i++) {
      this.videos = this.videos.add(
        $('<video></video>')
          .attr('autoplay', false)
          .attr('preload', 'auto')
          .data('loaded', false)
          .hide()
      );
    }

    this.videos.on('ended', $.proxy(function(e) {
      var $next = this.videos.eq( this.next_video() );
      if( $next.data('loaded') )
        this.switch_video();
      else
        this.play_video( $(e.target) ); 
    }, this));

    this.container.append( this.videos );
    this.switch_video();
  };

  BackgroundVideo.prototype = {
    define_single_source: function(video, obj) {
      if( !video.get(0).canPlayType(obj.type) )
        return false;

      video.get(0).src = obj.src;
      return true;
    },

    define_sources: function(video, obj) {
      if( Object.prototype.toString.call(obj) === '[object Array]' ) {
        var me = this;
        $.each(obj, function(){
          return ( !me.define_single_source(video, this) ) ? true : false;
        });
      } else {
        this.define_single_source(video, obj);
      }
    },

    next_video: function() {
      return (this.current_video < this.playlist_total - 1)
        ? this.current_video + 1
        : 0
    },

    load_video: function(video, src, play) {
      var $vid = $(video);
      $vid.on('canplay.background_video', $.proxy(function(){
        $vid.data('loaded', true);

        if( play )
          this.play_video($vid);

      }, this) );
      
      this.define_sources($vid, src );
    },

    play_video: function(video) {
      var $vid = $(video);
      $vid.show().get(0).play();

      setTimeout(function(){
        $vid.siblings().hide()
      }, 200);
      
      var n_id  = this.next_video();
      var $next = this.videos.eq( n_id );

      if( !$next.attr('src') )
        this.load_video($next, this.options.playlist[n_id]);
    },

    switch_video: function(i) {
      this.current_video = (i) ? i : this.next_video();

      var $vid = this.videos.eq( this.current_video );

      if( $vid.data('loaded') ) {
        this.play_video($vid);
      } else {
        this.load_video($vid, this.options.playlist[ this.current_video ], true);
      }
    }
  }

  $.fn.background_video = function(options) {
    var args  = $.makeArray(arguments),
        after = args.slice(1);

    return this.each(function() {
      var instance,
          $el = $(this);

      instance = $el.data('background_video');

      if(instance) {
        instance[args[0]].apply(instance, after);
      } else {
        options = $.extend({
          playlist: [],
          container_class: 'background_video'  
        }, options);

        $el.data( 'background_video', new BackgroundVideo($el, options) );
      }
      


    });
  };
});
