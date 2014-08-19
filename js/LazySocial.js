var LazySocial = {
    LanguageIso: "en_GB",

    Start: function () {
        var Lists = jQuery("ul.LazySocialShare");

        if (Lists.length) {
            Lists.on("mouseover", function () {
                LazySocial.ActivateList(this);
            });

            Lists.on("click", function () {
                LazySocial.ActivateList(this);
            });
        }
    },
    // Activate social buttons if not loaded
    ActivateList: function (activeList) {
        activeList = jQuery(activeList);

        if (activeList.is("[data-lang]") && activeList.attr("data-lang").length == 5) {
            LazySocial.LanguageIso = activeList.is("[data-lang]");
        }

        if (!activeList.hasClass("LazyActive")) {
            activeList.addClass("LazyActive");
            LazySocial.LoadSocialItems(activeList);
        }
    },
    // Randomize a id
    GetId: function () {
        var Text = "";
        var Possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var I = 0; I < 5; I++)
            Text += Possible.charAt(Math.floor(Math.random() * Possible.length));

        return Text;
    },
    // Check which social buttons to load
    LoadSocialItems: function (activeList) {
        activeList = jQuery(activeList);
        var Url = activeList.attr("data-href");
        var Facebook = activeList.find(".LazyFacebook:first");
        var Google = activeList.find(".LazyGoogle:first");

        if (Facebook.length) {
            LazyFacebook.CreateButton(Facebook, Url);
        }
        if (Google.length) {
            LazyGoogle.CreateButton(Google, Url);
        }
    }
};

var LazyFacebook = {
    // Load the facebook javascript if required
    LoadJs: function (callback) {
        if (!jQuery("#fb-root").length) {
            jQuery('body').append('<div id="fb-root"></div>');
        }

        if (window.FB) {
            callback();
        } else {
            JavaScript.Load(document.location.protocol + '//connect.facebook.net/' + LazySocial.LanguageIso.replace("-", "_") + '/all.js', function () {
                callback();
            });
        }
    },
    // Create and load the facebook button
    CreateButton: function (item, url) {
        LazyFacebook.LoadJs(function () {
            var Id = "Fb_" + LazySocial.GetId();
            var Button = LazyFacebook.GetHtmlButton(item, url);
            item = jQuery(item);

            item.removeClass("LazyFacebook");
            item.html(Button);
            item.attr("id", Id);

            window.FB.XFBML.parse(document.getElementById(Id));
        });
    },
    // Create the html for the facebook like button
    GetHtmlButton: function (item, url) {
        item = jQuery(item);
        var Layout = "button_count";
        var Action = "like";
        var Share = "false";
        var Faces = "false";

        if (item.is("[data-layout]")) {
            Layout = item.attr("data-layout");
        }
        if (item.is("[data-action]")) {
            Action = item.attr("data-action");
        }
        if (item.is("[data-share]")) {
            Share = item.attr("data-share");
        }
        if (item.is("[data-show-faces]")) {
            Faces = item.attr("data-show-faces");
        }

        return "<div data-href='" + url + "' class='fb-like' data-layout='" + Layout + "' data-action='" + Action + "' data-show-faces='" + Faces + "' data-share='" + Share + "'></div>";
    }
};

var LazyGoogle = {
    // Load the google+ javascript if required
    LoadJs: function (callback) {
        window.___gcfg = {
            lang: LazySocial.LanguageIso.replace("_", "-"),
            parsetags: 'explicit'
        };

        if (window.gapi && window.gapi.plusone) {
            callback();
        } else {
            window.jQuery.getScript("https://apis.google.com/js/plusone.js")
                .done(function () {
                    callback();
                });
        }
    },
    // Create and load the google+ button
    CreateButton: function (item, url) {
        LazyGoogle.LoadJs(function () {
            var Id = "Go_" + LazySocial.GetId();
            var Button = LazyGoogle.GetHtmlButton(item, url);
            item = jQuery(item);

            item.removeClass("LazyGoogle");
            item.html(Button);
            item.attr("id", Id);

            window.gapi.plusone.render(Id);
        });
    },
    // Create the html for the google+ button
    GetHtmlButton: function (item, url) {
        item = jQuery(item);
        var Size = "medium";

        if (item.is("[data-size]")) {
            Size = item.attr("data-size");
        }

        return "<div data-href='" + url + "' class='g-plusone' data-size='" + Size + "'></div>";
    }
};

var LazyTwitter = {
    LoadJs: function (callback) {
        if (window.gapi && window.gapi.plusone) {
            callback();
        } else {
            window.jQuery.getScript("https://platform.twitter.com/widgets.js")
                .done(function () {
                    callback();
                });
        }
    },
    CreateButton: function (item, url) {
    },
    GetHtmlButton: function (item, url) {
        item = jQuery(item);
        var Via = "";

        if (item.is("[data-via]")) {
            Via = item.attr("data-via");
        }

        var Btn = "<a href='https://twitter.com/share' class='twitter-share-button'";
        Btn += " data-url='" + url + "'";

        if (Via != "") {
            Btn += " data-via='" + Via + "'";
        }

        Btn += ">Tweet</a>";
        return Btn;
    }
};

var LazyPintrest = {
    LoadJs: function (callback) {
    },
    CreateButton: function (item, url) {
    },
    GetHtmlButton: function (item, url) {
    }
};

var LazyLinkedIn = {
    LoadJs: function (callback) {
    },
    CreateButton: function (item, url) {
    },
    GetHtmlButton: function (item, url) {
    }
};

jQuery().ready(LazySocial.Start);