# remember-user-and-auto-domain

More details: https://patrik.kernstock.net/2021/06/adfs-2019-allow-logon-with-samaccountname/

Tested with ADFS 2019. Should work with 2022 as well.

## Changelog

### **2022-07-24**

- Feature: Support 'Update Password' page of ADFS
  - Username will be remembered once form is filled out and submitted once
  - OldPassword will be focused automatically once username is remembered
- Feature: Put default domain and cookie lifetime into own variables for easier configuration
- Fix: Properly check if `DOMAIN\user` notation is used.
- Change: Reworked entire code

### **2021-06-09**

- First version.
- Supported paginated login form.
