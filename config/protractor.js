exports.config = {

    /*capabilities : {
        //'name': config.sauceTestName,
        'browserName': 'chrome',
        'chromedriver': "~2.24.1"
        //'tunnel-identifier': config.travisJobNumber,
        //'build': config.travisBuild
    },*/

    specs: ["../test/e2e/**/*Spec.js"],
    onPrepare: function() {
        browser.driver.get("http://localhost:3000").then(function() {
            browser.driver.findElement(by.id('entrar')).click();
            browser.driver.findElement(by.id('login_field'))
                          .sendKeys('email-de-teste');
            browser.driver.findElement(by.id('password'))
                          .sendKeys('senha-do-email-de-teste');

            browser.driver.findElement(by.name('commit')).click();
        });
    }
}