<script>


    /**
     * File input component for image files to be stored in an Images Collection.
     *
     * @module fileGridFS
     * @memberOf Components:formBuilder:
     * @locus Client
     *
     * @param {String} error - class to show a field in error
     * @param {String} className
     * @param {Object} field
     * @param {Object} field.params (image) -   { format: "image", type: ["image.*"],
     *                                            croppie: {viewport: {width: 450, height: 150, type: 'square'} }
     *                                          }
     * @param fieldText {Object}
     *
     * @fires on-inputentry
     *
     */
    import {Meteor} from "meteor/meteor";
    import {Images, Thumbnails} from '../../../client/collectionsImagesClient';

    //* common props from parent
    export let field = {};
    export let error = {};
    export let fieldText;

    let className;
    // noinspection ReservedWordAsName
    export { className as class };


    //* language common text and support functions
    import {i18n} from '/imports/Functions/utilities/i18n';
    import {lang} from '/imports/client/systemStores';
    import {documents} from '/imports/both/systemGlobals';
    import Crop_Image from '/imports/Components/widgets/croppie.svelte';
    import {getContext, createEventDispatcher} from 'svelte';

    //* support constants
    const dispatch = createEventDispatcher();
    const label = fieldText?.label ?? "n/a";
    const fileReaderText = i18n( getContext("commonText") ?? field.fileReader ?? {}, "fileReader", $lang);

    const errmsg = {
        file_too_long:   fileReaderText?.file_too_long ? fileReaderText.file_too_long.replace("getImageSize", Math.round( documents.MAX_GRID_FILE / 1024) ) : "n/a",
        file_wrong_type: fileReaderText?.file_wrong_type ? fileReaderText.file_wrong_type : "n/a",
    }


    //* local reactive variable
    let inValue = {};
    let icon_img = "";
    let showCroppie = false;
    let showCropArea = false;
    let messages = "";
    let params = field?.params ?? {};
    let coll = field?.params?.coll;
    let fileId = "";
    let hasCroppie = !!field.params.croppie;
    let showModal = ".hide-modal";


    //* reactive update whenever the "field" prop changes
    $: setValue(field.value);


    //* Functions that mutate local variables
    function setValue(val){
        inValue = val;
        messages = field.value.name;
        icon_img = field.value.src;
    }

    function showFileImage(){
        showModal = "show-modal";
    }

    function hideModal(){
        showModal = "hide-modal";
    }

    function cropImage() {
        showCropArea = !showCropArea;
        showCroppie = !showCroppie;
    }


    //* main file getter, also resizes file and changes to jpeg format
    function setfile(ev) {
        let files = ev.target.files;

        if (files.length > 0) {
            let file = files[0];

            //* basic file checks
            let isMatch = field.params.type.some(function (rx) {
                let type = RegExp(rx);
                return type.test(file.type);
            });

            if (!isMatch) {
                messages = errmsg.file_wrong_type + file.type;
                return;
            }

            if (file.size > documents.MAX_GRID_FILE) {
                messages = errmsg.file_too_long + Math.round(file.size / 1024) + "KB";
                return;
            }


            //* get file data and maintain parent context
            let reader = new FileReader();

            reader.onload = () => {
                //**** for large files, resize to default max-width or settings from params
                let image = new Image();

                image.onload = async () => {
                    //** rebuild name to clean up spaces and replace extension to 'jpg'
                    let fileIdParts = file.name.replace(/ /g, '').split(".");
                    fileIdParts.pop();
                    fileIdParts.push("jpg");
                    fileId = fileIdParts.join(".");

                    const newImage = resizeImage(image, params?.resizeWidth);
                    
                    icon_img = newImage;
                    messages = fileId;

                    const fileLoad = await insertImage(params?.coll, fileId, newImage, params);

                    if(fileLoad?.srcUrl){
                        inValue = {name: fileId, src: fileLoad.srcUrl};

                        /**
                         * @event on-inputentry
                         * @type {object} - {value: keyValue, error: false}
                         */
                        dispatch('on-inputentry', {value: inValue, error: false} );
                    }else{
                        messages = "No file link received."
                    }
                }

                image.src = reader.result;
            };

            reader.readAsDataURL(file);
        }
    }

    //* on click of delete file icon, reset the field data
    function deleteInfo() {
        icon_img = "";
        messages = "";
        inValue = {name: "", src: "", size: 0};

        /**
         * @event on-inputentry
         * @type {object} - {value: keyValue, error: false}
         */
        dispatch('on-inputentry', {value: inValue, error: false} );

        let fileName = fileId ? fileId : field.fieldValue.name;

        //** remove images from gridFS if deleting in the component
        switch(coll){
            case "images":
                Images.remove({name: fileName}, function(err, res){
                    if(err){console.log("Images.remove err", err);}
                });

                break;

            case "thumbnails":
                Thumbnails.remove({name: fileName}, function(err, res){
                    if(err){console.log("Thumbnails.remove err", err);}
                });
        }

        //** clear input value and restore empty initial state
        const input = document.getElementById(className);
        input.value = "";
    }

    function result(output) {
        icon_img = output.detail;
        inValue.src = output.detail;
        showCropArea = false;
        showCroppie = false;

        /**
         * @event on-inputentry
         * @type {object} - {value: keyValue, error: false}
         */

        dispatch('on-inputentry', {value: inValue, error: false} );
    }


    //* insert new image into gridFS collections:
    //* images (main), allImages.files (doc meta info) and allImages.chunks (actual image chunks)
    async function insertImage(coll, fileId, file, params) {
        const me = Meteor.user();

        let fileData;
        let link;

        let config = {
            file: file,
            isBase64: true,
            fileName: fileId,
            fileId: fileId,

            meta: {
                author: me._id,
                uploadedFile: fileId,
                fileId: fileId,
                tenantId: me?.tenantId ?? me?.profile?.tenantId ?? "general",
                location: params.location
            }
        };


        switch(coll){
            case "images":
                fileData = await (new Promise((resolve, reject) => {
                    Images.insert({...config,
                        onUploaded(error, fileRef) {
                            if(error){console.log("onUploaded", error, fileRef);}
                            resolve(fileRef);
                        }
                    });
                }) );

                const imagePath = Meteor.settings.public.imagesRoute;

                if(imagePath){
                    link = `${imagePath}/${fileId}`;
                }else{
                    link = Images.link(fileData);

                    //** remove root url - makes this data transportable between staging and production servers
                    if(link){
                        link = link.split("/cdn");
                        link = `/cdn${link[1]}`;
                    }else{
                        link = "no-link"
                    }
                }
                break;

            case "thumbnails":
                fileData = await (new Promise((resolve, reject) => {
                    Thumbnails.insert({...config,
                        onUploaded(error, fileRef) {
                            if(error){console.log("onUploaded", error, fileRef);}
                            resolve(fileRef);
                        }
                    });
                }) );

                const thumbnailPath = Meteor.settings.public.thumbnailsRoute;

                if(thumbnailPath){
                    link = `${thumbnailPath}/${fileId}`;
                }else{
                    link = Thumbnails.link(fileData);

                    //** remove root url - makes this data transportable between staging and production servers
                    if(link){
                        link = link.split("/cdn");
                        link = `/cdn${link[1]}`;
                    }else{
                        link = "no-link"
                    }
                }
                break;
        }

        const setter = {
            link: link,
            "meta.link": link,

            location: params?.location,
            "meta.location": params?.location,
        }

        //** add link info into images or thumbnails document as "link" key
        switch(coll) {
            case "images":
                Meteor.call("updateImage", fileId, setter, function(err, res){
                    if(err){console.log("err", err); }
                })

                break;

            case "thumbnails":
                Meteor.call("updateThumbnail", fileId, setter, function(err, res){
                    if(err){console.log("err", err); }
                })

                break;
        }

        return {status: 200, srcUrl: link};
    }


    function resizeImage(image, resizeWidth) {
        //*** use canvas element to resize the image
        const canvas = document.createElement('canvas');
        const width = image.width;
        const height = image.height;
        const ratio = height / width;
        const max_width = Math.min(width, resizeWidth ?? 400);

        canvas.width = max_width;
        canvas.height = max_width * ratio;

        const ctx = canvas.getContext('2d');
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, max_width, max_width * ratio);
        ctx.drawImage(image, 0, 0, max_width, max_width * ratio);

        let resizedImage = canvas.toDataURL("image/jpeg");

        canvas.remove();

        return resizedImage;
    }

</script>



<div class="field--file-gridfs has-field-addons {className}  {field.css || ''}" id="{field.field}">

    <button type="button"  class="is-primary is-height-browse" title="{field.field}">
        <span class="icon-bg-folder is-medium"></span>

        <input id="{className}" type="file" class="input file-input" on:input="{setfile}" aria-label="load file">
    </button>

    <label class="is-height-browse is-file-name">
        <span>{label}</span>

        <span class="file-area">

            <img class="file-icon-img-src"
                 src="{icon_img}"
                 title="image file"
                 style=""
                 alt=""
                 on:click="{showFileImage}">

            <span class="is-message-area">{@html messages}</span>

            {#if messages}
                <span class="has-text-danger add-cursor" on:click="{deleteInfo}">
                    <span class="icon-bg-trash is-medium"></span>
                </span>
            {/if}
        </span>
    </label>

    {#if hasCroppie}
        <button type="button" class="is-primary is-height-browse" on:click="{cropImage}" title="crop image">
            <span class="icon-bg-crop is-medium"></span>
        </button>
    {/if}
</div>

{#if hasCroppie && showCroppie}
    <Crop_Image
            url="{icon_img}"
            options="{field.params && field.params.croppie ? field.params.croppie : {} }"
            on:croppie-result={result}/>
{/if}





<div id="{'modal_' + field.field}" class="modal-overlay {showModal}">
    <div class="modal">
        <article class="modal-card">
            <header>
                <h2>{messages}</h2>

                <button type="button" class="delete" on:click="{hideModal}"></button>
            </header>

            <div>
                <img class="show-modal-image" src="{icon_img}" title="" alt="inputted image">
            </div>
        </article>
    </div>
</div>





<style>
    
    .is-height-browse {
        height: 6rem;
        padding: 0;
    }

    .file-area {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: nowrap;
        width: 100%;
    }

    .file-input {
        height: 6rem !important;
        width: 3rem;
        position: absolute;
        left: 0;
        top: 0;
        opacity: 0;
        outline: none;
        cursor: pointer;
    }

    .file-icon-img-src {
        width: auto;
        max-height: 4rem;
        cursor: pointer;
        margin-left: 1rem;
    }

    .is-file-name {
        width: 100%;
        cursor: default;
        text-align: left;
    }

    .is-message-area {
        padding-left: 1rem;
        overflow: auto;
        white-space: normal;
        word-break: break-word;
    }

    .show-modal {
        visibility: visible;
        opacity: 1;
        position: fixed;
        z-index: 1000;
        height:auto;
    }

    .hide-modal {
        visibility: hidden;
        opacity: 0;
        position: relative;
        z-index: unset;
        height: 0;
    }

    .show-modal-image {
        width: 100%;
        object-fit: contain;
    }

</style>
