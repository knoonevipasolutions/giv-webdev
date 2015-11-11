jQuery(function($) {
	var DEFAULT_SELECT_OPTIONS = {
		theme: 'vipa',
		minimumResultsForSearch: 10
	};

	function PreviewComponent(target, opts) {
		var defaults = {
			messages: {
				unselected: 'Select from the options below',
				loading: 'Loading...'
			},
			select: {
				templateResult: null
			}
		};
		var settings = {};
		var root;
		var $root;
		var $componentHeader;
		var $componentBody;
		var wsComponentUrl;
		var wsComponentKey;
		var wsSearchUrl;
		var searchDataGroups = [];
		var previewId = -1;
		var PREVIEW_SELECTOR = '.component-details';
		var CSS_CLASS_UNSELECTED = 'component-unselected';
		var CSS_CLASS_SELECTED = 'component-selected';
		var CSS_CLASS_LOADING = 'component-loading';

		function loadSearchData() {
			return $.getJSON(wsSearchUrl).then(function(response) {
				searchDataGroups = response.results;
			});
		}

		function renderSearchUi() {
			var $select = $('<select class="component-item-chooser" />');

			$select.css('width', '100%');

			$('<option />').appendTo($select);
			$.each(searchDataGroups, function(idx, group) {
				var $selectOptGroup = $('<optgroup/>').attr('label', group.label);

				$.each(group.data, function(idx, item) {
					$('<option />').text(item.name).attr('value', item.id).data('component', item).appendTo($selectOptGroup);
				});

				if (group.data.length) {
					$selectOptGroup.appendTo($select);
				}
			});

			$select
				.appendTo($componentBody)
				.select2($.extend(true, {}, DEFAULT_SELECT_OPTIONS, {
					templateResult: settings.select.templateResult
				}));
		}

		function setPreviewId(id) {
			previewId = id;

			if (previewId) {
				$root.removeClass(CSS_CLASS_UNSELECTED).addClass(CSS_CLASS_SELECTED);
			} else {
				$root.removeClass(CSS_CLASS_SELECTED).addClass(CSS_CLASS_UNSELECTED);
				clearDetailUi(settings.messages.unselected);
			}

			$root.trigger('pc:item-changed', previewId);
		}

		function getPreviewId() {
			return previewId;
		}

		function loadDetailHtml() {
			var data = {};
			data[wsComponentKey] = getPreviewId();

			return $.get(wsComponentUrl, data);
		}

		function renderDetailUi() {
			$root.addClass(CSS_CLASS_LOADING);
			clearDetailUi(settings.messages.loading);

			$.when(loadDetailHtml()).then(function(response) {
				$root.removeClass(CSS_CLASS_LOADING);
				$componentBody.find(PREVIEW_SELECTOR).remove();
				$($.parseHTML(response)).find(PREVIEW_SELECTOR).prependTo($componentBody);
			});
		}

		function clearDetailUi(content) {
			$root.find(PREVIEW_SELECTOR).empty().append(content);
		}

		function init() {
			root = target;
			$root = $(root);
			$componentHeader = $root.find('.preview-component-header');
			$componentBody = $root.find('.preview-component-body');

			settings = $.extend(true, {}, defaults, opts);

			wsSearchUrl = $root.data('searchUrl');
			wsComponentKey = $root.data('componentKey');
			wsComponentUrl = $root.data('componentUrl');

			var preselectedId = $root.find(PREVIEW_SELECTOR).data('id');
			if (preselectedId) {
				setPreviewId(preselectedId);
			}

			$componentHeader.prepend('<a class="component-change" href="#">Change</a>');

			$.when(loadSearchData()).then(renderSearchUi);

			$root.on('change', 'select', function() {
				setPreviewId($(this).val());
				renderDetailUi();
			});

			$root.on('click', '.component-change', function(evt) {
				evt.preventDefault();

				setPreviewId(null);
			})
		}

		init();
	}

	var $con = $('#body-wc-0');
	var projectId = null;
	var storeId = null;
	var $redirectorCon = $con.find('.shop-affiliate');
	var $redirectorForm = $redirectorCon.find('form');
	var $redirectorBtn = $redirectorForm.find('.redirector');
	var $redirectorProjectInput = $redirectorForm.find('input[name=project]');
	var $redirectorStoreInput = $redirectorForm.find('input[name=store]');
	var canLaunchRedirector = false;
	var CSS_CLASS_AFFILIATE_SELECTED = 'affiliate-selected';
	var CSS_CLASS_BUTTON_DISABLED = 'dbutton';

	function updateLaunchUi() {
		if (projectId && storeId) {
			$redirectorCon.addClass(CSS_CLASS_AFFILIATE_SELECTED);
			$redirectorBtn.removeClass(CSS_CLASS_BUTTON_DISABLED);
			canLaunchRedirector = true;
		} else {
			$redirectorCon.removeClass(CSS_CLASS_AFFILIATE_SELECTED);
			$redirectorBtn.addClass(CSS_CLASS_BUTTON_DISABLED);
			canLaunchRedirector = false;
		}
	}

	$con.find('.shop-affiliate .redirector').on('click', function(evt) {
		if (!canLaunchRedirector) {
			evt.preventDefault();
		}
	});

	$con.on('pc:item-changed', '.store-component', function(evt, id) {
		storeId = id;
		$redirectorStoreInput.val(id);
		updateLaunchUi();
	});

	$con.on('pc:item-changed', '.project-component', function(evt, id) {
		projectId = id;
		$redirectorProjectInput.val(id);
		updateLaunchUi();
	});

	$con.find('.preview-component.store-component').each(function() {
		new PreviewComponent(this, {
			messages: {
				unselected: 'Select a store from the options below'
			},
			select: {
				templateResult: function(result) {
					if (!result.element) {
						return;
					}

					if (result.text == '' || result.element.nodeName != 'OPTION') {
						return result.text;
					}

					var $option = $(result.element);
					var component = $option.data('component');
					var commission = component.commission;
					var name = component.name;

					return $('<span class="store-select"><span class="store-select-commission">' + commission + '</span><span class="store-select-name">' + name + '</span></span>');
				}
			}
		});
	});

	$con.find('.preview-component.project-component').each(function() {
		new PreviewComponent(this, {
			messages: {
				unselected: 'Select a project from the options below'
			},
			select: {
				templateResult: function(result) {
					if (!result.element) {
						return;
					}

					if (result.text == '' || result.element.nodeName != 'OPTION') {
						return result.text;
					}

					var $option = $(result.element);
					var component = $option.data('component');
					var name = component.name;

					return $('<span class="project-select"><span class="project-select-name">' + name + '</span></span>');
				}
			}
		});
	});
});