/**
 * @license
 * Copyright (c) 2014, 2020, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
/*
 * Your application specific code will go here
 */
define([
  "knockout",
  "ojs/ojmodule-element-utils",
  "ojs/ojresponsiveutils",
  "ojs/ojresponsiveknockoututils",
  "ojs/ojcorerouter",
  "ojs/ojmodulerouter-adapter",
  "ojs/ojknockoutrouteradapter",
  "ojs/ojurlparamadapter",
  "ojs/ojarraydataprovider",
  "ojs/ojknockouttemplateutils",
  "ojs/ojmodule-element",
  "ojs/ojknockout",
  "ojs/ojbutton",
], function (
  ko,
  moduleUtils,
  ResponsiveUtils,
  ResponsiveKnockoutUtils,
  CoreRouter,
  ModuleRouterAdapter,
  KnockoutRouterAdapter,
  UrlParamAdapter,
  ArrayDataProvider,
  KnockoutTemplateUtils
) {
  function ControllerViewModel() {
    this.KnockoutTemplateUtils = KnockoutTemplateUtils;

    // Handle announcements sent when pages change, for Accessibility.
    this.manner = ko.observable("polite");
    this.message = ko.observable();

    this.loggedIn = ko.observable(false);

    announcementHandler = (event) => {
      this.message(event.detail.message);
      this.manner(event.detail.manner);
    };

    document
      .getElementById("globalBody")
      .addEventListener("announce", announcementHandler, false);

    // Media queries for repsonsive layouts
    const smQuery = ResponsiveUtils.getFrameworkQuery(
      ResponsiveUtils.FRAMEWORK_QUERY_KEY.SM_ONLY
    );
    this.smScreen = ResponsiveKnockoutUtils.createMediaQueryObservable(smQuery);

    let routes = [
      { path: "", redirect: "customers" },
      {
        path: "dashboard",
        detail: { label: "Dashboard", iconClass: "oj-ux-ico-bar-chart" },
      },
      {
        path: "incidents",
        detail: { label: "Incidents", iconClass: "oj-ux-ico-fire" },
      },
      {
        path: "customers",
        detail: {
          label: "Customers",
          iconClass: "oj-ux-ico-contact-group",
        },
      },
      {
        path: "about",
        detail: { label: "About", iconClass: "oj-ux-ico-information-s" },
      },
    ];

    let navData = [
      { path: "", redirect: "customers" },

      {
        path: "customers",
        detail: { label: "Customers", iconClass: "oj-ux-ico-contact-group" },
      },
    ];
    // Router setup
    let router = new CoreRouter(routes, {
      urlAdapter: new UrlParamAdapter(),
    });
    router.sync();

    this.moduleAdapter = new ModuleRouterAdapter(router);

    this.selection = new KnockoutRouterAdapter(router);

    // Setup the navDataProvider with the routes, excluding the first redirected
    // route.
    this.navDataProvider = ko.observable(
      new ArrayDataProvider(navData.slice(1), {
        keyAttributes: "path",
      })
    );

    this.gotoRoute = (route) => {
      router.go({ path: route });
    };

    this.goBack = () => {
      let navData = [
        { path: "", redirect: "customers" },

        {
          path: "customers",
          detail: { label: "Customers", iconClass: "oj-ux-ico-contact-group" },
        },
      ];
      this.navDataProvider(
        new ArrayDataProvider(navData.slice(1), {
          keyAttributes: "path",
        })
      );
      this.loggedIn(false);
      this.gotoRoute("customers");
    };

    // Header
    // Application Name used in Branding Area
    this.appName = ko.observable("App Name");
    // User Info used in Global Navigation area
    this.userLogin = ko.observable("john.hancock@oracle.com");

    // Footer
    this.footerLinks = [
      {
        name: "About Oracle",
        linkId: "aboutOracle",
        linkTarget: "http://www.oracle.com/us/corporate/index.html#menu-about",
      },
      {
        name: "Contact Us",
        id: "contactUs",
        linkTarget: "http://www.oracle.com/us/corporate/contact/index.html",
      },
      {
        name: "Legal Notices",
        id: "legalNotices",
        linkTarget: "http://www.oracle.com/us/legal/index.html",
      },
      {
        name: "Terms Of Use",
        id: "termsOfUse",
        linkTarget: "http://www.oracle.com/us/legal/terms/index.html",
      },
      {
        name: "Your Privacy Rights",
        id: "yourPrivacyRights",
        linkTarget: "http://www.oracle.com/us/legal/privacy/index.html",
      },
    ];
  }

  return new ControllerViewModel();
});
