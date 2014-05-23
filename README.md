Chalk Video
=========

The Chalk Video Jquery Plugin lets you easily create HTML5 playlists of one or video files for your website. 
The plugin will intelligently load each movie as it needs them and crossfade the files seamlessly as the end 
of each video is reached. You can provide multiple formats (webm, ogg, mp4) and the video element will be
properly configured to display the video in all browsers supporting the formats.

Installation
---------

Download or clone this repo. Include the latest jQuery in your document before including the jquery.chalk.video.js 
file. See the example html file.

Usage
---------

Once jQuery and the Chalk Video plugin have been included simply select an element and run the `background_video()`
method providing a options object with a playlist key. The playlist consists of an array of objects specifying 
alternative video formats. Each object within the array requires a `src` and a `type` key to be present. For best 
cross-browser results you should include at least a mp4 and a webm option.

Single Video Example
-----

```
$('#my_example_div').background_video({
  playlist: [
    [{
      src: 'http://example.org/video1.mp4'
      type: 'video/mp4'
    }]
  ]
});
```


Single Video With Multiple Formats Example
-----

```
$('#my_example_div').background_video({
  playlist: [
    [
      {
        src: 'http://example.org/video1.mp4'
        type: 'video/mp4'
      }, {
        src: 'http://example.org/video1.webm'
        type: 'video/webm'
      } 
    ]
  ]
});
```

Multiple Videos With Multiple Formats Example
-----

```
$('#my_example_div').background_video({
  playlist: [
    [
      {
        src: 'http://example.org/video1.mp4'
        type: 'video/mp4'
      }, {
        src: 'http://example.org/video1.webm'
        type: 'video/webm'
      } 
    ], [
      {
        src: 'http://example.org/video2.mp4'
        type: 'video/mp4'
      }, {
        src: 'http://example.org/video2.webm'
        type: 'video/webm'
      } 
    ]
  ]
});
```
