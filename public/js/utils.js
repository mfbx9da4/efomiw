/**
 * Console for mobile
 *
 */
function Log(message) {
    var pre = document.createElement('pre')
    pre.innerText = message;
    document.querySelector('.debug').appendChild(pre)
}
