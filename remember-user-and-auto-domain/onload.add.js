// Copyright (c) by patrik.kernstock.net under GNU GPLv3 license. All rights reserved.
// https://patrik.kernstock.net/2021/06/adfs-2019-allow-logon-with-samaccountname/
if (typeof PaginationManager != 'undefined') {
    PaginationManager.validateAndNext = function () {
        var u = new InputUtil();
        var e = new LoginErrors();

        var userName = document.getElementById(Login.userNameInput);

        if (userName.value && !userName.value.match('[@\\\\]')) {
            userName.value = userName.value + '@example.com'
        }

        if (!userName.value && !userName.value.match('[@\\\\]')) {
            u.setError(userName, e.userNameFormatError);
            return false;
        }

        _self.updatePagesWithUsername(userName.value);
        u.clearError();

        if (_self.options.currentPageIndex + 1 >= _self.options.pages.length) {
            // POST back to ADFS since there are no more pages to go to 
            document.forms['loginFormPaginated'].submit();
            return true;
        } else {
            _self.displayNextPage();
        }

        return true;
    }
}
