jQuery(function($){
	var CSS_OPENED = 'opened';
	var CSS_ACTIVE = 'active';
	var CSS_MENU_ACTIVE = 'mi-active';
	var CSS_MENU_PARENT = 'mi-parent';
	var CSS_MENU_OPENED_CLASS = 'menu-opened';
	var CSS_MENU_ATTACH_CLASS = 'menu-attach';
	var BREAKPOINT_WIDTH_TOUCH = 1024;
	var RESIZE_THROTTLE_TIME = 200;
	var MENU_ITEM_CHANGE_TIME = 50;
	var MENU_RESET_TIME = 300;
	var MENU_ATTACH_PREFIX = 'menu-attach--';

	var EVT_NAMESPACE = 'giv:';
	var EVT_HEADER_NAV_TOGGLE = EVT_NAMESPACE + 'header-nav-toggle';

	var menuItemChangeTimerId;
	var menuResetTimerId;
	var resizeThrottleId;
	var windowWidth = 0;
	var w = window;

	var $header = $('#header-wc-0');
	var $primaryMenu = $header.find('.primary-menu');
	var $html = $('html');
	var $body = $('body');
	var $window = $(window);

	var isTouch = !!(window.Modernizr && window.Modernizr.touch);
	var menuShown = false;

	function initMobileMenu($target) {
		$mobileMenu = $('<div class="mobile-menu"><div class="mobile-menu-content" /></div>').appendTo($body);
		$mobileMenu.find('.mobile-menu-content').append($primaryMenu.children().clone());

		function toggleMenu() {
			menuShown = !menuShown;
			$html.toggleClass(CSS_MENU_OPENED_CLASS);
			$primaryMenu.trigger(EVT_HEADER_NAV_TOGGLE);
		}

		$('<div class="menu-control icon"><span class="menu-control-line" /><span class="menu-control-line" /><span class="menu-control-line" /></div>')
			.appendTo($target)
			.on('click', function(evt) {
				evt.stopPropagation();
				toggleMenu();
			});

		$body.on('click', '.page', function(evt) {
			if (menuShown) {
				toggleMenu();
			}
		});
	}

	initMobileMenu($header);
});