var webClient = require('slack-terminalize').getWebClient();
var request = require('request');
var config = require ('./bin/config');

config.readConfig();
/**
 * Wrapper function for postMessage from slack-client to handle formatting.
 *
 * @param  { object } slack-client Channel boject
 * @param  { string } message to send to Slack channel
 * @param  { boolean } flag to indicate block formatting
 * @return { none }
 *
 */
var postMessage = function (channel, message, format) {

    format = format || true;
    message = (format && '```' + message + '```') || message;

    // more on this API here: https://api.slack.com/methods/chat.postMessage
    webClient.chat.postMessage(channel, message, {
        as_user: true
    });

};

var getUser = function(userId){
    var url = 'https://slack.com/api/users.info?token=' + config.getSetting('token') + '&user=' + userId;
    request(url, function (err, response, body) {
        if (!err && response.statusCode === 200) {
            var user = JSON.parse(body);
            return user;
        }
    });
}

exports.postMessage = postMessage;
exports.getUser = getUser;