# ddUpload
A fancy HTML5 file upload widget to upload and live preview multiple files

## Table of Contents
 - [Setup](#setup)
 - [Upload](#upload)
 - [Usage](#usage)

## Setup

ddUpload needs `font-awesome` and `JQuery` to work. In this example we include font-awesome from the bootstrap CDN and JQuery from their own CDN. You can also download the code or use other CDNs.

The HTML between **BEGIN WIDGET** and **END WIDGET** is the minimum needed to get ddUpload to work. This won't upload any file yet.

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">

        <!-- include Font-Awesome 4 -->
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">

        <!-- include jquery 3 -->
        <script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>

        <!-- include ddUpload -->
        <link rel="stylesheet" type="text/css" href="css/ddupload.css">
        <script src="js/ddupload.js"></script>


        <title>ddUpload</title>
    </head>

    <body>
        <!-- BEGIN WIDGET -->
        <div class="dropzone">
            <span>
                <i class="fa" aria-hidden="true"></i>
                <p>Drop file here or <a href="">click</a> to upload</p>
            </span>
            <input type="file" name="mediafile" multiple />
        </div>
        <!-- END WIDGET -->
    </body>
</html>
```

## Upload

### via HTML

the dropzone contains a normal input of the type file. You can simply put the dropzone into a form and send the data just like with a normal form.

### via AJAX

Alternatively you can, of course, use ajax and read the data out of the input.

You can access the object via the DOM selector to the `dropzone` element. Assuming your dropzone has the id of `dropzone`, the code would look like this.
```javascript
let dropzone = document.getElementById("dropzone");
```
You might want to disable the dropzone while uploading via ajax. you can do this using inbuilt functions.
```javascript

// disable dropzone
dropzone.disable();
```
Finally you can access the files.
```javascript
files = dropzone.getFiles();
```
After the files are uploaded, don't forget to enable the form again unless you want to redirect the user.
```javascript
// enable dropzone
dropzone.enable();
```

### via [uploadDZ](https://gist.github.com/thebenius/02838c5d49b3e0be451c67cb1f1a24ec)
[uploadDU](https://gist.github.com/thebenius/02838c5d49b3e0be451c67cb1f1a24ec) is a javascript that takes care of the upload to the server. All you need is a backend that handles the upload.

 > :warning: **IMPORTANT** Use the provided git link to include uploadDZ into your script. This is important because of copyright law!

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">

        <!-- include Font-Awesome 4 -->
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">

        <!-- include jquery 3 -->
        <script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>

        <!-- include ddUpload -->
        <link rel="stylesheet" type="text/css" href="css/ddupload.css">
        <script src="js/ddupload.js"></script>
     
        <!-- ---- IMPORTANT: Import uploadDZ.js  -->
        <script src="https://gist.github.com/thebenius/02838c5d49b3e0be451c67cb1f1a24ec.js"></script> 
        <title>ddUpload</title>
    </head>

    <body>
        <!-- IMPORTANT: uploadDZ looks for a form to get information like the destination and form data. -->
        <form action="/upload" method="POST"> 
            <!-- BEGIN WIDGET -->
            <div class="dropzone">
                <span>
                    <i class="fa" aria-hidden="true"></i>
                    <p>Drop file here or <a href="">click</a> to upload</p>
                </span>
                <input type="file" name="mediafile" multiple />
            </div>
            <!-- END WIDGET -->
            <!-- IMPORTANT: call uploadDZ here. optionally you can provide the functions onSuccess, onError, onProgress -->
            <input type="submit" value="Upload" onclick="uploadDZ(this)" /> 
        </form>
    </body>
</html>
```


## Usage

Once ddUpload is integrated it is simple to use and very intuitive.

To select Files, you can simply drop them into the droparea.

![Drop Files](https://github.com/thebenius/ddUpload/blob/master/screenshots/drop.png)

Alternatively you can click the add-widget to open a dialog and select one or multiple files there. The dialog and it's usage depends on your operating system and browser.

![Click To Add](https://github.com/thebenius/ddUpload/blob/master/screenshots/add.png)

![File Dialog](https://github.com/thebenius/ddUpload/blob/master/screenshots/dialog.png)

Once you selected the files, they show up in a grid. Images will be displayed immediately.

![Selected Files](https://github.com/thebenius/ddUpload/blob/master/screenshots/uploaded.png)

To delete a file, hover over it and click the trash.

![Delete Files](https://github.com/thebenius/ddUpload/blob/master/screenshots/delete.png)
