


/**
 * @params {array} files List of file items
 * @return FileList
 */
function FileListItems (files) {
    var b = new ClipboardEvent("").clipboardData || new DataTransfer()
    for (var i = 0, len = files.length; i<len; i++) b.items.add(files[i])
    return b.files
}


function addThumbs(dropzone, files) {

    // make prompt smaller
    if( files.length > 0 ) {
        $($(dropzone).find("span")[0]).addClass("small_prompt");
    }
    

    $.each(files, function(index, file) {

        let thumbnail = $("<div></div>");
        thumbnail.addClass("thumb");
        $(dropzone).append(thumbnail);
        $(thumbnail).get(0).dataset.label = file.name;


        // click on item to delete it
        $(thumbnail).click(function(){
            let index = Array.from($(dropzone).find(".thumb")).indexOf(this);
            delFile(this, index);
        });

        // show thumbnai
        if ( file.type.startsWith("image/") ) {
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function() {
                $(thumbnail).css("background-image", `url('${reader.result}')`);
            };
        }

    });
}


/**
 * Adds fileList to dropzone
 * 
 * @param {HTMLElement} dropzone 
 * @param {FileList} files 
 */
function addFiles(dropzone, files) {

    let input = $(dropzone).find("input")[0];

    let newList = Array.from(files);
    let oldList = Array.from(input.files);
    let list = newList.concat(oldList);
    input.files = new FileListItems(list);

    addThumbs(dropzone, files);
}


/**
 * delete file from dropzone
 * 
 * @param {HTMLElement} dropzone 
 * @param {Int} index 
 */
function delFile(item, index) {

    let dropzone = item.closest(".dropzone");

    let input = $(dropzone).find("input")[0];
    let list = Array.from(input.files);
    
    list.splice(index, 1);

    input.files = new FileListItems(list);

    // reset prompt if list empty
    if (list.length == 0) {
        $($(dropzone).find("span")[0]).removeClass("small_prompt");
    }

    $(item).remove();
}



$(document).ready(function() {
    $(".dropzone").each(function() {



        // store elements
        const dropzone = this;
        const input = $(this).find("input")[0];

        // reload input
        addThumbs(dropzone, input.files);


        $($(this).find("span")[0]).click(function() {
            let dialog = $("<input></input>");
            dialog.attr("type","file");
            dialog.attr("multiple","true");
            dialog.trigger("click");
            dialog.change(function() {
                if (this.files.length > 0) {
                    addFiles(dropzone, this.files);
                }
            });
        });

        // define dragover event
        $(dropzone).on("dragover", function(e) {
            e.preventDefault();
            $(this).addClass("drag-over");
        });

        // define dragleave & dragend event
        $.each(["dragleave", "dragend"], function(index, event) {
            $(dropzone).on(event, function() {
                $(this).removeClass("drag-over");
            });
        });

        // handle file drop
        $(dropzone).on("drop", function(e){
            e.preventDefault();
            if (e.originalEvent.dataTransfer.files.length) {
                addFiles(dropzone,e.originalEvent.dataTransfer.files);
            }
            $(this).removeClass("drag-over");
        });


    });
});
