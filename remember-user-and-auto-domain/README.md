# remember-user-and-auto-domain

More details and instructions on how to set it up:
https://patrik.kernstock.net/2021/06/adfs-2019-allow-logon-with-samaccountname/

## Supportability

- Tested with ADFS 2019. Should work with ADFS 2022 as well.
- Only supported with themes based on the `DefaultAdfs2019` template.

**Support**
This code has been written in my free-time and is mostly used for my homelab. Please don't expect me supporting this for my entire lifetime. I've tried to write it as generic to reduce the change from breaking in further patches.

**Feedback?**
Should you face any issues, have any suggestions or feature requests, or something to contribute, please create an issue and let me know.

## Notes

**Own free non-cloud MFA needed?**
I am aware ADFS does support MFA using Azure and offers free plans. If you're looking for a on-premise, offline solution however, you might want to check out the cool project at [github.com/neos-sdi/adfsmfa](https://github.com/neos-sdi/adfsmfa). I am not affiliated with the project in any way, but I feel like it deserves more attention as it does a great job.

## Changelog

### **2022-07-24**

- Feature: Support 'Update Password' page of ADFS:
  - Domain will be appended once clicking submit button.
  - Username will be saved once form is filled out and submitted once.
  - OldPassword will be focused automatically once remembered username is restored.
- Feature: Put configuration into own variables for easier configuration
  - The default domain can be configured
  - The cookie lifetime of how long username is remembered can be configured (0 will disable it)
- Fix: Properly check if `DOMAIN\user` notation is used.
- Change: Reworked entire code.
- Change: Moved code to GitHub for change tracking.

### **2021-06-09**

- First version.
- Feature: Supported paginated login form.
- Feature: Allow login with sAMAccountName by appending domain name.
- Feature: Remember username in cookie for 365 days.
