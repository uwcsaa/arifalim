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
require("jquery-migrate/dist/jquery-migrate.min")

require("flexslider")
require("fitvids")
require("./vendor/jquery.tooltipster.min")
