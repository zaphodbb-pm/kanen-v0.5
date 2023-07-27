/**
 * Main entry point for server code
 *
 * @namespace Server
 * @module
 * @memberOf Server:
 * @locus Server
 *
 * @notes
 *  1.  Common routines are imported here
 *
 */


//** main top level modules
import {Meteor} from 'meteor/meteor';
import {Accounts} from 'meteor/accounts-base';
import {DDPRateLimiter} from 'meteor/ddp-rate-limiter';

import '/imports/server/indexCollections';


//** isomorphic routines
//import Version from '/imports/both/version';


//** load method modules
import '/imports/server/Methods/system';
import '/imports/server/Methods/storeDoc';
import '/imports/server/Methods/storeImages';
import '/imports/server/Methods/readDocs';
import '/imports/server/Methods/exportImport';
import '/imports/server/Methods/userMgmt';
import '/imports/server/Methods/recipeBox';


//** control browser security policy
import {BrowserPolicy} from "meteor/browser-policy-common";
BrowserPolicy.content.allowInlineScripts();
BrowserPolicy.content.allowScriptOrigin("https://www.googletagmanager.com");
BrowserPolicy.content.allowImageOrigin("https://www.googletagmanager.com");
BrowserPolicy.content.allowImageOrigin("https://finecookingimages.oss.nodechef.com");
BrowserPolicy.content.allowImageOrigin("https://finecookingthumbnails.oss.nodechef.com");
BrowserPolicy.content.allowOriginForAll('blob:');


//** main configuration set up

//** debug routines
import '/imports/Functions/utilities/showServerConsole';



Meteor.startup(() => {
    console.log("main server starting ...");

    //* check to make sure we can access the system
    //* if no accounts are found, then create a default administrator / administrator account
    initializeAdmin();

    //* use rate limiting for key methods
    const THROTTLE_METHODS = Object.keys(Meteor.server.method_handlers)
        .filter( meth => !(meth.includes("/") || meth.includes("__")));

    DDPRateLimiter.addRule({
        name(name) {
            return THROTTLE_METHODS.includes(name);
        },
        // Rate limit per connection ID
        connectionId() { return true; },
    }, 100, 1000);
});





//** When checking external services for account validation / login,
//** the external services tries to CREATE a new user if no match exists
//** We need to hijack this process and refuse new account creation but
//** allow an existing user to be logged in
//** see https://stackoverflow.com/questions/15592965/how-to-add-external-service-logins-to-an-already-existing-account-in-meteor
//**
if (Meteor.isServer) {
    let orig_updateOrCreateUserFromExternalService = Accounts.updateOrCreateUserFromExternalService;
    Accounts.updateOrCreateUserFromExternalService = function(serviceName, serviceData, options) {
        if(serviceData && serviceData.email){
            let test = Meteor.users.findOne({"emails.address": serviceData.email});
            //console.log("externalService", serviceName, serviceData, options, test);

            if(test){
                let setAttr = {};
                setAttr["services." + serviceName] = serviceData;
                Meteor.users.update(test._id, {$set: setAttr});
            }else{
                return {
                    type: "oauth",
                    error: new Meteor.Error(Accounts.LoginCancelledError.numericError, "No registered account for " + serviceData.email)
                };
            }
            return orig_updateOrCreateUserFromExternalService.apply(this, arguments);
        }else{
            return {
                type: "oauth",
                error: new Meteor.Error(Accounts.LoginCancelledError.numericError, "Invalid email " + serviceData.email)
            };
        }
    }
}


//** email sending setup
process.env.MAIL_URL = Meteor.settings.MAIL_URL;

console.log("MAIL_URL", process.env.MAIL_URL);

//** set up user accounts and login capability
configAccountsPackage();
registerExternalLogin();


//** configure Accounts package and email templates
function configAccountsPackage(){
    //*** remove ability for user to create new accounts
    Accounts.config({forbidClientAccountCreation: true});

    //*** configure const text strings

    const styles = `
    <style>
            .main-text {
                width: 400px; 
                font-size: 15px; 
                line-height: 1.5;
            }
        
            .button {
                display: block;
                box-shadow: none;
                border-radius: 6px;
                margin-left: auto;
                margin-right: auto;
                
                padding: 10px 30px;
                cursor: pointer;
                
                background-color: #18863D;
                border-color: transparent;
                color: #fff;
                vertical-align: center;
            }
            
            .button a {
                display:inline-block;
                text-align: center;                
                text-decoration: none;
                white-space: nowrap;
                
                font-size: 18px;
                color: #fff;
                font-weight: 600;
            }
        </style>
    `;

    //*** general site configuration
    Accounts.emailTemplates.siteName = 'Fine_Cooking';
    Accounts.emailTemplates.from = "requiem.finecooking@gmail.com";

    //*** customize email templates
    Accounts.emailTemplates.resetPassword = {
        subject() {
            return 'Reset your Fine Cooking password.';
        },
        text(user, url) {
            const parseUrl = url.split("#/reset-password/");
            const adjUrl = `${parseUrl[0]}changePassword?type=reset&token=${parseUrl[1]}`;

            return `
        Hello ${user.username}\n\n,
        
        To reset your password on the Fine Cooking site, simply click the link below:\n
        
        ${adjUrl}\n
        
        From Requiem FC Support.
        `
        },

        html(user, url){
            const parseUrl = url.split("#/reset-password/");
            const adjUrl = `${parseUrl[0]}changePassword?type=reset&token=${parseUrl[1]}`;

            let name = user?.username ?? "subscriber";


            return `
                <div class="main-text">
                    <p>Hello ${name},</p>
                  
                    <p>To reset your password on the Fine Cooking site, simply click the link below 
                    and enter your new password in the form panel.</p>                       
                    
                    <p style="width: 100%; margin: 32px 0;">
                        <button type="button" class="button">
                            <a href="${adjUrl}">Reset Password</a>
                        </button>
                    </p>
                </div>
                
                ${styles}
            `
        }
    };


    Accounts.emailTemplates.enrollAccount.text = (user, url) => {
        const parseUrl = url.split("#/enroll-account/");
        const adjUrl = `${parseUrl[0]}changePassword?type=reset&token=${parseUrl[1]}`;

        return  "Hello, " +  user.username + "\n\n" +
            "To start using the Fine Cooking service, simply click the link below. \n"  +
            adjUrl + "\n\n" +
            "Thank you for joining this archive site."
    };

    Accounts.emailTemplates.enrollAccount.html = (user, url) => {
        const parseUrl = url.split("#/enroll-account/");
        const adjUrl = `${parseUrl[0]}changePassword?type=reset&token=${parseUrl[1]}`;

        let name = user?.username ?? "subscriber";


        return `
            <div class="main-text">
                <p>Hello ${name},</p>
              
                <p>Thank you for joining this <b>Requiem for Fine Cooking</b> archive site.  
                Before you can enjoy the benefits of using the Recipe Box, 
                you will need to complete the enrollment process to this service.</p>
                           
                
                <p style="width: 100%; margin: 32px 0;">
                    <button type="button" class="button">
                        <a href="${adjUrl}">Enroll Now</a>
                    </button>
                </p>
            </div>
            
            ${styles}
        `
    };

}



//** register service configurations for external login capability
function registerExternalLogin(){

    ServiceConfiguration.configurations.upsert(
        { service: "google" },
        { $set: {
                clientId: Meteor.settings.service_google_clientId,
                secret: Meteor.settings.service_google_secret,
            }
        }
    );
}





//** for initial system startup only;
//** if no "administrator" exists, then creat one
function initializeAdmin(){
    if( Meteor.users.find().count() === 0){
        let item = {
            username: "administrator",
            email: "superadmin@example.com",
            password: "administrator",
        };

        let test = Accounts.createUser(item);

        let addins = {
            emailMain: "superadmin@example.com",
            pwdMain: "",
            admin: true,
            active: true,
            apiKey: "",
            role: "administrator",
            tenantId: "general",
            sortName: "administrator",
            groups: "administrator",
            groupMaster: false,
            credits: 0,
        };

        Meteor.users.update(test, {$set: addins});
    }
}
