# Console Access

A logging utility that pretends to be a part of the Console API

[![npm version](https://badge.fury.io/js/console-access.svg)](https://badge.fury.io/js/console-access) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) 

Console-Access lets you view and manipulate values running through your project in the developer console, as you would with a breakpoint, only without having to stop. 
The module by default does things that some developers may not prefer. Like attaching the `access` function to the native Console API, or temporarily adding the logged values to the `Window` object. The module has been made highly configurable, so `access` can work as a standalone function, and attach the values to any object you like.

# console-access( onConsole = true, label = '_', target = window )

### Description
A configuration module for the access function.


## Arguments
    onConsole ( Boolean ) - A flag indicating if you want access added to the native console object. If false this function will return the access function. If true it adds it to the console and returns true;
    
    label ( String ) - The label that, combined with the item's index, will act as the key to access the item. Defaults to '_'.
    
    target ( Object ) - Object you want to attach accessible objects to. Defaults to window.

## Returns

	( function|boolean ) A function that in addition to logging the parameters also makes the available on the window or given object so that you can access them without using the debugger.

## Example

### Out of the box
    
        import access-config from 'console-access';
            
        access-config();
            
        console.access( 'some value' )
        console.access( { 'creative': 'naming' } )
    
        > _0: "some value"
         
        > _1: Object
    
You can now access the object in your console with the label `_1` 
    
### Customized
    import access-config from 'console-access';
        const target = {}
        const access = access-config( false, 'myLabel', target );
            
        access( 'some value' )
        access( { 'creative': 'naming' } )
        
        > myLabel0: "some value"
         
        > myLabel1: Object
    
The values are still logged so that you can see what has been attached, but they are not on `window` they are on `target`.
