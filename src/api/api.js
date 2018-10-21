/**
 * This module has the API interface
 */

const defaults = {
    method: "GET",
    // credentials: "include",
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Accept": "application/json"
    }
};

/**
 * Common fetch functionality. If the response has the expected content, resolve the promise passing the JSON,
 * otherwise, reject the promise passing an error message.
 */
function common_fetch (url, opts, validate = () => true) {

    return fetch(url, opts)
        .then((response) => {
            console.log(`common_fetch:then: url=${url} response.ok = ${response.ok}`);
            return new Promise((resolve, reject) => {
                // Use response.text instead of response.json in order to explicitly call JSON.parse and include the
                // response text in case of an error.
                response.text().then((respText) => {
                    let respJson = {};
                    try {
                        respJson = JSON.parse(respText);
                    } catch (error) {
                        // Include respText, not possible if we use response.json()
                        reject(`Error: ${respText}`);
                        return;
                    }
                    // Validate the response to see if it has the expected content
                    if (validate(respJson)) {
                        resolve(respJson);
                    } else {
                        reject(`Error: Unexpected response: ${respText}`);
                    }
                });
            });
        })
        .catch((error) => {
            console.log(`common_fetch:catch: url=${url} error = ${error}`);
            throw error;
        });
}


export const posts = {

    getAll: function (validate) {
        return common_fetch('http://restedblog.herokuapp.com/mjasso/api/', defaults, validate);
    },

    create: function (postData) {
        const opts = Object.assign(defaults, {
            method: "POST",
            body: `title=${postData.title}&text=${postData.text}`
        });

        return common_fetch('http://restedblog.herokuapp.com/mjasso/api/', opts);
    }
};

export default posts;