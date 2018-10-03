![semantify.it](https://semantify.it/images/logo.png)

# Instant Validator


## Adding The Instant-Validator To Your Website


### CSS

When you download the package, just link this css file:

```html
<link rel="stylesheet" href="./css/instantAnnotations.css"/>
```

### Javascript

Also same for javascript:


```html
<script src="./javascript/validator.js"></script>
```


### Javascript Dependencies
This plugin depends on few javascript libraries. 

* [jquery](https://code.jquery.com/) JS
* [snackbarjs](https://cdnjs.com/libraries/snackbarjs) JS + CSS
* [moment.js](https://cdnjs.com/libraries/moment.js/) JS
* [bootstrap](https://www.bootstrapcdn.com/) JS + CSS
* [bootstrap-datetimepicker](https://cdnjs.com/libraries/bootstrap-datetimepicker) JS
* [semantify-api-js](https://github.com/semantifyit/semantify-api-js) JS

The plugin automatically checks if libraries are loaded. If not it will load them, but it takes little bit time. 
If you want load libraries manually, please include this scripts in your code.

```html
/* jQuery */
<script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
/* popper */
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.11.0/umd/popper.min.js"></script>
/* bootstrap */
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
/* arrive */
<script src="https://cdnjs.cloudflare.com/ajax/libs/arrive/2.4.1/arrive.min.js"></script>
/* ripple */
<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-material-design/0.5.9/js/ripples.js"></script>
/* bootstrapMaterialDesign */
<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-material-design/0.5.9/js/material.min.js"></script>
/* snackbar */
<script src="https://cdnjs.cloudflare.com/ajax/libs/snackbarjs/1.1.0/snackbar.min.js"></script>
 /* Clipboard */
<script src="https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/1.7.1/clipboard.min.js"></script>
/* moment */
<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.18.1/moment.min.js"></script>
/* ax5core */
<script src="https://cdn.rawgit.com/ax5ui/ax5core/master/dist/ax5core.min.js"></script>
/* datepicker */
<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datetimepicker/4.17.47/js/bootstrap-datetimepicker.min.js"></script>
/* semantify api js */
<script src="https://cdn.rawgit.com/semantifyit/semantify-api-js/master/semantify.js"></script>
```
## Initializing instant validator

You need to initialize instant annotations with this simple piece of code

```html
<script>
     IV_Init();
</script>
```

If you would like to change some behavior, you can use settings.


```html
<script>
    var settings = {
         wp:false,
         colClass: "col-xs-12",
         wp: false
     };

     IV_Init(settings);
</script>
```


## Adding boxes

It is fairly easy to add boxes to your html
```html
<div class="IV_Box"></div>
```
