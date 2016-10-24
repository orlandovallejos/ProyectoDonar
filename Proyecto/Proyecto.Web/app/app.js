/*
*  Altair Admin AngularJS
*/
(function () {
    "use strict";

    var donarApp = angular.module('donarApp', [
        'ui.router',
        'oc.lazyLoad',
        'ngSanitize',
        'ngAnimate',
        'ngRetina',
        'ConsoleLogger'
    ]);

    donarApp.constant('variables', {
        header__main_height: 48,
        easing_swiftOut: [0.4, 0, 0.2, 1],
        bez_easing_swiftOut: $.bez([0.4, 0, 0.2, 1])
    });

    donarApp.config(function ($sceDelegateProvider) {
        $sceDelegateProvider.resourceUrlWhitelist([
            'self',
            'https://www.youtube.com/**',
            'https://w.soundcloud.com/**'
        ]);
    });

    /* Run Block */
    donarApp
        .run([
            '$rootScope',
            '$state',
            '$stateParams',
            '$http',
            '$window',
            '$timeout',
            'preloaders',
            'variables',
            function ($rootScope, $state, $stateParams, $http, $window, $timeout, variables) {

                $rootScope.$state = $state;
                $rootScope.$stateParams = $stateParams;

                $rootScope.$on('$stateChangeSuccess', function () {
                    // scroll view to top
                    $("html, body").animate({
                        scrollTop: 0
                    }, 200);

                    $timeout(function () {
                        $rootScope.pageLoading = false;
                        $($window).resize();
                    }, 300);

                    $timeout(function () {
                        $rootScope.pageLoaded = true;
                        $rootScope.appInitialized = true;
                        // wave effects
                        $window.Waves.attach('.md-btn-wave,.md-fab-wave', ['waves-button']);
                        $window.Waves.attach('.md-btn-wave-light,.md-fab-wave-light', ['waves-button', 'waves-light']);
                    }, 600);

                });

                $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
                    // main search
                    $rootScope.mainSearchActive = false;
                    // single card
                    $rootScope.headerDoubleHeightActive = false;
                    // top bar
                    $rootScope.toBarActive = false;
                    // page heading
                    $rootScope.pageHeadingActive = false;
                    // top menu
                    $rootScope.topMenuActive = false;
                    // full header
                    $rootScope.fullHeaderActive = false;
                    // full height
                    $rootScope.page_full_height = false;
                    // secondary sidebar
                    $rootScope.sidebar_secondary = false;
                    $rootScope.secondarySidebarHiddenLarge = false;

                    if ($($window).width() < 1220) {
                        // hide primary sidebar
                        $rootScope.primarySidebarActive = false;
                        $rootScope.hide_content_sidebar = false;
                    }
                    if (!toParams.hasOwnProperty('hidePreloader')) {
                        $rootScope.pageLoading = true;
                        $rootScope.pageLoaded = false;
                    }

                });

                // fastclick (eliminate the 300ms delay between a physical tap and the firing of a click event on mobile browsers)
                FastClick.attach(document.body);

                // get version from package.json
                $http.get('./package.json').success(function (response) {
                    $rootScope.appVer = response.version;
                });

                // modernizr
                $rootScope.Modernizr = Modernizr;

                // get window width
                var w = angular.element($window);
                $rootScope.largeScreen = w.width() >= 1220;

                w.on('resize', function () {
                    return $rootScope.largeScreen = w.width() >= 1220;
                });

                // show/hide main menu on page load
                $rootScope.primarySidebarOpen = ($rootScope.largeScreen) ? true : false;

                $rootScope.pageLoading = true;

                // wave effects
                $window.Waves.init();

            }
        ])
        .run([
            'PrintToConsole',
            function (PrintToConsole) {
                // app debug
                PrintToConsole.active = false;
            }
        ]);
})();

/*
 *  Altair Admin angularjs
 *  controller
 */
(function(){
    "use strict";

    angular
    .module('donarApp')
    .controller('mainCtrl', [
        '$scope',
        '$rootScope',
        function ($scope, $rootScope) { }
    ])
    .controller('MainHeaderController', MainHeaderController)
    .controller('main_sidebarCtrl', [
        '$timeout',
        '$scope',
        '$rootScope',
        function ($timeout, $scope, $rootScope) {

            $scope.$on('onLastRepeat', function (scope, element, attrs) {
                $timeout(function () {
                    if (!$rootScope.miniSidebarActive) {
                        // activate current section
                        $('#sidebar_main').find('.current_section > a').trigger('click');
                    } else {
                        // add tooltips to mini sidebar
                        var tooltip_elem = $('#sidebar_main').find('.menu_tooltip');
                        tooltip_elem.each(function () {
                            var $this = $(this);

                            $this.attr('title', $this.find('.menu_title').text());
                            UIkit.tooltip($this, {});
                        });
                    }
                })
            });

            // language switcher
            $scope.langSwitcherModel = 'gb';
            var langData = $scope.langSwitcherOptions = [
                { id: 1, title: 'English', value: 'gb' },
                { id: 2, title: 'French', value: 'fr' },
                { id: 3, title: 'Chinese', value: 'cn' },
                { id: 4, title: 'Dutch', value: 'nl' },
                { id: 5, title: 'Italian', value: 'it' },
                { id: 6, title: 'Spanish', value: 'es' },
                { id: 7, title: 'German', value: 'de' },
                { id: 8, title: 'Polish', value: 'pl' }
            ];
            $scope.langSwitcherConfig = {
                maxItems: 1,
                render: {
                    option: function (langData, escape) {
                        return '<div class="option">' +
                            '<i class="item-icon flag-' + escape(langData.value).toUpperCase() + '"></i>' +
                            '<span>' + escape(langData.title) + '</span>' +
                            '</div>';
                    },
                    item: function (langData, escape) {
                        return '<div class="item"><i class="item-icon flag-' + escape(langData.value).toUpperCase() + '"></i></div>';
                    }
                },
                valueField: 'value',
                labelField: 'title',
                searchField: 'title',
                create: false,
                onInitialize: function (selectize) {
                    $('#lang_switcher').next().children('.selectize-input').find('input').attr('readonly', true);
                }
            };

            // menu entries
            $scope.sections = [
                {
                    id: 0,
                    title: 'Dashboard',
                    icon: '&#xE871;',
                    link: 'restricted.dashboard'
                },
                {
                    id: 1,
                    title: 'Mailbox',
                    icon: '&#xE158;',
                    link: 'restricted.pages.mailbox'
                },
                {
                    id: 2,
                    title: 'Invoices',
                    icon: '&#xE53E;',
                    link: 'restricted.pages.invoices.list'
                },
                {
                    id: 3,
                    title: 'Chat',
                    icon: '&#xE0B9;',
                    link: 'restricted.pages.chat'
                },
                {
                    id: 4,
                    title: 'Scrum Board',
                    icon: '&#xE85C;',
                    link: 'restricted.pages.scrum_board'
                },
                {
                    id: 5,
                    title: 'Snippets',
                    icon: '&#xE86F;',
                    link: 'restricted.pages.snippets'
                },
                {
                    id: 6,
                    title: 'User Profile',
                    icon: '&#xE87C;',
                    link: 'restricted.pages.user_profile'
                },
                {
                    id: 7,
                    title: 'Forms',
                    icon: '&#xE8D2;',
                    submenu: [
                        {
                            title: 'Regular Elements',
                            link: 'restricted.forms.regular'
                        },
                        {
                            title: 'Advanced Elements',
                            link: 'restricted.forms.advanced'
                        },
                        {
                            title: 'File Input',
                            link: 'restricted.forms.file_input'
                        },
                        {
                            title: 'File Upload',
                            link: 'restricted.forms.file_upload'
                        },
                        {
                            title: 'Validation',
                            link: 'restricted.forms.validation'
                        },
                        {
                            title: 'Wizard',
                            link: 'restricted.forms.wizard'
                        },
                        {
                            title: 'CKeditor',
                            link: 'restricted.forms.wysiwyg_ckeditor',
                            group: 'WYSIWYG Editors'
                        },
                        {
                            title: 'TinyMCE',
                            link: 'restricted.forms.wysiwyg_tinymce'
                        }
                    ]
                },
                {
                    id: 8,
                    title: 'Layout',
                    icon: '&#xE8F1;',
                    submenu: [
                        {
                            title: 'Top Menu',
                            link: 'restricted.layout.top_menu'
                        },
                        {
                            title: 'Full Header',
                            link: 'restricted.layout.full_header'
                        }
                    ]
                },
                {
                    id: 9,
                    title: 'Kendo UI Widgets',
                    icon: '&#xE1BD;',
                    submenu: [
                        {
                            title: 'Autocomplete',
                            link: 'restricted.kendoui.autocomplete'
                        },
                        {
                            title: 'Calendar',
                            link: 'restricted.kendoui.calendar'
                        },
                        {
                            title: 'ColorPicker',
                            link: 'restricted.kendoui.colorpicker'
                        },
                        {
                            title: 'ComboBox',
                            link: 'restricted.kendoui.combobox'
                        },
                        {
                            title: 'DatePicker',
                            link: 'restricted.kendoui.datepicker'
                        },
                        {
                            title: 'DateTimePicker',
                            link: 'restricted.kendoui.datetimepicker'
                        },
                        {
                            title: 'DropDownList',
                            link: 'restricted.kendoui.dropdown_list'
                        },
                        {
                            title: 'Masked Input',
                            link: 'restricted.kendoui.masked_input'
                        },
                        {
                            title: 'Menu',
                            link: 'restricted.kendoui.menu'
                        },
                        {
                            title: 'MultiSelect',
                            link: 'restricted.kendoui.multiselect'
                        },
                        {
                            title: 'Numeric TextBox',
                            link: 'restricted.kendoui.numeric_textbox'
                        },
                        {
                            title: 'PanelBar',
                            link: 'restricted.kendoui.panelbar'
                        },
                        {
                            title: 'TimePicker',
                            link: 'restricted.kendoui.timepicker'
                        },
                        {
                            title: 'Toolbar',
                            link: 'restricted.kendoui.toolbar'
                        },
                        {
                            title: 'Window',
                            link: 'restricted.kendoui.window'
                        }
                    ]
                },
                {
                    id: 10,
                    title: 'Components',
                    icon: '&#xE87B;',
                    submenu: [
                        {
                            title: 'Accordions',
                            link: 'restricted.components.accordion'
                        },
                        {
                            title: 'Buttons',
                            link: 'restricted.components.buttons'
                        },
                        {
                            title: 'Buttons: FAB',
                            link: 'restricted.components.buttons_fab'
                        },
                        {
                            title: 'Cards',
                            link: 'restricted.components.cards'
                        },
                        {
                            title: 'Colors',
                            link: 'restricted.components.colors'
                        },
                        {
                            title: 'Common',
                            link: 'restricted.components.common'
                        },
                        {
                            title: 'Dropdowns',
                            link: 'restricted.components.dropdowns'
                        },
                        {
                            title: 'Dynamic Grid',
                            link: 'restricted.components.dynamic_grid'
                        },
                        {
                            title: 'Grid',
                            link: 'restricted.components.grid'
                        },
                        {
                            title: 'Icons',
                            link: 'restricted.components.icons'
                        },
                        {
                            title: 'Lightbox/Modal',
                            link: 'restricted.components.modal'
                        },
                        {
                            title: 'Lists',
                            link: 'restricted.components.lists'
                        },
                        {
                            title: 'Nestable',
                            link: 'restricted.components.nestable'
                        },
                        {
                            title: 'Panels',
                            link: 'restricted.components.panels'
                        },
                        {
                            title: 'Notifications',
                            link: 'restricted.components.notifications'
                        },
                        {
                            title: 'Preloaders',
                            link: 'restricted.components.preloaders'
                        },
                        {
                            title: 'Slideshow',
                            link: 'restricted.components.slideshow'
                        },
                        {
                            title: 'Sortable',
                            link: 'restricted.components.sortable'
                        },
                        {
                            title: 'Tables',
                            link: 'restricted.components.tables'
                        },
                        {
                            title: 'Tables Examples',
                            link: 'restricted.components.tables_examples'
                        },
                        {
                            title: 'Tabs',
                            link: 'restricted.components.tabs'
                        },
                        {
                            title: 'Tooltips',
                            link: 'restricted.components.tooltips'
                        },
                        {
                            title: 'Typography',
                            link: 'restricted.components.typography'
                        }
                    ]
                },
                {
                    id: 11,
                    title: 'E-commerce',
                    icon: '&#xE8CB;',
                    submenu: [
                        {
                            title: 'Product Details',
                            link: 'restricted.ecommerce.product_details'
                        },
                        {
                            title: 'Product Edit',
                            link: 'restricted.ecommerce.product_edit'
                        },
                        {
                            title: 'Products Grid',
                            link: 'restricted.ecommerce.products_grid'
                        },
                        {
                            title: 'Products List',
                            link: 'restricted.ecommerce.products_list'
                        }
                    ]
                },
                {
                    id: 12,
                    title: 'Plugins',
                    icon: '&#xE8C0;',
                    submenu: [
                        {
                            title: 'Calendar',
                            link: 'restricted.plugins.calendar'
                        },
                        {
                            title: 'Charts',
                            link: 'restricted.plugins.charts'
                        },
                        {
                            title: 'Code Editor',
                            link: 'restricted.plugins.code_editor'
                        },
                        {
                            title: 'Datatables',
                            link: 'restricted.plugins.datatables'
                        },
                        {
                            title: 'Diff View',
                            link: 'restricted.plugins.diff_view'
                        },
                        {
                            title: 'Gantt Chart',
                            link: 'restricted.plugins.gantt_chart'
                        },
                        {
                            title: 'Google Maps',
                            link: 'restricted.plugins.google_maps'
                        },
                        {
                            title: 'Tablesorter',
                            link: 'restricted.plugins.tablesorter'
                        },
                        {
                            title: 'Tree',
                            link: 'restricted.plugins.tree'
                        },
                        {
                            title: 'Vector Maps',
                            link: 'restricted.plugins.vector_maps'
                        }
                    ]
                },
                {
                    id: 13,
                    title: 'Pages',
                    icon: '&#xE24D;',
                    submenu: [
                        {
                            title: 'Blank',
                            link: 'restricted.pages.blank'
                        },
                        {
                            title: 'Contact List',
                            link: 'restricted.pages.contact_list'
                        },
                        {
                            title: 'Gallery',
                            link: 'restricted.pages.gallery'
                        },
                        {
                            title: 'Help/Faq',
                            link: 'restricted.pages.help'
                        },
                        {
                            title: 'Login Page',
                            link: 'login'
                        },
                        {
                            title: 'Notes',
                            link: 'restricted.pages.notes'
                        },
                        {
                            title: 'Pricing Tables',
                            link: 'restricted.pages.pricing_tables'
                        },
                        {
                            title: 'Settings',
                            link: 'restricted.pages.settings'
                        },
                        {
                            title: 'Todo',
                            link: 'restricted.pages.todo'
                        },
                        {
                            title: 'User edit',
                            link: 'restricted.pages.user_edit'
                        },
                        {
                            title: 'Issues List',
                            link: 'restricted.pages.issues.list',
                            group: 'Issues'
                        },
                        {
                            title: 'Issue Details',
                            link: 'restricted.pages.issues.details({ issueId: 1 })'
                        },
                        {
                            title: 'Blog List',
                            link: 'restricted.pages.blog.list',
                            group: 'Blog'
                        },
                        {
                            title: 'Blog Article',
                            link: 'restricted.pages.blog.article({ articleId: 1 })'
                        },
                        {
                            title: 'Error 404',
                            link: 'error.404',
                            group: 'Errors'
                        },
                        {
                            title: 'Error 500',
                            link: 'error.500'
                        }
                    ]
                },
                {
                    id: 14,
                    title: 'Multi level',
                    icon: '&#xE241;',
                    submenu: [
                        {
                            title: 'First level',
                            submenu: [
                                {
                                    title: 'Second level',
                                    submenu: [
                                        {
                                            title: 'Third level'
                                        },
                                        {
                                            title: 'Third level'
                                        },
                                        {
                                            title: 'Third level'
                                        }
                                    ]
                                },
                                {
                                    title: 'Long title to test',
                                    submenu: [
                                        {
                                            title: 'Third level'
                                        },
                                        {
                                            title: 'Third level'
                                        },
                                        {
                                            title: 'Third level'
                                        }
                                    ]
                                },
                                {
                                    title: 'Even longer title multi line'
                                }
                            ]
                        }
                    ]
                }
            ]

        }
    ]);

    MainHeaderController.$inject = ['$timeout', '$scope', '$window', 'SessionStorageService'];

    function MainHeaderController($timeout, $scope, $window, SessionStorageService) {
        var vm = this;

        //Variables
        vm.user_data = {
            name: "Lue Feest",
            avatar: "assets/img/avatars/user.png",
            alerts: [
                {
                    "title": "Hic expedita eaque.",
                    "content": "Nemo nemo voluptatem officia voluptatum minus.",
                    "type": "warning"
                },
                {
                    "title": "Voluptatibus sed eveniet.",
                    "content": "Tempora magnam aut ea.",
                    "type": "success"
                },
                {
                    "title": "Perferendis voluptatem explicabo.",
                    "content": "Enim et voluptatem maiores ab fugiat commodi aut repellendus.",
                    "type": "danger"
                },
                {
                    "title": "Quod minima ipsa.",
                    "content": "Vel dignissimos neque enim ad praesentium optio.",
                    "type": "primary"
                }
            ],
            messages: [
                {
                    "title": "Reiciendis aut rerum.",
                    "content": "In adipisci amet nostrum natus recusandae animi fugit consequatur.",
                    "sender": "Korbin Doyle",
                    "color": "cyan"
                },
                {
                    "title": "Tenetur commodi animi.",
                    "content": "Voluptate aut quis rerum laborum expedita qui eaque doloremque a corporis.",
                    "sender": "Alia Walter",
                    "color": "indigo",
                    "avatar": "assets/img/avatars/avatar_07_tn.png"
                },
                {
                    "title": "At quia quis.",
                    "content": "Fugiat rerum aperiam et deleniti fugiat corporis incidunt aut enim et distinctio.",
                    "sender": "William Block",
                    "color": "light-green"
                },
                {
                    "title": "Incidunt sunt.",
                    "content": "Accusamus necessitatibus officia porro nisi consectetur dolorem.",
                    "sender": "Delilah Littel",
                    "color": "blue",
                    "avatar": "assets/img/avatars/avatar_02_tn.png"
                },
                {
                    "title": "Porro ut.",
                    "content": "Est vitae magni eum expedita odit quisquam natus vel maiores.",
                    "sender": "Amira Hagenes",
                    "color": "amber",
                    "avatar": "assets/img/avatars/avatar_09_tn.png"
                }
            ]
        };

        vm.isUserLogged = false;

        vm.alerts_length = vm.user_data.alerts.length;
        vm.messages_length = vm.user_data.messages.length;
        vm.usuario={};

        //Methods
        activate();

        function activate() {
            $('#menu_top').children('[data-uk-dropdown]').on('show.uk.dropdown', function () {
                $timeout(function () {
                    $($window).resize();
                }, 280)
            });

            var usuario = SessionStorageService.get('usuario');

            if (usuario) {
                vm.isUserLogged = true;
                vm.usuario = usuario;
            }
        }
        //Method definitions
        
    }
})();
/*
*  Altair Admin AngularJS
*  directives
*/

(function(){
    'use strict';

    angular
    .module('donarApp')
    // page title
    .directive('pageTitle', [
        '$rootScope',
        '$timeout',
        function ($rootScope, $timeout) {
            return {
                restrict: 'A',
                link: function () {
                    var listener = function (event, toState) {
                        var default_title = 'Altair Admin';
                        $timeout(function () {
                            $rootScope.page_title = (toState.data && toState.data.pageTitle)
                                ? default_title + ' - ' + toState.data.pageTitle : default_title;
                        });
                    };
                    $rootScope.$on('$stateChangeSuccess', listener);
                }
            }
        }
    ])
    // add width/height properities to Image
    .directive('addImageProp', [
        '$timeout',
        'utils',
        function ($timeout, utils) {
            return {
                restrict: 'A',
                link: function (scope, elem, attrs) {
                    elem.on('load', function () {
                        $timeout(function () {
                            var w = !utils.isHighDensity() ? $(elem).width() : $(elem).width() / 2,
                                h = !utils.isHighDensity() ? $(elem).height() : $(elem).height() / 2;
                            $(elem).attr('width', w).attr('height', h);
                        })
                    });
                }
            };
        }
    ])
    // print page
    .directive('printPage', [
        function () {
            return {
                restrict: 'A',
                link: function (scope, elem, attrs) {
                    var message = attrs['printMessage'];
                    $(elem).on('click', function (e) {
                        e.preventDefault();
                        UIkit.modal.confirm(message ? message : 'Do you want to print this page?', function () {
                            // wait for dialog to fully hide
                            setTimeout(function () {
                                window.print();
                            }, 300)
                        }, {
                            labels: {
                                'Ok': 'print'
                            }
                        });
                    });
                }
            };
        }
    ])
    // full screen
    .directive('fullScreenToggle', [
        function () {
            return {
                restrict: 'A',
                link: function (scope, elem, attrs) {
                    $(elem).on('click', function (e) {
                        e.preventDefault();
                        screenfull.toggle();
                    });
                }
            };
        }
    ])
    // single card
    .directive('singleCard', [
        '$window',
        '$timeout',
        function ($window, $timeout) {
            return {
                restrict: 'A',
                link: function (scope, elem, attrs) {

                    var $md_card_single = $(elem),
                        w = angular.element($window);

                    function md_card_content_height() {
                        var content_height = w.height() - ((48 * 2) + 12);
                        $md_card_single.find('.md-card-content').innerHeight(content_height);
                    }

                    $timeout(function () {
                        md_card_content_height();
                    }, 100);

                    w.on('resize', function (e) {
                        // Reset timeout
                        $timeout.cancel(scope.resizingTimer);
                        // Add a timeout to not call the resizing function every pixel
                        scope.resizingTimer = $timeout(function () {
                            md_card_content_height();
                            return scope.$apply();
                        }, 280);
                    });

                }
            }
        }
    ])
    // outside list
    .directive('listOutside', [
        '$window',
        '$timeout',
        function ($window, $timeout) {
            return {
                restrict: 'A',
                link: function (scope, elem, attr) {

                    var $md_list_outside_wrapper = $(elem),
                        w = angular.element($window);

                    function md_list_outside_height() {
                        var content_height = w.height() - ((48 * 2) + 10);
                        $md_list_outside_wrapper.height(content_height);
                    }

                    md_list_outside_height();

                    w.on('resize', function (e) {
                        // Reset timeout
                        $timeout.cancel(scope.resizingTimer);
                        // Add a timeout to not call the resizing function every pixel
                        scope.resizingTimer = $timeout(function () {
                            md_list_outside_height();
                            return scope.$apply();
                        }, 280);
                    });

                }
            }
        }
    ])
    // callback on last element in ng-repeat
    .directive('onLastRepeat', function ($timeout) {
        return function (scope, element, attrs) {
            if (scope.$last) {
                $timeout(function () {
                    scope.$emit('onLastRepeat', element, attrs);
                })
            }
        };
    })
    // content sidebar
    .directive('contentSidebar', [
        '$rootScope',
        '$document',
        function ($rootScope, $document) {
            return {
                restrict: 'A',
                link: function (scope, el, attr) {

                    if (!$rootScope.header_double_height) {
                        $rootScope.$watch('hide_content_sidebar', function () {
                            if ($rootScope.hide_content_sidebar) {
                                $('#page_content').css('max-height', $('html').height() - 40);
                                $('html').css({
                                    'paddingRight': scrollbarWidth(),
                                    'overflow': 'hidden'
                                });
                            } else {
                                $('#page_content').css('max-height', '');
                                $('html').css({
                                    'paddingRight': '',
                                    'overflow': ''
                                });
                            }
                        });

                    }
                }
            }
        }
    ])
    // attach events to document
    .directive('documentEvents', [
        '$rootScope',
        '$window',
        '$timeout',
        'variables',
        function ($rootScope, $window, $timeout, variables) {
            return {
                restrict: 'A',
                link: function (scope, el, attr) {

                    var hidePrimarySidebar = function () {
                        $rootScope.primarySidebarActive = false;
                        $rootScope.primarySidebarOpen = false;
                        $rootScope.hide_content_sidebar = false;
                        $rootScope.primarySidebarHiding = true;
                        $timeout(function () {
                            $rootScope.primarySidebarHiding = false;
                        }, 280);
                    };

                    var hideSecondarySidebar = function () {
                        $rootScope.secondarySidebarActive = false;
                    };

                    var hideMainSearch = function () {
                        var $header_main = $('#header_main');
                        $header_main
                            .children('.header_main_search_form')
                            .velocity("transition.slideUpBigOut", {
                                duration: 280,
                                easing: variables.easing_swiftOut,
                                begin: function () {
                                    $header_main.velocity("reverse");
                                    $rootScope.mainSearchActive = false;
                                },
                                complete: function () {
                                    $header_main
                                        .children('.header_main_content')
                                        .velocity("transition.slideDownBigIn", {
                                            duration: 280,
                                            easing: variables.easing_swiftOut,
                                            complete: function () {
                                                $('.header_main_search_input').blur().val('');
                                            }
                                        })
                                }
                            });
                    };

                    // hide components on $document click
                    scope.onClick = function ($event) {
                        // primary sidebar
                        if ($rootScope.primarySidebarActive && !$($event.target).closest('#sidebar_main').length && !$($event.target).closest('#sSwitch_primary').length && !$rootScope.largeScreen) {
                            hidePrimarySidebar();
                        }
                        // secondary sidebar
                        if ($rootScope.secondarySidebarActive && !$($event.target).closest('#sidebar_secondary').length && !$($event.target).closest('#sSwitch_secondary').length) {
                            hideSecondarySidebar();
                        }
                        // main search form
                        if ($rootScope.mainSearchActive && !$($event.target).closest('.header_main_search_form').length && !$($event.target).closest('#main_search_btn').length) {
                            hideMainSearch();
                        }
                        // style switcher
                        if ($rootScope.styleSwitcherActive && !$($event.target).closest('#style_switcher').length) {
                            $rootScope.styleSwitcherActive = false;
                        }
                    };

                    // hide components on key press (esc)
                    scope.onKeyUp = function ($event) {
                        // primary sidebar
                        if ($rootScope.primarySidebarActive && !$rootScope.largeScreen && $event.keyCode == 27) {
                            hidePrimarySidebar();
                        }
                        // secondary sidebar
                        if ($rootScope.secondarySidebarActive && $event.keyCode == 27) {
                            hideSecondarySidebar();
                        }
                        // main search form
                        if ($rootScope.mainSearchActive && $event.keyCode == 27) {
                            hideMainSearch();
                        }
                        // style switcher
                        if ($rootScope.styleSwitcherActive && $event.keyCode == 27) {
                            $rootScope.styleSwitcherActive = false;
                        }

                    };

                }
            };
        }
    ])
    // main search show
    .directive('mainSearchShow', [
        '$rootScope',
        '$window',
        '$timeout',
        function ($rootScope, $window, variables) {
            return {
                restrict: 'E',
                template: '<a href="#" id="main_search_btn" class="user_action_icon" ng-click="showSearch($event)"><i class="material-icons md-24 md-light">&#xE8B6;</i></a>',
                replace: true,
                scope: true,
                link: function (scope, el, attr) {
                    scope.showSearch = function ($event) {
                        $event.preventDefault();

                        $('#header_main')
                            .children('.header_main_content')
                            .velocity("transition.slideUpBigOut", {
                                duration: 280,
                                easing: variables.easing_swiftOut,
                                begin: function () {
                                    $rootScope.mainSearchActive = true;
                                },
                                complete: function () {
                                    $('#header_main')
                                        .children('.header_main_search_form')
                                        .velocity("transition.slideDownBigIn", {
                                            duration: 280,
                                            easing: variables.easing_swiftOut,
                                            complete: function () {
                                                $('.header_main_search_input').focus();
                                            }
                                        })
                                }
                            });
                    };
                }
            };
        }
    ])
    // main search hide
    .directive('mainSearchHide', [
        '$rootScope',
        '$window',
        'variables',
        function ($rootScope, $window, variables) {
            return {
                restrict: 'E',
                template: '<i class="md-icon header_main_search_close material-icons" ng-click="hideSearch($event)">&#xE5CD;</i>',
                replace: true,
                scope: true,
                link: function (scope, el, attr) {
                    scope.hideSearch = function ($event) {
                        $event.preventDefault();

                        var $header_main = $('#header_main');

                        $header_main
                            .children('.header_main_search_form')
                            .velocity("transition.slideUpBigOut", {
                                duration: 280,
                                easing: variables.easing_swiftOut,
                                begin: function () {
                                    $header_main.velocity("reverse");
                                    $rootScope.mainSearchActive = false;
                                },
                                complete: function () {
                                    $header_main
                                        .children('.header_main_content')
                                        .velocity("transition.slideDownBigIn", {
                                            duration: 280,
                                            easing: variables.easing_swiftOut,
                                            complete: function () {
                                                $('.header_main_search_input').blur().val('');
                                            }
                                        })
                                }
                            });

                    };
                }
            };
        }
    ])

    // primary sidebar
    .directive('sidebarPrimary', [
        '$rootScope',
        '$window',
        '$timeout',
        'variables',
        function ($rootScope, $window, $timeout, variables) {
            return {
                restrict: 'A',
                scope: 'true',
                link: function (scope, el, attr) {
                    scope.submenuToggle = function ($event) {
                        $event.preventDefault();

                        var $this = $($event.currentTarget),
                            $sidebar_main = $('#sidebar_main'),
                            slideToogle = $this.next('ul').is(':visible') ? 'slideUp' : 'slideDown';

                        $this.next('ul')
                            .velocity(slideToogle, {
                                duration: 400,
                                easing: variables.easing_swiftOut,
                                begin: function () {
                                    if (slideToogle == 'slideUp') {
                                        $(this).closest('.submenu_trigger').removeClass('act_section')
                                    } else {
                                        if ($rootScope.menuAccordionMode) {
                                            $this.closest('li').siblings('.submenu_trigger').each(function () {
                                                $(this).children('ul').velocity('slideUp', {
                                                    duration: 500,
                                                    easing: variables.easing_swiftOut,
                                                    begin: function () {
                                                        $(this).closest('.submenu_trigger').removeClass('act_section')
                                                    }
                                                })
                                            })
                                        }
                                        $(this).closest('.submenu_trigger').addClass('act_section')
                                    }
                                },
                                complete: function () {
                                    if (slideToogle !== 'slideUp') {
                                        var scrollContainer = $sidebar_main.find(".scroll-content").length ? $sidebar_main.find(".scroll-content") : $sidebar_main.find(".scrollbar-inner");
                                        $this.closest('.act_section').velocity("scroll", {
                                            duration: 500,
                                            easing: variables.easing_swiftOut,
                                            container: scrollContainer
                                        });
                                    }
                                }
                            });
                    };
                }
            };
        }
    ])
    // toggle primary sidebar
    .directive('sidebarPrimaryToggle', [
        '$rootScope',
        '$window',
        '$timeout',
        function ($rootScope, $window, $timeout) {
            return {
                restrict: 'E',
                replace: true,
                scope: true,
                template: '<a id="sSwitch_primary" href="#" class="sSwitch sSwitch_left" ng-click="togglePrimarySidebar($event)" ng-hide="miniSidebarActive || topMenuActive"><span class="sSwitchIcon"></span></a>',
                link: function (scope, el, attrs) {
                    scope.togglePrimarySidebar = function ($event) {

                        $event.preventDefault();

                        if ($rootScope.primarySidebarActive) {
                            $rootScope.primarySidebarHiding = true;
                            if ($rootScope.largeScreen) {
                                $timeout(function () {
                                    $rootScope.primarySidebarHiding = false;
                                    $(window).resize();
                                }, 280);
                            }
                        } else {
                            if ($rootScope.largeScreen) {
                                $timeout(function () {
                                    $(window).resize();
                                });
                            }
                        }

                        $rootScope.primarySidebarActive = !$rootScope.primarySidebarActive;

                        if (!$rootScope.largeScreen) {
                            $rootScope.hide_content_sidebar = $rootScope.primarySidebarActive ? true : false;
                        }

                        if ($rootScope.primarySidebarOpen) {
                            $rootScope.primarySidebarOpen = false;
                            $rootScope.primarySidebarActive = false;
                        }
                    };

                }
            };
        }
    ])
    // secondary sidebar
    .directive('sidebarSecondary', [
        '$rootScope',
        '$timeout',
        'variables',
        function ($rootScope, $timeout, variables) {
            return {
                restrict: 'A',
                link: function (scope, el, attrs) {
                    $rootScope.sidebar_secondary = true;
                    if (attrs.toggleHidden == 'large') {
                        $rootScope.secondarySidebarHiddenLarge = true;
                    }

                    // chat
                    var $sidebar_secondary = $(el);
                    if ($sidebar_secondary.find('.md-list.chat_users').length) {

                        $('.md-list.chat_users').children('li').on('click', function () {
                            $('.md-list.chat_users').velocity("transition.slideRightBigOut", {
                                duration: 280,
                                easing: variables.easing_swiftOut,
                                complete: function () {
                                    $sidebar_secondary
                                        .find('.chat_box_wrapper')
                                        .addClass('chat_box_active')
                                        .velocity("transition.slideRightBigIn", {
                                            duration: 280,
                                            easing: variables.easing_swiftOut,
                                            begin: function () {
                                                $sidebar_secondary.addClass('chat_sidebar')
                                            }
                                        })
                                }
                            });
                        });

                        $sidebar_secondary
                            .find('.chat_sidebar_close')
                            .on('click', function () {
                                $sidebar_secondary
                                    .find('.chat_box_wrapper')
                                    .removeClass('chat_box_active')
                                    .velocity("transition.slideRightBigOut", {
                                        duration: 280,
                                        easing: variables.easing_swiftOut,
                                        complete: function () {
                                            $sidebar_secondary.removeClass('chat_sidebar');
                                            $('.md-list.chat_users').velocity("transition.slideRightBigIn", {
                                                duration: 280,
                                                easing: variables.easing_swiftOut
                                            })
                                        }
                                    })
                            });

                        if ($sidebar_secondary.find('.uk-tab').length) {
                            $sidebar_secondary.find('.uk-tab').on('change.uk.tab', function (event, active_item, previous_item) {
                                if ($(active_item).hasClass('chat_sidebar_tab') && $sidebar_secondary.find('.chat_box_wrapper').hasClass('chat_box_active')) {
                                    $sidebar_secondary.addClass('chat_sidebar')
                                } else {
                                    $sidebar_secondary.removeClass('chat_sidebar')
                                }
                            })
                        }
                    }

                }
            };
        }
    ])
    // toggle secondary sidebar
    .directive('sidebarSecondaryToggle', [
        '$rootScope',
        '$window',
        '$timeout',
        function ($rootScope, $window, $timeout) {
            return {
                restrict: 'E',
                replace: true,
                template: '<a href="#" id="sSwitch_secondary" class="sSwitch sSwitch_right" ng-show="sidebar_secondary" ng-click="toggleSecondarySidebar($event)"><span class="sSwitchIcon"></span></a>',
                link: function (scope, el, attrs) {
                    scope.toggleSecondarySidebar = function ($event) {
                        $event.preventDefault();
                        $rootScope.secondarySidebarActive = !$rootScope.secondarySidebarActive;
                    };
                }
            };
        }
    ])
    // activate card fullscreen
    .directive('cardFullscreenActivate', [
        '$rootScope',
        'variables',
        function ($rootScope, variables) {
            return {
                restrict: 'E',
                replace: true,
                scope: true,
                template: '<i class="md-icon material-icons md-card-fullscreen-activate" ng-click="cardFullscreenActivate($event)">&#xE5D0;</i>',
                link: function (scope, el, attrs) {
                    scope.cardFullscreenActivate = function ($event) {
                        $event.preventDefault();

                        var $thisCard = $(el).closest('.md-card'),
                            mdCard_h = $thisCard.height(),
                            mdCard_w = $thisCard.width();

                        // create placeholder for card
                        $thisCard.after('<div class="md-card-placeholder" style="width:' + mdCard_w + 'px;height:' + mdCard_h + 'px;"/>');
                        // add overflow hidden to #page_content (fix for ios)
                        //$body.addClass('md-card-fullscreen-active');
                        // add width/height to card (preserve original size)
                        $thisCard
                            .addClass('md-card-fullscreen')
                            .css({
                                'width': mdCard_w,
                                'height': mdCard_h
                            })
                            // animate card to top/left position
                            .velocity({
                                left: 0,
                                top: 0
                            }, {
                                duration: 600,
                                easing: variables.easing_swiftOut,
                                begin: function (elements) {
                                    $rootScope.card_fullscreen = true;
                                    $rootScope.hide_content_sidebar = true;
                                    // add back button
                                    //$thisCard.find('.md-card-toolbar').prepend('<span class="md-icon md-card-fullscreen-deactivate material-icons uk-float-left">&#xE5C4;</span>');
                                    //altair_page_content.hide_content_sidebar();
                                }
                            })
                            // resize card to full width/height
                            .velocity({
                                height: '100%',
                                width: '100%'
                            }, {
                                duration: 600,
                                easing: variables.easing_swiftOut,
                                complete: function (elements) {
                                    // activate onResize callback for some js plugins
                                    //$(window).resize();
                                    // show fullscreen content
                                    $thisCard.find('.md-card-fullscreen-content').velocity("transition.slideUpBigIn", {
                                        duration: 600,
                                        easing: variables.easing_swiftOut,
                                        complete: function (elements) {
                                            // activate onResize callback for some js plugins
                                            $(window).resize();
                                        }
                                    });
                                }
                            });
                    }
                }
            }
        }
    ])
    // deactivate card fullscreen
    .directive('cardFullscreenDeactivate', [
        '$rootScope',
        '$window',
        'variables',
        function ($rootScope, $window, variables) {
            return {
                restrict: 'E',
                replace: true,
                template: '<span class="md-icon md-card-fullscreen-deactivate material-icons uk-float-left" ng-show="card_fullscreen" ng-click="cardFullscreenDeactivate($event)">&#xE5C4;</span>',
                link: function (scope, el, attrs) {
                    scope.cardFullscreenDeactivate = function ($event) {
                        $event.preventDefault();

                        // get card placeholder width/height and offset
                        var $thisPlaceholderCard = $('.md-card-placeholder'),
                            mdPlaceholderCard_h = $thisPlaceholderCard.height(),
                            mdPlaceholderCard_w = $thisPlaceholderCard.width(),
                            mdPlaceholderCard_offset_top = $thisPlaceholderCard.offset().top,
                            mdPlaceholderCard_offset_left = $thisPlaceholderCard.offset().left,
                            $thisCard = $('.md-card-fullscreen');

                        $thisCard
                            // resize card to original size
                            .velocity({
                                height: mdPlaceholderCard_h,
                                width: mdPlaceholderCard_w
                            }, {
                                duration: 600,
                                easing: variables.easing_swiftOut,
                                begin: function (elements) {
                                    // hide fullscreen content
                                    $thisCard.find('.md-card-fullscreen-content').velocity("transition.slideDownOut", { duration: 280, easing: variables.easing_swiftOut });
                                    $rootScope.card_fullscreen = false;
                                },
                                complete: function (elements) {
                                    $rootScope.hide_content_sidebar = false;
                                }
                            })
                            // move card to original position
                            .velocity({
                                left: mdPlaceholderCard_offset_left,
                                top: mdPlaceholderCard_offset_top
                            }, {
                                duration: 600,
                                easing: variables.easing_swiftOut,
                                complete: function (elements) {
                                    // remove some styles added by velocity.js
                                    $thisCard.removeClass('md-card-fullscreen').css({
                                        width: '',
                                        height: '',
                                        left: '',
                                        top: ''
                                    });
                                    // remove card placeholder
                                    $thisPlaceholderCard.remove();
                                    $(window).resize();
                                }
                            })

                    }
                }
            }
        }
    ])
    // card close
    .directive('cardClose', [
        'utils',
        function (utils) {
            return {
                restrict: 'E',
                replace: true,
                scope: true,
                template: '<i class="md-icon material-icons md-card-toggle" ng-click="cardClose($event)">&#xE14C;</i>',
                link: function (scope, el, attrs) {
                    scope.cardClose = function ($event) {
                        $event.preventDefault();

                        var $this = $(el),
                            thisCard = $this.closest('.md-card'),
                            removeCard = function () {
                                $(thisCard).remove();
                            };

                        utils.card_show_hide(thisCard, undefined, removeCard)

                    }
                }
            }
        }
    ])
    // card toggle
    .directive('cardToggle', [
        'variables',
        function (variables) {
            return {
                restrict: 'E',
                replace: true,
                scope: true,
                template: '<i class="md-icon material-icons md-card-toggle" ng-click="cardToggle($event)">&#xE316;</i>',
                link: function (scope, el, attrs) {
                    scope.cardToggle = function ($event) {
                        $event.preventDefault();

                        var $this = $(el),
                            thisCard = $this.closest('.md-card');

                        $(thisCard).toggleClass('md-card-collapsed').children('.md-card-content').slideToggle('280', variables.bez_easing_swiftOut);

                        $this.velocity({
                            scale: 0,
                            opacity: 0.2
                        }, {
                            duration: 280,
                            easing: variables.easing_swiftOut,
                            complete: function () {
                                $(thisCard).hasClass('md-card-collapsed') ? $this.html('&#xE313;') : $this.html('&#xE316;');
                                $this.velocity('reverse');
                            }
                        });


                    }
                }
            }
        }
    ])
    // card overlay toggle
    .directive('cardOverlayToggle', [
        function () {
            return {
                restrict: 'E',
                template: '<i class="md-icon material-icons" ng-click="toggleOverlay($event)">&#xE5D4;</i>',
                replace: true,
                scope: true,
                link: function (scope, el, attrs) {

                    if (el.closest('.md-card').hasClass('md-card-overlay-active')) {
                        el.html('&#xE5CD;')
                    }

                    scope.toggleOverlay = function ($event) {

                        $event.preventDefault();

                        if (!el.closest('.md-card').hasClass('md-card-overlay-active')) {
                            el
                                .html('&#xE5CD;')
                                .closest('.md-card').addClass('md-card-overlay-active');

                        } else {
                            el
                                .html('&#xE5D4;')
                                .closest('.md-card').removeClass('md-card-overlay-active');
                        }

                    }
                }
            }
        }
    ])
    // custom scrollbar
    .directive('customScrollbar', [
        '$rootScope',
        function ($rootScope) {
            return {
                restrict: 'A',
                scope: true,
                link: function (scope, el, attrs) {

                    // check if mini sidebar is enabled
                    if (attrs['id'] == 'sidebar_main' && $rootScope.miniSidebarActive) {
                        return;
                    }

                    $(el).addClass('uk-height-1-1').wrapInner("<div class='scrollbar-inner'></div>");
                    if (Modernizr.touch) {
                        $(el).children('.scrollbar-inner').addClass('touchscroll');
                    } else {
                        $(el).children('.scrollbar-inner').scrollbar({
                            disableBodyScroll: true,
                            scrollx: false,
                            duration: 100
                        });
                    }

                }
            }
        }
    ])
    // material design inputs
    .directive('mdInput', [
        '$timeout',
        function ($timeout) {
            return {
                restrict: 'A',
                scope: {
                    ngModel: '='
                },
                controller: function ($scope, $element) {
                    var $elem = $($element);
                    $scope.updateInput = function () {
                        // clear wrapper classes
                        $elem.closest('.md-input-wrapper').removeClass('md-input-wrapper-danger md-input-wrapper-success md-input-wrapper-disabled');

                        if ($elem.hasClass('md-input-danger')) {
                            $elem.closest('.md-input-wrapper').addClass('md-input-wrapper-danger')
                        }
                        if ($elem.hasClass('md-input-success')) {
                            $elem.closest('.md-input-wrapper').addClass('md-input-wrapper-success')
                        }
                        if ($elem.prop('disabled')) {
                            $elem.closest('.md-input-wrapper').addClass('md-input-wrapper-disabled')
                        }
                        if ($elem.hasClass('label-fixed')) {
                            $elem.closest('.md-input-wrapper').addClass('md-input-filled')
                        }
                        if ($elem.val() != '') {
                            $elem.closest('.md-input-wrapper').addClass('md-input-filled')
                        }
                    };
                },
                link: function (scope, elem, attrs) {

                    var $elem = $(elem);

                    $timeout(function () {
                        if (!$elem.hasClass('md-input-processed')) {
                            if ($elem.prev('label').length) {
                                $elem.prev('label').andSelf().wrapAll('<div class="md-input-wrapper"/>');
                            } else if ($elem.siblings('[data-uk-form-password]').length) {
                                $elem.siblings('[data-uk-form-password]').andSelf().wrapAll('<div class="md-input-wrapper"/>');
                            } else {
                                $elem.wrap('<div class="md-input-wrapper"/>');
                            }
                            $elem
                                .addClass('md-input-processed')
                                .closest('.md-input-wrapper')
                                .append('<span class="md-input-bar"/>');
                        }

                        scope.updateInput();

                    });

                    scope.$watch(function () {
                        return $elem.attr('class');
                    },
                        function (newValue, oldValue) {
                            if (newValue != oldValue) {
                                scope.updateInput();
                            }
                        }
                    );

                    scope.$watch(function () {
                        return $elem.val();
                    },
                        function (newValue, oldValue) {
                            if (!$elem.is(':focus') && (newValue != oldValue)) {
                                scope.updateInput();
                            }
                        }
                    );

                    $elem
                        .on('focus', function () {
                            $elem.closest('.md-input-wrapper').addClass('md-input-focus')
                        })
                        .on('blur', function () {
                            $timeout(function () {
                                $elem.closest('.md-input-wrapper').removeClass('md-input-focus');
                                if ($elem.val() == '') {
                                    $elem.closest('.md-input-wrapper').removeClass('md-input-filled')
                                } else {
                                    $elem.closest('.md-input-wrapper').addClass('md-input-filled')
                                }
                            }, 100)
                        });

                }
            }
        }
    ])
    // material design fab speed dial
    .directive('mdFabSpeedDial', [
        'variables',
        function (variables) {
            return {
                restrict: 'A',
                scope: true,
                link: function (scope, elem, attrs) {
                    $(elem)
                        .append('<i class="material-icons md-fab-action-close" style="display:none">&#xE5CD;</i>')
                        .on('click', function (e) {
                            e.preventDefault();

                            var $this = $(this),
                                $this_wrapper = $this.closest('.md-fab-wrapper');

                            if (!$this_wrapper.hasClass('md-fab-active')) {
                                $this_wrapper.addClass('md-fab-active');
                            } else {
                                $this_wrapper.removeClass('md-fab-active');
                            }

                            $this.velocity({
                                scale: 0
                            }, {
                                duration: 140,
                                easing: variables.easing_swiftOut,
                                complete: function () {
                                    $this.children().toggle();
                                    $this.velocity({
                                        scale: 1
                                    }, {
                                        duration: 140,
                                        easing: variables.easing_swiftOut
                                    })
                                }
                            })
                        })
                        .closest('.md-fab-wrapper').find('.md-fab-small')
                        .on('click', function () {
                            $(this).closest('.md-fab-wrapper').removeClass('md-fab-active')
                        });
                }
            }
        }
    ])
    // material design fab toolbar
    .directive('mdFabToolbar', [
        'variables',
        '$document',
        function (variables, $document) {
            return {
                restrict: 'A',
                scope: true,
                link: function (scope, elem, attrs) {

                    var $fab_toolbar = $(elem);

                    $fab_toolbar
                        .children('i')
                        .on('click', function (e) {
                            e.preventDefault();

                            var toolbarItems = $fab_toolbar.children('.md-fab-toolbar-actions').children().length;

                            $fab_toolbar.addClass('md-fab-animated');

                            var FAB_padding = !$fab_toolbar.hasClass('md-fab-small') ? 16 : 24,
                                FAB_size = !$fab_toolbar.hasClass('md-fab-small') ? 64 : 44;

                            setTimeout(function () {
                                $fab_toolbar
                                    .width((toolbarItems * FAB_size + FAB_padding))
                            }, 140);

                            setTimeout(function () {
                                $fab_toolbar.addClass('md-fab-active');
                            }, 420);

                        });

                    $($document).on('click scroll', function (e) {
                        if ($fab_toolbar.hasClass('md-fab-active')) {
                            if (!$(e.target).closest($fab_toolbar).length) {

                                $fab_toolbar
                                    .css('width', '')
                                    .removeClass('md-fab-active');

                                setTimeout(function () {
                                    $fab_toolbar.removeClass('md-fab-animated');
                                }, 140);

                            }
                        }
                    });
                }
            }
        }
    ])
    // material design fab sheet
    .directive('mdFabSheet', [
        'variables',
        '$document',
        function (variables, $document) {
            return {
                restrict: 'A',
                scope: true,
                link: function (scope, elem, attrs) {
                    var $fab_sheet = $(elem);

                    $fab_sheet
                        .children('i')
                        .on('click', function (e) {
                            e.preventDefault();

                            var sheetItems = $fab_sheet.children('.md-fab-sheet-actions').children('a').length;

                            $fab_sheet.addClass('md-fab-animated');

                            setTimeout(function () {
                                $fab_sheet
                                    .width('240px')
                                    .height(sheetItems * 40 + 8);
                            }, 140);

                            setTimeout(function () {
                                $fab_sheet.addClass('md-fab-active');
                            }, 280);

                        });

                    $($document).on('click scroll', function (e) {
                        if ($fab_sheet.hasClass('md-fab-active')) {
                            if (!$(e.target).closest($fab_sheet).length) {

                                $fab_sheet
                                    .css({
                                        'height': '',
                                        'width': ''
                                    })
                                    .removeClass('md-fab-active');

                                setTimeout(function () {
                                    $fab_sheet.removeClass('md-fab-animated');
                                }, 140);

                            }
                        }
                    });
                }
            }
        }
    ])
    // hierarchical show
    .directive('hierarchicalShow', [
        '$timeout',
        '$rootScope',
        function ($timeout, $rootScope) {
            return {
                restrict: 'A',
                scope: true,
                link: function (scope, elem, attrs) {


                    var parent_el = $(elem),
                        baseDelay = 60;


                    var add_animation = function (children, length) {
                        children
                            .each(function (index) {
                                $(this).css({
                                    '-webkit-animation-delay': (index * baseDelay) + "ms",
                                    'animation-delay': (index * baseDelay) + "ms"
                                })
                            })
                            .end()
                            .waypoint({
                                element: elem[0],
                                handler: function () {
                                    parent_el.addClass('hierarchical_show_inView');
                                    setTimeout(function () {
                                        parent_el
                                            .removeClass('hierarchical_show hierarchical_show_inView fast_animation')
                                            .children()
                                            .css({
                                                '-webkit-animation-delay': '',
                                                'animation-delay': ''
                                            });
                                    }, (length * baseDelay) + 1200);
                                    this.destroy();
                                },
                                context: window,
                                offset: '90%'
                            });
                    };

                    $rootScope.$watch('pageLoaded', function () {
                        if ($rootScope.pageLoaded) {
                            var children = parent_el.children(),
                                children_length = children.length;

                            $timeout(function () {
                                add_animation(children, children_length)
                            }, 560)

                        }
                    });

                }
            }
        }
    ])
    // hierarchical slide in
    .directive('hierarchicalSlide', [
        '$timeout',
        '$rootScope',
        function ($timeout, $rootScope) {
            return {
                restrict: 'A',
                scope: true,
                link: function (scope, elem, attrs) {

                    var $this = $(elem),
                        baseDelay = 100;

                    var add_animation = function (children, context, childrenLength) {
                        children.each(function (index) {
                            $(this).css({
                                '-webkit-animation-delay': (index * baseDelay) + "ms",
                                'animation-delay': (index * baseDelay) + "ms"
                            })
                        });
                        $this.waypoint({
                            handler: function () {
                                $this.addClass('hierarchical_slide_inView');
                                $timeout(function () {
                                    $this.removeClass('hierarchical_slide hierarchical_slide_inView');
                                    children.css({
                                        '-webkit-animation-delay': '',
                                        'animation-delay': ''
                                    });
                                }, (childrenLength * baseDelay) + 1200);
                                this.destroy();
                            },
                            context: context[0],
                            offset: '90%'
                        });
                    };

                    $rootScope.$watch('pageLoaded', function () {
                        if ($rootScope.pageLoaded) {
                            var thisChildren = attrs['slideChildren'] ? $this.children(attrs['slideChildren']) : $this.children(),
                                thisContext = attrs['slideContext'] ? $this.closest(attrs['slideContext']) : 'window',
                                thisChildrenLength = thisChildren.length;

                            if (thisChildrenLength >= 1) {
                                $timeout(function () {
                                    add_animation(thisChildren, thisContext, thisChildrenLength)
                                }, 560)
                            }
                        }
                    });

                }
            }
        }
    ])
    // preloaders
    .directive('mdPreloader', [
        function () {
            return {
                restrict: 'E',
                scope: {
                    width: '=',
                    height: '=',
                    strokeWidth: '=',
                    style: '@?'
                },
                template: '<div class="md-preloader{{style}}"><svg xmlns="http://www.w3.org/2000/svg" version="1.1" ng-attr-height="{{ height }}" ng-attr-width="{{ width }}" viewbox="0 0 75 75"><circle cx="37.5" cy="37.5" r="33.5" ng-attr-stroke-width="{{ strokeWidth }}"/></svg></div>',
                link: function (scope, elem, attr) {

                    scope.width = scope.width ? scope.width : 48;
                    scope.height = scope.height ? scope.height : 48;
                    scope.strokeWidth = scope.strokeWidth ? scope.strokeWidth : 4;

                    attr.$observe('warning', function () {
                        scope.style = ' md-preloader-warning'
                    });

                    attr.$observe('success', function () {
                        scope.style = ' md-preloader-success'
                    });

                    attr.$observe('danger', function () {
                        scope.style = ' md-preloader-danger'
                    });

                }
            }
        }
    ])
    .directive('preloader', [
        '$rootScope',
        'utils',
        function ($rootScope, utils) {
            return {
                restrict: 'E',
                scope: {
                    width: '=',
                    height: '=',
                    style: '@?'
                },
                template: '<img src="assets/img/spinners/{{style}}{{imgDensity}}.gif" alt="" ng-attr-width="{{width}}" ng-attr-height="{{height}}">',
                link: function (scope, elem, attrs) {

                    scope.width = scope.width ? scope.width : 32;
                    scope.height = scope.height ? scope.height : 32;
                    scope.style = scope.style ? scope.style : 'spinner';
                    scope.imgDensity = utils.isHighDensity() ? '@2x' : '';

                    attrs.$observe('warning', function () {
                        scope.style = 'spinner_warning'
                    });

                    attrs.$observe('success', function () {
                        scope.style = 'spinner_success'
                    });

                    attrs.$observe('danger', function () {
                        scope.style = 'spinner_danger'
                    });

                    attrs.$observe('small', function () {
                        scope.style = 'spinner_small'
                    });

                    attrs.$observe('medium', function () {
                        scope.style = 'spinner_medium'
                    });

                    attrs.$observe('large', function () {
                        scope.style = 'spinner_large'
                    });

                }
            }
        }
    ])
    // uikit components
    .directive('ukHtmlEditor', [
        '$timeout',
        function ($timeout) {
            return {
                restrict: 'A',
                link: function (scope, elem, attrs) {
                    $timeout(function () {
                        UIkit.htmleditor(elem[0], {
                            'toolbar': '',
                            'height': '240'
                        });
                    });
                }
            }
        }
    ])
    .directive('ukNotification', [
        '$window',
        function ($window) {
            return {
                restrict: 'A',
                scope: {
                    message: '@',
                    status: '@?',
                    timeout: '@?',
                    group: '@?',
                    position: '@?',
                    callback: '&?'
                },
                link: function (scope, elem, attrs) {

                    var w = angular.element($window),
                        $element = $(elem);

                    scope.showNotify = function () {
                        var thisNotify = UIkit.notify({
                            message: scope.message,
                            status: scope.status ? scope.status : '',
                            timeout: scope.timeout ? scope.timeout : 5000,
                            group: scope.group ? scope.group : '',
                            pos: scope.position ? scope.position : 'top-center',
                            onClose: function () {
                                $('body').find('.md-fab-wrapper').css('margin-bottom', '');
                                clearTimeout(thisNotify.timeout);

                                if (scope.callback) {
                                    if (angular.isFunction(scope.callback())) {
                                        scope.$apply(scope.callback());
                                    } else {
                                        console.log('Callback is not a function');
                                    }
                                }

                            }
                        });
                        if (
                            ((w.width() < 768) && (
                                (scope.position == 'bottom-right')
                                || (scope.position == 'bottom-left')
                                || (scope.position == 'bottom-center')
                            ))
                            || (scope.position == 'bottom-right')
                        ) {
                            var thisNotify_height = $(thisNotify.element).outerHeight(),
                                spacer = (w.width() < 768) ? -6 : 8;
                            $('body').find('.md-fab-wrapper').css('margin-bottom', thisNotify_height + spacer);
                        }
                    };

                    $element.on("click", function () {
                        if ($('body').find('.uk-notify-message').length) {
                            $('body').find('.uk-notify-message').click();
                            setTimeout(function () {
                                scope.showNotify()
                            }, 450)
                        } else {
                            scope.showNotify()
                        }
                    });

                }
            }
        }
    ]);
})();

(function(){
    'use strict';

    angular
    .module('donarApp')
    .factory('windowDimensions', [
        '$window',
        function ($window) {
            return {
                height: function () {
                    return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
                },
                width: function () {
                    return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
                }
            }
        }
    ])
    .factory('utils', function () {
        return {
            // Util for finding an object by its 'id' property among an array
            findByItemId: function findById(a, id) {
                for (var i = 0; i < a.length; i++) {
                    if (a[i].item_id == id) return a[i];
                }
                return null;
            },
            // serialize form
            serializeObject: function (form) {
                var o = {};
                var a = form.serializeArray();
                $.each(a, function () {
                    if (o[this.name] !== undefined) {
                        if (!o[this.name].push) {
                            o[this.name] = [o[this.name]];
                        }
                        o[this.name].push(this.value || '');
                    } else {
                        o[this.name] = this.value || '';
                    }
                });
                return o;
            },
            // high density test
            isHighDensity: function () {
                return ((window.matchMedia && (window.matchMedia('only screen and (min-resolution: 124dpi), only screen and (min-resolution: 1.3dppx), only screen and (min-resolution: 48.8dpcm)').matches || window.matchMedia('only screen and (-webkit-min-device-pixel-ratio: 1.3), only screen and (-o-min-device-pixel-ratio: 2.6/2), only screen and (min--moz-device-pixel-ratio: 1.3), only screen and (min-device-pixel-ratio: 1.3)').matches)) || (window.devicePixelRatio && window.devicePixelRatio > 1.3));
            },
            // touch device test
            isTouchDevice: function () {
                return !!('ontouchstart' in window);
            },
            // local storage test
            lsTest: function () {
                var test = 'test';
                try {
                    localStorage.setItem(test, test);
                    localStorage.removeItem(test);
                    return true;
                } catch (e) {
                    return false;
                }
            },
            // show/hide card
            card_show_hide: function (card, begin_callback, complete_callback, callback_element) {
                $(card).velocity({
                    scale: 0,
                    opacity: 0.2
                }, {
                    duration: 400,
                    easing: [0.4, 0, 0.2, 1],
                    // on begin callback
                    begin: function () {
                        if (typeof begin_callback !== 'undefined') {
                            begin_callback(callback_element);
                        }
                    },
                    // on complete callback
                    complete: function () {
                        if (typeof complete_callback !== 'undefined') {
                            complete_callback(callback_element);
                        }
                    }
                })
                    .velocity('reverse');
            }
        };
    })
    ;

    angular
        .module("ConsoleLogger", [])
        // router.ui debug
        // app.js (run section "PrintToConsole")
        .factory("PrintToConsole", [
            "$rootScope",
            function ($rootScope) {
                var handler = { active: false };
                handler.toggle = function () { handler.active = !handler.active; };

                if (handler.active) {
                    console.log($state + ' = ' + $state.current.name);
                    console.log($stateParams + '=' + $stateParams);
                    console.log($state_full_url + '=' + $state.$current.url.source);
                    console.log(Card_fullscreen + '=' + card_fullscreen);

                    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
                        console.log("$stateChangeStart --- event, toState, toParams, fromState, fromParams");
                        console.log(arguments);
                    });
                    $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
                        console.log("$stateChangeError --- event, toState, toParams, fromState, fromParams, error");
                        console.log(arguments);
                    });
                    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
                        console.log("$stateChangeSuccess --- event, toState, toParams, fromState, fromParams");
                        console.log(arguments);
                    });
                    $rootScope.$on('$viewContentLoading', function (event, viewConfig) {
                        console.log("$viewContentLoading --- event, viewConfig");
                        console.log(arguments);
                    });
                    $rootScope.$on('$viewContentLoaded', function (event) {
                        console.log("$viewContentLoaded --- event");
                        console.log(arguments);
                    });
                    $rootScope.$on('$stateNotFound', function (event, unfoundState, fromState, fromParams) {
                        console.log("$stateNotFound --- event, unfoundState, fromState, fromParams");
                        console.log(arguments);
                    });
                }

                return handler;
            }
        ]);
})();
(function(){
    'use strict';

    angular
    .module('donarApp')
    .filter('multiSelectFilter', function () {
        return function (items, filterData) {
            if (filterData == undefined)
                return items;
            var keys = Object.keys(filterData);
            var filtered = [];
            var populate = true;

            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                populate = true;
                for (var j = 0; j < keys.length ; j++) {
                    if (filterData[keys[j]] != undefined) {
                        if (filterData[keys[j]].length == 0 || filterData[keys[j]].contains(item[keys[j]])) {
                            populate = true;
                        } else {
                            populate = false;
                            break;
                        }
                    }
                }
                if (populate) {
                    filtered.push(item);
                }
            }
            return filtered;
        };
    })
    .filter("jsonDate", function () {
        return function (x) {
            if (x) return new Date(x);
            else return null;
        };
    })
    .filter("momentDate", function () {
        return function (x, date_format_i, date_format_o) {
            if (x) {
                if (date_format_i) {
                    return moment(x, date_format_i).format(date_format_o)
                } else {
                    return moment(new Date(x)).format(date_format_o)
                }
            }
            else return null;
        };
    })
    .filter("initials", function () {
        return function (x) {
            if (x) {
                return x.split(' ').map(function (s) {
                    return s.charAt(0);
                }).join('');
            } else {
                return null;
            }
        };
    });
})();
/* ocLazyLoad config */
(function(){
    'use strict';

    angular
    .module('donarApp')
    .config([
        '$ocLazyLoadProvider',
        function ($ocLazyLoadProvider) {
            $ocLazyLoadProvider.config({
                debug: false,
                events: false,
                modules: [
                    // ----------- FORM ELEMENTS -----------
                    {
                        name: 'lazy_autosize',
                        files: [
                            'bower_components/autosize/dist/autosize.js',
                            'app/modules/angular-autosize.js'
                        ],
                        serie: true
                    },
                    {
                        name: 'lazy_iCheck',
                        files: [
                            "bower_components/jquery-icheck/icheck.js",
                            'app/modules/angular-icheck.js'
                        ],
                        serie: true
                    },
                    {
                        name: 'lazy_selectizeJS',
                        files: [
                            'bower_components/selectize/dist/js/standalone/selectize.min.js',
                            'app/modules/angular-selectize.js'
                        ],
                        serie: true
                    },
                    {
                        name: 'lazy_switchery',
                        files: [
                            'bower_components/switchery/dist/switchery.js',
                            'app/modules/angular-switchery.js'
                        ],
                        serie: true
                    },
                    {
                        name: 'lazy_ionRangeSlider',
                        files: [
                            'bower_components/ion.rangeslider/js/ion.rangeSlider.min.js',
                            'app/modules/angular-ionRangeSlider.js'
                        ],
                        serie: true
                    },
                    {
                        name: 'lazy_masked_inputs',
                        files: [
                             'bower_components/jquery.inputmask/dist/jquery.inputmask.bundle.js'
                        ]
                    },
                    {
                        name: 'lazy_character_counter',
                        files: [
                            'app/modules/angular-character-counter.js'
                        ]
                    },
                    {
                        name: 'lazy_parsleyjs',
                        files: [
                            'assets/js/custom/parsleyjs_config.js',
                            'bower_components/parsleyjs/dist/parsley.min.js'
                        ],
                        serie: true
                    },
                    {
                        name: 'lazy_wizard',
                        files: [
                            'assets/js/custom/parsleyjs_config.js',
                            'bower_components/parsleyjs/dist/parsley.min.js',
                            'bower_components/lodash/lodash.min.js',
                            'bower_components/angular-wizard/dist/angular-wizard.min.js'
                        ],
                        serie: true
                    },
                    {
                        name: 'lazy_ckeditor',
                        files: [
                            'bower_components/ckeditor/ckeditor.js',
                            'app/modules/angular-ckeditor.js'
                        ],
                        serie: true
                    },
                    {
                        name: 'lazy_tinymce',
                        files: [
                            'bower_components/tinymce/tinymce.min.js',
                            'app/modules/angular-tinymce.js'
                        ],
                        serie: true
                    },

                    // ----------- CHARTS -----------
                    {
                        name: 'lazy_charts_chartist',
                        files: [
                            'bower_components/chartist/dist/chartist.min.css',
                            'bower_components/chartist/dist/chartist.min.js',
                            'app/modules/angular-chartist.js'
                        ],
                        insertBefore: '#main_stylesheet',
                        serie: true
                    },
                    {
                        name: 'lazy_charts_easypiechart',
                        files: [
                            'bower_components/jquery.easy-pie-chart/dist/angular.easypiechart.min.js'
                        ]
                    },
                    {
                        name: 'lazy_charts_metricsgraphics',
                        files: [
                            'bower_components/metrics-graphics/dist/metricsgraphics.css',
                            'bower_components/d3/d3.min.js',
                            'bower_components/metrics-graphics/dist/metricsgraphics.min.js',
                            'app/modules/angular-metrics-graphics.js'
                        ],
                        insertBefore: '#main_stylesheet',
                        serie: true
                    },
                    {
                        name: 'lazy_charts_c3',
                        files: [
                            'bower_components/c3js-chart/c3.min.css',
                            'bower_components/d3/d3.min.js',
                            'bower_components/c3js-chart/c3.min.js',
                            'bower_components/c3-angular/c3-angular.min.js'
                        ],
                        insertBefore: '#main_stylesheet',
                        serie: true
                    },
                    {
                        name: 'lazy_charts_peity',
                        files: [
                            'bower_components/peity/jquery.peity.min.js',
                            'app/modules/angular-peity.js'
                        ],
                        serie: true
                    },

                    // ----------- COMPONENTS -----------
                    {
                        name: 'lazy_countUp',
                        files: [
                            'bower_components/countUp.js/countUp.js',
                            'app/modules/angular-countUp.js'
                        ],
                        serie: true
                    },
                    {
                        name: 'lazy_clndr',
                        files: [
                            'bower_components/clndr/clndr.min.js',
                            'bower_components/angular-clndr/angular-clndr.min.js'
                        ],
                        serie: true
                    },
                    {
                        name: 'lazy_google_maps',
                        files: [
                            'bower_components/ngmap/build/scripts/ng-map.js'
                        ],
                        serie: true
                    },
                    {
                        name: 'lazy_weathericons',
                        files: [
                            'bower_components/weather-icons/css/weather-icons.css'
                        ],
                        insertBefore: '#main_stylesheet',
                        serie: true
                    },
                    {
                        name: 'lazy_prismJS',
                        files: [
                            "bower_components/prism/prism.js",
                            "bower_components/prism/components/prism-php.js",
                            "bower_components/prism/plugins/line-numbers/prism-line-numbers.js",
                            'app/modules/angular-prism.js'
                        ],
                        serie: true
                    },
                    {
                        name: 'lazy_dragula',
                        files: [
                            'bower_components/angular-dragula/dist/angular-dragula.min.js'
                        ]
                    },
                    {
                        name: 'lazy_pagination',
                        files: [
                            'bower_components/angularUtils-pagination/dirPagination.js'
                        ]
                    },
                    {
                        name: 'lazy_diff',
                        files: [
                            'bower_components/jsdiff/diff.min.js'
                        ]
                    },

                    // ----------- PLUGINS -----------
                    {
                        name: 'lazy_fullcalendar',
                        files: [
                            'bower_components/fullcalendar/dist/fullcalendar.min.css',
                            'bower_components/fullcalendar/dist/fullcalendar.min.js',
                            'bower_components/fullcalendar/dist/gcal.js',
                            'bower_components/angular-ui-calendar/src/calendar.js'
                        ],
                        insertBefore: '#main_stylesheet',
                        serie: true
                    },
                    {
                        name: 'lazy_codemirror',
                        files: [
                            "bower_components/codemirror/lib/codemirror.css",
                            "assets/css/codemirror_themes.min.css",
                            "bower_components/codemirror/lib/codemirror.js",
                            "assets/js/custom/codemirror_fullscreen.min.js",
                            "bower_components/codemirror/addon/edit/matchtags.js",
                            "bower_components/codemirror/addon/edit/matchbrackets.js",
                            "bower_components/codemirror/addon/fold/xml-fold.js",
                            "bower_components/codemirror/mode/htmlmixed/htmlmixed.js",
                            "bower_components/codemirror/mode/xml/xml.js",
                            "bower_components/codemirror/mode/php/php.js",
                            "bower_components/codemirror/mode/clike/clike.js",
                            "bower_components/codemirror/mode/javascript/javascript.js",
                            "app/modules/angular-codemirror.js"
                        ],
                        insertBefore: '#main_stylesheet',
                        serie: true
                    },
                    {
                        name: 'lazy_datatables',
                        files: [
                            'bower_components/datatables/media/js/jquery.dataTables.min.js',
                            'bower_components/datatables-colvis/js/dataTables.colVis.js',
                            'bower_components/datatables-tabletools/js/dataTables.tableTools.js',
                            'bower_components/angular-datatables/dist/angular-datatables.js',
                            'assets/js/custom/jquery.dataTables.columnFilter.js',
                            'bower_components/angular-datatables/dist/plugins/columnfilter/angular-datatables.columnfilter.min.js',
                            'assets/js/custom/datatables_uikit.js'
                        ],
                        serie: true
                    },
                    {
                        name: 'lazy_gantt_chart',
                        files: [
                            'bower_components/jquery-ui/ui/minified/core.min.js',
                            'bower_components/jquery-ui/ui/minified/widget.min.js',
                            'bower_components/jquery-ui/ui/minified/mouse.min.js',
                            'bower_components/jquery-ui/ui/minified/resizable.min.js',
                            'bower_components/jquery-ui/ui/minified/draggable.min.js',
                            'assets/js/custom/gantt_chart.min.js'
                        ],
                        serie: true
                    },
                    {
                        name: 'lazy_tablesorter',
                        files: [
                            'bower_components/tablesorter/dist/js/jquery.tablesorter.min.js',
                            'bower_components/tablesorter/dist/js/jquery.tablesorter.widgets.min.js',
                            'bower_components/tablesorter/dist/js/widgets/widget-alignChar.min.js',
                            'bower_components/tablesorter/dist/js/extras/jquery.tablesorter.pager.min.js'
                        ],
                        serie: true
                    },
                    {
                        name: 'lazy_vector_maps',
                        files: [
                            'bower_components/raphael/raphael-min.js',
                            'bower_components/jquery-mapael/js/jquery.mapael.js',
                            'bower_components/jquery-mapael/js/maps/world_countries.js',
                            'bower_components/jquery-mapael/js/maps/usa_states.js'
                        ],
                        serie: true
                    },
                    {
                        name: 'lazy_dropify',
                        files: [
                            'assets/skins/dropify/css/dropify.css',
                            'assets/js/custom/dropify/dist/js/dropify.min.js'
                        ]
                    },
                    {
                        name: 'lazy_tree',
                        files: [
                            'assets/js/custom/easytree/skin-material/ui.easytree.min.css',
                            'assets/js/custom/easytree/jquery.easytree.min.js'
                        ],
                        serie: true
                    },

                    // ----------- KENDOUI COMPONENTS -----------
                    {
                        name: 'lazy_KendoUI',
                        files: [
                            'bower_components/kendo-ui/js/kendo.core.min.js',
                            'bower_components/kendo-ui/js/kendo.color.min.js',
                            'bower_components/kendo-ui/js/kendo.data.min.js',
                            'bower_components/kendo-ui/js/kendo.calendar.min.js',
                            'bower_components/kendo-ui/js/kendo.popup.min.js',
                            'bower_components/kendo-ui/js/kendo.datepicker.min.js',
                            'bower_components/kendo-ui/js/kendo.timepicker.min.js',
                            'bower_components/kendo-ui/js/kendo.datetimepicker.min.js',
                            'bower_components/kendo-ui/js/kendo.list.min.js',
                            'bower_components/kendo-ui/js/kendo.fx.min.js',
                            'bower_components/kendo-ui/js/kendo.userevents.min.js',
                            'bower_components/kendo-ui/js/kendo.menu.min.js',
                            'bower_components/kendo-ui/js/kendo.draganddrop.min.js',
                            'bower_components/kendo-ui/js/kendo.slider.min.js',
                            'bower_components/kendo-ui/js/kendo.mobile.scroller.min.js',
                            'bower_components/kendo-ui/js/kendo.autocomplete.min.js',
                            'bower_components/kendo-ui/js/kendo.combobox.min.js',
                            'bower_components/kendo-ui/js/kendo.dropdownlist.min.js',
                            'bower_components/kendo-ui/js/kendo.colorpicker.min.js',
                            'bower_components/kendo-ui/js/kendo.combobox.min.js',
                            'bower_components/kendo-ui/js/kendo.maskedtextbox.min.js',
                            'bower_components/kendo-ui/js/kendo.multiselect.min.js',
                            'bower_components/kendo-ui/js/kendo.numerictextbox.min.js',
                            'bower_components/kendo-ui/js/kendo.toolbar.min.js',
                            'bower_components/kendo-ui/js/kendo.panelbar.min.js',
                            'bower_components/kendo-ui/js/kendo.window.min.js',
                            'bower_components/kendo-ui/js/kendo.angular.min.js',
                            'bower_components/kendo-ui/styles/kendo.common-material.min.css',
                            'bower_components/kendo-ui/styles/kendo.material.min.css'
                        ],
                        insertBefore: '#main_stylesheet',
                        serie: true
                    },

                    // ----------- UIKIT HTMLEDITOR -----------
                    {
                        name: 'lazy_htmleditor',
                        files: [
                            "bower_components/codemirror/lib/codemirror.js",
                            "bower_components/codemirror/mode/markdown/markdown.js",
                            "bower_components/codemirror/addon/mode/overlay.js",
                            "bower_components/codemirror/mode/javascript/javascript.js",
                            "bower_components/codemirror/mode/php/php.js",
                            "bower_components/codemirror/mode/gfm/gfm.js",
                            "bower_components/codemirror/mode/xml/xml.js",
                            "bower_components/marked/lib/marked.js",
                            "bower_components/uikit/js/components/htmleditor.js"
                        ],
                        serie: true
                    },

                    // ----------- STYLE SWITCHER -----------
                    {
                        name: 'lazy_style_switcher',
                        files: [
                            "app/shared/style_switcher/style_switcher.js"
                        ]
                    }

                ]
            })
        }
    ]);
})();
(function () {
    'use strict';

    angular
        .module('donarApp')
        .service('detectBrowser', [
            '$window',
            function ($window) {
                // http://stackoverflow.com/questions/22947535/how-to-detect-browser-using-angular
                return function () {
                    var userAgent = $window.navigator.userAgent,
                        browsers = {
                            chrome: /chrome/i,
                            safari: /safari/i,
                            firefox: /firefox/i,
                            ie: /internet explorer/i
                        };

                    for (var key in browsers) {
                        if (browsers[key].test(userAgent)) {
                            return key;
                        }
                    }
                    return 'unknown';
                }
            }
        ])
        .service('preloaders', [
            '$rootScope',
            '$timeout',
            'utils',
            function ($rootScope, $timeout, utils) {
                $rootScope.content_preloader_show = function (style, container) {
                    var $body = $('body');
                    if (!$body.find('.content-preloader').length) {
                        var image_density = utils.isHighDensity() ? '@2x' : '';

                        var preloader_content = (typeof style !== 'undefined' && style == 'regular')
                            ? '<img src="assets/img/spinners/spinner' + image_density + '.gif" alt="" width="32" height="32">'
                            : '<div class="md-preloader"><svg xmlns="http://www.w3.org/2000/svg" version="1.1" height="32" width="32" viewbox="0 0 75 75"><circle cx="37.5" cy="37.5" r="33.5" stroke-width="8"/></svg></div>';

                        var thisContainer = (typeof container !== 'undefined') ? container : $body;

                        thisContainer.append('<div class="content-preloader">' + preloader_content + '</div>');
                        $timeout(function () {
                            $('.content-preloader').addClass('preloader-active');
                        });
                    }
                };
                $rootScope.content_preloader_hide = function () {
                    var $body = $('body');
                    if ($body.find('.content-preloader').length) {
                        // hide preloader
                        $('.content-preloader').removeClass('preloader-active');
                        // remove preloader
                        $timeout(function () {
                            $('.content-preloader').remove();
                        }, 500);
                    }
                };

            }
        ])
        .factory('ServerService', ServerService)
        .factory('SessionStorageService', SessionStorageService);

    ServerService.$inject = ['$http', '$q'];
    function ServerService($http, $q) {
        var service = {
            homeGetDonaciones: homeGetDonaciones,
            login: login,
            register: register,
            getDonacion: getDonacion,
            addComment: addComment,
            saveDonacion: saveDonacion,
            getCategorias: getCategorias,
            addFavorite: addFavorite,
            getFavorites: getFavorites,
            deleteFav: deleteFav,
            searchDonacion: searchDonacion,
            crearDonacionMP: crearDonacionMP,
            // deletePendienteDonante = deletePendienteDonante,
            // deletePendienteDonatario = deletePendienteDonatario,
            getPendienteDonante: getPendienteDonante,
            getPendienteDonatario: getPendienteDonatario,
            savePendienteDonante: savePendienteDonante,
            savePendienteDonatario: savePendienteDonatario,
            getInfoUsuario: getInfoUsuario,
            guardarUsuario: guardarUsuario,
            getMisDonaciones: getMisDonaciones,
            getFilesInFolder: getFilesInFolder,
            guardarVideo: guardarVideo,
            getVideos: getVideos,
            guardarResultado: guardarResultado,
            getResultado: getResultado
        };

        return service;

        function homeGetDonaciones() {
            return $http.get('http://soydonar.com/webservices/webresources/necesidadesHome')
                .then(function (response) {
                    return response.data;
                });
        }

        function login(request) {
            return $http.get('http://soydonar.com/webservices/webresources/Login/' + request.username + '&' + request.password)
                .then(function (response) {
                    return response.data;
                });
        }

        function register(request) {
            return $http.get('http://soydonar.com/webservices/webresources/Register/' + request.username + '&' + request.password + '&' + request.password + '&' + request.name + '&' + request.lastname)
                .then(function (response) {
                    return response.data;
                });
        }

        function getDonacion(id) {
            return $http.get('http://soydonar.com/webservices/webresources/NecesidadInfo/' + id)
                .then(function (response) {
                    return response.data;
                },
                function (responseError) {
                    return responseError;
                });
        }

        function addComment(request) {

            console.log('Entra al servicio de comentario:');
            console.log(request);

            return $http.post('http://soydonar.com/webservices/webresources/Comment/post1', JSON.stringify(request))
                .then(function (response) {
                    console.log('Comentario');
                    console.log(response);
                    return response.data;
                },
                function (responseError) {
                    console.log(responseError);
                    return responseError;
                });
        }

        function saveDonacion(request) {

            console.log('Entra al servicio de save de donacion:');
            console.log(request);

            if (request.id_necesidad) {
                return $http.post('http://soydonar.com/webservices/webresources/editNecesidad/edit', JSON.stringify(request))
                    .then(function (response) {
                        console.log('Donacion edit');
                        console.log(response);
                        return response.data;
                    },
                    function (responseError) {
                        console.log(responseError);
                        return responseError;
                    });
            }
            else {
                return $http.post('http://soydonar.com/webservices/webresources/crearNecesidad/alta', JSON.stringify(request))
                    .then(function (response) {
                        console.log('Donacion add');
                        console.log(response);
                        return response.data;
                    },
                    function (responseError) {
                        console.log(responseError);
                        return responseError;
                    });
            }
        }

        function getCategorias() {
            return $http.get('http://soydonar.com/webservices/webresources/verCategorias/')
                .then(function (response) {
                    return response.data;
                },
                function (responseError) {
                    return responseError;
                });
        }

        function addFavorite(idNecesidad, idUsuario) {
            return $http.get('http://soydonar.com/webservices/webresources/addFav/' + idNecesidad + '&' + idUsuario)
                .then(function (response) {
                    return response.data;
                },
                function (responseError) {
                    return responseError;
                });
        }

        function getFavorites(idUsuario) {
            return $http.get('http://soydonar.com/webservices/webresources/verFavoritos/' + idUsuario)
                .then(function (response) {
                    return response.data;
                },
                function (responseError) {
                    return responseError;
                });
        }

        function deleteFav(idDonacion, idUsuario) {
            return $http.get('http://soydonar.com/webservices/webresources/DeleteFav/' + idDonacion + '&' + idUsuario)
                .then(function (response) {
                    return response.data;
                },
                function (responseError) {
                    return responseError;
                });
        }

        function searchDonacion(filtro, categoria) {
            var request = {
                tipo: 'all',
                clave: filtro,
                categoria: (categoria && categoria != '') ? categoria : 'todas'
            };
            return $http.post('http://soydonar.com/webservices/webresources/filtro/Nec', JSON.stringify(request))
                .then(function (response) {
                    console.log('Search');
                    console.log(response);
                    return response.data;
                },
                function (responseError) {
                    console.log(responseError);
                    return responseError;
                });
        }

        function crearDonacionMP(request) {
            // var request = {
            //     donante: 'paolaservis@yahoo.com',
            //     id_necesidad: '67',
            //     fecha: '2000-05-07',
            //     aporte_monetario: '100',
            //     aporte_donacion: '',
            //     donatario: 'juan@gmail.com'
            // };

            return $http.post('http://soydonar.com/webservices/webresources/CrearDonacion/alta', JSON.stringify(request))
                .then(function (response) {
                    console.log('Donacion edit');
                    console.log(response);
                    return response.data;
                },
                function (responseError) {
                    console.log(responseError);
                    return responseError;
                });
        }

        function getPendienteDonante(idUsuario) {
            return $http.get('http://soydonar.com/webservices/webresources/pendientes/donante/' + idUsuario)
                .then(function (response) {
                    return response.data;
                },
                function (responseError) {
                    return responseError;
                });
        }

        function getPendienteDonatario(idUsuario) {
            return $http.get('http://soydonar.com/webservices/webresources/pendientes/donatario/' + idUsuario)
                .then(function (response) {
                    return response.data;
                },
                function (responseError) {
                    return responseError;
                });
        }

        function savePendienteDonante(id_donacion) {
            return $http.get('http://soydonar.com/webservices/webresources/donacionGuardarEstado/donante/' + id_donacion)
                .then(function (response) {
                    return response.data;
                },
                function (responseError) {
                    return responseError;
                });
        }

        function savePendienteDonatario(id_donacion) {
            return $http.get('http://soydonar.com/webservices/webresources/donacionGuardarEstado/donatario/' + id_donacion)
                .then(function (response) {
                    return response.data;
                },
                function (responseError) {
                    return responseError;
                });
        }

        function getInfoUsuario(idUsuario) {
            return $http.get('http://soydonar.com/webservices/webresources/infoUsuario/' + idUsuario)
                .then(function (response) {
                    return response.data;
                },
                function (responseError) {
                    return responseError;
                });
        }

        function guardarUsuario(request) {
            return $http.post('http://soydonar.com/webservices/webresources/editUsuario/edit', JSON.stringify(request))
                .then(function (response) {
                    console.log('Usuario edit');
                    console.log(response);
                    return response.data;
                },
                function (responseError) {
                    console.log(responseError);
                    return responseError;
                });
        }

        function getMisDonaciones(idUsuario) {
            return $http.get('http://www.soydonar.com/webservices/webresources/necesidadesPorUsuario/' + idUsuario)
                .then(function (response) {
                    return response.data;
                },
                function (responseError) {
                    return responseError;
                });
        }

        function getFilesInFolder(folder) {
            var fd = new FormData();
            fd.append('folder', folder.replace(/[-]/g, '/'));
            $http.post('../crear_carpeta.php', fd, {
                transformRequest: angular.identity,
                headers: { 'Content-Type': undefined, 'Process-Data': false }
            })
                .success(function (response) {
                    // console.log("Carpeta creada");
                    // console.log(response);
                })
                .error(function (responseError) {
                    // console.log("Error al crear la carpeta");
                    // console.log(responseError);
                });

            return $http.get('http://soydonar.com/webservices/webresources/obtenerarchivos/' + folder)
                .then(function (response) {
                    return $q.resolve(response.data);
                },
                function (responseError) {
                    return $q.reject(responseError);
                });
        }

        function guardarVideo(request) {

            return $http.post('http://www.soydonar.com/webservices/webresources/CargarVideos/carga', JSON.stringify(request))
                .then(function (response) {
                    console.log('Guardar video');
                    console.log(response);
                    return $q.resolve(response.data);
                })
                .catch(function (responseError) {
                    console.log(responseError);
                    return $q.reject(responseError);
                });
        }

        function getVideos(id_necesidad) {
            return $http.get('http://www.soydonar.com/webservices/webresources/verVideos/' + id_necesidad)
                .then(function (response) {
                    console.log('Get videos');
                    console.log(response);
                    return $q.resolve(response.data);
                })
                .catch(function (responseError) {
                    console.log(responseError);
                    return $q.reject(responseError);
                });
        }

        function guardarResultado(request) {
            if (!request.id) {
                return $http.post('http://www.soydonar.com/webservices/webresources/addResultado', JSON.stringify(request))
                    .then(function (response) {
                        console.log('Add resultado');
                        console.log(response);
                        return $q.resolve(response.data);
                    })
                    .catch(function (responseError) {
                        console.log(responseError);
                        return $q.reject(responseError);
                    });
            }
            else {
                return $http.post('http://www.soydonar.com/webservices/webresources/editResultado', JSON.stringify(request))
                    .then(function (response) {
                        console.log('Edit resultado');
                        console.log(response);
                        return $q.resolve(response.data);
                    })
                    .catch(function (responseError) {
                        console.log(responseError);
                        return $q.reject(responseError);
                    });
            }

        }

        function getResultado(id_necesidad) {
            return $http.get('http://www.soydonar.com/webservices/webresources/verResultado/' + id_necesidad)
                .then(function (response) {
                    console.log('Get resultado');
                    console.log(response);
                    return $q.resolve(response.data);
                })
                .catch(function (responseError) {
                    console.log(responseError);
                    return $q.reject(responseError);
                });
        }
    }

    SessionStorageService.$inject = ['$window'];
    function SessionStorageService($window) {
        var service = {
            set: set,
            get: get,
            remove: remove,
            clear: clear
        };

        return service;

        function set(key, value) {
            $window.sessionStorage.setItem(key, JSON.stringify(value));
        }

        function get(key) {
            return JSON.parse($window.sessionStorage.getItem(key));
        }

        function remove(key) {
            $window.sessionStorage.removeItem(key);
        }

        function clear() {
            $window.sessionStorage.clear();
        }
    }
})();
(function () {
    'use strict';

    angular
        .module('donarApp')
        .config([
            '$stateProvider',
            '$urlRouterProvider',
            function ($stateProvider, $urlRouterProvider) {

                // Use $urlRouterProvider to configure any redirects (when) and invalid urls (otherwise).
                $urlRouterProvider
                    //.when('/dashboard', '/')
                    .otherwise('/home');

                $stateProvider
                    // -- ERROR PAGES --
                    .state("error", {
                        url: "/error",
                        templateUrl: 'app/views/error.html'
                    })
                    .state("error.404", {
                        url: "/404",
                        templateUrl: 'app/components/pages/error_404View.html'
                    })
                    .state("error.500", {
                        url: "/500",
                        templateUrl: 'app/components/pages/error_500View.html'
                    })

                    // -- LOGIN PAGE --
                    .state("login", {
                        url: "/login",
                        templateUrl: 'app/views/login/loginView.html',
                        controller: 'LoginController',
                        controllerAs: 'vm',
                        resolve: {
                            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'lazy_iCheck'
                                ]);
                            }]
                        }
                    })
                    // -- RESTRICTED --
                    .state("restricted", {
                        abstract: true,
                        url: "",
                        views: {
                            'main_header': {
                                templateUrl: 'app/shared/header/headerView.html',
                                controller: 'MainHeaderController',
                                controllerAs: 'vm'
                            },
                            //'main_sidebar': {
                            //    templateUrl: 'app/shared/main_sidebar/main_sidebarView.html',
                            //    controller: 'main_sidebarCtrl'
                            //},
                            '': {
                                templateUrl: 'app/views/restricted.html'
                            }
                        },
                        resolve: {
                            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'lazy_selectizeJS',
                                    'lazy_switchery',
                                    'lazy_prismJS',
                                    'lazy_autosize',
                                    'lazy_iCheck',
                                    'lazy_style_switcher',
                                    'lazy_KendoUI'
                                ], { serie: true });
                            }]
                        }
                    })
                    .state("restricted.my-profile", {
                        url: "/mi-perfil",
                        abstract: true,
                        templateUrl: 'app/views/perfil/main-profile.html',
                        resolve: {
                            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load('lazy_KendoUI');
                            }]
                        }
                    })
                    .state("restricted.my-profile.profile", {
                        url: "/perfil",
                        templateUrl: 'app/views/perfil/perfil.html',
                        controller:  'PerfilController',
                        controllerAs:'vm',
                        resolve: {
                            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'assets/js/custom/uikit_fileinput.min.js',
                                    'lazy_dropify',
                                    'app/components/pages/user_editController.js'
                                ], { serie: true });
                            }]
                        }
                    })
                    .state("restricted.my-profile.favorite", {
                        url: "/favoritos",
                        templateUrl: 'app/views/perfil/favorito.html',
                        controller: 'FavoritoController',
                        controllerAs: 'vm'
                    })
                    .state("restricted.my-profile.mis-necesidades", {
                        url: "/mis-necesidades",
                        templateUrl: 'app/views/perfil/mis-necesidades.html',
                        controller: 'MisNecesidadesController',
                        controllerAs: 'vm'
                    })
                    .state("restricted.my-profile.pendiente", {
                        url: "/pendientes",
                        templateUrl: 'app/views/perfil/pendiente.html',
                        controller: 'PendienteController',
                        controllerAs: 'vm'
                    })
                    //Home
                    .state("restricted.home", {
                        url: "/home",
                        templateUrl: 'app/views/home/index.html',
                        controller: 'HomeController',
                        controllerAs: 'vm',
                        resolve: {
                            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'lazy_iCheck',
                                    'lazy_KendoUI'
                                ]);
                            }]
                        }
                    })
                    .state("restricted.donacion", {
                        url: "/Donacion/{id:int}",
                        controller: 'DonacionController',
                        controllerAs: 'vm',
                        templateUrl: 'app/views/donacion/view.html',
                        resolve: {
                            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'lazy_ionRangeSlider'
                                ], { serie: true });
                            }],
                            user_data: function ($http) {
                                return $http({ method: 'GET', url: 'data/user_data.json' })
                                    .then(function (data) {
                                        return data.data;
                                    });
                            }
                        }
                    })
                    .state("restricted.donacion-add", {
                        url: "/Donacion/Alta",
                        controller: 'DonacionAddEditController',
                        controllerAs: 'vm',
                        templateUrl: 'app/views/donacion/add-edit.html',
                        resolve: {
                            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'assets/js/custom/uikit_fileinput.min.js',
                                    'lazy_dropify',
                                    'app/components/pages/user_editController.js'
                                ], { serie: true });
                            }],
                            user_data: function ($http) {
                                return $http({ method: 'GET', url: 'data/user_data.json' })
                                    .then(function (data) {
                                        return data.data;
                                    });
                            },
                            groups_data: function ($http) {
                                return $http({ method: 'GET', url: 'data/groups_data.json' })
                                    .then(function (data) {
                                        return data.data;
                                    });
                            }
                        }
                    })
                    .state("restricted.donacion-edit", {
                        url: "/Donacion/Editar/{id}",
                        controller: 'DonacionAddEditController',
                        controllerAs: 'vm',
                        templateUrl: 'app/views/donacion/add-edit.html',
                        resolve: {
                            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'assets/js/custom/uikit_fileinput.min.js',
                                    'lazy_dropify'
                                ], { serie: true });
                            }]
                        }
                    })
                    .state("restricted.donacion-resultado", {
                        url: "/Donacion/Resultado/{id}",
                        controller: 'DonacionResultadoController',
                        controllerAs: 'vm',
                        templateUrl: 'app/views/donacion/resultado.html',
                        resolve: {
                            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'assets/js/custom/uikit_fileinput.min.js',
                                    'lazy_dropify',
                                    'lazy_ionRangeSlider'
                                ], { serie: true });
                            }]
                        }
                    })
                    // -- DASHBOARD --
                    .state("restricted.dashboard", {
                        url: "/",
                        templateUrl: 'app/components/dashboard/dashboardView.html',
                        controller: 'dashboardCtrl',
                        resolve: {
                            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    // ocLazyLoad config (app/app.js)
                                    'lazy_countUp',
                                    'lazy_charts_peity',
                                    'lazy_charts_easypiechart',
                                    'lazy_charts_metricsgraphics',
                                    'lazy_charts_chartist',
                                    'lazy_weathericons',
                                    'lazy_google_maps',
                                    'lazy_clndr',
                                    'app/components/dashboard/dashboardController.js'
                                ], { serie: true });
                            }],
                            sale_chart_data: function ($http) {
                                return $http({ method: 'GET', url: 'data/mg_dashboard_chart.min.json' })
                                    .then(function (data) {
                                        return data.data;
                                    });
                            },
                            user_data: function ($http) {
                                return $http({ method: 'GET', url: 'data/user_data.json' })
                                    .then(function (data) {
                                        return data.data;
                                    });
                            }
                        },
                        data: {
                            pageTitle: 'Dashboard'
                        }

                    })
                    // -- FORMS --
                    .state("restricted.forms", {
                        url: "/forms",
                        template: '<div ui-view autoscroll="false"/>',
                        abstract: true
                    })
                    .state("restricted.forms.regular", {
                        url: "/regular",
                        templateUrl: 'app/components/forms/regularView.html',
                        controller: 'regularCtrl',
                        resolve: {
                            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load('app/components/forms/regularController.js');
                            }]
                        },
                        data: {
                            pageTitle: 'Regular Elements'
                        }
                    })
                    .state("restricted.forms.advanced", {
                        url: "/advanced",
                        templateUrl: 'app/components/forms/advancedView.html',
                        controller: 'advancedCtrl',
                        resolve: {
                            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'lazy_ionRangeSlider',
                                    'lazy_masked_inputs',
                                    'lazy_character_counter',
                                    'app/components/forms/advancedController.js'
                                ], { serie: true });
                            }]
                        },
                        data: {
                            pageTitle: 'Advanced Elements'
                        }
                    })
                    .state("restricted.forms.file_input", {
                        url: "/file_input",
                        templateUrl: 'app/components/forms/file_inputView.html',
                        controller: 'file_inputCtrl',
                        resolve: {
                            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'lazy_dropify',
                                    'app/components/forms/file_inputController.js'
                                ]);
                            }]
                        },
                        data: {
                            pageTitle: 'File Input (dropify)'
                        }
                    })
                    .state("restricted.forms.file_upload", {
                        url: "/file_upload",
                        templateUrl: 'app/components/forms/file_uploadView.html',
                        controller: 'file_uploadCtrl',
                        resolve: {
                            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load('app/components/forms/file_uploadController.js');
                            }]
                        },
                        data: {
                            pageTitle: 'File Upload'
                        }
                    })
                    .state("restricted.forms.validation", {
                        url: "/validation",
                        templateUrl: 'app/components/forms/validationView.html',
                        controller: 'validationCtrl',
                        resolve: {
                            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'lazy_parsleyjs',
                                    'app/components/forms/validationController.js'
                                ]);
                            }]
                        },
                        data: {
                            pageTitle: 'Validation'
                        }
                    })
                    .state("restricted.forms.wizard", {
                        url: "/wizard",
                        templateUrl: 'app/components/forms/wizardView.html',
                        controller: 'wizardCtrl',
                        resolve: {
                            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'lazy_wizard',
                                    'app/components/forms/wizardController.js'
                                ], { serie: true });
                            }]
                        },
                        data: {
                            pageTitle: 'Wizard'
                        }
                    })
                    .state("restricted.forms.wysiwyg_ckeditor", {
                        url: "/wysiwyg_ckeditor",
                        templateUrl: 'app/components/forms/wysiwyg_ckeditorView.html',
                        controller: 'ckeditorCtrl',
                        resolve: {
                            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'lazy_ckeditor',
                                    'app/components/forms/wysiwyg_ckeditorController.js'
                                ], { serie: true });
                            }]
                        },
                        data: {
                            pageTitle: 'ckEditor'
                        }
                    })
                    .state("restricted.forms.wysiwyg_tinymce", {
                        url: "/wysiwyg_tinymce",
                        templateUrl: 'app/components/forms/wysiwyg_tinymceView.html',
                        controller: 'tinymceCtrl',
                        resolve: {
                            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'lazy_tinymce',
                                    'app/components/forms/wysiwyg_tinymceController.js'
                                ], { serie: true });
                            }]
                        },
                        data: {
                            pageTitle: 'tinyMCE'
                        }
                    })

                    // -- LAYOUT --
                    .state("restricted.layout", {
                        url: "/layout",
                        template: '<div ui-view autoscroll="false"/>',
                        abstract: true
                    })
                    .state("restricted.layout.top_menu", {
                        url: "/top_menu",
                        templateUrl: 'app/components/layout/top_menuView.html',
                        controller: 'top_menuCtrl',
                        resolve: {
                            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load('app/components/layout/top_menuController.js');
                            }]
                        },
                        data: {
                            pageTitle: 'Top Menu'
                        }
                    })
                    .state("restricted.layout.full_header", {
                        url: "/full_header",
                        templateUrl: 'app/components/layout/full_headerView.html',
                        controller: 'full_headerCtrl',
                        resolve: {
                            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load('app/components/layout/full_headerController.js');
                            }]
                        },
                        data: {
                            pageTitle: 'Full Header'
                        }
                    })

                    // -- KENDO UI --
                    .state("restricted.kendoui", {
                        url: "/kendoui",
                        template: '<div ui-view autoscroll="false"/>',
                        abstract: true,
                        resolve: {
                            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load('lazy_KendoUI');
                            }]
                        }
                    })
                    .state("restricted.kendoui.autocomplete", {
                        url: "/autocomplete",
                        templateUrl: 'app/components/kendoUI/autocompleteView.html',
                        controller: 'autocompleteCtrl',
                        resolve: {
                            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load('app/components/kendoUI/autocompleteController.js');
                            }]
                        },
                        data: {
                            pageTitle: 'Autocomplete (kendoUI)'
                        }
                    })
                    .state("restricted.kendoui.calendar", {
                        url: "/calendar",
                        templateUrl: 'app/components/kendoUI/calendarView.html',
                        controller: 'calendarCtrl',
                        resolve: {
                            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load('app/components/kendoUI/calendarController.js');
                            }]
                        },
                        data: {
                            pageTitle: 'Calendar (kendoUI)'
                        }
                    })
                    .state("restricted.kendoui.colorpicker", {
                        url: "/colorPicker",
                        templateUrl: 'app/components/kendoUI/colorPickerView.html',
                        data: {
                            pageTitle: 'ColorPicker (kendoUI)'
                        }
                    })
                    .state("restricted.kendoui.combobox", {
                        url: "/combobox",
                        templateUrl: 'app/components/kendoUI/comboboxView.html',
                        controller: 'comboboxCtrl',
                        resolve: {
                            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load('app/components/kendoUI/comboboxController.js');
                            }]
                        },
                        data: {
                            pageTitle: 'Combobox (kendoUI)'
                        }
                    })
                    .state("restricted.kendoui.datepicker", {
                        url: "/datepicker",
                        templateUrl: 'app/components/kendoUI/datepickerView.html',
                        controller: 'datepickerCtrl',
                        resolve: {
                            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load('app/components/kendoUI/datepickerController.js');
                            }]
                        },
                        data: {
                            pageTitle: 'Datepicker (kendoUI)'
                        }
                    })
                    .state("restricted.kendoui.datetimepicker", {
                        url: "/datetimepicker",
                        templateUrl: 'app/components/kendoUI/datetimepickerView.html',
                        controller: 'datetimepickerCtrl',
                        resolve: {
                            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load('app/components/kendoUI/datetimepickerController.js');
                            }]
                        },
                        data: {
                            pageTitle: 'Datetimepicker (kendoUI)'
                        }
                    })
                    .state("restricted.kendoui.dropdown_list", {
                        url: "/dropdown_list",
                        templateUrl: 'app/components/kendoUI/dropdown_listView.html',
                        controller: 'dropdownListCtrl',
                        resolve: {
                            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load('app/components/kendoUI/dropdown_listController.js');
                            }]
                        },
                        data: {
                            pageTitle: 'Dropdown List (kendoUI)'
                        }
                    })
                    .state("restricted.kendoui.masked_input", {
                        url: "/masked_input",
                        templateUrl: 'app/components/kendoUI/masked_inputView.html',
                        controller: 'maskedInputCtrl',
                        resolve: {
                            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load('app/components/kendoUI/masked_inputController.js');
                            }]
                        },
                        data: {
                            pageTitle: 'Masked Input (kendoUI)'
                        }
                    })
                    .state("restricted.kendoui.menu", {
                        url: "/menu",
                        templateUrl: 'app/components/kendoUI/menuView.html',
                        controller: 'menuCtrl',
                        resolve: {
                            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load('app/components/kendoUI/menuController.js');
                            }]
                        },
                        data: {
                            pageTitle: 'Menu (kendoUI)'
                        }
                    })
                    .state("restricted.kendoui.multiselect", {
                        url: "/multiselect",
                        templateUrl: 'app/components/kendoUI/multiselectView.html',
                        controller: 'multiselectCtrl',
                        resolve: {
                            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load('app/components/kendoUI/multiselectController.js');
                            }]
                        },
                        data: {
                            pageTitle: 'Multiselect (kendoUI)'
                        }
                    })
                    .state("restricted.kendoui.numeric_textbox", {
                        url: "/numeric_textbox",
                        templateUrl: 'app/components/kendoUI/numeric_textboxView.html',
                        controller: 'numericTextboxCtrl',
                        resolve: {
                            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load('app/components/kendoUI/numeric_textboxController.js');
                            }]
                        },
                        data: {
                            pageTitle: 'Numeric textbox (kendoUI)'
                        }
                    })
                    .state("restricted.kendoui.panelbar", {
                        url: "/panelbar",
                        templateUrl: 'app/components/kendoUI/panelbarView.html',
                        data: {
                            pageTitle: 'PanelBar (kendoUI)'
                        }
                    })
                    .state("restricted.kendoui.timepicker", {
                        url: "/timepicker",
                        templateUrl: 'app/components/kendoUI/timepickerView.html',
                        data: {
                            pageTitle: 'Timepicker (kendoUI)'
                        }
                    })
                    .state("restricted.kendoui.toolbar", {
                        url: "/toolbar",
                        templateUrl: 'app/components/kendoUI/toolbarView.html',
                        controller: 'toolbarCtrl',
                        resolve: {
                            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load('app/components/kendoUI/toolbarController.js');
                            }]
                        },
                        data: {
                            pageTitle: 'Toolbar (kendoUI)'
                        }
                    })
                    .state("restricted.kendoui.window", {
                        url: "/window",
                        templateUrl: 'app/components/kendoUI/windowView.html',
                        controller: 'windowCtrl',
                        resolve: {
                            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load('app/components/kendoUI/windowController.js');
                            }]
                        },
                        data: {
                            pageTitle: 'Window (kendoUI)'
                        }
                    })
                    // -- COMPONENTS --
                    .state("restricted.components", {
                        url: "/components",
                        template: '<div ui-view autoscroll="false"/>',
                        abstract: true
                    })
                    .state("restricted.components.accordion", {
                        url: "/accordion",
                        templateUrl: 'app/components/components/accordionView.html',
                        data: {
                            pageTitle: 'Accordion (components)'
                        }
                    })
                    .state("restricted.components.buttons", {
                        url: "/buttons",
                        templateUrl: 'app/components/components/buttonsView.html',
                        data: {
                            pageTitle: 'Buttons (components)'
                        }
                    })
                    .state("restricted.components.buttons_fab", {
                        url: "/buttons_fab",
                        templateUrl: 'app/components/components/fabView.html',
                        data: {
                            pageTitle: 'Buttons FAB (components)'
                        }
                    })
                    .state("restricted.components.cards", {
                        url: "/cards",
                        templateUrl: 'app/components/components/cardsView.html',
                        controller: 'cardsCtrl',
                        resolve: {
                            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load('app/components/components/cardsController.js');
                            }]
                        },
                        data: {
                            pageTitle: 'Cards (components)'
                        }
                    })
                    .state("restricted.components.colors", {
                        url: "/colors",
                        templateUrl: 'app/components/components/colorsView.html',
                        data: {
                            pageTitle: 'Colors (components)'
                        }
                    })
                    .state("restricted.components.common", {
                        url: "/common",
                        templateUrl: 'app/components/components/commonView.html',
                        data: {
                            pageTitle: 'Common (components)'
                        }
                    })
                    .state("restricted.components.dropdowns", {
                        url: "/dropdowns",
                        templateUrl: 'app/components/components/dropdownsView.html',
                        data: {
                            pageTitle: 'Dropdowns (components)'
                        }
                    })
                    .state("restricted.components.dynamic_grid", {
                        url: "/dynamic_grid",
                        templateUrl: 'app/components/components/dynamic_gridView.html',
                        data: {
                            pageTitle: 'Dynamic Grid (components)'
                        }
                    })
                    .state("restricted.components.grid", {
                        url: "/grid",
                        templateUrl: 'app/components/components/gridView.html',
                        data: {
                            pageTitle: 'Grid (components)'
                        }
                    })
                    .state("restricted.components.icons", {
                        url: "/icons",
                        templateUrl: 'app/components/components/iconsView.html',
                        data: {
                            pageTitle: 'Icons (components)'
                        }
                    })
                    .state("restricted.components.lists", {
                        url: "/lists",
                        templateUrl: 'app/components/components/listsView.html',
                        data: {
                            pageTitle: 'Lists (components)'
                        }
                    })
                    .state("restricted.components.modal", {
                        url: "/modal",
                        templateUrl: 'app/components/components/modalView.html',
                        data: {
                            pageTitle: 'Modals/Lightboxes (components)'
                        }
                    })
                    .state("restricted.components.nestable", {
                        url: "/nestable",
                        templateUrl: 'app/components/components/nestableView.html',
                        controller: 'nestableCtrl',
                        resolve: {
                            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load('app/components/components/nestableController.js');
                            }]
                        },
                        data: {
                            pageTitle: 'Nestable (components)'
                        }
                    })
                    .state("restricted.components.notifications", {
                        url: "/notifications",
                        templateUrl: 'app/components/components/notificationsView.html',
                        controller: 'notificationsCtrl',
                        resolve: {
                            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load('app/components/components/notificationsController.js');
                            }]
                        },
                        data: {
                            pageTitle: 'Notifications (components)'
                        }
                    })
                    .state("restricted.components.panels", {
                        url: "/panels",
                        templateUrl: 'app/components/components/panelsView.html',
                        data: {
                            pageTitle: 'Panels (components)'
                        }
                    })
                    .state("restricted.components.preloaders", {
                        url: "/preloaders",
                        templateUrl: 'app/components/components/preloadersView.html',
                        controller: 'preloadersCtrl',
                        resolve: {
                            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load('app/components/components/preloadersController.js');
                            }]
                        },
                        data: {
                            pageTitle: 'Preloaders (components)'
                        }
                    })
                    .state("restricted.components.slideshow", {
                        url: "/slideshow",
                        templateUrl: 'app/components/components/slideshowView.html',
                        data: {
                            pageTitle: 'Slideshow (components)'
                        }
                    })
                    .state("restricted.components.sortable", {
                        url: "/sortable",
                        templateUrl: 'app/components/components/sortableView.html',
                        controller: 'sortableCtrl',
                        resolve: {
                            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'lazy_dragula',
                                    'app/components/components/sortableController.js'
                                ], { serie: true });
                            }]
                        },
                        data: {
                            pageTitle: 'Sortable (components)'
                        }
                    })
                    .state("restricted.components.tables_examples", {
                        url: "/tables_examples",
                        templateUrl: 'app/components/components/tables_examplesView.html',
                        data: {
                            pageTitle: 'Tables Examples (components)'
                        }
                    })
                    .state("restricted.components.tables", {
                        url: "/tables",
                        templateUrl: 'app/components/components/tablesView.html',
                        data: {
                            pageTitle: 'Tables (components)'
                        }
                    })
                    .state("restricted.components.tabs", {
                        url: "/tabs",
                        templateUrl: 'app/components/components/tabsView.html',
                        data: {
                            pageTitle: 'Tabs (components)'
                        }
                    })
                    .state("restricted.components.tooltips", {
                        url: "/tooltips",
                        templateUrl: 'app/components/components/tooltipsView.html',
                        data: {
                            pageTitle: 'Tooltips (components)'
                        }
                    })
                    .state("restricted.components.typography", {
                        url: "/typography",
                        templateUrl: 'app/components/components/typographyView.html',
                        data: {
                            pageTitle: 'Typography (components)'
                        }
                    })
                    // -- E-COMMERCE --
                    .state("restricted.ecommerce", {
                        url: "/ecommerce",
                        template: '<div ui-view autoscroll="false"/>',
                        abstract: true
                    })
                    .state("restricted.ecommerce.product_details", {
                        url: "/product_details",
                        templateUrl: 'app/components/ecommerce/product_detailsView.html',
                        controller: 'productCtrl',
                        resolve: {
                            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'app/components/ecommerce/productController.js'
                                ]);
                            }]
                        },
                        data: {
                            pageTitle: 'Product Details'
                        }
                    })
                    .state("restricted.ecommerce.product_edit", {
                        url: "/product_edit",
                        templateUrl: 'app/components/ecommerce/product_editView.html',
                        controller: 'productCtrl',
                        resolve: {
                            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'app/components/ecommerce/productController.js'
                                ]);
                            }]
                        },
                        data: {
                            pageTitle: 'Product Edit'
                        }
                    })
                    .state("restricted.ecommerce.products_list", {
                        url: "/products_list",
                        templateUrl: 'app/components/ecommerce/products_listView.html',
                        controller: 'products_listCtrl',
                        resolve: {
                            products_data: function ($http) {
                                return $http({ method: 'GET', url: 'data/ecommerce_products.json' })
                                    .then(function (data) {
                                        return data.data;
                                    });
                            },
                            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'lazy_pagination',
                                    'app/components/ecommerce/products_listController.js'
                                ], { serie: true });
                            }]
                        },
                        data: {
                            pageTitle: 'Products List'
                        }
                    })
                    .state("restricted.ecommerce.products_grid", {
                        url: "/products_grid",
                        templateUrl: 'app/components/ecommerce/products_gridView.html',
                        controller: 'products_gridCtrl',
                        resolve: {
                            products_data: function ($http) {
                                return $http({ method: 'GET', url: 'data/ecommerce_products.json' })
                                    .then(function (data) {
                                        return data.data;
                                    });
                            },
                            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'app/components/ecommerce/products_gridController.js'
                                ], { serie: true });
                            }]
                        },
                        data: {
                            pageTitle: 'Products Grid'
                        }
                    })
                    // -- PLUGINS --
                    .state("restricted.plugins", {
                        url: "/plugins",
                        template: '<div ui-view autoscroll="false"/>',
                        abstract: true
                    })
                    .state("restricted.plugins.calendar", {
                        url: "/calendar",
                        templateUrl: 'app/components/plugins/calendarView.html',
                        controller: 'calendarCtrl',
                        resolve: {
                            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'lazy_fullcalendar',
                                    'app/components/plugins/calendarController.js'
                                ]);
                            }]
                        },
                        data: {
                            pageTitle: 'Calendar'
                        }
                    })
                    .state("restricted.plugins.code_editor", {
                        url: "/code_editor",
                        templateUrl: 'app/components/plugins/code_editorView.html',
                        controller: 'code_editorCtrl',
                        resolve: {
                            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'lazy_codemirror',
                                    'app/components/plugins/code_editorController.js'
                                ]);
                            }]
                        },
                        data: {
                            pageTitle: 'Code Editor'
                        }
                    })
                    .state("restricted.plugins.charts", {
                        url: "/charts",
                        templateUrl: 'app/components/plugins/chartsView.html',
                        controller: 'chartsCtrl',
                        resolve: {
                            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'lazy_charts_chartist',
                                    'lazy_charts_metricsgraphics',
                                    'lazy_charts_c3',
                                    'app/components/plugins/chartsController.js'
                                ], { serie: true });
                            }],
                            mg_chart_linked_1: function ($http) {
                                return $http({ method: 'GET', url: 'data/mg_brief-1.json' })
                                    .then(function (data) {
                                        return data.data;
                                    });
                            },
                            mg_chart_linked_2: function ($http) {
                                return $http({ method: 'GET', url: 'data/mg_brief-2.json' })
                                    .then(function (data) {
                                        return data.data;
                                    });
                            },
                            mg_confidence_band: function ($http) {
                                return $http({ method: 'GET', url: 'data/mg_confidence_band.json' })
                                    .then(function (data) {
                                        return data.data;
                                    });
                            },
                            mg_currency: function ($http) {
                                return $http({ method: 'GET', url: 'data/mg_some_currency.json' })
                                    .then(function (data) {
                                        return data.data;
                                    });
                            }
                        },
                        data: {
                            pageTitle: 'Charts'
                        }
                    })
                    .state("restricted.plugins.datatables", {
                        url: "/datatables",
                        templateUrl: 'app/components/plugins/datatablesView.html',
                        resolve: {
                            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'bower_components/angular-resource/angular-resource.min.js',
                                    'lazy_datatables',
                                    'app/components/plugins/datatablesController.js'
                                ]);
                            }]
                        },
                        data: {
                            pageTitle: 'Datatables'
                        }
                    })
                    .state("restricted.plugins.diff_view", {
                        url: "/diff_view",
                        templateUrl: 'app/components/plugins/diff_viewView.html',
                        controller: 'diff_viewCtrl',
                        resolve: {
                            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'lazy_diff',
                                    'app/components/plugins/diff_viewController.js'
                                ], { serie: true });
                            }]
                        },
                        data: {
                            pageTitle: 'Diff View'
                        }
                    })
                    .state("restricted.plugins.gantt_chart", {
                        url: "/gantt_chart",
                        controller: 'gantt_chartCtrl',
                        templateUrl: 'app/components/plugins/gantt_chartView.html',
                        resolve: {
                            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'lazy_gantt_chart',
                                    'app/components/plugins/gantt_chartController.js'
                                ]);
                            }]
                        },
                        data: {
                            pageTitle: 'Gantt Chart'
                        }
                    })
                    .state("restricted.plugins.google_maps", {
                        url: "/google_maps",
                        templateUrl: 'app/components/plugins/google_mapsView.html',
                        resolve: {
                            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'lazy_google_maps',
                                    'app/components/plugins/google_mapsController.js'
                                ]);
                            }]
                        },
                        data: {
                            pageTitle: 'Google Maps'
                        }
                    })
                    .state("restricted.plugins.tablesorter", {
                        url: "/tablesorter",
                        templateUrl: 'app/components/plugins/tablesorterView.html',
                        controller: 'tablesorterCtrl',
                        resolve: {
                            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'lazy_tablesorter',
                                    'app/components/plugins/tablesorterController.js'
                                ], { serie: true });
                            }],
                            ts_data: function ($http) {
                                return $http({ method: 'GET', url: 'data/tablesorter.json' })
                                    .then(function (data) {
                                        return data.data;
                                    });
                            }
                        },
                        data: {
                            pageTitle: 'Tablesorter'
                        }
                    })
                    .state("restricted.plugins.tree", {
                        url: "/tree",
                        templateUrl: 'app/components/plugins/treeView.html',
                        controller: 'treeCtrl',
                        resolve: {
                            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'lazy_tree',
                                    'app/components/plugins/treeController.js'
                                ]);
                            }]
                        },
                        data: {
                            pageTitle: 'Tree'
                        }
                    })
                    .state("restricted.plugins.vector_maps", {
                        url: "/vector_maps",
                        templateUrl: 'app/components/plugins/vector_mapsView.html',
                        controller: 'vector_mapsCtrl',
                        resolve: {
                            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'lazy_vector_maps',
                                    'app/components/plugins/vector_mapsController.js'
                                ]);
                            }]
                        },
                        data: {
                            pageTitle: 'Vector Maps'
                        }
                    })

                    // -- PAGES --
                    .state("restricted.pages", {
                        url: "/pages",
                        template: '<div ui-view autoscroll="false" ng-class="{ \'uk-height-1-1\': page_full_height }" />',
                        abstract: true
                    })
                    .state("restricted.pages.blank", {
                        url: "/blank",
                        templateUrl: 'app/components/pages/blankView.html',
                        data: {
                            pageTitle: 'Blank Page'
                        }
                    })
                    .state("restricted.pages.chat", {
                        url: "/chat",
                        templateUrl: 'app/components/pages/chatView.html',
                        controller: 'chatCtrl',
                        resolve: {
                            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'app/components/pages/chatController.js'
                                ]);
                            }]
                        },
                        data: {
                            pageTitle: 'Chat'
                        }
                    })
                    .state("restricted.pages.contact_list", {
                        url: "/contact_list",
                        templateUrl: 'app/components/pages/contact_listView.html',
                        controller: 'contact_listCtrl',
                        resolve: {
                            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'app/components/pages/contact_listController.js'
                                ], { serie: true });
                            }],
                            contact_list: function ($http) {
                                return $http({ method: 'GET', url: 'data/contact_list.json' })
                                    .then(function (data) {
                                        return data.data;
                                    });
                            }
                        },
                        data: {
                            pageTitle: 'Contact List'
                        }
                    })
                    .state("restricted.pages.gallery", {
                        url: "/gallery",
                        templateUrl: 'app/components/pages/galleryView.html',
                        controller: 'galleryCtrl',
                        resolve: {
                            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'app/components/pages/galleryController.js'
                                ], { serie: true });
                            }]
                        },
                        data: {
                            pageTitle: 'Gallery'
                        }
                    })
                    .state("restricted.pages.help", {
                        url: "/help",
                        templateUrl: 'app/components/pages/helpView.html',
                        controller: 'helpCtrl',
                        resolve: {
                            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'app/components/pages/helpController.js'
                                ], { serie: true });
                            }],
                            help_data: function ($http) {
                                return $http({ method: 'GET', url: 'data/help_faq.json' })
                                    .then(function (data) {
                                        return data.data;
                                    });
                            }
                        },
                        data: {
                            pageTitle: 'Help Center'
                        }
                    })
                    .state("restricted.pages.invoices", {
                        url: "/invoices",
                        abstract: true,
                        templateUrl: 'app/components/pages/invoices_listView.html',
                        controller: 'invoicesCtrl',
                        resolve: {
                            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load('app/components/pages/invoicesController.js');
                            }],
                            invoices_data: function ($http) {
                                return $http({ method: 'GET', url: 'data/invoices_data.json' })
                                    .then(function (data) {
                                        return data.data;
                                    });
                            }
                        }
                    })
                    .state("restricted.pages.invoices.list", {
                        url: "/list",
                        views: {
                            'ivoice_content': {
                                templateUrl: 'app/components/pages/invoices_blankView.html',
                                controller: 'invoicesCtrl'
                            }
                        },
                        data: {
                            pageTitle: 'Invoices'
                        }
                    })
                    .state("restricted.pages.invoices.details", {
                        url: "/details/{invoiceId:[0-9]{1,4}}",
                        views: {
                            'ivoice_content': {
                                templateUrl: 'app/components/pages/invoices_detailView.html',
                                controller: 'invoicesCtrl'
                            }
                        },
                        params: { hidePreloader: true }
                    })
                    .state("restricted.pages.invoices.add", {
                        url: "/add",
                        views: {
                            'ivoice_content': {
                                templateUrl: 'app/components/pages/invoices_addView.html',
                                controller: 'invoicesCtrl'
                            }
                        },
                        params: { hidePreloader: true }
                    })
                    .state("restricted.pages.mailbox", {
                        url: "/mailbox",
                        templateUrl: 'app/components/pages/mailboxView.html',
                        controller: 'mailboxCtrl',
                        resolve: {
                            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load('app/components/pages/mailboxController.js');
                            }],
                            messages: function ($http) {
                                return $http({ method: 'GET', url: 'data/mailbox_data.json' })
                                    .then(function (data) {
                                        return data.data;
                                    });
                            }
                        },
                        data: {
                            pageTitle: 'Mailbox'
                        }
                    })
                    .state("restricted.pages.notes", {
                        url: "/notes",
                        templateUrl: 'app/components/pages/notesView.html',
                        controller: 'notesCtrl',
                        resolve: {
                            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'app/components/pages/notesController.js'
                                ]);
                            }],
                            notes_data: function ($http) {
                                return $http({ method: 'GET', url: 'data/notes_data.json' })
                                    .then(function (data) {
                                        return data.data;
                                    });
                            }
                        },
                        data: {
                            pageTitle: 'Notes'
                        }
                    })
                    .state("restricted.pages.pricing_tables", {
                        url: "/pricing_tables",
                        templateUrl: 'app/components/pages/pricing_tablesView.html',
                        data: {
                            pageTitle: 'Pricing Tables'
                        }
                    })
                    .state("restricted.pages.scrum_board", {
                        url: "/scrum_board",
                        templateUrl: 'app/components/pages/scrum_boardView.html',
                        controller: 'scrum_boardCtrl',
                        resolve: {
                            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'lazy_dragula',
                                    'app/components/pages/scrum_boardController.js'
                                ], { serie: true });
                            }],
                            tasks_list: function ($http) {
                                return $http({ method: 'GET', url: 'data/tasks_list.json' })
                                    .then(function (data) {
                                        return data.data;
                                    });
                            }
                        },
                        data: {
                            pageTitle: 'Scrum Board'
                        }
                    })
                    .state("restricted.pages.settings", {
                        url: "/settings",
                        templateUrl: 'app/components/pages/settingsView.html',
                        controller: 'settingsCtrl',
                        resolve: {
                            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load('app/components/pages/settingsController.js')
                            }]
                        },
                        data: {
                            pageTitle: 'Settings'
                        }
                    })
                    .state("restricted.pages.snippets", {
                        url: "/snippets",
                        templateUrl: 'app/components/pages/snippetsView.html',
                        controller: 'snippetsCtrl',
                        resolve: {
                            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'app/components/pages/snippetsController.js'
                                ]);
                            }],
                            snippets_data: function ($http) {
                                return $http({ method: 'GET', url: 'data/snippets.json' })
                                    .then(function (data) {
                                        return data.data;
                                    });
                            }
                        },
                        data: {
                            pageTitle: 'Snippets'
                        }
                    })
                    .state("restricted.pages.todo", {
                        url: "/todo",
                        templateUrl: 'app/components/pages/todoView.html',
                        controller: 'todoCtrl',
                        resolve: {
                            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'app/components/pages/todoController.js'
                                ]);
                            }],
                            todo_data: function ($http) {
                                return $http({ method: 'GET', url: 'data/todo_data.json' })
                                    .then(function (data) {
                                        return data.data;
                                    });
                            }
                        },
                        data: {
                            pageTitle: 'User profile'
                        }
                    })
                    .state("restricted.pages.user_profile", {
                        url: "/user_profile",
                        templateUrl: 'app/components/pages/user_profileView.html',
                        controller: 'user_profileCtrl',
                        resolve: {
                            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'app/components/pages/user_profileController.js'
                                ]);
                            }],
                            user_data: function ($http) {
                                return $http({ method: 'GET', url: 'data/user_data.json' })
                                    .then(function (data) {
                                        return data.data;
                                    });
                            }
                        },
                        data: {
                            pageTitle: 'User profile'
                        }
                    })
                    .state("restricted.pages.user_edit", {
                        url: "/user_edit",
                        templateUrl: 'app/components/pages/user_editView.html',
                        controller: 'user_editCtrl',
                        resolve: {
                            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'assets/js/custom/uikit_fileinput.min.js',
                                    'app/components/pages/user_editController.js'
                                ], { serie: true });
                            }],
                            user_data: function ($http) {
                                return $http({ method: 'GET', url: 'data/user_data.json' })
                                    .then(function (data) {
                                        return data.data;
                                    });
                            },
                            groups_data: function ($http) {
                                return $http({ method: 'GET', url: 'data/groups_data.json' })
                                    .then(function (data) {
                                        return data.data;
                                    });
                            }
                        },
                        data: {
                            pageTitle: 'User edit'
                        }
                    })
                    .state("restricted.pages.issues", {
                        url: "/issues",
                        abstract: true,
                        template: '<div ui-view autoscroll="false" ng-class="{ \'uk-height-1-1\': page_full_height }" />',
                        resolve: {
                            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'lazy_tablesorter',
                                    'app/components/pages/issuesController.js'
                                ]);
                            }],
                            issues_data: function ($http) {
                                return $http({ method: 'GET', url: 'data/issues.json' })
                                    .then(function (data) {
                                        return data.data;
                                    });
                            }
                        }
                    })
                    .state("restricted.pages.issues.list", {
                        url: "/list",
                        templateUrl: 'app/components/pages/issues_listView.html',
                        controller: 'issuesCtrl',
                        data: {
                            pageTitle: 'Issues List'
                        }
                    })
                    .state("restricted.pages.issues.details", {
                        url: "/details/{issueId:[0-9]{1,4}}",
                        controller: 'issuesCtrl',
                        templateUrl: 'app/components/pages/issue_detailsView.html',
                        data: {
                            pageTitle: 'Issue Details'
                        }
                    })
                    .state("restricted.pages.blog", {
                        url: "/blog",
                        template: '<div ui-view autoscroll="false" ng-class="{ \'uk-height-1-1\': page_full_height }" />',
                        controller: 'blogCtrl',
                        resolve: {
                            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'app/components/pages/blogController.js'
                                ]);
                            }],
                            blog_articles: function ($http) {
                                return $http({ method: 'GET', url: 'data/blog_articles.json' })
                                    .then(function (data) {
                                        return data.data;
                                    });
                            }
                        },
                        abstract: true
                    })
                    .state("restricted.pages.blog.list", {
                        url: "/list",
                        controller: 'blogCtrl',
                        templateUrl: 'app/components/pages/blog_listView.html',
                        data: {
                            pageTitle: 'Blog List'
                        }
                    })
                    .state("restricted.pages.blog.article", {
                        url: "/article/{articleId:[0-9]{1,4}}",
                        controller: 'blogCtrl',
                        templateUrl: 'app/components/pages/blog_articleView.html',
                        data: {
                            pageTitle: 'Blog Article'
                        }
                    })
            }
        ]);
})();
angular
    .module('donarApp').directive('fileModel', ['$parse', '$http', function ($parse, $http) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var model = $parse(attrs.fileModel);
                var modelSetter = model.assign;
                var carpeta = null;
                if (attrs.fileCarpeta) {
                    carpeta = attrs.fileCarpeta;
                }

                element.bind('change', function () {
                    scope.$apply(function () {
                        var file = null;

                        if (element[0] && element[0].attributes.length > 0 && element[0].attributes['file-carpeta']) {
                            carpeta = element[0].attributes['file-carpeta'].nodeValue;
                        }

                        if (element[0].type && element[0].type === 'file') {
                            modelSetter(scope, element[0].files[0]);
                            file = element[0].files[0];
                        }
                        else {
                            var fileInput = element[0].children[1];
                            modelSetter(scope, fileInput.files[0]);
                            file = fileInput.files[0];
                        }

                        if (carpeta && file) {
                            var fd = new FormData();
                            fd.append('file', file);
                            fd.append('folder', carpeta);
                            $http.post('../subir_imagen.php', fd, {
                                transformRequest: angular.identity,
                                headers: { 'Content-Type': undefined, 'Process-Data': false }
                            })
                                .success(function (response) {
                                    console.log("Lista la imagen");
                                    console.log(response);
                                })
                                .error(function (responseError) {
                                    console.log("Error al listar la imagen");
                                    console.log(responseError);
                                });
                        }

                    });
                });
            }
        };
    }]);

// We can write our own fileUpload service to reuse it in the controller
angular
    .module('donarApp').service('fileUpload', ['$http', function ($http) {
        this.uploadFileToUrl = function (file, uploadUrl, folder) {
            var fd = new FormData();
            fd.append('file', file);
            fd.append('folder', folder);
            return $http.post(uploadUrl, fd, {
                transformRequest: angular.identity,
                headers: { 'Content-Type': undefined, 'Process-Data': false }
            });
        }
    }]);
(function () {
    "use strict";

    angular
        .module('donarApp')
        .controller('DonacionAddEditController', DonacionAddEditController);

    DonacionAddEditController.$inject = ['fileUpload', '$http', '$rootScope', '$state', '$stateParams', '$scope', 'SessionStorageService', 'ServerService', '$timeout'];

    function DonacionAddEditController(fileUpload, $http, $rootScope, $state, $stateParams, $scope, SessionStorageService, ServerService, $timeout) {
        var vm = this;

        //Variables
        vm.usuarioLogueado = {};
        vm.donacion = {};
        vm.categorias = [];
        vm.categorias_config = {};
        vm.tipo_config = {};
        vm.tipo_options = [];
        vm.isNew = true;
        vm.imagen = {};
        vm.images = [];
        vm.videos = [];
        vm.video = {};

        //Methods:
        vm.save = save;
        vm.subirImagen = subirImagen;
        vm.getYTLink = getYTLink;
        vm.subirVideo = subirVideo;

        activate();

        function activate() {
            $('#input-file-a-galeria').dropify({
                messages: {
                    default: 'Imagen default',
                    replace: 'Haga click para reemplazar',
                    remove: 'Eliminar',
                    error: 'Hubo un error'
                }
            })
                .on('dropify.afterClear', function (event, element) {
                    $scope.imagenGaleria = null;
                });

            vm.usuarioLogueado = SessionStorageService.get('usuario');
            if (!vm.usuarioLogueado) {
                $state.go('restricted.home');
            }

            if ($stateParams.id) {
                vm.isNew = false;

                ServerService.getDonacion($stateParams.id)
                    .then(function (data) {
                        console.log(data);
                        vm.donacion = data;

                        if (vm.usuarioLogueado && vm.usuarioLogueado.usuario !== vm.donacion.usuario) {
                            UIkit.notify({
                                message: '<i class="uk-icon-times-circle"></i> No tiene permisos para editar esta necesidad.',
                                status: 'danger',
                                timeout: 5000,
                                pos: 'top-right'
                            });

                            $state.go('restricted.home');
                            vm.isCreatedUser = false;

                            return;
                        }

                        //Valido la no existencia de la imagen:
                        if (vm.donacion.imagen_path && vm.donacion.imagen_path.indexOf('.') === -1) {
                            vm.donacion.imagen_path = 'prueba.png';
                        }

                        //Valido la conversion del nro que viene desde el server:
                        if (vm.donacion.dineroTotal && vm.donacion.dineroTotal.replace(/[^.,0-9]/ig, '').length > 0) {
                            vm.donacion.dineroTotal = parseFloat(vm.donacion.dineroTotal);
                        }

                        ServerService.getFilesInFolder('galeria-' + $stateParams.id)
                            .then(function (data) {
                                vm.images = data;
                            });

                        ServerService.getVideos($stateParams.id)
                            .then(function (data) {
                                vm.videos = data;
                            });

                        //vm.videos = ServerService.getVideos($stateParams.id);

                        if (vm.usuarioLogueado && vm.usuarioLogueado.usuario === vm.donacion.usuario) {
                            vm.isCreatedUser = true;
                        }

                        if (vm.donacion.imagen_path) {
                            $('.dropify').dropify({
                                messages: {
                                    default: 'Imagen default',
                                    replace: 'Haga click para reemplazar',
                                    remove: 'Eliminar',
                                    error: 'Hubo un error'
                                },
                                defaultFile: 'http://www.soydonar.com/imagenes/necesidades/' + vm.donacion.imagen_path
                            })
                                .on('dropify.afterClear', function (event, element) {
                                    $scope.imagen = null;
                                });
                        }
                        else {
                            $('.dropify').dropify({
                                messages: {
                                    default: 'Imagen default',
                                    replace: 'Haga click para reemplazar',
                                    remove: 'Eliminar',
                                    error: 'Hubo un error'
                                },
                                defaultFile: 'http://www.soydonar.com/imagenes/necesidades/prueba.png'
                            })
                                .on('dropify.afterClear', function (event, element) {
                                    $scope.imagen = null;
                                });
                        }
                    });

                // vm.blog_articles = [];
                // $http({ method: 'GET', url: 'data/blog_articles.json' })
                //     .then(function (data) {
                //         vm.blog_articles = data.data;
                //         console.log('Videos:');
                //         console.log(data.data);
                //     });
            }
            else {

                vm.donacion.avatar = vm.usuarioLogueado.imagen_path;
                vm.donacion.cant_likes = 0;
                vm.donacion.cant_fotos = 0;
                vm.donacion.cant_favs = 0;
                vm.isCreatedUser = true;

                $('.dropify').dropify({
                    messages: {
                        default: 'Imagen default',
                        replace: 'Haga click para reemplazar',
                        remove: 'Eliminar',
                        error: 'Hubo un error'
                    },
                    defaultFile: 'http://www.soydonar.com/imagenes/necesidades/prueba.png'
                })
                    .on('dropify.afterClear', function (event, element) {
                        $scope.imagen = null;
                    });
            }

            ServerService.getCategorias()
                .then(function (response) {
                    vm.categorias = [];

                    for (var i = 0; i < response.length; i++) {
                        vm.categorias.push({ id: response[i], title: response[i] });
                    }

                    vm.tipo_options = [];
                    for (var i = 0; i < response.length; i++) {
                        vm.tipo_options.push({ value: response[i], title: response[i] });
                    }
                },
                function (responseError) {
                    console.log(responseError);
                });

            vm.categorias_config = {
                plugins: {
                    'remove_button': {
                        label: ''
                    }
                },
                render: {
                    option: function (langData, escape) {
                        return '<div class="option">' +
                            '<i class="item-icon"></i>' +
                            '<span>' + escape(langData.title) + '</span>' +
                            '</div>';
                    },
                    item: function (langData, escape) {
                        return '<div class="item"><i class="item-icon"></i>' + escape(langData.title) + '</div>';
                    }
                },
                valueField: 'id',
                labelField: 'title',
                searchField: 'title',
                create: false,
                placeholder: 'Seleccionar categoria...'
            };

            vm.tipo_config = {
                valueField: 'value',
                labelField: 'title',
                create: false,
                maxItems: 1,
                placeholder: 'Seleccionar...'
            };
        }

        function save() {

            var file = $scope.imagen;
            var uploadUrl = "../subir_imagen.php";
            var folder = 'necesidades';//$stateParams.id.toString(); //TODO: Revisar esto porque no funciona cuando la necesidad es nueva.
            var fileName = vm.donacion.imagen_path || 'prueba.png';
            if (file) {
                fileName = file.name;
                fileUpload.uploadFileToUrl(file, uploadUrl, folder)
                    .success(function () {
                        console.log("Acaba de subir la imagen");
                    })
                    .error(function () {
                        console.log("Error al subir la imagen");
                    });
            }

            var dia = new Date().getDate(), mes = new Date().getMonth() + 1, anio = new Date().getFullYear();
            var pad = "00";
            dia = pad.substring(0, pad.length - dia.toString().length) + dia;
            mes = pad.substring(0, pad.length - mes.toString().length) + mes;
            var fecha = anio + '-' + mes + '-' + dia;

            var request = {
                titulo: vm.donacion.titulo,
                necesidad: vm.donacion.necesidad,
                fecha_creacion: fecha,
                fecha_fin: vm.donacion.fecha_fin || null,
                telefono: vm.donacion.telefono,
                facebook: vm.donacion.facebook,
                twitter: vm.donacion.twitter,
                usuario: vm.usuarioLogueado.usuario,
                direccion: vm.donacion.direccion,
                email: vm.donacion.email,
                categoria: vm.donacion.categoria,
                imagen_path: fileName,
                dineroTotal: vm.donacion.dineroTotal,
                dineroRecaudado: vm.donacion.dineroRecaudado,
                usuario_mp: vm.donacion.usuario_mp
            };

            if (!request.titulo || !request.necesidad || !request.usuario) {
                UIkit.notify({
                    message: '<i class="uk-icon-times-circle"></i> El título y la necesidad son requeridos',
                    status: 'danger',
                    timeout: 5000,
                    pos: 'top-right'
                });

                return;
            }

            if (!vm.isNew) {
                request.id_necesidad = $stateParams.id;
            }

            ServerService.saveDonacion(request)
                .then(function (response) {
                    console.log(response);

                    UIkit.notify({
                        message: '<i class="uk-icon-check"></i> Se ha guardado con éxito!',
                        status: 'success',
                        timeout: 5000,
                        pos: 'top-right'
                    });
                },
                function (responseError) {
                    console.log(responseError);
                });
        }

        function subirImagen() {

            $timeout(function () {
                UIkit.notify({
                    message: '<i class="uk-icon-check"></i> Imagen guardada!',
                    status: 'success',
                    timeout: 1000,
                    pos: 'top-right'
                });

                ServerService.getFilesInFolder('galeria-' + $stateParams.id)
                    .then(function (data) {
                        vm.images = data;
                    });
            }, 3000);
        }

        function getYTLink(src) {
            //return 'https://www.youtube.com/v/' + src + '?rel=0';
            return src.replace("watch?v=", "v/");;
        };

        function subirVideo() {
            var dia = new Date().getDate(), mes = new Date().getMonth() + 1, anio = new Date().getFullYear();
            var pad = "00";
            dia = pad.substring(0, pad.length - dia.toString().length) + dia;
            mes = pad.substring(0, pad.length - mes.toString().length) + mes;
            var fecha = anio + '-' + mes + '-' + dia;

            if (!vm.video.descripcion) {
                vm.video.descripcion = '';
            }

            if (!vm.video.titulo) {
                vm.video.titulo = '';
            }

            if (!vm.video.url) {
                vm.video.url = '';
            }

            var request = {
                url: vm.video.url,
                comentario: vm.video.descripcion,
                fecha: fecha,
                usuario: vm.usuarioLogueado.usuario,
                id_necesidad: vm.donacion.id_necesidad,
                titulo: vm.video.titulo
            };

            var tituloLimpio = vm.video.titulo.replace(/[ ]/ig, '');
            var descripcionLimpio = vm.video.descripcion.replace(/[ ]/ig, '');
            var urlLimpio = vm.video.url.replace(/[ ]/ig, '');
            if (tituloLimpio.length === 0 || descripcionLimpio.length === 0 || urlLimpio.length === 0) {
                UIkit.notify({
                    message: '<i class="uk-icon-times-circle"></i> El título, la descripcion y la URL son requeridos',
                    status: 'danger',
                    timeout: 5000,
                    pos: 'top-right'
                });

                return;
            }

            ServerService.guardarVideo(request)
                .then(function (response) {
                    console.log(response);

                    UIkit.notify({
                        message: '<i class="uk-icon-check"></i> Se ha guardado el video!',
                        status: 'success',
                        //timeout: 5000,
                        pos: 'top-right'
                    });

                    vm.video.titulo = '';
                    vm.video.descripcion = '';
                    vm.video.url = '';
                })
                .catch(function (responseError) {
                    console.log(responseError);
                });
        }

        $scope.subirImagen = subirImagen;
    }
})();
(function () {
    "use strict";

    angular
        .module('donarApp')
        .controller('DonacionResultadoController', DonacionResultadoController);

    DonacionResultadoController.$inject = ['fileUpload', '$http', '$rootScope', '$state', '$stateParams', '$scope', 'SessionStorageService', 'ServerService', '$timeout'];

    function DonacionResultadoController(fileUpload, $http, $rootScope, $state, $stateParams, $scope, SessionStorageService, ServerService, $timeout) {
        var vm = this;

        //Variables
        vm.usuarioLogueado = {};
        vm.donacion = {};
        vm.categorias = [];
        vm.categorias_config = {};
        vm.tipo_config = {};
        vm.tipo_options = [];
        vm.isNew = true;
        vm.imagen = {};
        vm.images = [];
        vm.videos = [];

        //Methods:
        vm.save = save;
        vm.subirImagen = subirImagen;
        vm.getYTLink = getYTLink;
        vm.subirVideo = subirVideo;

        activate();

        function activate() {
            // $('#input-file-a-galeria').dropify({
            //     messages: {
            //         default: 'Imagen default',
            //         replace: 'Haga click para reemplazar',
            //         remove: 'Eliminar',
            //         error: 'Hubo un error'
            //     }
            // })
            //     .on('dropify.afterClear', function (event, element) {
            //         $scope.imagenGaleria = null;
            //     });

            vm.usuarioLogueado = SessionStorageService.get('usuario');
            if (!vm.usuarioLogueado || !$stateParams.id) {
                $state.go('restricted.home');
            }

            ServerService.getDonacion($stateParams.id)
                .then(function (data) {
                    vm.donacion = data;
                    if (vm.usuarioLogueado && vm.usuarioLogueado.usuario !== data.usuario) {
                        UIkit.notify({
                            message: '<i class="uk-icon-times-circle"></i> No tiene permisos para editar esta necesidad.',
                            status: 'danger',
                            timeout: 5000,
                            pos: 'top-right'
                        });

                        $state.go('restricted.home');

                        return;
                    }

                    ServerService.getFilesInFolder('resultado-' + $stateParams.id)
                        .then(function (data) {
                            vm.images = data;
                        });

                    ServerService.getResultado($stateParams.id)
                        .then(function (data) {
                            vm.isNew = false;
                            vm.resultado = data;

                            //Valido la no existencia de la imagen:
                            if (vm.donacion.imagen_path && vm.donacion.imagen_path.indexOf('.') === -1) {
                                vm.donacion.imagen_path = 'prueba.png';
                            }

                            //Valido la conversion del nro que viene desde el server:
                            if (vm.donacion.dineroTotal && vm.donacion.dineroTotal.replace(/[^.,0-9]/ig, '').length > 0) {
                                vm.donacion.dineroTotal = parseFloat(vm.donacion.dineroTotal);
                            }

                            // ServerService.getVideos($stateParams.id)
                            //     .then(function (data) {
                            //         vm.videos = data;
                            //     });

                            // if (vm.usuarioLogueado && vm.usuarioLogueado.usuario === vm.donacion.usuario) {
                            //     vm.isCreatedUser = true;
                            // }

                            // if (vm.donacion.imagen_path) {
                            //     $('.dropify').dropify({
                            //         messages: {
                            //             default: 'Imagen default',
                            //             replace: 'Haga click para reemplazar',
                            //             remove: 'Eliminar',
                            //             error: 'Hubo un error'
                            //         },
                            //         defaultFile: 'http://www.soydonar.com/imagenes/necesidades/' + vm.donacion.imagen_path
                            //     })
                            //         .on('dropify.afterClear', function (event, element) {
                            //             $scope.imagen = null;
                            //         });
                            // }
                            // else {
                            //     $('.dropify').dropify({
                            //         messages: {
                            //             default: 'Imagen default',
                            //             replace: 'Haga click para reemplazar',
                            //             remove: 'Eliminar',
                            //             error: 'Hubo un error'
                            //         },
                            //         defaultFile: 'http://www.soydonar.com/imagenes/necesidades/prueba.png'
                            //     })
                            //         .on('dropify.afterClear', function (event, element) {
                            //             $scope.imagen = null;
                            //         });
                            // }
                        })
                        .catch(function () {
                            //Si entra por acá es porque no hay resultado, entonces hay que agregar uno nuevo:
                            vm.isNew = true;
                            vm.resultado = {};
                        });
                });
        }

        function save() {

            var dia = new Date().getDate(), mes = new Date().getMonth() + 1, anio = new Date().getFullYear();
            var pad = "00";
            dia = pad.substring(0, pad.length - dia.toString().length) + dia;
            mes = pad.substring(0, pad.length - mes.toString().length) + mes;
            var fecha = anio + '-' + mes + '-' + dia;

            var request = {
                titulo: vm.resultado.titulo,
                resultado: vm.resultado.necesidad,
                fecha: fecha
            };

            if (!vm.isNew) {
                request.id_nec = $stateParams.id;
            }

            if (!request.titulo || !request.resultado) {
                UIkit.notify({
                    message: '<i class="uk-icon-times-circle"></i> El título y el resultado son requeridos',
                    status: 'danger',
                    timeout: 5000,
                    pos: 'top-right'
                });

                return;
            }

            ServerService.guardarResultado(request)
                .then(function (response) {
                    console.log(response);

                    UIkit.notify({
                        message: '<i class="uk-icon-check"></i> Se ha guardado con éxito!',
                        status: 'success',
                        timeout: 5000,
                        pos: 'top-right'
                    });
                })
                .catch(function (error) {
                    console.log(error);
                    UIkit.notify({
                        message: '<i class="uk-icon-check"></i> Hubo un error!',
                        status: 'danger',
                        timeout: 5000,
                        pos: 'top-right'
                    });
                });
        }

        function subirImagen() {

            $timeout(function () {
                UIkit.notify({
                    message: '<i class="uk-icon-check"></i> Imagen guardada!',
                    status: 'success',
                    timeout: 1000,
                    pos: 'top-right'
                });

                ServerService.getFilesInFolder('resultado-' + $stateParams.id)
                    .then(function (data) {
                        vm.images = data;
                    });
            }, 3000);
        }

        function getYTLink(src) {
            //return 'https://www.youtube.com/v/' + src + '?rel=0';
            return src.replace("watch?v=", "v/");;
        };

        function subirVideo() {
            var dia = new Date().getDate(), mes = new Date().getMonth() + 1, anio = new Date().getFullYear();
            var pad = "00";
            dia = pad.substring(0, pad.length - dia.toString().length) + dia;
            mes = pad.substring(0, pad.length - mes.toString().length) + mes;
            var fecha = anio + '-' + mes + '-' + dia;

            var request = {
                url: vm.video.url,
                comentario: vm.video.descripcion,
                fecha: fecha,
                usuario: vm.usuarioLogueado.usuario,
                id_necesidad: vm.donacion.id_necesidad,
                titulo: vm.video.titulo
            };

            ServerService.guardarVideo(request)
                .then(function (response) {
                    console.log(response);

                    UIkit.notify({
                        message: '<i class="uk-icon-check"></i> Se ha guardado el video!',
                        status: 'success',
                        //timeout: 5000,
                        pos: 'top-right'
                    });
                })
                .catch(function (responseError) {
                    console.log(responseError);
                });
        }

        $scope.subirImagen = subirImagen;
    }
})();
(function () {
    "use strict";
    angular
        .module('donarApp')
        .controller('DonacionController', DonacionController);

    DonacionController.$inject = ['$window', '$rootScope', '$state', '$stateParams', '$scope', 'user_data', 'SessionStorageService', 'ServerService'];

    function DonacionController($window, $rootScope, $state, $stateParams, $scope, user_data, SessionStorageService, ServerService) {
        var vm = this;

        //Variables
        vm.user_data = user_data[0];
        vm.user_data_contacts = user_data[0].contact;
        vm.isCreatedUser = false;
        vm.comentario = '';
        vm.usuarioLogueado = null;
        vm.images = [];

        //Methods
        vm.addComment = addComment;
        vm.editar = editar;
        vm.pagarMercadoPago = pagarMercadoPago;
        vm.addFavorite = addFavorite;
        vm.donarCosas = donarCosas;

        activate();

        function activate() {

            vm.usuarioLogueado = SessionStorageService.get('usuario');

            ServerService.getDonacion($stateParams.id)
                .then(function (data) {
                    console.log(data);
                    vm.donacion = data;

                    //Valido la no existencia de la imagen:
                    if (vm.donacion.imagen_path && vm.donacion.imagen_path.indexOf('.') === -1) {
                        vm.donacion.imagen_path = 'prueba.png';
                    }

                    if (vm.usuarioLogueado && vm.usuarioLogueado.usuario === vm.donacion.usuario) {
                        vm.isCreatedUser = true;
                    }

                    ServerService.getFilesInFolder('galeria-' + $stateParams.id)
                        .then(function (data) {
                            vm.images = data;
                        });
                });
        }

        //Method definitions
        function addComment() {

            var dia = new Date().getDate(), mes = new Date().getMonth() + 1, anio = new Date().getFullYear();
            var pad = "00";
            dia = pad.substring(0, pad.length - dia.toString().length) + dia;
            mes = pad.substring(0, pad.length - mes.toString().length) + mes;

            var fecha = anio + '-' + mes + '-' + dia;

            var request = {
                id_necesidad: $stateParams.id,
                comentario: vm.comentario,
                usuario: vm.usuarioLogueado.usuario,
                fecha: fecha
            };

            if (vm.comentario) {
                var comentarioLimpio = vm.comentario.replace(/[ ]/ig, '');
                if (comentarioLimpio.length === 0) {
                    UIkit.notify({
                        message: '<i class="uk-icon-times-circle"></i> El comentario es requerido',
                        status: 'danger',
                        timeout: 5000,
                        pos: 'top-right'
                    });

                    return;
                }
            }
            else {
                UIkit.notify({
                    message: '<i class="uk-icon-times-circle"></i> El comentario es requerido',
                    status: 'danger',
                    timeout: 5000,
                    pos: 'top-right'
                });

                return;
            }

            ServerService.addComment(request)
                .then(function (response) {
                    console.log(response);
                    request.imagen_path = vm.usuarioLogueado.imagen_path;
                    vm.donacion.lista_coment.push(request);
                    vm.comentario = '';
                },
                function (responseError) {
                    console.log(responseError);
                });
        }

        function editar() {
            $state.go('restricted.donacion-edit', { id: $stateParams.id });
        }

        function pagarMercadoPago() {
            var dia = new Date().getDate(), mes = new Date().getMonth() + 1, anio = new Date().getFullYear();
            var pad = "00";
            dia = pad.substring(0, pad.length - dia.toString().length) + dia;
            mes = pad.substring(0, pad.length - mes.toString().length) + mes;
            var fecha = anio + '-' + mes + '-' + dia;

            if (vm.usuarioLogueado) {
                var request = {
                    donante: vm.usuarioLogueado.usuario,
                    id_necesidad: vm.donacion.id_necesidad,
                    fecha: fecha,
                    aporte_monetario: vm.donacionMonetaria,
                    aporte_donacion: '',
                    donatario: vm.donacion.usuario
                };

                ServerService.crearDonacionMP(request)
                    .then(function (response) {
                        console.log(response);

                        vm.donacionMonetaria = '';
                        UIkit.notify({
                            message: '<i class="uk-icon-check"></i> Donación concretada!',
                            status: 'success',
                            timeout: 5000,
                            pos: 'top-right'
                        });
                    },
                    function (responseError) {
                        console.log(responseError);
                    });
            }

            $window.open('https://www.mercadopago.com.ar/money-transfer', '_blank');
        }

        function donarCosas() {

            var dia = new Date().getDate(), mes = new Date().getMonth() + 1, anio = new Date().getFullYear();
            var pad = "00";
            dia = pad.substring(0, pad.length - dia.toString().length) + dia;
            mes = pad.substring(0, pad.length - mes.toString().length) + mes;
            var fecha = anio + '-' + mes + '-' + dia;

            if (vm.usuarioLogueado) {
                var request = {
                    donante: vm.usuarioLogueado.usuario,
                    id_necesidad: vm.donacion.id_necesidad,
                    fecha: fecha,
                    aporte_donacion: vm.donacionDeCosas,
                    donatario: vm.donacion.usuario
                };

                if (vm.donacionDeCosas) {
                    var donacionDeCosasLimpia = vm.donacionDeCosas.replace(/[ ]/ig, '');
                    if (donacionDeCosasLimpia.length === 0) {
                        UIkit.notify({
                            message: '<i class="uk-icon-times-circle"></i> La donación es requerida',
                            status: 'danger',
                            timeout: 5000,
                            pos: 'top-right'
                        });

                        return;
                    }
                }
                else {
                    UIkit.notify({
                        message: '<i class="uk-icon-times-circle"></i> La donación es requerida',
                        status: 'danger',
                        timeout: 5000,
                        pos: 'top-right'
                    });

                    return;
                }


                ServerService.crearDonacionMP(request)
                    .then(function (response) {
                        console.log(response);

                        vm.donacionDeCosas = '';
                        UIkit.notify({
                            message: '<i class="uk-icon-check"></i> Donación concretada!',
                            status: 'success',
                            timeout: 5000,
                            pos: 'top-right'
                        });
                    },
                    function (responseError) {
                        console.log(responseError);
                    });
            }
        }

        function addFavorite() {
            ServerService.addFavorite(vm.donacion.id_necesidad, vm.usuarioLogueado.usuario)
                .then(function (response) {
                    console.log(response);
                    UIkit.notify({
                        message: '<i class="uk-icon-check"></i> Se agregó a la lista de favoritos!',
                        status: 'success',
                        timeout: 5000,
                        pos: 'top-right'
                    });
                },
                function (responseError) {
                    console.log(responseError);
                });
        }
    }
})();
(function () {
    "use strict";
    angular
        .module('donarApp')
        .controller('FavoritoController', FavoritoController);

    FavoritoController.$inject = ['$window', '$rootScope', '$state', '$stateParams', '$scope', 'SessionStorageService', 'ServerService'];

    function FavoritoController($window, $rootScope, $state, $stateParams, $scope, SessionStorageService, ServerService) {
        var vm = this;

        //Variables
        vm.usuarioLogueado = null;
        vm.favoritos = [];

        //Methods
        vm.deleteFav = deleteFav;

        activate();

        function activate() {

            vm.usuarioLogueado = SessionStorageService.get('usuario');
            if (vm.usuarioLogueado) {

                ServerService.getFavorites(vm.usuarioLogueado.usuario)
                    .then(function (data) {
                        console.log(data);

                        if (Object.prototype.toString.call(data) === '[object Array]') {
                            vm.favoritos = data;
                            vm.favoritos.forEach(function (e, i, a) {
                                //Valido la no existencia de la imagen:
                                if (e.imagen_path && e.imagen_path.indexOf('.') === -1) {
                                    e.imagen_path = 'prueba.png';
                                }
                            });
                        }
                        else {
                            vm.favoritos = [];
                        }
                    });
            }
            else {
                $state.go('restricted.home');
            }
        }

        //Method definitions
        function deleteFav(idNecesidad) {
            ServerService.deleteFav(idNecesidad, vm.usuarioLogueado.usuario)
                .then(function () {
                    UIkit.notify({
                        message: '<i class="uk-icon-check"></i> Se eliminó el favorito!',
                        status: 'success',
                        timeout: 5000,
                        pos: 'top-right'
                    });

                    ServerService.getFavorites(vm.usuarioLogueado.usuario)
                        .then(function (data) {
                            console.log(data);
                            vm.favoritos = data;
                        });
                });
        }
    }
})();
(function () {
    "use strict";

    angular
        .module('donarApp')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope', '$rootScope', 'ServerService', '$window', 'SessionStorageService'];

    function HomeController($scope, $rootScope, ServerService, $window, SessionStorageService) {
        var vm = this;

        //Variables
        vm.donaciones = [];
        vm.tipo_config = {};
        vm.tipo_options = [];

        vm.palabraClave = '';
        vm.categoriaSeleccionada = '';

        //Methods
        vm.buscar = buscar;

        activate();
        //activate2();

        function activate2() {
            function isPalindrome(input) {
                if (!input || typeof input !== 'string')
                    throw 'Not a string.';
                var string = input.replace(/[^0-9a-zA-Z]+/ig, '').toLowerCase();
                var reverse = string.split('').reverse().join('');

                return string === reverse;

            }

            function longestPalindrome(input) {
                if (!input || typeof input !== 'string')
                    throw 'Not a string.';
                var words = input.split(' ');
                var lengths = [];

                lengths = words.filter(function (e, i, a) {
                    return isPalindrome(e);
                });

                lengths.sort(function (a, b) {
                    return b.length - a.length;
                });

                return lengths[0];
            }

            console.log(isPalindrome('A man, a plan, a cat, a ham, a yak, a yam, a hat, a canal-Panama!')); // returns true
            console.log(longestPalindrome('neuquen manam notApalindrome')); // returns 'neuquen,'


            //Now im gonna test Closures:
            function wrongClosureId(arrayActores) {
                var i;
                for (i = 0; i < arrayActores.length; i++) {
                    arrayActores[i].id = function () {
                        return i;
                    };
                }

                return arrayActores;
            }

            function goodClosureId(arrayActores) {
                var i;
                for (i = 0; i < arrayActores.length; i++) {
                    arrayActores[i].id = (function (j) {
                        return function () {
                            return j;
                        } ();
                    })(i);
                }
            }

            var aActores = [{ nombre: 'stallone', id: 0 }, { nombre: 'brad pitt', id: 0 }, { nombre: 'matt damon', id: 0 }];
            var bActores = [{ nombre: 'stallone', id: 0 }, { nombre: 'brad pitt', id: 0 }, { nombre: 'matt damon', id: 0 }];

            wrongClosureId(aActores);
            goodClosureId(bActores);

            console.log('aActores[0].id()');
            console.log(aActores[0].id());
            console.log('bActores');
            console.log(bActores);
            ///////////////////////////////////////////////////////////////////////////////////////
            //Given a string of size N an a number K. Find the greatest substring with K different characters.


            function verificarPalabra(palabraParam, cantidadK) {
                var palabras = palabraParam.replace(/[^0-9a-zA-Z,]+/ig, '').toLowerCase();
                var k = cantidadK;
                var palabrasArray = palabras.split(',');
                var palabrasConCantidad = [];

                palabrasArray.forEach(function (e, i, a) {
                    var arrayLetras = e.split('');
                    var arrayCant = [];
                    arrayLetras.forEach(function (element, index, array) {

                        if (arrayCant.indexOf(element) === -1) {
                            //No encontró la letra, entonces la agrego:
                            arrayCant.push(element);
                        }
                    });

                    if (arrayCant.length === k) {
                        palabrasConCantidad.push({ palabra: e, cantidad: arrayCant.length });
                    }
                });

                if (palabrasConCantidad.length > 0) {
                    palabrasConCantidad.sort(function (a, b) {
                        return b.palabra.length - a.palabra.length;
                    });

                    console.log('La palabra mas larga con K(' + k + ') elementos es: ' + palabrasConCantidad[0].palabra);
                }
                else {
                    console.log('No hay palabras con K(' + k + ') diferentes letras ');
                }
            }

            verificarPalabra('papas, casa, masaaaaaaAAAAAa', 3);
            verificarPalabra('papas, casa, masaaaaaaaaaa', 4);
            verificarPalabra('papas, casa, masaaaaaaaaaaenrjwnerj', 3);

            ///////////////////////////////////////////////////////////////////////////////////////
        }

        function activate() {
            vm.tipo_config = {
                valueField: 'value',
                labelField: 'title',
                create: false,
                maxItems: 1,
                placeholder: 'Categoría'
            };

            ServerService.homeGetDonaciones()
                .then(function (data) {
                    console.log(data);
                    vm.donaciones = data;

                    vm.donaciones.forEach(function (e, i, a) {
                        //Valido la no existencia de la imagen:
                        if (e.imagen_path && e.imagen_path.indexOf('.') === -1) {
                            e.imagen_path = 'prueba.png';
                        }
                    });
                });

            ServerService.getCategorias()
                .then(function (response) {


                    vm.tipo_options = [];
                    //vm.tipo_options.push({ value: '', title: 'Todas' });

                    for (var i = 0; i < response.length; i++) {
                        vm.tipo_options.push({ value: response[i], title: response[i] });
                    }
                },
                function (responseError) {
                    console.log(responseError);
                });
        }

        function buscar() {
            ServerService.searchDonacion(vm.palabraClave, vm.categoriaSeleccionada)
                .then(function (response) {
                    console.log(response);

                    if (Object.prototype.toString.call(response) === '[object Array]') {
                        vm.donaciones = response;
                    }
                    else {
                        vm.donaciones = [];
                    }
                },
                function (responseError) {
                    console.log(responseError);
                });
        }
    }
})();
(function () {
    "use strict";
    angular
        .module('donarApp')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$scope', '$rootScope', '$state', 'utils', 'ServerService', '$window', 'SessionStorageService', '$timeout'];

    function LoginController($scope, $rootScope, $state, utils, ServerService, $window, SessionStorageService, $timeout) {
        var vm = this;

        //Variables
        vm.registerFormActive = false;
        vm.login_username = '';
        vm.login_password = '';
        vm.register_username = '';
        vm.register_password = '';
        vm.register_password_repeat = '';
        vm.register_name = '';
        vm.register_lastname = '';

        var $login_card = $('#login_card'),
            $login_form = $('#login_form'),
            $login_help = $('#login_help'),
            $register_form = $('#register_form'),
            $login_password_reset = $('#login_password_reset');

        // show login form (hide other forms)
        var login_form_show = function () {
            $login_form
                .show()
                .siblings()
                .hide();
        };

        // show register form (hide other forms)
        var register_form_show = function () {
            $register_form
                .show()
                .siblings()
                .hide();
        };

        // show login help (hide other forms)
        var login_help_show = function () {
            $login_help
                .show()
                .siblings()
                .hide();
        };

        // show password reset form (hide other forms)
        var password_reset_show = function () {
            $login_password_reset
                .show()
                .siblings()
                .hide();
        };

        //Methods
        vm.loginHelp = loginHelp;
        vm.backToLogin = backToLogin;
        vm.registerForm = registerForm;
        vm.passwordReset = passwordReset;
        vm.login = login;
        vm.register = register;

        activate();

        function activate() {
            var num = Math.floor((Math.random() * 10) + 1);
            $('body').css('background-image', 'url("../assets/img/login/' + num + '.jpg")');
            SessionStorageService.clear();
        }

        //Method definitions
        function loginHelp($event) {
            $event.preventDefault();
            utils.card_show_hide($login_card, undefined, login_help_show, undefined);
        };

        function backToLogin($event) {
            $event.preventDefault();
            $scope.registerFormActive = false;
            utils.card_show_hide($login_card, undefined, login_form_show, undefined);
        };

        function registerForm($event) {
            $event.preventDefault();
            $scope.registerFormActive = true;
            utils.card_show_hide($login_card, undefined, register_form_show, undefined);
        };

        function passwordReset($event) {
            $event.preventDefault();
            utils.card_show_hide($login_card, undefined, password_reset_show, undefined);
        };

        function login() {
            var request = {
                username: vm.login_username,
                password: vm.login_password
            };

            ServerService.login(request)
                .then(function (response) {
                    console.log(response);
                    if (response.contrasenia) {
                        SessionStorageService.set('usuario', response);
                        UIkit.notify({
                            message: '<i class="uk-icon-check"></i> Usuario logueado!',
                            status: 'success',
                            timeout: 5000,
                            pos: 'top-right'
                        });

                        $timeout(function () {
                            $state.go('restricted.home');
                        }, 1000);
                    }
                    else {
                        UIkit.notify({
                            message: '<i class="uk-icon-times-circle"></i> Usuario o contraseña incorrectos',
                            status: 'danger',
                            timeout: 5000,
                            pos: 'top-right'
                        });
                    }
                })
                .catch(function (response) {
                    UIkit.notify({
                        message: '<i class="uk-icon-times-circle"></i> Usuario o contraseña incorrectos',
                        status: 'danger',
                        timeout: 5000,
                        pos: 'top-right'
                    });
                });
        }

        function register() {
            var request = {
                username: vm.register_username,
                password: vm.register_password,
                name: vm.register_name,
                lastname: vm.register_lastname
            };

            ServerService.register(request)
                .then(function () {
                    //Redireccionar al login.
                    login_form_show();

                    UIkit.notify({
                        message: '<i class="uk-icon-check"></i> Se ha registrado con éxito!\nIngrese al sistema.',
                        status: 'success',
                        timeout: 5000,
                        pos: 'top-right'
                    });
                });
        }
    }
})();
(function () {
    "use strict";
    angular
        .module('donarApp')
        .controller('MisNecesidadesController', MisNecesidadesController);

    MisNecesidadesController.$inject = ['$window', '$rootScope', '$state', '$stateParams', '$scope', 'SessionStorageService', 'ServerService'];

    function MisNecesidadesController($window, $rootScope, $state, $stateParams, $scope, SessionStorageService, ServerService) {
        var vm = this;

        //Variables
        vm.usuarioLogueado = null;
        vm.favoritos = [];

        //Methods
        vm.edit = edit;
        vm.resultado = resultado;

        activate();

        function activate() {

            vm.usuarioLogueado = SessionStorageService.get('usuario');
            if (vm.usuarioLogueado) {

                ServerService.getMisDonaciones(vm.usuarioLogueado.usuario)
                    .then(function (data) {
                        console.log(data);

                        if (Object.prototype.toString.call(data) === '[object Array]') {
                            vm.necesidades = data;

                            vm.necesidades.forEach(function (e, i, a) {
                                //Valido la no existencia de la imagen:
                                if (e.imagen_path && e.imagen_path.indexOf('.') === -1) {
                                    e.imagen_path = 'prueba.png';
                                }
                            });
                        }
                        else {
                            vm.necesidades = [];
                        }
                    });
            }
            else {
                $state.go('restricted.home');
            }
        }

        //Method definitions
        function edit(idNecesidad) {
            $state.go('restricted.donacion-edit', { id: idNecesidad });
        }

        function resultado(idNecesidad) {
            $state.go('restricted.donacion-resultado', { id: idNecesidad });
        }
    }
})();
(function () {
    "use strict";
    angular
        .module('donarApp')
        .controller('PendienteController', PendienteController);

    PendienteController.$inject = ['$window', '$rootScope', '$state', '$stateParams', '$scope', 'SessionStorageService', 'ServerService'];

    function PendienteController($window, $rootScope, $state, $stateParams, $scope, SessionStorageService, ServerService) {
        var vm = this;

        //Variables
        vm.usuarioLogueado = null;
        vm.PendientesDonante = [];
        vm.PendientesDonatario = [];

        //Methods
        vm.deletePendienteDonante = deletePendienteDonante;
        vm.deletePendienteDonatario = deletePendienteDonatario;
        vm.savePendienteDonante = savePendienteDonante;
        vm.savePendienteDonatario = savePendienteDonatario;

        activate();

        function activate() {

            vm.usuarioLogueado = SessionStorageService.get('usuario');
            if (vm.usuarioLogueado) {

                ServerService.getPendienteDonatario(vm.usuarioLogueado.usuario)
                    .then(function (data) {
                        console.log(data);
                        if (Object.prototype.toString.call(data) === '[object Array]') {
                            vm.PendientesDonatario = data;
                        }
                        else {
                            vm.PendientesDonatario = [];
                        }
                    },
                    function (data) {
                        console.log(data);
                        vm.PendientesDonatario = [];
                    });

                ServerService.getPendienteDonante(vm.usuarioLogueado.usuario)
                    .then(function (data) {
                        console.log(data);
                        if (Object.prototype.toString.call(data) === '[object Array]') {
                            vm.PendientesDonante = data;
                        }
                        else {
                            vm.PendientesDonante = [];
                        }
                    });
            }
            else {
                $state.go('restricted.home');
            }
        }

        //Method definitions
        function deletePendienteDonante() {
        }

        function deletePendienteDonatario() {

        }

        function savePendienteDonante(id_donacion) {
            ServerService.savePendienteDonante(id_donacion)
                .then(function (data) {
                    console.log(data);

                    UIkit.notify({
                        message: '<i class="uk-icon-check"></i> Se confirmó el envío!',
                        status: 'success',
                        timeout: 5000,
                        pos: 'top-right'
                    });

                    ServerService.getPendienteDonante(vm.usuarioLogueado.usuario)
                        .then(function (data) {
                            console.log(data);

                            if (Object.prototype.toString.call(data) === '[object Array]') {
                                vm.PendientesDonante = data;
                            }
                            else {
                                vm.PendientesDonante = [];
                            }
                        });
                });
        }

        function savePendienteDonatario(id_donacion) {
            ServerService.savePendienteDonatario(id_donacion)
                .then(function (data) {
                    console.log(data);

                    UIkit.notify({
                        message: '<i class="uk-icon-check"></i> Se confirmó la recepción!',
                        status: 'success',
                        timeout: 5000,
                        pos: 'top-right'
                    });

                    ServerService.getPendienteDonatario(vm.usuarioLogueado.usuario)
                        .then(function (data) {
                            console.log(data);
                            if (Object.prototype.toString.call(data) === '[object Array]') {
                                vm.PendientesDonatario = data;
                            }
                            else {
                                vm.PendientesDonatario = [];
                            }
                        });
                });
        }
    }
})();
(function () {
    "use strict";
    angular
        .module('donarApp')
        .controller('PerfilController', PerfilController);

    PerfilController.$inject = ['$window', '$rootScope', '$state', '$stateParams', '$scope', 'SessionStorageService', 'ServerService'];

    function PerfilController($window, $rootScope, $state, $stateParams, $scope, SessionStorageService, ServerService) {
        var vm = this;

        //Variables
        vm.usuarioLogueado = null;
        vm.usuarioPerfil = null;
        vm.favoritos = [];

        //Methods
        vm.save = save;

        activate();

        function activate() {

            vm.usuarioLogueado = SessionStorageService.get('usuario');
            if (vm.usuarioLogueado) {

                ServerService.getInfoUsuario(vm.usuarioLogueado.usuario)
                    .then(function (data) {
                        console.log(data);
                        vm.usuarioPerfil = data;

                        $('.dropify').dropify({
                            messages: {
                                default: 'Imagen default',
                                replace: 'Haga click para reemplazar',
                                remove: 'Eliminar',
                                error: 'Hubo un error'
                            },
                            defaultFile: 'http://www.soydonar.com/imagenes/usuarios/' + vm.usuarioPerfil.imagen_path
                        })
                            .on('dropify.afterClear', function (event, element) {
                                $scope.imagen = null;
                            });
                    });
            }
            else {
                $state.go('restricted.home');
            }
        }

        //Method definitions
        function save() {
            var file = $scope.imagen;
            var fileName = vm.usuarioPerfil.imagen_path;
            if (file) {
                fileName = file.name;
            }

            var request = {
                usuario: vm.usuarioPerfil.usuario,
                contrasenia: vm.usuarioPerfil.contrasenia,
                nombre: vm.usuarioPerfil.nombre,
                apellido: vm.usuarioPerfil.apellido,
                sexo: 'masculino',
                nacionalidad: vm.usuarioPerfil.nacionalidad,
                residencia: vm.usuarioPerfil.residencia,
                // telefono: '44867832',
                // facebook: '/mgary@gmail.com',
                // twitter: '@mgaray',
                imagen_path: fileName,
                fecha_nacimiento: '2019-08-30'
            };
            
            SessionStorageService.set('usuario', request);
            ServerService.guardarUsuario(request)
                .then(function () {
                    UIkit.notify({
                        message: '<i class="uk-icon-check"></i> Se guardó correctamente!',
                        status: 'success',
                        timeout: 5000,
                        pos: 'top-right'
                    });
                });
        }
    }
})();