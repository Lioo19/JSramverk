"use strict";

const assert = require("assert");
const test = require("selenium-webdriver/testing");
const webdriver = require("selenium-webdriver");
const By = webdriver.By;

let browser;

function goToNavLink(target) {
    browser.findElement(By.linkText(target)).then(function(element) {
        element.click();
    });
}

function matchUrl(target) {
    browser.getCurrentUrl().then(function(url) {
        assert.ok(url.endsWith(target));
    });
}

function assertH2(target) {
    browser.findElement(By.css("h2")).then(function(element) {
        element.getText().then(function(text) {
            assert.equal(text, target);
        });
    });
}

// Test suite
test.describe("Testing me-page", function() {
    test.beforeEach(function(done) {
        this.timeout(50000);
        browser = new webdriver.Builder().
            withCapabilities(webdriver.Capabilities.firefox())
            .build();

        browser.get("https://me.linneaolofsson.me/");
        done();
    });

    const baseURL = "https://me.linneaolofsson.me/";


    test.afterEach(function(done) {
        browser.quit();
        done();
    });

    // Test case for index page, checking title, that the headline exists and that url is correct
    test.it("Test index", function(done) {
        // let promise = browser.getTitle();

        // promise.then(function(title) {
        //     assert.equal(title, "React App");
        // });

        browser.getTitle()
            .then(function(title) {
                assert.equal(title, "React App");
        }).then(function() {
            assertH2("ME-SIDA FÖR JSRAMVERK");
            matchUrl(baseURL);
        }).then(() => done());
    });


//Testing login link and that url is correct. Also checks for a label with text "enter email"
    test.it("Test go to login page", function(done) {
        goToNavLink("Logga in");

        matchUrl(baseURL + "login" );

        browser.findElement(By.css("label")).then(function(element) {
            element.getText().then(function(text) {
                assert.equal(text, "Enter email");
            });
        });

        done();
    });


    test.it("Test go to Rapport week 1", function(done) {
        goToNavLink("Rapporter");
        goToNavLink("Vecka 1");

        //check if url matches
        matchUrl(baseURL + "reports/week/1");

        //check if element h3 is for week 1
        browser.findElement(By.css("h3")).then(function(element) {
            element.getText().then(function(text) {
                assert.equal(text, "Rapport för vecka 1");
            });
        });

        done();
    });
});
