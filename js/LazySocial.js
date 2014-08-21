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
        var Twitter = activeList.find(".LazyTwitter:first");
        var Pintrest = activeList.find(".LazyPintrest:first");
        var LinkedIn = activeList.find(".LazyLinkedIn:first");

        if (Facebook.length) {
            LazyFacebook.CreateButton(Facebook, Url);
        }
        if (Google.length) {
            LazyGoogle.CreateButton(Google, Url);
        }
        if (Twitter.length) {
            LazyTwitter.CreateButton(Twitter, Url);
        }
        if (Pintrest.length) {
            LazyPintrest.CreateButton(Pintrest, Url);
        }
        if (LinkedIn.length) {
            LazyLinkedIn.CreateButton(LinkedIn, Url);
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
            window.jQuery.getScript('//connect.facebook.net/' + LazySocial.LanguageIso.replace("-", "_") + '/all.js')
                .done(function () {
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
            window.jQuery.getScript("//apis.google.com/js/plusone.js")
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
        if (window.twttr) {
            callback();
        } else {
            window.jQuery.getScript("//platform.twitter.com/widgets.js")
                .done(function () {
                    callback();
                });
        }
    },
    CreateButton: function (item, url) {
        LazyTwitter.LoadJs(function () {
            var Id = "Tw_" + LazySocial.GetId();
            var Button = LazyTwitter.GetHtmlButton(item, url);
            item = jQuery(item);

            item.removeClass("LazyTwitter");
            item.html(Button);
            item.attr("id", Id);

            twttr.widgets.load(document.getElementById(Id));
        });
    },
    GetHtmlButton: function (item, url) {
        item = jQuery(item);
        var Via = "";
        var Text = "";
        var Count = "";
        var Lang = "";

        if (item.is("[data-via]")) {
            Via = item.attr("data-via");
        }
        if (item.is("[data-text]")) {
            Text = item.attr("data-text");
        }
        if (item.is("[data-count]")) {
            Count = item.attr("data-count");
        }
        if (item.is("[data-lang]")) {
            Lang = item.attr("data-lang");
        }

        var Btn = "<a href='https://twitter.com/share' class='twitter-share-button'";
        Btn += " data-url='" + url + "'";

        if (Via != "") {
            Btn += " data-via='" + Via + "'";
        }
        if (Text != "") {
            Btn += " data-text='" + Text + "'";
        }
        if (Count != "") {
            Btn += " data-count='" + Count + "'";
        }
        if (Lang != "") {
            Btn += " data-lang='" + Lang + "'";
        }

        Btn += ">Tweet</a>";
        return Btn;
    }
};

var LazyPintrest = {
    LoadJs: function (callback) {
        window.jQuery.getScript("//assets.pinterest.com/js/pinit.js")
            .done(function () {
                callback();
            });
    },
    CreateButton: function (item, url) {
        LazyPintrest.LoadJs(function () {
            var Id = "Pin_" + LazySocial.GetId();
            var Button = LazyPintrest.GetHtmlButton(item, url);
            item = jQuery(item);

            item.removeClass("LazyPintrest");
            item.html(Button);
            item.attr("id", Id);
        });
    },
    GetHtmlButton: function (item, url) {
        var Url = "//www.pinterest.com/pin/create/button/?url=" + encodeURIComponent(url) + "";

        if (item.is("[data-media]")) {
            Url += "&media=" + encodeURIComponent(item.attr("data-media"));
        }
        if (item.is("[data-description]")) {
            Url += "&description=" + encodeURIComponent(item.attr("data-description"));
        }

        var Html = "<a href='" + Url + "' data-pin-do='buttonBookmark'><img src='//assets.pinterest.com/images/pidgets/pinit_fg_en_rect_gray_20.png' /></a>";

        return Html;
    }
};

var LazyLinkedIn = {
    LoadJs: function (callback) {
        if (window.IN) {
            callback();
        } else {
            window.jQuery.getScript("//platform.linkedin.com/in.js")
                .done(function () {
                    callback();
                });
        }
    },
    CreateButton: function (item, url) {
        LazyLinkedIn.LoadJs(function () {
            var Id = "Lin_" + LazySocial.GetId();
            var Button = LazyLinkedIn.GetHtmlButton(item, url);
            item = jQuery(item);

            item.removeClass("LazyLinkedIn");
            item.html(Button);
            item.attr("id", Id);
            
            if (IN.parse) {
                window.IN.parse(document.getElementById(Id));
            }
        });
    },
    GetHtmlButton: function (item, url) {
        return "<script type='IN/Share' data-url='" + url + "' data-counter='right'></script>";
    }
};

jQuery().ready(LazySocial.Start);