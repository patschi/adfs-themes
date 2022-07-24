////////////////////////////////////////////////
// Remember username + auto domain suffix
// Copyright (c) by patrik.kernstock.net @ 2022-07-24 under GNU GPLv3 license. All rights reserved.
// https://patrik.kernstock.net/2021/06/adfs-2019-allow-logon-with-samaccountname/

// CONFIGURATION
// The default domain to add when not specified
var defaultDomain = 'domain.tld'
// Amount of hours the username should be remembered in cookie
var rememberUserCookieLifetime = 24 * 365; // one year
////////////////////////////////////////////////

// Utility functions
function PKUtil() {}
// Remember SSO username in cookie
PKUtil.rememberSsoUsername = function (username) {
    var date = new Date();
    date.setTime(date.getTime() + (rememberUserCookieLifetime * 60 * 60 * 1000));
    document.cookie = 'sso_username=' + encodeURIComponent(username) + '; expires=' + date.toUTCString() + '; path=/; SameSite=Lax';
}
// Get remembered SSO username from cookie as string
PKUtil.getRemberedSsoUsername = function () {
    if (document.cookie) {
        if (document.cookie.indexOf('sso_username') == 0) {
            var cookies = document.cookie.split('=');
            if (cookies[0] == 'sso_username' && cookies[1] != null) {
                return decodeURIComponent(cookies[1]);
            }
        }
    }
    return '';
}
// Format username in UPN (with domain suffix)
PKUtil.formatUPN = function (username) {
    if (username.indexOf('@') == -1 && username.indexOf('\\') == -1) {
        username = username + '@' + defaultDomain
    }
    return username;
}

// Normal login Pagination
if (typeof document.forms['loginFormPaginated'] != 'undefined' && typeof PaginationManager != 'undefined') {
    PaginationManager.validateAndNext = function () {
        var u = new InputUtil();
        var e = new LoginErrors();

        var userName = document.getElementById(Login.userNameInput);

        // If username is set but does not have domain suffix, add it
        if (userName.value) {
            userName.value = PKUtil.formatUPN(userName.value);
        }

        // If username is not set
        if (!userName.value) {
            u.setError(userName, e.userNameFormatError);
            return false;
        }

        _self.updatePagesWithUsername(userName.value);
        u.clearError();

        // remember the username
        PKUtil.rememberSsoUsername(userName.value)

        if (_self.options.currentPageIndex + 1 >= _self.options.pages.length) {
            // POST back to ADFS since there are no more pages to go to 
            document.forms['loginFormPaginated'].submit();
            return true;
        } else {
            _self.displayNextPage();
        }
        
        return true;
    }

    // If cookie is set, set it
    var remUser = PKUtil.getRemberedSsoUsername()
    if (remUser != '') {
        // Fill out username field
        document.getElementById(Login.userNameInput).value = remUser;
        // skip username page
        paginationManager.validateAndNext();
    }
}

// For change password dialog
if (typeof document.forms['updatePasswordForm'] != 'undefined' && typeof PaginationManager == 'undefined') {
    // Fill out username field if we have cookie set
    var remUser = PKUtil.getRemberedSsoUsername()
    if (remUser != '') {
        document.getElementById(UpdatePassword.userNameInput).value = remUser;
        document.getElementById(UpdatePassword.oldPasswordInput).focus();
    }

    // Append domain when form is submitted
    PKUtil.UpdatePasswordCheckSubmitForm = function () {
        // If username is set but does not have domain suffix, add it
        var userName = document.getElementById(UpdatePassword.userNameInput);
        if (userName.value) {
            userName.value = PKUtil.formatUPN(userName.value);
        }

        var ready = UpdatePassword.submitPasswordChange();
        if (ready) {
            // If all all fields are OK, remember the username
            PKUtil.rememberSsoUsername(userName.value)
        }
        return ready;
    }

    // Change submit action to our new function
    submitButton = document.getElementById('submitButton');
    submitButton.setAttribute('onclick', 'return PKUtil.UpdatePasswordCheckSubmitForm();');
}
