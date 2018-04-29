/* feedreader.js */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is the test for check that allFeeds variable has been
         * defined and that it is not empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* This is the test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('have not empty urls', function () {
            allFeeds.forEach((feed) => {
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBe('');
            });
        });

        /* This is the test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('have not empty names', function () {
            allFeeds.forEach((feed) => {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBe('');
            });
        });
    });

    describe('The menu', function () {
        /* This is the test that ensures the menu element is
        * hidden by default.
        */
        it('is closed by default', function () {
            expect($('body').hasClass('menu-hidden')).toBeTruthy();
        });

        /* This is the test that ensures the menu changes
        * visibility when the menu icon is clicked.
        */
        it('the menu changes visibility when the icon is clicked', function () {
            $('a.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBeFalsy();
            $('a.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBeTruthy();
        });
    });

    describe('Initial Entries', function () {
        /* This is the test that ensures when the loadFeed
        * function is called and completes its work, there is at least
        * a single .entry element within the .feed container.
        */
        beforeEach(function (done) {
            loadFeed(0, function () {
                done();
            });
        });

        it('there is .entry element in .feed container', function () {
            expect($('.feed .entry').length).toBeGreaterThan(0);
        });
    });

    describe('New Feed Selection', function () {
        /* This is the test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
         let title = 'Feeds';
         let articleTitle = '';
         let articleUrl = '';
         allFeeds.forEach(function (feed, ind) {
            describe(`load ${ind + 1} feed`, function () {
                beforeEach(function (done) {
                    try {
                      loadFeed(ind, function () {
                          done();
                      });
                    } catch(e) {
                      done.fail(e)
                    }

                });

                /* This is the test that ensures when a new feed is loaded
                 * by the loadFeed function that the header actually changes.
                 */
                it('new title was loaded', function () {
                    expect($('.header-title').text().trim()).not.toEqual(title);
                    title = $('.header-title').text().trim();
                });

                /* This is the test that ensures when a new feed is loaded
                 * by the loadFeed function that the first article actually changes.
                 */
                it('new article was loaded', function () {
                    expect($('a.entry-link')[0].href).not.toEqual(articleUrl);
                    expect($('a.entry-link')[0].text.trim()).not.toEqual(articleTitle);
                    articleUrl = $('a.entry-link')[0].href;
                    articleTitle = $('a.entry-link')[0].text.trim();
                });
            });
        });
    });
}());
