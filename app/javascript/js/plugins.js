//require("bootstrap-sass/assets/javascripts/bootstrap")

require("jquery-address")
require("./vendor/triple.layout")
require("./vendor/smoothscroll")
require("nprogress/nprogress")

var imagesLoaded = require("imagesloaded");
var $ = require("jquery");
imagesLoaded.makeJQueryPlugin( $ );
import Isotope from 'isotope-layout';
import jQueryBridget from 'jquery-bridget';
jQueryBridget( 'isotope', Isotope, $ );

require("flexslider")
require("fitvids")
require("jquery-validation")
require("jquery-uniform/jquery.uniform")
require("./vendor/jquery.fancybox-1.3.4")
require("./vendor/jquery.tooltipster.min")
require("./vendor/prettify")
require("twitter-fetcher")
// mediaelement
require("./vendor/send-mail")


