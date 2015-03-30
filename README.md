# OSL

To run the exercise, simply download the files, then open the index.html file in a browser.

On a live version, the information would completely change for each room type. I have only changed the heading, icon and friend story for now to help keep the code concise. With the full data, I would probably store this in a json file and then use a function to populate the correct areas of the page.

## SCSS

I used the command line to automatically watch and compile the css needed from the .scss files upon save. I have also split up the css over multiple files to help keep things modular.
I have tried to avoid using floats where possible except where they make sense (for example to enable text-wrapping around an image) so that it is not necessary to clear them using a clearfix hack, involving extra markup.

## Data

As json cannot be loaded from a local file due to the same origin policy without using a workaround, I have included this data at the beginning of my main javascript file.

## Polyfills and shims

I have tried to avoid using polyfills and shims where possible for the following reasons:

1. Reduce the number of HTTP requests for additional resources
2. Avoid loading extra files which may increase load time overall
3. Reduce potential errors caused by conflicting or unfamiliar code

The two polyfills/shims that I have used are:

1. HTML5 shiv to allow IE 6, 7 and 8 to parse new HTML5 elements such as section properly.
2. Respond.js to allow CSS3 Media queries in IE 6-8, needed to help make the page responsive.

## Animation

As I would consider transitions and animations a part of progressive enhancement rather than core functionality, I have used CSS to create these to add greater flexibility without worrying too much about older browsers e.g. IE7.
