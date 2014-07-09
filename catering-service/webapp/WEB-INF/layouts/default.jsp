<%--
  Created by IntelliJ IDEA.
  User: hu
  Date: 13-7-19
  Time: 上午9:49
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="sitemesh" uri="http://www.opensymphony.com/sitemesh/decorator" %>
<c:set value="${pageContext.request.contextPath}" var="ctx" />




<!DOCTYPE html>
<!--[if IE 7]>                  <html class="ie7 no-js" lang="en">     <![endif]-->
<!--[if lte IE 8]>              <html class="ie8 no-js" lang="en">     <![endif]-->
<!--[if (gte IE 9)|!(IE)]><!--> <html class="not-ie no-js" lang="en">  <!--<![endif]-->
<head>

    <!-- Basic Page Needs
    ================================================== -->
    <meta charset="utf-8">
    <title>4seasons | Our gallery</title>
    <meta name="description" content="">
    <meta name="author" content="">

    <!-- Mobile Specific Metas
    ================================================== -->
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">


    <!-- CSS
    ================================================== -->
    <!-- Normalize default styles -->
    <link rel="stylesheet" href="${ctx}/static/index/css/normalize.css" media="screen" />
    <!-- Skeleton grid system -->
    <link rel="stylesheet" href="${ctx}/static/index/css/skeleton.css" media="screen" />
    <!-- Base Template Styles-->
    <link rel="stylesheet" href="${ctx}/static/index/css/base.css" media="screen" />
    <!-- Template Styles-->
    <link rel="stylesheet" href="${ctx}/static/index/css/style.css" media="screen" />
    <!-- Superfish -->
    <link rel="stylesheet" href="${ctx}/static/index/css/superfish.css" media="screen" />
    <!-- PrettyPhoto -->
    <link rel="stylesheet" href="${ctx}/static/index/css/prettyPhoto.css" media="screen" />
    <!-- Flexslider -->
    <link rel="stylesheet" href="${ctx}/static/index/css/flexslider.css" media="screen" />
    <!-- Reveal -->
    <link rel="stylesheet" href="${ctx}/static/index/css/reveal.css" media="screen" />
    <!-- Datepicker -->
    <link rel="stylesheet" href="${ctx}/static/index/css/datePicker.css" media="screen" />
    <!-- Responsive Layout -->
    <link rel="stylesheet" href="${ctx}/static/index/css/responsive.css" media="screen" />

    <!--[if lt IE 9]>
    <link rel="stylesheet" href="${ctx}/static/index/css/ie/ie8.css" media="screen" />
    <![endif]-->

    <!--[if lt IE 9]>
    <script src="${ctx}/static/index/js/html5.js"></script>
    <![endif]-->

    <!-- Favicons
    ================================================== -->
    <link rel="shortcut icon" href="${ctx}/static/index/images/favicon.ico">
    <link rel="apple-touch-icon" href="${ctx}/static/index/images/apple-touch-icon.png">
    <link rel="apple-touch-icon" sizes="72x72" href="${ctx}/static/index/images/apple-touch-icon-72x72.png">
    <link rel="apple-touch-icon" sizes="114x114" href="${ctx}/static/index/images/apple-touch-icon-114x114.png">
    <link rel="apple-touch-icon" sizes="144x144" href="${ctx}/static/index/images/apple-touch-icon-144x144.png">
    <sitemesh:head />
</head>

<body>

<!-- Wrapper -->
<div id="wrapper">


<!-- Header
================================================================ -->
<header id="header" class="header">

    <div class="container clearfix">
        <div class="grid_12">

            <!-- Navigation -->
            <a href="#menu" class="menu-link">Navigation</a>
            <nav id="menu" class="primary clearfix" role="navigation">
                <ul class="sf-menu">
                    <li><a href="index.html">Home page</a></li>
                    <li><a href="menu-large.html">Our menu</a>
                        <ul class="left-sub">
                            <li><a href="menu-small.html">Small Thumbs Menu</a></li>
                            <li><a href="menu-large.html">Large Thumbs Menu</a></li>
                            <li><a href="menu-grid.html">Grid Menu</a></li>
                            <li><a href="menu-list.html">List Menu</a></li>
                        </ul>
                    </li>
                    <li class="midsection"><a href="our-story.html">About us</a>
                        <ul class="left-sub">
                            <li><a href="our-story.html">Our story</a></li>
                            <li><a href="our-team.html">Our team</a></li>
                            <li><a href="reviews.html">Reviews</a></li>
                            <li><a href="gift-card.html">Get a gift card</a></li>
                            <li><a href="gift-dinner.html">Gift a dinner</a></li>
                        </ul>
                    </li>
                    <li><a href="latest-events.html">Events</a>
                        <ul>
                            <li><a href="latest-events.html">Latest events</a></li>
                            <li><a href="upcoming-events.html">Upcoming events</a></li>
                            <li><a href="order-catering.html">Catering</a></li>
                            <li><a href="reservation.html">Reservation</a></li>
                            <li><a href="single-event.html">Single event</a></li>
                        </ul>
                    </li>
                    <li class="current-menu-item"><a href="gallery.html">Our gallery</a></li>
                    <li><a href="contacts.html">Contact us</a></li>
                </ul>
            </nav>

            <!-- Navigation / End -->

            <!-- Logo -->
            <div id="logo">
                <!-- Image based Logo -->
                <a href="index.html"><img src="${ctx}/static/index/images/logo.png" width="136" height="140" alt="4seasons" /></a>

                <!-- Text based Logo
                <h1><a href="index.html"><strong>4</strong>seasons</a></h1>
                -->
            </div>
            <!-- Logo / End -->

            <!-- Slogan -->
            <div id="slogan" class="slogan">
                <div class="slogan-inner">home style cooking</div>
            </div>
            <!-- Slogan / End -->

        </div>
    </div>

</header>
<!-- Header / End -->





<!-- Content
================================================================ -->
<sitemesh:body />

<!-- Content / End -->


<!-- Back to Top -->
<div class="back-to-top">
    <div class="container clearfix">
        <div class="grid_12">
            <div class="back-to-top-inner">
                <a href="#" id="to-top"><span class="arrow-up"></span>top</a>
            </div>
        </div>
    </div>
</div>
<!-- Back to Top / End -->


<!-- Footer
================================================================ -->
<footer id="footer" class="footer">

    <!-- Footer Widgets -->
    <div class="footer-widgets">
        <div class="container clearfix">

            <div class="grid_2">
                <!-- Pages Widget -->
                <div class="widget-pages widget widget__footer">
                    <h3 class="widget-title">navigate</h3>
                    <div class="widget-content">
                        <ul>
                            <li><a href="#">Home page</a></li>
                            <li><a href="#">Our menu</a></li>
                            <li><a href="#">About us</a></li>
                            <li><a href="#">Events</a></li>
                            <li><a href="#">Our gallery</a></li>
                            <li><a href="#">Contact us</a></li>
                        </ul>
                    </div>
                </div>
                <!-- Pages Widget / End -->
            </div>
            <div class="grid_2">
                <!-- Social Widget -->
                <div class="widget-social widget widget__footer">
                    <h3 class="widget-title">we're social</h3>
                    <div class="widget-content">
                        <ul class="social-links">
                            <li class="soc-facebook"><a href="#">be a fan</a></li>
                            <li class="soc-twitter"><a href="#">follow us</a></li>
                            <li class="soc-gplus"><a href="#">join us</a></li>
                            <li class="soc-pinterest"><a href="#">our pinboard</a></li>
                            <li class="soc-linkedin"><a href="#">link us</a></li>
                            <li class="soc-rss"><a href="#">RSS feed</a></li>
                        </ul>
                    </div>
                </div>
                <!-- Social Widget / End -->
            </div>
            <div class="grid_3">
                <!-- Contacts Widget -->
                <div class="widget-contacts widget widget__footer">
                    <h3 class="widget-title">be in touch</h3>
                    <div class="widget-content">
                        <ul class="contacts-list">
                            <li class="phone">
                                <span class="name">phone:</span>
                                + 44 1225 324 980
                            </li>
                            <li class="email">
                                <span class="name">e-mail:</span>
                                <a href="mailto:olia@gozha.net">olia@gozha.net</a>
                            </li>
                            <li class="address">
                                19c Charles Street,<br>
                                Bath BA 1 1HX,<br>
                                United Kingdom
                            </li>
                        </ul>
                    </div>
                </div>
                <!-- Contacts Widget / End -->
            </div>
            <div class="grid_5 colborder">
                <div class="prefix_1">
                    <!-- Order Widget -->
                    <div class="widget-order widget widget__footer">
                        <h3 class="widget-title">Need catering?.. <span class="adv-title">we can help!</span></h3>
                        <div class="widget-content">
                            <!-- Action Button -->
                            <div class="action-btn-holder">
                                <a href="#" class="action-btn block" id="order-catering-trigger">
                                    order catering <i class="ico ico-catering"></i>
                                </a>
                                <span class="action-btn-back"></span>
                            </div>
                            <!-- Action Button / End -->
                        </div>
                    </div>
                    <!-- Order Widget / End -->

                    <!-- Copyright -->
                    <div class="copyright">
                        Copyright &copy; 2013, 4seasons. All rights reserved.
                        <div class="clearfix">
                            <div class="fleft"><a href="#">Privacy Policy</a> | <a href="#">Terms of Use.</a></div>
                            <div class="fright">Done by <a href="http://themeforest.net/user/olechka">Olia Gozha</a></div>
                        </div>
                    </div>
                    <!-- Copyright / End -->

                </div>
            </div>
        </div>
    </div>
    <!-- Footer Widgets / End -->

</footer>
<!-- Footer / End -->


<!-- Order Catering Modal
================================================================ -->

<div id="order-catering-modal" class="reveal-modal">
    <div class="reveal-modal-inner">
        <h2 class="extra-title center">Order catering</h2>
        <form action="catering.php" id="order-form" class="form form__modal">

            <!-- First Name -->
            <div class="field clearfix">
                <label for="order-name" class="fleft">First Name</label>
                <input type="text" name="order-name" id="order-name" class="fright" placeholder="John">
            </div>
            <!-- First Name / End -->

            <!-- Last Name -->
            <div class="field clearfix">
                <label for="order-l-name" class="fleft">Last Name</label>
                <input type="text" name="order-l-name" id="order-l-name" class="fright" placeholder="Doe">
            </div>
            <!-- Last Name / End -->

            <!-- Event Type -->
            <div class="field clearfix">
                <label for="order-event" class="fleft">Event Type</label>
                <select name="order-event" id="order-event" class="dropkick fright">
                    <option value="birthday">birthday</option>
                    <option value="wedding">wedding</option>
                    <option value="party">party</option>
                    <option value="breakfast">breakfast</option>
                    <option value="lunch">lunch</option>
                    <option value="dinner">dinner</option>
                </select>
            </div>
            <!-- Event Type / End -->


            <!-- Special Date -->
            <div class="field clearfix">
                <label for="order-date" class="fleft">Special date</label>
                <input type="text" name="order-date" id="order-date" class="date-pick fright">
            </div>
            <!-- Special Date / End -->

            <!-- Persons -->
            <div class="field clearfix">
                <label for="order-person" class="fleft">Persons</label>
                <select name="order-person" id="order-person" class="dropkick fright">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4+">4+</option>
                </select>
            </div>
            <!-- Persons / End -->

            <!-- Email -->
            <div class="field clearfix">
                <label for="order-email" class="fleft">Your email</label>
                <input type="email" name="order-email" id="order-email" class="fright" placeholder="olia@gozha.net">
            </div>
            <!-- Email / End -->

            <!-- Phone -->
            <div class="field clearfix">
                <label for="order-tel" class="fleft">Contact phone</label>
                <input type="tel" name="order-tel" id="order-tel" class="fright" placeholder="+1 879 1234 657">
            </div>
            <!-- Phone / End -->

            <div class="form-msg">We contact you in a while...stay tuned!</div>

            <!-- Action Button -->
            <div class="center submit-button-wrap">
                <div class="action-btn-holder action-btn-holder__light">
                    <a href="#" class="action-btn block" id="order-submit">
                        order catering <i class="ico ico-catering"></i>
                    </a>
                    <span class="action-btn-back"></span>
                </div>
            </div>
            <!-- Action Button / End -->

            <div id="order-response"></div>

        </form>
    </div>
    <a class="close-reveal-modal">&#215;</a>
</div>
<!-- Order Catering Modal / End -->

</div>
<!-- Wrapper / End -->


<!-- Javascript Files
================================================== -->

<!-- initialize jQuery Library -->
<script src="${ctx}/static/index/js/jquery-1.9.1.min.js"></script>
<!-- Modernizr -->
<script src="${ctx}/static/index/js/modernizr.custom.js"></script>
<!-- jQuery migrate plugin -->
<script src="${ctx}/static/index/js/jquery-migrate-1.1.1.min.js"></script>
<!-- easing plugin -->
<script src="${ctx}/static/index/js/jquery.easing.min.js"></script>
<!-- Flexslider -->
<script src="${ctx}/static/index/js/jquery.flexslider.js"></script>
<!-- Prettyphoto -->
<script src="${ctx}/static/index/js/jquery.prettyPhoto.js"></script>
<!-- Main Navigation Script (superfish) -->
<script src="${ctx}/static/index/js/jquery.superfish.js"></script>
<!-- Reveal Popup -->
<script src="${ctx}/static/index/js/jquery.reveal.js"></script>
<!-- Datepicker -->
<script src="${ctx}/static/index/js/date.js"></script>
<script src="${ctx}/static/index/js/jquery.datePicker.js"></script>
<!-- Dropkick -->
<script src="${ctx}/static/index/js/jquery.dropkick-1.0.0.js"></script>
<!-- Tipsy -->
<script src="${ctx}/static/index/js/jquery.tipsy.js"></script>
<!-- Carousel -->
<script src="${ctx}/static/index/js/jquery.carouFredSel-6.2.1.js"></script>
<!-- Isotope -->
<script src="${ctx}/static/index/js/jquery.isotope.min.js"></script>
<script src="${ctx}/static/index/js/jquery.imagesloaded.min.js"></script>
<!-- Forms -->
<script src="${ctx}/static/index/js/jquery.form.js"></script>

<!-- Custom -->
<script src="${ctx}/static/index/js/custom.js"></script>

<script type="text/javascript">
    var _gaq = _gaq || [];
    _gaq.push(['_setAccount', 'UA-40793681-1']);
    _gaq.push(['_trackPageview']);

    (function() {
        var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
        ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
    })();





</script>

</body>
</html>