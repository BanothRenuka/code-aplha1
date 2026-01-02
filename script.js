// script.js - Error Handling and Debugging Script

// 1. Syntax Error Handler
function checkSyntax(code) {
    try {
        eval(code);
        return "No syntax errors found.";
    } catch (error) {
        if (error instanceof SyntaxError) {
            return `Syntax Error: ${error.message}`;
        }
        return `Other error: ${error.message}`;
    }
}

// 2. Type Error Handler
function handleTypeError(fn, ...args) {
    try {
        return fn(...args);
    } catch (error) {
        if (error instanceof TypeError) {
            console.error(`Type Error: ${error.message}`);
            return null;
        }
        throw error;
    }
}

// 3. Reference Error Handler
function safeAccess(obj, path, defaultValue = null) {
    try {
        const keys = path.split('.');
        let result = obj;
        
        for (const key of keys) {
            if (result === null || result === undefined) {
                return defaultValue;
            }
            result = result[key];
        }
        
        return result === undefined ? defaultValue : result;
    } catch (error) {
        if (error instanceof ReferenceError) {
            console.error(`Reference Error: ${error.message}`);
            return defaultValue;
        }
        throw error;
    }
}

// 4. Range Error Handler
function handleRangeError(fn, ...args) {
    try {
        return fn(...args);
    } catch (error) {
        if (error instanceof RangeError) {
            console.error(`Range Error: ${error.message}`);
            return null;
        }
        throw error;
    }
}

// 5. URI Error Handler
function safeDecodeURI(uri) {
    try {
        return decodeURI(uri);
    } catch (error) {
        if (error instanceof URIError) {
            console.error(`URI Error: ${error.message}`);
            return uri; // Return original URI on error
        }
        throw error;
    }
}

// 6. Eval Error Handler (deprecated but included for completeness)
function safeEval(code) {
    try {
        return eval(code);
    } catch (error) {
        console.error(`Eval Error: ${error.message}`);
        return null;
    }
}

// 7. DOM/Element Not Found Handler
function safeQuerySelector(selector, parent = document) {
    try {
        const element = parent.querySelector(selector);
        if (!element) {
            throw new Error(`Element with selector "${selector}" not found`);
        }
        return element;
    } catch (error) {
        console.error(`DOM Error: ${error.message}`);
        return null;
    }
}

// 8. Network/AJAX Error Handler
async function safeFetch(url, options = {}) {
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Network Error: ${error.message}`);
        return null;
    }
}

// 9. JSON Parse Error Handler
function safeJSONParse(jsonString, defaultValue = {}) {
    try {
        return JSON.parse(jsonString);
    } catch (error) {
        if (error instanceof SyntaxError) {
            console.error(`JSON Parse Error: ${error.message}`);
            return defaultValue;
        }
        throw error;
    }
}

// Global Error Handler for Uncaught Errors
window.addEventListener('error', function(event) {
    console.error('Global Error Caught:', {
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        error: event.error
    });
    
    // Prevent default browser error handling
    event.preventDefault();
    
    return false;
});

// Promise Rejection Handler
window.addEventListener('unhandledrejection', function(event) {
    console.error('Unhandled Promise Rejection:', event.reason);
    event.preventDefault();
});

// Utility function to test your code with error handling
function debugCode(codeBlock) {
    console.group('Debugging Code Block');
    try {
        const result = eval(codeBlock);
        console.log('Success:', result);
        return result;
    } catch (error) {
        console.error('Error Type:', error.constructor.name);
        console.error('Error Message:', error.message);
        console.error('Stack Trace:', error.stack);
        console.error('Code that caused error:', codeBlock);
        return null;
    } finally {
        console.groupEnd();
    }
}

// Example usage:
// 1. Check for syntax errors in your code
const yourCode = `function test() { console.log('Hello'); }`;
console.log(checkSyntax(yourCode));

// 2. Safely access nested properties
const obj = { user: { name: 'John' } };
console.log(safeAccess(obj, 'user.name')); // 'John'
console.log(safeAccess(obj, 'user.age')); // null

// 3. Safe DOM query
const element = safeQuerySelector('#myElement');
if (element) {
    // Safe to use element
}

// 4. Safe JSON parsing
const jsonString = '{"name": "John"}';
const data = safeJSONParse(jsonString);

// Export functions if using modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        checkSyntax,
        handleTypeError,
        safeAccess,
        handleRangeError,
        safeDecodeURI,
        safeEval,
        safeQuerySelector,
        safeFetch,
        safeJSONParse,
        debugCode
    };
}