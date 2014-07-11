
(function () {
    
    'use strict';
    
    var nextID = 1;
    
    if (window.Document === undefined) {
        return;
    }
    
    if (Document.prototype.hasOwnProperty('uniqueID')) {
        return;
    }
    
    console.info('"document.uniqueID" not implemented; creating shim');
    
    // define a property on the document that will generate a unique id each time it is called
    Object.defineProperty(Document.prototype, 'uniqueID', {
        get: function () {
            return nextID++;
        },
        enumerable: false,
        configurable: false
    });
    
    // define a property on the element that will return a unique id the first time it is called
    Object.defineProperty(Element.prototype, 'uniqueID', {
        get: function () {
            // redefine the property so that the generator will not be called again
            Object.defineProperty(this, 'uniqueID', {
                value: document.uniqueID,
                writable: false,
                enumerable: false,
                configurable: false
            });
            
            return this.uniqueID;
        },
        enumerable: false,
        configurable: true
    });
    
}());
